import { useState } from 'react'
import {
    Box,
    Typography,
    TextField,
    Button,
    Grid,
    Paper,
    CircularProgress,
    ToggleButton,
    ToggleButtonGroup,
} from '@mui/material'
import DownloadIcon from '@mui/icons-material/Download'
import ReactMarkdown from 'react-markdown'
import { historyService } from './service/historyService'
import { historyModel } from './model/historyModel'

function History() {
    const [inputText, setInputText] = useState('')
    const [generating, setGenerating] = useState(false)
    const [generatedResult, setGeneratedResult] = useState('')
    const [option, setOption] = useState('test') // 'test', 'upgrade', 'both'
    const [viewMode, setViewMode] = useState('raw') // 'raw' | 'preview'

    const handleOptionChange = (event, newOption) => {
        if (newOption !== null) {
            setOption(newOption)
        }
    }

    const handleGenerate = async () => {
        if (!inputText.trim() || generating) {
            return
        }

        try {
            setGenerating(true)
            setGeneratedResult('') // Limpiar resultado anterior
            setViewMode('raw')
            const newEntry = historyModel.createEntry({
                title: inputText,
                description: '',
                type: 'generated',
            })

            // Determinar hasTest y hasUpgrade basado en la opción seleccionada
            const hasTest = option === 'test' || option === 'both'
            const hasUpgrade = option === 'upgrade' || option === 'both'

            // Llamar al backend y obtener el resultado (string)
            const result = await historyService.addHistoryEntry(newEntry, hasTest, hasUpgrade)
            setGeneratedResult(result.description || result)
        } catch (error) {
            console.error('Error generating:', error)
            setGeneratedResult('Error al generar la historia. Por favor, intenta nuevamente.')
        } finally {
            setGenerating(false)
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleGenerate()
        }
    }

    const handleDownload = () => {
        if (!generatedResult) return

        const blob = new Blob([generatedResult], { type: 'text/plain' })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = `historia-${new Date().toISOString()}.txt`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
    }

    const handleViewModeChange = (_event, mode) => {
        if (mode !== null) {
            setViewMode(mode)
        }
    }

    return (
        <Box>
            {/* Título fuera del Paper, igual que en Usuarios */}
            <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 3 }}>
                Historias
            </Typography>

            <Paper sx={{ p: 4, backgroundColor: 'background.paper' }}>
                {/* Título de la sección */}
                <Typography
                    variant="h6"
                    component="h2"
                    sx={{
                        mb: 3,
                        fontWeight: 500,
                        color: 'text.primary',
                    }}
                >
                    Ingresa la historia que deseas generar
                </Typography>

                {/* Input Section con Botón Generar */}
                <Box sx={{ mb: 4, position: 'relative' }}>
                    <Grid container spacing={2} alignItems="flex-start">
                        <Grid item xs={12} md={10}>
                            <TextField
                                fullWidth
                                placeholder="Crear un panel de usuario"
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                onKeyPress={handleKeyPress}
                                multiline
                                rows={8}
                                variant="outlined"
                                disabled={generating}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        backgroundColor: 'background.paper',
                                        borderColor: 'primary.main',
                                        '& fieldset': {
                                            borderColor: 'primary.main',
                                            borderWidth: 1,
                                        },
                                        '&:hover fieldset': {
                                            borderColor: 'primary.main',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: 'primary.main',
                                        },
                                    },
                                    '& .MuiInputBase-input': {
                                        fontSize: '1rem',
                                        lineHeight: 1.5,
                                    },
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={2}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                <ToggleButtonGroup
                                    value={option}
                                    exclusive
                                    onChange={handleOptionChange}
                                    aria-label="opciones de generación"
                                    fullWidth
                                    orientation="vertical"
                                    disabled={generating}
                                    sx={{
                                        '& .MuiToggleButton-root': {
                                            border: '1px solid',
                                            borderColor: 'primary.main',
                                            color: 'text.primary',
                                            '&.Mui-selected': {
                                                backgroundColor: 'primary.main',
                                                color: 'primary.contrastText',
                                                '&:hover': {
                                                    backgroundColor: 'primary.dark',
                                                },
                                            },
                                            '&:hover': {
                                                backgroundColor: 'action.hover',
                                            },
                                        },
                                    }}
                                >
                                    <ToggleButton value="test" aria-label="caso de test">
                                        Caso de Test
                                    </ToggleButton>
                                    <ToggleButton value="upgrade" aria-label="mejorar">
                                        Mejorar
                                    </ToggleButton>
                                    <ToggleButton value="both" aria-label="ambos">
                                        Ambos
                                    </ToggleButton>
                                </ToggleButtonGroup>
                                <Button
                                    variant="contained"
                                    onClick={handleGenerate}
                                    disabled={!inputText.trim() || generating}
                                    fullWidth
                                    sx={{
                                        minHeight: '56px',
                                        backgroundColor: 'primary.main',
                                        color: 'primary.contrastText',
                                        '&:hover': {
                                            backgroundColor: 'primary.dark',
                                        },
                                        '&:disabled': {
                                            backgroundColor: 'action.disabledBackground',
                                            color: 'action.disabled',
                                        },
                                    }}
                                >
                                    {generating ? 'Generando...' : 'Generar'}
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>

                {/* Área de Resultado */}
                <Box sx={{ position: 'relative', mb: 2 }}>
                    <Box sx={{ display: 'flex', mb: 1 }}>
                        <ToggleButtonGroup
                            value={viewMode}
                            exclusive
                            onChange={handleViewModeChange}
                            size="small"
                            disabled={!generatedResult}
                        >
                            <ToggleButton value="raw">Texto</ToggleButton>
                            <ToggleButton value="preview">Vista previa</ToggleButton>
                        </ToggleButtonGroup>
                    </Box>
                    <Box
                        sx={{
                            minHeight: '400px',
                            backgroundColor: 'background.paper',
                            borderRadius: 1,
                            p: 3,
                            border: 'none',
                            color: 'text.primary',
                            whiteSpace: viewMode === 'preview' ? 'normal' : 'pre-wrap',
                            wordWrap: 'break-word',
                            fontSize: '1rem',
                            lineHeight: 1.6,
                            display: 'flex',
                            alignItems: generatedResult || generating ? 'flex-start' : 'center',
                            justifyContent: generatedResult || generating ? 'flex-start' : 'center',
                        }}
                    >
                        {generating ? (
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: 2,
                                }}
                            >
                                <CircularProgress size={50} />
                                <Typography
                                    variant="body1"
                                    color="text.secondary"
                                >
                                    Generando historia...
                                </Typography>
                            </Box>
                        ) : generatedResult ? (
                            <Box sx={{ width: '100%' }}>
                                {viewMode === 'preview' ? (
                                    <Box
                                        sx={{
                                            '& h1, & h2, & h3, & h4': {
                                                mt: 3,
                                                mb: 1.5,
                                            },
                                            '& p': {
                                                mb: 2,
                                            },
                                            '& ol, & ul': {
                                                pl: 3,
                                                mb: 2,
                                            },
                                            '& li': {
                                                mb: 1,
                                            },
                                            '& strong': {
                                                fontWeight: 600,
                                            },
                                        }}
                                    >
                                        <ReactMarkdown>{generatedResult}</ReactMarkdown>
                                    </Box>
                                ) : (
                                    generatedResult
                                )}
                            </Box>
                        ) : (
                            <Typography
                                variant="body1"
                                color="text.secondary"
                                sx={{ fontStyle: 'italic' }}
                            >
                                El resultado de la historia generada aparecerá aquí...
                            </Typography>
                        )}
                    </Box>

                    {/* Botón Descargar */}
                    {generatedResult && (
                        <Box
                            sx={{
                                position: 'absolute',
                                bottom: 16,
                                right: 16,
                            }}
                        >
                            <Button
                                variant="contained"
                                startIcon={<DownloadIcon />}
                                onClick={handleDownload}
                                sx={{
                                    backgroundColor: 'primary.main',
                                    color: 'primary.contrastText',
                                    '&:hover': {
                                        backgroundColor: 'primary.dark',
                                    },
                                }}
                            >
                                Descargar
                            </Button>
                        </Box>
                    )}
                </Box>
            </Paper>
        </Box>
    )
}

export default History


import { useState } from 'react'
import { Box, Typography, Paper, TextField, Button, Grid } from '@mui/material'

function Environment() {
    const [environment, setEnvironment] = useState({
        name: '',
        url: '',
        description: '',
    })

    const handleChange = (field, value) => {
        setEnvironment((prev) => ({
            ...prev,
            [field]: value,
        }))
    }

    const handleSave = () => {
        // TODO: Implementar guardado de configuración de entorno
        console.log('Guardando configuración de entorno:', environment)
    }

    return (
        <Box>
            <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 3 }}>
                Configuración de Entorno
            </Typography>

            <Paper sx={{ p: 3 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Nombre del Entorno"
                            value={environment.name || ''}
                            onChange={(e) => handleChange('name', e.target.value)}
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="URL"
                            value={environment.url || ''}
                            onChange={(e) => handleChange('url', e.target.value)}
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Descripción"
                            value={environment.description || ''}
                            onChange={(e) => handleChange('description', e.target.value)}
                            margin="normal"
                            multiline
                            rows={4}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                            <Button variant="contained" onClick={handleSave}>
                                Guardar
                            </Button>
                            <Button variant="outlined" onClick={() => setEnvironment({ name: '', url: '', description: '' })}>
                                Limpiar
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    )
}

export default Environment


import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Alert,
  InputAdornment,
  IconButton,
  CircularProgress,
} from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import EmailIcon from '@mui/icons-material/Email'
import authService from '../services/authService'
import logoImage from '../asset/image/logo.png'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await authService.login(username, password)
      navigate('/history')
    } catch (err) {
      setError(err.message || 'Error al iniciar sesión. Verifica tus credenciales.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #B155CF 0%, #5F2995 100%)',
        padding: 2,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={0}
          sx={{
            padding: 5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: '#2A2A2A',
            borderRadius: 4,
            border: 'none',
            width: '100%',
            maxWidth: '450px',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <Box
            sx={{
              marginBottom: 4,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              position: 'relative',
              zIndex: 1,
            }}
          >
            <Box
              component="img"
              src={logoImage}
              alt="SPARTA Logo"
              sx={{
                width: '140px',
                height: '140px',
                objectFit: 'contain',
                display: 'block',
                maxWidth: '100%',
                maxHeight: '100%',
              }}
            />
          </Box>

          <Typography
            component="h1"
            variant="h3"
            sx={{
              fontWeight: 700,
              marginBottom: 1.5,
              color: '#FFFFFF',
              textTransform: 'uppercase',
              letterSpacing: '3px',
              fontSize: { xs: '2rem', sm: '2.5rem' },
            }}
          >
            SPARTA
          </Typography>

          <Typography
            variant="body2"
            sx={{
              marginBottom: 4,
              color: '#FFFFFF',
              fontSize: '0.7rem',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              fontWeight: 500,
              textAlign: 'center',
            }}
          >
            PREDICTIVE REGRESSION & TESTING
          </Typography>

          {error && (
            <Alert severity="error" sx={{ width: '100%', marginBottom: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
            <Typography
              variant="h6"
              sx={{
                marginBottom: 3,
                color: '#FFFFFF',
                fontWeight: 700,
                fontSize: '1.25rem',
                textAlign: 'left',
                width: '100%',
              }}
            >
              Hola!
            </Typography>
            <TextField
              required
              fullWidth
              id="username"
              label="USUARIO"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              sx={{
                mb: 2.5,
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  color: '#FFFFFF',
                  borderRadius: 1,
                  '& fieldset': {
                    borderColor: '#FFFFFF',
                    borderWidth: '1.5px',
                  },
                  '&:hover fieldset': {
                    borderColor: '#FFFFFF',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#C792FC',
                    borderWidth: '2px',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#FFFFFF',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#C792FC',
                },
                '& .MuiInputBase-input': {
                  color: '#FFFFFF',
                  '&::placeholder': {
                    color: 'rgba(255, 255, 255, 0.5)',
                  },
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon sx={{ color: '#FFFFFF', fontSize: 22 }} />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              required
              fullWidth
              name="password"
              label="PASSWORD"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{
                mb: 1,
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  color: '#FFFFFF',
                  borderRadius: 1,
                  '& fieldset': {
                    borderColor: '#FFFFFF',
                    borderWidth: '1.5px',
                  },
                  '&:hover fieldset': {
                    borderColor: '#FFFFFF',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#C792FC',
                    borderWidth: '2px',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#FFFFFF',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#C792FC',
                },
                '& .MuiInputBase-input': {
                  color: '#FFFFFF',
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlinedIcon sx={{ color: '#FFFFFF', fontSize: 22 }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      sx={{ color: '#FFFFFF', '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' } }}
                    >
                      {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 4,
                mb: 1,
                padding: 1.75,
                fontSize: '1rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '1px',
                backgroundColor: '#C792FC',
                color: '#FFFFFF',
                borderRadius: 1,
                '&:hover': {
                  backgroundColor: '#A06BD9',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 12px rgba(199, 146, 252, 0.4)',
                },
                '&:disabled': {
                  backgroundColor: 'rgba(199, 146, 252, 0.5)',
                },
                transition: 'all 0.3s ease',
              }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'INGRESAR'}
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  )
}

export default Login


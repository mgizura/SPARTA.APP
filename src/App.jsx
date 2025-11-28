import { useState, useMemo } from 'react'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { getTheme } from './theme/theme'
import Layout from './components/Layout'
import Login from './components/Login'
import ProtectedRoute from './components/ProtectedRoute'
import History from './feature/history/history'
import Configuration from './feature/configuration/configuration'
import Users from './feature/users/users'
import Environment from './feature/configuration/environment'

function App() {
  const [mode, setMode] = useState('dark')

  const theme = useMemo(() => getTheme(mode), [mode])

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <Layout mode={mode} toggleMode={toggleMode}>
                  <Routes>
                    <Route path="/" element={<Navigate to="/history" replace />} />
                    <Route path="/history" element={<History />} />
                    <Route path="/configuration" element={<Configuration />} />
                    <Route path="/configuration/users" element={<Users />} />
                    <Route path="/configuration/environment" element={<Environment />} />
                  </Routes>
                </Layout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App


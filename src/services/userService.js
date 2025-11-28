import authService from './authService'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

class UserService {
    async getAllUsers() {
        try {
            const response = await fetch(`${API_BASE_URL}/User`, {
                method: 'GET',
                headers: authService.getAuthHeaders(),
            })

            if (!response.ok) {
                const error = await response.json()
                throw new Error(error.message || 'Error al obtener usuarios')
            }

            return await response.json()
        } catch (error) {
            throw error
        }
    }

    async changePassword(userId, newPassword, confirmPassword) {
        try {
            const response = await fetch(`${API_BASE_URL}/User/${userId}/change-password`, {
                method: 'PUT',
                headers: authService.getAuthHeaders(),
                body: JSON.stringify({
                    newPassword,
                    confirmPassword,
                }),
            })

            if (!response.ok) {
                const error = await response.json()
                throw new Error(error.message || 'Error al cambiar contraseña')
            }

            return await response.json()
        } catch (error) {
            throw error
        }
    }
}

export default new UserService()


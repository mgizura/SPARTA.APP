import authService from '../../../services/authService'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

// History service - Business logic for history feature
export const historyService = {
    // Get history data
    getHistory: async () => {
        // TODO: Implement API call to fetch history
        return []
    },

    // Generate history entry - calls backend
    addHistoryEntry: async (entry, hasTest = false, hasUpgrade = false) => {
        try {
            const response = await fetch(`${API_BASE_URL}/History/generate`, {
                method: 'POST',
                headers: authService.getAuthHeaders(),
                body: JSON.stringify({
                    text: entry.title,
                    hasTest: hasTest,
                    hasUpgrade: hasUpgrade,
                }),
            })

            if (!response.ok) {
                const error = await response.json()
                throw new Error(error.message || 'Error al generar historial')
            }

            // El backend retorna un string directamente
            const result = await response.text()
            return {
                ...entry,
                description: result,
            }
        } catch (error) {
            throw error
        }
    },

    // Delete history entry
    deleteHistoryEntry: async (id) => {
        // TODO: Implement API call to delete history entry
        return { success: true }
    },
}


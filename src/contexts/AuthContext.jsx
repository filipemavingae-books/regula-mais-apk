import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Simular carregamento inicial
  useEffect(() => {
    const savedUser = localStorage.getItem('regula_user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  // Função de registo
  const register = async (userData) => {
    try {
      // Simular API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const newUser = {
        id: Date.now(),
        name: userData.name,
        email: userData.email,
        uuid: generateUUID(),
        createdAt: new Date().toISOString(),
        stats: {
          uploadedApks: 0,
          totalDownloads: 0,
          invitesSent: 0,
          averageRating: 0
        }
      }
      
      setUser(newUser)
      localStorage.setItem('regula_user', JSON.stringify(newUser))
      
      // Simular envio de UUID por email
      console.log(`UUID enviado para ${userData.email}: ${newUser.uuid}`)
      
      return { success: true, user: newUser }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  // Função de login
  const login = async (credentials) => {
    try {
      // Simular API call
      await new Promise(resolve => setTimeout(resolve, 800))
      
      // Simular utilizador existente
      const existingUser = {
        id: 1,
        name: 'João Silva',
        email: credentials.email,
        uuid: 'abc123-def456-gh1789',
        createdAt: '2025-01-15T10:00:00Z',
        stats: {
          uploadedApks: 12,
          totalDownloads: 3456,
          invitesSent: 8,
          averageRating: 4.6
        }
      }
      
      setUser(existingUser)
      localStorage.setItem('regula_user', JSON.stringify(existingUser))
      
      return { success: true, user: existingUser }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  // Função de logout
  const logout = () => {
    setUser(null)
    localStorage.removeItem('regula_user')
  }

  // Função para gerar UUID
  const generateUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0
      const v = c === 'x' ? r : (r & 0x3 | 0x8)
      return v.toString(16)
    })
  }

  // Função para recuperar palavra-passe
  const forgotPassword = async (email) => {
    try {
      // Simular API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Simular envio de código por email
      const resetCode = Math.random().toString(36).substring(2, 8).toUpperCase()
      console.log(`Código de recuperação enviado para ${email}: ${resetCode}`)
      
      return { success: true, message: 'Código enviado para o seu email' }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  // Função para atualizar estatísticas do utilizador
  const updateUserStats = (newStats) => {
    if (user) {
      const updatedUser = {
        ...user,
        stats: { ...user.stats, ...newStats }
      }
      setUser(updatedUser)
      localStorage.setItem('regula_user', JSON.stringify(updatedUser))
    }
  }

  const value = {
    user,
    loading,
    register,
    login,
    logout,
    forgotPassword,
    updateUserStats,
    isAuthenticated: !!user
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

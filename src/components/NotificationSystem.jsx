import { useState, useEffect, createContext, useContext } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  CheckCircle, 
  AlertCircle, 
  XCircle, 
  Info, 
  X,
  Download,
  Upload,
  Star,
  Shield
} from 'lucide-react'

// Context para notificações
const NotificationContext = createContext()

export const useNotifications = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotifications deve ser usado dentro de NotificationProvider')
  }
  return context
}

// Provider de notificações
export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([])

  const addNotification = (notification) => {
    const id = Date.now() + Math.random()
    const newNotification = {
      id,
      type: 'info',
      duration: 5000,
      ...notification
    }

    setNotifications(prev => [...prev, newNotification])

    // Auto remove após duração especificada
    if (newNotification.duration > 0) {
      setTimeout(() => {
        removeNotification(id)
      }, newNotification.duration)
    }

    return id
  }

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  const clearAll = () => {
    setNotifications([])
  }

  // Funções de conveniência
  const success = (title, message, options = {}) => 
    addNotification({ type: 'success', title, message, ...options })

  const error = (title, message, options = {}) => 
    addNotification({ type: 'error', title, message, ...options })

  const warning = (title, message, options = {}) => 
    addNotification({ type: 'warning', title, message, ...options })

  const info = (title, message, options = {}) => 
    addNotification({ type: 'info', title, message, ...options })

  const download = (title, message, options = {}) => 
    addNotification({ type: 'download', title, message, ...options })

  const upload = (title, message, options = {}) => 
    addNotification({ type: 'upload', title, message, ...options })

  const security = (title, message, options = {}) => 
    addNotification({ type: 'security', title, message, ...options })

  const review = (title, message, options = {}) => 
    addNotification({ type: 'review', title, message, ...options })

  return (
    <NotificationContext.Provider value={{
      notifications,
      addNotification,
      removeNotification,
      clearAll,
      success,
      error,
      warning,
      info,
      download,
      upload,
      security,
      review
    }}>
      {children}
      <NotificationContainer />
    </NotificationContext.Provider>
  )
}

// Container de notificações
const NotificationContainer = () => {
  const { notifications } = useNotifications()

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
      <AnimatePresence>
        {notifications.map((notification) => (
          <NotificationToast key={notification.id} notification={notification} />
        ))}
      </AnimatePresence>
    </div>
  )
}

// Componente individual de toast
const NotificationToast = ({ notification }) => {
  const { removeNotification } = useNotifications()
  const [progress, setProgress] = useState(100)

  useEffect(() => {
    if (notification.duration <= 0) return

    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev - (100 / (notification.duration / 100))
        return newProgress <= 0 ? 0 : newProgress
      })
    }, 100)

    return () => clearInterval(interval)
  }, [notification.duration])

  const getIcon = () => {
    const iconProps = { className: "h-5 w-5" }
    
    switch (notification.type) {
      case 'success':
        return <CheckCircle {...iconProps} className="h-5 w-5 text-green-500" />
      case 'error':
        return <XCircle {...iconProps} className="h-5 w-5 text-red-500" />
      case 'warning':
        return <AlertCircle {...iconProps} className="h-5 w-5 text-yellow-500" />
      case 'download':
        return <Download {...iconProps} className="h-5 w-5 text-blue-500" />
      case 'upload':
        return <Upload {...iconProps} className="h-5 w-5 text-purple-500" />
      case 'security':
        return <Shield {...iconProps} className="h-5 w-5 text-green-600" />
      case 'review':
        return <Star {...iconProps} className="h-5 w-5 text-yellow-500" />
      default:
        return <Info {...iconProps} className="h-5 w-5 text-blue-500" />
    }
  }

  const getColors = () => {
    switch (notification.type) {
      case 'success':
        return {
          bg: 'bg-green-50 border-green-200',
          text: 'text-green-800',
          progress: 'bg-green-500'
        }
      case 'error':
        return {
          bg: 'bg-red-50 border-red-200',
          text: 'text-red-800',
          progress: 'bg-red-500'
        }
      case 'warning':
        return {
          bg: 'bg-yellow-50 border-yellow-200',
          text: 'text-yellow-800',
          progress: 'bg-yellow-500'
        }
      case 'download':
        return {
          bg: 'bg-blue-50 border-blue-200',
          text: 'text-blue-800',
          progress: 'bg-blue-500'
        }
      case 'upload':
        return {
          bg: 'bg-purple-50 border-purple-200',
          text: 'text-purple-800',
          progress: 'bg-purple-500'
        }
      case 'security':
        return {
          bg: 'bg-green-50 border-green-200',
          text: 'text-green-800',
          progress: 'bg-green-600'
        }
      case 'review':
        return {
          bg: 'bg-yellow-50 border-yellow-200',
          text: 'text-yellow-800',
          progress: 'bg-yellow-500'
        }
      default:
        return {
          bg: 'bg-blue-50 border-blue-200',
          text: 'text-blue-800',
          progress: 'bg-blue-500'
        }
    }
  }

  const colors = getColors()

  return (
    <motion.div
      initial={{ opacity: 0, x: 300, scale: 0.8 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 300, scale: 0.8 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`relative overflow-hidden rounded-lg border p-4 shadow-lg backdrop-blur-sm ${colors.bg}`}
      whileHover={{ scale: 1.02 }}
    >
      {/* Barra de progresso */}
      {notification.duration > 0 && (
        <motion.div
          className={`absolute bottom-0 left-0 h-1 ${colors.progress}`}
          initial={{ width: '100%' }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.1, ease: "linear" }}
        />
      )}

      <div className="flex items-start space-x-3">
        {/* Ícone */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
        >
          {getIcon()}
        </motion.div>

        {/* Conteúdo */}
        <div className="flex-1 min-w-0">
          {notification.title && (
            <motion.h4
              className={`text-sm font-medium ${colors.text}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {notification.title}
            </motion.h4>
          )}
          
          {notification.message && (
            <motion.p
              className={`text-sm ${colors.text} opacity-90 ${notification.title ? 'mt-1' : ''}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {notification.message}
            </motion.p>
          )}

          {/* Ações personalizadas */}
          {notification.actions && (
            <motion.div
              className="mt-3 flex space-x-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {notification.actions.map((action, index) => (
                <button
                  key={index}
                  onClick={action.onClick}
                  className={`text-xs font-medium px-2 py-1 rounded transition-colors ${colors.text} hover:bg-white/50`}
                >
                  {action.label}
                </button>
              ))}
            </motion.div>
          )}
        </div>

        {/* Botão fechar */}
        <motion.button
          onClick={() => removeNotification(notification.id)}
          className={`flex-shrink-0 ${colors.text} hover:opacity-70 transition-opacity`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <X className="h-4 w-4" />
        </motion.button>
      </div>
    </motion.div>
  )
}

// Hook para notificações específicas da plataforma
export const useApkNotifications = () => {
  const notifications = useNotifications()

  return {
    ...notifications,
    
    // Notificações específicas da plataforma
    apkUploaded: (apkName) => notifications.upload(
      'APK Carregado!',
      `${apkName} foi carregado com sucesso. Aguarde a verificação Bluinder.`,
      { duration: 7000 }
    ),

    apkVerified: (apkName) => notifications.security(
      'APK Verificado!',
      `${apkName} passou na verificação de segurança e está disponível para download.`,
      { duration: 6000 }
    ),

    downloadStarted: (apkName) => notifications.download(
      'Download Iniciado',
      `O download de ${apkName} foi iniciado.`,
      { duration: 4000 }
    ),

    downloadCompleted: (apkName) => notifications.success(
      'Download Concluído!',
      `${apkName} foi baixado com sucesso.`,
      { duration: 5000 }
    ),

    reviewSubmitted: (rating) => notifications.review(
      'Avaliação Enviada!',
      `Obrigado pela sua avaliação de ${rating} estrelas.`,
      { duration: 4000 }
    ),

    apkReported: () => notifications.warning(
      'APK Reportado',
      'O APK foi reportado e será analisado pela nossa equipa.',
      { duration: 5000 }
    ),

    loginSuccess: (userName) => notifications.success(
      'Login Realizado!',
      `Bem-vindo de volta, ${userName}!`,
      { duration: 3000 }
    ),

    registrationSuccess: (uuid) => notifications.success(
      'Conta Criada!',
      `Sua conta foi criada com sucesso. UUID: ${uuid}`,
      { duration: 8000 }
    )
  }
}

export default NotificationSystem

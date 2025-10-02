import { useAuth } from '../contexts/AuthContext'
import ApkUploadForm from './ApkUploadForm'
import { Navigate } from 'react-router-dom'

const UploadPage = () => {
  const { user, isAuthenticated } = useAuth()

  // Redirecionar se não estiver autenticado
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <ApkUploadForm />
    </div>
  )
}

export default UploadPage

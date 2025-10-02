import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Smartphone, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useApkNotifications } from './NotificationSystem'

const LoginPage = () => {
  const navigate = useNavigate()
  const { login, loading } = useAuth()
  const notifications = useApkNotifications()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!formData.email || !formData.password) {
      setError('Por favor, preencha todos os campos.')
      return
    }

    try {
      const result = await login(formData)
      
      if (result.success) {
        notifications.loginSuccess(result.user.name)
        navigate('/dashboard')
      } else {
        setError(result.error || 'Erro ao fazer login. Tente novamente.')
      }
    } catch (err) {
      setError('Erro ao fazer login. Tente novamente.')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-2xl border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-8">
            <motion.div
              className="mx-auto mb-4 p-4 bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Smartphone className="h-8 w-8 text-primary" />
            </motion.div>
            <CardTitle className="text-2xl font-bold">Entrar na Conta</CardTitle>
            <CardDescription className="text-muted-foreground">
              Aceda à sua conta Regula Mais APK
            </CardDescription>
          </CardHeader>

          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  E-mail
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="pl-10 h-12"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Palavra-passe
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="pl-10 pr-10 h-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex justify-end">
                <Link 
                  to="/forgot-password" 
                  className="text-sm text-primary hover:underline"
                >
                  Esqueceu a palavra-passe?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full h-12 text-base font-medium"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Entrando...
                  </div>
                ) : (
                  <div className="flex items-center">
                    Entrar
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Não tem conta?{' '}
                <Link to="/register" className="text-primary hover:underline font-medium">
                  Registar agora
                </Link>
              </p>
            </div>

            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-xs text-center text-muted-foreground">
                Ao entrar, concorda com os nossos{' '}
                <Link to="/policies" className="text-primary hover:underline">
                  Termos de Serviço
                </Link>{' '}
                e{' '}
                <Link to="/policies" className="text-primary hover:underline">
                  Política de Privacidade
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export default LoginPage

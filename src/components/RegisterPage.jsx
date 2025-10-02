import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Checkbox } from '@/components/ui/checkbox'
import { Smartphone, User, Mail, Lock, Eye, EyeOff, ArrowRight, CheckCircle } from 'lucide-react'

const RegisterPage = ({ setUser }) => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    })
  }

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      setError('Por favor, insira o seu nome completo.')
      return false
    }
    
    if (!formData.email.trim()) {
      setError('Por favor, insira o seu e-mail.')
      return false
    }
    
    if (formData.password.length < 6) {
      setError('A palavra-passe deve ter pelo menos 6 caracteres.')
      return false
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('As palavras-passe não coincidem.')
      return false
    }
    
    if (!formData.acceptTerms) {
      setError('Deve aceitar os Termos de Serviço para continuar.')
      return false
    }
    
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    if (!validateForm()) {
      setLoading(false)
      return
    }

    try {
      // Simulação de registo - substituir por API real
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Simular geração de UUID
      const uuid = `uuid-${Math.random().toString(36).substr(2, 9)}-${Date.now()}`
      
      const user = {
        id: Date.now().toString(),
        name: formData.fullName,
        email: formData.email,
        uuid: uuid,
        joinDate: new Date().toISOString()
      }
      
      setSuccess(`Conta criada com sucesso! O seu UUID (${uuid}) foi enviado para ${formData.email}.`)
      
      // Aguardar 2 segundos antes de redirecionar
      setTimeout(() => {
        setUser(user)
        navigate('/dashboard')
      }, 2000)
      
    } catch (err) {
      setError('Erro ao criar conta. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-accent/5 py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-2xl border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader className="text-center space-y-4">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="mx-auto bg-primary text-primary-foreground p-3 rounded-full w-fit"
            >
              <Smartphone className="h-8 w-8" />
            </motion.div>
            
            <div>
              <CardTitle className="text-2xl font-bold">Criar Conta</CardTitle>
              <CardDescription>
                Junte-se à comunidade Regula Mais APK
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {success && (
                <Alert className="border-green-200 bg-green-50 text-green-800">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription>{success}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="fullName">Nome Completo</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="fullName"
                    name="fullName"
                    type="text"
                    placeholder="João Silva"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Palavra-passe</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="pl-10 pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-2 h-6 w-6 p-0"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar Palavra-passe</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="pl-10 pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-2 h-6 w-6 p-0"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="acceptTerms"
                  name="acceptTerms"
                  checked={formData.acceptTerms}
                  onCheckedChange={(checked) => setFormData({ ...formData, acceptTerms: checked })}
                />
                <Label htmlFor="acceptTerms" className="text-sm">
                  Aceito os{' '}
                  <Link to="/policies" className="text-primary hover:underline">
                    Termos de Serviço
                  </Link>{' '}
                  e{' '}
                  <Link to="/policies" className="text-primary hover:underline">
                    Política de Privacidade
                  </Link>
                </Label>
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                disabled={loading || success}
              >
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></div>
                    <span>A criar conta...</span>
                  </div>
                ) : success ? (
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4" />
                    <span>Conta criada!</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <span>Criar Conta</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Já tem conta?{' '}
                <Link to="/login" className="text-primary hover:underline font-medium">
                  Entrar agora
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-8 text-center text-sm text-muted-foreground"
        >
          <p>
            Após o registo, receberá o seu UUID único por e-mail.
            <br />
            Este UUID será usado para convites e colaboração.
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default RegisterPage

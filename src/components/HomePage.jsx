import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useApk } from '../contexts/ApkContext'
import ApkCard from './ApkCard'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Smartphone, 
  Shield, 
  Users, 
  Download, 
  Upload, 
  Star, 
  Clock, 
  CheckCircle,
  ArrowRight,
  Play,
  Zap,
  Globe,
  Lock
} from 'lucide-react'

const HomePage = () => {
  const { featuredApks, loading } = useApk()
  const [stats, setStats] = useState({
    totalApks: 1247,
    totalDownloads: 89432,
    activeUsers: 5678,
    securityScans: 12450
  })

  const features = [
    {
      icon: Shield,
      title: 'Segurança Avançada',
      description: 'Sistema Bluinder de revisão automática em 2 minutos. Todos os APKs são verificados antes da publicação.',
      color: 'text-green-500'
    },
    {
      icon: Users,
      title: 'Comunidade Ativa',
      description: 'Milhares de utilizadores partilham e avaliam APKs diariamente. Sistema de convites para colaboração.',
      color: 'text-blue-500'
    },
    {
      icon: Zap,
      title: 'Download Rápido',
      description: 'Downloads otimizados com contagem regressiva de 10 segundos. Servidores de alta velocidade.',
      color: 'text-yellow-500'
    },
    {
      icon: Globe,
      title: 'Acesso Global',
      description: 'Plataforma acessível globalmente com suporte para múltiplas linguagens e regiões.',
      color: 'text-purple-500'
    }
  ]

  const steps = [
    {
      number: 1,
      title: 'Registar Conta',
      description: 'Crie uma conta segura e receba o seu UUID único por e-mail.',
      icon: Users
    },
    {
      number: 2,
      title: 'Upload APK',
      description: 'Carregue o seu APK com screenshots e descrição. Revisão automática em 2 minutos.',
      icon: Upload
    },
    {
      number: 3,
      title: 'Partilhar & Download',
      description: 'Partilhe com a comunidade e faça download de APKs verificados.',
      icon: Download
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/10 py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
                🚀 Plataforma Inovadora de APKs
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Regula Mais APK
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                A plataforma mais segura e confiável para <strong>partilhar</strong>, <strong>fazer download</strong> e <strong>editar</strong> aplicações Android. 
                Com sistema de revisão automática Bluinder e comunidade ativa.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link to="/register">
                  <Button size="lg" className="w-full sm:w-auto group">
                    Começar Agora
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                
                <Button variant="outline" size="lg" className="w-full sm:w-auto group">
                  <Play className="mr-2 h-4 w-4" />
                  Ver Demonstração
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(stats).map(([key, value], index) => (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className="text-2xl font-bold text-primary">
                      {value.toLocaleString()}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {key === 'totalApks' && 'APKs Verificados'}
                      {key === 'totalDownloads' && 'Downloads'}
                      {key === 'activeUsers' && 'Utilizadores'}
                      {key === 'securityScans' && 'Verificações'}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative bg-card rounded-2xl p-8 shadow-2xl border border-border">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl"></div>
                <div className="relative">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-2">
                      <Smartphone className="h-6 w-6 text-primary" />
                      <span className="font-semibold">APK em Destaque</span>
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-700">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Verificado
                    </Badge>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="text-4xl">📱</div>
                      <div>
                        <h3 className="font-semibold">WhatsApp Business</h3>
                        <p className="text-sm text-muted-foreground">v2.23.20.76 • 45.2 MB</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">4.8</span>
                        <span className="text-sm text-muted-foreground">(1,247 avaliações)</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        15.4k downloads
                      </div>
                    </div>
                    
                    <Button className="w-full">
                      <Download className="mr-2 h-4 w-4" />
                      Download APK
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Por que escolher a Regula Mais APK?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Oferecemos a melhor experiência em segurança, velocidade e comunidade para utilizadores de APKs.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardHeader className="text-center">
                    <div className={`mx-auto mb-4 p-3 rounded-full bg-background ${feature.color}`}>
                      <feature.icon className="h-8 w-8" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Como Funciona
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Três passos simples para começar a usar a nossa plataforma segura de APKs.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="text-center relative"
              >
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-primary to-transparent transform -translate-x-1/2 z-0"></div>
                )}
                
                <div className="relative z-10">
                  <div className="mx-auto mb-6 w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold">
                    {step.number}
                  </div>
                  
                  <div className="mb-4">
                    <step.icon className="h-12 w-12 mx-auto text-primary" />
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured APKs Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              APKs em Destaque
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Aplicações populares e verificadas pela nossa comunidade.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {loading ? (
              // Loading skeleton
              Array.from({ length: 3 }).map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="h-80 bg-muted rounded-lg animate-pulse"
                />
              ))
            ) : (
              featuredApks.map((apk, index) => (
                <motion.div
                  key={apk.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <ApkCard apk={apk} variant="featured" />
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-accent text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Pronto para começar?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Junte-se à nossa comunidade de milhares de utilizadores e comece a partilhar APKs de forma segura hoje mesmo.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  Criar Conta Gratuita
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              
              <Link to="/policies">
                <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                  Saber Mais
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default HomePage

import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Label } from '@/components/ui/label'
import { 
  Upload, 
  Download, 
  Users, 
  Star, 
  Clock, 
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Eye,
  Edit,
  Trash2,
  Share2
} from 'lucide-react'

import { useAuth } from '../contexts/AuthContext'

const DashboardPage = () => {
  const { user, isAuthenticated } = useAuth()
  const [stats, setStats] = useState({
    uploadedApks: 12,
    totalDownloads: 3456,
    invitesSent: 8,
    averageRating: 4.6
  })

  const [myApks, setMyApks] = useState([
    {
      id: 1,
      name: 'Minha App Demo',
      version: '1.0.0',
      size: '25.4 MB',
      downloads: 1234,
      rating: 4.8,
      status: 'approved',
      uploadDate: '2025-01-15',
      category: 'Produtividade'
    },
    {
      id: 2,
      name: 'Calculadora Pro',
      version: '2.1.3',
      size: '8.2 MB',
      downloads: 567,
      rating: 4.2,
      status: 'pending',
      uploadDate: '2025-01-20',
      category: 'Ferramentas'
    },
    {
      id: 3,
      name: 'Jogo Puzzle',
      version: '1.5.0',
      size: '45.1 MB',
      downloads: 1655,
      rating: 4.9,
      status: 'approved',
      uploadDate: '2025-01-10',
      category: 'Jogos'
    }
  ])

  const [recentDownloads, setRecentDownloads] = useState([
    {
      id: 1,
      name: 'WhatsApp Business',
      version: '2.23.20.76',
      downloadDate: '2025-01-22',
      size: '45.2 MB'
    },
    {
      id: 2,
      name: 'Instagram',
      version: '302.0.0.23.108',
      downloadDate: '2025-01-21',
      size: '52.1 MB'
    },
    {
      id: 3,
      name: 'Spotify Music',
      version: '8.8.42.488',
      downloadDate: '2025-01-20',
      size: '31.8 MB'
    }
  ])

  const getStatusBadge = (status) => {
    switch (status) {
      case 'approved':
        return (
          <Badge className="bg-green-100 text-green-700 border-green-200">
            <CheckCircle className="h-3 w-3 mr-1" />
            Aprovado
          </Badge>
        )
      case 'pending':
        return (
          <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">
            <Clock className="h-3 w-3 mr-1" />
            Pendente
          </Badge>
        )
      case 'rejected':
        return (
          <Badge className="bg-red-100 text-red-700 border-red-200">
            <AlertCircle className="h-3 w-3 mr-1" />
            Rejeitado
          </Badge>
        )
      default:
        return null
    }
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <CardTitle>Acesso Negado</CardTitle>
            <CardDescription>
              Precisa de fazer login para aceder ao painel.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/login">
              <Button>Fazer Login</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Olá, {user.name}! 👋
              </h1>
              <p className="text-muted-foreground">
                Bem-vindo ao seu painel de controlo da Regula Mais APK
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                UUID: <code className="bg-muted px-2 py-1 rounded text-xs">{user.uuid}</code>
              </p>
            </div>
            
            <Link to="/upload">
              <Button size="lg" className="group">
                <Upload className="mr-2 h-4 w-4 group-hover:translate-y-[-2px] transition-transform" />
                Upload APK
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">APKs Carregados</CardTitle>
              <Upload className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.uploadedApks}</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="inline h-3 w-3 mr-1" />
                +2 este mês
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Downloads</CardTitle>
              <Download className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalDownloads.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="inline h-3 w-3 mr-1" />
                +15% vs mês anterior
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Convites Enviados</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.invitesSent}</div>
              <p className="text-xs text-muted-foreground">
                5 aceites, 3 pendentes
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avaliação Média</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.averageRating}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3 w-3 ${
                      i < Math.floor(stats.averageRating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-muted-foreground'
                    }`}
                  />
                ))}
                <span className="ml-1">({myApks.length} APKs)</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Tabs defaultValue="my-apks" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="my-apks">Os Meus APKs</TabsTrigger>
              <TabsTrigger value="downloads">Downloads</TabsTrigger>
              <TabsTrigger value="invites">Convites</TabsTrigger>
            </TabsList>

            <TabsContent value="my-apks" className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Os Meus APKs</h2>
                <Link to="/upload">
                  <Button variant="outline">
                    <Upload className="mr-2 h-4 w-4" />
                    Novo APK
                  </Button>
                </Link>
              </div>

              <div className="grid gap-4">
                {myApks.map((apk) => (
                  <Card key={apk.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{apk.name}</CardTitle>
                          <CardDescription>
                            v{apk.version} • {apk.size} • {apk.category}
                          </CardDescription>
                        </div>
                        {getStatusBadge(apk.status)}
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Download className="h-4 w-4" />
                            <span>{apk.downloads.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span>{apk.rating}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{new Date(apk.uploadDate).toLocaleDateString('pt-PT')}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <Link to={`/apk/${apk.id}`}>
                          <Button variant="outline" size="sm">
                            <Eye className="mr-2 h-4 w-4" />
                            Ver
                          </Button>
                        </Link>
                        <Button variant="outline" size="sm">
                          <Edit className="mr-2 h-4 w-4" />
                          Editar
                        </Button>
                        <Button variant="outline" size="sm">
                          <Share2 className="mr-2 h-4 w-4" />
                          Partilhar
                        </Button>
                        <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Eliminar
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="downloads" className="space-y-4">
              <h2 className="text-xl font-semibold">Downloads Recentes</h2>
              
              <div className="grid gap-4">
                {recentDownloads.map((download) => (
                  <Card key={download.id}>
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-semibold">{download.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            v{download.version} • {download.size}
                          </p>
                        </div>
                        <div className="text-right text-sm text-muted-foreground">
                          <p>{new Date(download.downloadDate).toLocaleDateString('pt-PT')}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="invites" className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Gestão de Convites</h2>
                <Button>
                  <Users className="mr-2 h-4 w-4" />
                  Enviar Convite
                </Button>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Sistema de Convites</CardTitle>
                  <CardDescription>
                    Use o seu UUID para convidar amigos para colaboração em APKs.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium">O Seu UUID:</Label>
                      <div className="flex items-center space-x-2 mt-1">
                        <code className="bg-muted px-3 py-2 rounded text-sm flex-1">
                          {user.uuid}
                        </code>
                        <Button variant="outline" size="sm">
                          Copiar
                        </Button>
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground">
                      Partilhe este UUID com amigos para permitir colaboração nos seus APKs.
                      Os convites têm validade limitada e permitem edição colaborativa.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}

export default DashboardPage

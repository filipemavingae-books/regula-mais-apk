import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  Download, 
  Share2, 
  Heart, 
  Flag, 
  Shield, 
  Calendar,
  Package,
  Smartphone,
  Users,
  Star,
  ArrowLeft,
  ExternalLink,
  CheckCircle,
  AlertTriangle,
  Info
} from 'lucide-react'
import { useApk } from '../contexts/ApkContext'
import { useAuth } from '../contexts/AuthContext'
import DownloadModal from './DownloadModal'
import ReviewSystem from './ReviewSystem'

const ApkDetailsPage = () => {
  const { id } = useParams()
  const { getApkById } = useApk()
  const { isAuthenticated } = useAuth()
  const [apk, setApk] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')

  // Dados de exemplo para avaliações
  const [reviews, setReviews] = useState([
    {
      id: 1,
      userId: 'user1',
      userName: 'Maria Silva',
      userAvatar: null,
      rating: 5,
      comment: 'Excelente aplicação! Funciona perfeitamente no meu dispositivo. Interface muito intuitiva e rápida.',
      date: '2025-01-15T10:30:00Z',
      helpful: 12,
      reported: false,
      verified: true
    },
    {
      id: 2,
      userId: 'user2',
      userName: 'João Santos',
      userAvatar: null,
      rating: 4,
      comment: 'Boa app, mas poderia ter mais funcionalidades. No geral, recomendo.',
      date: '2025-01-14T15:45:00Z',
      helpful: 8,
      reported: false,
      verified: false
    },
    {
      id: 3,
      userId: 'user3',
      userName: 'Ana Costa',
      userAvatar: null,
      rating: 5,
      comment: 'Perfeita! Exatamente o que estava à procura. Download rápido e instalação sem problemas.',
      date: '2025-01-13T09:20:00Z',
      helpful: 15,
      reported: false,
      verified: true
    }
  ])

  useEffect(() => {
    const fetchApk = async () => {
      setLoading(true)
      try {
        // Simular busca de APK por ID
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        const mockApk = {
          id: parseInt(id),
          name: 'WhatsApp Business',
          version: '2.23.20.76',
          size: '45.2 MB',
          downloads: 15420,
          rating: 4.8,
          reviews: 1247,
          verified: true,
          category: 'Comunicação',
          icon: '📱',
          description: 'O WhatsApp Business é uma aplicação gratuita que foi criada especialmente para pequenas empresas. Crie um catálogo para mostrar os seus produtos e serviços. Conecte-se facilmente com os seus clientes usando ferramentas para automatizar, organizar e responder rapidamente às mensagens.',
          uploadDate: '2025-01-10T00:00:00Z',
          packageName: 'com.whatsapp.w4b',
          developer: 'WhatsApp LLC',
          minAndroidVersion: '4.1',
          targetSdkVersion: '33',
          permissions: [
            'Acesso à câmara',
            'Acesso ao microfone', 
            'Acesso aos contactos',
            'Acesso ao armazenamento',
            'Acesso à localização',
            'Acesso à internet'
          ],
          screenshots: [
            'https://via.placeholder.com/300x600/4CAF50/white?text=Screenshot+1',
            'https://via.placeholder.com/300x600/2196F3/white?text=Screenshot+2',
            'https://via.placeholder.com/300x600/FF9800/white?text=Screenshot+3'
          ],
          changelog: [
            {
              version: '2.23.20.76',
              date: '2025-01-10',
              changes: [
                'Melhorias na performance',
                'Correção de bugs menores',
                'Nova funcionalidade de catálogo',
                'Suporte para mais idiomas'
              ]
            },
            {
              version: '2.23.18.70',
              date: '2024-12-15',
              changes: [
                'Interface atualizada',
                'Melhor integração com contactos',
                'Correções de segurança'
              ]
            }
          ]
        }
        
        setApk(mockApk)
      } catch (error) {
        console.error('Erro ao carregar APK:', error)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchApk()
    }
  }, [id])

  const handleReviewSubmit = (newReview) => {
    setReviews(prev => [newReview, ...prev])
    // Atualizar estatísticas do APK
    if (apk) {
      setApk(prev => ({
        ...prev,
        reviews: prev.reviews + 1,
        rating: ((prev.rating * prev.reviews) + newReview.rating) / (prev.reviews + 1)
      }))
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando detalhes do APK...</p>
        </div>
      </div>
    )
  }

  if (!apk) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <CardTitle>APK não encontrado</CardTitle>
            <CardDescription>
              O APK que procura não existe ou foi removido.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar ao Início
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Navegação */}
        <div className="mb-6">
          <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar aos APKs
          </Link>
        </div>

        {/* Header do APK */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Ícone e Info Principal */}
                <div className="flex items-start gap-4">
                  <div className="text-6xl">{apk.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h1 className="text-2xl font-bold">{apk.name}</h1>
                      {apk.verified && (
                        <Badge variant="secondary" className="bg-green-100 text-green-700">
                          <Shield className="h-3 w-3 mr-1" />
                          Verificado
                        </Badge>
                      )}
                    </div>
                    
                    <p className="text-muted-foreground mb-3">
                      v{apk.version} • {apk.size} • {apk.developer}
                    </p>

                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{apk.rating}</span>
                        <span className="text-muted-foreground">({apk.reviews} avaliações)</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-blue-500" />
                        <span>{apk.downloads.toLocaleString()} downloads</span>
                      </div>
                      <Badge variant="outline">{apk.category}</Badge>
                    </div>

                    {/* Botões de Ação */}
                    <div className="flex flex-wrap gap-2">
                      <Button
                        onClick={() => setIsDownloadModalOpen(true)}
                        size="lg"
                        className="flex-1 md:flex-none"
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Download APK
                      </Button>
                      
                      <Button
                        variant="outline"
                        onClick={() => setIsLiked(!isLiked)}
                      >
                        <Heart className={`h-4 w-4 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                      </Button>
                      
                      <Button variant="outline">
                        <Share2 className="h-4 w-4" />
                      </Button>
                      
                      <Button variant="outline">
                        <Flag className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Screenshots */}
                <div className="md:w-80">
                  <div className="flex gap-2 overflow-x-auto">
                    {apk.screenshots.map((screenshot, index) => (
                      <img
                        key={index}
                        src={screenshot}
                        alt={`Screenshot ${index + 1}`}
                        className="w-20 h-36 object-cover rounded border flex-shrink-0"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Tabs de Conteúdo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Visão Geral</TabsTrigger>
              <TabsTrigger value="reviews">Avaliações</TabsTrigger>
              <TabsTrigger value="details">Detalhes</TabsTrigger>
              <TabsTrigger value="changelog">Histórico</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Descrição */}
              <Card>
                <CardHeader>
                  <CardTitle>Sobre esta aplicação</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="leading-relaxed">{apk.description}</p>
                </CardContent>
              </Card>

              {/* Informações Rápidas */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <Calendar className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                    <div className="text-sm text-muted-foreground">Atualizado</div>
                    <div className="font-medium">
                      {new Date(apk.uploadDate).toLocaleDateString('pt-PT')}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 text-center">
                    <Package className="h-8 w-8 mx-auto mb-2 text-green-500" />
                    <div className="text-sm text-muted-foreground">Tamanho</div>
                    <div className="font-medium">{apk.size}</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 text-center">
                    <Smartphone className="h-8 w-8 mx-auto mb-2 text-purple-500" />
                    <div className="text-sm text-muted-foreground">Android</div>
                    <div className="font-medium">{apk.minAndroidVersion}+</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 text-center">
                    <Users className="h-8 w-8 mx-auto mb-2 text-orange-500" />
                    <div className="text-sm text-muted-foreground">Downloads</div>
                    <div className="font-medium">{apk.downloads.toLocaleString()}</div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="reviews">
              <ReviewSystem
                apkId={apk.id}
                initialReviews={reviews}
                onReviewSubmit={handleReviewSubmit}
              />
            </TabsContent>

            <TabsContent value="details" className="space-y-6">
              {/* Informações Técnicas */}
              <Card>
                <CardHeader>
                  <CardTitle>Informações Técnicas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-2">Detalhes da Aplicação</h4>
                      <dl className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">Nome do Pacote:</dt>
                          <dd className="font-mono">{apk.packageName}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">Versão:</dt>
                          <dd>{apk.version}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">Target SDK:</dt>
                          <dd>{apk.targetSdkVersion}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">Android Mínimo:</dt>
                          <dd>{apk.minAndroidVersion}</dd>
                        </div>
                      </dl>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Permissões</h4>
                      <ul className="space-y-1 text-sm">
                        {apk.permissions.map((permission, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <CheckCircle className="h-3 w-3 text-green-500" />
                            {permission}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Aviso de Segurança */}
              <Alert>
                <Shield className="h-4 w-4" />
                <AlertDescription>
                  <strong>Verificação de Segurança:</strong> Este APK foi verificado pelo sistema Bluinder 
                  e não contém malware conhecido. Instale apenas de fontes confiáveis.
                </AlertDescription>
              </Alert>
            </TabsContent>

            <TabsContent value="changelog" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Histórico de Versões</CardTitle>
                  <CardDescription>
                    Veja as alterações e melhorias em cada versão
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {apk.changelog.map((version, index) => (
                      <div key={index} className="border-l-2 border-primary pl-4">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-medium">v{version.version}</h4>
                          <Badge variant="outline">
                            {new Date(version.date).toLocaleDateString('pt-PT')}
                          </Badge>
                        </div>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          {version.changes.map((change, changeIndex) => (
                            <li key={changeIndex} className="flex items-start gap-2">
                              <div className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                              {change}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>

      {/* Modal de Download */}
      <DownloadModal
        apk={apk}
        isOpen={isDownloadModalOpen}
        onClose={() => setIsDownloadModalOpen(false)}
      />
    </div>
  )
}

export default ApkDetailsPage

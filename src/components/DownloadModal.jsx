import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  Download, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  Shield,
  X,
  Star,
  Users,
  Calendar,
  Package
} from 'lucide-react'
import { useApk } from '../contexts/ApkContext'

const DownloadModal = ({ apk, isOpen, onClose }) => {
  const { downloadApk } = useApk()
  const [countdown, setCountdown] = useState(10)
  const [downloadStatus, setDownloadStatus] = useState('waiting') // waiting, downloading, completed, error
  const [showAd, setShowAd] = useState(true)
  const [downloadProgress, setDownloadProgress] = useState(0)

  // Reset estado quando modal abre
  useEffect(() => {
    if (isOpen) {
      setCountdown(10)
      setDownloadStatus('waiting')
      setShowAd(true)
      setDownloadProgress(0)
    }
  }, [isOpen])

  // Contagem regressiva
  useEffect(() => {
    if (isOpen && countdown > 0 && downloadStatus === 'waiting') {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else if (countdown === 0 && downloadStatus === 'waiting') {
      setShowAd(false)
    }
  }, [isOpen, countdown, downloadStatus])

  // Iniciar download
  const handleDownload = async () => {
    setDownloadStatus('downloading')
    setDownloadProgress(0)

    try {
      // Simular progresso de download
      const progressInterval = setInterval(() => {
        setDownloadProgress(prev => {
          if (prev >= 95) {
            clearInterval(progressInterval)
            return 95
          }
          return prev + Math.random() * 15
        })
      }, 300)

      const result = await downloadApk(apk.id)
      
      clearInterval(progressInterval)
      setDownloadProgress(100)
      
      if (result.success) {
        setDownloadStatus('completed')
        
        // Simular download do ficheiro
        setTimeout(() => {
          // Criar link de download simulado
          const link = document.createElement('a')
          link.href = '#'
          link.download = `${apk.name}-v${apk.version}.apk`
          link.click()
        }, 500)
      } else {
        setDownloadStatus('error')
      }
    } catch (error) {
      setDownloadStatus('error')
    }
  }

  // Fechar modal
  const handleClose = () => {
    setCountdown(10)
    setDownloadStatus('waiting')
    setShowAd(true)
    setDownloadProgress(0)
    onClose()
  }

  if (!isOpen || !apk) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
        onClick={handleClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="w-full max-w-md"
          onClick={(e) => e.stopPropagation()}
        >
          <Card className="shadow-2xl border-0 bg-card/95 backdrop-blur">
            <CardHeader className="relative">
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-2 top-2 h-8 w-8 p-0"
                onClick={handleClose}
              >
                <X className="h-4 w-4" />
              </Button>
              
              <div className="flex items-center gap-3">
                <div className="text-4xl">{apk.icon}</div>
                <div>
                  <CardTitle className="text-lg">{apk.name}</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    v{apk.version} • {apk.size}
                    {apk.verified && (
                      <Badge variant="secondary" className="text-xs">
                        <Shield className="h-3 w-3 mr-1" />
                        Verificado
                      </Badge>
                    )}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Informações do APK */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span>{apk.rating} ({apk.reviews} avaliações)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-blue-500" />
                  <span>{apk.downloads.toLocaleString()} downloads</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-green-500" />
                  <span>{new Date(apk.uploadDate).toLocaleDateString('pt-PT')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Package className="h-4 w-4 text-purple-500" />
                  <span>{apk.category}</span>
                </div>
              </div>

              {/* Estados do Download */}
              <AnimatePresence mode="wait">
                {downloadStatus === 'waiting' && showAd && (
                  <motion.div
                    key="ad"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-4"
                  >
                    {/* Anúncio Simulado */}
                    <Alert className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>
                        <strong>Apoie a plataforma!</strong> Os anúncios ajudam a manter o serviço gratuito.
                      </AlertDescription>
                    </Alert>

                    {/* Contagem Regressiva */}
                    <div className="text-center py-6">
                      <motion.div
                        className="mx-auto mb-4 p-4 bg-primary/10 rounded-full w-20 h-20 flex items-center justify-center"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        <Clock className="h-10 w-10 text-primary" />
                      </motion.div>
                      <h3 className="text-xl font-semibold mb-2">Preparando Download</h3>
                      <p className="text-muted-foreground mb-4">
                        O download iniciará em <strong>{countdown}</strong> segundos
                      </p>
                      <Progress value={(10 - countdown) * 10} className="w-full" />
                    </div>
                  </motion.div>
                )}

                {downloadStatus === 'waiting' && !showAd && (
                  <motion.div
                    key="ready"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-6"
                  >
                    <motion.div
                      className="mx-auto mb-4 p-4 bg-green-100 rounded-full w-20 h-20 flex items-center justify-center"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                    >
                      <Download className="h-10 w-10 text-green-600" />
                    </motion.div>
                    <h3 className="text-xl font-semibold mb-2 text-green-600">Pronto para Download!</h3>
                    <p className="text-muted-foreground mb-4">
                      Clique no botão abaixo para iniciar o download
                    </p>
                    <Button
                      onClick={handleDownload}
                      size="lg"
                      className="w-full"
                    >
                      <Download className="mr-2 h-5 w-5" />
                      Fazer Download
                    </Button>
                  </motion.div>
                )}

                {downloadStatus === 'downloading' && (
                  <motion.div
                    key="downloading"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-6"
                  >
                    <motion.div
                      className="mx-auto mb-4 p-4 bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <Download className="h-10 w-10 text-blue-600" />
                    </motion.div>
                    <h3 className="text-xl font-semibold mb-2">Fazendo Download...</h3>
                    <p className="text-muted-foreground mb-4">
                      {Math.round(downloadProgress)}% concluído
                    </p>
                    <Progress value={downloadProgress} className="w-full" />
                  </motion.div>
                )}

                {downloadStatus === 'completed' && (
                  <motion.div
                    key="completed"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-6"
                  >
                    <motion.div
                      className="mx-auto mb-4 p-4 bg-green-100 rounded-full w-20 h-20 flex items-center justify-center"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
                    >
                      <CheckCircle className="h-10 w-10 text-green-600" />
                    </motion.div>
                    <h3 className="text-xl font-semibold mb-2 text-green-600">Download Concluído!</h3>
                    <p className="text-muted-foreground mb-4">
                      O ficheiro foi guardado na pasta de Downloads
                    </p>
                    <Alert className="bg-green-50 border-green-200 mb-4">
                      <CheckCircle className="h-4 w-4" />
                      <AlertDescription>
                        <strong>Instalação:</strong> Abra o ficheiro APK e siga as instruções para instalar.
                      </AlertDescription>
                    </Alert>
                    <div className="flex gap-2">
                      <Button variant="outline" onClick={handleClose} className="flex-1">
                        Fechar
                      </Button>
                      <Button onClick={() => setDownloadStatus('waiting')} className="flex-1">
                        Download Novamente
                      </Button>
                    </div>
                  </motion.div>
                )}

                {downloadStatus === 'error' && (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-6"
                  >
                    <motion.div
                      className="mx-auto mb-4 p-4 bg-red-100 rounded-full w-20 h-20 flex items-center justify-center"
                      animate={{ shake: [0, -10, 10, -10, 10, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      <AlertTriangle className="h-10 w-10 text-red-600" />
                    </motion.div>
                    <h3 className="text-xl font-semibold mb-2 text-red-600">Erro no Download</h3>
                    <p className="text-muted-foreground mb-4">
                      Ocorreu um erro durante o download. Tente novamente.
                    </p>
                    <div className="flex gap-2">
                      <Button variant="outline" onClick={handleClose} className="flex-1">
                        Fechar
                      </Button>
                      <Button onClick={() => setDownloadStatus('waiting')} className="flex-1">
                        Tentar Novamente
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Aviso de Segurança */}
              {downloadStatus === 'waiting' && (
                <Alert className="bg-blue-50 border-blue-200">
                  <Shield className="h-4 w-4" />
                  <AlertDescription className="text-sm">
                    Este APK foi verificado pelo sistema Bluinder. Instale apenas de fontes confiáveis.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default DownloadModal

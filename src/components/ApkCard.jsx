import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Download, 
  Star, 
  Shield, 
  Users,
  Calendar,
  Eye,
  Heart,
  Share2,
  MoreVertical
} from 'lucide-react'
import DownloadModal from './DownloadModal'

const ApkCard = ({ apk, variant = 'default' }) => {
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false)
  const [isLiked, setIsLiked] = useState(false)

  const formatDownloads = (count) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`
    }
    return count.toString()
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-PT', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric' 
    })
  }

  return (
    <>
      <motion.div
        whileHover={{ y: -5, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <Card className={`group cursor-pointer transition-all duration-300 hover:shadow-xl border-0 bg-card/80 backdrop-blur-sm ${
          variant === 'featured' ? 'bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20' : ''
        }`}>
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <motion.div 
                  className="text-3xl"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  {apk.icon}
                </motion.div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-lg line-clamp-1">{apk.name}</CardTitle>
                    {apk.verified && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <Badge variant="secondary" className="text-xs">
                          <Shield className="h-3 w-3 mr-1 text-green-600" />
                          Verificado
                        </Badge>
                      </motion.div>
                    )}
                  </div>
                  <CardDescription className="text-sm">
                    v{apk.version} • {apk.size}
                  </CardDescription>
                </div>
              </div>
              
              <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>

            {variant === 'featured' && (
              <Badge className="w-fit bg-gradient-to-r from-primary to-secondary text-white border-0">
                ⭐ Em Destaque
              </Badge>
            )}
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Estatísticas */}
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{apk.rating}</span>
                <span>({apk.reviews})</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>{formatDownloads(apk.downloads)} downloads</span>
              </div>
            </div>

            {/* Descrição */}
            {apk.description && (
              <p className="text-sm text-muted-foreground line-clamp-2">
                {apk.description}
              </p>
            )}

            {/* Categoria e Data */}
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <Badge variant="outline" className="text-xs">
                {apk.category}
              </Badge>
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>{formatDate(apk.uploadDate)}</span>
              </div>
            </div>

            {/* Ações */}
            <div className="flex items-center gap-2 pt-2">
              <Button
                onClick={() => setIsDownloadModalOpen(true)}
                className="flex-1 h-9"
                size="sm"
              >
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                className="h-9 px-3"
                onClick={() => setIsLiked(!isLiked)}
              >
                <Heart className={`h-4 w-4 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                className="h-9 px-3"
              >
                <Share2 className="h-4 w-4" />
              </Button>
              
              <Link to={`/apk/${apk.id}`}>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-9 px-3"
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            {/* Barra de Popularidade */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Popularidade</span>
                <span>{Math.round((apk.downloads / 50000) * 100)}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-1.5">
                <motion.div
                  className="bg-gradient-to-r from-primary to-secondary h-1.5 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min((apk.downloads / 50000) * 100, 100)}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Modal de Download */}
      <DownloadModal
        apk={apk}
        isOpen={isDownloadModalOpen}
        onClose={() => setIsDownloadModalOpen(false)}
      />
    </>
  )
}

export default ApkCard

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  Star, 
  ThumbsUp, 
  ThumbsDown, 
  Flag, 
  MessageCircle,
  Send,
  Filter,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  User
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

const ReviewSystem = ({ apkId, initialReviews = [], onReviewSubmit }) => {
  const { user, isAuthenticated } = useAuth()
  const [reviews, setReviews] = useState(initialReviews)
  const [userRating, setUserRating] = useState(0)
  const [userComment, setUserComment] = useState('')
  const [hoveredStar, setHoveredStar] = useState(0)
  const [filterBy, setFilterBy] = useState('recent') // recent, rating, helpful
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  // Calcular estatísticas das avaliações
  const reviewStats = {
    total: reviews.length,
    average: reviews.length > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : 0,
    distribution: {
      5: reviews.filter(r => r.rating === 5).length,
      4: reviews.filter(r => r.rating === 4).length,
      3: reviews.filter(r => r.rating === 3).length,
      2: reviews.filter(r => r.rating === 2).length,
      1: reviews.filter(r => r.rating === 1).length,
    }
  }

  // Filtrar e ordenar avaliações
  const filteredReviews = [...reviews].sort((a, b) => {
    switch (filterBy) {
      case 'rating':
        return b.rating - a.rating
      case 'helpful':
        return (b.helpful || 0) - (a.helpful || 0)
      default: // recent
        return new Date(b.date) - new Date(a.date)
    }
  })

  // Submeter nova avaliação
  const handleSubmitReview = async () => {
    if (!isAuthenticated) {
      alert('Precisa de fazer login para avaliar')
      return
    }

    if (userRating === 0) {
      alert('Por favor, selecione uma classificação')
      return
    }

    setSubmitting(true)

    const newReview = {
      id: Date.now(),
      userId: user.id,
      userName: user.name,
      userAvatar: user.avatar || null,
      rating: userRating,
      comment: userComment.trim(),
      date: new Date().toISOString(),
      helpful: 0,
      reported: false,
      verified: user.verified || false
    }

    try {
      // Simular API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setReviews(prev => [newReview, ...prev])
      setUserRating(0)
      setUserComment('')
      setShowReviewForm(false)
      
      if (onReviewSubmit) {
        onReviewSubmit(newReview)
      }
    } catch (error) {
      alert('Erro ao submeter avaliação')
    } finally {
      setSubmitting(false)
    }
  }

  // Marcar avaliação como útil
  const handleHelpfulVote = (reviewId, isHelpful) => {
    setReviews(prev => prev.map(review => {
      if (review.id === reviewId) {
        return {
          ...review,
          helpful: (review.helpful || 0) + (isHelpful ? 1 : -1)
        }
      }
      return review
    }))
  }

  // Reportar avaliação
  const handleReportReview = (reviewId) => {
    setReviews(prev => prev.map(review => {
      if (review.id === reviewId) {
        return { ...review, reported: true }
      }
      return review
    }))
    alert('Avaliação reportada. Obrigado pelo feedback!')
  }

  // Renderizar estrelas
  const renderStars = (rating, interactive = false, size = 'default') => {
    const starSize = size === 'small' ? 'h-4 w-4' : 'h-5 w-5'
    
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <motion.button
            key={star}
            type="button"
            disabled={!interactive}
            className={`${interactive ? 'cursor-pointer' : 'cursor-default'} transition-colors`}
            onClick={() => interactive && setUserRating(star)}
            onMouseEnter={() => interactive && setHoveredStar(star)}
            onMouseLeave={() => interactive && setHoveredStar(0)}
            whileHover={interactive ? { scale: 1.1 } : {}}
            whileTap={interactive ? { scale: 0.9 } : {}}
          >
            <Star
              className={`${starSize} ${
                star <= (interactive ? (hoveredStar || userRating) : rating)
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-gray-300'
              }`}
            />
          </motion.button>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Estatísticas das Avaliações */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-500" />
            Avaliações dos Utilizadores
          </CardTitle>
          <CardDescription>
            {reviewStats.total} avaliações • Média: {reviewStats.average.toFixed(1)} estrelas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Média e Distribuição */}
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">
                  {reviewStats.average.toFixed(1)}
                </div>
                {renderStars(Math.round(reviewStats.average))}
                <p className="text-sm text-muted-foreground mt-2">
                  Baseado em {reviewStats.total} avaliações
                </p>
              </div>
            </div>

            {/* Distribuição por Estrelas */}
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((stars) => (
                <div key={stars} className="flex items-center gap-2">
                  <span className="text-sm w-8">{stars}★</span>
                  <div className="flex-1 bg-muted rounded-full h-2">
                    <motion.div
                      className="bg-yellow-400 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ 
                        width: reviewStats.total > 0 
                          ? `${(reviewStats.distribution[stars] / reviewStats.total) * 100}%`
                          : '0%'
                      }}
                      transition={{ duration: 1, delay: stars * 0.1 }}
                    />
                  </div>
                  <span className="text-sm text-muted-foreground w-8">
                    {reviewStats.distribution[stars]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Formulário de Nova Avaliação */}
      {isAuthenticated && (
        <Card>
          <CardHeader>
            <CardTitle>Avaliar este APK</CardTitle>
            <CardDescription>
              Partilhe a sua experiência com outros utilizadores
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AnimatePresence>
              {!showReviewForm ? (
                <motion.div
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-center"
                >
                  <Button onClick={() => setShowReviewForm(true)}>
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Escrever Avaliação
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="space-y-4"
                >
                  {/* Classificação */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Classificação *
                    </label>
                    {renderStars(userRating, true)}
                  </div>

                  {/* Comentário */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Comentário (opcional)
                    </label>
                    <Textarea
                      placeholder="Partilhe a sua experiência com este APK..."
                      value={userComment}
                      onChange={(e) => setUserComment(e.target.value)}
                      rows={4}
                    />
                  </div>

                  {/* Botões */}
                  <div className="flex gap-2">
                    <Button
                      onClick={handleSubmitReview}
                      disabled={submitting || userRating === 0}
                    >
                      {submitting ? (
                        <div className="flex items-center">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Enviando...
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <Send className="mr-2 h-4 w-4" />
                          Publicar Avaliação
                        </div>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setShowReviewForm(false)
                        setUserRating(0)
                        setUserComment('')
                      }}
                    >
                      Cancelar
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      )}

      {/* Lista de Avaliações */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Todas as Avaliações</CardTitle>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
                className="text-sm border rounded px-2 py-1"
              >
                <option value="recent">Mais Recentes</option>
                <option value="rating">Melhor Classificação</option>
                <option value="helpful">Mais Úteis</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredReviews.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Ainda não há avaliações para este APK.</p>
                <p className="text-sm">Seja o primeiro a avaliar!</p>
              </div>
            ) : (
              filteredReviews.map((review) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`border rounded-lg p-4 ${review.reported ? 'opacity-50' : ''}`}
                >
                  <div className="flex items-start gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={review.userAvatar} />
                      <AvatarFallback>
                        <User className="h-5 w-5" />
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-medium">{review.userName}</span>
                        {review.verified && (
                          <Badge variant="secondary" className="text-xs">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Verificado
                          </Badge>
                        )}
                        {renderStars(review.rating, false, 'small')}
                        <span className="text-sm text-muted-foreground">
                          {new Date(review.date).toLocaleDateString('pt-PT')}
                        </span>
                      </div>

                      {review.comment && (
                        <p className="text-sm mb-3 leading-relaxed">
                          {review.comment}
                        </p>
                      )}

                      {/* Ações da Avaliação */}
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => handleHelpfulVote(review.id, true)}
                          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-green-600 transition-colors"
                        >
                          <ThumbsUp className="h-4 w-4" />
                          <span>Útil ({review.helpful || 0})</span>
                        </button>

                        <button
                          onClick={() => handleHelpfulVote(review.id, false)}
                          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-red-600 transition-colors"
                        >
                          <ThumbsDown className="h-4 w-4" />
                        </button>

                        {!review.reported && (
                          <button
                            onClick={() => handleReportReview(review.id)}
                            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-orange-600 transition-colors"
                          >
                            <Flag className="h-4 w-4" />
                            <span>Reportar</span>
                          </button>
                        )}

                        {review.reported && (
                          <Badge variant="destructive" className="text-xs">
                            <AlertTriangle className="h-3 w-3 mr-1" />
                            Reportado
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Aviso sobre Avaliações Falsas */}
      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          <strong>Política de Avaliações:</strong> APKs com muitas avaliações negativas são automaticamente 
          movidos para spam por 14 dias. Avaliações falsas ou ofensivas são removidas.
        </AlertDescription>
      </Alert>
    </div>
  )
}

export default ReviewSystem

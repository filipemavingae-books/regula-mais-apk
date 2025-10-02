import { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from './AuthContext'

const ApkContext = createContext()

export const useApk = () => {
  const context = useContext(ApkContext)
  if (!context) {
    throw new Error('useApk deve ser usado dentro de um ApkProvider')
  }
  return context
}

export const ApkProvider = ({ children }) => {
  const { user } = useAuth()
  const [apks, setApks] = useState([])
  const [featuredApks, setFeaturedApks] = useState([])
  const [loading, setLoading] = useState(false)

  // Carregar APKs em destaque
  useEffect(() => {
    loadFeaturedApks()
  }, [])

  // Carregar APKs em destaque
  const loadFeaturedApks = async () => {
    try {
      setLoading(true)
      // Simular API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const featured = [
        {
          id: 1,
          name: 'WhatsApp Business',
          version: '2.23.20.76',
          size: '45.2 MB',
          downloads: 15400,
          rating: 4.8,
          reviews: 1247,
          category: 'Comunicação',
          icon: '📱',
          verified: true,
          uploadDate: '2025-01-10',
          author: 'WhatsApp Inc.',
          description: 'Aplicação oficial do WhatsApp para empresas'
        },
        {
          id: 2,
          name: 'Instagram',
          version: '312.0.0.37.103',
          size: '78.3 MB',
          downloads: 25600,
          rating: 4.5,
          reviews: 3421,
          category: 'Social',
          icon: '📸',
          verified: true,
          uploadDate: '2025-01-12',
          author: 'Meta Platforms',
          description: 'Partilhe fotos e vídeos com os seus amigos'
        },
        {
          id: 3,
          name: 'Spotify Music',
          version: '8.8.96.488',
          size: '32.1 MB',
          downloads: 18900,
          rating: 4.7,
          reviews: 2156,
          category: 'Música',
          icon: '🎵',
          verified: true,
          uploadDate: '2025-01-08',
          author: 'Spotify AB',
          description: 'Ouça milhões de músicas e podcasts'
        }
      ]
      
      setFeaturedApks(featured)
    } catch (error) {
      console.error('Erro ao carregar APKs em destaque:', error)
    } finally {
      setLoading(false)
    }
  }

  // Upload de APK
  const uploadApk = async (apkData) => {
    try {
      setLoading(true)
      // Simular API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const newApk = {
        id: Date.now(),
        ...apkData,
        author: user?.name || 'Utilizador Anónimo',
        authorId: user?.id,
        uploadDate: new Date().toISOString(),
        downloads: 0,
        rating: 0,
        reviews: 0,
        status: 'pending', // pending, approved, rejected, spam
        verified: false,
        bluinderScore: Math.random() > 0.3 ? 'safe' : 'warning',
        size: calculateApkSize(apkData.file)
      }
      
      // Simular revisão Bluinder (2 minutos)
      setTimeout(() => {
        reviewApkWithBluinder(newApk.id)
      }, 120000) // 2 minutos
      
      setApks(prev => [...prev, newApk])
      
      return { success: true, apk: newApk }
    } catch (error) {
      return { success: false, error: error.message }
    } finally {
      setLoading(false)
    }
  }

  // Revisão automática Bluinder
  const reviewApkWithBluinder = async (apkId) => {
    try {
      // Simular análise de segurança
      const isApproved = Math.random() > 0.2 // 80% de aprovação
      
      setApks(prev => prev.map(apk => 
        apk.id === apkId 
          ? { 
              ...apk, 
              status: isApproved ? 'approved' : 'rejected',
              verified: isApproved,
              bluinderScore: isApproved ? 'safe' : 'danger',
              reviewedAt: new Date().toISOString()
            }
          : apk
      ))
      
      // Notificar utilizador (simular)
      console.log(`APK ${apkId} ${isApproved ? 'aprovado' : 'rejeitado'} pelo Bluinder`)
      
    } catch (error) {
      console.error('Erro na revisão Bluinder:', error)
    }
  }

  // Calcular tamanho do APK
  const calculateApkSize = (file) => {
    if (!file) return '0 MB'
    const sizeInMB = (Math.random() * 100 + 5).toFixed(1) // Simular entre 5-105 MB
    return `${sizeInMB} MB`
  }

  // Download de APK
  const downloadApk = async (apkId) => {
    try {
      const apk = [...apks, ...featuredApks].find(a => a.id === apkId)
      if (!apk) throw new Error('APK não encontrado')
      
      // Simular contagem regressiva de 10 segundos
      for (let i = 10; i > 0; i--) {
        console.log(`Download inicia em ${i} segundos...`)
        await new Promise(resolve => setTimeout(resolve, 1000))
      }
      
      // Incrementar contador de downloads
      if (featuredApks.find(a => a.id === apkId)) {
        setFeaturedApks(prev => prev.map(a => 
          a.id === apkId ? { ...a, downloads: a.downloads + 1 } : a
        ))
      } else {
        setApks(prev => prev.map(a => 
          a.id === apkId ? { ...a, downloads: a.downloads + 1 } : a
        ))
      }
      
      // Simular download
      console.log(`Download de ${apk.name} iniciado!`)
      
      return { success: true, message: 'Download iniciado' }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  // Avaliar APK
  const rateApk = async (apkId, rating, comment) => {
    try {
      // Simular API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const updateApkRating = (apkList, setApkList) => {
        setApkList(prev => prev.map(apk => {
          if (apk.id === apkId) {
            const newReviews = apk.reviews + 1
            const newRating = ((apk.rating * apk.reviews) + rating) / newReviews
            return {
              ...apk,
              rating: Math.round(newRating * 10) / 10,
              reviews: newReviews
            }
          }
          return apk
        }))
      }
      
      // Atualizar rating no APK correspondente
      if (featuredApks.find(a => a.id === apkId)) {
        updateApkRating(featuredApks, setFeaturedApks)
      } else {
        updateApkRating(apks, setApks)
      }
      
      return { success: true, message: 'Avaliação enviada' }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  // Reportar APK como spam
  const reportApk = async (apkId, reason) => {
    try {
      // Simular API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Marcar como spam se muitos reports
      const spamThreshold = 5
      const currentReports = Math.floor(Math.random() * 10)
      
      if (currentReports >= spamThreshold) {
        setApks(prev => prev.map(apk => 
          apk.id === apkId 
            ? { ...apk, status: 'spam', spamReports: currentReports + 1 }
            : apk
        ))
      }
      
      return { success: true, message: 'Report enviado' }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  // Editar APK (funcionalidade paga)
  const editApk = async (apkId, editData, paymentInfo) => {
    try {
      // Verificar pagamento (3.000 Kz ou 7.000 Kz AOA)
      const editCost = editData.majorEdit ? 7000 : 3000
      
      if (!paymentInfo || paymentInfo.amount < editCost) {
        throw new Error(`Pagamento de ${editCost} Kz AOA necessário`)
      }
      
      // Simular processamento de pagamento
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      setApks(prev => prev.map(apk => 
        apk.id === apkId 
          ? { 
              ...apk, 
              ...editData,
              lastEdited: new Date().toISOString(),
              editHistory: [...(apk.editHistory || []), {
                date: new Date().toISOString(),
                editor: user?.name,
                changes: editData
              }]
            }
          : apk
      ))
      
      return { success: true, message: 'APK editado com sucesso' }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const value = {
    apks,
    featuredApks,
    loading,
    uploadApk,
    downloadApk,
    rateApk,
    reportApk,
    editApk,
    loadFeaturedApks
  }

  return (
    <ApkContext.Provider value={value}>
      {children}
    </ApkContext.Provider>
  )
}

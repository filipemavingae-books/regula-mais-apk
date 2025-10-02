import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { 
  Upload, 
  FileCheck, 
  AlertCircle, 
  CheckCircle, 
  Clock,
  Image,
  Smartphone,
  Package,
  Star
} from 'lucide-react'
import { useApk } from '../contexts/ApkContext'
import { useAuth } from '../contexts/AuthContext'

const ApkUploadForm = () => {
  const { uploadApk, loading } = useApk()
  const { user } = useAuth()
  const [formData, setFormData] = useState({
    name: '',
    version: '',
    packageName: '',
    description: '',
    category: 'Outros'
  })
  const [files, setFiles] = useState({
    apk: null,
    icon: null,
    screenshots: []
  })
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadStatus, setUploadStatus] = useState('idle') // idle, uploading, reviewing, success, error
  const [dragActive, setDragActive] = useState(false)
  const [errors, setErrors] = useState({})

  const apkInputRef = useRef(null)
  const iconInputRef = useRef(null)
  const screenshotsInputRef = useRef(null)

  const categories = [
    'Comunicação', 'Entretenimento', 'Ferramentas', 'Jogos', 
    'Música', 'Produtividade', 'Social', 'Fotografia', 'Outros'
  ]

  // Validação do formulário
  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) newErrors.name = 'Nome é obrigatório'
    if (!formData.version.trim()) newErrors.version = 'Versão é obrigatória'
    if (!formData.packageName.trim()) newErrors.packageName = 'Nome do pacote é obrigatório'
    if (!formData.description.trim()) newErrors.description = 'Descrição é obrigatória'
    if (!files.apk) newErrors.apk = 'Ficheiro APK é obrigatório'
    if (!files.icon) newErrors.icon = 'Ícone é obrigatório'
    if (files.screenshots.length < 3) newErrors.screenshots = 'Mínimo 3 screenshots obrigatórios'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Manipular drag & drop
  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      if (file.name.endsWith('.apk')) {
        setFiles(prev => ({ ...prev, apk: file }))
        setErrors(prev => ({ ...prev, apk: null }))
      }
    }
  }

  // Manipular seleção de ficheiros
  const handleFileSelect = (type, file) => {
    if (type === 'screenshots') {
      setFiles(prev => ({ 
        ...prev, 
        screenshots: [...prev.screenshots, ...Array.from(file)] 
      }))
    } else {
      setFiles(prev => ({ ...prev, [type]: file }))
    }
    setErrors(prev => ({ ...prev, [type]: null }))
  }

  // Remover screenshot
  const removeScreenshot = (index) => {
    setFiles(prev => ({
      ...prev,
      screenshots: prev.screenshots.filter((_, i) => i !== index)
    }))
  }

  // Submeter formulário
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setUploadStatus('uploading')
    setUploadProgress(0)
    
    // Simular progresso de upload
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval)
          return 90
        }
        return prev + Math.random() * 10
      })
    }, 200)
    
    try {
      const result = await uploadApk({
        ...formData,
        file: files.apk,
        icon: files.icon,
        screenshots: files.screenshots
      })
      
      clearInterval(progressInterval)
      setUploadProgress(100)
      
      if (result.success) {
        setUploadStatus('reviewing')
        
        // Simular revisão Bluinder
        setTimeout(() => {
          setUploadStatus('success')
        }, 3000)
      } else {
        setUploadStatus('error')
      }
    } catch (error) {
      clearInterval(progressInterval)
      setUploadStatus('error')
    }
  }

  // Reset do formulário
  const resetForm = () => {
    setFormData({
      name: '',
      version: '',
      packageName: '',
      description: '',
      category: 'Outros'
    })
    setFiles({
      apk: null,
      icon: null,
      screenshots: []
    })
    setUploadProgress(0)
    setUploadStatus('idle')
    setErrors({})
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="mb-8">
          <CardHeader className="text-center">
            <motion.div
              className="mx-auto mb-4 p-4 bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Upload className="h-8 w-8 text-primary" />
            </motion.div>
            <CardTitle className="text-2xl">Upload de APK</CardTitle>
            <CardDescription>
              Carregue o seu APK e aguarde a verificação automática Bluinder
            </CardDescription>
          </CardHeader>
        </Card>

        <AnimatePresence mode="wait">
          {uploadStatus === 'idle' && (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              {/* Upload APK */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    Ficheiro APK
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div
                    className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                      dragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/25'
                    } ${errors.apk ? 'border-red-500' : ''}`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    {files.apk ? (
                      <div className="flex items-center justify-center gap-2">
                        <FileCheck className="h-8 w-8 text-green-500" />
                        <span className="font-medium">{files.apk.name}</span>
                      </div>
                    ) : (
                      <div>
                        <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                        <p className="text-lg font-medium mb-2">
                          Arraste o ficheiro APK aqui ou clique para selecionar
                        </p>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => apkInputRef.current?.click()}
                        >
                          Selecionar APK
                        </Button>
                      </div>
                    )}
                    <input
                      ref={apkInputRef}
                      type="file"
                      accept=".apk"
                      className="hidden"
                      onChange={(e) => handleFileSelect('apk', e.target.files[0])}
                    />
                  </div>
                  {errors.apk && (
                    <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {errors.apk}
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* Informações do APK */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Smartphone className="h-5 w-5" />
                    Informações do APK
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Nome do APK *</Label>
                    <Input
                      id="name"
                      placeholder="Ex: Minha App Incrível"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className={errors.name ? 'border-red-500' : ''}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="version">Versão *</Label>
                    <Input
                      id="version"
                      placeholder="Ex: 1.0.0"
                      value={formData.version}
                      onChange={(e) => setFormData(prev => ({ ...prev, version: e.target.value }))}
                      className={errors.version ? 'border-red-500' : ''}
                    />
                    {errors.version && (
                      <p className="text-red-500 text-sm mt-1">{errors.version}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="packageName">Nome do Pacote *</Label>
                    <Input
                      id="packageName"
                      placeholder="Ex: com.exemplo.minhaapp"
                      value={formData.packageName}
                      onChange={(e) => setFormData(prev => ({ ...prev, packageName: e.target.value }))}
                      className={errors.packageName ? 'border-red-500' : ''}
                    />
                    {errors.packageName && (
                      <p className="text-red-500 text-sm mt-1">{errors.packageName}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="category">Categoria</Label>
                    <select
                      id="category"
                      value={formData.category}
                      onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor="description">Descrição *</Label>
                    <Textarea
                      id="description"
                      placeholder="Descreva o seu APK, funcionalidades principais, etc..."
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      className={errors.description ? 'border-red-500' : ''}
                      rows={4}
                    />
                    {errors.description && (
                      <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Ícone e Screenshots */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Image className="h-5 w-5" />
                    Recursos Visuais
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Ícone */}
                  <div>
                    <Label>Ícone do APK *</Label>
                    <div className="mt-2">
                      {files.icon ? (
                        <div className="flex items-center gap-4">
                          <img
                            src={URL.createObjectURL(files.icon)}
                            alt="Ícone"
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                          <div>
                            <p className="font-medium">{files.icon.name}</p>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => setFiles(prev => ({ ...prev, icon: null }))}
                            >
                              Remover
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => iconInputRef.current?.click()}
                          className={errors.icon ? 'border-red-500' : ''}
                        >
                          Selecionar Ícone
                        </Button>
                      )}
                      <input
                        ref={iconInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileSelect('icon', e.target.files[0])}
                      />
                      {errors.icon && (
                        <p className="text-red-500 text-sm mt-1">{errors.icon}</p>
                      )}
                    </div>
                  </div>

                  {/* Screenshots */}
                  <div>
                    <Label>Screenshots (3 obrigatórios) *</Label>
                    <div className="mt-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => screenshotsInputRef.current?.click()}
                        className={errors.screenshots ? 'border-red-500' : ''}
                      >
                        Adicionar Screenshots
                      </Button>
                      <input
                        ref={screenshotsInputRef}
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={(e) => handleFileSelect('screenshots', e.target.files)}
                      />
                      {errors.screenshots && (
                        <p className="text-red-500 text-sm mt-1">{errors.screenshots}</p>
                      )}
                      
                      {files.screenshots.length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                          {files.screenshots.map((screenshot, index) => (
                            <div key={index} className="relative">
                              <img
                                src={URL.createObjectURL(screenshot)}
                                alt={`Screenshot ${index + 1}`}
                                className="w-full h-32 object-cover rounded-lg"
                              />
                              <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                className="absolute top-2 right-2"
                                onClick={() => removeScreenshot(index)}
                              >
                                ×
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Sistema Bluinder */}
              <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full">
                      <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                        Sistema Bluinder
                      </h3>
                      <p className="text-blue-700 dark:text-blue-300 text-sm">
                        Após o upload, o seu APK será automaticamente verificado pelo nosso sistema de 
                        segurança em aproximadamente 2 minutos. APKs aprovados recebem o selo de 
                        verificação de segurança.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Botão de Submit */}
              <div className="flex justify-end">
                <Button
                  type="submit"
                  size="lg"
                  disabled={loading}
                  className="min-w-[200px]"
                >
                  {loading ? (
                    <>
                      <Clock className="mr-2 h-4 w-4 animate-spin" />
                      Carregando...
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" />
                      Carregar APK
                    </>
                  )}
                </Button>
              </div>
            </motion.form>
          )}

          {/* Estados de Upload */}
          {uploadStatus === 'uploading' && (
            <motion.div
              key="uploading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <motion.div
                className="mx-auto mb-6 p-4 bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Upload className="h-10 w-10 text-blue-600" />
              </motion.div>
              <h3 className="text-xl font-semibold mb-4">Carregando APK...</h3>
              <div className="max-w-md mx-auto">
                <Progress value={uploadProgress} className="mb-2" />
                <p className="text-sm text-muted-foreground">{Math.round(uploadProgress)}% concluído</p>
              </div>
            </motion.div>
          )}

          {uploadStatus === 'reviewing' && (
            <motion.div
              key="reviewing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <motion.div
                className="mx-auto mb-6 p-4 bg-yellow-100 rounded-full w-20 h-20 flex items-center justify-center"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Clock className="h-10 w-10 text-yellow-600" />
              </motion.div>
              <h3 className="text-xl font-semibold mb-4">Revisão Bluinder em Progresso</h3>
              <p className="text-muted-foreground mb-4">
                O seu APK está sendo analisado pelo nosso sistema de segurança...
              </p>
              <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                Tempo estimado: 2 minutos
              </Badge>
            </motion.div>
          )}

          {uploadStatus === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <motion.div
                className="mx-auto mb-6 p-4 bg-green-100 rounded-full w-20 h-20 flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
              >
                <CheckCircle className="h-10 w-10 text-green-600" />
              </motion.div>
              <h3 className="text-xl font-semibold mb-4 text-green-600">APK Aprovado!</h3>
              <p className="text-muted-foreground mb-6">
                O seu APK passou na verificação Bluinder e já está disponível na plataforma.
              </p>
              <div className="flex gap-4 justify-center">
                <Button onClick={resetForm} variant="outline">
                  Carregar Outro APK
                </Button>
                <Button onClick={() => window.location.href = '/dashboard'}>
                  Ver no Painel
                </Button>
              </div>
            </motion.div>
          )}

          {uploadStatus === 'error' && (
            <motion.div
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <motion.div
                className="mx-auto mb-6 p-4 bg-red-100 rounded-full w-20 h-20 flex items-center justify-center"
                animate={{ shake: [0, -10, 10, -10, 10, 0] }}
                transition={{ duration: 0.5 }}
              >
                <AlertCircle className="h-10 w-10 text-red-600" />
              </motion.div>
              <h3 className="text-xl font-semibold mb-4 text-red-600">Erro no Upload</h3>
              <p className="text-muted-foreground mb-6">
                Ocorreu um erro durante o carregamento. Por favor, tente novamente.
              </p>
              <Button onClick={resetForm} variant="outline">
                Tentar Novamente
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

export default ApkUploadForm

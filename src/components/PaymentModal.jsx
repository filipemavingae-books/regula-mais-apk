import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  CreditCard, 
  X, 
  Shield, 
  DollarSign, 
  Clock, 
  CheckCircle,
  AlertTriangle,
  Smartphone,
  Banknote,
  Wallet,
  Lock,
  Star,
  Zap
} from 'lucide-react'
import { useApkNotifications } from './NotificationSystem'

const PaymentModal = ({ 
  isOpen, 
  onClose, 
  apkName, 
  serviceType = 'basic', // 'basic' ou 'premium'
  onPaymentSuccess 
}) => {
  const notifications = useApkNotifications()
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [processing, setProcessing] = useState(false)
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    email: '',
    phone: ''
  })

  const services = {
    basic: {
      name: 'Edição Básica',
      price: 3000,
      currency: 'Kz AOA',
      description: 'Conversão de APK para código-fonte',
      features: [
        'Conversão completa para código-fonte',
        'Estrutura de ficheiros organizada',
        'Documentação básica incluída',
        'Suporte técnico por 30 dias',
        'Rastreamento de alterações'
      ],
      icon: Zap,
      color: 'text-blue-500'
    },
    premium: {
      name: 'Edição Premium',
      price: 7000,
      currency: 'Kz AOA',
      description: 'Edição avançada com ferramentas premium',
      features: [
        'Tudo da edição básica',
        'Ferramentas de edição avançadas',
        'Refatoração automática de código',
        'Otimização de performance',
        'Suporte prioritário por 60 dias',
        'Backup automático de versões'
      ],
      icon: Star,
      color: 'text-yellow-500'
    }
  }

  const paymentMethods = [
    {
      id: 'card',
      name: 'Cartão de Crédito/Débito',
      icon: CreditCard,
      description: 'Visa, Mastercard, American Express'
    },
    {
      id: 'paypal',
      name: 'PayPal',
      icon: Wallet,
      description: 'Pagamento seguro via PayPal'
    },
    {
      id: 'multicaixa',
      name: 'Multicaixa Express',
      icon: Smartphone,
      description: 'Pagamento móvel em Angola'
    },
    {
      id: 'transfer',
      name: 'Transferência Bancária',
      icon: Banknote,
      description: 'Transferência direta para conta bancária'
    }
  ]

  const currentService = services[serviceType]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handlePayment = async () => {
    setProcessing(true)
    
    // Simular processamento de pagamento
    try {
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      // Simular sucesso do pagamento
      notifications.success(
        'Pagamento Processado!',
        `Pagamento de ${currentService.price} ${currentService.currency} foi processado com sucesso.`,
        { duration: 6000 }
      )
      
      notifications.upload(
        'Edição Iniciada',
        `A edição do APK "${apkName}" foi iniciada. Receberá uma notificação quando estiver pronta.`,
        { duration: 8000 }
      )
      
      if (onPaymentSuccess) {
        onPaymentSuccess({
          service: serviceType,
          amount: currentService.price,
          currency: currentService.currency,
          apkName,
          transactionId: `TXN-${Date.now()}`
        })
      }
      
      onClose()
    } catch (error) {
      notifications.error(
        'Erro no Pagamento',
        'Ocorreu um erro ao processar o pagamento. Tente novamente.',
        { duration: 5000 }
      )
    } finally {
      setProcessing(false)
    }
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3 }}
          className="bg-background rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg bg-muted ${currentService.color}`}>
                <currentService.icon className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Pagamento - {currentService.name}</h2>
                <p className="text-sm text-muted-foreground">APK: {apkName}</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="p-6 space-y-6">
            {/* Resumo do Serviço */}
            <Card className="border-2 border-primary/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <currentService.icon className={`h-5 w-5 ${currentService.color}`} />
                      {currentService.name}
                    </CardTitle>
                    <CardDescription>{currentService.description}</CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">
                      {currentService.price.toLocaleString()} {currentService.currency}
                    </div>
                    <Badge variant="secondary">Pagamento único</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Incluído no serviço:</h4>
                  <ul className="space-y-1">
                    {currentService.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-3 w-3 text-green-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Métodos de Pagamento */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Método de Pagamento</h3>
              <Tabs value={paymentMethod} onValueChange={setPaymentMethod}>
                <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
                  {paymentMethods.map((method) => (
                    <TabsTrigger key={method.id} value={method.id} className="flex items-center gap-2">
                      <method.icon className="h-4 w-4" />
                      <span className="hidden sm:inline">{method.name.split(' ')[0]}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>

                {/* Formulário de Cartão */}
                <TabsContent value="card" className="space-y-4 mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <CreditCard className="h-5 w-5" />
                        Dados do Cartão
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="cardNumber">Número do Cartão</Label>
                        <Input
                          id="cardNumber"
                          name="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiryDate">Data de Validade</Label>
                          <Input
                            id="expiryDate"
                            name="expiryDate"
                            placeholder="MM/AA"
                            value={formData.expiryDate}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div>
                          <Label htmlFor="cvv">CVV</Label>
                          <Input
                            id="cvv"
                            name="cvv"
                            placeholder="123"
                            value={formData.cvv}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="cardName">Nome no Cartão</Label>
                        <Input
                          id="cardName"
                          name="cardName"
                          placeholder="João Silva"
                          value={formData.cardName}
                          onChange={handleInputChange}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Outros métodos de pagamento */}
                <TabsContent value="paypal" className="mt-6">
                  <Card>
                    <CardContent className="p-6 text-center">
                      <Wallet className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">Pagamento via PayPal</h3>
                      <p className="text-muted-foreground mb-4">
                        Será redirecionado para o PayPal para completar o pagamento de forma segura.
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="multicaixa" className="mt-6">
                  <Card>
                    <CardContent className="p-6 text-center">
                      <Smartphone className="h-12 w-12 text-orange-500 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">Multicaixa Express</h3>
                      <p className="text-muted-foreground mb-4">
                        Use o seu telemóvel para pagar através do Multicaixa Express.
                      </p>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Número de Telemóvel</Label>
                        <Input
                          id="phone"
                          name="phone"
                          placeholder="+244 900 000 000"
                          value={formData.phone}
                          onChange={handleInputChange}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="transfer" className="mt-6">
                  <Card>
                    <CardContent className="p-6">
                      <Banknote className="h-12 w-12 text-green-500 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-4 text-center">Transferência Bancária</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="font-medium">Banco:</span>
                          <span>Banco Millennium Atlântico</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">IBAN:</span>
                          <span>AO06 0058 0000 0000 0000 0000 1</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">Beneficiário:</span>
                          <span>Regula Mais APK, Lda</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">Referência:</span>
                          <span>APK-{Date.now().toString().slice(-6)}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Alertas de Segurança */}
            <Alert>
              <Shield className="h-4 w-4" />
              <AlertDescription>
                <strong>Pagamento Seguro:</strong> Todos os dados são encriptados e processados 
                através de gateways de pagamento certificados. Nunca armazenamos informações 
                do seu cartão de crédito.
              </AlertDescription>
            </Alert>

            {/* Tempo de Processamento */}
            <Alert className="border-blue-200 bg-blue-50">
              <Clock className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-blue-800">
                <strong>Tempo de Processamento:</strong> A edição do APK será iniciada 
                imediatamente após a confirmação do pagamento e estará pronta em 2-4 horas.
              </AlertDescription>
            </Alert>

            {/* Botões de Ação */}
            <div className="flex gap-4 pt-4">
              <Button variant="outline" onClick={onClose} className="flex-1">
                Cancelar
              </Button>
              <Button 
                onClick={handlePayment} 
                disabled={processing}
                className="flex-1 flex items-center gap-2"
              >
                {processing ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="h-4 w-4 border-2 border-white border-t-transparent rounded-full"
                    />
                    Processando...
                  </>
                ) : (
                  <>
                    <Lock className="h-4 w-4" />
                    Pagar {currentService.price.toLocaleString()} {currentService.currency}
                  </>
                )}
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default PaymentModal

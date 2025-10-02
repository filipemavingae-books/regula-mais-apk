import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Shield, 
  Lock, 
  FileText, 
  DollarSign, 
  AlertTriangle, 
  CheckCircle,
  Users,
  Clock,
  Ban,
  Eye,
  CreditCard,
  Gift,
  Star,
  Zap,
  Globe,
  UserCheck
} from 'lucide-react'

const PoliciesPage = () => {
  const policies = [
    {
      id: 'content',
      title: 'Política de Conteúdo',
      icon: FileText,
      color: 'text-blue-500',
      description: 'Diretrizes sobre conteúdo permitido e proibido na plataforma',
      sections: [
        {
          title: 'Conteúdo Estritamente Proibido',
          icon: Ban,
          content: [
            'Malware, vírus, trojans ou qualquer código malicioso',
            'Conteúdo pornográfico, sexualmente explícito ou inadequado para menores',
            'Discurso de ódio, discriminação racial, religiosa ou de qualquer natureza',
            'Incitação à violência, terrorismo ou atividades criminosas',
            'Pirataria, cracks, keygens ou violação de direitos autorais',
            'Aplicações que violem leis locais, nacionais ou internacionais',
            'Conteúdo que promova drogas, armas ou atividades ilegais',
            'Aplicações falsas ou que se façam passar por outras'
          ]
        },
        {
          title: 'Diretrizes de Qualidade',
          icon: CheckCircle,
          content: [
            'APKs devem estar funcionais e livres de bugs críticos',
            'Descrições devem ser precisas, completas e não enganosas',
            'Screenshots devem representar fielmente a aplicação',
            'Informações de versão, tamanho e permissões devem estar corretas',
            'Ícones devem ser originais ou ter direitos de uso',
            'Aplicações devem ter funcionalidade real e útil'
          ]
        },
        {
          title: 'Processo de Moderação',
          icon: Eye,
          content: [
            'Todos os APKs passam por verificação automática Bluinder (2 minutos)',
            'APKs suspeitos são analisados manualmente pela equipa',
            'Utilizadores podem reportar conteúdo inadequado',
            'Decisões de moderação são finais mas podem ser apeladas'
          ]
        },
        {
          title: 'Consequências por Violação',
          icon: AlertTriangle,
          content: [
            'Remoção imediata do APK da plataforma',
            'Suspensão temporária ou permanente da conta',
            'Perda de privilégios de upload',
            'Possível ação legal em casos graves'
          ]
        }
      ]
    },
    {
      id: 'security',
      title: 'Política de Segurança',
      icon: Shield,
      color: 'text-green-500',
      description: 'Medidas de segurança e verificação de APKs',
      sections: [
        {
          title: 'Sistema Bluinder de Verificação',
          icon: Zap,
          content: [
            'Verificação automática de malware em 2 minutos',
            'Análise de permissões e comportamentos suspeitos',
            'Verificação de assinaturas digitais',
            'Comparação com bases de dados de ameaças conhecidas',
            'Selo de verificação de segurança para APKs aprovados'
          ]
        },
        {
          title: 'Proteção de Dados',
          icon: Lock,
          content: [
            'Encriptação de dados sensíveis dos utilizadores',
            'Armazenamento seguro de informações pessoais',
            'Acesso restrito a dados por pessoal autorizado',
            'Backups regulares e seguros',
            'Conformidade com regulamentos de proteção de dados'
          ]
        },
        {
          title: 'Medidas Preventivas',
          icon: Shield,
          content: [
            'Monitorização contínua de atividades suspeitas',
            'Sistemas de detecção de intrusão',
            'Atualizações regulares de segurança',
            'Auditorias de segurança periódicas',
            'Formação contínua da equipa em cibersegurança'
          ]
        }
      ]
    },
    {
      id: 'privacy',
      title: 'Política de Privacidade',
      icon: Lock,
      color: 'text-purple-500',
      description: 'Como recolhemos, usamos e protegemos os seus dados',
      sections: [
        {
          title: 'Dados Recolhidos',
          icon: Users,
          content: [
            'Informações de registo: nome, e-mail, palavra-passe',
            'UUID único gerado automaticamente',
            'Dados de utilização: APKs carregados, downloads, avaliações',
            'Informações técnicas: endereço IP, tipo de dispositivo',
            'Cookies para melhorar a experiência do utilizador'
          ]
        },
        {
          title: 'Utilização dos Dados',
          icon: Eye,
          content: [
            'Fornecer e melhorar os nossos serviços',
            'Autenticação e segurança da conta',
            'Comunicação sobre atualizações e novidades',
            'Análise de utilização para melhorias',
            'Cumprimento de obrigações legais'
          ]
        },
        {
          title: 'Partilha de Dados',
          icon: Globe,
          content: [
            'NÃO vendemos informações pessoais a terceiros',
            'Partilha apenas quando exigido por lei',
            'Fornecedores de serviços com acordos de confidencialidade',
            'Dados agregados e anónimos para estatísticas públicas'
          ]
        },
        {
          title: 'Direitos dos Utilizadores',
          icon: UserCheck,
          content: [
            'Acesso aos seus dados pessoais',
            'Correção de informações incorretas',
            'Eliminação da conta e dados associados',
            'Portabilidade dos dados',
            'Oposição ao processamento de dados'
          ]
        }
      ]
    },
    {
      id: 'monetization',
      title: 'Política de Monetização',
      icon: DollarSign,
      color: 'text-yellow-500',
      description: 'Sistema de pagamentos e monetização da plataforma',
      sections: [
        {
          title: 'Edição de APKs - Sistema de Pagamento',
          icon: CreditCard,
          content: [
            'Conversão de APK para código-fonte: 3.000 Kz AOA',
            'Edição avançada com ferramentas premium: 7.000 Kz AOA',
            'Pagamento único por APK editado',
            'Suporte técnico incluído durante 30 dias',
            'Todas as alterações são rastreadas e creditadas',
            'Reembolso disponível em caso de falha técnica'
          ]
        },
        {
          title: 'Sistema de Convites Premium',
          icon: Gift,
          content: [
            'Convites básicos: gratuitos (limitados a 5 por mês)',
            'Convites premium: 500 Kz AOA cada',
            'Convites premium têm validade estendida (30 dias)',
            'Funcionalidades colaborativas avançadas',
            'Prioridade no suporte técnico'
          ]
        },
        {
          title: 'Publicidade e Anúncios',
          icon: Eye,
          content: [
            'Anúncios exibidos durante contagem regressiva de download',
            'Publicidade não intrusiva e relevante',
            'Opção de remoção de anúncios com subscrição premium',
            'Receitas partilhadas com criadores de APKs populares'
          ]
        },
        {
          title: 'Doações e Apoio',
          icon: Star,
          content: [
            'Sistema de doações opcionais para criadores',
            'Badges especiais para apoiadores da plataforma',
            'Funcionalidades exclusivas para membros premium',
            'Suporte prioritário e acesso antecipado a novidades'
          ]
        },
        {
          title: 'Métodos de Pagamento Aceites',
          icon: CreditCard,
          content: [
            'Cartões de crédito e débito (Visa, Mastercard)',
            'PayPal e carteiras digitais',
            'Transferência bancária (Angola)',
            'Multicaixa Express e outros métodos locais',
            'Criptomoedas (Bitcoin, Ethereum) - em breve'
          ]
        }
      ]
    },
    {
      id: 'terms',
      title: 'Termos de Serviço',
      icon: FileText,
      color: 'text-red-500',
      description: 'Termos e condições de utilização da plataforma',
      sections: [
        {
          title: 'Aceitação dos Termos',
          icon: CheckCircle,
          content: [
            'Ao usar a Regula Mais APK, aceita estes termos integralmente',
            'Termos podem ser atualizados com notificação prévia',
            'Utilização continuada implica aceitação de alterações',
            'Idade mínima de 13 anos para utilização'
          ]
        },
        {
          title: 'Responsabilidades do Utilizador',
          icon: Users,
          content: [
            'Fornecer informações verdadeiras e atualizadas',
            'Manter a segurança da sua conta e palavra-passe',
            'Respeitar direitos de propriedade intelectual',
            'Não usar a plataforma para atividades ilegais',
            'Reportar bugs e vulnerabilidades de segurança'
          ]
        },
        {
          title: 'Responsabilidades da Plataforma',
          icon: Shield,
          content: [
            'Fornecer serviço estável e seguro',
            'Proteger dados pessoais dos utilizadores',
            'Moderar conteúdo de acordo com as políticas',
            'Oferecer suporte técnico adequado',
            'Manter transparência sobre mudanças no serviço'
          ]
        },
        {
          title: 'Limitações de Responsabilidade',
          icon: AlertTriangle,
          content: [
            'Plataforma não se responsabiliza por danos causados por APKs',
            'Utilizadores instalam APKs por sua conta e risco',
            'Verificação de segurança não garante 100% de proteção',
            'Serviço fornecido "como está" sem garantias absolutas'
          ]
        }
      ]
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Políticas da Regula Mais APK
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Conheça as nossas políticas de conteúdo, segurança, privacidade e monetização. 
            Estas diretrizes garantem uma plataforma segura e confiável para todos.
          </p>
        </motion.div>

        {/* Resumo das Políticas */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          {policies.map((policy) => {
            const IconComponent = policy.icon
            return (
              <motion.div key={policy.id} variants={itemVariants}>
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg bg-muted ${policy.color}`}>
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{policy.title}</CardTitle>
                      </div>
                    </div>
                    <CardDescription>{policy.description}</CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Tabs com Políticas Detalhadas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Tabs defaultValue="content" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              {policies.map((policy) => (
                <TabsTrigger key={policy.id} value={policy.id} className="flex items-center gap-2">
                  <policy.icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{policy.title.split(' ')[1]}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {policies.map((policy) => (
              <TabsContent key={policy.id} value={policy.id} className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className={`p-3 rounded-lg bg-muted ${policy.color}`}>
                        <policy.icon className="h-8 w-8" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl">{policy.title}</CardTitle>
                        <CardDescription className="text-base">
                          {policy.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>

                <div className="grid gap-6">
                  {policy.sections.map((section, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Card>
                        <CardHeader>
                          <div className="flex items-center gap-3">
                            <section.icon className={`h-5 w-5 ${policy.color}`} />
                            <CardTitle className="text-lg">{section.title}</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-3">
                            {section.content.map((item, itemIndex) => (
                              <motion.li
                                key={itemIndex}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: itemIndex * 0.05 }}
                                className="flex items-start gap-3"
                              >
                                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span className="text-sm leading-relaxed">{item}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {/* Seção especial para Monetização */}
                {policy.id === 'monetization' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                  >
                    <Alert className="border-yellow-200 bg-yellow-50">
                      <DollarSign className="h-4 w-4 text-yellow-600" />
                      <AlertDescription className="text-yellow-800">
                        <strong>Sistema de Pagamento Seguro:</strong> Todos os pagamentos são processados 
                        através de gateways seguros e encriptados. Os preços estão em Kwanza Angolano (AOA) 
                        e podem variar conforme as taxas de câmbio.
                      </AlertDescription>
                    </Alert>
                  </motion.div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>

        {/* Footer das Políticas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12"
        >
          <Card className="bg-gradient-to-r from-primary/5 to-secondary/5">
            <CardContent className="p-8 text-center">
              <h3 className="text-xl font-semibold mb-4">Dúvidas sobre as Políticas?</h3>
              <p className="text-muted-foreground mb-6">
                Se tiver questões sobre qualquer uma das nossas políticas, não hesite em contactar-nos.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="outline" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Contactar Suporte
                </Button>
                <Button className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Reportar Violação
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Informações Legais */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-8 text-center text-sm text-muted-foreground"
        >
          <p>
            Última atualização: 2 de Outubro de 2025 • 
            Versão 1.0 • 
            © 2025 Regula Mais APK. Todos os direitos reservados.
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default PoliciesPage

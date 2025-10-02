import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Smartphone, 
  Shield, 
  Users, 
  Mail, 
  Github, 
  Twitter, 
  Facebook 
} from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerSections = [
    {
      title: 'Plataforma',
      links: [
        { label: 'Início', path: '/' },
        { label: 'Upload APK', path: '/upload' },
        { label: 'Explorar APKs', path: '/' },
        { label: 'Como Funciona', path: '/' },
      ]
    },
    {
      title: 'Segurança',
      links: [
        { label: 'Políticas de Uso', path: '/policies' },
        { label: 'Privacidade', path: '/policies' },
        { label: 'Termos de Serviço', path: '/policies' },
        { label: 'Sistema Bluinder', path: '/policies' },
      ]
    },
    {
      title: 'Suporte',
      links: [
        { label: 'Central de Ajuda', path: '/' },
        { label: 'Contacto', path: '/' },
        { label: 'FAQ', path: '/' },
        { label: 'Reportar Problema', path: '/' },
      ]
    }
  ]

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Facebook, href: '#', label: 'Facebook' },
  ]

  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="bg-primary text-primary-foreground p-2 rounded-lg"
              >
                <Smartphone className="h-6 w-6" />
              </motion.div>
              <div>
                <h3 className="text-lg font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Regula Mais APK
                </h3>
                <p className="text-xs text-muted-foreground">
                  Plataforma Segura de APKs
                </p>
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground mb-4">
              A plataforma mais segura e confiável para partilha, download e edição de aplicações Android (APK).
            </p>

            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Shield className="h-4 w-4 text-green-500" />
                <span>Seguro</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="h-4 w-4 text-blue-500" />
                <span>Confiável</span>
              </div>
            </div>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section, index) => (
            <div key={section.title}>
              <h4 className="font-semibold text-foreground mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-muted-foreground mb-4 md:mb-0">
            © {currentYear} Regula Mais APK. Todos os direitos reservados.
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-4">
            <span className="text-sm text-muted-foreground">Siga-nos:</span>
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                aria-label={label}
                className="text-muted-foreground hover:text-primary transition-colors duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className="h-5 w-5" />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 pt-6 border-t border-border text-center">
          <p className="text-xs text-muted-foreground">
            Esta plataforma utiliza o sistema de revisão automática <strong>Bluinder</strong> para garantir a segurança dos APKs.
            <br />
            Todos os ficheiros são verificados antes da publicação.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

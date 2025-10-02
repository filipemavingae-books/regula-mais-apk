import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { 
  Smartphone, 
  User, 
  Moon, 
  Sun, 
  Menu, 
  X,
  Upload,
  Home,
  LogIn,
  UserPlus,
  LayoutDashboard
} from 'lucide-react'

const Header = ({ user, darkMode, toggleDarkMode }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  const navItems = [
    { path: '/', label: 'Início', icon: Home },
    { path: '/upload', label: 'Upload APK', icon: Upload, requireAuth: true },
    { path: '/dashboard', label: 'Painel', icon: LayoutDashboard, requireAuth: true },
  ]

  const authItems = user ? [
    { path: '/dashboard', label: user.name || 'Perfil', icon: User },
  ] : [
    { path: '/login', label: 'Entrar', icon: LogIn },
    { path: '/register', label: 'Registar', icon: UserPlus },
  ]

  return (
    <motion.header 
      className="bg-card border-b border-border sticky top-0 z-50 backdrop-blur-md bg-card/80"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <motion.div
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.6 }}
              className="bg-primary text-primary-foreground p-2 rounded-lg"
            >
              <Smartphone className="h-6 w-6" />
            </motion.div>
            <div className="flex flex-col">
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Regula Mais APK
              </span>
              <span className="text-xs text-muted-foreground">
                Plataforma Segura de APKs
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map(({ path, label, icon: Icon, requireAuth }) => {
              if (requireAuth && !user) return null
              return (
                <Link
                  key={path}
                  to={path}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 hover:bg-accent hover:text-accent-foreground ${
                    isActive(path) ? 'bg-primary text-primary-foreground' : 'text-foreground'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{label}</span>
                </Link>
              )
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              className="rounded-full"
            >
              <motion.div
                initial={false}
                animate={{ rotate: darkMode ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </motion.div>
            </Button>

            {authItems.map(({ path, label, icon: Icon }) => (
              <Link key={path} to={path}>
                <Button 
                  variant={isActive(path) ? "default" : "outline"}
                  className="flex items-center space-x-2"
                >
                  <Icon className="h-4 w-4" />
                  <span>{label}</span>
                </Button>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 pb-4 border-t border-border pt-4"
          >
            <nav className="flex flex-col space-y-2">
              {[...navItems, ...authItems].map(({ path, label, icon: Icon, requireAuth }) => {
                if (requireAuth && !user) return null
                return (
                  <Link
                    key={path}
                    to={path}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 hover:bg-accent hover:text-accent-foreground ${
                      isActive(path) ? 'bg-primary text-primary-foreground' : 'text-foreground'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{label}</span>
                  </Link>
                )
              })}
              
              <Button
                variant="ghost"
                onClick={toggleDarkMode}
                className="flex items-center space-x-2 justify-start px-3 py-2"
              >
                {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                <span>{darkMode ? 'Modo Claro' : 'Modo Escuro'}</span>
              </Button>
            </nav>
          </motion.div>
        )}
      </div>
    </motion.header>
  )
}

export default Header

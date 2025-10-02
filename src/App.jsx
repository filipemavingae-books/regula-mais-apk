import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { motion } from 'framer-motion'
import { AuthProvider } from './contexts/AuthContext'
import { ApkProvider } from './contexts/ApkContext'
import './App.css'

// Componentes principais
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './components/HomePage'
import LoginPage from './components/LoginPage'
import RegisterPage from './components/RegisterPage'
import DashboardPage from './components/DashboardPage'
import UploadPage from './components/UploadPage'
import ApkDetailsPage from './components/ApkDetailsPage'
import PoliciesPage from './components/PoliciesPage'

function App() {
  const [darkMode, setDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <AuthProvider>
      <ApkProvider>
        <div className={`min-h-screen bg-background text-foreground ${darkMode ? 'dark' : ''}`}>
          <Router>
            <div className="flex flex-col min-h-screen">
              <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
              
              <motion.main 
                className="flex-1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/upload" element={<UploadPage />} />
                  <Route path="/apk/:id" element={<ApkDetailsPage />} />
                  <Route path="/policies" element={<PoliciesPage />} />
                </Routes>
              </motion.main>
              
              <Footer />
            </div>
          </Router>
        </div>
      </ApkProvider>
    </AuthProvider>
  )
}

export default App

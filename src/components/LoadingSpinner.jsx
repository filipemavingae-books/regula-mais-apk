import { motion } from 'framer-motion'

const LoadingSpinner = ({ 
  size = 'default', 
  variant = 'default', 
  text = 'Carregando...',
  showText = true 
}) => {
  const sizeClasses = {
    small: 'w-6 h-6',
    default: 'w-12 h-12',
    large: 'w-20 h-20'
  }

  const textSizes = {
    small: 'text-sm',
    default: 'text-base',
    large: 'text-lg'
  }

  const SpinnerVariants = {
    default: () => (
      <motion.div
        className={`${sizeClasses[size]} border-4 border-gray-200 border-t-primary rounded-full`}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    ),
    
    dots: () => (
      <div className="flex space-x-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-3 h-3 bg-primary rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    ),

    pulse: () => (
      <motion.div
        className={`${sizeClasses[size]} bg-primary rounded-full`}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 1, 0.5]
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    ),

    bars: () => (
      <div className="flex space-x-1">
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            className="w-1 bg-primary rounded-full"
            style={{ height: '20px' }}
            animate={{
              scaleY: [1, 2, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.1,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    ),

    orbit: () => (
      <div className={`relative ${sizeClasses[size]}`}>
        <motion.div
          className="absolute inset-0"
          animate={{ rotate: 360 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <div className="w-3 h-3 bg-primary rounded-full absolute top-0 left-1/2 transform -translate-x-1/2"></div>
        </motion.div>
        <motion.div
          className="absolute inset-0"
          animate={{ rotate: -360 }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <div className="w-2 h-2 bg-secondary rounded-full absolute bottom-0 left-1/2 transform -translate-x-1/2"></div>
        </motion.div>
      </div>
    ),

    wave: () => (
      <div className="flex space-x-1">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-8 bg-primary rounded-full"
            animate={{
              scaleY: [1, 0.3, 1],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.1,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    )
  }

  return (
    <motion.div
      className="flex flex-col items-center justify-center space-y-4"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3 }}
    >
      {/* Spinner */}
      <div className="flex items-center justify-center">
        {SpinnerVariants[variant] ? SpinnerVariants[variant]() : SpinnerVariants.default()}
      </div>

      {/* Texto */}
      {showText && (
        <motion.p
          className={`${textSizes[size]} text-muted-foreground font-medium`}
          animate={{
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {text}
        </motion.p>
      )}
    </motion.div>
  )
}

// Componente de loading para página inteira
export const FullPageLoader = ({ variant = 'orbit', text = 'Carregando plataforma...' }) => {
  return (
    <motion.div
      className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="text-center">
        <LoadingSpinner variant={variant} size="large" text={text} />
        
        {/* Logo animado */}
        <motion.div
          className="mt-8"
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Regula Mais APK
          </div>
          <p className="text-muted-foreground mt-2">Plataforma Segura de APKs</p>
        </motion.div>
      </div>
    </motion.div>
  )
}

// Componente de skeleton loading
export const SkeletonLoader = ({ className = '', variant = 'default' }) => {
  const variants = {
    default: 'h-4 bg-muted rounded',
    card: 'h-32 bg-muted rounded-lg',
    avatar: 'h-12 w-12 bg-muted rounded-full',
    text: 'h-4 bg-muted rounded w-3/4',
    title: 'h-6 bg-muted rounded w-1/2'
  }

  return (
    <motion.div
      className={`${variants[variant]} ${className}`}
      animate={{
        opacity: [0.5, 1, 0.5]
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  )
}

export default LoadingSpinner

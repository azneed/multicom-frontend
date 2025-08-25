import React, { useState, useEffect, useRef } from "react"

// Utility function for class names
const cn = (...classes) => classes.filter(Boolean).join(" ")

// UI Components
const Button = React.forwardRef(({ className, variant = "default", size = "default", ...props }, ref) => {
  const variants = {
    default: "bg-gradient-to-r from-purple-600 to-blue-700 text-white hover:from-purple-700 hover:to-blue-800 shadow-lg hover:shadow-xl",
    outline: "border-2 border-purple-600 bg-transparent hover:bg-purple-600 text-purple-600 hover:text-white shadow-md hover:shadow-lg",
    premium: "bg-gradient-to-r from-yellow-500 to-orange-600 text-white hover:from-yellow-600 hover:to-orange-700 shadow-lg hover:shadow-xl",
    secondary: "bg-gradient-to-r from-gray-600 to-gray-700 text-white hover:from-gray-700 hover:to-gray-800 shadow-lg hover:shadow-xl",
  }

  const sizes = {
    default: "h-12 px-6 py-3",
    lg: "h-14 px-8 py-4",
    xl: "h-16 px-10 py-5",
    icon: "h-12 w-12",
  }

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-xl text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 disabled:pointer-events-none disabled:opacity-50 transform hover:scale-105",
        variants[variant],
        sizes[size],
        className,
      )}
      ref={ref}
      {...props}
    />
  )
})
Button.displayName = "Button"

const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("rounded-2xl border bg-white/90 backdrop-blur-sm text-gray-900 shadow-xl hover:shadow-2xl transition-all duration-300", className)} {...props} />
))
Card.displayName = "Card"

const Badge = ({ className, variant = "default", ...props }) => {
  const variants = {
    default: "bg-gradient-to-r from-purple-600 to-blue-700 text-white",
    premium: "bg-gradient-to-r from-yellow-500 to-orange-600 text-white shadow-lg",
    live: "bg-gradient-to-r from-red-500 to-pink-600 text-white shadow-lg animate-pulse",
  }

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold",
        variants[variant],
        className,
      )}
      {...props}
    />
  )
}

// MULTICom Logo Component using your actual logo design
const MulticomLogo = ({ size = "default", className = "" }) => {
  const sizes = {
    small: "text-lg",
    default: "text-2xl", 
    large: "text-4xl"
  }

  return (
    <div className={cn("flex items-center", className)}>
      <div className="relative">
        <div className="bg-gradient-to-r from-blue-700 via-purple-700 to-blue-800 rounded-full border-2 border-cyan-400 px-4 py-2 flex items-center shadow-lg">
          <span className={cn("text-white font-black tracking-wide", sizes[size])}>MULTI</span>
        </div>
        <div className="absolute -right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-black px-3 py-1 rounded shadow-md">
          <span className={sizes[size]}>Com</span>
        </div>
      </div>
    </div>
  )
}

// Animated Counter Component
const AnimatedCounter = ({ target, duration = 2000 }) => {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    let startTime
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      
      setCount(Math.floor(progress * target))
      
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    
    requestAnimationFrame(animate)
  }, [isVisible, target, duration])

  return <span ref={ref}>{count}</span>
}

// Brochure Slider Component
const BrochureSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const brochurePages = [
    {
      title: "Season 16 Overview",
      description: "Complete MULTICom Gift Scheme catalog featuring premium prizes",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop",
      highlights: ["1 BHK Flat", "Maruti Suzuki Fronx", "8 Motorcycles", "Premium Electronics"]
    },
    {
      title: "Weeks 1-20: Home Essentials",
      description: "Essential home appliances and electronics",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop",
      highlights: ["Gas Geyser", "Washing Machine", "32\" Smart TV", "Microwave Oven"]
    },
    {
      title: "Weeks 21-40: Premium Electronics",
      description: "Smart devices and advanced electronics",
      image: "https://images.unsplash.com/photo-1540829917886-91ab031b1764?w=800&h=600&fit=crop",
      highlights: ["Samsung Galaxy F05", "Home Theater", "Air Fryer", "Smart TVs"]
    },
    {
      title: "Weeks 41-60: Grand Finale",
      description: "Ultimate prizes including flat and car",
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop",
      highlights: ["1BHK Ready Flat", "Maruti Suzuki Fronx", "₹20,000 Cash", "Gold Coins"]
    }
  ]

  useEffect(() => {
    if (!isAutoPlaying) return
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % brochurePages.length)
    }, 4000)
    
    return () => clearInterval(interval)
  }, [isAutoPlaying, brochurePages.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % brochurePages.length)
    setIsAutoPlaying(false)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + brochurePages.length) % brochurePages.length)
    setIsAutoPlaying(false)
  }

  return (
    <div 
      className="relative bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur-lg rounded-3xl overflow-hidden border border-white/20 shadow-2xl"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <Badge variant="live" className="absolute top-4 right-4 z-20">
        Season 16 LIVE
      </Badge>
      
      <div className="relative h-96 overflow-hidden">
        {brochurePages.map((page, index) => (
          <div
            key={index}
            className={cn(
              "absolute inset-0 transition-all duration-700 ease-in-out",
              index === currentSlide ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full"
            )}
          >
            <div 
              className="h-full bg-cover bg-center relative"
              style={{ backgroundImage: `url(${page.image})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <h3 className="text-3xl font-bold mb-4">{page.title}</h3>
                <p className="text-xl text-white/90 mb-4">{page.description}</p>
                <div className="grid grid-cols-2 gap-2">
                  {page.highlights.map((highlight, idx) => (
                    <div key={idx} className="bg-white/20 backdrop-blur-sm rounded-lg p-2 text-sm font-semibold">
                      {highlight}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 rounded-full p-3 transition-all duration-300"
      >
        <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 rounded-full p-3 transition-all duration-300"
      >
        <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
        {brochurePages.map((_, index) => (
          <button
            key={index}
            className={cn(
              "w-3 h-3 rounded-full transition-all duration-300",
              currentSlide === index ? "bg-white scale-125" : "bg-white/50 hover:bg-white/70"
            )}
            onClick={() => {
              setCurrentSlide(index)
              setIsAutoPlaying(false)
            }}
          />
        ))}
      </div>
    </div>
  )
}

// Prize Categories with real images
const PrizeShowcase = () => {
  const prizes = [
    { 
      name: "Maruti Suzuki Fronx", 
      value: "Brand New Car", 
      image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop",
      gradient: "from-blue-500 to-cyan-600" 
    },
    { 
      name: "1BHK Flat", 
      value: "Ready to Move", 
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop",
      gradient: "from-green-500 to-emerald-600" 
    },
    { 
      name: "Hero HF 100", 
      value: "8 Motorcycles", 
      image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop",
      gradient: "from-red-500 to-pink-600" 
    },
    { 
      name: "Premium Electronics", 
      value: "TVs, Phones & More", 
      image: "https://images.unsplash.com/photo-1540829917886-91ab031b1764?w=400&h=300&fit=crop",
      gradient: "from-purple-500 to-indigo-600" 
    }
  ]

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {prizes.map((prize, index) => (
        <Card key={index} className="group hover:scale-105 transition-all duration-500 overflow-hidden border-2 hover:border-purple-400/50">
          <div className="relative h-48 overflow-hidden">
            <img 
              src={prize.image} 
              alt={prize.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className={cn("absolute inset-0 bg-gradient-to-t opacity-60", prize.gradient)}></div>
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
              <h3 className="text-lg font-bold mb-1">{prize.name}</h3>
              <p className="text-sm opacity-90">{prize.value}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}

// Floating Animation Component
const FloatingElement = ({ children, delay = 0 }) => {
  return (
    <div 
      className="animate-bounce"
      style={{ 
        animationDelay: `${delay}s`,
        animationDuration: '3s',
        animationIterationCount: 'infinite'
      }}
    >
      {children}
    </div>
  )
}

// Main Component
const MulticomPremiumLanding = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleDownloadBrochure = () => {
    alert('Download feature would be implemented in production. Contact us at 9746797367 for the complete brochure!')
  }

  const features = [
    { 
      title: "60 Weeks Program", 
      value: 60, 
      description: "Complete duration",
      icon: "📅"
    },
    { 
      title: "100% Winners", 
      value: 100, 
      description: "Guaranteed weekly winners",
      icon: "🏆"
    },
    { 
      title: "5000+ Members", 
      value: 5000, 
      description: "Trusted community",
      icon: "👥"
    },
    { 
      title: "Premium Prizes", 
      value: 25, 
      description: "Categories available",
      icon: "🎁"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-yellow-500/20 rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Header */}
      <header className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrollY > 100 ? "bg-black/80 backdrop-blur-lg border-b border-white/10" : "bg-transparent"
      )}>
        <div className="container mx-auto px-6 py-4 max-w-7xl">
          <div className="flex items-center justify-between">
            <MulticomLogo className="transform hover:scale-105 transition-transform duration-300" />
            
            <div className="hidden md:flex items-center space-x-6">
              <div className="text-white/80 text-sm">
                <p>The 6th Generation Needs...</p>
                <p className="text-yellow-400 font-bold">UPPALA Presents</p>
              </div>
              
              <div className="flex items-center space-x-3 text-white/80 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2">
                <span className="text-2xl">📞</span>
                <div>
                  <p className="font-bold text-white">9746797367</p>
                  <p className="text-xs">9037497367</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20">
        <div className="container mx-auto px-6 relative z-10 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <FloatingElement>
                  <Badge variant="live" className="text-lg px-6 py-3">
                    Season 16 • 2025-26 • LIVE NOW
                  </Badge>
                </FloatingElement>
                
                <h1 className="text-6xl lg:text-8xl font-black text-white leading-tight">
                  MULTI
                  <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                    Com
                  </span>
                  <br />
                  <span className="text-4xl lg:text-5xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    GIFT SCHEME
                  </span>
                </h1>
                
                <p className="text-xl lg:text-2xl text-white/90 leading-relaxed max-w-2xl">
                  Join India's most prestigious gift scheme with guaranteed weekly winners! 
                  Win amazing prizes including <span className="text-yellow-400 font-bold">cash, electronics, vehicles</span> and the ultimate 
                  <span className="text-yellow-400 font-bold"> 1BHK flat or Maruti Suzuki Fronx!</span>
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-6">
                <Button size="xl" variant="premium" className="text-xl px-12 py-6 shadow-2xl">
                  <span className="text-2xl mr-3">🎯</span>
                  Join Premium Scheme
                </Button>
                
                <Button 
                  size="xl" 
                  variant="secondary" 
                  className="text-xl px-12 py-6"
                  onClick={handleDownloadBrochure}
                >
                  <span className="text-2xl mr-3">📄</span>
                  Download Brochure
                </Button>
              </div>

              <div className="flex flex-wrap items-center gap-8 text-white/80">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🗓️</span>
                  <span className="text-lg">Draw Every Thursday 4:30PM</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">📍</span>
                  <span className="text-lg">Singapore Complex, Uppala</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <FloatingElement delay={1}>
                <BrochureSlider />
              </FloatingElement>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-black/30 backdrop-blur-lg border-y border-white/10">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid md:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border-white/20 hover:border-purple-400/50 transition-all duration-500 p-8 group-hover:scale-105">
                  <div className="text-6xl mb-4 group-hover:animate-bounce">{feature.icon}</div>
                  <div className="text-5xl font-black text-white mb-2">
                    <AnimatedCounter target={feature.value} />
                    {feature.title.includes("Winners") ? "%" : feature.title.includes("Members") ? "+" : ""}
                  </div>
                  <h3 className="text-xl font-bold text-purple-300 mb-2">{feature.title}</h3>
                  <p className="text-white/60">{feature.description}</p>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prize Categories */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16">
            <FloatingElement>
              <Badge variant="premium" className="text-lg px-6 py-3 mb-6">
                Premium Prize Collection
              </Badge>
            </FloatingElement>
            <h2 className="text-5xl lg:text-6xl font-black text-white mb-6">
              Amazing Prize Categories
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Experience the thrill of winning from our incredible collection of premium prizes
            </p>
          </div>

          <PrizeShowcase />
        </div>
      </section>

      {/* Fronx Showcase */}
      <section className="py-24 bg-gradient-to-r from-blue-900/50 to-purple-900/50 backdrop-blur-lg">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <Badge variant="live" className="text-xl px-8 py-4">
                Week 60 Grand Prize
              </Badge>
              
              <h2 className="text-5xl font-black text-white leading-tight">
                Win the Brand New
                <span className="block text-6xl bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  MARUTI SUZUKI FRONX
                </span>
              </h2>
              
              <div className="space-y-4 text-white/90">
                <p className="text-xl">🚗 Latest 2025 Model</p>
                <p className="text-xl">⛽ Excellent Fuel Efficiency</p>
                <p className="text-xl">🔒 Premium Safety Features</p>
                <p className="text-xl">💎 Sigma Variant</p>
              </div>
              
              <div className="bg-yellow-500/20 backdrop-blur-sm rounded-2xl p-6 border border-yellow-400/30">
                <p className="text-yellow-300 font-bold text-lg">
                  🎯 Alternative: 1BHK Ready-to-Move Flat + ₹5,000 Commission
                </p>
              </div>
            </div>
            
            <div className="relative">
              <FloatingElement delay={0.5}>
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop" 
                    alt="Maruti Suzuki Fronx"
                    className="w-full rounded-2xl shadow-2xl"
                  />
                  <div className="absolute -top-6 -right-6 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-3 rounded-2xl font-bold text-lg animate-pulse">
                    Grand Prize!
                  </div>
                </div>
              </FloatingElement>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-white mb-6">Why Choose MULTICom?</h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Trusted by thousands of satisfied members across India with complete transparency
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-lg border-green-400/30 hover:border-green-400/60 transition-all duration-500 p-8 text-center group hover:scale-105">
              <div className="text-6xl mb-6 group-hover:animate-bounce">✅</div>
              <h3 className="text-2xl font-bold text-white mb-4">100% Transparent</h3>
              <p className="text-white/70">All draws conducted live with complete transparency and fairness</p>
            </Card>

            <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-lg border-blue-400/30 hover:border-blue-400/60 transition-all duration-500 p-8 text-center group hover:scale-105">
              <div className="text-6xl mb-6 group-hover:animate-bounce">🏆</div>
              <h3 className="text-2xl font-bold text-white mb-4">Guaranteed Winners</h3>
              <p className="text-white/70">Every week has confirmed winners - no empty draws!</p>
            </Card>

            <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-lg border-purple-400/30 hover:border-purple-400/60 transition-all duration-500 p-8 text-center group hover:scale-105">
              <div className="text-6xl mb-6 group-hover:animate-bounce">👥</div>
              <h3 className="text-2xl font-bold text-white mb-4">Trusted Community</h3>
              <p className="text-white/70">Join thousands of happy members in our elite community</p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 relative">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-6 text-center max-w-7xl relative z-10">
          <FloatingElement>
            <Badge variant="live" className="text-2xl px-12 py-6 shadow-2xl mb-8">
              Season 16 ACTIVE • Limited Time
            </Badge>
          </FloatingElement>
          
          <h2 className="text-6xl lg:text-7xl font-black text-white mb-8">
            Ready to Start
            <span className="block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              WINNING?
            </span>
          </h2>
          
          <p className="text-2xl lg:text-3xl text-white/90 mb-12 max-w-4xl mx-auto">
            Join thousands of elite members in India's most trusted and transparent gift scheme
          </p>

          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
            <Button size="xl" variant="premium" className="text-2xl px-16 py-8 shadow-2xl">
              <span className="text-3xl mr-4">🎯</span>
              Join Premium Scheme Now
            </Button>

            <div className="flex items-center space-x-4 text-2xl lg:text-3xl text-white bg-white/10 backdrop-blur-sm rounded-2xl px-8 py-6">
              <span className="text-4xl">📞</span>
              <div>
                <p className="font-bold">9746797367</p>
                <p className="text-lg text-white/80">Call Now</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Weekly Schedule Section */}
      <section className="py-24 bg-gradient-to-b from-slate-900 to-purple-900 relative">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16">
            <Badge variant="premium" className="text-lg px-6 py-3 mb-6">
              Complete Prize Schedule
            </Badge>
            <h2 className="text-5xl font-black text-white mb-6">60 Weeks of Guaranteed Wins</h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Explore our detailed weekly prize schedule with real product images and specifications
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="overflow-hidden bg-gradient-to-br from-red-500/10 to-pink-500/10 backdrop-blur-lg border-red-400/30 hover:scale-105 transition-all duration-500">
              <div className="relative h-64">
                <img 
                  src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop" 
                  alt="Home Appliances"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="text-2xl font-bold mb-2">Weeks 1-20</h3>
                  <p className="text-lg">Home Essentials</p>
                </div>
              </div>
              <div className="p-6 space-y-3">
                <div className="flex items-center space-x-2 text-white/80">
                  <span>🔥</span>
                  <span>Gas Geyser & Cooler</span>
                </div>
                <div className="flex items-center space-x-2 text-white/80">
                  <span>📺</span>
                  <span>32" Smart TV</span>
                </div>
                <div className="flex items-center space-x-2 text-white/80">
                  <span>🔄</span>
                  <span>Washing Machine</span>
                </div>
                <div className="flex items-center space-x-2 text-white/80">
                  <span>🍽️</span>
                  <span>Microwave Oven</span>
                </div>
              </div>
            </Card>

            <Card className="overflow-hidden bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-lg border-blue-400/30 hover:scale-105 transition-all duration-500">
              <div className="relative h-64">
                <img 
                  src="https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600&h=400&fit=crop" 
                  alt="Vehicles & Electronics"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="text-2xl font-bold mb-2">Weeks 21-40</h3>
                  <p className="text-lg">Vehicles & Tech</p>
                </div>
              </div>
              <div className="p-6 space-y-3">
                <div className="flex items-center space-x-2 text-white/80">
                  <span>🏍️</span>
                  <span>Hero HF 100</span>
                </div>
                <div className="flex items-center space-x-2 text-white/80">
                  <span>📱</span>
                  <span>Samsung Galaxy F05</span>
                </div>
                <div className="flex items-center space-x-2 text-white/80">
                  <span>🎵</span>
                  <span>5.1 Home Theater</span>
                </div>
                <div className="flex items-center space-x-2 text-white/80">
                  <span>🥇</span>
                  <span>Gold Coins</span>
                </div>
              </div>
            </Card>

            <Card className="overflow-hidden bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-lg border-green-400/30 hover:scale-105 transition-all duration-500">
              <div className="relative h-64">
                <img 
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop" 
                  alt="Grand Finale"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="text-2xl font-bold mb-2">Weeks 41-60</h3>
                  <p className="text-lg">Grand Finale</p>
                </div>
              </div>
              <div className="p-6 space-y-3">
                <div className="flex items-center space-x-2 text-white/80">
                  <span>🏠</span>
                  <span>1BHK Ready Flat</span>
                </div>
                <div className="flex items-center space-x-2 text-white/80">
                  <span>🚗</span>
                  <span>Maruti Suzuki Fronx</span>
                </div>
                <div className="flex items-center space-x-2 text-white/80">
                  <span>💰</span>
                  <span>₹20,000 Cash Prize</span>
                </div>
                <div className="flex items-center space-x-2 text-white/80">
                  <span>💎</span>
                  <span>Premium Furniture</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Download CTA */}
          <div className="text-center">
            <Card className="inline-block bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-lg border-purple-400/50 p-8 max-w-2xl">
              <div className="space-y-6">
                <MulticomLogo size="large" className="justify-center" />
                
                <h3 className="text-3xl font-black text-white mb-4">Complete Season 16 Catalog</h3>
                <p className="text-white/80 mb-6 text-lg">
                  Download our official brochure with detailed prize schedules, terms, and high-resolution product images
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    size="lg"
                    variant="premium" 
                    className="text-lg px-8 py-4"
                    onClick={handleDownloadBrochure}
                  >
                    <span className="text-2xl mr-3">📄</span>
                    Download Full Brochure
                  </Button>
                  
                  <Button 
                    size="lg"
                    variant="outline" 
                    className="text-lg px-8 py-4 border-white/30 text-white hover:bg-white hover:text-gray-900"
                  >
                    <span className="text-2xl mr-3">📞</span>
                    Call for Details
                  </Button>
                </div>
                
                <div className="bg-yellow-500/20 backdrop-blur-sm rounded-xl p-4 border border-yellow-400/30">
                  <p className="text-yellow-300 font-bold">
                    ✨ Complete 60-week schedule with prize images and specifications
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* How to Join Section */}
      <section className="py-24 bg-gradient-to-r from-indigo-900/50 to-purple-900/50 backdrop-blur-lg">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-white mb-6">How to Join MULTICom</h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Simple steps to become part of India's most prestigious gift scheme
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center space-y-6">
              <div className="bg-gradient-to-r from-red-500 to-pink-600 w-24 h-24 rounded-full flex items-center justify-center mx-auto text-4xl font-black text-white shadow-2xl">
                1
              </div>
              <Card className="bg-gradient-to-br from-red-500/10 to-pink-500/10 backdrop-blur-lg border-red-400/30 p-6">
                <div className="text-4xl mb-4">🏢</div>
                <h3 className="text-xl font-bold text-white mb-3">Visit Our Office</h3>
                <p className="text-white/70">
                  Ground Floor, Singapore Complex<br/>
                  Uppala, Kerala
                </p>
              </Card>
            </div>

            <div className="text-center space-y-6">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-600 w-24 h-24 rounded-full flex items-center justify-center mx-auto text-4xl font-black text-white shadow-2xl">
                2
              </div>
              <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-lg border-blue-400/30 p-6">
                <div className="text-4xl mb-4">📋</div>
                <h3 className="text-xl font-bold text-white mb-3">Choose Your Plan</h3>
                <p className="text-white/70">
                  Select membership option<br/>
                  Complete registration process
                </p>
              </Card>
            </div>

            <div className="text-center space-y-6">
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 w-24 h-24 rounded-full flex items-center justify-center mx-auto text-4xl font-black text-white shadow-2xl">
                3
              </div>
              <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-lg border-green-400/30 p-6">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-xl font-bold text-white mb-3">Start Winning!</h3>
                <p className="text-white/70">
                  Active in all weekly draws<br/>
                  Every Thursday 4:30PM
                </p>
              </Card>
            </div>
          </div>

          <div className="text-center">
            <Card className="inline-block bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-lg border-yellow-400/50 p-6">
              <div className="space-y-3">
                <h4 className="text-2xl font-bold text-white mb-4">Contact Information</h4>
                <div className="grid md:grid-cols-2 gap-6 text-white/90">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">📱</span>
                    <div>
                      <p className="font-bold">9746797367</p>
                      <p className="text-sm">Primary Contact</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">📞</span>
                    <div>
                      <p className="font-bold">9037497367</p>
                      <p className="text-sm">Alternate Contact</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">📍</span>
                    <div>
                      <p className="font-bold">Singapore Complex</p>
                      <p className="text-sm">Ground Floor, Uppala</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">🎯</span>
                    <div>
                      <p className="font-bold">Every Thursday</p>
                      <p className="text-sm">4:30PM Draw</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/60 backdrop-blur-lg text-white py-16 border-t border-white/10">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="space-y-6">
              <MulticomLogo size="large" />
              <div className="space-y-2">
                <p className="text-yellow-400 font-bold text-lg">The 6th Generation Needs...</p>
                <p className="text-white/80">UPPALA Presents</p>
                <p className="text-white/60 leading-relaxed">
                  India's most trusted gift scheme with guaranteed weekly winners. 
                  Join thousands of satisfied members in our transparent and fair program.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-bold mb-6 text-purple-400">Contact Details</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">📱</span>
                  <div>
                    <p className="font-bold text-white">9746797367</p>
                    <p className="text-white/70">Primary Contact</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">📞</span>
                  <div>
                    <p className="font-bold text-white">9037497367</p>
                    <p className="text-white/70">Alternate Contact</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">📍</span>
                  <div>
                    <p className="font-bold text-white">Ground Floor</p>
                    <p className="text-white/70">Singapore Complex, Uppala</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">🌐</span>
                  <div>
                    <p className="font-bold text-white">www.multicomgiftscheme.in</p>
                    <p className="text-white/70">Official Website</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-bold mb-6 text-purple-400">Important Information</h3>
              <div className="space-y-3 text-white/70">
                <div className="flex items-start space-x-2">
                  <span>✅</span>
                  <p>All draws conducted transparently</p>
                </div>
                <div className="flex items-start space-x-2">
                  <span>📸</span>
                  <p>Images for illustration purposes only</p>
                </div>
                <div className="flex items-start space-x-2">
                  <span>📋</span>
                  <p>Terms and conditions apply</p>
                </div>
                <div className="flex items-start space-x-2">
                  <span>🏆</span>
                  <p>Guaranteed weekly winners</p>
                </div>
                <div className="flex items-start space-x-2">
                  <span>💎</span>
                  <p>Premium membership benefits</p>
                </div>
                <div className="flex items-start space-x-2">
                  <span>🎯</span>
                  <p>60-week complete program</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/20 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-center md:text-left">
                <p className="text-white/60">
                  &copy; 2025 MULTICom Gift Scheme. All rights reserved. | Season 16 • 2025-26
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <Badge variant="live" className="px-4 py-2">
                  Season 16 ACTIVE
                </Badge>
                <div className="text-white/60">
                  <p className="text-sm">Draw ID: 8891497367</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <FloatingElement>
          <Button 
            size="lg"
            variant="premium" 
            className="rounded-full shadow-2xl w-16 h-16"
            onClick={() => window.open('tel:9746797367')}
          >
            <span className="text-2xl">📞</span>
          </Button>
        </FloatingElement>
      </div>
    </div>
  )
}

export default MulticomPremiumLanding
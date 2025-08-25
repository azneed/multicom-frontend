"use client"

import React, { useState, useEffect, createContext, useContext } from "react"

// Utility function for class names
const cn = (...classes) => classes.filter(Boolean).join(" ")

// Dialog Context
const DialogContext = createContext()

// UI Components
const Button = React.forwardRef(({ className, variant = "default", size = "default", ...props }, ref) => {
  const variants = {
    default: "bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 shadow-lg hover:shadow-xl",
    outline: "border-2 border-red-600 bg-transparent hover:bg-red-600 text-red-600 hover:text-white shadow-md hover:shadow-lg",
    premium: "bg-gradient-to-r from-yellow-500 to-yellow-600 text-white hover:from-yellow-600 hover:to-yellow-700 shadow-lg hover:shadow-xl",
    green: "bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800 shadow-lg hover:shadow-xl",
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
        "inline-flex items-center justify-center rounded-xl text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 disabled:pointer-events-none disabled:opacity-50 transform hover:scale-105",
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
  <div ref={ref} className={cn("rounded-2xl border bg-white/80 backdrop-blur-sm text-gray-900 shadow-xl hover:shadow-2xl transition-all duration-300", className)} {...props} />
))
Card.displayName = "Card"

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-8", className)} {...props} />
))
CardContent.displayName = "CardContent"

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-12 w-full rounded-xl border-2 border-gray-200 bg-white/90 px-4 py-3 text-sm placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      ref={ref}
      {...props}
    />
  )
})
Input.displayName = "Input"

const Label = React.forwardRef(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={cn("text-sm font-semibold leading-none", className)}
    {...props}
  />
))
Label.displayName = "Label"

const Dialog = ({ children, open, onOpenChange }) => {
  const [isOpen, setIsOpen] = useState(open || false)

  const handleOpenChange = (newOpen) => {
    setIsOpen(newOpen)
    if (onOpenChange) onOpenChange(newOpen)
  }

  return <DialogContext.Provider value={{ isOpen, setIsOpen: handleOpenChange }}>{children}</DialogContext.Provider>
}

const DialogTrigger = ({ children }) => {
  const context = useContext(DialogContext)
  if (!context) return children

  const { setIsOpen } = context

  return React.cloneElement(children, {
    onClick: (e) => {
      setIsOpen(true)
      if (children.props.onClick) children.props.onClick(e)
    },
  })
}

const DialogContent = ({ className, children, ...props }) => {
  const context = useContext(DialogContext)
  if (!context) return null

  const { isOpen, setIsOpen } = context

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
      <div
        className={cn(
          "relative bg-white/95 backdrop-blur-lg p-8 shadow-2xl rounded-2xl border max-w-lg w-full max-h-[90vh] overflow-y-auto",
          className,
        )}
        {...props}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="absolute right-6 top-6 rounded-xl opacity-70 hover:opacity-100 text-gray-500 hover:text-gray-700 p-2"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  )
}

const DialogHeader = ({ className, ...props }) => (
  <div className={cn("flex flex-col space-y-2 text-left", className)} {...props} />
)

const DialogTitle = ({ className, ...props }) => (
  <h2 className={cn("text-2xl font-bold text-red-600", className)} {...props} />
)

const DialogDescription = ({ className, ...props }) => (
  <p className={cn("text-gray-600", className)} {...props} />
)

const Badge = ({ className, variant = "default", ...props }) => {
  const variants = {
    default: "bg-gradient-to-r from-red-600 to-red-700 text-white",
    premium: "bg-gradient-to-r from-yellow-500 to-yellow-600 text-white shadow-lg",
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

// Animated Counter Component
const AnimatedCounter = ({ target }) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setCount(target), 100)
    return () => clearTimeout(timer)
  }, [target])

  return <span>{count}</span>
}

// Prize Showcase Component
const PrizeShowcase = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const totalSlides = 6

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides)
    }, 4000)
    return () => clearInterval(timer)
  }, [totalSlides])

  const slides = [
    {
      title: "Season 16 Overview",
      description: "Complete MULTICom Gift Scheme catalog",
      highlight: "1 Flat + 1 Car + 8 Motorcycles + Premium Prizes",
      emoji: "🏆"
    },
    {
      title: "Weeks 1-10: Home Essentials",
      description: "Kitchen appliances and home electronics",
      highlight: "Microwave, Gas Geyser, Cooler, TV, Washing Machine",
      emoji: "🏠"
    },
    {
      title: "Weeks 11-30: Premium Electronics",
      description: "Smart devices and entertainment systems",
      highlight: "Smart TVs, Samsung Galaxy, Home Theater, Air Fryer",
      emoji: "📱"
    },
    {
      title: "Weeks 31-50: Furniture & Vehicles",
      description: "Complete home furnishing and motorcycles",
      highlight: "Hero HF 100, Sofa Sets, Dining Tables, Gold Coins",
      emoji: "🏍️"
    },
    {
      title: "Weeks 51-59: Final Sprint",
      description: "High-value prizes before grand finale",
      highlight: "₹20,000 Cash, Premium Appliances, Gold",
      emoji: "💰"
    },
    {
      title: "Week 60: GRAND FINALE",
      description: "Ultimate dream prizes await!",
      highlight: "1BHK Flat OR Maruti Suzuki Fronx + ₹5000 Commission",
      emoji: "🎯"
    }
  ]

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % totalSlides)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)

  return (
    <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-3xl overflow-hidden border border-white/20 shadow-2xl">
      <div className="absolute -top-6 -right-6 z-20 bg-gradient-to-r from-yellow-500 to-red-500 text-white px-6 py-3 rounded-2xl font-bold text-lg animate-pulse shadow-lg">
        Season 16 Live!
      </div>
      
      <div className="relative h-96">
        <div className="h-full flex items-center justify-center bg-gradient-to-br from-red-900 to-purple-900">
          <div className="text-center space-y-6 px-8">
            <div className="text-6xl mb-4">{slides[currentSlide].emoji}</div>
            <h3 className="text-3xl font-bold text-white">{slides[currentSlide].title}</h3>
            <p className="text-xl text-white/80">{slides[currentSlide].description}</p>
            <div className="bg-gradient-to-r from-yellow-500/20 to-red-500/20 backdrop-blur-sm rounded-xl p-4 border border-yellow-400/30">
              <p className="text-yellow-300 font-bold text-lg">{slides[currentSlide].highlight}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 rounded-full p-3"
      >
        <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 rounded-full p-3"
      >
        <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            className={cn(
              "w-3 h-3 rounded-full transition-all",
              currentSlide === index ? "bg-white" : "bg-white/50"
            )}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  )
}

// Download PDF Component
const DownloadButton = ({ children, className, ...props }) => {
  const handleDownload = () => {
    alert('PDF download would be available in production. Contact us at 9746797367 for the complete brochure!')
  }

  return (
    <button
      onClick={handleDownload}
      className={cn("inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-300", className)}
      {...props}
    >
      {children}
    </button>
  )
}

// Icon Components
const Gift = ({ className = "h-6 w-6" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <rect x="3" y="8" width="18" height="4" rx="1" />
    <path d="m12 8-2-2v2H8l2-2 2 2" />
    <path d="M12 21V8" />
  </svg>
)

const Phone = ({ className = "h-6 w-6" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
)

const MapPin = ({ className = "h-6 w-6" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
)

const Calendar = ({ className = "h-6 w-6" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
  </svg>
)

const Users = ({ className = "h-6 w-6" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
  </svg>
)

const Trophy = ({ className = "h-6 w-6" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
  </svg>
)

const Award = ({ className = "h-6 w-6" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx="12" cy="8" r="6" />
    <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
  </svg>
)

const User = ({ className = "h-6 w-6" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
)

const Lock = ({ className = "h-6 w-6" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <circle cx="12" cy="16" r="1" />
  </svg>
)

const Mail = ({ className = "h-6 w-6" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-10 5L2 7" />
  </svg>
)

const CheckCircle = ({ className = "h-6 w-6" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22,4 12,14.01 9,11.01" />
  </svg>
)

const ArrowRight = ({ className = "h-6 w-6" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12,5 19,12 12,19" />
  </svg>
)

const Sparkles = ({ className = "h-6 w-6" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
  </svg>
)

// MULTICom Logo Component
const MulticomLogo = ({ size = "default" }) => {
  const sizes = {
    small: "text-lg",
    default: "text-2xl", 
    large: "text-4xl"
  }

  return (
    <div className="flex items-center space-x-3">
      <div className="relative">
        <div className="bg-gradient-to-r from-blue-700 to-purple-700 rounded-full border-2 border-cyan-400 px-4 py-2 flex items-center">
          <span className={cn("text-white font-black tracking-wide", sizes[size])}>MULTI</span>
        </div>
        <div className="absolute -right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-black px-3 py-1 rounded">
          <span className={sizes[size]}>Com</span>
        </div>
      </div>
    </div>
  )
}

// Main Component
const PremiumLandingPage = () => {
  const [loginOpen, setLoginOpen] = useState(false)
  const [joinOpen, setJoinOpen] = useState(false)

  const prizes = [
    { name: "Cash Prizes", value: "₹5,000 - ₹20,000", emoji: "💰", gradient: "from-yellow-400 to-yellow-600" },
    { name: "Maruti Suzuki Fronx", value: "Brand New Car", emoji: "🚗", gradient: "from-blue-400 to-blue-600" },
    { name: "1BHK Flat", value: "Ready to Move", emoji: "🏠", gradient: "from-green-400 to-green-600" },
    { name: "Electronics", value: "TVs, Phones & More", emoji: "📱", gradient: "from-purple-400 to-purple-600" }
  ]

  const features = [
    { icon: Calendar, title: "60 Weeks", description: "Complete program duration", count: 60 },
    { icon: Trophy, title: "100% Winners", description: "Guaranteed weekly winners", count: 100 },
    { icon: Users, title: "5000+ Members", description: "Trusted community", count: 5000 },
    { icon: Award, title: "Premium Prizes", description: "High-value rewards", count: 25 }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      </div>

      {/* Header */}
      <header className="relative z-50 bg-black/20 backdrop-blur-lg border-b border-white/10">
        <div className="container mx-auto px-6 py-6 max-w-7xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="bg-gradient-to-r from-red-600 to-red-800 text-white px-6 py-3 rounded-2xl shadow-lg">
                <MulticomLogo />
              </div>
              <div className="hidden md:block">
                <p className="text-white/80 text-sm">The 6th Generation Needs...</p>
                <p className="text-yellow-400 font-bold text-sm">UPPALA Presents</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-3 text-white/80 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2">
                <Phone className="h-5 w-5 text-yellow-400" />
                <span className="font-medium">9746797367</span>
              </div>
              
              <Dialog open={loginOpen} onOpenChange={setLoginOpen}>
                <DialogTrigger>
                  <Button variant="outline" className="border-white/30 text-white hover:bg-white hover:text-gray-900">
                    <User className="h-5 w-5 mr-2" />
                    Login
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Member Login</DialogTitle>
                    <DialogDescription>Access your member dashboard</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="member-id">Member ID</Label>
                      <Input id="member-id" placeholder="Enter your member ID" />
                    </div>
                    <div>
                      <Label htmlFor="password">Password</Label>
                      <Input id="password" type="password" placeholder="Enter password" />
                    </div>
                    <Button className="w-full">
                      <Lock className="h-5 w-5 mr-2" />
                      Login
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-32">
        <div className="container mx-auto px-6 relative z-10 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-10">
              <Badge variant="premium" className="text-lg px-6 py-3">
                <Sparkles className="h-5 w-5 mr-2" />
                Season 16 • 2025-26 • Live Now
              </Badge>
              
              <h1 className="text-6xl lg:text-7xl font-black text-white leading-tight">
                MULTI GIFT
                <span className="bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent"> SCHEME</span>
              </h1>
              
              <p className="text-xl text-white/80 leading-relaxed">
                Join India's most prestigious gift scheme! Win incredible prizes every week including
                <span className="font-bold text-yellow-400"> cash, gold, electronics, vehicles</span> and the ultimate
                <span className="font-bold text-yellow-400"> 1BHK flat!</span>
              </p>

              <div className="flex flex-col sm:flex-row gap-6">
                <Dialog open={joinOpen} onOpenChange={setJoinOpen}>
                  <DialogTrigger>
                    <Button size="xl" className="text-xl px-10 py-6">
                      <Gift className="h-6 w-6 mr-3" />
                      Join Premium Scheme
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-2xl">
                    <DialogHeader>
                      <DialogTitle className="text-3xl">How to Join MULTICom</DialogTitle>
                      <DialogDescription className="text-lg">Simple steps to start winning amazing prizes</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-start space-x-4 p-4 bg-red-50 rounded-xl">
                          <div className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">1</div>
                          <div>
                            <h4 className="font-bold text-gray-900">Visit Our Office</h4>
                            <p className="text-gray-600">Ground Floor, Singapore Complex, Uppala</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-xl">
                          <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">2</div>
                          <div>
                            <h4 className="font-bold text-gray-900">Choose Plan</h4>
                            <p className="text-gray-600">Select membership option</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-4 p-4 bg-green-50 rounded-xl">
                          <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center">
                            <CheckCircle className="h-4 w-4" />
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900">Start Winning!</h4>
                            <p className="text-gray-600">Active in all weekly draws</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
                        <h4 className="font-bold text-purple-800 mb-2">Contact Information</h4>
                        <p className="text-purple-700">📱 9746797367 | 9037497367</p>
                        <p className="text-purple-700">📍 Singapore Complex, Uppala</p>
                        <p className="text-purple-700">🎯 Draw Every Thursday 4:30PM</p>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>

                <DownloadButton className="h-16 px-10 py-5 bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800 shadow-lg text-xl">
                  <svg className="h-6 w-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download Brochure
                </DownloadButton>
              </div>

              <div className="flex flex-wrap items-center gap-8 text-white/80">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-6 w-6 text-yellow-400" />
                  <span>Draw Every Thursday</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <PrizeShowcase />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-black/20 backdrop-blur-lg border-y border-white/10">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid md:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:border-white/40 transition-all duration-300">
                  <feature.icon className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                  <div className="text-4xl font-black text-white mb-2">
                    <AnimatedCounter target={feature.count} />
                    {feature.title.includes("Winners") ? "%" : feature.title.includes("Members") ? "+" : ""}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-white/60">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prize Categories */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16">
            <Badge variant="premium" className="text-lg px-6 py-3 mb-6">
              <Trophy className="h-5 w-5 mr-2" />
              Premium Prize Collection
            </Badge>
            <h2 className="text-5xl font-black text-white mb-6">Amazing Prize Categories</h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">Win from our incredible collection of prizes every week</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {prizes.map((prize, index) => (
              <Card key={index} className="hover:scale-105 transition-all duration-300 border-2 hover:border-yellow-400/50 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border-white/20">
                <CardContent className="text-center">
                  <div className={`h-16 w-16 mx-auto mb-6 rounded-2xl bg-gradient-to-r ${prize.gradient} flex items-center justify-center shadow-lg text-3xl`}>
                    {prize.emoji}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{prize.name}</h3>
                  <p className="text-white/60 font-medium">{prize.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Prize Gallery Section */}
      <section className="py-24 bg-gradient-to-r from-purple-900/50 to-red-900/50 backdrop-blur-lg">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-white mb-6">Complete 60 Week Prize Schedule</h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">Browse our comprehensive prize collection with detailed weekly schedules</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="overflow-hidden bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border-white/20">
              <CardContent>
                <div className="text-center space-y-4">
                  <div className="text-6xl">🏠</div>
                  <h3 className="text-2xl font-bold text-white">Home Appliances</h3>
                  <p className="text-white/70">Gas Geyser, Cooler, Washing Machine, TV, Microwave</p>
                  <Badge variant="premium">Weeks 1-20</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border-white/20">
              <CardContent>
                <div className="text-center space-y-4">
                  <div className="text-6xl">🏍️</div>
                  <h3 className="text-2xl font-bold text-white">Vehicles & Electronics</h3>
                  <p className="text-white/70">Hero HF 100, Smart TVs, Samsung Galaxy, Gold Coins</p>
                  <Badge variant="premium">Weeks 21-40</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border-white/20">
              <CardContent>
                <div className="text-center space-y-4">
                  <div className="text-6xl">🏆</div>
                  <h3 className="text-2xl font-bold text-white">Grand Finale</h3>
                  <p className="text-white/70">1BHK Flat OR Maruti Suzuki Fronx</p>
                  <Badge variant="premium">Weeks 41-60</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Download Section */}
          <div className="text-center">
            <Card className="inline-block bg-gradient-to-r from-green-500/20 to-blue-500/20 backdrop-blur-lg border-green-400/50 p-8">
              <div className="space-y-6">
                <div className="mx-auto w-20">
                  <MulticomLogo size="large" />
                </div>
                
                <h3 className="text-3xl font-black text-white mb-4">Complete Prize Catalog</h3>
                <p className="text-white/80 mb-6">Download the official MULTICom Season 16 brochure</p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <DownloadButton className="bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800 shadow-lg hover:shadow-xl h-14 px-8 py-4 text-lg">
                    <svg className="h-6 w-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download Full Brochure
                  </DownloadButton>
                  
                  <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white hover:text-gray-900 h-14 px-8 py-4 text-lg">
                    <Phone className="h-6 w-6 mr-3" />
                    Call for Details
                  </Button>
                </div>
                
                <div className="bg-yellow-500/20 backdrop-blur-sm rounded-xl p-4 border border-yellow-400/30">
                  <p className="text-yellow-300 font-bold">Complete 60-week schedule with prize images and details</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-white mb-6">Why Choose MULTICom?</h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">Trusted by thousands of satisfied members across India</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border-white/20 hover:border-yellow-400/50 transition-all duration-300">
              <CardContent className="text-center">
                <div className="bg-gradient-to-r from-green-500 to-green-600 h-16 w-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">100% Transparent</h3>
                <p className="text-white/70">All draws conducted live with complete transparency</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border-white/20 hover:border-yellow-400/50 transition-all duration-300">
              <CardContent className="text-center">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-16 w-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Guaranteed Winners</h3>
                <p className="text-white/70">Every week has confirmed winners</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border-white/20 hover:border-yellow-400/50 transition-all duration-300">
              <CardContent className="text-center">
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 h-16 w-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Trusted Community</h3>
                <p className="text-white/70">Join thousands of happy members</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-red-600 via-purple-600 to-red-600 relative">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-6 text-center max-w-7xl relative z-10">
          <Badge variant="premium" className="text-xl px-8 py-4 shadow-2xl mb-8">
            <Sparkles className="h-6 w-6 mr-3" />
            Limited Time • Season 16 Active
          </Badge>
          
          <h2 className="text-6xl font-black text-white mb-6">Ready to Start Winning?</h2>
          <p className="text-2xl text-white/90 mb-12 max-w-4xl mx-auto">Join thousands of elite members in India's most trusted gift scheme</p>

          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
            <Dialog>
              <DialogTrigger>
                <Button size="xl" variant="premium" className="text-2xl px-12 py-6 shadow-2xl">
                  <Gift className="h-8 w-8 mr-4" />
                  Join Now
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="text-2xl">Start Your Journey!</DialogTitle>
                  <DialogDescription className="text-lg">Contact us to begin</DialogDescription>
                </DialogHeader>
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="Enter your name" />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" placeholder="Enter phone" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="Enter email" />
                  </div>
                  <Button className="w-full h-12">
                    <Mail className="h-5 w-5 mr-2" />
                    Request Information
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <div className="flex items-center space-x-4 text-2xl text-white bg-white/10 backdrop-blur-sm rounded-2xl px-8 py-4">
              <Phone className="h-8 w-8 text-yellow-400" />
              <span className="font-bold">9746797367</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/40 backdrop-blur-lg text-white py-16 border-t border-white/10">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <div className="bg-gradient-to-r from-red-600 to-red-800 text-white px-6 py-3 rounded-2xl shadow-lg mb-6 inline-block">
                <MulticomLogo />
              </div>
              <p className="text-white/70 mb-4">The 6th Generation Needs... UPPALA Presents</p>
              <p className="text-white/60">India's most trusted gift scheme with guaranteed weekly winners</p>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-6 text-yellow-400">Contact Info</h3>
              <div className="space-y-4 text-white/80">
                <div className="flex items-center space-x-3">
                  <Phone className="h-6 w-6 text-yellow-400" />
                  <span>9746797367 | 9037497367</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-6 w-6 text-yellow-400" />
                  <span>Singapore Complex, Uppala</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="h-6 w-6 text-yellow-400" />
                  <span>Draw Every Thursday 4:30PM</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-6 text-yellow-400">Important Notes</h3>
              <div className="space-y-3 text-white/70">
                <p>• All draws conducted transparently</p>
                <p>• Images for illustration purposes</p>
                <p>• Terms and conditions apply</p>
                <p>• Premium membership benefits</p>
              </div>
            </div>
          </div>

          <div className="border-t border-white/20 mt-12 pt-8 text-center text-white/60">
            <p>&copy; 2025 MULTICom Gift Scheme. All rights reserved. | Season 16 • 2025-26</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default PremiumLandingPage
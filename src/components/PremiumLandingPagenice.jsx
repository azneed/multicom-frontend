import { useState, useEffect } from "react"

export default function PremiumLandingPage() {
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isJoinInfoOpen, setIsJoinInfoOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [loginStep, setLoginStep] = useState("input")
  const [loginData, setLoginData] = useState({ identifier: "", otp: "" })
  const [isLoading, setIsLoading] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Prize images for carousel
  const prizeImages = [
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-08-02%20at%2010.44.59%20AM-GDIyPZcC2VopVsEdiUMhmVCd4uGNNz.jpeg",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-08-02%20at%2010.45.00%20AM%281%29-ZdkncO8DOS2uS8mzDWOXMzfsHp74Sr.jpeg",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-08-02%20at%2010.45.00%20AM%282%29-v5F3aA4KhTpm0qw9wZyybkcxk7Vmnr.jpeg",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-08-02%20at%2010.45.01%20AM-IwUV58Vvmv1keh9z03Uk8MIoWa7M0x.jpeg"
  ]

  // Auto-slide carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % prizeImages.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  // Mouse tracking for parallax effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Secret Key Combination Logic
  useEffect(() => {
    const secretCode = [16, 65, 78, 69, 69, 83, 65]
    let codeIndex = 0
    let shiftPressed = false

    const handleKeyDown = (event) => {
      if (
        document.activeElement &&
        (document.activeElement.tagName === "INPUT" || document.activeElement.tagName === "TEXTAREA")
      ) {
        return
      }

      if (event.keyCode === 16) {
        shiftPressed = true
        if (event.keyCode === secretCode[codeIndex]) {
          codeIndex++
        }
        return
      }

      if (shiftPressed && event.keyCode === secretCode[codeIndex]) {
        codeIndex++
        if (codeIndex === secretCode.length) {
          // Secret code entered - redirect to admin
          window.location.href = "/admin-login"
          codeIndex = 0
          shiftPressed = false
          event.preventDefault()
        }
      } else {
        codeIndex = shiftPressed ? 1 : 0
      }
    }

    const handleKeyUp = (event) => {
      if (event.keyCode === 16) {
        shiftPressed = false
        codeIndex = 0
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
    }
  }, [])

  const handleLoginInputChange = (field, value) => {
    setLoginData((prev) => ({ ...prev, [field]: value }))
  }

  const sendOTP = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier: loginData.identifier,
        }),
      })

      if (response.ok) {
        setLoginStep("otp")
      } else {
        alert("Failed to send OTP. Please try again.")
      }
    } catch (error) {
      console.error("Error sending OTP:", error)
      alert("Error sending OTP. Please try again.")
    }
    setIsLoading(false)
  }

  const verifyOTP = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier: loginData.identifier,
          otp: loginData.otp,
        }),
      })

      if (response.ok) {
        // Redirect to user dashboard
        window.location.href = "/UserDashboard"
      } else {
        alert("Invalid OTP. Please try again.")
      }
    } catch (error) {
      console.error("Error verifying OTP:", error)
      alert("Error verifying OTP. Please try again.")
    }
    setIsLoading(false)
  }

  const resetLoginModal = () => {
    setLoginStep("input")
    setLoginData({ identifier: "", otp: "" })
  }

  const getInputType = (value) => {
    if (/^\d{10}$/.test(value)) return "Mobile Number"
    if (/^[A-Za-z0-9]+$/.test(value) && value.length > 4) return "Card Number"
    return "Mobile Number or Card Number"
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/30 to-black"></div>
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(147, 51, 234, 0.1) 0%, transparent 50%)`
          }}
        ></div>
        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full opacity-20 animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Header */}
      <header className="relative z-50 bg-black/80 backdrop-blur-xl border-b border-purple-500/20 sticky top-0">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                <img src="/images/multicom-logo.png" alt="MULTICom Logo" className="relative h-16 w-auto md:h-20 rounded-lg" />
              </div>
              <div className="hidden md:block">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  MULTICom
                </h1>
                <p className="text-xs text-gray-400">Season 16 • 2025-26</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {["Prizes", "How It Works", "Gallery", "Contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(" ", "-")}`}
                  className="relative text-gray-300 hover:text-white transition-all duration-300 group"
                >
                  <span className="relative z-10">{item}</span>
                  <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-purple-600 to-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                </a>
              ))}
            </nav>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => {
                  resetLoginModal()
                  setIsLoginOpen(true)
                }}
                className="relative group overflow-hidden bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25 hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative flex items-center space-x-2">
                  <span>🔒</span>
                  <span>Member Login</span>
                </span>
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <div className="w-6 h-6 flex flex-col justify-center space-y-1">
                  <div className={`w-full h-0.5 bg-white transition-all ${isMobileMenuOpen ? "rotate-45 translate-y-1" : ""}`}></div>
                  <div className={`w-full h-0.5 bg-white transition-all ${isMobileMenuOpen ? "opacity-0" : ""}`}></div>
                  <div className={`w-full h-0.5 bg-white transition-all ${isMobileMenuOpen ? "-rotate-45 -translate-y-1" : ""}`}></div>
                </div>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-purple-500/20">
              <nav className="flex flex-col space-y-3 pt-4">
                {["Prizes", "How It Works", "Gallery", "Contact"].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase().replace(" ", "-")}`}
                    className="text-gray-300 hover:text-white transition-colors font-medium px-2 py-1 rounded hover:bg-white/5"
                  >
                    {item}
                  </a>
                ))}
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 py-20 px-4 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-xl border border-purple-500/30 rounded-full px-6 py-3">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span className="text-green-400 font-semibold">LIVE NOW</span>
              <span className="text-purple-300">Season 16 • 2025-26</span>
            </div>

            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-black leading-tight">
                <span className="bg-gradient-to-br from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  MULTI
                </span>
                <br />
                <span className="bg-gradient-to-br from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                  GIFT SCHEME
                </span>
              </h1>
              <div className="h-1 w-32 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full"></div>
            </div>

            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-2xl">
              Join Uppala's most <span className="text-transparent bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text font-semibold">trusted gift scheme</span> for 16 seasons! 
              Win amazing prizes including 
              <span className="text-transparent bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text font-semibold"> 1BHK Flat</span>, 
              <span className="text-transparent bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text font-semibold"> Maruti Suzuki Fronx</span>, 
              and much more!
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setIsJoinInfoOpen(true)}
                className="group relative overflow-hidden bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/25 hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative flex items-center space-x-2">
                  <span className="text-2xl">🚀</span>
                  <span>Join Scheme Now</span>
                </span>
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/20 rounded-2xl transition-all duration-300"></div>
              </button>

              <button className="group relative overflow-hidden border-2 border-purple-500/50 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:border-purple-400 hover:bg-purple-500/10">
                <span className="flex items-center space-x-2">
                  <span className="text-2xl">🏆</span>
                  <span>View Prizes</span>
                </span>
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
              {[
                { value: "60", label: "Weeks", color: "from-purple-400 to-blue-400" },
                { value: "₹500", label: "Weekly", color: "from-yellow-400 to-orange-400" },
                { value: "100+", label: "Prizes", color: "from-green-400 to-blue-400" },
                { value: "16", label: "Seasons", color: "from-pink-400 to-purple-400" }
              ].map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className={`text-3xl md:text-4xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300`}>
                    {stat.value}
                  </div>
                  <div className="text-gray-400 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Image Carousel */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-900/30 to-blue-900/30 backdrop-blur-xl border border-purple-500/30">
              <div className="relative h-96 md:h-[600px]">
                {prizeImages.map((image, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-all duration-1000 ${
                      index === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-110"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`Prize Gallery ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  </div>
                ))}
              </div>
              
              {/* Carousel Indicators */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {prizeImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide 
                        ? "bg-white scale-125" 
                        : "bg-white/50 hover:bg-white/75"
                    }`}
                  ></button>
                ))}
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-2xl animate-bounce">
              🏆
            </div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full flex items-center justify-center text-xl animate-pulse">
              💎
            </div>
          </div>
        </div>
      </section>

      {/* Grand Prizes Section */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                GRAND PRIZES
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              The ultimate rewards await in our 60th week finale
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* 1BHK Flat */}
            <div className="group relative overflow-hidden bg-gradient-to-br from-purple-900/30 to-blue-900/30 backdrop-blur-xl border border-purple-500/30 rounded-3xl p-8 hover:scale-105 transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="text-6xl mb-4">🏠</div>
                <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  1BHK FLAT
                </h3>
                <p className="text-gray-300 text-lg mb-6">Luxury apartment worth lakhs in prime location</p>
                <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-xl border border-purple-500/30 rounded-xl p-4">
                  <div className="text-2xl font-bold text-yellow-400">Week 60 Draw</div>
                  <div className="text-sm text-gray-400">Grand Finale Prize</div>
                </div>
              </div>
            </div>

            {/* Maruti Suzuki Fronx */}
            <div className="group relative overflow-hidden bg-gradient-to-br from-blue-900/30 to-purple-900/30 backdrop-blur-xl border border-blue-500/30 rounded-3xl p-8 hover:scale-105 transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="text-6xl mb-4">🚗</div>
                <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  MARUTI SUZUKI FRONX
                </h3>
                <p className="text-gray-300 text-lg mb-6">Brand new car with all premium features</p>
                <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-xl border border-blue-500/30 rounded-xl p-4">
                  <div className="text-2xl font-bold text-yellow-400">Week 60 Draw</div>
                  <div className="text-sm text-gray-400">Grand Finale Prize</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="relative z-10 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                HOW IT WORKS
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Simple steps to your dream prizes
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: "01", icon: "✅", title: "Register", desc: "Visit our Uppala office with ₹500", color: "from-green-400 to-blue-400" },
              { step: "02", icon: "💰", title: "Pay Weekly", desc: "₹500 every week for 60 weeks", color: "from-blue-400 to-purple-400" },
              { step: "03", icon: "📅", title: "Weekly Draws", desc: "Every Thursday at 4:30 PM", color: "from-purple-400 to-pink-400" },
              { step: "04", icon: "🏆", title: "Win Prizes", desc: "Amazing rewards every week!", color: "from-pink-400 to-yellow-400" }
            ].map((item, index) => (
              <div key={index} className="group relative">
                <div className="relative overflow-hidden bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 hover:border-purple-500/50 transition-all duration-500 hover:scale-105">
                  <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                  
                  <div className="text-center space-y-4">
                    <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-r ${item.color} flex items-center justify-center text-2xl font-bold text-black mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      {item.icon}
                    </div>
                    
                    <div className={`text-sm font-bold px-3 py-1 rounded-full bg-gradient-to-r ${item.color} text-black inline-block`}>
                      STEP {item.step}
                    </div>
                    
                    <h3 className="text-xl font-bold text-white">{item.title}</h3>
                    <p className="text-gray-400">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative overflow-hidden bg-gradient-to-br from-purple-900/30 via-blue-900/30 to-black/30 backdrop-blur-xl border border-purple-500/30 rounded-3xl p-12">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10"></div>
            
            <div className="relative z-10 space-y-8">
              <h2 className="text-4xl md:text-6xl font-black">
                <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                  READY TO WIN?
                </span>
              </h2>
              
              <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                Join thousands of winners in Season 16! With just ₹500 per week, you could be our next 
                <span className="text-yellow-400 font-semibold"> grand prize winner</span>
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-4">
                <button
                  onClick={() => setIsJoinInfoOpen(true)}
                  className="group relative overflow-hidden bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 px-10 py-5 rounded-2xl font-bold text-xl text-black transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/25 hover:scale-105"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative flex items-center space-x-3">
                    <span className="text-2xl">🎯</span>
                    <span>JOIN NOW</span>
                    <span className="text-2xl">→</span>
                  </span>
                </button>

                <a
                  href="tel:9746797367"
                  className="group relative overflow-hidden border-2 border-purple-500/50 px-10 py-5 rounded-2xl font-bold text-xl transition-all duration-300 hover:border-purple-400 hover:bg-purple-500/10 hover:scale-105"
                >
                  <span className="flex items-center space-x-3">
                    <span className="text-2xl">📞</span>
                    <span>CALL: 9746797367</span>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="relative z-10 py-16 px-4 border-t border-purple-500/20">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg blur opacity-75"></div>
                  <img src="/images/multicom-logo.png" alt="MULTICom Logo" className="relative h-16 w-auto rounded-lg" />
                </div>
                <div>
                  <h3 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                    MULTICom
                  </h3>
                  <p className="text-gray-400 text-sm">Season 16</p>
                </div>
              </div>
              <p className="text-gray-400">
                Uppala's most trusted gift scheme for 16 seasons. Join thousands of happy winners!
              </p>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-yellow-400">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#prizes" className="text-gray-400 hover:text-white transition-colors">Prizes</a></li>
                <li><a href="#how-it-works" className="text-gray-400 hover:text-white transition-colors">How It Works</a></li>
                <li><a href="#gallery" className="text-gray-400 hover:text-white transition-colors">Prize Gallery</a></li>
                <li><a href="#contact" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-yellow-400">Scheme Info</h4>
              <ul className="space-y-2">
                <li><span className="text-gray-400">Season 2025-26</span></li>
                <li><span className="text-gray-400">60 Week Scheme</span></li>
                <li><span className="text-gray-400">Draw: Thursday 4:30 PM</span></li>
                <li><span className="text-gray-400">Weekly: ₹500</span></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-yellow-400">Contact Info</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <span className="text-purple-400">📞</span>
                  <a href="tel:9746797367" className="text-gray-400 hover:text-white transition-colors">9746797367</a>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-purple-400">📞</span>
                  <a href="tel:9037497367" className="text-gray-400 hover:text-white transition-colors">9037497367</a>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-purple-400">📞</span>
                  <a href="tel:8891497367" className="text-gray-400 hover:text-white transition-colors">8891497367</a>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-purple-400">📍</span>
                  <span className="text-gray-400">Singapore Complex, Uppala</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-purple-500/20 mt-12 pt-8 text-center">
            <p className="text-gray-400">
              © 2025 MULTICom Gift Scheme, Uppala. All rights reserved. | Season 16 (2025-26)
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Draw every Thursday 4:30 PM at MULTICom | Images shown are for illustrative purposes
            </p>
          </div>
        </div>
      </footer>

      {/* Login Modal */}
      {isLoginOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
          <div className="bg-gradient-to-br from-gray-900 to-black border border-purple-500/30 rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto backdrop-blur-xl">
            <div className="flex justify-between items-center p-6 border-b border-purple-500/20">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">M</span>
                </div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Member Login</h2>
              </div>
              <button
                onClick={() => setIsLoginOpen(false)}
                className="text-gray-400 hover:text-white text-2xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
              >
                ×
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              {loginStep === "input" ? (
                <>
                  <p className="text-gray-300">Enter your mobile number or card number to continue</p>

                  <div className="space-y-4">
                    <label className="block text-sm font-medium text-gray-300">
                      {getInputType(loginData.identifier)}
                    </label>
                    <input
                      type="text"
                      placeholder="Enter mobile number or card number"
                      value={loginData.identifier}
                      onChange={(e) => handleLoginInputChange("identifier", e.target.value)}
                      className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-white placeholder-gray-400"
                    />
                    <p className="text-xs text-gray-500">📱 Mobile: 10 digits | 🎫 Card: Your membership card number</p>
                  </div>

                  <button
                    onClick={sendOTP}
                    disabled={isLoading || !loginData.identifier || loginData.identifier.length < 4}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-700 text-white py-3 rounded-xl font-semibold transition-all flex items-center justify-center space-x-2"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Sending OTP...</span>
                      </>
                    ) : (
                      <>
                        <span>Send OTP</span>
                        <span>📲</span>
                      </>
                    )}
                  </button>
                </>
              ) : (
                <>
                  <p className="text-gray-300">
                    Enter the OTP sent to your registered {getInputType(loginData.identifier).toLowerCase()}
                  </p>

                  <div className="space-y-4">
                    <label className="block text-sm font-medium text-gray-300">Enter OTP</label>
                    <input
                      type="text"
                      placeholder="Enter 6-digit OTP"
                      value={loginData.otp}
                      onChange={(e) => handleLoginInputChange("otp", e.target.value)}
                      className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-white text-center text-2xl tracking-widest placeholder-gray-400"
                      maxLength="6"
                    />
                  </div>

                  <div className="flex space-x-3">
                    <button
                      onClick={() => setLoginStep("input")}
                      className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-xl font-semibold transition-colors"
                    >
                      ← Back
                    </button>
                    <button
                      onClick={verifyOTP}
                      disabled={isLoading || loginData.otp.length !== 6}
                      className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-700 text-white py-3 rounded-xl font-semibold transition-all flex items-center justify-center space-x-2"
                    >
                      {isLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          <span>Verifying...</span>
                        </>
                      ) : (
                        <>
                          <span>Verify & Login</span>
                          <span>✅</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="text-center">
                    <button onClick={sendOTP} className="text-sm text-purple-400 hover:text-purple-300 hover:underline" disabled={isLoading}>
                      Resend OTP
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Join Info Modal */}
      {isJoinInfoOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
          <div className="bg-gradient-to-br from-gray-900 to-black border border-purple-500/30 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto backdrop-blur-xl">
            <div className="flex justify-between items-center p-6 border-b border-purple-500/20">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">M</span>
                </div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Join MULTI Gift Scheme</h2>
              </div>
              <button
                onClick={() => setIsJoinInfoOpen(false)}
                className="text-gray-400 hover:text-white text-2xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
              >
                ×
              </button>
            </div>
            
            <div className="p-6 space-y-8">
              <p className="text-gray-300 text-lg">Follow these simple steps to become a member of our 60-week gift scheme</p>

              <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-6">
                <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">Scheme Details</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex items-center space-x-3">
                    <span className="text-purple-400 text-2xl">📅</span>
                    <div>
                      <div className="font-semibold text-white">Duration</div>
                      <div className="text-gray-400">60 Weeks</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-purple-400 text-2xl">💰</span>
                    <div>
                      <div className="font-semibold text-white">Weekly Contribution</div>
                      <div className="text-gray-400">₹500</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-purple-400 text-2xl">🏆</span>
                    <div>
                      <div className="font-semibold text-white">Weekly Draws</div>
                      <div className="text-gray-400">Every Thursday 4:30 PM</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-purple-400 text-2xl">🎁</span>
                    <div>
                      <div className="font-semibold text-white">Total Prizes</div>
                      <div className="text-gray-400">60+ Amazing Gifts</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-xl font-bold text-white">How to Join:</h3>
                {[
                  { step: 1, title: "Visit Our Office", desc: "Visit us at Ground Floor, Singapore Complex, Uppala" },
                  { step: 2, title: "Registration", desc: "Complete registration with required documents and first payment of ₹500" },
                  { step: 3, title: "Weekly Participation", desc: "Pay ₹500 every week and participate in Thursday draws" },
                  { step: 4, title: "Win Amazing Prizes!", desc: "Get a chance to win weekly prizes and grand prizes like 1BHK Flat & Maruti Suzuki Fronx!" }
                ].map((item) => (
                  <div key={item.step} className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">{item.title}</h4>
                      <p className="text-gray-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-r from-yellow-600/20 to-orange-600/20 backdrop-blur-xl border border-yellow-500/30 rounded-2xl p-6">
                <h4 className="font-bold text-xl mb-4 text-yellow-400">🏆 Grand Prizes (60th Week)</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl">🏠</span>
                    <span className="text-white font-semibold">1BHK Flat</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl">🚗</span>
                    <span className="text-white font-semibold">Maruti Suzuki Fronx</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-gray-800/50 to-black/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6">
                <h4 className="font-semibold mb-4 text-white">📞 Contact Us to Join</h4>
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <a href="tel:9746797367" className="flex items-center space-x-2 text-purple-400 hover:text-purple-300 transition-colors">
                    <span>📞</span>
                    <span>9746797367</span>
                  </a>
                  <a href="tel:9037497367" className="flex items-center space-x-2 text-purple-400 hover:text-purple-300 transition-colors">
                    <span>📞</span>
                    <span>9037497367</span>
                  </a>
                  <a href="tel:8891497367" className="flex items-center space-x-2 text-purple-400 hover:text-purple-300 transition-colors">
                    <span>📞</span>
                    <span>8891497367</span>
                  </a>
                </div>
                <div className="mb-6">
                  <div className="flex items-center space-x-2 text-gray-400">
                    <span>📍</span>
                    <span>Ground Floor, Singapore Complex, Uppala</span>
                  </div>
                </div>
                <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 rounded-xl font-semibold transition-all">
                  Contact Now to Join
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
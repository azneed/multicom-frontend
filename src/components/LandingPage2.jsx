"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function LandingPage2() {
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isJoinInfoOpen, setIsJoinInfoOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [loginStep, setLoginStep] = useState("input") // "input" or "otp"
  const [loginData, setLoginData] = useState({ identifier: "", otp: "" })
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  // Secret Key Combination Logic
  // Shift + A + N + E + E + S + A (key codes: 16, 65, 78, 69, 69, 83, 65)
  useEffect(() => {
    const secretCode = [16, 65, 78, 69, 69, 83, 65] // Shift + ANEESA
    let codeIndex = 0
    let shiftPressed = false

    const handleKeyDown = (event) => {
      // Only process if no input field is focused (to prevent accidental triggers)
      if (
        document.activeElement &&
        (document.activeElement.tagName === "INPUT" || document.activeElement.tagName === "TEXTAREA")
      ) {
        return
      }

      // Track shift key
      if (event.keyCode === 16) {
        shiftPressed = true
        if (event.keyCode === secretCode[codeIndex]) {
          codeIndex++
        }
        return
      }

      // Process the sequence only if shift is pressed
      if (shiftPressed && event.keyCode === secretCode[codeIndex]) {
        codeIndex++
        if (codeIndex === secretCode.length) {
          // Secret code entered successfully
          navigate("/admin-login")
          codeIndex = 0 // Reset for next use
          shiftPressed = false
          event.preventDefault() // Prevent default browser behavior if any
        }
      } else {
        codeIndex = shiftPressed ? 1 : 0 // Reset, but keep shift if it's pressed
      }
    }

    const handleKeyUp = (event) => {
      if (event.keyCode === 16) {
        shiftPressed = false
        codeIndex = 0 // Reset sequence when shift is released
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
    }
  }, [navigate])

  // Handle login input change
  const handleLoginInputChange = (field, value) => {
    setLoginData((prev) => ({ ...prev, [field]: value }))
  }

  // Send OTP using factor.in
  const sendOTP = async () => {
    setIsLoading(true)
    try {
      // Replace with your actual factor.in API endpoint and configuration
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

  // Verify OTP and login
  const verifyOTP = async () => {
    setIsLoading(true)
    try {
      // Replace with your actual factor.in verification endpoint
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
        // Navigate to UserDashboard.jsx
        navigate("/UserDashboard")
      } else {
        alert("Invalid OTP. Please try again.")
      }
    } catch (error) {
      console.error("Error verifying OTP:", error)
      alert("Error verifying OTP. Please try again.")
    }
    setIsLoading(false)
  }

  // Reset login modal
  const resetLoginModal = () => {
    setLoginStep("input")
    setLoginData({ identifier: "", otp: "" })
  }

  // Detect if input is mobile number or card number
  const getInputType = (value) => {
    if (/^\d{10}$/.test(value)) return "Mobile Number"
    if (/^[A-Za-z0-9]+$/.test(value) && value.length > 4) return "Card Number"
    return "Mobile Number or Card Number"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-yellow-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img src="/images/multicom-logo.png" alt="MULTICom Logo" className="h-16 w-auto md:h-20" />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#prizes" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                Prizes
              </a>
              <a href="#how-it-works" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                How It Works
              </a>
              <a href="#gallery" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                Prize Gallery
              </a>
              <a href="#contact" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                Contact
              </a>
            </nav>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => {
                  resetLoginModal()
                  setIsLoginOpen(true)
                }}
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white bg-transparent px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2"
              >
                <span>🔒</span>
                <span>Sign In as Member</span>
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100"
              >
                <div className="w-6 h-6 flex flex-col justify-center space-y-1">
                  <div
                    className={`w-full h-0.5 bg-gray-600 transition-all ${isMobileMenuOpen ? "rotate-45 translate-y-1" : ""}`}
                  ></div>
                  <div
                    className={`w-full h-0.5 bg-gray-600 transition-all ${isMobileMenuOpen ? "opacity-0" : ""}`}
                  ></div>
                  <div
                    className={`w-full h-0.5 bg-gray-600 transition-all ${isMobileMenuOpen ? "-rotate-45 -translate-y-1" : ""}`}
                  ></div>
                </div>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
              <nav className="flex flex-col space-y-3 pt-4">
                <a href="#prizes" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                  Prizes
                </a>
                <a href="#how-it-works" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                  How It Works
                </a>
                <a href="#gallery" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                  Prize Gallery
                </a>
                <a href="#contact" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                  Contact
                </a>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-yellow-400/10"></div>
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-block mb-4 bg-blue-100 text-blue-800 hover:bg-blue-200 text-lg px-6 py-3 rounded-full font-semibold transition-colors">
            🎉 Season 2025-26 | 60 Week Grand Scheme
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-yellow-500 bg-clip-text text-transparent">
              MULTI GIFT SCHEME
            </span>
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-gray-700 mb-8 max-w-4xl mx-auto leading-relaxed">
            Join Uppala's most trusted gift scheme! Win amazing prizes every week including 1BHK Flat, Maruti Suzuki
            Fronx, Hero HF 100, Smart TVs, Gold, Cash prizes up to ₹20,000 and much more!
          </p>

          {/* Main Scheme Image */}
          <div className="mb-8 max-w-4xl mx-auto">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-08-02%20at%2010.44.59%20AM-GDIyPZcC2VopVsEdiUMhmVCd4uGNNz.jpeg"
              alt="MULTI Gift Scheme 2025-26"
              className="rounded-xl shadow-2xl w-full h-auto transform hover:scale-105 transition-transform duration-500"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => setIsJoinInfoOpen(true)}
              className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black px-10 py-4 text-xl md:text-2xl font-bold rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center space-x-2 animate-pulse"
            >
              <span>🔥</span>
              <span>Interested to Join Scheme?</span>
            </button>
            <button className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg bg-transparent rounded-lg font-semibold transition-all duration-300">
              View Prize Gallery
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="transform hover:scale-105 transition-transform duration-300">
              <div className="text-4xl font-bold text-blue-600 mb-2">60</div>
              <div className="text-gray-600 font-medium">Weeks of Prizes</div>
            </div>
            <div className="transform hover:scale-105 transition-transform duration-300">
              <div className="text-4xl font-bold text-yellow-500 mb-2">₹500</div>
              <div className="text-gray-600 font-medium">Weekly Investment</div>
            </div>
            <div className="transform hover:scale-105 transition-transform duration-300">
              <div className="text-4xl font-bold text-purple-600 mb-2">100+</div>
              <div className="text-gray-600 font-medium">Amazing Prizes</div>
            </div>
            <div className="transform hover:scale-105 transition-transform duration-300">
              <div className="text-4xl font-bold text-blue-600 mb-2">2025</div>
              <div className="text-gray-600 font-medium">Season 16</div>
            </div>
          </div>
        </div>
      </section>

      {/* Prize Gallery Section */}
      <section id="gallery" className="py-20 bg-gradient-to-br from-blue-50 to-yellow-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-yellow-500 bg-clip-text text-transparent">
              Amazing Prize Gallery
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore our incredible collection of prizes you can win every week!
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-08-02%20at%2010.45.00%20AM%281%29-ZdkncO8DOS2uS8mzDWOXMzfsHp74Sr.jpeg"
                alt="Weekly Prizes 25-40"
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="font-bold text-lg mb-2 text-blue-600">Weeks 25-40 Prizes</h3>
                <p className="text-gray-600">Smart TVs, Smartphones, Cycles, Home Appliances & More</p>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-08-02%20at%2010.45.00%20AM%282%29-v5F3aA4KhTpm0qw9wZyybkcxk7Vmnr.jpeg"
                alt="Weekly Prizes 41-56"
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="font-bold text-lg mb-2 text-blue-600">Weeks 41-56 Prizes</h3>
                <p className="text-gray-600">Gold, Cash Prizes, Furniture, Electronics & Premium Items</p>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-08-02%20at%2010.45.00%20AM-gck7eT5B165daF7iZRUbxIOJwjsJqY.jpeg"
                alt="Weekly Prizes 1-24"
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="font-bold text-lg mb-2 text-blue-600">Weeks 1-24 Prizes</h3>
                <p className="text-gray-600">TVs, Motorcycles, Appliances, Gold & Cash Rewards</p>
              </div>
            </div>
          </div>

          {/* Grand Prize Section */}
          <div className="bg-gradient-to-r from-blue-600 to-yellow-500 rounded-2xl p-8 text-white text-center">
            <h3 className="text-3xl font-bold mb-6">🏆 Grand Prize - 60th Week Draw</h3>
            <div className="max-w-4xl mx-auto mb-8">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-08-02%20at%2010.45.01%20AM-IwUV58Vvmv1keh9z03Uk8MIoWa7M0x.jpeg"
                alt="Grand Prizes - 1BHK Flat and Maruti Suzuki Fronx"
                className="rounded-lg shadow-2xl w-full h-auto"
              />
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 transform hover:scale-105 transition-transform duration-300">
                <div className="text-6xl mb-4">🏠</div>
                <h4 className="text-2xl font-bold mb-2">1BHK Flat</h4>
                <p className="text-white/90">Luxury apartment worth lakhs!</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 transform hover:scale-105 transition-transform duration-300">
                <div className="text-6xl mb-4">🚗</div>
                <h4 className="text-2xl font-bold mb-2">Maruti Suzuki Fronx</h4>
                <p className="text-white/90">Brand new car with all features!</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="prizes" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-yellow-500 bg-clip-text text-transparent">
              Why Choose MULTI Gift Scheme?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Trusted by thousands in Uppala and surrounding areas for 16 seasons!
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="bg-blue-100 w-16 h-16 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🏆</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-blue-600">Weekly Guaranteed Draws</h3>
              <p className="text-gray-600">
                Every Thursday at 4:30 PM - transparent and fair draws with amazing prizes
              </p>
            </div>
            <div className="bg-gradient-to-br from-yellow-50 to-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="bg-yellow-100 w-16 h-16 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-yellow-600">Affordable Investment</h3>
              <p className="text-gray-600">
                Just ₹500 per week for a chance to win prizes worth lakhs including cars and flats
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="bg-purple-100 w-16 h-16 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🛡️</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-purple-600">Trusted & Established</h3>
              <p className="text-gray-600">16 seasons of successful operations with thousands of satisfied winners</p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="bg-blue-100 w-16 h-16 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🎁</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-blue-600">Premium Quality Prizes</h3>
              <p className="text-gray-600">All prizes are brand new and of highest quality from authorized dealers</p>
            </div>
            <div className="bg-gradient-to-br from-yellow-50 to-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="bg-yellow-100 w-16 h-16 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">👥</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-yellow-600">Community Based</h3>
              <p className="text-gray-600">
                Local Uppala business supporting the community with transparent operations
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="bg-purple-100 w-16 h-16 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">⭐</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-purple-600">Multiple Prize Categories</h3>
              <p className="text-gray-600">From home appliances to vehicles, gold, cash and even real estate prizes</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-gradient-to-br from-blue-50 to-yellow-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-yellow-500 bg-clip-text text-transparent">
              How Our 60-Week Scheme Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Simple, transparent, and rewarding - here's your path to amazing prizes
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center transform hover:scale-105 transition-transform duration-300">
              <div className="bg-gradient-to-r from-blue-600 to-yellow-500 text-white w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg">
                ✅
              </div>
              <div className="bg-gradient-to-r from-blue-600 to-yellow-500 text-white px-4 py-2 rounded-full text-sm font-bold mb-4 inline-block">
                01
              </div>
              <h3 className="text-xl font-semibold mb-2 text-blue-600">Register</h3>
              <p className="text-gray-600">Visit our Uppala office and complete registration with ₹500</p>
            </div>
            <div className="text-center transform hover:scale-105 transition-transform duration-300">
              <div className="bg-gradient-to-r from-blue-600 to-yellow-500 text-white w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg">
                💰
              </div>
              <div className="bg-gradient-to-r from-blue-600 to-yellow-500 text-white px-4 py-2 rounded-full text-sm font-bold mb-4 inline-block">
                02
              </div>
              <h3 className="text-xl font-semibold mb-2 text-blue-600">Weekly Payment</h3>
              <p className="text-gray-600">Pay ₹500 every week for 60 weeks</p>
            </div>
            <div className="text-center transform hover:scale-105 transition-transform duration-300">
              <div className="bg-gradient-to-r from-blue-600 to-yellow-500 text-white w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg">
                📅
              </div>
              <div className="bg-gradient-to-r from-blue-600 to-yellow-500 text-white px-4 py-2 rounded-full text-sm font-bold mb-4 inline-block">
                03
              </div>
              <h3 className="text-xl font-semibold mb-2 text-blue-600">Thursday Draws</h3>
              <p className="text-gray-600">Participate in weekly draws every Thursday 4:30 PM</p>
            </div>
            <div className="text-center transform hover:scale-105 transition-transform duration-300">
              <div className="bg-gradient-to-r from-blue-600 to-yellow-500 text-white w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg">
                🏆
              </div>
              <div className="bg-gradient-to-r from-blue-600 to-yellow-500 text-white px-4 py-2 rounded-full text-sm font-bold mb-4 inline-block">
                04
              </div>
              <h3 className="text-xl font-semibold mb-2 text-blue-600">Win Prizes</h3>
              <p className="text-gray-600">Win amazing prizes including the grand 1BHK flat & car!</p>
            </div>
          </div>
        </div>
      </section>

      {/* Home Appliances Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-yellow-500 bg-clip-text text-transparent">
              Home Appliances & More
            </h2>
          </div>
          <div className="text-center">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-08-02%20at%2010.45.01%20AM%281%29-AqRIdww7mQe0zlhvL7SKL2mwbmkj17.jpeg"
              alt="Home Appliances and Prize Details"
              className="rounded-xl shadow-xl w-full max-w-4xl mx-auto h-auto transform hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-yellow-500 text-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Win Amazing Prizes?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
            Join MULTI Gift Scheme today! With just ₹500 per week, you could win a 1BHK flat, Maruti Suzuki Fronx, or
            hundreds of other amazing prizes. Season 2025-26 is now open!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => setIsJoinInfoOpen(true)}
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold shadow-lg rounded-lg transform hover:scale-105 transition-all duration-300 flex items-center space-x-2"
            >
              <span>Join Our Scheme Now</span>
              <span>→</span>
            </button>
            <a
              href="tel:9746797367"
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg bg-transparent rounded-lg font-semibold transition-all duration-300"
            >
              Call Now: 9746797367
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <img src="/images/multicom-logo.png" alt="MULTICom Logo" className="h-16 w-auto" />
              </div>
              <p className="text-gray-400 mb-4">
                Uppala's most trusted gift scheme for 16 seasons. Join thousands of happy winners!
              </p>
              <div className="flex space-x-4">
                <span className="text-2xl cursor-pointer hover:scale-110 transition-transform">📘</span>
                <span className="text-2xl cursor-pointer hover:scale-110 transition-transform">🐦</span>
                <span className="text-2xl cursor-pointer hover:scale-110 transition-transform">📷</span>
                <span className="text-2xl cursor-pointer hover:scale-110 transition-transform">💼</span>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-yellow-400">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About MULTICom
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    How It Works
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Prize Gallery
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Previous Winners
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-yellow-400">Scheme Info</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Season 2025-26
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms & Conditions
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Draw Schedule
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-yellow-400">Contact Info</h3>
              <div className="space-y-3 text-gray-400">
                <div className="flex items-center space-x-2">
                  <span>📞</span>
                  <a href="tel:9746797367" className="hover:text-white transition-colors">
                    9746797367
                  </a>
                </div>
                <div className="flex items-center space-x-2">
                  <span>📞</span>
                  <a href="tel:9037497367" className="hover:text-white transition-colors">
                    9037497367
                  </a>
                </div>
                <div className="flex items-center space-x-2">
                  <span>📞</span>
                  <a href="tel:8891497367" className="hover:text-white transition-colors">
                    8891497367 (Shop)
                  </a>
                </div>
                <div className="flex items-center space-x-2">
                  <span>📍</span>
                  <span>Ground Floor, Singapore Complex, Uppala</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>🌐</span>
                  <span>www.multicomgiftscheme.in</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>
              &copy; {new Date().getFullYear()} MULTICom Gift Scheme, Uppala. All rights reserved. | Season 16 (2025-26)
            </p>
            <p className="text-sm mt-2">
              Draw every Thursday 4:30 PM at MULTICom | Images shown are for illustrative purposes
            </p>
          </div>
        </div>
      </footer>

      {/* Enhanced Login Modal with Unified Input */}
      {isLoginOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-4">
          <div
            className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <img src="/images/multicom-logo.png" alt="MULTICom Logo" className="h-10 w-auto" />
                <h2 className="text-2xl font-bold text-blue-600">Member Login</h2>
              </div>
              <button
                onClick={() => setIsLoginOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-3xl font-light w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
              >
                ×
              </button>
            </div>
            <div className="p-6 space-y-4">
              {loginStep === "input" ? (
                <>
                  <p className="text-gray-600 mb-4">Enter your mobile number or card number to continue</p>

                  {/* Unified Input Field */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      {getInputType(loginData.identifier)}
                    </label>
                    <input
                      type="text"
                      placeholder="Enter mobile number or card number"
                      value={loginData.identifier}
                      onChange={(e) => handleLoginInputChange("identifier", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-lg"
                    />
                    <p className="text-xs text-gray-500">📱 Mobile: 10 digits | 🎫 Card: Your membership card number</p>
                  </div>

                  <button
                    onClick={sendOTP}
                    disabled={isLoading || !loginData.identifier || loginData.identifier.length < 4}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
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
                  <p className="text-gray-600 mb-4">
                    Enter the OTP sent to your registered {getInputType(loginData.identifier).toLowerCase()}
                  </p>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Enter OTP</label>
                    <input
                      type="text"
                      placeholder="Enter 6-digit OTP"
                      value={loginData.otp}
                      onChange={(e) => handleLoginInputChange("otp", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-center text-2xl tracking-widest"
                      maxLength="6"
                    />
                  </div>

                  <div className="flex space-x-3">
                    <button
                      onClick={() => setLoginStep("input")}
                      className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold transition-colors"
                    >
                      ← Back
                    </button>
                    <button
                      onClick={verifyOTP}
                      disabled={isLoading || loginData.otp.length !== 6}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
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
                    <button onClick={sendOTP} className="text-sm text-blue-600 hover:underline" disabled={isLoading}>
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
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-4">
          <div
            className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <img src="/images/multicom-logo.png" alt="MULTICom Logo" className="h-10 w-auto" />
                <h2 className="text-2xl font-bold text-blue-600">How to Join MULTI Gift Scheme</h2>
              </div>
              <button
                onClick={() => setIsJoinInfoOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-3xl font-light w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
              >
                ×
              </button>
            </div>
            <div className="p-6 space-y-6">
              <p className="text-gray-600">Follow these simple steps to become a member of our 60-week gift scheme</p>

              <div className="bg-gradient-to-r from-blue-50 to-yellow-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-blue-600 mb-4">Scheme Details</h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <span className="text-blue-600">📅</span>
                    <span>
                      <strong>Duration:</strong> 60 Weeks
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-blue-600">💰</span>
                    <span>
                      <strong>Weekly Contribution:</strong> ₹500
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-blue-600">🏆</span>
                    <span>
                      <strong>Weekly Draws:</strong> Every Thursday
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-blue-600">🎁</span>
                    <span>
                      <strong>Total Prizes:</strong> 60+ Amazing Gifts
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid gap-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-100 rounded-full p-2 flex-shrink-0">
                    <span className="text-blue-600">✅</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-600">Step 1: Visit Our Office</h3>
                    <p className="text-gray-600">Visit us at Ground Floor, Singapore Complex, Uppala</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-100 rounded-full p-2 flex-shrink-0">
                    <span className="text-blue-600">✅</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-600">Step 2: Registration</h3>
                    <p className="text-gray-600">
                      Complete registration with required documents and first payment of ₹500
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-100 rounded-full p-2 flex-shrink-0">
                    <span className="text-blue-600">✅</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-600">Step 3: Weekly Participation</h3>
                    <p className="text-gray-600">Pay ₹500 every week and participate in Thursday draws</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-100 rounded-full p-2 flex-shrink-0">
                    <span className="text-blue-600">✅</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-600">Step 4: Win Amazing Prizes!</h3>
                    <p className="text-gray-600">
                      Get a chance to win weekly prizes and grand prizes like 1BHK Flat & Maruti Suzuki Fronx!
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-600 to-yellow-500 text-white p-6 rounded-lg">
                <h4 className="font-bold text-lg mb-3">🏆 Grand Prizes (60th Week)</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">🏠</span>
                    <span>1BHK Flat</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">🚗</span>
                    <span>Maruti Suzuki Fronx</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-3">📞 Contact Us to Join</h4>
                <div className="grid md:grid-cols-3 gap-4 text-sm mb-4">
                  <div className="flex items-center space-x-2">
                    <span>📞</span>
                    <a href="tel:9746797367" className="text-blue-600 hover:underline">
                      9746797367
                    </a>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span>📞</span>
                    <a href="tel:9037497367" className="text-blue-600 hover:underline">
                      9037497367
                    </a>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span>📞</span>
                    <a href="tel:8891497367" className="text-blue-600 hover:underline">
                      8891497367
                    </a>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="flex items-center space-x-2">
                    <span>📍</span>
                    <span>Ground Floor, Singapore Complex, Uppala</span>
                  </div>
                </div>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors">
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

import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronDown, Play, Gift, Smartphone, Car, Home, 
  Coins, Users, Calendar, MapPin, Phone, Globe, 
  Clock, Star, Sparkles, Zap, Trophy, Diamond, 
  Crown, Target, ArrowRight, Menu, X, Award,
  Check, Shield, Smile, Heart, TrendingUp, 
  RotateCw, CreditCard, HelpCircle,Eye, EyeOff
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MULTIComLanding = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [currentPrize, setCurrentPrize] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeFAQ, setActiveFAQ] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const statsRef = useRef(null);
  const [hasAnimatedStats, setHasAnimatedStats] = useState(false);

  // Featured prizes data
  const featuredPrizes = [
    { 
      name: "1BHK Flat", 
      icon: Home, 
      value: "Dream Home", 
      gradient: "from-purple-600 to-blue-600",
      description: "Fully furnished apartment in prime location"
    },
    { 
      name: "Maruti Suzuki Fronx", 
      icon: Car, 
      value: "Luxury Car", 
      gradient: "from-red-600 to-orange-600",
      description: "Top model with all premium features"
    },
    { 
      name: "Gold Coins", 
      icon: Coins, 
      value: "Pure Gold", 
      gradient: "from-yellow-600 to-amber-600",
      description: "24K pure gold coins with certification"
    },
    { 
      name: "Smart TV 65\"", 
      icon: Smartphone, 
      value: "Latest Tech", 
      gradient: "from-green-600 to-teal-600",
      description: "4K OLED with all smart features"
    }
  ];

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prize carousel effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPrize((prev) => (prev + 1) % featuredPrizes.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [featuredPrizes.length]);

  // Stats animation trigger
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimatedStats) {
          setHasAnimatedStats(true);
        }
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimatedStats]);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Animated counter component
  const AnimatedCounter = ({ end, suffix = "", prefix = "" }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!hasAnimatedStats) return;
      
      let start = 0;
      const duration = 2000;
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }, [hasAnimatedStats, end]);

    return <span>{prefix}{count}{suffix}</span>;
  };

  // Modal component
  const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <div 
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        />
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: 'spring', damping: 25 }}
          className="relative bg-gradient-to-br from-purple-900 via-red-900 to-black rounded-3xl p-8 max-w-md w-full border border-yellow-500/30 shadow-2xl"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-yellow-400 hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
          <h2 className="text-2xl font-bold text-yellow-400 mb-6">{title}</h2>
          {children}
        </motion.div>
      </motion.div>
    );
  };

  // Join form component
  const JoinForm = () => (
    <form 
      className="space-y-4" 
      onSubmit={(e) => { 
        e.preventDefault(); 
        alert('Application submitted! We will contact you soon.'); 
        setActiveModal(null); 
      }}
    >
      <div>
        <label className="block text-yellow-400 mb-2">Full Name</label>
        <input
          type="text"
          className="w-full p-3 rounded-xl bg-black/50 border border-yellow-500/30 text-white placeholder-gray-400 focus:border-yellow-500 focus:outline-none transition-colors"
          placeholder="Enter your full name"
          required
        />
      </div>
      <div>
        <label className="block text-yellow-400 mb-2">Phone Number</label>
        <input
          type="tel"
          className="w-full p-3 rounded-xl bg-black/50 border border-yellow-500/30 text-white placeholder-gray-400 focus:border-yellow-500 focus:outline-none transition-colors"
          placeholder="Enter your phone number"
          required
        />
      </div>
      <div>
        <label className="block text-yellow-400 mb-2">Email Address</label>
        <input
          type="email"
          className="w-full p-3 rounded-xl bg-black/50 border border-yellow-500/30 text-white placeholder-gray-400 focus:border-yellow-500 focus:outline-none transition-colors"
          placeholder="Enter your email address"
        />
      </div>
      <div>
        <label className="block text-yellow-400 mb-2">Location</label>
        <input
          type="text"
          className="w-full p-3 rounded-xl bg-black/50 border border-yellow-500/30 text-white placeholder-gray-400 focus:border-yellow-500 focus:outline-none transition-colors"
          placeholder="Enter your location"
        />
      </div>
      <motion.button
        type="submit"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full bg-gradient-to-r from-yellow-600 to-amber-600 text-black font-bold py-3 rounded-xl transition-all duration-300"
      >
        Submit Application
      </motion.button>
    </form>
  );

  // Login form component
  const LoginForm = () => (
    <form 
      className="space-y-4" 
      onSubmit={(e) => { 
        e.preventDefault(); 
        alert('Login successful!'); 
        setActiveModal(null); 
      }}
    >
      <div>
        <label className="block text-yellow-400 mb-2">Member ID</label>
        <input
          type="text"
          className="w-full p-3 rounded-xl bg-black/50 border border-yellow-500/30 text-white placeholder-gray-400 focus:border-yellow-500 focus:outline-none transition-colors"
          placeholder="Enter your member ID"
          required
        />
      </div>
      <div className="relative">
        <label className="block text-yellow-400 mb-2">Password</label>
        <input
          type={showPassword ? "text" : "password"}
          className="w-full p-3 pr-12 rounded-xl bg-black/50 border border-yellow-500/30 text-white placeholder-gray-400 focus:border-yellow-500 focus:outline-none transition-colors"
          placeholder="Enter your password"
          required
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-9 text-gray-400 hover:text-yellow-400 transition-colors"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
        </button>
      </div>
      <motion.button
        type="submit"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full bg-gradient-to-r from-yellow-600 to-amber-600 text-black font-bold py-3 rounded-xl transition-all duration-300"
      >
        Login
      </motion.button>
      <button
        type="button"
        className="w-full text-center text-yellow-400 hover:text-white cursor-pointer transition-colors"
        onClick={() => alert('Password reset link sent!')}
      >
        Forgot Password?
      </button>
    </form>
  );

  // Loading screen
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center">
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            rotate: { 
              duration: 2, 
              repeat: Infinity, 
              ease: "linear" 
            },
            scale: {
              duration: 1,
              repeat: Infinity,
              repeatType: "reverse"
            }
          }}
          className="mb-6"
        >
          <Crown className="w-16 h-16 text-yellow-400" />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-3xl font-bold text-center"
        >
          <span className="text-white">MULTI</span>
          <span className="text-yellow-400">Com</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-gray-400 mt-2"
        >
          Loading Premium Experience...
        </motion.p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/80 via-red-900/80 to-black/90" />
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-yellow-400 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0
            }}
            animate={{
              x: [null, Math.random() * window.innerWidth],
              y: [null, Math.random() * window.innerHeight],
              opacity: [0, 0.8, 0],
              transition: {
                duration: 5 + Math.random() * 10,
                repeat: Infinity,
                repeatType: "reverse",
                delay: Math.random() * 5
              }
            }}
          />
        ))}
      </div>

      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className={`fixed top-0 w-full z-40 transition-all duration-500 ${isScrolled ? 'bg-black/90 backdrop-blur-xl border-b border-yellow-500/20' : 'bg-transparent'}`}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-3 cursor-pointer"
            >
              <div className="relative">
                <Crown className="w-10 h-10 text-yellow-400" />
                <div className="absolute -inset-1 bg-yellow-400 rounded-full blur opacity-20 animate-pulse" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">
                  <span className="text-white">MULTI</span>
                  <span className="text-yellow-400">Com</span>
                </h1>
                <p className="text-xs text-yellow-300 italic">The 6th Generation Needs...</p>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveModal('login')}
                className="px-6 py-2 border border-yellow-500 text-yellow-400 rounded-full hover:bg-yellow-500 hover:text-black transition-all duration-300 font-semibold"
              >
                Member Login
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveModal('join')}
                className="px-6 py-2 bg-gradient-to-r from-yellow-600 to-amber-600 text-black rounded-full hover:from-yellow-500 hover:to-amber-500 transition-all duration-300 font-semibold"
              >
                Join Our Scheme
              </motion.button>
            </nav>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden text-yellow-400 p-2"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="lg:hidden overflow-hidden"
              >
                <div className="flex flex-col space-y-3 mt-4 pb-4 border-t border-yellow-500/20 pt-4">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => { setActiveModal('login'); setIsMenuOpen(false); }}
                    className="px-6 py-2 border border-yellow-500 text-yellow-400 rounded-full hover:bg-yellow-500 hover:text-black transition-all duration-300 font-semibold"
                  >
                    Member Login
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => { setActiveModal('join'); setIsMenuOpen(false); }}
                    className="px-6 py-2 bg-gradient-to-r from-yellow-600 to-amber-600 text-black rounded-full hover:from-yellow-500 hover:to-amber-500 transition-all duration-300 font-semibold"
                  >
                    Join Our Scheme
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 pb-16">
        <div className="container mx-auto px-6 z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-6">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="inline-flex items-center space-x-2 bg-yellow-500/20 backdrop-blur-sm border border-yellow-500/30 rounded-full px-4 py-2"
                >
                  <Sparkles className="w-4 h-4 text-yellow-400" />
                  <span className="text-yellow-400 text-sm font-semibold">Season 16 (2025-26)</span>
                </motion.div>
                
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-5xl lg:text-7xl font-black leading-tight"
                >
                  <span className="bg-gradient-to-r from-white via-yellow-200 to-yellow-400 bg-clip-text text-transparent">
                    Welcome to
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-600 bg-clip-text text-transparent">
                    MULTICom
                  </span>
                  <br />
                  <span className="text-white text-4xl lg:text-5xl">Gift Scheme</span>
                </motion.h1>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-xl text-gray-300 max-w-2xl leading-relaxed"
                >
                  Experience the ultimate gift scheme with <span className="text-yellow-400 font-semibold">exciting prizes every week</span>! From luxury homes to premium cars, gold to cash - your dreams can become reality.
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveModal('join')}
                  className="group relative px-8 py-4 bg-gradient-to-r from-yellow-600 to-amber-600 text-black font-bold rounded-2xl overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center space-x-2">
                    <span>Join Now</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group px-8 py-4 border-2 border-yellow-500 text-yellow-400 font-bold rounded-2xl hover:bg-yellow-500 hover:text-black transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <Play className="w-5 h-5" />
                  <span>Watch Demo</span>
                </motion.button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="grid grid-cols-3 gap-6 pt-8"
              >
                {[
                  { value: "60+", label: "Weekly Draws" },
                  { value: "₹50L+", label: "Prizes Given" },
                  { value: "1000+", label: "Happy Winners" }
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-bold text-yellow-400">{stat.value}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Prize Showcase */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative w-full max-w-md mx-auto">
                {/* Main Prize Display */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentPrize}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5 }}
                    className="relative bg-gradient-to-br from-yellow-500/20 to-red-500/20 backdrop-blur-xl border border-yellow-500/30 rounded-3xl p-8"
                  >
                    <div className="absolute -inset-1 bg-gradient-to-r from-yellow-600 to-red-600 rounded-3xl blur opacity-20 animate-pulse" />
                    <div className="relative text-center space-y-6">
                      <div className={`w-20 h-20 mx-auto rounded-full bg-gradient-to-r ${featuredPrizes[currentPrize].gradient} flex items-center justify-center`}>
                        {React.createElement(featuredPrizes[currentPrize].icon, { size: 40, className: "text-white" })}
                      </div>
                      <h3 className="text-2xl font-bold text-yellow-400">{featuredPrizes[currentPrize].name}</h3>
                      <p className="text-gray-300">{featuredPrizes[currentPrize].description}</p>
                      <div className="inline-flex items-center space-x-1 text-yellow-400">
                        <Award className="w-4 h-4" />
                        <span className="text-sm font-medium">{featuredPrizes[currentPrize].value}</span>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Floating Mini Cards */}
                {featuredPrizes.map((prize, index) => (
                  index !== currentPrize && (
                    <motion.div
                      key={index}
                      initial={{ 
                        x: index % 2 === 0 ? -20 : 20,
                        y: 20 + index * 25,
                        opacity: 0 
                      }}
                      animate={{ 
                        x: index % 2 === 0 ? -10 : 10,
                        y: 20 + index * 25,
                        opacity: 0.8,
                        transition: {
                          duration: 0.5,
                          delay: index * 0.1 + 0.5
                        }
                      }}
                      whileHover={{ 
                        opacity: 1,
                        scale: 1.1,
                        transition: { duration: 0.2 }
                      }}
                      className={`absolute w-16 h-16 bg-gradient-to-r ${prize.gradient} rounded-2xl flex items-center justify-center cursor-pointer`}
                      style={{
                        left: index % 2 === 0 ? '0%' : '100%',
                        transform: `translateX(${index % 2 === 0 ? '-50%' : '-50%'}) translateY(${Math.sin(Date.now() * 0.001 + index) * 10}px)`
                      }}
                      onClick={() => setCurrentPrize(index)}
                    >
                      {React.createElement(prize.icon, { size: 24, className: "text-white" })}
                    </motion.div>
                  )
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ 
            y: [0, 10, 0],
            transition: { 
              duration: 1.5, 
              repeat: Infinity 
            } 
          }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <ChevronDown className="w-6 h-6 text-yellow-400" />
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              Why Choose <span className="text-yellow-400">MULTICom</span>?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Experience the most trusted and exciting gift scheme in Kerala with premium prizes and transparent processes.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Target, title: "Weekly Draws", desc: "Every Thursday at 4:30 PM", color: "from-blue-500 to-purple-500" },
              { icon: Trophy, title: "Premium Prizes", desc: "Cars, homes, gold & more", color: "from-yellow-500 to-orange-500" },
              { icon: Diamond, title: "16 Seasons Strong", desc: "Trusted since years", color: "from-pink-500 to-red-500" },
              { icon: Shield, title: "100% Transparent", desc: "Verified & secure", color: "from-green-500 to-teal-500" }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 hover:border-yellow-500/50 transition-all duration-500 hover:-translate-y-2"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-yellow-400 mb-2">{feature.title}</h3>
                <p className="text-gray-300">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Prizes Grid */}
      <section className="py-20 bg-gradient-to-b from-transparent to-black/50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              Season 16 <span className="text-yellow-400">Prize Collection</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Explore our premium selection of prizes you could win every week
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { name: "1BHK Flat", badge: "Grand Prize", icon: Home, color: "from-purple-500 to-indigo-500" },
              { name: "Maruti Fronx", badge: "Car Prize", icon: Car, color: "from-red-500 to-orange-500" },
              { name: "Gold Coins", badge: "Gold", icon: Coins, color: "from-yellow-500 to-amber-500" },
              { name: "Smart TV", badge: "Electronics", icon: Smartphone, color: "from-blue-500 to-cyan-500" },
              { name: "Cash ₹20K", badge: "Cash", icon: CreditCard, color: "from-green-500 to-teal-500" },
              { name: "Hero HF 100", badge: "Bike", icon: Zap, color: "from-pink-500 to-rose-500" }
            ].map((prize, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-gradient-to-br from-yellow-500/10 to-red-500/10 backdrop-blur-xl border border-yellow-500/20 rounded-2xl p-4 hover:border-yellow-500/60 transition-all duration-300 hover:scale-105"
              >
                <div className="absolute top-2 left-2">
                  <span className="bg-red-600 text-white text-xs px-2 py-1 rounded-full font-semibold">
                    {prize.badge}
                  </span>
                </div>
                <div className="pt-8 text-center space-y-3">
                  <div className={`w-12 h-12 mx-auto bg-gradient-to-r ${prize.color} rounded-full flex items-center justify-center`}>
                    <prize.icon className="w-6 h-6 text-black" />
                  </div>
                  <h3 className="text-sm font-bold text-yellow-400">{prize.name}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-20 bg-gradient-to-r from-purple-900/20 to-red-900/20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { end: 60, suffix: "+", label: "Weekly Draws", icon: Calendar },
              { end: 1000, suffix: "+", label: "Happy Winners", icon: Users },
              { end: 16, label: "Successful Seasons", icon: Star },
              { end: 50, prefix: "₹", suffix: "L+", label: "Prizes Distributed", icon: Gift }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="w-8 h-8 text-black" />
                </div>
                <div className="text-4xl lg:text-5xl font-bold text-yellow-400 mb-2">
                  <AnimatedCounter end={stat.end} prefix={stat.prefix} suffix={stat.suffix} />
                </div>
                <div className="text-gray-300 font-semibold">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-b from-black/50 to-transparent">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              How <span className="text-yellow-400">It Works</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Simple steps to join and start winning amazing prizes every week
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Register", desc: "Fill out the application form with your details", icon: Users },
              { step: "02", title: "Participate", desc: "Join our weekly draws every Thursday", icon: Calendar },
              { step: "03", title: "Win Prizes", desc: "Get a chance to win amazing prizes", icon: Trophy }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="relative mb-6">
                  <div className="w-24 h-24 mx-auto bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <step.icon className="w-12 h-12 text-black" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-yellow-400 mb-4">{step.title}</h3>
                <p className="text-gray-300">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-b from-transparent to-black/50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              What Our <span className="text-yellow-400">Winners Say</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Hear from our community of happy winners who transformed their lives
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                name: "Rajesh Kumar", 
                prize: "1BHK Flat Winner", 
                quote: "I never believed I could win such a big prize! MULTICom made my dream of owning a home come true.", 
                location: "Kasaragod",
                date: "Season 15 Winner"
              },
              { 
                name: "Priya Nair", 
                prize: "Gold Coins Winner", 
                quote: "The transparent process and genuine prizes make MULTICom the best gift scheme in Kerala.", 
                location: "Mangalore",
                date: "Season 14 Winner"
              },
              { 
                name: "Mohammed Ali", 
                prize: "Car Winner", 
                quote: "Won a Maruti Fronx in Season 15! The entire process was smooth and trustworthy.", 
                location: "Uppala",
                date: "Season 15 Winner"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 hover:border-yellow-500/50 transition-all duration-300 hover:-translate-y-2"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full flex items-center justify-center mr-4">
                    <span className="text-black font-bold">{testimonial.name.charAt(0)}</span>
                  </div>
                  <div>
                    <h4 className="text-yellow-400 font-bold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-400">{testimonial.prize}</p>
                  </div>
                </div>
                <p className="text-gray-300 mb-4 italic">"{testimonial.quote}"</p>
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {testimonial.location}
                  </div>
                  <div className="text-yellow-400 text-xs font-medium">
                    {testimonial.date}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-r from-purple-900/10 to-red-900/10">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              Frequently Asked <span className="text-yellow-400">Questions</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Everything you need to know about MULTICom Gift Scheme
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-4">
            {[
              { 
                q: "How do I join MULTICom Gift Scheme?", 
                a: "Simply fill out our registration form with your details and our team will contact you to complete the enrollment process. You can register online or visit our Uppala office for assistance." 
              },
              { 
                q: "When are the draws conducted?", 
                a: "Draws are conducted every Thursday at 4:30 PM at our Uppala office. All draws are transparent and conducted in the presence of participants. Winners are notified immediately after the draw." 
              },
              { 
                q: "What are the prizes available in Season 16?", 
                a: "Season 16 features amazing prizes including 1BHK flats, Maruti Suzuki Fronx cars, gold coins, smart TVs, cash prizes (₹20,000 & ₹50,000), Hero HF 100 bikes, home appliances, and many more exciting gifts." 
              },
              { 
                q: "Is MULTICom Gift Scheme legal and trustworthy?", 
                a: "Yes, we have been operating successfully for 16 seasons with complete transparency. All our operations are conducted legally and ethically. We maintain proper documentation and follow all regulations." 
              },
              { 
                q: "How are winners selected?", 
                a: "Winners are selected through a fair and transparent lottery system conducted every Thursday. All participants have equal chances of winning. The draw process is conducted in public view to ensure fairness." 
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => setActiveFAQ(activeFAQ === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <h3 className="text-lg font-bold text-yellow-400">{faq.q}</h3>
                  <motion.div
                    animate={{ rotate: activeFAQ === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-5 h-5 text-yellow-400" />
                  </motion.div>
                </button>
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ 
                    height: activeFAQ === index ? 'auto' : 0,
                    opacity: activeFAQ === index ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 text-gray-300">
                    {faq.a}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-yellow-900/20 to-red-900/20">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto space-y-8"
          >
            <h2 className="text-4xl lg:text-6xl font-bold">
              Ready to Win Your <span className="text-yellow-400">Dream Prize</span>?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Join MULTICom Gift Scheme Season 16 today and be part of our winning community. Every Thursday could be your lucky day!
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveModal('join')}
              className="group px-12 py-6 bg-gradient-to-r from-yellow-600 to-amber-600 text-black font-bold text-xl rounded-2xl relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center space-x-3">
                <span>Join Our Scheme Now</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-black/50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              Get In <span className="text-yellow-400">Touch</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Visit us or contact our team for any inquiries about our gift scheme
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                icon: MapPin, 
                title: "Address", 
                info: "Ground Floor, Singapore Complex\nUppala, Kerala - 671322" 
              },
              { 
                icon: Phone, 
                title: "Phone", 
                info: "9746797367\n9037497367\n8891497367" 
              },
              { 
                icon: Globe, 
                title: "Website", 
                info: "www.multicomgiftscheme.in\ninfo@multicomgiftscheme.in" 
              },
              { 
                icon: Clock, 
                title: "Draw Schedule", 
                info: "Every Thursday at 4:30 PM\nOffice Hours: 9AM - 6PM" 
              }
            ].map((contact, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <contact.icon className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-xl font-bold text-yellow-400 mb-2">{contact.title}</h3>
                <p className="text-gray-300 whitespace-pre-line">{contact.info}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-black border-t border-yellow-500/20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Crown className="w-8 h-8 text-yellow-400" />
                <div>
                  <h3 className="text-xl font-bold">
                    <span className="text-white">MULTI</span>
                    <span className="text-yellow-400">Com</span>
                  </h3>
                  <p className="text-xs text-yellow-300">Gift Scheme</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm">
                The most trusted gift scheme in Kerala with 16 successful seasons and thousands of happy winners.
              </p>
              <div className="flex space-x-4 mt-4">
                {['Facebook', 'Instagram', 'Twitter', 'YouTube'].map((social, index) => (
                  <motion.a
                    key={index}
                    whileHover={{ y: -3 }}
                    href="#"
                    className="text-gray-400 hover:text-yellow-400 transition-colors"
                    aria-label={social}
                  >
                    <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
                      {social.charAt(0)}
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-yellow-400 font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                {[
                  { label: "Join Now", action: () => setActiveModal('join') },
                  { label: "Member Login", action: () => setActiveModal('login') },
                  { label: "Prize List", action: () => alert('Prize list coming soon!') },
                  { label: "Draw Results", action: () => alert('Latest results coming soon!') }
                ].map((link, index) => (
                  <motion.li 
                    key={index}
                    whileHover={{ x: 5 }}
                  >
                    <button 
                      onClick={link.action}
                      className="text-gray-400 hover:text-yellow-400 transition-colors"
                    >
                      {link.label}
                    </button>
                  </motion.li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-yellow-400 font-bold mb-4">Contact Info</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-center">
                  <Phone className="w-4 h-4 mr-2 text-yellow-400" /> 
                  <span>9746797367, 9037497367, 8891497367</span>
                </li>
                <li className="flex items-center">
                  <Globe className="w-4 h-4 mr-2 text-yellow-400" /> 
                  <span>www.multicomgiftscheme.in</span>
                </li>
                <li className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-yellow-400" /> 
                  <span>Uppala, Kerala</span>
                </li>
                <li className="flex items-center">
                  <Clock className="w-4 h-4 mr-2 text-yellow-400" /> 
                  <span>Thu 4:30 PM (Draw Time)</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-yellow-400 font-bold mb-4">Current Season</h4>
              <div className="bg-gradient-to-r from-yellow-500/20 to-red-500/20 border border-yellow-500/30 rounded-xl p-4">
                <h5 className="text-white font-bold">Season 16</h5>
                <p className="text-yellow-300 text-sm">2025-26</p>
                <p className="text-gray-400 text-xs mt-2">Registration Open</p>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setActiveModal('join')}
                  className="mt-3 w-full bg-gradient-to-r from-yellow-600 to-amber-600 text-black text-sm font-bold py-2 rounded-lg"
                >
                  Enroll Now
                </motion.button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-yellow-500/20 pt-6 text-center">
            <p className="text-gray-400 text-sm mb-2">
              © 2025 MULTICom Gift Scheme. All rights reserved. | Season 16 (2025-26)
            </p>
            <p className="text-xs text-gray-500">
              *Terms and conditions apply. Images shown are for illustrative purposes only. Please participate responsibly.
            </p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <AnimatePresence>
        <Modal
          isOpen={activeModal === 'join'}
          onClose={() => setActiveModal(null)}
          title="Join MULTICom Gift Scheme"
        >
          <p className="text-gray-300 mb-6">Ready to be part of Season 16? Fill in your details and we'll get back to you!</p>
          <JoinForm />
        </Modal>

        <Modal
          isOpen={activeModal === 'login'}
          onClose={() => setActiveModal(null)}
          title="Member Login"
        >
          <p className="text-gray-300 mb-6">Access your MULTICom account to check your participation status.</p>
          <LoginForm />
        </Modal>
      </AnimatePresence>

      {/* Floating Action Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setActiveModal('join')}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-yellow-600 to-amber-600 text-black rounded-full shadow-2xl z-40 flex items-center justify-center"
        aria-label="Join scheme"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <ArrowRight className="w-6 h-6" />
      </motion.button>
    </div>
  );
};

export default MULTIComLanding;
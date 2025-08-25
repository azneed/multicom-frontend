import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { Helmet } from "react-helmet";


<Helmet>
  <title>My Page Title</title>
</Helmet>



export default function PremiumLandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPrize, setSelectedPrize] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const carouselRef = useRef(null);

  // Prize categories
  const prizes = {
    all: [
      { id: 1, name: "1BHK Flat", week: "60th", image: "/images/flat.webp", type: "grand" },
      { id: 2, name: "Maruti Suzuki Fronx", week: "60th", image: "/images/fronx.webp", type: "grand" },
      { id: 3, name: "32\" Smart TV", week: "25th", image: "/images/tv.webp", type: "electronics" },
      { id: 4, name: "Gold", week: "31st", image: "/images/gold.webp", type: "valuables" },
      { id: 5, name: "Hero HF 100", week: "45th", image: "/images/bike.jpg", type: "vehicles" },
      { id: 6, name: "Washing Machine", week: "19th", image: "/images/washing-machine.avif", type: "appliances" },
      { id: 7, name: "Dining Table Set", week: "29th", image: "/images/dining-set.jpg", type: "furniture" },
      { id: 8, name: "20 Thousand Rupees Cash", week: "21st", image: "/images/cash.jpg", type: "cash" },
    ],
    grand: [
      { id: 1, name: "1BHK Flat", week: "60th", image: "/images/flat.webp" },
      { id: 2, name: "Maruti Suzuki Fronx", week: "60th", image: "/images/fronx.jpg" },
    ],
    electronics: [
      { id: 3, name: "32\" Smart TV", week: "25th", image: "/images/tv.jpg" },
      { id: 9, name: "Samsung Galaxy F05", week: "1st", image: "/images/phone.jpg" },
      { id: 10, name: "Microwave", week: "9th", image: "/images/microwave.jpg" },
    ],
    valuables: [
      { id: 4, name: "Gold", week: "31st", image: "/images/gold.jpg" },
    ],
    vehicles: [
      { id: 5, name: "Hero HF 100", week: "45th", image: "/images/bike.jpg" },
      { id: 11, name: "TVS Jupiter", week: "1st", image: "/images/scooter.jpg" },
    ],
    appliances: [
      { id: 6, name: "Washing Machine", week: "19th", image: "/images/washing-machine.jpg" },
      { id: 12, name: "Single Door Refrigerator", week: "11th", image: "/images/fridge.avif" },
      { id: 13, name: "Gas Geyser", week: "7th", image: "/images/geyser.jpg" },
    ],
    furniture: [
      { id: 7, name: "Dining Table Set", week: "29th", image: "/images/dining-set.jpg" },
      { id: 14, name: "Sofa Set", week: "12th", image: "/images/sofa.jpg" },
      { id: 15, name: "Wooden Cot", week: "4th", image: "/images/cot.jpg" },
    ],
    cash: [
      { id: 8, name: "20 Thousand Rupees Cash", week: "21st", image: "/images/cash.jpg" },
      { id: 16, name: "10 Thousand Rupees Cash", week: "30th", image: "/images/cash.jpg" },
    ]
  };

  // Scheme brochure slides
  const brochureSlides = [
    { image: "/images/scheme-page1.jpg", alt: "Scheme Page 1" },
    { image: "/images/scheme-page2.jpg", alt: "Scheme Page 2" },
    { image: "/images/scheme-page3.jpg", alt: "Scheme Page 3" },
    { image: "/images/scheme-page4.jpg", alt: "Scheme Page 4" },
  ];

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % brochureSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Open prize modal
  const openPrizeModal = (prize) => {
    setSelectedPrize(prize);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-x-hidden">
 
<Helmet>
    <title>MULTICom Gift Scheme - Win Amazing Prizes</title>
    <meta name="description" content="Join Uppala's most trusted gift scheme for 16 seasons! Win 1BHK Flat, Maruti Suzuki Fronx, and more exciting prizes." />
  </Helmet>


      {/* Animated Background */}
      <div className="fixed inset-0 z-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-black"></div>
        <div className="absolute inset-0 opacity-30">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-purple-500"
              initial={{
                x: Math.random() * 100,
                y: Math.random() * 100,
                width: Math.random() * 300 + 100,
                height: Math.random() * 300 + 100,
                opacity: Math.random() * 0.2,
              }}
              animate={{
                x: [null, Math.random() * 100],
                y: [null, Math.random() * 100],
                transition: {
                  duration: Math.random() * 10 + 10,
                  repeat: Infinity,
                  repeatType: "reverse",
                },
              }}
            />
          ))}
        </div>
      </div>

      {/* Header */}
      <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? "bg-gray-900/90 backdrop-blur-md py-2 shadow-lg" : "bg-transparent py-4"}`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center space-x-3"
            >
              <img src="/images/logo.png" alt="MULTICom Logo" className="h-12" />
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">MULTICom</h1>
                <p className="text-xs text-gray-400">Season 16 • 2025-26</p>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {["Home", "Prizes", "Scheme", "Gallery", "Contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="relative text-gray-300 hover:text-white transition-colors duration-300 group"
                >
                  <span>{item}</span>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-500 transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
              <div className="w-6 h-6 flex flex-col justify-center space-y-1">
                <div className={`w-full h-0.5 bg-white transition-all ${isMenuOpen ? "rotate-45 translate-y-1.5" : ""}`}></div>
                <div className={`w-full h-0.5 bg-white transition-all ${isMenuOpen ? "opacity-0" : ""}`}></div>
                <div className={`w-full h-0.5 bg-white transition-all ${isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""}`}></div>
              </div>
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 overflow-hidden"
            >
              <div className="flex flex-col space-y-3 py-4 border-t border-gray-800">
                {["Home", "Prizes", "Scheme", "Gallery", "Contact"].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="text-gray-300 hover:text-white px-2 py-1 rounded hover:bg-gray-800 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="relative pt-32 pb-20 px-4 min-h-screen flex items-center">
        <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center space-x-2 bg-gray-800/50 backdrop-blur-md border border-purple-500/30 rounded-full px-4 py-2"
            >
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span className="text-green-400 font-medium">LIVE NOW</span>
              <span className="text-gray-300 text-sm">Season 16 • 2025-26</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="space-y-4"
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">MULTI</span>
                <br />
                <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">GIFT SCHEME</span>
              </h1>
              <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl"
            >
              Join Uppala's most <span className="font-semibold text-purple-300">trusted gift scheme</span> for 16 seasons! 
              Win amazing prizes including <span className="font-semibold text-yellow-300">1BHK Flat</span>, 
              <span className="font-semibold text-blue-300"> Maruti Suzuki Fronx</span>, and much more!
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="flex flex-wrap gap-4"
            >
              <a
                href="#scheme"
                className="group relative overflow-hidden bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30 hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative flex items-center justify-center space-x-2">
                  <span>Join Now</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </span>
              </a>

              <a
                href="#prizes"
                className="group relative overflow-hidden border-2 border-purple-500/50 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:border-purple-400 hover:bg-purple-500/10"
              >
                <span className="flex items-center justify-center space-x-2">
                  <span>View Prizes</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </span>
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8"
            >
              {[
                { value: "60", label: "Weeks", color: "from-purple-400 to-blue-400" },
                { value: "₹500", label: "Weekly", color: "from-yellow-400 to-orange-400" },
                { value: "100+", label: "Prizes", color: "from-green-400 to-blue-400" },
                { value: "16", label: "Seasons", color: "from-pink-400 to-purple-400" }
              ].map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className={`text-3xl md:text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300`}>
                    {stat.value}
                  </div>
                  <div className="text-gray-400 font-medium">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Content - Carousel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="relative z-10"
          >
            <div className="relative overflow-hidden rounded-2xl bg-gray-800/50 backdrop-blur-md border border-purple-500/30 shadow-2xl">
              <div className="relative h-80 md:h-[500px]">
                <AnimatePresence initial={false}>
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0"
                  >
                    <img
                      src={brochureSlides[currentSlide].image}
                      alt={brochureSlides[currentSlide].alt}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  </motion.div>
                </AnimatePresence>
              </div>
              
              {/* Carousel Controls */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {brochureSlides.map((_, index) => (
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

            {/* Download Brochure Button */}
            <div className="mt-6 flex justify-center">
              <a
                href="/scheme-brochure.pdf"
                download
                className="flex items-center space-x-2 text-purple-400 hover:text-purple-300 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                <span>Download Full Brochure</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Grand Prizes Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-gray-900/50 to-transparent">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">GRAND PRIZES</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              The ultimate rewards await in our 60th week finale
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* 1BHK Flat */}
            {/* 1BHK Flat Prize Card - Updated Version */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay: 0.2 }}
  viewport={{ once: true }}
  className="group relative overflow-hidden rounded-2xl hover:scale-[1.02] transition-all duration-500 cursor-pointer h-64 md:h-80"
  onClick={() => openPrizeModal(prizes.grand[0])}
>
  {/* Background Image */}
  <div className="absolute inset-0 bg-gray-800">
    <img
      src="/images/flat.webp"
      alt="1BHK Flat"
      className="w-full h-full object-cover opacity-70 group-hover:opacity-80 transition-opacity duration-500"
    />
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-black/90"></div>
  </div>
  
  {/* Content */}
  <div className="relative z-10 h-full flex flex-col justify-end p-6">
    <div className="text-4xl mb-2"></div>
    <h3 className="text-2xl font-bold mb-2 text-white">
      1BHK FLAT
    </h3>
    <p className="text-gray-300 mb-4">Luxury apartment in prime location</p>
    <div className="bg-purple-600/30 backdrop-blur-sm border border-purple-500/20 rounded-lg p-3 inline-block">
      <div className="font-bold text-yellow-300">Week 60 Draw</div>
      <div className="text-xs text-purple-200">Grand Finale Prize</div>
    </div>
  </div>
</motion.div>

            {/* Maruti Suzuki Fronx */}
            {/* Maruti Suzuki Fronx Prize Card */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay: 0.4 }}
  viewport={{ once: true }}
  className="group relative overflow-hidden rounded-2xl hover:scale-[1.02] transition-all duration-500 cursor-pointer h-64 md:h-80"
  onClick={() => openPrizeModal(prizes.grand[1])}
>
  {/* Background Image */}
  <div className="absolute inset-0 bg-gray-800">
    <img
      src="/images/fronx.webp"
      alt="Maruti Suzuki Fronx"
      className="w-full h-full object-cover opacity-70 group-hover:opacity-80 transition-opacity duration-500"
    />
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-black/90"></div>
  </div>
  
  {/* Content */}
  <div className="relative z-10 h-full flex flex-col justify-end p-6">
    <div className="text-4xl mb-2"></div>
    <h3 className="text-2xl font-bold mb-2 text-white">
      MARUTI SUZUKI FRONX
    </h3>
    <p className="text-gray-300 mb-4">Brand new car with premium features</p>
    <div className="bg-blue-600/30 backdrop-blur-sm border border-blue-500/20 rounded-lg p-3 inline-block">
      <div className="font-bold text-yellow-300">Week 60 Draw</div>
      <div className="text-xs text-blue-200">Grand Finale Prize</div>
    </div>
  </div>
</motion.div>
          </div>
        </div>
      </section>

      {/* All Prizes Section */}
      <section id="prizes" className="py-20 px-4 bg-gradient-to-b from-gray-900/50 to-transparent">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">ALL PRIZES</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Amazing rewards you can win every week
            </p>
          </motion.div>

          {/* Prize Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-2 mb-12"
          >
            {["all", "grand", "electronics", "valuables", "vehicles", "appliances", "furniture", "cash"].map((category) => (
              <button
                key={category}
                onClick={() => setActiveTab(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeTab === category
                    ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </motion.div>

          {/* Prize Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {prizes[activeTab].map((prize) => (
              <motion.div
                key={prize.id}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
                className="group relative overflow-hidden bg-gray-800/50 backdrop-blur-md border border-gray-700 rounded-xl hover:border-purple-500 transition-all duration-300 cursor-pointer"
                onClick={() => openPrizeModal(prize)}
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={prize.image}
                    alt={prize.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold mb-1">{prize.name}</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Week {prize.week}</span>
                    <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full">View Details</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="scheme" className="py-20 px-4 bg-gradient-to-b from-gray-900/50 to-transparent">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">HOW IT WORKS</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Simple steps to your dream prizes
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              { step: "01", icon: "📝", title: "Register", desc: "Visit our Uppala office with ₹500", color: "from-green-400 to-blue-400" },
              { step: "02", icon: "💰", title: "Pay Weekly", desc: "₹500 every week for 60 weeks", color: "from-blue-400 to-purple-400" },
              { step: "03", icon: "🎰", title: "Weekly Draws", desc: "Every Thursday at 4:30 PM", color: "from-purple-400 to-pink-400" },
              { step: "04", icon: "🏆", title: "Win Prizes", desc: "Amazing rewards every week!", color: "from-pink-400 to-yellow-400" }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div className="relative overflow-hidden bg-gray-800/50 backdrop-blur-md border border-gray-700 rounded-2xl p-8 hover:border-purple-500 transition-all duration-500 h-full">
                  <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                  
                  <div className="text-center space-y-4">
                    <div className={`w-14 h-14 mx-auto rounded-xl bg-gradient-to-r ${item.color} flex items-center justify-center text-2xl font-bold mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      {item.icon}
                    </div>
                    
                    <div className={`text-xs font-bold px-3 py-1 rounded-full bg-gradient-to-r ${item.color} text-black inline-block`}>
                      STEP {item.step}
                    </div>
                    
                    <h3 className="text-xl font-bold text-white">{item.title}</h3>
                    <p className="text-gray-400">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-purple-900/30 to-transparent">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="relative overflow-hidden bg-gradient-to-br from-purple-900/30 to-blue-900/30 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-12 text-center"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10"></div>
            
            <div className="relative z-10 space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                  READY TO WIN?
                </span>
              </h2>
              
              <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                Join thousands of winners in Season 16! With just ₹500 per week, you could be our next grand prize winner.
              </p>

              <div className="flex flex-wrap gap-6 justify-center">
                <a
                  href="tel:9746797367"
                  className="group relative overflow-hidden bg-gradient-to-r from-yellow-400 to-orange-500 px-8 py-4 rounded-xl font-bold text-lg text-black transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/30 hover:scale-105"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative flex items-center justify-center space-x-2">
                    <span>Call Now</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </span>
                </a>

                <a
                  href="#contact"
                  className="group relative overflow-hidden border-2 border-purple-500/50 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:border-purple-400 hover:bg-purple-500/10"
                >
                  <span className="flex items-center justify-center space-x-2">
                    <span>Contact Us</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
                    </svg>
                  </span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 px-4 bg-gradient-to-b from-gray-900/50 to-transparent">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">PRIZE GALLERY</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              See what our winners have received
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              "/images/gallery1.jpg",
              "/images/gallery2.jpg",
              "/images/gallery3.jpg",
              "/images/gallery4.jpg",
              "/images/gallery5.jpg",
              "/images/gallery6.jpg",
              "/images/gallery7.jpg",
              "/images/gallery8.jpg",
            ].map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="group relative overflow-hidden rounded-xl aspect-square"
              >
                <img
                  src={image}
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="text-white font-medium">Prize Winner #{index + 1}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">CONTACT US</span>
                </h2>
                <p className="text-xl text-gray-300">
                  Get in touch to join our gift scheme
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-400 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-white">Address</h3>
                    <p className="text-gray-400">Ground Floor, Singapore Complex, Uppala</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-400 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-bold text-white">Phone Numbers</h3>
                    <div className="flex flex-wrap gap-4">
                      <a href="tel:9746797367" className="text-gray-400 hover:text-purple-300 transition-colors">9746797367</a>
                      <a href="tel:9037497367" className="text-gray-400 hover:text-purple-300 transition-colors">9037497367</a>
                      <a href="tel:8891497367" className="text-gray-400 hover:text-purple-300 transition-colors">8891497367</a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-400 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-white">Draw Timing</h3>
                    <p className="text-gray-400">Every Thursday at 4:30 PM</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-gray-800/50 backdrop-blur-md border border-purple-500/30 rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Send Us a Message</h3>
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-white placeholder-gray-400"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-white placeholder-gray-400"
                    placeholder="Your phone number"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">Message</label>
                  <textarea
                    id="message"
                    rows="4"
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-white placeholder-gray-400"
                    placeholder="Your message"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 rounded-lg font-semibold transition-all duration-300"
                >
                  Send Message
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-purple-500/20 bg-gray-900/50 backdrop-blur-md">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <img src="/images/logo.png" alt="MULTICom Logo" className="h-10" />
                <h3 className="text-lg font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">MULTICom</h3>
              </div>
              <p className="text-gray-400 text-sm">
                Uppala's most trusted gift scheme for 16 seasons. Join thousands of happy winners!
              </p>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#home" className="text-gray-400 hover:text-purple-300 transition-colors">Home</a></li>
                <li><a href="#prizes" className="text-gray-400 hover:text-purple-300 transition-colors">Prizes</a></li>
                <li><a href="#scheme" className="text-gray-400 hover:text-purple-300 transition-colors">How It Works</a></li>
                <li><a href="#gallery" className="text-gray-400 hover:text-purple-300 transition-colors">Gallery</a></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">Scheme Info</h4>
              <ul className="space-y-2">
                <li><span className="text-gray-400">Season 2025-26</span></li>
                <li><span className="text-gray-400">60 Week Scheme</span></li>
                <li><span className="text-gray-400">Draw: Thursday 4:30 PM</span></li>
                <li><span className="text-gray-400">Weekly: ₹500</span></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">Contact Us</h4>
              <div className="space-y-2">
                <a href="tel:9746797367" className="flex items-center space-x-2 text-gray-400 hover:text-purple-300 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <span>9746797367</span>
                </a>
                <a href="tel:9037497367" className="flex items-center space-x-2 text-gray-400 hover:text-purple-300 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <span>9037497367</span>
                </a>
                <a href="tel:8891497367" className="flex items-center space-x-2 text-gray-400 hover:text-purple-300 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <span>8891497367</span>
                </a>
                <div className="flex items-center space-x-2 text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span>Singapore Complex, Uppala</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-purple-500/20 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © 2025 MULTICom Gift Scheme, Uppala. All rights reserved. | Season 16 (2025-26)
            </p>
          </div>
        </div>
      </footer>

      {/* Prize Modal */}
      <AnimatePresence>
        {isModalOpen && selectedPrize && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[9999] p-4"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative bg-gray-800 border border-purple-500/30 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-700 transition-colors"
              >
                ×
              </button>

              <div className="p-6">
                <div className="h-64 md:h-80 overflow-hidden rounded-xl mb-6">
                  <img
                    src={selectedPrize.image}
                    alt={selectedPrize.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-2xl md:text-3xl font-bold">{selectedPrize.name}</h3>
                  <div className="flex items-center space-x-2 text-yellow-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="font-semibold">Week {selectedPrize.week} Prize</span>
                  </div>

                  <p className="text-gray-300">
                    This amazing prize is part of our 60-week gift scheme. Join now for a chance to win this and many other exciting rewards!
                  </p>

                  <div className="pt-4">
                    <a
                      href="#scheme"
                      onClick={() => setIsModalOpen(false)}
                      className="inline-block bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all"
                    >
                      Join Scheme to Win
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
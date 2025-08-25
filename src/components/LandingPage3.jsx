"use client"

import React, { useState, createContext, useContext } from "react"

// Utility function for class names
const cn = (...classes) => classes.filter(Boolean).join(" ")

// Dialog Context
const DialogContext = createContext()

// UI Components
const Button = React.forwardRef(({ className, variant = "default", size = "default", ...props }, ref) => {
  const variants = {
    default: "bg-red-600 text-white hover:bg-red-700",
    destructive: "bg-red-600 text-white hover:bg-red-700",
    outline: "border border-red-600 bg-transparent hover:bg-red-50 text-red-600",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
    ghost: "hover:bg-red-50 hover:text-red-600",
    link: "text-red-600 underline-offset-4 hover:underline",
  }

  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-11 rounded-md px-8",
    icon: "h-10 w-10",
  }

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
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
  <div ref={ref} className={cn("rounded-lg border bg-white text-gray-900 shadow-sm", className)} {...props} />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3 ref={ref} className={cn("text-2xl font-semibold leading-none tracking-tight", className)} {...props} />
))
CardTitle.displayName = "CardTitle"

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
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
    className={cn(
      "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
      className,
    )}
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

const DialogTrigger = ({ children, asChild, ...props }) => {
  const { setIsOpen } = useContext(DialogContext)

  return React.cloneElement(children, {
    ...props,
    onClick: (e) => {
      setIsOpen(true)
      if (children.props.onClick) children.props.onClick(e)
    },
  })
}

const DialogContent = ({ className, children, ...props }) => {
  const { isOpen, setIsOpen } = useContext(DialogContext)

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/50" onClick={() => setIsOpen(false)} />
      <div
        className={cn(
          "relative bg-white p-6 shadow-lg duration-200 sm:rounded-lg sm:border max-w-lg w-full max-h-[90vh] overflow-y-auto",
          className,
        )}
        {...props}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  )
}

const DialogHeader = ({ className, ...props }) => (
  <div className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)} {...props} />
)

const DialogTitle = ({ className, ...props }) => (
  <h2 className={cn("text-lg font-semibold leading-none tracking-tight", className)} {...props} />
)

const DialogDescription = ({ className, ...props }) => (
  <p className={cn("text-sm text-gray-600", className)} {...props} />
)

const Badge = ({ className, variant = "default", ...props }) => {
  const variants = {
    default: "border-transparent bg-red-600 text-white hover:bg-red-700",
    secondary: "border-transparent bg-gray-100 text-gray-900 hover:bg-gray-200",
    destructive: "border-transparent bg-red-600 text-white hover:bg-red-700",
    outline: "text-gray-900 border-gray-300",
  }

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2",
        variants[variant],
        className,
      )}
      {...props}
    />
  )
}

// Tabs Components
const TabsContext = createContext()

const Tabs = ({ defaultValue, className, children, ...props }) => {
  const [activeTab, setActiveTab] = useState(defaultValue)

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={cn("w-full", className)} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  )
}

const TabsList = ({ className, ...props }) => (
  <div
    className={cn("inline-flex h-10 items-center justify-center rounded-md bg-gray-100 p-1 text-gray-600", className)}
    {...props}
  />
)

const TabsTrigger = ({ className, value, children, ...props }) => {
  const { activeTab, setActiveTab } = useContext(TabsContext)

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        activeTab === value && "bg-white text-gray-900 shadow-sm",
        className,
      )}
      onClick={() => setActiveTab(value)}
      {...props}
    >
      {children}
    </button>
  )
}

const TabsContent = ({ className, value, children, ...props }) => {
  const { activeTab } = useContext(TabsContext)

  if (activeTab !== value) return null

  return (
    <div
      className={cn(
        "mt-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

// Icon Components
const Gift = ({ className = "h-4 w-4", ...props }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
    <rect x="3" y="8" width="18" height="4" rx="1" />
    <path d="m12 8-2-2v2H8l2-2 2 2" />
    <path d="M12 21V8" />
    <path d="m8 6 2-2 2 2" />
    <path d="m16 6-2-2-2 2" />
  </svg>
)

const Trophy = ({ className = "h-4 w-4", ...props }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V17c0 .55.47.98.97 1.21C12.04 18.75 14 20.24 14 22" />
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
  </svg>
)

const Phone = ({ className = "h-4 w-4", ...props }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
)

const MapPin = ({ className = "h-4 w-4", ...props }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
)

const Calendar = ({ className = "h-4 w-4", ...props }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
)

const Users = ({ className = "h-4 w-4", ...props }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
)

const Award = ({ className = "h-4 w-4", ...props }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
    <circle cx="12" cy="8" r="6" />
    <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
  </svg>
)

const Car = ({ className = "h-4 w-4", ...props }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
    <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9L18.4 9.6a2 2 0 0 0-1.6-1.4C16.25 8.22 14.78 8 12 8s-4.25.22-4.8.2a2 2 0 0 0-1.6 1.4L3.5 11.1C2.7 11.3 2 12.1 2 13v3c0 .6.4 1 1 1h2" />
    <circle cx="7" cy="17" r="2" />
    <path d="M9 17h6" />
    <circle cx="17" cy="17" r="2" />
  </svg>
)

const Home = ({ className = "h-4 w-4", ...props }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9,22 9,12 15,12 15,22" />
  </svg>
)

const Smartphone = ({ className = "h-4 w-4", ...props }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
    <line x1="12" y1="18" x2="12.01" y2="18" />
  </svg>
)

const Tv = ({ className = "h-4 w-4", ...props }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
  </svg>
)

const ChefHat = ({ className = "h-4 w-4", ...props }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
    <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z" />
    <line x1="6" y1="17" x2="18" y2="17" />
  </svg>
)

const Coins = ({ className = "h-4 w-4", ...props }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
    <circle cx="8" cy="8" r="6" />
    <path d="M18.09 10.37A6 6 0 1 1 10.34 18" />
    <path d="M7 6h1v4" />
    <path d="M16.71 13.88A6 6 0 0 0 16.37 13" />
  </svg>
)

const User = ({ className = "h-4 w-4", ...props }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
)

const Lock = ({ className = "h-4 w-4", ...props }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <circle cx="12" cy="16" r="1" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
)

const Mail = ({ className = "h-4 w-4", ...props }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-10 5L2 7" />
  </svg>
)

const CheckCircle = ({ className = "h-4 w-4", ...props }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22,4 12,14.01 9,11.01" />
  </svg>
)

const ArrowRight = ({ className = "h-4 w-4", ...props }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12,5 19,12 12,19" />
  </svg>
)

const Sparkles = ({ className = "h-4 w-4", ...props }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
    <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
    <path d="M20 3v4" />
    <path d="M22 5h-4" />
    <path d="M4 17v2" />
    <path d="M5 18H3" />
  </svg>
)

// Main Landing Page Component
const LandingPage3 = () => {
  const [loginOpen, setLoginOpen] = useState(false)
  const [joinOpen, setJoinOpen] = useState(false)

  const prizes = [
    { icon: Coins, name: "Cash Prizes", value: "₹20,000 - ₹5,000", color: "text-yellow-600" },
    { icon: Car, name: "Maruti Suzuki Fronx", value: "Brand New Car", color: "text-blue-600" },
    { icon: Home, name: "1BHK Flat", value: "Ready to Move", color: "text-green-600" },
    { icon: Smartphone, name: "Latest Smartphones", value: "Samsung Galaxy", color: "text-purple-600" },
    { icon: Tv, name: "Smart TVs", value: '32" LED TVs', color: "text-red-600" },
    { icon: ChefHat, name: "Home Appliances", value: "Kitchen & More", color: "text-orange-600" },
  ]

  const features = [
    { icon: Calendar, title: "60 Week Program", description: "Weekly draws for 60 consecutive weeks" },
    { icon: Trophy, title: "Guaranteed Winners", description: "Every week has confirmed winners" },
    { icon: Users, title: "Trusted Community", description: "Thousands of satisfied participants" },
    { icon: Award, title: "Premium Prizes", description: "High-value gifts and cash rewards" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b-4 border-red-600">
        <div className="container mx-auto px-4 py-4 max-w-7xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-red-600 to-red-800 text-white px-4 py-2 rounded-lg font-bold text-xl">
                MULTICom
              </div>
              <div className="hidden md:block">
                <p className="text-sm text-gray-600">The 6th Generation Needs...</p>
                <p className="text-xs text-red-600 font-semibold">UPPALA Presents</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-2 text-sm text-gray-600">
                <Phone className="h-4 w-4" />
                <span>9746797367 | 9037497367</span>
              </div>
              <Dialog open={loginOpen} onOpenChange={setLoginOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <User className="h-4 w-4 mr-2" />
                    Member Login
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="text-red-600">Member Login</DialogTitle>
                    <DialogDescription>Access your member dashboard and check your entries</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="member-id">Member ID</Label>
                      <Input id="member-id" placeholder="Enter your member ID" />
                    </div>
                    <div>
                      <Label htmlFor="password">Password</Label>
                      <Input id="password" type="password" placeholder="Enter your password" />
                    </div>
                    <Button className="w-full">
                      <Lock className="h-4 w-4 mr-2" />
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
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 to-red-800/10"></div>
        <div className="container mx-auto px-4 relative z-10 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-red-100 text-red-800 border-red-200 text-lg px-4 py-2">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Season 16 • 2025-26
                </Badge>
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  MULTI GIFT
                  <span className="text-red-600"> SCHEME</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Join India's most trusted gift scheme! Win amazing prizes every week including
                  <span className="font-semibold text-red-600"> cash, gold, electronics, vehicles</span> and even a
                  <span className="font-semibold text-red-600"> 1BHK flat!</span>
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Dialog open={joinOpen} onOpenChange={setJoinOpen}>
                  <DialogTrigger asChild>
                    <Button size="lg" className="text-lg px-8 py-4">
                      <Gift className="h-5 w-5 mr-2" />
                      Want to Join Our Scheme?
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-2xl">
                    <DialogHeader>
                      <DialogTitle className="text-2xl text-red-600">How to Join MULTICom Gift Scheme</DialogTitle>
                      <DialogDescription className="text-base">
                        Follow these simple steps to become a member and start winning!
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-6">
                      <div className="grid gap-4">
                        <div className="flex items-start space-x-4 p-4 bg-red-50 rounded-lg">
                          <div className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                            1
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">Visit Our Office</h4>
                            <p className="text-gray-600">Ground Floor, Singapore Complex, Uppala</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-4 p-4 bg-red-50 rounded-lg">
                          <div className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                            2
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">Choose Your Plan</h4>
                            <p className="text-gray-600">Select from our various membership options</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-4 p-4 bg-red-50 rounded-lg">
                          <div className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                            3
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">Complete Registration</h4>
                            <p className="text-gray-600">Fill the form and make your first payment</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-4 p-4 bg-green-50 rounded-lg">
                          <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center">
                            <CheckCircle className="h-4 w-4" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">Start Winning!</h4>
                            <p className="text-gray-600">Your entries are active for all weekly draws</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <h4 className="font-semibold text-yellow-800 mb-2">📞 Contact Information</h4>
                        <div className="space-y-1 text-yellow-700">
                          <p>📱 9746797367 | 9037497367 | 8891497367</p>
                          <p>📍 Ground Floor, Singapore Complex, Uppala</p>
                          <p>🌐 www.multicomgiftscheme.in</p>
                          <p>🎯 Draw Every Thursday 4:30PM @ MULTICOM</p>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>

                <Button variant="outline" size="lg" className="text-lg px-8 py-4 bg-transparent">
                  View All Prizes
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </div>

              <div className="flex items-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-red-600" />
                  <span>Singapore Complex, Uppala</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-red-600" />
                  <span>Draw Every Thursday</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8 border-4 border-red-100">
                <img
                  src="https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=600&h=400&fit=crop&crop=center"
                  alt="MULTICom Gift Scheme Prizes"
                  className="rounded-lg w-full h-auto"
                />
              </div>
              <div className="absolute -top-4 -right-4 bg-red-600 text-white px-4 py-2 rounded-full font-bold animate-pulse">
                60 Weeks!
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Prize Categories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Amazing Prize Categories</h2>
            <p className="text-xl text-gray-600">Win from our incredible collection of prizes every week</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {prizes.map((prize, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow border-2 hover:border-red-200">
                <CardContent className="p-6 text-center">
                  <prize.icon className={`h-12 w-12 mx-auto mb-4 ${prize.color}`} />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{prize.name}</h3>
                  <p className="text-gray-600">{prize.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Prize Gallery */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Weekly Prize Schedule</h2>
            <p className="text-xl text-gray-600">See what you can win each week in our 60-week program</p>
          </div>

          <Tabs defaultValue="weeks1-20" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="weeks1-20">Weeks 1-20</TabsTrigger>
              <TabsTrigger value="weeks21-40">Weeks 21-40</TabsTrigger>
              <TabsTrigger value="weeks41-60">Weeks 41-60</TabsTrigger>
            </TabsList>

            <TabsContent value="weeks1-20" className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="overflow-hidden">
                  <CardHeader>
                    <CardTitle className="text-red-600">Weeks 1-20 Highlights</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <img
                      src="https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500&h=600&fit=crop&crop=center"
                      alt="Weeks 1-20 Prizes"
                      className="rounded-lg w-full h-auto"
                    />
                  </CardContent>
                </Card>
                <Card className="overflow-hidden">
                  <CardHeader>
                    <CardTitle className="text-red-600">Featured Prizes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <img
                      src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=600&fit=crop&crop=center"
                      alt="Home Appliances Collection"
                      className="rounded-lg w-full h-auto"
                    />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="weeks21-40" className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="overflow-hidden">
                  <CardHeader>
                    <CardTitle className="text-red-600">Weeks 21-40 Highlights</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <img
                      src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&h=600&fit=crop&crop=center"
                      alt="Weeks 21-40 Prizes"
                      className="rounded-lg w-full h-auto"
                    />
                  </CardContent>
                </Card>
                <div className="space-y-4">
                  <Card className="p-6 bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-200">
                    <h3 className="text-xl font-bold text-yellow-800 mb-2">🏆 Grand Prize Alert!</h3>
                    <p className="text-yellow-700">Week 30: ₹10,000 Cash Prize</p>
                  </Card>
                  <Card className="p-6 bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
                    <h3 className="text-xl font-bold text-blue-800 mb-2">🚗 Vehicle Prize!</h3>
                    <p className="text-blue-700">Hero HF 100 Motorcycle</p>
                  </Card>
                  <Card className="p-6 bg-gradient-to-r from-green-50 to-green-100 border-green-200">
                    <h3 className="text-xl font-bold text-green-800 mb-2">📱 Tech Prizes!</h3>
                    <p className="text-green-700">Samsung Galaxy Smartphones & Smart TVs</p>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="weeks41-60" className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="overflow-hidden">
                  <CardHeader>
                    <CardTitle className="text-red-600">Weeks 41-60 Grand Finale</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <img
                      src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=500&h=600&fit=crop&crop=center"
                      alt="Weeks 41-60 Prizes"
                      className="rounded-lg w-full h-auto"
                    />
                  </CardContent>
                </Card>
                <Card className="overflow-hidden">
                  <CardHeader>
                    <CardTitle className="text-red-600">Ultimate Grand Prize</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <img
                      src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=500&h=400&fit=crop&crop=center"
                      alt="Grand Prize - 1BHK Flat and Maruti Suzuki Fronx"
                      className="rounded-lg w-full h-auto"
                    />
                    <div className="mt-4 p-4 bg-red-50 rounded-lg">
                      <h4 className="font-bold text-red-800 text-lg">Week 60 Grand Prize:</h4>
                      <p className="text-red-700">🏠 1BHK Flat OR 🚗 Maruti Suzuki Fronx</p>
                      <p className="text-sm text-red-600 mt-2">Agent Commission: ₹5000</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose MULTICom?</h2>
            <p className="text-xl text-gray-600">Trusted by thousands of satisfied members</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <feature.icon className="h-12 w-12 text-red-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-red-600 to-red-800 text-white">
        <div className="container mx-auto px-4 text-center max-w-7xl">
          <h2 className="text-4xl font-bold mb-4">Ready to Start Winning?</h2>
          <p className="text-xl mb-8 opacity-90">Join thousands of happy members in India's most trusted gift scheme</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
                  <Gift className="h-5 w-5 mr-2" />
                  Join Now - Start Winning!
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-red-600">Get Started Today!</DialogTitle>
                  <DialogDescription>Contact us to begin your journey to amazing prizes</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="Enter your full name" />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" placeholder="Enter your phone number" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="Enter your email" />
                  </div>
                  <Button className="w-full">
                    <Mail className="h-4 w-4 mr-2" />
                    Request Information
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <div className="flex items-center space-x-2 text-lg">
              <Phone className="h-5 w-5" />
              <span>Call: 9746797367</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="bg-gradient-to-r from-red-600 to-red-800 text-white px-4 py-2 rounded-lg font-bold text-xl mb-4 inline-block">
                MULTICom
              </div>
              <p className="text-gray-400 mb-4">The 6th Generation Needs... UPPALA Presents</p>
              <p className="text-gray-400">India's most trusted gift scheme with guaranteed weekly winners.</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
              <div className="space-y-2 text-gray-400">
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>9746797367 | 9037497367</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>8891497367 (Shop)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>Ground Floor, Singapore Complex, Uppala</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>Draw Every Thursday 4:30PM</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Important Notes</h3>
              <div className="space-y-2 text-gray-400 text-sm">
                <p>• Delivery not provided for furniture items</p>
                <p>• Images shown are for illustrative purposes</p>
                <p>• Actual prizes may differ from images</p>
                <p>• All draws are conducted transparently</p>
                <p>• Terms and conditions apply</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 MULTICom Gift Scheme. All rights reserved. | Season 16 • 2025-26</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage3

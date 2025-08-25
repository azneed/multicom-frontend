import React, { useState } from 'react';
import { 
  Phone, 
  User, 
  Lock, 
  Sparkles, 
  Gift, 
  ArrowRight, 
  MapPin, 
  Calendar, 
  CheckCircle, 
  Mail 
} from 'lucide-react';
import { 
  Dialog, 
  DialogTrigger, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Tabs, 
  TabsList, 
  TabsTrigger, 
  TabsContent 
} from '@/components/ui/tabs';

const App = () => {
  const [loginOpen, setLoginOpen] = useState(false);
  const [joinOpen, setJoinOpen] = useState(false);

  // Sample data for prizes and features
  const prizes = [
    { name: "Cash Prizes", value: "₹1,000 to ₹50,000", icon: Gift, color: "text-green-600" },
    { name: "Gold Items", value: "1g to 50g Gold", icon: Gift, color: "text-yellow-600" },
    { name: "Electronics", value: "Smartphones, TVs & more", icon: Gift, color: "text-blue-600" },
    { name: "Vehicles", value: "Motorcycles & Cars", icon: Gift, color: "text-red-600" },
    { name: "Home Appliances", value: "Fridge, Washing Machine", icon: Gift, color: "text-purple-600" },
    { name: "Grand Prize", value: "1BHK Flat", icon: Gift, color: "text-pink-600" }
  ];

  const features = [
    { title: "Guaranteed Winners", description: "Weekly draws with guaranteed winners", icon: Gift },
    { title: "Trusted Since 2010", description: "15 years of successful operations", icon: Gift },
    { title: "Transparent Draws", description: "Live draws every Thursday", icon: Gift },
    { title: "Multiple Prizes", description: "60 weeks of amazing prizes", icon: Gift }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b-4 border-red-600">
        <div className="container mx-auto px-4 py-4">
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
                  <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-50 bg-transparent">
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
                    <Button className="w-full bg-red-600 hover:bg-red-700">
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
        <div className="container mx-auto px-4 relative z-10">
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
                    <Button size="lg" className="bg-red-600 hover:bg-red-700 text-lg px-8 py-4">
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

                <Button
                  variant="outline"
                  size="lg"
                  className="border-red-600 text-red-600 hover:bg-red-50 text-lg px-8 py-4 bg-transparent"
                >
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
                  src="/placeholder.svg?height=400&width=600"
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
        <div className="container mx-auto px-4">
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
        <div className="container mx-auto px-4">
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
                      src="/placeholder.svg?height=600&width=500"
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
                      src="/placeholder.svg?height=600&width=500"
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
                      src="/placeholder.svg?height=600&width=500"
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
                      src="/placeholder.svg?height=600&width=500"
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
                      src="/placeholder.svg?height=400&width=500"
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
        <div className="container mx-auto px-4">
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
        <div className="container mx-auto px-4 text-center">
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
                  <Button className="w-full bg-red-600 hover:bg-red-700">
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
        <div className="container mx-auto px-4">
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
  );
};

export default App;
"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plane, MapPin, Users, Mail, Phone, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-orange-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Image
              src="/logo.png"
              alt="Stamped in Style Travel Co."
              width={60}
              height={60}
              className="object-contain"
            />
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-amber-700">Stamped in Style</h1>
              <p className="text-sm text-amber-600">Travel Co.</p>
            </div>
          </div>
          <nav className="hidden md:flex space-x-6">
            <Link href="#home" className="text-slate-700 hover:text-amber-600 transition-colors">
              Home
            </Link>
            <Link href="#about" className="text-slate-700 hover:text-amber-600 transition-colors">
              About
            </Link>
            <Link href="#testimonials" className="text-slate-700 hover:text-amber-600 transition-colors">
              Testimonials
            </Link>
            <Link href="#booking" className="text-slate-700 hover:text-amber-600 transition-colors">
              Book Now
            </Link>
            <Link href="#contact" className="text-slate-700 hover:text-amber-600 transition-colors">
              Contact
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-teal-300/20 to-orange-400/20"></div>
        {/* Ocean Background Image */}
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center opacity-40"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1505142468610-359e7d316be0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
          }}
        ></div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="mb-8">
            <Image
              src="/logo.png"
              alt="Stamped in Style Travel Co."
              width={200}
              height={200}
              className="mx-auto object-contain"
            />
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-slate-800 mb-6">Stamped in Style</h1>
          <p className="text-xl md:text-2xl text-amber-700 font-semibold mb-8">Where Your Journey Begins</p>

          <p className="text-lg text-slate-700 mb-8 max-w-2xl mx-auto leading-relaxed">
            Welcome to your passport to extraordinary adventures. We're a woman-owned travel company built on a love for
            exploration and a commitment to creating unforgettable experiences. From intimate getaways to grand
            adventures, we're just getting started—but we're going big.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-orange-400 to-pink-400 hover:from-orange-500 hover:to-pink-500 text-white px-8 py-3 text-lg"
              onClick={() => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })}
            >
              <Plane className="mr-2 h-5 w-5" />
              Send Booking Inquiry
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-amber-600 text-amber-700 hover:bg-amber-50 px-8 py-3 text-lg bg-transparent"
              onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
            >
              Learn More
            </Button>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 opacity-20">
          <Plane className="h-12 w-12 text-amber-600 transform rotate-45" />
        </div>
        <div className="absolute bottom-20 right-10 opacity-20">
          <MapPin className="h-10 w-10 text-teal-600" />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">About Me</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-pink-400 mx-auto"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="bg-gradient-to-br from-blue-100 to-orange-100 rounded-2xl p-8 h-80 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Users className="h-12 w-12 text-white" />
                    </div>
                    <p className="text-slate-600 italic">{"Your travel story starts here"}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <p className="text-lg text-slate-700 leading-relaxed">
                  Hi! I'm the founder of Stamped in Style Travel Company, and I'm absolutely passionate about travel.
                  People literally stop me in Walmart asking where I'm headed next—I guess I'm a walking billboard for
                  wanderlust!
                </p>

                <p className="text-lg text-slate-700 leading-relaxed">
                  What started as a personal love for exploration has grown into a vision to help others discover the
                  world in style. My dream is to eventually manage a team of travel agents, retire from my day job, and
                  send clients to incredible destinations around the globe.
                </p>

                <p className="text-lg text-slate-700 leading-relaxed">
                  I'm already planning multi-week group trips to amazing destinations like Africa, and I can't wait to
                  share these adventures with fellow travelers who appreciate the finer things in life.
                </p>

                <div className="flex flex-wrap gap-4 pt-4">
                  <div className="flex items-center text-amber-700">
                    <Star className="h-5 w-5 mr-2" />
                    <span className="font-semibold">Woman-Owned Business</span>
                  </div>
                  <div className="flex items-center text-teal-700">
                    <MapPin className="h-5 w-5 mr-2" />
                    <span className="font-semibold">Global Destinations</span>
                  </div>
                  <div className="flex items-center text-pink-700">
                    <Users className="h-5 w-5 mr-2" />
                    <span className="font-semibold">Group & Private Travel</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gradient-to-r from-blue-50 to-orange-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">What Our Travelers Say</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-pink-400 mx-auto mb-6"></div>
            <p className="text-lg text-slate-600">Coming soon - amazing stories from our adventurous clients!</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full flex items-center justify-center">
                      <Star className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-slate-800">Coming Soon</CardTitle>
                      <CardDescription>Future Client Review</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 italic">
                    {"Your amazing travel story could be featured here! Book your next adventure with us."}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Inquiry Form */}
      <section id="booking" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Start Your Journey</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-pink-400 mx-auto mb-6"></div>
              <p className="text-lg text-slate-600">Tell us about your dream destination and we'll make it happen!</p>
            </div>

            <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-blue-50/50">
              <CardHeader>
                <CardTitle className="text-2xl text-center text-slate-800">Booking Inquiry Form</CardTitle>
                <CardDescription className="text-center">
                  Share your travel dreams with us - no commitment required!
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="Your first name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Your last name" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="your@email.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" type="tel" placeholder="(555) 123-4567" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="destination">Dream Destination</Label>
                  <Input id="destination" placeholder="Where would you like to go?" />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="travelers">Number of Travelers</Label>
                    <Input id="travelers" type="number" placeholder="2" min="1" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dates">Preferred Dates</Label>
                    <Input id="dates" placeholder="Flexible / Summer 2024" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="details">Tell us more about your dream trip</Label>
                  <Textarea
                    id="details"
                    placeholder="What kind of experience are you looking for? Any special occasions or preferences?"
                    rows={4}
                  />
                </div>

                <Button className="w-full bg-gradient-to-r from-orange-400 to-pink-400 hover:from-orange-500 hover:to-pink-500 text-white py-3 text-lg">
                  <Plane className="mr-2 h-5 w-5" />
                  Send My Travel Inquiry
                </Button>

                <p className="text-sm text-slate-500 text-center">
                  We respect your privacy and will never share your information. This inquiry is completely free with no
                  obligation.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-r from-blue-50 to-orange-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Get In Touch</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-pink-400 mx-auto mb-6"></div>
              <p className="text-lg text-slate-600">
                Ready to start planning your next adventure? We'd love to hear from you!
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl text-slate-800">Contact Information</CardTitle>
                  <CardDescription>Reach out to us anytime</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-amber-600" />
                    <span className="text-slate-700">hello@stampedinstyle.com</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-amber-600" />
                    <span className="text-slate-700">Coming Soon</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-amber-600" />
                    <span className="text-slate-700">Serving Travelers Worldwide</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl text-slate-800">Quick Message</CardTitle>
                  <CardDescription>Send us a quick note</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input placeholder="Your Name" />
                  <Input type="email" placeholder="Your Email" />
                  <Textarea placeholder="Your Message" rows={4} />
                  <Button className="w-full bg-gradient-to-r from-orange-400 to-pink-400 hover:from-orange-500 hover:to-pink-500 text-white">
                    Send Message
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <Image
                src="/logo.png"
                alt="Stamped in Style Travel Co."
                width={50}
                height={50}
                className="object-contain brightness-0 invert"
              />
              <div>
                <h3 className="text-lg font-bold">Stamped in Style</h3>
                <p className="text-sm text-slate-300">Travel Co.</p>
              </div>
            </div>

            <div className="text-center md:text-right">
              <p className="text-slate-300 mb-2">Where Your Journey Begins</p>
              <p className="text-sm text-slate-400">
                © {new Date().getFullYear()} Stamped in Style Travel Company. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

"use client"

import { Button } from "@/components/ui/button"
import { ChevronDown, Menu, X, User, MapPin, Hammer, Route, Image as ImageIcon, ArrowRight, Mail, Phone, ChevronUp, Settings } from "lucide-react"
import Link from "next/link"
import AnimatedLogo from "@/components/animated-logo"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect, useRef } from "react"
import BookingModal from "@/components/booking-modal"

export default function HomePage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [isContactDropdownOpen, setIsContactDropdownOpen] = useState(false)
  const [isContactFormOpen, setIsContactFormOpen] = useState(false)
  const [contactForm, setContactForm] = useState({
    email: '',
    request: ''
  })
  const [isScreensaverActive, setIsScreensaverActive] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isGetStartedDropdownOpen, setIsGetStartedDropdownOpen] = useState(false)

  const contactDropdownRef = useRef<HTMLDivElement>(null)
  const getStartedDropdownRef = useRef<HTMLDivElement>(null)

  // Screensaver images - you can add more images here
  const screensaverImages = [
    '/hero-desert.jpg',
    '/about-hero.jpg',
    // Add more images as needed
  ]

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (contactDropdownRef.current && !contactDropdownRef.current.contains(event.target as Node)) {
        setIsContactDropdownOpen(false)
      }
      if (getStartedDropdownRef.current && !getStartedDropdownRef.current.contains(event.target as Node)) {
        setIsGetStartedDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Screensaver timer effect
  useEffect(() => {
    let screensaverTimer: NodeJS.Timeout
    let imageInterval: NodeJS.Timeout

    const resetTimer = () => {
      clearTimeout(screensaverTimer)
      setIsScreensaverActive(false)
      screensaverTimer = setTimeout(() => {
        setIsScreensaverActive(true)
        // Start image carousel
        imageInterval = setInterval(() => {
          setCurrentImageIndex((prev) => (prev + 1) % screensaverImages.length)
        }, 3000) // Change image every 3 seconds
      }, 120000) // 2 minutes
    }

    // Reset timer on any user interaction
    const handleUserActivity = () => {
      resetTimer()
    }

    // Start initial timer
    resetTimer()

    // Add event listeners for user activity
    document.addEventListener('mousemove', handleUserActivity)
    document.addEventListener('mousedown', handleUserActivity)
    document.addEventListener('keydown', handleUserActivity)
    document.addEventListener('touchstart', handleUserActivity)
    document.addEventListener('scroll', handleUserActivity)

    return () => {
      clearTimeout(screensaverTimer)
      clearInterval(imageInterval)
      document.removeEventListener('mousemove', handleUserActivity)
      document.removeEventListener('mousedown', handleUserActivity)
      document.removeEventListener('keydown', handleUserActivity)
      document.removeEventListener('touchstart', handleUserActivity)
      document.removeEventListener('scroll', handleUserActivity)
    }
  }, [screensaverImages.length])

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Here you would integrate with your SMS service (Twilio, etc.)
    // For now, we'll just log the submission
    console.log('Contact form submitted:', contactForm)
    
    // Reset form and close
    setContactForm({ email: '', request: '' })
    setIsContactFormOpen(false)
    setIsContactDropdownOpen(false)
    
    // You could add a toast notification here
    alert('Thank you for your message! We will get back to you soon.')
  }

  const menuItems = [
    { name: "ABOUT", href: "/about", icon: User, description: "Discover our story and mission" },
    { name: "CURATED", href: "/curated", icon: MapPin, description: "Handpicked luxury experiences" },
    { name: "BUILD", href: "/build", icon: Hammer, description: "Create your perfect journey" },
    { name: "OUR JOURNEY", href: "/journey", icon: Route, description: "Follow our travel adventures" },
    { name: "GALLERY", href: "/gallery", icon: ImageIcon, description: "Visual stories from around the world" },
  ]

  return (
    <div className="h-screen relative overflow-hidden">
      {/* Background Video/Image */}
      <div className="absolute inset-0">
        <Image
          src="https://evvwwutmvhekkcfimedq.supabase.co/storage/v1/object/public/main/pexels-asadphoto-1450353.jpg"
          alt="Luxury Travel Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Header */}
      <header className="relative z-50 w-full">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <div className="w-16 h-16 rounded-full border-white/30 flex items-center justify-center backdrop-blur-sm border-0 bg-transparent">
                <Image
                  src="/complete-logo.png"
                  alt="Stamped in Style Travel Co."
                  width={160}
                  height={160}
                  className="object-contain"
                />
              </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center space-x-6">
              {/* Language Selector */}
              <div className="hidden md:flex items-center space-x-1 text-white">
                <span className="text-sm font-medium tracking-wide">EN</span>
                <ChevronDown className="h-4 w-4" />
              </div>

              {/* Mobile Menu */}
              <Button
                variant="ghost"
                size="icon"
                className="w-12 h-12 rounded-full border-2 border-white/30 text-white hover:bg-white/10"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Full Screen Menu Modal */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/95 backdrop-blur-md z-50"
            >
              <div className="flex h-full">
                {/* Left Side - Icons */}
                <div className="w-1/2 flex flex-col justify-center items-center space-y-12">
                  {menuItems.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="group cursor-pointer relative h-20 flex items-center"
                      onMouseEnter={() => setHoveredItem(item.name)}
                      onMouseLeave={() => setHoveredItem(null)}
                      onClick={() => {
                        setIsMobileMenuOpen(false)
                        window.location.href = item.href
                      }}
                    >
                      {/* Invisible hover area for better subtitle animation */}
                      <div className="absolute inset-0 -m-8 z-10" />
                      
                      <motion.div
                        whileHover={{ 
                          scale: 1.1, 
                          rotate: 5,
                          filter: "drop-shadow(0 0 20px rgba(251, 191, 36, 0.6))"
                        }}
                        className={`w-16 h-16 flex items-center justify-center transition-all duration-300 -mt-16 ${
                          hoveredItem && hoveredItem !== item.name ? 'opacity-30' : 'opacity-100'
                        }`}
                      >
                        <motion.div
                          whileHover={{ 
                            scale: 1.2,
                            filter: "drop-shadow(0 0 15px rgba(251, 191, 36, 0.8))"
                          }}
                          className="text-white group-hover:text-amber-200 transition-all duration-300"
                        >
                          <item.icon className="h-8 w-8" />
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  ))}
                </div>

                {/* Right Side - Text */}
                <div className="w-1/2 flex flex-col justify-center space-y-8 pr-12">
                  {menuItems.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + 0.2 }}
                      className="group cursor-pointer relative"
                      onMouseEnter={() => setHoveredItem(item.name)}
                      onMouseLeave={() => setHoveredItem(null)}
                      onClick={() => {
                        setIsMobileMenuOpen(false)
                        window.location.href = item.href
                      }}
                    >
                      {/* Invisible hover area for better subtitle animation */}
                      <div className="absolute inset-0 -m-4 z-10" />
                      
                      <div className="flex items-center space-x-4">
                        <motion.h3
                          whileHover={{ x: 10 }}
                          className={`text-4xl font-light text-white group-hover:text-amber-200 transition-all duration-300 uppercase tracking-wider ${
                            hoveredItem && hoveredItem !== item.name ? 'opacity-30' : 'opacity-100'
                          }`}
                        >
                          {item.name}
                        </motion.h3>
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          whileHover={{ opacity: 1, x: 0 }}
                          className="opacity-0 group-hover:opacity-100 transition-all duration-300"
                        >
                          <ArrowRight className="h-6 w-6 text-amber-200" />
                        </motion.div>
                      </div>
                      <motion.p
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        className={`text-amber-200/80 text-lg mt-2 font-light ${
                          hoveredItem && hoveredItem !== item.name ? 'opacity-30' : 'opacity-100'
                        }`}
                      >
                        {item.description}
                      </motion.p>
                    </motion.div>
                  ))}
                  
                  {/* Contact Us Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="pt-4 relative"
                    ref={contactDropdownRef}
                    onMouseEnter={() => setHoveredItem('contact')}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    {/* Contact Dropdown Button */}
                    <Button 
                      className={`bg-transparent border-2 border-amber-200 text-amber-200 hover:bg-amber-200 hover:text-amber-900 px-8 py-4 rounded-full font-medium tracking-wide text-sm uppercase transition-all duration-300 group ${
                        hoveredItem && hoveredItem !== 'contact' ? 'opacity-30' : 'opacity-100'
                      }`}
                      onClick={() => setIsContactDropdownOpen(!isContactDropdownOpen)}
                    >
                      <Mail className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform duration-300" />
                      <span>CONTACT US</span>
                      <ChevronDown className={`h-4 w-4 ml-2 transition-transform duration-300 ${
                        isContactDropdownOpen ? 'rotate-180' : ''
                      }`} />
                    </Button>

                    {/* Contact Dropdown Menu */}
                    <AnimatePresence>
                      {isContactDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.95 }}
                          className="absolute top-full left-0 mt-2 w-64 bg-black/90 backdrop-blur-md border border-amber-200/30 rounded-lg shadow-xl z-50"
                        >
                          <div className="p-2 space-y-1">
                            {/* Phone Option */}
                            <button
                              onClick={() => {
                                window.location.href = 'facetime:404-973-9860'
                                setIsContactDropdownOpen(false)
                              }}
                              className="w-full flex items-center space-x-3 px-4 py-3 text-white hover:bg-amber-200/20 rounded-md transition-colors duration-200 group"
                            >
                              <Phone className="h-5 w-5 text-amber-200 group-hover:scale-110 transition-transform duration-200" />
                              <span className="font-medium">Call via FaceTime</span>
                            </button>
                            
                            {/* Email Option */}
                            <button
                              onClick={() => {
                                setIsContactFormOpen(true)
                                setIsContactDropdownOpen(false)
                              }}
                              className="w-full flex items-center space-x-3 px-4 py-3 text-white hover:bg-amber-200/20 rounded-md transition-colors duration-200 group"
                            >
                              <Mail className="h-5 w-5 text-amber-200 group-hover:scale-110 transition-transform duration-200" />
                              <span className="font-medium">Send Email</span>
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Contact Form Modal */}
                    <AnimatePresence>
                      {isContactFormOpen && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex items-center justify-center p-6"
                        >
                          <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-black/90 border border-amber-200/30 rounded-lg p-8 max-w-md w-full"
                          >
                            <div className="flex items-center justify-between mb-6">
                              <h3 className="text-2xl font-light text-white">Contact Us</h3>
                              <button
                                onClick={() => setIsContactFormOpen(false)}
                                className="text-white/60 hover:text-white transition-colors duration-200"
                              >
                                <X className="h-6 w-6" />
                              </button>
                            </div>
                            
                            <form onSubmit={handleContactSubmit} className="space-y-4">
                              <div>
                                <label htmlFor="email" className="block text-sm font-medium text-amber-200 mb-2">
                                  Email Address
                                </label>
                                <input
                                  type="email"
                                  id="email"
                                  required
                                  value={contactForm.email}
                                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-amber-200 transition-colors duration-200"
                                  placeholder="your@email.com"
                                />
                              </div>
                              
                              <div>
                                <label htmlFor="request" className="block text-sm font-medium text-amber-200 mb-2">
                                  Your Request
                                </label>
                                <textarea
                                  id="request"
                                  required
                                  rows={4}
                                  value={contactForm.request}
                                  onChange={(e) => setContactForm({ ...contactForm, request: e.target.value })}
                                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-amber-200 transition-colors duration-200 resize-none"
                                  placeholder="Tell us about your travel plans..."
                                />
                              </div>
                              
                              <div className="flex space-x-3 pt-4">
                                <Button
                                  type="button"
                                  variant="outline"
                                  onClick={() => setIsContactFormOpen(false)}
                                  className="flex-1 border-amber-200/30 text-amber-200 hover:bg-amber-200/20"
                                >
                                  Cancel
                                </Button>
                                <Button
                                  type="submit"
                                  className="flex-1 bg-amber-200 text-amber-900 hover:bg-amber-100"
                                >
                                  Send Message
                                </Button>
                              </div>
                            </form>
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                  
                  {/* Get Started Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="pt-4 relative"
                    ref={getStartedDropdownRef}
                    onMouseEnter={() => setHoveredItem('get-started')}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    {/* Get Started Dropdown Button */}
                    <Button 
                      className={`bg-white text-amber-900 hover:bg-amber-100 px-8 py-4 rounded-full font-medium tracking-wide text-sm uppercase transition-all duration-300 group ${
                        hoveredItem && hoveredItem !== 'get-started' ? 'opacity-30' : 'opacity-100'
                      }`}
                      onClick={() => setIsGetStartedDropdownOpen(!isGetStartedDropdownOpen)}
                    >
                      <span>GET STARTED</span>
                      <ChevronDown className={`h-4 w-4 ml-2 transition-transform duration-300 ${
                        isGetStartedDropdownOpen ? 'rotate-180' : ''
                      }`} />
                    </Button>

                    {/* Get Started Dropdown Menu */}
                    <AnimatePresence>
                      {isGetStartedDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.95 }}
                          className="absolute top-full left-0 mt-2 w-64 bg-black/90 backdrop-blur-md border border-white/30 rounded-lg shadow-xl z-50"
                        >
                          <div className="p-2 space-y-1">
                            {/* User Option */}
                            <button
                              onClick={() => {
                                window.location.href = '/dashboard/client'
                                setIsGetStartedDropdownOpen(false)
                              }}
                              className="w-full flex items-center space-x-3 px-4 py-3 text-white hover:bg-white/20 rounded-md transition-colors duration-200 group"
                            >
                              <User className="h-5 w-5 text-amber-200 group-hover:scale-110 transition-transform duration-200" />
                              <span className="font-medium">Client Dashboard</span>
                            </button>
                            
                            {/* Admin Option */}
                            <button
                              onClick={() => {
                                window.location.href = '/dashboard/admin'
                                setIsGetStartedDropdownOpen(false)
                              }}
                              className="w-full flex items-center space-x-3 px-4 py-3 text-white hover:bg-white/20 rounded-md transition-colors duration-200 group"
                            >
                              <Settings className="h-5 w-5 text-amber-200 group-hover:scale-110 transition-transform duration-200" />
                              <span className="font-medium">Admin Dashboard</span>
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>
              </div>

              {/* Close Button */}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="absolute top-8 right-8 w-12 h-12 rounded-full border-2 border-white/30 text-white hover:bg-white/10 flex items-center justify-center transition-all duration-300"
              >
                <X className="h-5 w-5" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Content */}
      <div className="relative z-10 flex items-center justify-center h-screen pt-0">
        <div className="text-center px-6 max-w-5xl mx-auto">
          {/* Subtitle */}
          <p className="text-white/90 text-sm md:text-base font-medium tracking-[0.3em] uppercase mb-8">
            LUXURY TRAVEL EXPERIENCES WORLDWIDE
          </p>

          {/* Large Logo */}
          <div className="mb-16">
            <Image
              src="/complete-logo.png"
              alt="Stamped in Style Travel Co."
              width={400}
              height={400}
              className="object-contain mx-auto"
            />
          </div>

          {/* CTA Button */}
          <Button
            asChild
            size="lg"
            className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-amber-900 px-12 py-4 text-base font-medium tracking-[0.1em] uppercase rounded-full transition-all duration-300"
            onClick={() => setIsBookingModalOpen(true)}
          >
            <button>
              REQUEST A QUOTE
            </button>
          </Button>
        </div>
      </div>

      {/* Screensaver Overlay */}
      <AnimatePresence>
        {isScreensaverActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-40 pointer-events-none"
          >
            {/* Telescope Effect - Circular Viewport */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                {/* Background Image with Telescope Mask */}
                <div className="w-96 h-96 rounded-full overflow-hidden relative">
                  <Image
                    src={screensaverImages[currentImageIndex]}
                    alt="Screensaver"
                    width={384}
                    height={384}
                    className="object-cover w-full h-full"
                  />
                </div>
                
                {/* Telescope Frame */}
                <div className="absolute inset-0 w-96 h-96 rounded-full border-8 border-amber-200/30 shadow-[0_0_50px_rgba(251,191,36,0.5)]" />
                
                {/* Telescope Crosshairs */}
                <div className="absolute inset-0 w-96 h-96">
                  <div className="absolute top-1/2 left-0 w-full h-px bg-amber-200/50 transform -translate-y-1/2" />
                  <div className="absolute left-1/2 top-0 w-px h-full bg-amber-200/50 transform -translate-x-1/2" />
                </div>
              </div>
            </div>
            
            {/* Text Overlay in Telescope View */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center text-white z-50">
                <h2 className="text-3xl font-light mb-2 tracking-wide">
                  Welcome to <span className="text-amber-200 font-medium">Stamped in Style</span>
                </h2>
                <p className="text-xl text-amber-200/80 italic">Earth to Ether</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hidden sections for navigation (can be revealed later) */}
      <div className="hidden">
        <section id="curated"></section>
        <section id="build"></section>
        <section id="journey"></section>
        <section id="gallery"></section>
        <section id="booking"></section>
      </div>

      {/* Footer */}
      <footer className="bg-amber-900 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-6 mb-8 lg:mb-0">
              <AnimatedLogo size={60} showText={true} />
              <div className="text-center lg:text-left">
                <p className="text-amber-200 script-font text-lg font-medium">Where Your Journey Begins</p>
              </div>
            </div>

            <div className="text-center lg:text-right">
              <p className="text-sm text-amber-300 font-light">
                © {new Date().getFullYear()} Stamped in Style Travel Company. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Booking Modal */}
      <BookingModal 
        isOpen={isBookingModalOpen} 
        onClose={() => setIsBookingModalOpen(false)} 
      />
    </div>
  )
}

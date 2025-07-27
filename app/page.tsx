"use client"

import { Button } from "@/components/ui/button"
import { ChevronDown, Menu, X, User, MapPin, Hammer, Route, Image as ImageIcon, ArrowRight } from "lucide-react"
import Link from "next/link"
import AnimatedLogo from "@/components/animated-logo"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import BookingModal from "@/components/booking-modal"

export default function HomePage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)

  const menuItems = [
    { name: "ABOUT", href: "/about", icon: User, description: "Discover our story and mission" },
    { name: "CURATED", href: "/curated", icon: MapPin, description: "Handpicked luxury experiences" },
    { name: "BUILD", href: "/build", icon: Hammer, description: "Create your perfect journey" },
    { name: "OUR JOURNEY", href: "#journey", icon: Route, description: "Follow our travel adventures" },
    { name: "GALLERY", href: "#gallery", icon: ImageIcon, description: "Visual stories from around the world" },
  ]

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://evvwwutmvhekkcfimedq.supabase.co/storage/v1/object/public/main//pexels-asadphoto-1450353.jpg')",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-pink-300/50 via-rose-400/50 to-pink-300/40"></div>
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
                      className="group cursor-pointer"
                      onClick={() => {
                        setIsMobileMenuOpen(false)
                        // Add navigation logic here if needed
                      }}
                    >
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-sm group-hover:bg-white/20 transition-all duration-300"
                      >
                        <item.icon className="h-8 w-8 text-white group-hover:text-amber-200 transition-colors duration-300" />
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
                      className="group cursor-pointer"
                      onClick={() => {
                        setIsMobileMenuOpen(false)
                        // Add navigation logic here if needed
                      }}
                    >
                      <div className="flex items-center space-x-4">
                        <motion.h3
                          whileHover={{ x: 10 }}
                          className="text-4xl font-light text-white group-hover:text-amber-200 transition-colors duration-300 uppercase tracking-wider"
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
                        className="text-amber-200/80 text-lg mt-2 font-light"
                      >
                        {item.description}
                      </motion.p>
                    </motion.div>
                  ))}
                  
                  {/* Get Started Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="pt-8"
                  >
                    <Button 
                      className="bg-white text-amber-900 hover:bg-amber-100 px-8 py-4 rounded-full font-medium tracking-wide text-sm uppercase transition-all duration-300" 
                      asChild
                    >
                      <Link href="/dashboard/client">GET STARTED</Link>
                    </Button>
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
      <div className="relative z-10 flex items-center justify-center min-h-screen pt-0">
        <div className="text-center px-6 max-w-5xl mx-auto">
          {/* Subtitle */}
          <p className="text-white/90 text-sm md:text-base font-medium tracking-[0.3em] uppercase mb-8">
            LUXURY TRAVEL EXPERIENCES WORLDWIDE
          </p>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-light text-white mb-16 leading-[0.9] tracking-tight">
            Welcome to{" "}
            <span className="block">
              <span className="script-font font-medium text-amber-200">Stamped in Style</span>:{" "}
              <span className="italic font-light">Earth to Ether</span>
            </span>
          </h1>

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

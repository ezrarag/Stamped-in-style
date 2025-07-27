"use client"

import { Button } from "@/components/ui/button"
import { ChevronDown, Menu, X } from "lucide-react"
import Link from "next/link"
import PageTransition from "@/components/page-transition"
import { useState, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"

export default function AboutPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [selectedCard, setSelectedCard] = useState<number | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const scrollRef = useRef(null)
  const isInView = useInView(scrollRef, { once: false, margin: "-50%" })

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  }

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  // Animation for the scroll indicator - now based on scroll position
  const scrollIndicatorAnimation = {
    initial: { y: 0, opacity: 0.8 },
    animate: isInView
      ? {
          y: [0, -10, 0],
          opacity: [0.8, 1, 0.8],
          transition: {
            duration: 2.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          },
        }
      : {
          y: 20,
          opacity: 0,
          transition: {
            duration: 0.8,
            ease: "easeOut",
          },
        },
  }

  const handleCardClick = (cardIndex: number) => {
    setSelectedCard(selectedCard === cardIndex ? null : cardIndex)
  }

  return (
    <PageTransition isLoading={isLoading}>
      <div className="min-h-screen relative overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://gfqhzuqckfxtzqawdcso.supabase.co/storage/v1/object/public/usethisfornow/Stamped/pexels-manpritkalsi-1537086.jpg')",
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40"></div>
        </div>

        {/* Header - Mobile Optimized */}
        <header className="relative z-50 w-full bg-white/10 backdrop-blur-md">
          <div className="container mx-auto px-4 md:px-6 py-3 md:py-4">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <Link href="/" className="flex items-center">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full backdrop-blur-sm border-0 flex items-center justify-center bg-transparent">
                  <img
                    src="/complete-logo.png"
                    alt="Stamped in Style Travel Co."
                    width={120}
                    height={120}
                    className="object-contain"
                  />
                </div>
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center space-x-8">
                <Link
                  href="/about"
                  className="text-white hover:text-amber-200 transition-colors font-medium tracking-wide text-sm uppercase border-b-2 border-amber-200 pb-1"
                >
                  ABOUT
                </Link>
                <Link
                  href="#events"
                  className="text-white/80 hover:text-amber-200 transition-colors font-medium tracking-wide text-sm uppercase"
                >
                  EVENTS
                </Link>
                <Link
                  href="#experiences"
                  className="text-white/80 hover:text-amber-200 transition-colors font-medium tracking-wide text-sm uppercase"
                >
                  EXPERIENCES
                </Link>
                <Link
                  href="#journey"
                  className="text-white/80 hover:text-amber-200 transition-colors font-medium tracking-wide text-sm uppercase"
                >
                  OUR JOURNEY
                </Link>
                <Link
                  href="#press"
                  className="text-white/80 hover:text-amber-200 transition-colors font-medium tracking-wide text-sm uppercase"
                >
                  PRESS MATERIAL
                </Link>
              </nav>

              {/* Right Side */}
              <div className="flex items-center space-x-2 md:space-x-4">
                {/* Language Selector - Hidden on mobile */}
                <div className="hidden md:flex items-center space-x-1 text-white">
                  <span className="text-sm font-medium tracking-wide">EN</span>
                  <ChevronDown className="h-4 w-4" />
                </div>

                {/* Get Tickets Button - Hidden on mobile */}
                <Button className="hidden md:flex bg-white text-amber-900 hover:bg-amber-100 px-6 py-2 rounded-full font-medium tracking-wide text-sm uppercase transition-all duration-300">
                  GET TICKETS
                </Button>

                {/* Mobile Menu Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-10 h-10 md:w-10 md:h-10 rounded-full border-2 border-white/30 text-white hover:bg-white/10"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </div>

          {/* Mobile Menu Overlay */}
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="lg:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-md border-t border-white/10"
            >
              <nav className="container mx-auto px-4 py-6 space-y-4">
                <Link
                  href="/"
                  className="block text-white/80 text-lg font-medium py-3 border-b border-white/10 uppercase tracking-wide"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  HOME
                </Link>
                <Link
                  href="/about"
                  className="block text-white text-lg font-medium py-3 border-b border-white/10 uppercase tracking-wide"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  ABOUT
                </Link>
                <Link
                  href="#events"
                  className="block text-white/80 text-lg font-medium py-3 border-b border-white/10 uppercase tracking-wide"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  EVENTS
                </Link>
                <Link
                  href="#experiences"
                  className="block text-white/80 text-lg font-medium py-3 border-b border-white/10 uppercase tracking-wide"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  EXPERIENCES
                </Link>
                <Link
                  href="#journey"
                  className="block text-white/80 text-lg font-medium py-3 border-b border-white/10 uppercase tracking-wide"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  OUR JOURNEY
                </Link>
                <Link
                  href="#press"
                  className="block text-white/80 text-lg font-medium py-3 border-b border-white/10 uppercase tracking-wide"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  PRESS MATERIAL
                </Link>
                <div className="pt-4">
                  <Button className="w-full bg-white text-amber-900 hover:bg-amber-100 py-3 rounded-full font-medium tracking-wide text-sm uppercase">
                    GET TICKETS
                  </Button>
                </div>
              </nav>
            </motion.div>
          )}
        </header>

        {/* Hero Section - Mobile Optimized */}
        <div className="relative z-10 flex flex-col justify-between min-h-[70vh] md:min-h-screen">
          {/* Breadcrumb */}
          <div className="container mx-auto px-4 md:px-6 pt-4 md:pt-8">
            <nav className="text-white/80 text-xs md:text-sm font-light tracking-wider uppercase">
              <Link href="/" className="hover:text-white transition-colors">
                HOME
              </Link>
              <span className="mx-2">/</span>
              <span className="text-white">ABOUT US</span>
            </nav>
          </div>

          {/* Hero Content */}
          <div className="container mx-auto px-4 md:px-6 flex-1 flex items-center">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-white mb-6 md:mb-8 leading-[0.9] tracking-tight">
                About Us
              </h1>
              <div className="w-16 md:w-24 h-1 bg-white mb-6 md:mb-8"></div>
              <p className="text-white/90 text-base md:text-lg lg:text-xl font-light leading-relaxed max-w-xl">
                Discover the essence of luxury travel through our curated experiences that blend authentic cultural
                immersion with unparalleled comfort and style.
              </p>
            </div>
          </div>

          {/* Animated Scroll Indicator */}
          <div className="container mx-auto px-4 md:px-6 pb-6 md:pb-8" ref={scrollRef}>
            <div className="flex justify-center md:justify-end">
              <motion.div
                className="text-white/80 text-xs md:text-sm font-light tracking-wider uppercase"
                initial="initial"
                animate="animate"
                variants={scrollIndicatorAnimation}
              >
                SCROLL TO DISCOVER
              </motion.div>
            </div>
          </div>
        </div>

        {/* UAE Flag - Hidden on mobile */}
        <div className="hidden md:block absolute top-32 right-8 z-20">
          <div className="w-16 h-12 bg-gradient-to-b from-red-500 via-white to-black rounded shadow-lg"></div>
        </div>
      </div>

      {/* Section 2 - About the Founder - Mobile Optimized */}
      <motion.section
        className="py-12 md:py-20 bg-gradient-to-b from-amber-50 to-white"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
            {/* Left Column - Text */}
            <motion.div variants={fadeInUp} className="space-y-4 md:space-y-6 order-2 lg:order-1">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-amber-900 mb-6 md:mb-8">
                About stamped's founder
              </h2>

              <div className="space-y-4 md:space-y-6 text-gray-700 leading-relaxed">
                <p className="text-base md:text-lg">
                Hello, I am Amber Harris. I am the founder, CEO, and lead curator or Stamped in Style Travel Group. With a passion for adventure, culture, and unforgettable experiences. I launched Stamped in Style Travel Group to help people explore the world with confidence, ease, and a touch of style. 
                </p>

                <p className="text-base md:text-lg">
                At Stamped in Style Travel Group, we specialize in crafting personalized travel experiences that go beyond the typical itinerary.  Whether you’re planning a luxurious getaway, a group retreat, a romantic escape, or a once-in-a- lifetime adventure, I’m here to ensure every detail is handled with care and creativity. 
                </p>

                <p className="text-base md:text-lg">
                While this is a new business venture I have launched, with my planning expertise and a deep commitment to exceptional service, I believe that travel should be more than just a trip. It should be a memory that stays with you forever. Let’s turn your travel dreams into reality, one STAMP at a TIME!!! 
                </p>
              </div>
            </motion.div>

            {/* Right Column - Automatic Scrolling Gallery */}
            <motion.div variants={fadeInUp} className="relative order-1 lg:order-2">
              <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-2xl relative">
                {/* Automatic Image Gallery */}
                <div className="relative w-full h-full">
                  {[
                    "https://gfqhzuqckfxtzqawdcso.supabase.co/storage/v1/object/public/usethisfornow/Stamped/Resized_20250508_095904.jpeg",
                    "https://gfqhzuqckfxtzqawdcso.supabase.co/storage/v1/object/public/usethisfornow/Stamped/Messenger_creation_23E42D18-C44D-4F89-81F0-1A9096BE6C99.jpeg",
                  ].map((src, index) => (
                    <motion.div
                      key={index}
                      className="absolute inset-0"
                      initial={{ opacity: index === 0 ? 1 : 0 }}
                      animate={{
                        opacity: [1, 1, 0, 0],
                        scale: [1, 1.05, 1.05, 1],
                      }}
                      transition={{
                        duration: 8,
                        delay: index * 4,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatDelay: 0,
                        ease: "easeInOut",
                      }}
                    >
                      <img
                        src={src || "/placeholder.svg"}
                        alt={`UAE Expo Office ${index + 1}`}
                        className="object-cover w-full h-full"
                        loading={index === 0 ? "eager" : "lazy"}
                      />
                    </motion.div>
                  ))}

                  {/* Subtle overlay for better text readability if needed */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none"></div>
                </div>
              </div>
              {/* Decorative element - Hidden on mobile */}
              <div className="hidden md:block absolute -bottom-6 -right-6 w-24 h-24 bg-amber-200 rounded-full opacity-20"></div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Section 3 - Vision & Purpose - Redesigned to match UAE Pavilion style */}
      <motion.section
        className="py-12 md:py-20 bg-amber-50 min-h-screen flex items-center"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-4 md:px-6 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
            {/* Vision Column */}
            <motion.div variants={fadeInUp} className="relative">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                {/* Image */}
                <div className="relative h-64 lg:h-80">
                  <img
                    src="https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    alt="Modern terraced garden landscape"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Title */}
                <div className="p-6 lg:p-8 text-center">
                  <h3 className="text-3xl lg:text-4xl font-serif text-gray-900 font-semibold">
                    Vision
                  </h3>
                </div>
              </div>
            </motion.div>

            {/* Purpose Column */}
            <motion.div variants={fadeInUp} className="relative">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                {/* Image with sculpture */}
                <div className="relative h-64 lg:h-80">
                  <img
                    src="https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    alt="Abstract sculpture with wooden ceiling"
                    className="w-full h-full object-cover"
                  />
                  {/* Overlay text */}
                  <div className="absolute inset-0 bg-black/30 flex flex-col justify-end p-6 lg:p-8">
                    <h3 className="text-3xl lg:text-4xl font-sans text-white font-semibold mb-4">
                      Purpose
                    </h3>
                    <p className="text-white text-sm lg:text-base leading-relaxed">
                      Bring together people and innovations to address challenges facing humanity and nature.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Nominee badge */}
              <div className="absolute top-4 right-4 bg-black text-white px-3 py-2 rounded">
                <div className="text-xs font-bold">W.</div>
                <div className="text-xs rotate-90 transform origin-center">Nominee</div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Footer - Mobile Optimized */}
      <footer className="bg-amber-900 text-white py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center space-y-6 md:space-y-0 md:flex-row md:justify-between">
            <div className="flex flex-col items-center space-y-4 md:flex-row md:space-y-0 md:space-x-6">
              <img
                src="/complete-logo.png"
                alt="Stamped in Style"
                width={50}
                height={50}
                className="object-contain md:w-[60px] md:h-[60px]"
              />
              <div className="text-center md:text-left">
                <p className="text-amber-200 script-font text-base md:text-lg font-medium">Where Your Journey Begins</p>
              </div>
            </div>

            <div className="text-center md:text-right">
              <p className="text-xs md:text-sm text-amber-300 font-light">
                © {new Date().getFullYear()} Stamped in Style Travel Company. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>

    </PageTransition>
  )
}

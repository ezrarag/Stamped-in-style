"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown, Menu, X, MapPin, Calendar, Users, Star } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function JourneyPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const journeyEntries = [
    {
      id: 1,
      title: "Desert Dreams in Morocco",
      location: "Sahara Desert, Morocco",
      date: "December 2023",
      description: "An unforgettable journey through the golden dunes of the Sahara, experiencing traditional Berber hospitality under the starlit sky.",
      image: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      highlights: ["Camel trek at sunset", "Traditional music around campfire", "Stargazing in the desert"],
      rating: 5
    },
    {
      id: 2,
      title: "Alpine Adventures in Switzerland",
      location: "Zermatt, Switzerland",
      date: "February 2023",
      description: "Skiing the pristine slopes of the Matterhorn, surrounded by breathtaking alpine scenery and luxury mountain hospitality.",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      highlights: ["Ski-in-ski-out luxury resort", "Matterhorn views", "Après-ski fine dining"],
      rating: 5
    },
    {
      id: 3,
      title: "Island Paradise in Maldives",
      location: "Baa Atoll, Maldives",
      date: "October 2023",
      description: "Overwater bungalows, crystal-clear waters, and world-class diving in one of the most beautiful places on earth.",
      image: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      highlights: ["Overwater villa experience", "Snorkeling with manta rays", "Private beach dinners"],
      rating: 5
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-white">
      {/* Header */}
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

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-10 h-10 rounded-full border-2 border-amber-300 text-amber-700 hover:bg-amber-100 flex items-center justify-center transition-all duration-300"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <Link href="/about" className="text-amber-900 hover:text-amber-700 transition-colors duration-300 uppercase tracking-wide text-sm font-medium">ABOUT</Link>
              <Link href="/curated" className="text-amber-900 hover:text-amber-700 transition-colors duration-300 uppercase tracking-wide text-sm font-medium">CURATED</Link>
              <Link href="/build" className="text-amber-900 hover:text-amber-700 transition-colors duration-300 uppercase tracking-wide text-sm font-medium">BUILD</Link>
              <Link href="/journey" className="text-amber-700 border-b-2 border-amber-700 pb-1 uppercase tracking-wide text-sm font-medium">OUR JOURNEY</Link>
              <Link href="/gallery" className="text-amber-900 hover:text-amber-700 transition-colors duration-300 uppercase tracking-wide text-sm font-medium">GALLERY</Link>
            </nav>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden absolute top-full left-0 right-0 bg-white border-t border-amber-100 shadow-lg"
          >
            <nav className="container mx-auto px-6 py-6 space-y-4">
              <Link href="/about" className="block text-amber-900 text-lg font-medium py-3 border-b border-amber-100 uppercase tracking-wide" onClick={() => setIsMobileMenuOpen(false)}>ABOUT</Link>
              <Link href="/curated" className="block text-amber-900/80 text-lg font-medium py-3 border-b border-amber-100 uppercase tracking-wide" onClick={() => setIsMobileMenuOpen(false)}>CURATED</Link>
              <Link href="/build" className="block text-amber-900/80 text-lg font-medium py-3 border-b border-amber-100 uppercase tracking-wide" onClick={() => setIsMobileMenuOpen(false)}>BUILD</Link>
              <Link href="/journey" className="block text-amber-700 text-lg font-medium py-3 border-b border-amber-100 uppercase tracking-wide" onClick={() => setIsMobileMenuOpen(false)}>OUR JOURNEY</Link>
              <Link href="/gallery" className="block text-amber-900/80 text-lg font-medium py-3 border-b border-amber-100 uppercase tracking-wide" onClick={() => setIsMobileMenuOpen(false)}>GALLERY</Link>
            </nav>
          </motion.div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-br from-amber-100 to-amber-200">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl font-light text-amber-900 mb-6"
          >
            Our Journey
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-amber-800 max-w-3xl mx-auto leading-relaxed"
          >
            Follow our travel adventures as we explore the world's most extraordinary destinations, 
            creating unforgettable experiences and discovering hidden gems along the way.
          </motion.p>
        </div>
      </section>

      {/* Journey Entries */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {journeyEntries.map((entry, index) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-64">
                  <Image
                    src={entry.image}
                    alt={entry.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {entry.rating} <Star className="w-4 h-4 inline ml-1" />
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center space-x-2 text-amber-600 text-sm mb-2">
                    <MapPin className="w-4 h-4" />
                    <span>{entry.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-amber-600 text-sm mb-3">
                    <Calendar className="w-4 h-4" />
                    <span>{entry.date}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-amber-900 mb-3">{entry.title}</h3>
                  <p className="text-amber-700 mb-4 leading-relaxed">{entry.description}</p>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold text-amber-800 text-sm">Highlights:</h4>
                    <ul className="space-y-1">
                      {entry.highlights.map((highlight, i) => (
                        <li key={i} className="text-amber-600 text-sm flex items-center">
                          <div className="w-2 h-2 bg-amber-400 rounded-full mr-2"></div>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-amber-50">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-amber-900 mb-6">
              Ready to Start Your Own Journey?
            </h2>
            <p className="text-xl text-amber-800 mb-8">
              Let us help you create unforgettable travel experiences tailored to your dreams and preferences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/build"
                className="bg-amber-600 text-white px-8 py-4 rounded-full font-medium hover:bg-amber-700 transition-colors duration-300 uppercase tracking-wide"
              >
                Start Building
              </Link>
              <Link 
                href="/curated"
                className="bg-transparent border-2 border-amber-600 text-amber-600 px-8 py-4 rounded-full font-medium hover:bg-amber-50 transition-colors duration-300 uppercase tracking-wide"
              >
                View Curated Trips
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

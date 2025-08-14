"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, Menu, X, MapPin, Calendar, Heart, Share2, Download } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function GalleryPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [selectedCategory, setSelectedCategory] = useState("all")

  const galleryImages = [
    {
      id: 1,
      title: "Santorini Sunset",
      location: "Oia, Santorini, Greece",
      date: "July 2023",
      category: "Luxury",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Breathtaking sunset views over the iconic white buildings and blue domes of Santorini."
    },
    {
      id: 2,
      title: "Desert Oasis",
      location: "Sahara Desert, Morocco",
      date: "December 2023",
      category: "Adventure",
      image: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Golden sand dunes stretching as far as the eye can see in the vast Sahara."
    },
    {
      id: 3,
      title: "Alpine Majesty",
      location: "Zermatt, Switzerland",
      date: "February 2023",
      category: "Adventure",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Snow-capped peaks of the Swiss Alps creating a winter wonderland."
    },
    {
      id: 4,
      title: "Tropical Paradise",
      location: "Baa Atoll, Maldives",
      date: "October 2023",
      category: "Luxury",
      image: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Crystal clear turquoise waters and pristine white sand beaches."
    },
    {
      id: 5,
      title: "Cherry Blossom Magic",
      location: "Kyoto, Japan",
      date: "April 2023",
      category: "Cultural",
      image: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Delicate pink cherry blossoms creating a magical spring atmosphere in ancient Kyoto."
    },
    {
      id: 6,
      title: "Wellness Retreat",
      location: "Bali, Indonesia",
      date: "September 2023",
      category: "Wellness",
      image: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Serene spa setting surrounded by lush tropical gardens and peaceful meditation spaces."
    }
  ]

  const categories = ["all", "luxury", "adventure", "cultural", "wellness"]
  
  const filteredImages = selectedCategory === "all" 
    ? galleryImages 
    : galleryImages.filter(img => img.category.toLowerCase() === selectedCategory.toLowerCase())

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
              <Link href="/journey" className="text-amber-900 hover:text-amber-700 transition-colors duration-300 uppercase tracking-wide text-sm font-medium">OUR JOURNEY</Link>
              <Link href="/gallery" className="text-amber-700 border-b-2 border-amber-700 pb-1 uppercase tracking-wide text-sm font-medium">GALLERY</Link>
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
              <Link href="/journey" className="block text-amber-900/80 text-lg font-medium py-3 border-b border-amber-100 uppercase tracking-wide" onClick={() => setIsMobileMenuOpen(false)}>OUR JOURNEY</Link>
              <Link href="/gallery" className="block text-amber-700 text-lg font-medium py-3 border-b border-amber-100 uppercase tracking-wide" onClick={() => setIsMobileMenuOpen(false)}>GALLERY</Link>
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
            Visual Stories
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-amber-800 max-w-3xl mx-auto leading-relaxed"
          >
            Immerse yourself in stunning photography from around the world, 
            capturing the beauty and wonder of our planet's most extraordinary destinations.
          </motion.p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-amber-600 text-white shadow-lg'
                    : 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20 bg-amber-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group cursor-pointer"
                onClick={() => setSelectedImage(image.id)}
              >
                <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <div className="relative h-80">
                    <Image
                      src={image.image}
                      alt={image.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
                    <div className="absolute top-4 right-4 bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {image.category}
                    </div>
                    <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex space-x-2">
                        <button className="p-2 bg-white/90 text-amber-700 rounded-lg hover:bg-white transition-colors">
                          <Heart className="w-4 h-4" />
                        </button>
                        <button className="p-2 bg-white/90 text-amber-700 rounded-lg hover:bg-white transition-colors">
                          <Share2 className="w-4 h-4" />
                        </button>
                        <button className="p-2 bg-white/90 text-amber-700 rounded-lg hover:bg-white transition-colors">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center space-x-2 text-amber-600 text-sm mb-2">
                      <MapPin className="w-4 h-4" />
                      <span>{image.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-amber-600 text-sm mb-3">
                      <Calendar className="w-4 h-4" />
                      <span>{image.date}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-amber-900 mb-3">{image.title}</h3>
                    <p className="text-amber-700 leading-relaxed">{image.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl w-full max-h-[90vh] overflow-hidden rounded-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={galleryImages.find(img => img.id === selectedImage)?.image || ''}
                alt="Gallery Image"
                width={800}
                height={600}
                className="w-full h-auto object-contain"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-white/20 text-white rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Call to Action */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-amber-900 mb-6">
              Ready to Capture Your Own Memories?
            </h2>
            <p className="text-xl text-amber-800 mb-8">
              Let us help you create unforgettable travel experiences that will provide 
              countless photo opportunities and memories to last a lifetime.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/build"
                className="bg-amber-600 text-white px-8 py-4 rounded-full font-medium hover:bg-amber-700 transition-colors duration-300 uppercase tracking-wide"
              >
                Start Planning
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

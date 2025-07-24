"use client"

import { Button } from "@/components/ui/button"
import { ChevronDown, Menu, X } from "lucide-react"
import Link from "next/link"
import AnimatedLogo from "@/components/animated-logo"
import Image from "next/image"
import { motion } from "framer-motion"
import { useState } from "react"

export default function HomePage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-amber-900/70 via-amber-800/60 to-orange-900/70"></div>
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

            {/* Navigation */}
            <nav className="hidden lg:flex items-center space-x-12">
              <Link
                href="/about"
                className="text-white hover:text-amber-200 transition-colors font-medium tracking-wide text-sm uppercase"
              >
                ABOUT
              </Link>
              <Link
                href="#curated"
                className="text-white hover:text-amber-200 transition-colors font-medium tracking-wide text-sm uppercase"
              >
                CURATED
              </Link>
              <Link
                href="/build"
                className="text-white hover:text-amber-200 transition-colors font-medium tracking-wide text-sm uppercase"
              >
                BUILD
              </Link>
              <Link
                href="#journey"
                className="text-white hover:text-amber-200 transition-colors font-medium tracking-wide text-sm uppercase"
              >
                OUR JOURNEY
              </Link>
              <Link
                href="#gallery"
                className="text-white hover:text-amber-200 transition-colors font-medium tracking-wide text-sm uppercase"
              >
                GALLERY
              </Link>
            </nav>

            {/* Right Side */}
            <div className="flex items-center space-x-6">
              {/* Language Selector */}
              <div className="hidden md:flex items-center space-x-1 text-white">
                <span className="text-sm font-medium tracking-wide">EN</span>
                <ChevronDown className="h-4 w-4" />
              </div>

              {/* Get Started Button */}
              <Button className="hidden md:flex bg-transparent border-2 border-white text-white hover:bg-white hover:text-amber-900 px-6 py-2 rounded-full font-medium tracking-wide text-sm uppercase transition-all duration-300" asChild>
                <Link href="/dashboard/client">GET STARTED</Link>
              </Button>

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

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-md border-t border-white/10"
          >
            <nav className="container mx-auto px-6 py-6 space-y-4">
              <Link
                href="/about"
                className="block text-white text-lg font-medium py-3 border-b border-white/10 uppercase tracking-wide"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                ABOUT
              </Link>
              <Link
                href="#curated"
                className="block text-white/80 text-lg font-medium py-3 border-b border-white/10 uppercase tracking-wide"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                CURATED
              </Link>
              <Link
                href="/build"
                className="block text-white/80 text-lg font-medium py-3 border-b border-white/10 uppercase tracking-wide"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                BUILD
              </Link>
              <Link
                href="#journey"
                className="block text-white/80 text-lg font-medium py-3 border-b border-white/10 uppercase tracking-wide"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                OUR JOURNEY
              </Link>
              <Link
                href="#gallery"
                className="block text-white/80 text-lg font-medium py-3 border-b border-white/10 uppercase tracking-wide"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                GALLERY
              </Link>
              <div className="pt-4">
                <Button className="w-full bg-white text-amber-900 hover:bg-amber-100 py-3 rounded-full font-medium tracking-wide text-sm uppercase" asChild>
                  <Link href="/dashboard/client">GET STARTED</Link>
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
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
          >
            <Link href="/dashboard/client">
              EXPERIENCE THE JOURNEY
            </Link>
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
    </div>
  )
}

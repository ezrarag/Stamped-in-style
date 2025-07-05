"use client"

import { Button } from "@/components/ui/button"
import { ChevronDown, Menu } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import PageTransition from "@/components/page-transition"
import { useState, useEffect } from "react"

export default function AboutPage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

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

        {/* Header */}
        <header className="relative z-50 w-full bg-white/10 backdrop-blur-md">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <Link href="/" className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border-0 flex items-center justify-center">
                  <Image
                    src="/complete-logo.png"
                    alt="Stamped in Style Travel Co."
                    width={160}
                    height={160}
                    className="object-contain"
                  />
                </div>
              </Link>

              {/* Navigation */}
              <nav className="hidden lg:flex items-center space-x-8">
                <Link href="/about" className="text-white hover:text-amber-200...">
                  ABOUT
                </Link>
                <Link href="#events" className="text-white/80 hover:text-amber-200...">
                  EVENTS
                </Link>
                <Link href="#experiences" className="text-white/80 hover:text-amber-200...">
                  EXPERIENCES
                </Link>
                <Link href="#journey" className="text-white/80 hover:text-amber-200...">
                  OUR JOURNEY
                </Link>
                <Link href="#press" className="text-white/80 hover:text-amber-200...">
                  PRESS MATERIAL
                </Link>
              </nav>

              {/* Right Side */}
              <div className="flex items-center space-x-4">
                <div className="hidden md:flex items-center space-x-1 text-white">
                  <span className="text-sm font-medium tracking-wide">EN</span>
                  <ChevronDown className="h-4 w-4" />
                </div>

                <Button className="hidden md:flex bg-white text-amber-900...">
                  GET TICKETS
                </Button>

                <Button variant="ghost" size="icon" className="w-10 h-10 rounded-full border-2 border-white/30 text-white hover:bg-white/10">
                  <Menu className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="relative z-10 flex flex-col justify-between min-h-screen">
          {/* Breadcrumb */}
          <div className="container mx-auto px-6 pt-8">
            <nav className="text-white/80 text-sm font-light tracking-wider uppercase">
              <Link href="/" className="hover:text-white">HOME</Link>
              <span className="mx-2">/</span>
              <span className="text-white">ABOUT US</span>
            </nav>
          </div>

          {/* Hero Content */}
          <div className="container mx-auto px-6 flex-1 flex items-center">
            <div className="max-w-2xl">
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-light text-white mb-8 leading-[0.9] tracking-tight">
                About Us
              </h1>
              <div className="w-24 h-1 bg-white mb-8"></div>
              <p className="text-white/90 text-lg md:text-xl font-light leading-relaxed max-w-xl">
                Discover the essence of luxury travel ...
              </p>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="container mx-auto px-6 pb-8">
            <div className="flex justify-end">
              <div className="text-white/80 text-sm font-light tracking-wider uppercase">
                SCROLL TO DISCOVER
              </div>
            </div>
          </div>
        </div>

        {/* UAE Flag */}
        <div className="absolute top-32 right-8 z-20">
          <div className="w-16 h-12 bg-gradient-to-b from-red-500 via-white to-black rounded shadow-lg"></div>
        </div>
      </div>
    </PageTransition>
  )
}

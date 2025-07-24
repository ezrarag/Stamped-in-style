"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, List, LayoutGrid, ChevronDown } from "lucide-react"
import { Dialog, DialogContent, DialogClose, DialogTitle } from "@/components/ui/dialog"

const steps = [
  "Trip Vision",
  "Budget & Duration",
  "Experiences",
  "Contact & Logistics",
  "Confirmation",
]

const mockImages = [
  "/placeholder.jpg",
  "/about-hero.jpg",
  "/hero-desert.jpg",
]

const stepMeta = [
  {
    number: 1,
    title: "Choose Your Destination",
    subtitle: "Select a popular city or search for your dream destination."
  },
  {
    number: 2,
    title: "Budget & Duration",
    subtitle: "Tell us your budget and how long you want to travel."
  },
  {
    number: 3,
    title: "Experiences",
    subtitle: "Pick the types of experiences you want on your journey."
  },
  {
    number: 4,
    title: "Contact & Logistics",
    subtitle: "Let us know how to reach you and any special requests."
  },
  {
    number: 5,
    title: "Confirmation & Payment",
    subtitle: "Review your trip and pay securely with Stripe."
  },
]

// Placeholder city data (fallback)
const popularCities = [
  { name: "Paris", image: "/about-hero.jpg" },
  { name: "Tokyo", image: "/hero-desert.jpg" },
  { name: "Bali", image: "/placeholder.jpg" },
]

function Header({ isMobileMenuOpen, setIsMobileMenuOpen }: { isMobileMenuOpen: boolean, setIsMobileMenuOpen: (b: boolean) => void }) {
  return (
    <header className="relative z-50 w-full bg-[#FFFDF7]">
      <div className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-16 h-16 rounded-full flex items-center justify-center">
              <Image
                src="/complete-logo.png"
                alt="Stamped in Style Travel Co."
                width={64}
                height={64}
                className="object-contain"
              />
            </div>
          </div>
          <nav className="hidden lg:flex items-center space-x-12">
            <Link href="/about" className="text-amber-900 hover:text-amber-700 transition-colors font-medium tracking-wide text-sm uppercase">ABOUT</Link>
            <Link href="#curated" className="text-amber-900 hover:text-amber-700 transition-colors font-medium tracking-wide text-sm uppercase">CURATED</Link>
            <Link href="/build" className="text-amber-900 hover:text-amber-700 transition-colors font-medium tracking-wide text-sm uppercase">BUILD</Link>
            <Link href="#journey" className="text-amber-900 hover:text-amber-700 transition-colors font-medium tracking-wide text-sm uppercase">OUR JOURNEY</Link>
            <Link href="#gallery" className="text-amber-900 hover:text-amber-700 transition-colors font-medium tracking-wide text-sm uppercase">GALLERY</Link>
          </nav>
          <div className="flex items-center space-x-6">
            <div className="hidden md:flex items-center space-x-1 text-amber-900">
              <span className="text-sm font-medium tracking-wide">EN</span>
              <ChevronDown className="h-4 w-4" />
            </div>
            <Button className="hidden md:flex bg-transparent border-2 border-amber-900 text-amber-900 hover:bg-amber-900 hover:text-white px-6 py-2 rounded-full font-medium tracking-wide text-sm uppercase transition-all duration-300" asChild>
              <Link href="/dashboard/client">GET STARTED</Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="w-12 h-12 rounded-full border-2 border-amber-200 text-amber-900 hover:bg-amber-100"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="lg:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md border-t border-amber-100"
        >
          <nav className="container mx-auto px-6 py-6 space-y-4">
            <Link href="/about" className="block text-amber-900 text-lg font-medium py-3 border-b border-amber-100 uppercase tracking-wide" onClick={() => setIsMobileMenuOpen(false)}>ABOUT</Link>
            <Link href="#curated" className="block text-amber-900/80 text-lg font-medium py-3 border-b border-amber-100 uppercase tracking-wide" onClick={() => setIsMobileMenuOpen(false)}>CURATED</Link>
            <Link href="/build" className="block text-amber-900/80 text-lg font-medium py-3 border-b border-amber-100 uppercase tracking-wide" onClick={() => setIsMobileMenuOpen(false)}>BUILD</Link>
            <Link href="#journey" className="block text-amber-900/80 text-lg font-medium py-3 border-b border-amber-100 uppercase tracking-wide" onClick={() => setIsMobileMenuOpen(false)}>OUR JOURNEY</Link>
            <Link href="#gallery" className="block text-amber-900/80 text-lg font-medium py-3 border-b border-amber-100 uppercase tracking-wide" onClick={() => setIsMobileMenuOpen(false)}>GALLERY</Link>
            <div className="pt-4">
              <Button className="w-full bg-amber-900 text-white hover:bg-amber-800 py-3 rounded-full font-medium tracking-wide text-sm uppercase" asChild>
                <Link href="/dashboard/client">GET STARTED</Link>
              </Button>
            </div>
          </nav>
        </motion.div>
      )}
    </header>
  )
}

export default function BuildPage() {
  const [step, setStep] = useState(0)
  const [view, setView] = useState<'list' | 'gallery'>('list')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedCity, setSelectedCity] = useState<string | null>(null)
  const [search, setSearch] = useState("")
  const [destinations, setDestinations] = useState<any[]>([])
  const [loadingDestinations, setLoadingDestinations] = useState(true)
  const [fetchError, setFetchError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchDestinations() {
      try {
        setLoadingDestinations(true)
        setFetchError(null)
        const res = await fetch('/api/destinations')
        if (!res.ok) throw new Error(`Failed to fetch destinations (${res.status})`)
        const data = await res.json()
        setDestinations(data.destinations || [])
      } catch (err: any) {
        console.error("Error fetching destinations:", err)
        setFetchError("Unable to load destinations. Please try again later.")
        setDestinations([]) // fallback to empty list
      } finally {
        setLoadingDestinations(false)
      }
    }
    fetchDestinations()
  }, [])

  const ViewToggle = () => (
    <div className="fixed bottom-8 right-8 z-30 flex gap-2">
      <Button
        variant="outline"
        className={`flex items-center gap-2 px-6 py-2 rounded-full border-2 text-base font-medium uppercase tracking-wide transition-all duration-200 ${view==='list' ? 'border-amber-900 bg-amber-900 text-white' : 'border-amber-900 text-amber-900 bg-white hover:bg-amber-50'}`}
        onClick={() => setModalOpen(true)}
        aria-label="List view"
      >
        <List className="h-5 w-5" /> List
      </Button>
      <Button
        variant="outline"
        className={`flex items-center gap-2 px-6 py-2 rounded-full border-2 text-base font-medium uppercase tracking-wide transition-all duration-200 ${view==='gallery' ? 'border-amber-900 bg-amber-900 text-white' : 'border-amber-900 text-amber-900 bg-white hover:bg-amber-50'}`}
        onClick={() => setModalOpen(true)}
        aria-label="Gallery view"
      >
        <LayoutGrid className="h-5 w-5" /> Gallery
      </Button>
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          <DialogTitle asChild>
            <h3 className="text-xl font-serif font-bold text-amber-900 mb-4">{view === 'list' ? 'List View' : 'Gallery View'}</h3>
          </DialogTitle>
          <p className="text-amber-700">(Placeholder for dynamic travel event data.)</p>
          <DialogClose asChild>
            <Button className="mt-6" variant="outline">Close</Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </div>
  )

  const SectionHeader = () => {
    const meta = stepMeta[step]
    return (
      <div className="fixed bottom-8 left-8 z-30 flex flex-col items-start gap-2 max-w-md">
        <div className="flex items-center gap-4">
          <span className="text-4xl md:text-5xl font-serif font-bold text-amber-200 leading-none">{meta.number.toString().padStart(2, '0')}</span>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-amber-900 leading-tight">{meta.title}</h2>
        </div>
        <div className="text-amber-700 text-base font-sans">{meta.subtitle}</div>
      </div>
    )
  }

  const Step1 = () => (
    <motion.div
      key="step1"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-3xl mx-auto bg-white/90 rounded-3xl shadow-xl p-8 mt-16"
    >
      <div className="mb-6">
        <input
          type="text"
          className="w-full border border-amber-200 rounded px-3 py-2 mb-6"
          placeholder="Search for a city..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          autoFocus
        />
        {loadingDestinations ? (
          <div className="text-center text-amber-700">Loading destinations...</div>
        ) : fetchError ? (
          <div className="text-center text-red-600">{fetchError}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {destinations
              .filter((d) => d.name.toLowerCase().includes(search.toLowerCase()))
              .map((d) => (
                <div
                  key={d.id}
                  className={`relative h-64 rounded-2xl overflow-hidden shadow-lg bg-amber-100 cursor-pointer border-4 transition-all duration-200 ${selectedCity === d.id ? 'border-amber-900' : 'border-transparent'}`}
                  tabIndex={-1}
                  onMouseDown={e => e.preventDefault()}
                  onClick={() => { setSelectedCity(d.id); setStep(1); }}
                >
                  <img src={d.image_url} alt={d.name} className="w-full h-full object-cover pointer-events-none" />
                  <div className="absolute bottom-4 left-0 right-0 text-center text-lg font-bold text-amber-900 bg-white/80 py-2 pointer-events-none">{d.name}</div>
                  {d.is_featured && <span className="absolute top-4 left-4 bg-amber-900 text-white text-xs px-3 py-1 rounded-full">Deal</span>}
                </div>
              ))}
          </div>
        )}
      </div>
      <div className="flex flex-col md:flex-row gap-4 mt-8">
        <Button className="w-full md:w-auto" variant="outline" onClick={() => setStep(s => s+1)} disabled={!selectedCity}>
          Next Step
        </Button>
      </div>
    </motion.div>
  )

  const Step2 = () => (
    <motion.div
      key="step2"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-3xl mx-auto bg-white/90 rounded-3xl shadow-xl p-8 mt-16"
    >
      <div className="mb-6">
        <h2 className="text-2xl font-serif font-bold text-amber-900 mb-2">Budget & Duration</h2>
        <p className="text-amber-700 mb-4">Let us know your budget and how long you want your trip to be.</p>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-amber-800 mb-1 font-medium">Budget (USD)</label>
            <input type="number" className="w-full border border-amber-200 rounded px-3 py-2" placeholder="e.g. 5000" />
          </div>
          <div className="flex-1">
            <label className="block text-amber-800 mb-1 font-medium">Duration (days)</label>
            <input type="number" className="w-full border border-amber-200 rounded px-3 py-2" placeholder="e.g. 10" />
          </div>
        </div>
      </div>
      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={() => setStep(s => s-1)}>Back</Button>
        <Button variant="outline" onClick={() => setStep(s => s+1)}>Next Step</Button>
      </div>
    </motion.div>
  )

  const Step3 = () => (
    <motion.div
      key="step3"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-3xl mx-auto bg-white/90 rounded-3xl shadow-xl p-8 mt-16"
    >
      <div className="mb-6">
        <h2 className="text-2xl font-serif font-bold text-amber-900 mb-2">Experiences</h2>
        <p className="text-amber-700 mb-4">What kind of experiences are you looking for?</p>
        <div className="flex flex-wrap gap-3">
          {['Adventure', 'Relaxation', 'Culture', 'Food & Wine', 'Nature', 'Luxury', 'Family', 'Romance'].map(exp => (
            <label key={exp} className="flex items-center gap-2 bg-amber-100 px-4 py-2 rounded-full cursor-pointer">
              <input type="checkbox" className="accent-amber-700" />
              <span className="text-amber-900 font-medium">{exp}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={() => setStep(s => s-1)}>Back</Button>
        <Button variant="outline" onClick={() => setStep(s => s+1)}>Next Step</Button>
      </div>
    </motion.div>
  )

  const Step4 = () => (
    <motion.div
      key="step4"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-3xl mx-auto bg-white/90 rounded-3xl shadow-xl p-8 mt-16"
    >
      <div className="mb-6">
        <h2 className="text-2xl font-serif font-bold text-amber-900 mb-2">Contact & Logistics</h2>
        <p className="text-amber-700 mb-4">How can we reach you and what else should we know?</p>
        <div className="flex flex-col gap-4">
          <input type="text" className="w-full border border-amber-200 rounded px-3 py-2" placeholder="Your Name" />
          <input type="email" className="w-full border border-amber-200 rounded px-3 py-2" placeholder="Your Email" />
          <textarea className="w-full border border-amber-200 rounded px-3 py-2" placeholder="Anything else? (optional)" rows={3} />
        </div>
      </div>
      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={() => setStep(s => s
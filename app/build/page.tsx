"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, List, LayoutGrid, ChevronDown, ShoppingCart, User, Settings, LogIn } from "lucide-react"
import { Dialog, DialogContent, DialogClose, DialogTitle } from "@/components/ui/dialog"
import { searchCities, getPlaceDetails, getPlaceholderImage } from "@/lib/google-places"
import { useTripCart, TripItem } from "@/lib/trip-cart"
import TripCartModal from "@/components/trip-cart-modal"
import AITripBreakdown from "@/components/ai-trip-breakdown"
import { TripAnalysis } from "@/lib/ai-service"
import { useRouter } from "next/navigation"

const steps = [
  "Trip Vision",
  "Budget & Duration", 
  "Experiences",
  "Contact & Logistics",
  "Confirmation",
]

// Placeholder data for steps
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

export default function BuildPage() {
  const [step, setStep] = useState(0)
  const [view, setView] = useState<'list' | 'gallery'>('list')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedCity, setSelectedCity] = useState<string | null>(null)
  const [search, setSearch] = useState("")
  const [destinations, setDestinations] = useState<any[]>([])
  const [loadingDestinations, setLoadingDestinations] = useState(true)
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [searching, setSearching] = useState(false)
  const [selectedCityDetails, setSelectedCityDetails] = useState<any>(null)
  const [cartModalOpen, setCartModalOpen] = useState(false)
  const [editingTrip, setEditingTrip] = useState<TripItem | null>(null)
  const [aiBreakdownOpen, setAiBreakdownOpen] = useState(false)
  const [aiBreakdown, setAiBreakdown] = useState<TripAnalysis | null>(null)
  const [generatingBreakdown, setGeneratingBreakdown] = useState(false)
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null)
  
  // Form state
  const [budget, setBudget] = useState('')
  const [duration, setDuration] = useState('')
  const [experiences, setExperiences] = useState<string[]>([])
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [notes, setNotes] = useState('')
  const [lastTripPrefs, setLastTripPrefs] = useState<any>(null);

  // Trip cart hook
  const { trips, cartCount, addTrip, removeTrip, updateTrip, clearCart, isCartFull, totalPrice } = useTripCart()
  const router = useRouter();

  useEffect(() => {
    async function fetchDestinations() {
      setLoadingDestinations(true)
      try {
        const res = await fetch('/api/destinations')
        const data = await res.json()
        setDestinations(data.destinations || [])
      } catch (error) {
        console.error('Failed to fetch destinations:', error)
      } finally {
        setLoadingDestinations(false)
      }
    }
    fetchDestinations()
  }, [])

  // Google Places search with debounce
  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (search.trim().length >= 2) {
        setSearching(true)
        try {
          const results = await searchCities(search)
          setSearchResults(results)
        } catch (error) {
          console.error('Search error:', error)
          setSearchResults([])
        } finally {
          setSearching(false)
        }
      } else {
        setSearchResults([])
      }
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [search])

  // Handle city selection
  const handleCitySelect = async (city: any) => {
    setSearching(true)
    try {
      const details = await getPlaceDetails(city.placeId)
      setSelectedCityDetails(details)
      setSelectedCity(city.placeId)
      setSearch(city.name)
      setSearchResults([])
    } catch (error) {
      console.error('Failed to get city details:', error)
      // Fallback to basic city info
      setSelectedCityDetails({
        id: city.placeId,
        name: city.name,
        address: city.fullName,
        photos: [{ url: getPlaceholderImage(city.name), alt: city.name }]
      })
      setSelectedCity(city.placeId)
      setSearch(city.name)
      setSearchResults([])
    } finally {
      setSearching(false)
    }
  }

  // Handle form submission - add to cart instead of direct submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!selectedCity && !selectedCityDetails) {
      alert('Please select a destination first')
      return
    }

    if (isCartFull) {
      alert('Your cart is full (maximum 5 trips). Please remove some trips or proceed to payment.')
      return
    }

    const tripData = {
      destination: {
        id: selectedCityDetails?.id || selectedCity || 'unknown',
        name: selectedCityDetails?.name || destinations.find(d => d.id === selectedCity)?.name || 'Unknown Destination',
        image_url: selectedCityDetails?.photos[0]?.url || destinations.find(d => d.id === selectedCity)?.image_url || getPlaceholderImage('Travel'),
        country: selectedCityDetails?.address?.split(',').pop()?.trim() || destinations.find(d => d.id === selectedCity)?.country
      },
      budget,
      duration,
      experiences,
      email,
      name,
      notes,
      totalPrice: calculateTripPrice(budget, duration, experiences.length)
    }

    const success = addTrip(tripData)
    
    if (success) {
      // Reset form
      setBudget('')
      setDuration('')
      setExperiences([])
      setEmail('')
      setName('')
      setNotes('')
      setSelectedCity(null)
      setSelectedCityDetails(null)
      setSearch('')
      setStep(0)
      
      // Show success message
      setLastTripPrefs({
        destination: selectedCityDetails?.name || destinations.find(d => d.id === selectedCity)?.name || '',
        budget,
        duration,
        experiences,
      });
      setNotification({ message: 'Trip added to cart! You can continue building more trips or proceed to payment.', type: 'success' })
      setTimeout(() => setNotification(null), 4000)
    } else {
      setNotification({ message: 'Failed to add trip to cart. Please try again.', type: 'error' })
      setTimeout(() => setNotification(null), 4000)
    }
  }

  // Calculate estimated trip price
  const calculateTripPrice = (budget: string, duration: string, experienceCount: number): number => {
    const basePrices = {
      'budget': 2000,
      'mid-range': 5000,
      'luxury': 11000,
      'ultra-luxury': 20000
    }
    
    const durationMultipliers = {
      'weekend': 0.3,
      'week': 1,
      'two-weeks': 1.8,
      'month': 3.5
    }
    
    const basePrice = basePrices[budget as keyof typeof basePrices] || 5000
    const durationMultiplier = durationMultipliers[duration as keyof typeof durationMultipliers] || 1
    const experienceBonus = experienceCount * 500
    
    return Math.round(basePrice * durationMultiplier + experienceBonus)
  }

  // Handle edit trip
  const handleEditTrip = (trip: TripItem) => {
    setEditingTrip(trip)
    setSelectedCityDetails({
      id: trip.destination.id,
      name: trip.destination.name,
      photos: [{ url: trip.destination.image_url, alt: trip.destination.name }]
    })
    setSelectedCity(trip.destination.id)
    setSearch(trip.destination.name)
    setBudget(trip.budget)
    setDuration(trip.duration)
    setExperiences(trip.experiences)
    setEmail(trip.email)
    setName(trip.name)
    setNotes(trip.notes)
    setStep(2) // Go to form step
    setCartModalOpen(false)
  }

  // Handle proceed to payment
  const handleProceedToPayment = () => {
    setCartModalOpen(false)
    // TODO: Implement payment flow
    alert('Payment integration coming soon!')
  }

  // Generate AI trip breakdown
  const generateAIBreakdown = async () => {
    if (!selectedCityDetails && !selectedCity) {
      alert('Please select a destination first')
      return
    }

    if (!budget || !duration || experiences.length === 0) {
      alert('Please complete all trip details first')
      return
    }

    setGeneratingBreakdown(true)
    try {
      const destinationName = selectedCityDetails?.name || destinations.find(d => d.id === selectedCity)?.name || 'Unknown Destination'
      
      const response = await fetch('/api/ai/trip-breakdown', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          destination: destinationName,
          duration,
          budget,
          experiences,
          notes
        }),
      })

      const data = await response.json()
      
      if (data.success) {
        setAiBreakdown(data.data)
        setAiBreakdownOpen(true)
      } else {
        throw new Error(data.error || 'Failed to generate breakdown')
      }
    } catch (error) {
      console.error('Error generating AI breakdown:', error)
      alert('Failed to generate AI breakdown. Please try again.')
    } finally {
      setGeneratingBreakdown(false)
    }
  }

  // Cart toggle, bottom right
  const CartToggle = () => (
    <div className="fixed bottom-8 right-8 z-40">
      <Button
        onClick={() => {
          if (cartCount > 0) {
            setCartModalOpen(true)
          } else {
            setNotification({ message: 'Your cart is empty. Add some trips first!', type: 'error' })
            setTimeout(() => setNotification(null), 3000)
          }
        }}
        className="bg-white/90 backdrop-blur-md rounded-full p-4 shadow-lg border border-amber-200 hover:bg-white transition-all duration-200 relative"
      >
        <ShoppingCart className="h-6 w-6 text-amber-900" />
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-amber-900 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-medium">
            {cartCount}
          </span>
        )}
      </Button>
    </div>
  )

  // Section header with step indicator
  const SectionHeader = () => (
    <div className="text-center py-8">
      <h1 className="text-4xl font-light text-amber-900 mb-4">Custom Trip Builder</h1>
      <p className="text-amber-700 max-w-2xl mx-auto">
        {stepMeta[step]?.subtitle || "Let's create your perfect luxury travel experience."}
      </p>
    </div>
  )

  // Step 1: Choose Your Destination (dynamic from Google Places + Supabase)
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
          placeholder="Search for any city in the world..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          autoFocus
        />
        
        {/* Search Results Dropdown */}
        {searchResults.length > 0 && (
          <div className="absolute z-50 w-full max-w-3xl bg-white border border-amber-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
            {searchResults.map((city) => (
              <div
                key={city.placeId}
                className="px-4 py-3 hover:bg-amber-50 cursor-pointer border-b border-amber-100 last:border-b-0"
                onClick={() => handleCitySelect(city)}
              >
                <div className="font-medium text-amber-900">{city.name}</div>
                <div className="text-sm text-amber-600">{city.country}</div>
              </div>
            ))}
          </div>
        )}

        {/* Selected City Card */}
        {selectedCityDetails && (
          <div className="mb-6">
            <h3 className="text-lg font-bold text-amber-900 mb-4">Selected Destination</h3>
            <div className="relative h-64 rounded-2xl overflow-hidden shadow-lg bg-amber-100 border-4 border-amber-900">
              <img 
                src={selectedCityDetails.photos[0]?.url || getPlaceholderImage(selectedCityDetails.name)} 
                alt={selectedCityDetails.name} 
                className="w-full h-full object-cover" 
              />
              <div className="absolute bottom-4 left-0 right-0 text-center text-lg font-bold text-amber-900 bg-white/80 py-2">
                {selectedCityDetails.name}
              </div>
              <button
                onClick={() => {
                  setSelectedCity(null)
                  setSelectedCityDetails(null)
                  setSearch("")
                }}
                className="absolute top-4 right-4 bg-white/80 rounded-full p-2 hover:bg-white"
              >
                <X className="h-4 w-4 text-amber-900" />
              </button>
            </div>
          </div>
        )}

        {/* Featured Destinations */}
        {!selectedCityDetails && (
          <>
            <h3 className="text-lg font-bold text-amber-900 mb-4">Featured Destinations</h3>
            {loadingDestinations ? (
              <div className="text-center text-amber-700">Loading destinations...</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {destinations
                  .filter((d) => !search || d.name.toLowerCase().includes(search.toLowerCase()))
                  .map((d) => (
                    <div
                      key={d.id}
                      className={`relative h-64 rounded-2xl overflow-hidden shadow-lg bg-amber-100 cursor-pointer border-4 transition-all duration-200 ${selectedCity === d.id ? 'border-amber-900' : 'border-transparent'}`}
                      onClick={() => setSelectedCity(d.id)}
                    >
                      <img src={d.image_url} alt={d.name} className="w-full h-full object-cover" />
                      <div className="absolute bottom-4 left-0 right-0 text-center text-lg font-bold text-amber-900 bg-white/80 py-2">{d.name}</div>
                      {d.is_featured && <span className="absolute top-4 left-4 bg-amber-900 text-white text-xs px-3 py-1 rounded-full">Deal</span>}
                    </div>
                  ))}
              </div>
            )}
          </>
        )}
      </div>
      <div className="flex flex-col md:flex-row gap-4 mt-8">
        <Button className="w-full md:w-auto" variant="outline" onClick={() => setStep(s => s+1)} disabled={!selectedCity && !selectedCityDetails}>
          Next Step
        </Button>
      </div>
    </motion.div>
  )

  // Step 2: Budget & Duration
  const Step2 = () => (
    <motion.div
      key="step2"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-3xl mx-auto bg-white/90 rounded-3xl shadow-xl p-8 mt-16"
    >
      <h2 className="text-3xl font-light text-amber-900 mb-8 text-center">Budget & Duration</h2>
      
      <div className="space-y-8">
        {/* Budget Selection */}
        <div>
          <h3 className="text-lg font-semibold text-amber-900 mb-4">What's your budget range?</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: 'budget', label: 'Budget', range: '$1,000 - $3,000' },
              { value: 'mid-range', label: 'Mid-Range', range: '$3,000 - $7,000' },
              { value: 'luxury', label: 'Luxury', range: '$7,000 - $15,000' },
              { value: 'ultra-luxury', label: 'Ultra-Luxury', range: '$15,000+' }
            ].map(option => (
              <label key={option.value} className="relative">
                <input
                  type="radio"
                  name="budget"
                  value={option.value}
                  checked={budget === option.value}
                  onChange={(e) => setBudget(e.target.value)}
                  className="sr-only"
                />
                <div className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                  budget === option.value 
                    ? 'border-amber-900 bg-amber-50' 
                    : 'border-amber-200 bg-white hover:border-amber-300'
                }`}>
                  <div className="font-semibold text-amber-900">{option.label}</div>
                  <div className="text-sm text-amber-600">{option.range}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Duration Selection */}
        <div>
          <h3 className="text-lg font-semibold text-amber-900 mb-4">How long is your trip?</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: 'weekend', label: 'Weekend', desc: '2-3 days' },
              { value: 'week', label: 'Week', desc: '7 days' },
              { value: 'two-weeks', label: 'Two Weeks', desc: '14 days' },
              { value: 'month', label: 'Month', desc: '30+ days' }
            ].map(option => (
              <label key={option.value} className="relative">
                <input
                  type="radio"
                  name="duration"
                  value={option.value}
                  checked={duration === option.value}
                  onChange={(e) => setDuration(e.target.value)}
                  className="sr-only"
                />
                <div className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                  duration === option.value 
                    ? 'border-amber-900 bg-amber-50' 
                    : 'border-amber-200 bg-white hover:border-amber-300'
                }`}>
                  <div className="font-semibold text-amber-900">{option.label}</div>
                  <div className="text-sm text-amber-600">{option.desc}</div>
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-4 mt-8">
        <Button variant="outline" onClick={() => setStep(0)} className="flex-1">
          Back
        </Button>
        <Button 
          onClick={() => setStep(2)} 
          className="flex-1 bg-amber-900 hover:bg-amber-800"
          disabled={!budget || !duration}
        >
          Next Step
        </Button>
      </div>
    </motion.div>
  )

  // Step 3: Experiences
  const Step3 = () => (
    <div className="w-full max-w-3xl mx-auto bg-white/90 rounded-3xl shadow-xl p-8 mt-16">
      <div className="mb-6">
        <h2 className="text-2xl font-serif font-bold text-amber-900 mb-2">Experiences</h2>
        <p className="text-amber-700 mb-4">What kind of experiences are you looking for?</p>
        <div className="flex flex-wrap gap-3">
          {['Adventure', 'Relaxation', 'Culture', 'Food & Wine', 'Nature', 'Luxury', 'Family', 'Romance'].map(exp => (
            <label key={exp} className="flex items-center gap-2 bg-amber-100 px-4 py-2 rounded-full cursor-pointer">
              <input 
                type="checkbox" 
                className="accent-amber-700" 
                checked={experiences.includes(exp)}
                onChange={() => {
                  setExperiences(prev => 
                    prev.includes(exp) 
                      ? prev.filter(e => e !== exp)
                      : [...prev, exp]
                  )
                }}
              />
              <span className="text-amber-900 font-medium">{exp}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={() => setStep(s => s-1)}>Back</Button>
        <Button variant="outline" onClick={() => setStep(s => s+1)}>Next Step</Button>
      </div>
    </div>
  )

  // Step 4: Contact Information
  const Step4 = () => (
    <motion.div
      key="step4"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-2xl mx-auto bg-white/90 rounded-3xl shadow-xl p-8 mt-16"
    >
      <h2 className="text-3xl font-light text-amber-900 mb-8 text-center">Contact Information</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-amber-900 font-medium mb-2">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-amber-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
            required
          />
        </div>
        <div>
          <label className="block text-amber-900 font-medium mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-amber-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
            required
          />
        </div>
        <div>
          <label className="block text-amber-900 font-medium mb-2">Additional Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
            className="w-full border border-amber-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
            placeholder="Any special requests or preferences..."
          />
        </div>
        <div className="flex gap-4">
          <Button type="button" variant="outline" onClick={() => setStep(2)} className="flex-1">
            Back
          </Button>
          <Button 
            type="button" 
            variant="outline" 
            onClick={generateAIBreakdown}
            disabled={generatingBreakdown || (!selectedCityDetails && !selectedCity) || !budget || !duration || experiences.length === 0}
            className="flex-1 border-amber-300 text-amber-700 hover:bg-amber-50"
          >
            {generatingBreakdown ? 'Generating...' : 'Preview with AI'}
          </Button>
          <Button type="submit" className="flex-1 bg-amber-900 hover:bg-amber-800" disabled={isCartFull}>
            {isCartFull ? 'Cart Full' : 'Add to Cart'}
          </Button>
        </div>
      </form>
    </motion.div>
  )

  // Step 5: Confirmation & Payment (Stripe integration)
  const Step5 = () => {
    const [loading, setLoading] = useState(false)
    
    // Calculate pricing based on selections
    const selectedDestination = destinations.find(d => d.id === selectedCity)
    const basePrice = selectedDestination?.price_range || 5000
    const durationMultiplier = duration ? parseInt(duration) / 7 : 1
    const experienceMultiplier = experiences.length > 0 ? 1.2 : 1
    const totalPrice = Math.round(basePrice * durationMultiplier * experienceMultiplier)

    const handleStripeCheckout = async (e: React.FormEvent) => {
      e.preventDefault()
      setLoading(true)
      
      try {
        const response = await fetch('/api/create-checkout-session', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            destination: selectedDestination?.name || 'Custom Trip',
            amount: totalPrice,
            duration: duration,
            experiences: experiences,
            customerEmail: email,
            customerName: name,
            notes: notes
          }),
        })

        const { sessionId } = await response.json()
        
        // Redirect to Stripe Checkout
        // TODO: Implement Stripe checkout
        console.log('Stripe checkout would redirect to:', sessionId)
        alert('Stripe integration coming soon!')
      } catch (error) {
        console.error('Checkout error:', error)
        alert('Failed to start checkout. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    return (
      <div className="w-full max-w-3xl mx-auto bg-white/90 rounded-3xl shadow-xl p-8 mt-16">
        <div className="mb-6">
          <h2 className="text-2xl font-serif font-bold text-amber-900 mb-2">Confirmation & Payment</h2>
          <p className="text-amber-700 mb-4">Review your trip details and proceed to secure payment.</p>
          
          {/* Trip Summary */}
          <div className="bg-amber-50 rounded-2xl p-6 mb-6">
            <h3 className="text-lg font-semibold text-amber-900 mb-4">Trip Summary</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-amber-600 font-medium">Destination:</span>
                <p className="text-amber-900">{selectedDestination?.name || 'Custom Trip'}</p>
              </div>
              <div>
                <span className="text-amber-600 font-medium">Duration:</span>
                <p className="text-amber-900">{duration} days</p>
              </div>
              <div>
                <span className="text-amber-600 font-medium">Budget:</span>
                <p className="text-amber-900">{budget}</p>
              </div>
              <div>
                <span className="text-amber-600 font-medium">Experiences:</span>
                <p className="text-amber-900">{experiences.join(', ')}</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-amber-200">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-amber-900">Total Estimated Cost:</span>
                <span className="text-2xl font-bold text-amber-900">${totalPrice.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between mt-8">
          <Button variant="outline" onClick={() => setStep(s => s-1)}>Back</Button>
          <Button 
            onClick={handleStripeCheckout}
            disabled={loading}
            className="bg-amber-900 hover:bg-amber-800"
          >
            {loading ? 'Processing...' : 'Proceed to Payment'}
          </Button>
        </div>
      </div>
    )
  }

  // Gallery placeholder
  const GalleryPlaceholder = () => (
    <div className="w-full max-w-3xl mx-auto bg-white/90 rounded-3xl shadow-xl p-8 mt-16 text-center">
      <h2 className="text-2xl font-serif font-bold text-amber-900 mb-4">Gallery View</h2>
      <p className="text-amber-700">Gallery view coming soon...</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100">
      {/* Header */}
      <header className="relative z-50 w-full bg-[#FFFDF7]">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
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
            {/* Navigation */}
            <nav className="hidden lg:flex items-center space-x-12">
              <Link href="/about" className="text-amber-900 hover:text-amber-700 transition-colors font-medium tracking-wide text-sm uppercase">ABOUT</Link>
              <Link href="/curated" className="text-amber-900 hover:text-amber-700 transition-colors font-medium tracking-wide text-sm uppercase">CURATED</Link>
              <Link href="/build" className="text-amber-900 hover:text-amber-700 transition-colors font-medium tracking-wide text-sm uppercase">BUILD</Link>
              <Link href="#journey" className="text-amber-900 hover:text-amber-700 transition-colors font-medium tracking-wide text-sm uppercase">OUR JOURNEY</Link>
              <Link href="#gallery" className="text-amber-900 hover:text-amber-700 transition-colors font-medium tracking-wide text-sm uppercase">GALLERY</Link>
            </nav>
            {/* Right Side */}
            <div className="flex items-center space-x-6">
              {/* Language Selector */}
              <div className="hidden md:flex items-center space-x-1 text-amber-900">
                <span className="text-sm font-medium tracking-wide">EN</span>
                <ChevronDown className="h-4 w-4" />
              </div>
              {/* Get Started Button */}
              <Button className="hidden md:flex bg-transparent border-2 border-amber-900 text-amber-900 hover:bg-amber-900 hover:text-white px-6 py-2 rounded-full font-medium tracking-wide text-sm uppercase transition-all duration-300" asChild>
                <Link href="/dashboard/client">GET STARTED</Link>
              </Button>
              {/* Mobile Menu */}
              <Button
                variant="ghost"
                size="icon"
                className="w-12 h-12 rounded-full border-2 border-amber-200 text-amber-900 hover:bg-amber-100 relative"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-amber-900 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
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
            className="lg:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md border-t border-amber-100 shadow-lg"
          >
            <nav className="container mx-auto px-6 py-6 space-y-4">
              {/* Navigation Links */}
              <Link href="/about" className="block text-amber-900 text-lg font-medium py-3 border-b border-amber-100 uppercase tracking-wide" onClick={() => setIsMobileMenuOpen(false)}>ABOUT</Link>
              <Link href="/curated" className="block text-amber-900/80 text-lg font-medium py-3 border-b border-amber-100 uppercase tracking-wide" onClick={() => setIsMobileMenuOpen(false)}>CURATED</Link>
              <Link href="/build" className="block text-amber-900/80 text-lg font-medium py-3 border-b border-amber-100 uppercase tracking-wide" onClick={() => setIsMobileMenuOpen(false)}>BUILD</Link>
              <Link href="#journey" className="block text-amber-900/80 text-lg font-medium py-3 border-b border-amber-100 uppercase tracking-wide" onClick={() => setIsMobileMenuOpen(false)}>OUR JOURNEY</Link>
              <Link href="#gallery" className="block text-amber-900/80 text-lg font-medium py-3 border-b border-amber-100 uppercase tracking-wide" onClick={() => setIsMobileMenuOpen(false)}>GALLERY</Link>
              
              {/* Action Buttons */}
              <div className="space-y-3 pt-4">
                {/* Cart Button */}
                <Button 
                  onClick={() => {
                    setCartModalOpen(true)
                    setIsMobileMenuOpen(false)
                  }}
                  className="w-full bg-amber-900 text-white hover:bg-amber-800 py-3 rounded-full font-medium tracking-wide text-sm uppercase flex items-center justify-center gap-3"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Cart ({cartCount})
                </Button>
                
                {/* Sign In Button */}
                <Button 
                  variant="outline"
                  className="w-full border-amber-200 text-amber-900 hover:bg-amber-50 py-3 rounded-full font-medium tracking-wide text-sm uppercase flex items-center justify-center gap-3"
                  asChild
                >
                  <Link href="/auth/signin" onClick={() => setIsMobileMenuOpen(false)}>
                    <LogIn className="h-5 w-5" />
                    Sign In
                  </Link>
                </Button>
                
                {/* Dashboard Button */}
                <Button 
                  variant="outline"
                  className="w-full border-amber-200 text-amber-900 hover:bg-amber-50 py-3 rounded-full font-medium tracking-wide text-sm uppercase flex items-center justify-center gap-3"
                  asChild
                >
                  <Link href="/dashboard/client" onClick={() => setIsMobileMenuOpen(false)}>
                    <User className="h-5 w-5" />
                    Dashboard
                  </Link>
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </header>

      <div className="max-w-4xl mx-auto">
        <h1 className="sr-only">Custom Trip Builder</h1>
        <AnimatePresence mode="wait">
          {step === 0 && <Step1 key="step1" />}
          {step === 1 && <Step2 key="step2" />}
          {step === 2 && <Step3 key="step3" />}
          {step === 3 && <Step4 key="step4" />}
          {step === 4 && <Step5 key="step5" />}
        </AnimatePresence>
      </div>

      {/* Step Information or Notification - Bottom Left */}
      <div className="fixed bottom-8 left-8 z-40">
        <AnimatePresence mode="wait">
          {notification ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`bg-white/95 backdrop-blur-md rounded-2xl p-6 shadow-lg border max-w-sm ${
                notification.type === 'success' 
                  ? 'border-green-200 bg-green-50/50' 
                  : 'border-red-200 bg-red-50/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  notification.type === 'success' 
                    ? 'bg-green-600 text-white' 
                    : 'bg-red-600 text-white'
                }`}>
                  {notification.type === 'success' ? '✓' : '✕'}
                </div>
                <p className={`text-sm font-medium ${
                  notification.type === 'success' ? 'text-green-800' : 'text-red-800'
                }`}>
                  {notification.message}
                </p>
              </div>
              {notification.type === 'success' && lastTripPrefs && (
                <div className="mt-4 flex gap-2">
                  <button
                    className="px-4 py-2 bg-amber-900 text-white rounded-full font-medium text-sm hover:bg-amber-800 transition"
                    onClick={() => {
                      const params = new URLSearchParams({
                        query: lastTripPrefs.destination,
                        budget: lastTripPrefs.budget,
                        duration: lastTripPrefs.duration,
                        experiences: (lastTripPrefs.experiences || []).join(",")
                      });
                      router.push(`/curated?${params.toString()}`);
                    }}
                  >
                    See Related Curated Trips
                  </button>
                  <button
                    className="px-3 py-2 bg-white border border-amber-200 text-amber-900 rounded-full font-medium text-sm hover:bg-amber-50 transition"
                    onClick={() => setNotification(null)}
                  >
                    ×
                  </button>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-amber-200 max-w-sm"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-amber-900 text-white flex items-center justify-center text-sm font-medium">
                  {step + 1}
                </div>
                <h3 className="text-lg font-semibold text-amber-900">
                  {stepMeta[step]?.title || 'Custom Trip Builder'}
                </h3>
              </div>
              <p className="text-sm text-amber-700 leading-relaxed">
                {stepMeta[step]?.subtitle || "Let's create your perfect luxury travel experience."}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <CartToggle />

      {/* Trip Cart Modal */}
      <TripCartModal
        isOpen={cartModalOpen}
        onClose={() => setCartModalOpen(false)}
        trips={trips}
        onRemoveTrip={removeTrip}
        onEditTrip={handleEditTrip}
        onProceedToPayment={handleProceedToPayment}
        totalPrice={totalPrice}
      />

      {/* AI Trip Breakdown Modal */}
      {aiBreakdownOpen && aiBreakdown && (
        <AITripBreakdown
          tripAnalysis={aiBreakdown}
          destination={selectedCityDetails?.name || destinations.find(d => d.id === selectedCity)?.name || ''}
          onClose={() => setAiBreakdownOpen(false)}
        />
      )}
    </div>
  )
} 
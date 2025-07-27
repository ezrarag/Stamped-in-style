import { useState, useEffect, useCallback } from 'react'

export interface TripItem {
  id: string
  destination: {
    id: string
    name: string
    image_url: string
    country?: string
  }
  budget: string
  duration: string
  experiences: string[]
  email: string
  name: string
  notes: string
  createdAt: Date
  totalPrice?: number
}

class TripCart {
  private storageKey = 'stamped-trip-cart'
  private maxTrips = 5

  // Get all trips from cart
  getTrips(): TripItem[] {
    if (typeof window === 'undefined') return []
    
    try {
      const stored = localStorage.getItem(this.storageKey)
      return stored ? JSON.parse(stored) : []
    } catch (error) {
      console.error('Failed to load trip cart:', error)
      return []
    }
  }

  // Add trip to cart
  addTrip(trip: Omit<TripItem, 'id' | 'createdAt'>): boolean {
    const trips = this.getTrips()
    
    if (trips.length >= this.maxTrips) {
      return false // Cart is full
    }

    const newTrip: TripItem = {
      ...trip,
      id: this.generateId(),
      createdAt: new Date()
    }

    trips.push(newTrip)
    this.saveTrips(trips)
    return true
  }

  // Remove trip from cart
  removeTrip(tripId: string): void {
    const trips = this.getTrips().filter(trip => trip.id !== tripId)
    this.saveTrips(trips)
  }

  // Update trip in cart
  updateTrip(tripId: string, updates: Partial<TripItem>): void {
    const trips = this.getTrips().map(trip => 
      trip.id === tripId ? { ...trip, ...updates } : trip
    )
    this.saveTrips(trips)
  }

  // Clear all trips
  clearCart(): void {
    this.saveTrips([])
  }

  // Get cart count
  getCartCount(): number {
    return this.getTrips().length
  }

  // Check if cart is full
  isCartFull(): boolean {
    return this.getCartCount() >= this.maxTrips
  }

  // Calculate total estimated price
  getTotalPrice(): number {
    return this.getTrips().reduce((total, trip) => {
      return total + (trip.totalPrice || 0)
    }, 0)
  }

  // Save trips to localStorage
  private saveTrips(trips: TripItem[]): void {
    if (typeof window === 'undefined') return
    
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(trips))
    } catch (error) {
      console.error('Failed to save trip cart:', error)
    }
  }

  // Generate unique ID
  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2)
  }
}

// Export singleton instance
export const tripCart = new TripCart()

// Hook for React components
export function useTripCart() {
  const [trips, setTrips] = useState<TripItem[]>([])
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    const loadTrips = () => {
      const currentTrips = tripCart.getTrips()
      setTrips(currentTrips)
      setCartCount(currentTrips.length)
    }

    loadTrips()

    // Listen for storage changes (if cart is modified in another tab)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === tripCart['storageKey']) {
        loadTrips()
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  const addTrip = useCallback((trip: Omit<TripItem, 'id' | 'createdAt'>) => {
    const success = tripCart.addTrip(trip)
    if (success) {
      setTrips(tripCart.getTrips())
      setCartCount(tripCart.getCartCount())
    }
    return success
  }, [])

  const removeTrip = useCallback((tripId: string) => {
    tripCart.removeTrip(tripId)
    setTrips(tripCart.getTrips())
    setCartCount(tripCart.getCartCount())
  }, [])

  const updateTrip = useCallback((tripId: string, updates: Partial<TripItem>) => {
    tripCart.updateTrip(tripId, updates)
    setTrips(tripCart.getTrips())
  }, [])

  const clearCart = useCallback(() => {
    tripCart.clearCart()
    setTrips([])
    setCartCount(0)
  }, [])

  return {
    trips,
    cartCount,
    addTrip,
    removeTrip,
    updateTrip,
    clearCart,
    isCartFull: tripCart.isCartFull(),
    totalPrice: tripCart.getTotalPrice()
  }
} 
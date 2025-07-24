"use client"

import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { X, Trash2, Edit, ShoppingCart, CreditCard } from "lucide-react"
import { TripItem } from "@/lib/trip-cart"
import Image from "next/image"

interface TripCartModalProps {
  isOpen: boolean
  onClose: () => void
  trips: TripItem[]
  onRemoveTrip: (tripId: string) => void
  onEditTrip: (trip: TripItem) => void
  onProceedToPayment: () => void
  totalPrice: number
}

export default function TripCartModal({
  isOpen,
  onClose,
  trips,
  onRemoveTrip,
  onEditTrip,
  onProceedToPayment,
  totalPrice
}: TripCartModalProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const getBudgetRange = (budget: string) => {
    const ranges = {
      'budget': '$1,000 - $3,000',
      'mid-range': '$3,000 - $7,000', 
      'luxury': '$7,000 - $15,000',
      'ultra-luxury': '$15,000+'
    }
    return ranges[budget as keyof typeof ranges] || budget
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-2xl font-light text-amber-900">
            <ShoppingCart className="h-6 w-6" />
            Your Trip Cart
            <span className="text-sm font-normal text-amber-600 bg-amber-100 px-3 py-1 rounded-full">
              {trips.length} {trips.length === 1 ? 'trip' : 'trips'}
            </span>
          </DialogTitle>
        </DialogHeader>

        {trips.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingCart className="h-16 w-16 text-amber-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-amber-900 mb-2">Your cart is empty</h3>
            <p className="text-amber-600 mb-6">Start building your dream trips to see them here</p>
            <Button onClick={onClose} className="bg-amber-900 hover:bg-amber-800">
              Start Building
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Trip Items */}
            <div className="space-y-4">
              {trips.map((trip, index) => (
                <div key={trip.id} className="bg-white border border-amber-200 rounded-2xl p-6 shadow-sm">
                  <div className="flex gap-4">
                    {/* Destination Image */}
                    <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                      <Image
                        src={trip.destination.image_url}
                        alt={trip.destination.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Trip Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-semibold text-amber-900 truncate">
                          {trip.destination.name}
                          {trip.destination.country && (
                            <span className="text-sm font-normal text-amber-600 ml-2">
                              {trip.destination.country}
                            </span>
                          )}
                        </h3>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onEditTrip(trip)}
                            className="text-amber-600 hover:text-amber-800 hover:bg-amber-50"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onRemoveTrip(trip.id)}
                            className="text-red-600 hover:text-red-800 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-amber-600 font-medium">Budget:</span>
                          <p className="text-amber-900">{getBudgetRange(trip.budget)}</p>
                        </div>
                        <div>
                          <span className="text-amber-600 font-medium">Duration:</span>
                          <p className="text-amber-900">{trip.duration}</p>
                        </div>
                        <div>
                          <span className="text-amber-600 font-medium">Traveler:</span>
                          <p className="text-amber-900">{trip.name}</p>
                        </div>
                        <div>
                          <span className="text-amber-600 font-medium">Experiences:</span>
                          <p className="text-amber-900">{trip.experiences.length} selected</p>
                        </div>
                      </div>

                      {trip.notes && (
                        <div className="mt-3">
                          <span className="text-amber-600 font-medium text-sm">Notes:</span>
                          <p className="text-amber-900 text-sm mt-1">{trip.notes}</p>
                        </div>
                      )}

                      {trip.totalPrice && (
                        <div className="mt-3 text-right">
                          <span className="text-lg font-semibold text-amber-900">
                            {formatPrice(trip.totalPrice)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Summary */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-amber-900">Cart Summary</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    // Clear cart functionality
                    if (confirm('Are you sure you want to clear your cart?')) {
                      // This would need to be passed down from parent
                    }
                  }}
                  className="text-red-600 hover:text-red-800 hover:bg-red-50"
                >
                  Clear All
                </Button>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-amber-600">Trips:</span>
                  <span className="text-amber-900">{trips.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-amber-600">Estimated Total:</span>
                  <span className="text-lg font-semibold text-amber-900">
                    {formatPrice(totalPrice)}
                  </span>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <Button
                  onClick={onClose}
                  variant="outline"
                  className="flex-1 border-amber-200 text-amber-900 hover:bg-amber-50"
                >
                  Continue Building
                </Button>
                <Button
                  onClick={onProceedToPayment}
                  className="flex-1 bg-amber-900 hover:bg-amber-800 text-white"
                >
                  <CreditCard className="h-4 w-4 mr-2" />
                  Proceed to Payment
                </Button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
} 
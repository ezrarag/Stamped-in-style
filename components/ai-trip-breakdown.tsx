"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Calendar, 
  MapPin, 
  Clock, 
  DollarSign, 
  Star, 
  Lightbulb, 
  Heart,
  Utensils,
  Bed,
  Car,
  Activity
} from 'lucide-react'
import { TripAnalysis, TripBreakdown, AIRecommendation } from '@/lib/ai-service'

interface AITripBreakdownProps {
  tripAnalysis: TripAnalysis
  destination: string
  onClose: () => void
}

export default function AITripBreakdown({ 
  tripAnalysis, 
  destination, 
  onClose 
}: AITripBreakdownProps) {
  const [activeTab, setActiveTab] = useState<'breakdown' | 'recommendations' | 'tips'>('breakdown')

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const getIconForRecommendationType = (type: string) => {
    switch (type) {
      case 'restaurant': return <Utensils className="h-4 w-4" />
      case 'hotel': return <Bed className="h-4 w-4" />
      case 'activity': return <Activity className="h-4 w-4" />
      case 'experience': return <Star className="h-4 w-4" />
      default: return <Heart className="h-4 w-4" />
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-3xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-900 to-orange-800 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-light mb-2">AI-Powered Trip Breakdown</h2>
              <p className="text-amber-100 flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                {destination}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-white hover:bg-white/20"
            >
              ×
            </Button>
          </div>
          
          {/* Summary */}
          <div className="mt-4 p-4 bg-white/10 rounded-2xl">
            <p className="text-amber-50 text-sm leading-relaxed">{tripAnalysis.summary}</p>
            <div className="flex items-center gap-4 mt-3 text-sm">
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {tripAnalysis.breakdown.length} days
              </span>
              <span className="flex items-center gap-1">
                <DollarSign className="h-4 w-4" />
                {formatPrice(tripAnalysis.totalEstimatedCost)}
              </span>
              <span className="flex items-center gap-1">
                <Star className="h-4 w-4" />
                {tripAnalysis.recommendations.length} recommendations
              </span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-amber-200">
          {[
            { id: 'breakdown', label: 'Daily Itinerary', icon: Calendar },
            { id: 'recommendations', label: 'Recommendations', icon: Star },
            { id: 'tips', label: 'Insider Tips', icon: Lightbulb }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 flex items-center justify-center gap-2 py-4 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-amber-900 border-b-2 border-amber-900'
                  : 'text-amber-600 hover:text-amber-800'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          <AnimatePresence mode="wait">
            {activeTab === 'breakdown' && (
              <motion.div
                key="breakdown"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                {tripAnalysis.breakdown.map((day, index) => (
                  <Card key={day.day} className="border-amber-200 shadow-lg">
                    <CardHeader className="bg-amber-50 border-b border-amber-200">
                      <CardTitle className="flex items-center justify-between text-amber-900">
                        <span>Day {day.day}: {day.title}</span>
                        <Badge variant="secondary" className="bg-amber-200 text-amber-900">
                          {formatPrice(day.estimatedCost)}
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <p className="text-amber-800 mb-4 leading-relaxed">{day.description}</p>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        {/* Activities */}
                        <div>
                          <h4 className="font-semibold text-amber-900 mb-3 flex items-center gap-2">
                            <Activity className="h-4 w-4" />
                            Activities
                          </h4>
                          <ul className="space-y-2">
                            {day.activities.map((activity, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm">
                                <span className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></span>
                                {activity}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Details */}
                        <div className="space-y-4">
                          {day.accommodation && (
                            <div>
                              <h4 className="font-semibold text-amber-900 mb-2 flex items-center gap-2">
                                <Bed className="h-4 w-4" />
                                Accommodation
                              </h4>
                              <p className="text-sm text-amber-700">{day.accommodation}</p>
                            </div>
                          )}
                          
                          {day.dining && (
                            <div>
                              <h4 className="font-semibold text-amber-900 mb-2 flex items-center gap-2">
                                <Utensils className="h-4 w-4" />
                                Dining
                              </h4>
                              <p className="text-sm text-amber-700">{day.dining}</p>
                            </div>
                          )}
                          
                          {day.transportation && (
                            <div>
                              <h4 className="font-semibold text-amber-900 mb-2 flex items-center gap-2">
                                <Car className="h-4 w-4" />
                                Transportation
                              </h4>
                              <p className="text-sm text-amber-700">{day.transportation}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </motion.div>
            )}

            {activeTab === 'recommendations' && (
              <motion.div
                key="recommendations"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="grid md:grid-cols-2 gap-6"
              >
                {tripAnalysis.recommendations.map((rec, index) => (
                  <Card key={index} className="border-amber-200 shadow-lg hover:shadow-xl transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          {getIconForRecommendationType(rec.type)}
                          <Badge variant="outline" className="text-xs">
                            {rec.type}
                          </Badge>
                        </div>
                        <Badge variant="secondary" className="bg-amber-100 text-amber-900">
                          {formatPrice(rec.estimatedCost)}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg text-amber-900">{rec.name}</CardTitle>
                      {rec.location && (
                        <p className="text-sm text-amber-600 flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {rec.location}
                        </p>
                      )}
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-amber-800 text-sm mb-3">{rec.description}</p>
                      <div className="bg-amber-50 p-3 rounded-lg">
                        <p className="text-xs text-amber-700 font-medium mb-1">Why Recommended:</p>
                        <p className="text-xs text-amber-600">{rec.whyRecommended}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </motion.div>
            )}

            {activeTab === 'tips' && (
              <motion.div
                key="tips"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                {tripAnalysis.tips.map((tip, index) => (
                  <Card key={index} className="border-amber-200 bg-amber-50/50">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <Lightbulb className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                        <p className="text-amber-800">{tip}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="border-t border-amber-200 p-4 bg-amber-50">
          <div className="flex items-center justify-between">
            <div className="text-sm text-amber-600">
              Generated with AI • Total: {formatPrice(tripAnalysis.totalEstimatedCost)}
            </div>
            <Button onClick={onClose} className="bg-amber-900 hover:bg-amber-800">
              Close
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
} 
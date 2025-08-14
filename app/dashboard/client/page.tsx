"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Plus, 
  TrendingUp, 
  Globe, 
  Calendar, 
  Users, 
  Sparkles, 
  RefreshCw, 
  Eye, 
  Edit, 
  Copy, 
  Check, 
  X,
  BarChart3,
  MapPin,
  Clock,
  Star,
  Filter,
  Search,
  Home,
  CreditCard,
  FileText,
  Settings,
  Bell,
  HelpCircle,
  Grid3X3,
  ChevronDown,
  ChevronRight,
  Rocket,
  Lock,
  CheckCircle,
  Circle
} from "lucide-react"

// Mock data - replace with real Supabase calls
const mockUser = {
  name: "Amber",
  email: "amber@stampedinstyle.com",
  avatar: "/placeholder-user.jpg"
}

const mockAISuggestions = [
  {
    id: 1,
    title: "Luxury Maldives Wellness Retreat",
    description: "AI-detected trending wellness destination with 40% increase in searches",
    category: "Wellness",
    confidence: 92,
    source: "Marketplace Trends + Seasonal Data",
    preview: "7-day overwater villa experience with spa treatments and meditation sessions"
  },
  {
    id: 2,
    title: "Moroccan Desert Adventure",
    description: "Cultural experience trending with 28% engagement increase",
    category: "Cultural",
    confidence: 87,
    source: "User Preference Analysis",
    preview: "3-day Sahara expedition with traditional Berber hospitality"
  },
  {
    id: 3,
    title: "Swiss Alps Luxury Ski Experience",
    description: "Seasonal winter destination with high luxury traveler interest",
    category: "Adventure",
    confidence: 94,
    source: "Seasonal Data + Market Analysis",
    preview: "5-star ski-in-ski-out resort with private instructor"
  }
]

const mockCuratedTrips = [
  {
    id: 1,
    title: "Santorini Luxury Experience",
    category: "Luxury",
    dateAdded: "2024-01-15",
    aiGenerated: true,
    views: 1247,
    engagement: 89
  },
  {
    id: 2,
    title: "Japanese Cherry Blossom Tour",
    category: "Cultural",
    dateAdded: "2024-01-10",
    aiGenerated: false,
    views: 892,
    engagement: 76
  },
  {
    id: 3,
    title: "Costa Rica Eco Adventure",
    category: "Adventure",
    dateAdded: "2024-01-08",
    aiGenerated: true,
    views: 1567,
    engagement: 94
  }
]

const mockAnalytics = {
  trendingDestinations: [
    { name: "Maldives", trend: "+45%", category: "Wellness" },
    { name: "Morocco", trend: "+32%", category: "Cultural" },
    { name: "Switzerland", trend: "+28%", category: "Adventure" },
    { name: "Japan", trend: "+22%", category: "Cultural" }
  ],
  categoryInterest: [
    { category: "Wellness", interest: 85, change: "+12%" },
    { category: "Cultural", interest: 78, change: "+8%" },
    { category: "Adventure", interest: 72, change: "+15%" },
    { category: "Luxury", interest: 68, change: "+5%" }
  ]
}

export default function ClientDashboard() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [aiSuggestions, setAiSuggestions] = useState(mockAISuggestions)
  const [curatedTrips, setCuratedTrips] = useState(mockCuratedTrips)
  const [isLoading, setIsLoading] = useState(false)
  const [lastDataSync, setLastDataSync] = useState("2024-01-20 14:30")
  const [isSetupGuideOpen, setIsSetupGuideOpen] = useState(true)
  const [expandedSetupItems, setExpandedSetupItems] = useState({
    business: true,
    payments: false,
    verify: false,
    golive: false,
    issuing: false,
    radar: false,
    tax: false
  })

  const handleAIAction = (suggestionId: number, action: 'approve' | 'edit' | 'dismiss') => {
    if (action === 'approve') {
      const suggestion = aiSuggestions.find(s => s.id === suggestionId)
      if (suggestion) {
        setCuratedTrips(prev => [...prev, {
          id: Date.now(),
          title: suggestion.title,
          category: suggestion.category,
          dateAdded: new Date().toISOString().split('T')[0],
          aiGenerated: true,
          views: 0,
          engagement: 0
        }])
        setAiSuggestions(prev => prev.filter(s => s.id !== suggestionId))
      }
    } else if (action === 'dismiss') {
      setAiSuggestions(prev => prev.filter(s => s.id !== suggestionId))
    }
  }

  const refreshData = async () => {
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    setLastDataSync(new Date().toLocaleString())
    setIsLoading(false)
  }

  const filteredCuratedTrips = selectedCategory === "all" 
    ? curatedTrips 
    : curatedTrips.filter(trip => trip.category.toLowerCase() === selectedCategory.toLowerCase())

  const toggleSetupItem = (item: string) => {
    setExpandedSetupItems(prev => ({
      ...prev,
      [item]: !prev[item as keyof typeof prev]
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-amber-400 to-amber-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="font-semibold text-gray-900">Stamped in Style</span>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          <a href="#" className="flex items-center space-x-3 px-3 py-2 text-purple-600 bg-purple-50 rounded-lg">
            <Home className="w-5 h-5" />
            <span className="font-medium">Home</span>
          </a>
          
          <a href="#" className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
            <CreditCard className="w-5 h-5" />
            <span>Balances</span>
          </a>
          
          <a href="#" className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
            <FileText className="w-5 h-5" />
            <span>Transactions</span>
          </a>
          
          <a href="#" className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
            <Users className="w-5 h-5" />
            <span>Customers</span>
          </a>
          
          <a href="#" className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
            <Globe className="w-5 h-5" />
            <span>Product catalog</span>
          </a>

          {/* Shortcuts */}
          <div className="pt-4">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Shortcuts</h3>
            <a href="#" className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
              <Rocket className="w-5 h-5" />
              <span>Connect</span>
            </a>
          </div>

          {/* Products */}
          <div className="pt-4">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Products</h3>
            <div className="space-y-1">
              <a href="#" className="flex items-center justify-between px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
                <span>Payments</span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </a>
              <a href="#" className="flex items-center justify-between px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
                <span>Billing</span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </a>
              <a href="#" className="flex items-center justify-between px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
                <span>Reporting</span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </a>
              <a href="#" className="flex items-center justify-between px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
                <span>More</span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </a>
            </div>
          </div>
        </nav>

        {/* Bottom */}
        <div className="p-4 border-t border-gray-200">
          <a href="#" className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
            <Settings className="w-5 h-5" />
            <span>Developers</span>
          </a>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <h1 className="text-2xl font-semibold text-gray-900">Today</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search"
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-400">/</div>
              </div>

              {/* Icons */}
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Grid3X3 className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <HelpCircle className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Settings className="w-5 h-5" />
              </button>
              <button className="p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>

        {/* Main Dashboard Content */}
        <main className="flex-1 p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Main Metrics */}
            <div className="lg:col-span-2 space-y-6">
              {/* Financial Metrics */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Gross volume</p>
                    <p className="text-2xl font-semibold text-gray-900">$0.00</p>
                    <p className="text-xs text-gray-500">7:09 PM</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Yesterday</p>
                    <p className="text-2xl font-semibold text-gray-900">$0.00</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">USD balance</p>
                    <p className="text-2xl font-semibold text-gray-900">$0.00</p>
                    <p className="text-xs text-gray-500">Available to pay out</p>
                    <a href="#" className="text-sm text-purple-600 hover:underline">View</a>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Payouts</p>
                    <p className="text-2xl font-semibold text-gray-900">$0.00</p>
                    <a href="#" className="text-sm text-purple-600 hover:underline">View</a>
                  </div>
                </div>
                
                {/* Chart Placeholder */}
                <div className="mt-6 h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-gray-500 text-sm">Chart: No activity data</div>
                </div>
              </div>

              {/* AI Suggestions Feed */}
              <div className="bg-white rounded-lg border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                      <Sparkles className="w-5 h-5 text-purple-600" />
                      <span>AI Suggestions Feed</span>
                    </h2>
                    <span className="text-sm text-gray-500">{aiSuggestions.length} new suggestions</span>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  {aiSuggestions.map((suggestion) => (
                    <div key={suggestion.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="font-semibold text-gray-900">{suggestion.title}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              suggestion.category === 'Wellness' ? 'bg-green-100 text-green-800' :
                              suggestion.category === 'Cultural' ? 'bg-blue-100 text-blue-800' :
                              'bg-orange-100 text-orange-800'
                            }`}>
                              {suggestion.category}
                            </span>
                            <span className="text-sm text-gray-500">Confidence: {suggestion.confidence}%</span>
                          </div>
                          <p className="text-gray-700 text-sm mb-2">{suggestion.description}</p>
                          <p className="text-gray-600 text-xs">{suggestion.preview}</p>
                          <p className="text-gray-500 text-xs mt-2">Source: {suggestion.source}</p>
                        </div>
                        <div className="flex space-x-2 ml-4">
                          <button 
                            onClick={() => handleAIAction(suggestion.id, 'approve')}
                            className="p-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                            title="Approve"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleAIAction(suggestion.id, 'edit')}
                            className="p-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleAIAction(suggestion.id, 'dismiss')}
                            className="p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                            title="Dismiss"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Analytics & Trends */}
              <div className="bg-white rounded-lg border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                    <BarChart3 className="w-5 h-5 text-purple-600" />
                    <span>Analytics & Trends</span>
                  </h2>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Trending Destinations */}
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-3">Top Trending Destinations</h3>
                      <div className="space-y-2">
                        {mockAnalytics.trendingDestinations.map((dest, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                            <div className="flex items-center space-x-2">
                              <MapPin className="w-4 h-4 text-purple-600" />
                              <span className="text-sm font-medium text-gray-900">{dest.name}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="text-xs text-gray-500">{dest.category}</span>
                              <span className="text-sm font-bold text-green-600">{dest.trend}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Category Interest */}
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-3">Category Interest</h3>
                      <div className="space-y-2">
                        {mockAnalytics.categoryInterest.map((cat, index) => (
                          <div key={index} className="p-2 bg-gray-50 rounded-lg">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm font-medium text-gray-900">{cat.category}</span>
                              <span className="text-sm font-bold text-gray-700">{cat.interest}%</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="flex-1 bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                                  style={{ width: `${cat.interest}%` }}
                                ></div>
                              </div>
                              <span className="text-xs text-green-600">{cat.change}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              {/* Pay Out Funds Button */}
              <button className="w-full p-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                Pay out funds
              </button>

              {/* Recommendations */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Recommendations</h3>
                <div className="space-y-3 text-sm text-gray-600">
                  <p>
                    <a href="#" className="text-purple-600 hover:underline">Send an invoice.</a>
                  </p>
                  <p>
                    Go live on Stripe quickly with <a href="#" className="text-purple-600 hover:underline">platform partners</a> that help you set up, market, and manage your business.
                  </p>
                </div>
              </div>

              {/* API Keys */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">API keys</h3>
                  <a href="#" className="text-sm text-purple-600 hover:underline">View docs</a>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Publishable key</p>
                    <p className="text-sm font-mono text-gray-700">pk_live_51RSfo72KS9Eci...</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Secret key</p>
                    <div className="flex items-center space-x-2">
                      <p className="text-sm font-mono text-gray-700">••••••••••••••••••••••••••••••••</p>
                      <Eye className="w-4 h-4 text-gray-400 cursor-pointer" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Live Data Status */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Live Data Status</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Last API Sync</span>
                    <span className="font-medium text-gray-900">{lastDataSync}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">New Destinations</span>
                    <span className="font-medium text-gray-900">+12</span>
                  </div>
                  <button 
                    onClick={refreshData}
                    disabled={isLoading}
                    className="w-full flex items-center justify-center space-x-2 p-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
                  >
                    <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                    <span>{isLoading ? 'Syncing...' : 'Refresh Data'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Floating Setup Guide - Bottom Right */}
      <AnimatePresence>
        {isSetupGuideOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-6 right-6 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50"
          >
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">Setup guide</h3>
                <button 
                  onClick={() => setIsSetupGuideOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="p-4 space-y-3">
              {/* Tell us about your business */}
              <div>
                <button 
                  onClick={() => toggleSetupItem('business')}
                  className="w-full flex items-center justify-between text-left"
                >
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-medium text-gray-900">Tell us about your business</span>
                  </div>
                  {expandedSetupItems.business ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </button>
                {expandedSetupItems.business && (
                  <div className="mt-2 ml-6">
                    <div className="flex items-center space-x-2">
                      <input type="radio" checked className="text-purple-600" />
                      <span className="text-sm text-gray-600">Choose your business model</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Set up payments */}
              <div>
                <button 
                  onClick={() => toggleSetupItem('payments')}
                  className="w-full flex items-center justify-between text-left"
                >
                  <div className="flex items-center space-x-2">
                    <Circle className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-900">Set up payments</span>
                  </div>
                  {expandedSetupItems.payments ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </button>
                {expandedSetupItems.payments && (
                  <div className="mt-2 ml-6">
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Lock className="w-4 h-4" />
                      <span>Test Connect</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Verify your business */}
              <div>
                <button 
                  onClick={() => toggleSetupItem('verify')}
                  className="w-full flex items-center justify-between text-left"
                >
                  <div className="flex items-center space-x-2">
                    <Circle className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-900">Verify your business</span>
                  </div>
                  {expandedSetupItems.verify ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </button>
              </div>

              {/* Go live */}
              <div>
                <button 
                  onClick={() => toggleSetupItem('golive')}
                  className="w-full flex items-center justify-between text-left"
                >
                  <div className="flex items-center space-x-2">
                    <Circle className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-900">Go live</span>
                  </div>
                  {expandedSetupItems.golive ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </button>
              </div>

              {/* Set up Issuing */}
              <div>
                <button 
                  onClick={() => toggleSetupItem('issuing')}
                  className="w-full flex items-center justify-between text-left"
                >
                  <div className="flex items-center space-x-2">
                    <Circle className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-900">Set up Issuing</span>
                  </div>
                  {expandedSetupItems.issuing ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </button>
              </div>

              {/* Set up Radar */}
              <div>
                <button 
                  onClick={() => toggleSetupItem('radar')}
                  className="w-full flex items-center justify-between text-left"
                >
                  <div className="flex items-center space-x-2">
                    <Circle className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-900">Set up Radar</span>
                  </div>
                  {expandedSetupItems.radar ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </button>
              </div>

              {/* Set up Tax */}
              <div>
                <button 
                  onClick={() => toggleSetupItem('tax')}
                  className="w-full flex items-center justify-between text-left"
                >
                  <div className="flex items-center space-x-2">
                    <Circle className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-900">Set up Tax</span>
                  </div>
                  {expandedSetupItems.tax ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 
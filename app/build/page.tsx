'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'

// API call to save preferences & generate itinerary
async function planTrip(data: any) {
  const res = await fetch('/api/plan-trip', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Failed to plan trip')
  return res.json() // { itinerary: string }
}

// Simulated dynamic fetch (swap for Supabase or real API)
async function fetchDestinations(query: string) {
  const all = [
    { id: 1, name: 'Paris', country: 'France' },
    { id: 2, name: 'Tokyo', country: 'Japan' },
    { id: 3, name: 'New York', country: 'USA' },
    { id: 4, name: 'Lisbon', country: 'Portugal' },
    { id: 5, name: 'Rome', country: 'Italy' },
    { id: 6, name: 'Bangkok', country: 'Thailand' },
  ]
  if (!query) return all
  return all.filter((d) => d.name.toLowerCase().includes(query.toLowerCase()))
}

export default function BuildPage() {
  const [step, setStep] = useState(1)
  const [search, setSearch] = useState('')
  const [destinations, setDestinations] = useState<{ id: number; name: string; country: string }[]>([])
  const [loading, setLoading] = useState(false)
  const [fetchError, setFetchError] = useState<string | null>(null)

  const [selectedCity, setSelectedCity] = useState<string | null>(null)
  const [budget, setBudget] = useState('Medium')
  const [duration, setDuration] = useState('1 week')
  const [experiences, setExperiences] = useState<string[]>([])

  const [aiPlan, setAiPlan] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const progress = (step / 3) * 100

  // Debounced fetch for destination search
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(true)
      fetchDestinations(search)
        .then((res) => {
          setDestinations(res)
          setLoading(false)
        })
        .catch(() => {
          setFetchError('Failed to load destinations')
          setLoading(false)
        })
    }, 300)
    return () => clearTimeout(timeout)
  }, [search])

  const toggleExperience = (exp: string) => {
    setExperiences((prev) =>
      prev.includes(exp) ? prev.filter((e) => e !== exp) : [...prev, exp]
    )
  }

  const handleFinish = async () => {
    setSubmitting(true)
    setSubmitError(null)
    try {
      const data = { city: selectedCity, budget, duration, experiences }
      const result = await planTrip(data)
      setAiPlan(result.itinerary)
    } catch (err) {
      setSubmitError('Something went wrong while planning your trip.')
    } finally {
      setSubmitting(false)
    }
  }

  const Step1 = () => (
    <motion.div key="step1" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.4 }} className="space-y-6">
      <h2 className="text-2xl font-bold text-amber-900">Step 1: Choose Your Destination</h2>
      <input
        type="text"
        placeholder="Search destinations..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border border-amber-300 rounded-lg px-4 py-2 text-amber-900"
      />
      {loading && <p className="text-amber-600">Searching…</p>}
      {fetchError && <p className="text-red-600">{fetchError}</p>}
      {!loading && !fetchError && search && (
        <ul className="border border-amber-300 rounded-lg divide-y divide-amber-200 max-h-60 overflow-y-auto">
          {destinations.map((d) => (
            <li
              key={d.id}
              onClick={() => {
                setSelectedCity(d.name)
                setSearch(d.name)
                setDestinations([])
              }}
              className="px-4 py-2 cursor-pointer hover:bg-amber-100"
            >
              {d.name}, {d.country}
            </li>
          ))}
        </ul>
      )}
      <div className="flex justify-between">
        <div />
        <Button onClick={() => setStep(step + 1)} disabled={!selectedCity} className="bg-amber-900 text-white hover:bg-amber-800 rounded-full px-6 py-2">Next</Button>
      </div>
    </motion.div>
  )

  const Step2 = () => (
    <motion.div key="step2" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.4 }} className="space-y-6">
      <h2 className="text-2xl font-bold text-amber-900">Step 2: Trip Details</h2>
      <div>
        <label className="block text-amber-900 mb-2">Budget</label>
        <select value={budget} onChange={(e) => setBudget(e.target.value)} className="border border-amber-300 rounded-lg px-4 py-2 text-amber-900">
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
      </div>
      <div>
        <label className="block text-amber-900 mb-2">Trip Duration</label>
        <select value={duration} onChange={(e) => setDuration(e.target.value)} className="border border-amber-300 rounded-lg px-4 py-2 text-amber-900">
          <option>Weekend</option>
          <option>1 week</option>
          <option>2+ weeks</option>
        </select>
      </div>
      <div className="flex justify-between">
        <Button onClick={() => setStep(step - 1)} className="bg-gray-300 text-amber-900 hover:bg-gray-400 rounded-full px-6 py-2">Back</Button>
        <Button onClick={() => setStep(step + 1)} className="bg-amber-900 text-white hover:bg-amber-800 rounded-full px-6 py-2">Next</Button>
      </div>
    </motion.div>
  )

  const Step3 = () => {
    const options = ['Food', 'Adventure', 'Relaxation', 'Culture', 'Nightlife']
    return (
      <motion.div key="step3" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.4 }} className="space-y-6">
        <h2 className="text-2xl font-bold text-amber-900">Step 3: Pick Your Experiences</h2>
        <div className="grid grid-cols-2 gap-4">
          {options.map((opt) => (
            <label key={opt} className={`p-4 border rounded-lg cursor-pointer transition-all ${
              experiences.includes(opt) ? 'bg-amber-200 border-amber-600' : 'hover:bg-amber-100'
            }`}>
              <input
                type="checkbox"
                checked={experiences.includes(opt)}
                onChange={() => toggleExperience(opt)}
                className="mr-2"
              />
              {opt}
            </label>
          ))}
        </div>
        <div className="flex justify-between">
          <Button onClick={() => setStep(step - 1)} className="bg-gray-300 text-amber-900 hover:bg-gray-400 rounded-full px-6 py-2">Back</Button>
          <Button onClick={handleFinish} disabled={submitting} className="bg-green-700 text-white hover:bg-green-600 rounded-full px-6 py-2">
            {submitting ? 'Planning…' : 'Finish'}
          </Button>
        </div>
        {submitError && <p className="text-red-600 mt-4">{submitError}</p>}
        {aiPlan && (
          <div className="mt-6 p-4 border rounded-lg bg-amber-50 text-amber-900">
            <h3 className="font-bold mb-2">Your AI Itinerary</h3>
            <p>{aiPlan}</p>
          </div>
        )}
      </motion.div>
    )
  }

  return (
    <div className="min-h-screen bg-amber-50">
      <header className="bg-amber-900 text-white p-6 shadow">
        <h1 className="text-3xl font-bold">Build Your Trip</h1>
      </header>
      <main className="max-w-4xl mx-auto p-6 space-y-6">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-amber-600 h-2 rounded-full transition-all" style={{ width: `${progress}%` }} />
        </div>
        <AnimatePresence mode="wait">
          {step === 1 && <Step1 />}
          {step === 2 && <Step2 />}
          {step === 3 && <Step3 />}
        </AnimatePresence>
      </main>
    </div>
  )
}
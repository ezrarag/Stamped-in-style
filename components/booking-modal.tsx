"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
}

interface FormData {
  fullName: string
  email: string
  phone: string
  contactPreference: string
  passengerCount: string
  passengerAges: string
  validPassports: string
  roomCount: string
  destination: string
  travelDate: string
  nightsCount: string
  budgetPerPerson: string
  specificHotel: string
  allInclusive: string
  includeFlights: string
  flightDetails: string
  activities: string
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    contactPreference: "",
    passengerCount: "",
    passengerAges: "",
    validPassports: "",
    roomCount: "",
    destination: "",
    travelDate: "",
    nightsCount: "",
    budgetPerPerson: "",
    specificHotel: "",
    allInclusive: "",
    includeFlights: "",
    flightDetails: "",
    activities: "",
  })

  const steps = [
    {
      title: "Contact Information",
      fields: [
        { name: "fullName", label: "Full Name", type: "text", required: true },
        { name: "email", label: "Email", type: "email", required: true },
        { name: "phone", label: "Phone", type: "tel", required: true },
        {
          name: "contactPreference",
          label: "Do you prefer email or text updates?",
          type: "radio",
          options: ["Email", "Text"],
          required: true,
        },
      ],
    },
    {
      title: "Passenger Details",
      fields: [
        { name: "passengerCount", label: "How many passengers will be traveling?", type: "text", required: true },
        { name: "passengerAges", label: "What are the ages of each passenger?", type: "textarea", required: true },
        {
          name: "validPassports",
          label: "Does each passenger have a valid passport that expires at least 6 months after the date of travel?",
          type: "radio",
          options: ["Yes", "No"],
          required: true,
        },
      ],
    },
    {
      title: "Accommodation",
      fields: [
        { name: "roomCount", label: "How many rooms will you need?", type: "text", required: true },
        { name: "destination", label: "What destination would you like a quote for?", type: "text", required: true },
        { name: "travelDate", label: "What date would you like a quote for? If you don't have a specific date in mind, list the month and year.", type: "text", required: true },
        { name: "nightsCount", label: "If you didn't provide a specific date, how many nights do you want to stay?", type: "text", required: false },
      ],
    },
    {
      title: "Budget & Preferences",
      fields: [
        { name: "budgetPerPerson", label: "What is your desired budget for your trip per person?", type: "text", required: true },
        { name: "specificHotel", label: "Do you have a specific hotel/resort in mind?", type: "textarea", required: false },
        {
          name: "allInclusive",
          label: "Do you prefer an all-inclusive resort?",
          type: "radio",
          options: ["Yes", "No"],
          required: true,
        },
      ],
    },
    {
      title: "Flights & Activities",
      fields: [
        {
          name: "includeFlights",
          label: "Are you requesting a package with flights?",
          type: "radio",
          options: ["Yes", "No"],
          required: true,
        },
        { name: "flightDetails", label: "If yes, please share departure city and any flight preferences", type: "textarea", required: false },
        { name: "activities", label: "Please list any other activities/excursions you're interested in", type: "textarea", required: false },
      ],
    },
  ]

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    try {
      // Save booking inquiry to Supabase
      const response = await fetch('/api/trip-submissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          status: 'pending',
          createdAt: new Date().toISOString(),
        }),
      })

      if (response.ok) {
        const result = await response.json()
        
        // Close modal and redirect to dashboard
        onClose()
        window.location.href = `/dashboard/client?id=${result.id}`
      } else {
        console.error('Failed to submit booking inquiry')
      }
    } catch (error) {
      console.error('Error submitting booking inquiry:', error)
    }
  }

  const renderField = (field: any) => {
    const value = formData[field.name as keyof FormData] as string

    if (field.type === "radio") {
      return (
        <RadioGroup
          value={value}
          onValueChange={(value) => handleInputChange(field.name, value)}
          className="space-y-3"
        >
          {field.options?.map((option: string) => (
            <div key={option} className="flex items-center space-x-2">
              <RadioGroupItem value={option} id={`${field.name}-${option}`} />
              <Label htmlFor={`${field.name}-${option}`} className="text-white">
                {option}
              </Label>
            </div>
          ))}
        </RadioGroup>
      )
    }

    if (field.type === "textarea") {
      return (
        <Textarea
          value={value}
          onChange={(e) => handleInputChange(field.name, e.target.value)}
          placeholder={field.label}
          className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
          rows={3}
        />
      )
    }

    return (
      <Input
        type={field.type}
        value={value}
        onChange={(e) => handleInputChange(field.name, e.target.value)}
        placeholder={field.label}
        className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
      />
    )
  }

  if (!isOpen) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-amber-900/95 backdrop-blur-md rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Booking Inquiry</h2>
            <p className="text-amber-200 text-sm">
              Step {currentStep + 1} of {steps.length}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-white hover:bg-white/10"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-white/20 rounded-full h-2 mb-8">
          <motion.div
            className="bg-amber-200 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Form Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-xl font-semibold text-white mb-6">
              {steps[currentStep].title}
            </h3>

            <div className="space-y-6">
              {steps[currentStep].fields.map((field, index) => (
                <div key={index} className="space-y-2">
                  <Label className="text-white font-medium">
                    {field.label}
                    {field.required && <span className="text-red-400 ml-1">*</span>}
                  </Label>
                  {renderField(field)}
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/20">
          <Button
            variant="ghost"
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="text-white hover:bg-white/10 disabled:opacity-50"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>

          {currentStep === steps.length - 1 ? (
            <Button
              onClick={handleSubmit}
              className="bg-white text-amber-900 hover:bg-amber-100 px-8"
            >
              Submit Inquiry
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              className="bg-white text-amber-900 hover:bg-amber-100 px-8"
            >
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          )}
        </div>

        {/* Policy Notice */}
        {currentStep === steps.length - 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-4 bg-white/10 rounded-lg border border-white/20"
          >
            <h4 className="text-white font-semibold mb-2">Booking Request Policy</h4>
            <ul className="text-amber-200 text-sm space-y-1">
              <li>• Your first quote will be sent for free, and all other quotes will be $25 each.</li>
              <li>• Any quote fees paid will go toward your booking.</li>
              <li>• Deposits for reservations WITHOUT flights are $155/per room.</li>
              <li>• Reservations with flights require the entire flight amount to be paid at the time of booking.</li>
              <li>• Prices are subject to change and cannot be guaranteed until a deposit has been paid.</li>
              <li>• All fees are non-refundable.</li>
            </ul>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  )
} 
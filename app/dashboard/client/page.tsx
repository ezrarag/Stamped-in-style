"use client"

import React from "react"

const trip = {
  destination: "Santorini, Greece",
  dates: "July 10–17, 2024",
  itinerary: [
    "Arrival & Welcome Dinner",
    "Private Catamaran Tour",
    "Wine Tasting Experience",
    "Free Day",
    "Sunset Photoshoot",
    "Departure",
  ],
  documents: [
    { name: "Itinerary.pdf", url: "#" },
    { name: "Booking Confirmation.pdf", url: "#" },
  ],
}

const payments = [
  { due: "2024-05-01", amount: "$1,500", status: "Paid" },
  { due: "2024-06-01", amount: "$1,500", status: "Due" },
]

export default function ClientDashboard() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-8 px-4">
      <h1 className="text-2xl font-semibold text-amber-900 mb-6">Your Trip</h1>
      <div className="w-full max-w-md bg-amber-50 rounded-xl shadow p-6 mb-8">
        <h2 className="text-lg font-bold text-amber-800 mb-2">{trip.destination}</h2>
        <p className="text-sm text-amber-700 mb-4">{trip.dates}</p>
        <ul className="list-disc list-inside text-amber-900 text-sm mb-4">
          {trip.itinerary.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
        <div className="mb-2">
          <span className="font-medium text-amber-800">Documents:</span>
          <ul className="text-amber-700 text-sm mt-1">
            {trip.documents.map((doc) => (
              <li key={doc.name}>
                <a href={doc.url} className="underline hover:text-amber-900">{doc.name}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="w-full max-w-md bg-white rounded-xl shadow p-6 mb-8">
        <h2 className="text-lg font-bold text-amber-800 mb-4">Payment Schedule</h2>
        <ul className="divide-y divide-amber-100">
          {payments.map((p, i) => (
            <li key={i} className="flex justify-between py-2 text-amber-900 text-sm">
              <span>{p.due}</span>
              <span>{p.amount}</span>
              <span className={p.status === "Paid" ? "text-green-600" : "text-amber-700"}>{p.status}</span>
            </li>
          ))}
        </ul>
        <button className="mt-6 w-full bg-amber-700 text-white py-2 rounded-lg font-medium hover:bg-amber-800 transition">Pay with Stripe</button>
      </div>
    </div>
  )
} 
"use client"

import React from "react"

const metrics = [
  { label: "Active Clients", value: 12 },
  { label: "Outstanding Balances", value: "$4,200" },
  { label: "Upcoming Trips", value: 5 },
  { label: "Total Revenue", value: "$38,000" },
]

export default function AdminDashboard() {
  return (
    <div className="min-h-screen flex bg-amber-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-amber-100 p-6 flex flex-col">
        <h2 className="text-2xl font-bold text-amber-700 mb-8">Amber Admin</h2>
        <nav className="flex flex-col gap-4 text-amber-900 font-medium">
          <a href="#overview" className="hover:text-amber-600">Overview</a>
          <a href="#clients" className="hover:text-amber-600">Clients</a>
          <a href="#payments" className="hover:text-amber-600">Payments</a>
          <a href="#trips" className="hover:text-amber-600">Curated Trips</a>
        </nav>
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-10">
        <h1 className="text-3xl font-semibold text-amber-900 mb-8">Dashboard Overview</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {metrics.map((m) => (
            <div key={m.label} className="bg-white rounded-xl shadow p-6 flex flex-col items-center border border-amber-100">
              <span className="text-2xl font-bold text-amber-700">{m.value}</span>
              <span className="text-sm text-amber-900 mt-2">{m.label}</span>
            </div>
          ))}
        </div>
        {/* Placeholders for other panels */}
        <div className="bg-white rounded-xl shadow p-8 border border-amber-100 mb-8 min-h-[200px]">Client List (search/filter coming soon)</div>
        <div className="bg-white rounded-xl shadow p-8 border border-amber-100 mb-8 min-h-[200px]">Payment Tracker (Stripe integration coming soon)</div>
        <div className="bg-white rounded-xl shadow p-8 border border-amber-100 min-h-[200px]">Notifications & Trip Requests</div>
      </main>
    </div>
  )
} 
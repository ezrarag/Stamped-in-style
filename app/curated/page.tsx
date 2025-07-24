"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const SUGGESTIONS = [
  // Destinations
  "Paris", "Bali", "Santorini", "Tokyo", "Patagonia", "Maldives", "Marrakech", "New York", "Tuscany", "Cape Town",
  // Styles
  "Wellness retreat", "Boutique city stay", "Luxury safari", "Romantic escape", "Family adventure", "Culinary tour",
  // Trends
  "Private villa", "Infinity pool", "Michelin dining", "Yoga retreat", "Private guide", "Eco-lodge", "Wine tour", "Glacier hike"
];

export default function CuratedPage() {
  const [useAI, setUseAI] = useState(false);
  const [loading, setLoading] = useState(false);
  const [trips, setTrips] = useState<any[]>([]);
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlighted, setHighlighted] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const searchParams = useSearchParams();

  // On mount, check for query params and pre-fill
  useEffect(() => {
    const q = searchParams.get("query") || "";
    if (q) {
      setQuery(q);
      setUseAI(true);
    }
  }, []);

  const filteredSuggestions = query.length > 0
    ? SUGGESTIONS.filter(s => s.toLowerCase().includes(query.toLowerCase()) && s.toLowerCase() !== query.toLowerCase())
    : [];

  const fetchTrips = async () => {
    setLoading(true);
    try {
      if (useAI) {
        const res = await fetch("/api/curated", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            preferences: { query },
            adminStyle: "Elegant, luxury-focused, boutique vibes",
            marketplaceData: [],
            trends: ["wellness retreats", "boutique city stays"],
          }),
        });
        const data = await res.json();
        setTrips(data);
      } else {
        setTrips([
          {
            title: "Parisian Chic Getaway",
            description: "Experience boutique luxury in the heart of Paris.",
            highlights: ["Private Seine cruise", "Michelin dining", "5-star stay"],
            price: "$5,200",
            image: "/paris.jpg",
          },
          {
            title: "Wellness Retreat in Bali",
            description: "Rejuvenate with a curated escape to Ubud.",
            highlights: ["Yoga retreat", "Private villa", "Local chef"],
            price: "$3,400",
            image: "/bali.jpg",
          },
          {
            title: "Santorini Romance",
            description: "Sunsets, whitewashed villas, and Aegean luxury.",
            highlights: ["Infinity pool suite", "Private wine tour", "Caldera dinner"],
            price: "$6,100",
            image: "/santorini.jpg",
          },
          {
            title: "Tokyo Modern Luxe",
            description: "Sleek city adventure with a touch of tradition.",
            highlights: ["Luxury ryokan", "Sushi masterclass", "Private city guide"],
            price: "$7,800",
            image: "/tokyo.jpg",
          },
          {
            title: "Patagonia Expedition",
            description: "Epic landscapes and boutique lodges at the edge of the world.",
            highlights: ["Glacier hike", "Luxury eco-lodge", "Private chef"],
            price: "$8,900",
            image: "/patagonia.jpg",
          },
        ]);
      }
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTrips();
    // eslint-disable-next-line
  }, [useAI, query]);

  // Keyboard navigation for suggestions
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions || filteredSuggestions.length === 0) return;
    if (e.key === "ArrowDown") {
      setHighlighted(h => (h + 1) % filteredSuggestions.length);
    } else if (e.key === "ArrowUp") {
      setHighlighted(h => (h - 1 + filteredSuggestions.length) % filteredSuggestions.length);
    } else if (e.key === "Enter" && highlighted >= 0) {
      setQuery(filteredSuggestions[highlighted]);
      setShowSuggestions(false);
      setHighlighted(-1);
      inputRef.current?.blur();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 p-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-4xl font-light text-amber-900 tracking-tight">Curated Experiences</h1>
        <button
          onClick={() => setUseAI(!useAI)}
          className="px-6 py-2 bg-amber-900 text-white rounded-full font-medium shadow hover:bg-amber-800 transition-all"
        >
          {useAI ? "Switch to Static" : "Switch to AI"}
        </button>
      </div>

      <div className="relative max-w-xl mx-auto mb-8">
        <input
          ref={inputRef}
          type="text"
          placeholder="Search or describe your ideal trip..."
          value={query}
          onChange={e => {
            setQuery(e.target.value);
            setShowSuggestions(true);
            setHighlighted(-1);
          }}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 120)}
          onKeyDown={handleKeyDown}
          className="w-full p-4 border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white/80 text-amber-900 placeholder:text-amber-400 shadow"
        />
        <AnimatePresence>
          {showSuggestions && filteredSuggestions.length > 0 && (
            <motion.ul
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute left-0 right-0 mt-2 bg-white border border-amber-200 rounded-xl shadow-lg z-20 max-h-60 overflow-y-auto"
            >
              {filteredSuggestions.map((s, i) => (
                <li
                  key={s}
                  className={`px-4 py-3 cursor-pointer hover:bg-amber-50 text-amber-900 ${highlighted === i ? 'bg-amber-100' : ''}`}
                  onMouseDown={() => {
                    setQuery(s);
                    setShowSuggestions(false);
                    setHighlighted(-1);
                  }}
                  onMouseEnter={() => setHighlighted(i)}
                >
                  {s}
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>

      {loading ? (
        <div className="text-center text-amber-700 text-lg py-12">Loading curated trips...</div>
      ) : (
        <AnimatePresence>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trips.map((trip, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="bg-white/90 shadow-xl rounded-3xl p-6 flex flex-col items-stretch border border-amber-100 hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="relative h-48 w-full mb-4 rounded-2xl overflow-hidden bg-amber-100">
                  <img src={trip.image} alt={trip.title} className="object-cover w-full h-full" />
                </div>
                <h3 className="text-2xl font-semibold text-amber-900 mb-2">{trip.title}</h3>
                <p className="text-amber-700 mb-3">{trip.description}</p>
                <ul className="text-sm text-amber-600 mb-4 list-disc list-inside space-y-1">
                  {trip.highlights && trip.highlights.map((h: string, i: number) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
                <div className="mt-auto flex items-center justify-between">
                  <span className="text-lg font-bold text-amber-900">{trip.price}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      )}
    </div>
  );
} 
"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown, Menu, X, Calendar, Mail, Phone, MapPin, Users, Clock } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Event data structure
interface Event {
  id: string;
  title: string;
  description: string;
  dateRange: string;
  time: string;
  categories: string[];
  image: string;
  price?: string;
  location?: string;
  capacity?: number;
  organizer?: string;
  contactEmail?: string;
  contactPhone?: string;
  requirements?: string[];
  highlights?: string[];
}

// Supabase event structure
interface CuratedItem {
  id: string;
  title: string;
  description: string;
  image_url?: string;
  category: string;
  type: string;
  location: string;
  price?: string;
  start_date?: string;
  end_date?: string;
  created_at: string;
  is_featured: boolean;
  highlights?: string[];
  price_range?: string;
  distance?: string;
}

// Sample event data
const SAMPLE_EVENTS: Event[] = [
  {
    id: "1",
    title: "Facmily Christmas Cruise 2025",
    description: "Embark on a delectable journey celebrating the authentic and diverse culinary heritage of the UAE. Experience traditional flavors, modern interpretations, and the stories behind each dish.",
    dateRange: "28 July 2025 - 03 Aug 2025",
    time: "06:00PM to 08:00PM",
    categories: ["UAE Culture", "Performance", "Workshop"],
    image: "/placeholder.jpg",
    location: "Dubai Heritage Center, Al Fahidi Historical District",
    capacity: 25,
    organizer: "UAE Cultural Foundation",
    contactEmail: "events@uaecultural.org",
    contactPhone: "+971 4 123 4567",
    requirements: ["Comfortable walking shoes", "Appetite for new experiences", "Camera (optional)"],
    highlights: ["Traditional Emirati cooking techniques", "Local market visit", "Chef-led demonstrations", "Tasting sessions", "Cultural storytelling"]
  },
  {
    id: "2",
    title: "Flavors of the UAE: A week-long culinary journey, Week #4",
    description: "Embark on a delectable journey celebrating the authentic and diverse culinary heritage of the UAE. Experience traditional flavors, modern interpretations, and the stories behind each dish.",
    dateRange: "18 - 24 August 2025",
    time: "06:00PM to 08:00PM",
    categories: ["UAE Culture", "Performance", "Workshop"],
    image: "/placeholder.jpg",
    location: "Abu Dhabi Cultural Center, Saadiyat Island",
    capacity: 30,
    organizer: "Abu Dhabi Tourism Authority",
    contactEmail: "culinary@adculture.ae",
    contactPhone: "+971 2 987 6543",
    requirements: ["Comfortable walking shoes", "Appetite for new experiences", "Camera (optional)"],
    highlights: ["Traditional Emirati cooking techniques", "Local market visit", "Chef-led demonstrations", "Tasting sessions", "Cultural storytelling"]
  },
  {
    id: "3",
    title: "Inspiring through connecting lives",
    description: "Explore how sustainable technology can bridge divides, foster community connections, and create meaningful impact in our interconnected world.",
    dateRange: "22 - 25 September 2025",
    time: "12:00PM to 02:00PM",
    categories: ["Sustainable Technology", "Talk"],
    image: "/placeholder.jpg",
    location: "Dubai Future Foundation, Emirates Towers",
    capacity: 150,
    organizer: "Dubai Future Foundation",
    contactEmail: "tech@dubaifuture.ae",
    contactPhone: "+971 4 234 5678",
    requirements: ["Interest in technology", "Open mind for innovation", "Business casual attire"],
    highlights: ["Keynote presentations", "Panel discussions", "Networking sessions", "Technology demonstrations", "Q&A sessions"]
  },
  {
    id: "4",
    title: "Digital Art Exhibition: Future Visions",
    description: "Immerse yourself in cutting-edge digital art installations that explore the intersection of technology and human creativity.",
    dateRange: "15 - 20 October 2025",
    time: "10:00AM to 06:00PM",
    categories: ["Digital Art", "Exhibition"],
    image: "/placeholder.jpg",
    location: "Sharjah Art Foundation, Al Mureijah Square",
    capacity: 200,
    organizer: "Sharjah Art Foundation",
    contactEmail: "art@sharjahart.org",
    contactPhone: "+971 6 345 6789",
    requirements: ["No special requirements", "All ages welcome", "Photography allowed"],
    highlights: ["Interactive installations", "Artist talks", "Virtual reality experiences", "Live performances", "Workshop sessions"]
  },
  {
    id: "5",
    title: "Traditional Craftsmanship Workshop",
    description: "Learn the ancient art of Emirati craftsmanship through hands-on workshops with master artisans.",
    dateRange: "05 - 10 November 2025",
    time: "02:00PM to 05:00PM",
    categories: ["UAE Culture", "Workshop"],
    image: "/placeholder.jpg",
    location: "Al Ain Oasis, Traditional Crafts Center",
    capacity: 20,
    organizer: "Al Ain Cultural Foundation",
    contactEmail: "crafts@alainculture.ae",
    contactPhone: "+971 3 456 7890",
    requirements: ["No prior experience needed", "Comfortable clothing", "Patience and enthusiasm"],
    highlights: ["Traditional weaving techniques", "Pottery making", "Metalwork demonstrations", "Cultural history lessons", "Take-home creations"]
  },
  {
    id: "6",
    title: "Innovation Summit: Tomorrow's Solutions",
    description: "Join thought leaders and innovators as they discuss breakthrough technologies and sustainable solutions for the future.",
    dateRange: "12 - 15 December 2025",
    time: "09:00AM to 05:00PM",
    categories: ["Sustainable Technology", "Talk", "Innovation"],
    image: "/placeholder.jpg",
    location: "Masdar City, Abu Dhabi",
    capacity: 300,
    organizer: "Masdar Institute",
    contactEmail: "summit@masdar.ac.ae",
    contactPhone: "+971 2 345 6789",
    requirements: ["Business attire", "Registration required", "Laptop recommended"],
    highlights: ["Expert presentations", "Innovation showcases", "Networking opportunities", "Startup pitches", "Sustainability workshops"]
  },
];

// Available filter categories
const FILTER_CATEGORIES = {
  category: ["UAE Culture", "Performance", "Sustainable Technology", "Digital Art", "Innovation"],
  type: ["Talk", "Workshop", "Exhibition", "Performance", "Tour"],
  cost: ["Free", "Low Cost", "Premium", "Luxury"],
  distance: ["Nearby", "City Center", "Outskirts", "Remote"]
};

function Header({ useAI, onAIToggle }: { useAI: boolean; onAIToggle: () => void }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="relative z-50 w-full bg-white shadow-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <div className="w-12 h-12 rounded-full flex items-center justify-center">
                <Image
                  src="/complete-logo.png"
                  alt="Stamped in Style Travel Co."
                  width={120}
                  height={120}
                  className="object-contain"
                />
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center space-x-12">
            <Link
              href="/about"
              className="text-gray-700 hover:text-amber-600 transition-colors font-medium tracking-wide text-sm uppercase"
            >
              ABOUT
            </Link>
            <Link
              href="/curated"
              className="text-amber-600 font-medium tracking-wide text-sm uppercase"
            >
              CURATED
            </Link>
            <Link
              href="/build"
              className="text-gray-700 hover:text-amber-600 transition-colors font-medium tracking-wide text-sm uppercase"
            >
              BUILD
            </Link>
            <Link
              href="#journey"
              className="text-gray-700 hover:text-amber-600 transition-colors font-medium tracking-wide text-sm uppercase"
            >
              OUR JOURNEY
            </Link>
            <Link
              href="#gallery"
              className="text-gray-700 hover:text-amber-600 transition-colors font-medium tracking-wide text-sm uppercase"
            >
              GALLERY
            </Link>
          </nav>

          {/* Right Side */}
          <div className="flex items-center space-x-6">
            {/* Language Selector */}
            <div className="hidden md:flex items-center space-x-1 text-gray-700">
              <span className="text-sm font-medium tracking-wide">EN</span>
              <ChevronDown className="h-4 w-4" />
            </div>

            {/* Switch to AI Button */}
            <Button 
              onClick={onAIToggle}
              className="hidden md:flex bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-full font-medium tracking-wide text-sm uppercase transition-all duration-300"
            >
              {useAI ? "Switch to Database" : "Switch to AI"}
            </Button>

            {/* Mobile Menu */}
            <Button
              variant="ghost"
              size="icon"
              className="w-10 h-10 rounded-full border border-gray-200 text-gray-700 hover:bg-gray-50 lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-200 shadow-lg"
          >
            <nav className="container mx-auto px-6 py-4 space-y-3">
              <Link
                href="/about"
                className="block text-gray-700 text-lg font-medium py-2 border-b border-gray-100 uppercase tracking-wide"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                ABOUT
              </Link>
              <Link
                href="/curated"
                className="block text-amber-600 text-lg font-medium py-2 border-b border-gray-100 uppercase tracking-wide"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                CURATED
              </Link>
              <Link
                href="/build"
                className="block text-gray-700 text-lg font-medium py-2 border-b border-gray-100 uppercase tracking-wide"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                BUILD
              </Link>
              <Link
                href="#journey"
                className="block text-gray-700 text-lg font-medium py-2 border-b border-gray-100 uppercase tracking-wide"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                OUR JOURNEY
              </Link>
              <Link
                href="#gallery"
                className="block text-gray-700 text-lg font-medium py-2 border-b border-gray-100 uppercase tracking-wide"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                GALLERY
              </Link>
              <div className="pt-4">
                <Button 
                  onClick={onAIToggle}
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-full font-medium tracking-wide text-sm uppercase"
                >
                  {useAI ? "Switch to Database" : "Switch to AI"}
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </div>
    </header>
  );
}

function FilterMenu({ selectedFilters, onFilterChange, searchQuery, onSearchChange }: { 
  selectedFilters: string[], 
  onFilterChange: (filter: string) => void,
  searchQuery: string,
  onSearchChange: (query: string) => void
}) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const handleDropdownToggle = (filterType: string) => {
    setOpenDropdown(openDropdown === filterType ? null : filterType);
  };

  const handleOptionSelect = (option: string) => {
    onFilterChange(option);
    setOpenDropdown(null);
  };

  return (
    <div className="mb-8">
      {/* Search and Filter Row */}
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
        {/* Search Field */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent bg-white text-gray-700 placeholder:text-gray-400"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Filter Dropdowns */}
        <div className="flex flex-wrap gap-3">
          {Object.entries(FILTER_CATEGORIES).map(([filterType, options]) => (
            <div key={filterType} className="relative">
              <button
                onClick={() => handleDropdownToggle(filterType)}
                className="flex items-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:border-gray-300 transition-colors"
              >
                <span className="capitalize">{filterType}</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${openDropdown === filterType ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {openDropdown === filterType && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  <div className="py-2">
                    {options.map((option) => {
                      const isSelected = selectedFilters.includes(option);
                      return (
                        <button
                          key={option}
                          onClick={() => handleOptionSelect(option)}
                          className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                            isSelected ? 'bg-amber-50 text-amber-700 font-medium' : 'text-gray-700'
                          }`}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Selected Filters Display */}
      {selectedFilters.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {selectedFilters.map((filter) => (
            <div
              key={filter}
              className="flex items-center gap-2 px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-medium"
            >
              <span>{filter}</span>
              <button
                onClick={() => onFilterChange(filter)}
                className="hover:text-amber-600"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function EventModal({ event, isOpen, onClose }: { event: Event; isOpen: boolean; onClose: () => void }) {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "UAE Culture":
        return "bg-amber-800 text-white";
      case "Sustainable Technology":
        return "bg-green-600 text-white";
      case "Digital Art":
        return "bg-purple-600 text-white";
      case "Innovation":
        return "bg-blue-600 text-white";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const handleRegister = () => {
    // TODO: Implement registration logic
    alert(`Registration for "${event.title}" will be implemented here.`);
  };

  const handleAddToCalendar = () => {
    // Create calendar event data
    const eventData = {
      title: event.title,
      start: new Date(event.dateRange.split(' - ')[0] + ' ' + event.time.split(' to ')[0]),
      end: new Date(event.dateRange.split(' - ')[0] + ' ' + event.time.split(' to ')[1]),
      location: event.location,
      description: event.description
    };

    // Create calendar URL
    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventData.title)}&dates=${eventData.start.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')}/${eventData.end.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')}&details=${encodeURIComponent(eventData.description)}&location=${encodeURIComponent(eventData.location || '')}`;
    
    window.open(calendarUrl, '_blank');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="relative">
          <div className="relative h-64 w-full">
            <Image
              src={event.image}
              alt={event.title}
              fill
              className="object-cover rounded-t-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-t-2xl"></div>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Category Tags */}
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {event.categories.map((category) => (
                <Badge
                  key={category}
                  className={`text-xs px-3 py-1 rounded-full ${getCategoryColor(category)}`}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>

          {/* Title and Date */}
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{event.title}</h2>
            <div className="flex items-center gap-4 text-gray-600">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <span className="text-lg font-semibold">{event.dateRange}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>{event.time}</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <p className="text-gray-700 leading-relaxed text-lg">{event.description}</p>
          </div>

          {/* Event Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Location */}
            {event.location && (
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-gray-500 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900">Location</h4>
                  <p className="text-gray-600">{event.location}</p>
                </div>
              </div>
            )}

            {/* Organizer */}
            {event.organizer && (
              <div className="flex items-start gap-3">
                <Users className="h-5 w-5 text-gray-500 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900">Organizer</h4>
                  <p className="text-gray-600">{event.organizer}</p>
                </div>
              </div>
            )}

            {/* Capacity */}
            {event.capacity && (
              <div className="flex items-start gap-3">
                <Users className="h-5 w-5 text-gray-500 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900">Capacity</h4>
                  <p className="text-gray-600">{event.capacity} participants</p>
                </div>
              </div>
            )}

            {/* Contact */}
            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-gray-500 mt-1" />
              <div>
                <h4 className="font-semibold text-gray-900">Contact</h4>
                <div className="space-y-1">
                  {event.contactEmail && (
                    <p className="text-gray-600">{event.contactEmail}</p>
                  )}
                  {event.contactPhone && (
                    <p className="text-gray-600">{event.contactPhone}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Highlights */}
          {event.highlights && event.highlights.length > 0 && (
            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 mb-3">Highlights</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {event.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    <span className="text-gray-600">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Requirements */}
          {event.requirements && event.requirements.length > 0 && (
            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 mb-3">Requirements</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {event.requirements.map((requirement, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-600">{requirement}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
            <Button
              onClick={handleRegister}
              className="flex-1 bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-full font-medium"
            >
              Register for Event
            </Button>
            <Button
              onClick={handleAddToCalendar}
              variant="outline"
              className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50 py-3 rounded-full font-medium"
            >
              <Calendar className="h-5 w-5 mr-2" />
              Add to Calendar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function EventCard({ event, onClick }: { event: Event; onClick: () => void }) {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "UAE Culture":
        return "bg-amber-800 text-white";
      case "Sustainable Technology":
        return "bg-green-600 text-white";
      case "Digital Art":
        return "bg-purple-600 text-white";
      case "Innovation":
        return "bg-blue-600 text-white";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <Card 
      className="bg-white border border-gray-200 hover:shadow-lg transition-shadow duration-300 overflow-hidden cursor-pointer"
      onClick={onClick}
    >
      <CardContent className="p-0">
        {/* Category Tags */}
        <div className="p-4 pb-2">
          <div className="flex flex-wrap gap-2">
            {event.categories.map((category) => (
              <Badge
                key={category}
                className={`text-xs px-3 py-1 rounded-full ${getCategoryColor(category)}`}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        {/* Date Range */}
        <div className="px-4 pb-3">
          <div className="text-2xl font-bold text-gray-900">
            {event.dateRange}
          </div>
        </div>

        {/* Title */}
        <div className="px-4 pb-3">
          <h3 className="text-lg font-semibold text-gray-900 leading-tight">
            {event.title}
          </h3>
        </div>

        {/* Time */}
        <div className="px-4 pb-4">
          <div className="inline-block bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium">
            {event.time}
          </div>
        </div>

        {/* Image */}
        <div className="relative h-48 w-full">
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Description */}
        <div className="p-4">
          <p className="text-gray-600 text-sm leading-relaxed">
            {event.description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

function CuratedPageContent() {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [useAI, setUseAI] = useState(false);
  const searchParams = useSearchParams();

  // Convert Supabase data to Event format
  const convertToEvent = (item: CuratedItem): Event => {
    const startDate = item.start_date ? new Date(item.start_date) : null;
    const endDate = item.end_date ? new Date(item.end_date) : null;
    
    let dateRange = "";
    if (startDate && endDate) {
      dateRange = `${startDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} - ${endDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`;
    } else if (startDate) {
      dateRange = startDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    }

    return {
      id: item.id,
      title: item.title,
      description: item.description,
      dateRange: dateRange,
      time: "TBD", // You can add time field to Supabase if needed
      categories: [item.category, item.type],
      image: item.image_url || "/placeholder.jpg",
      price: item.price,
      location: item.location,
      highlights: item.highlights || [],
      requirements: [], // Add to Supabase if needed
      organizer: "", // Add to Supabase if needed
      contactEmail: "", // Add to Supabase if needed
      contactPhone: "", // Add to Supabase if needed
      capacity: 0 // Add to Supabase if needed
    };
  };

  // Fetch data from Supabase
  const fetchEvents = async () => {
    if (useAI) {
      // Use AI-generated data (existing functionality)
      setAllEvents(SAMPLE_EVENTS);
      setFilteredEvents(SAMPLE_EVENTS);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const params = new URLSearchParams();
      
      // Add search parameter
      if (searchQuery.trim()) {
        params.append("search", searchQuery);
      }

      const response = await fetch(`/api/curated-items?${params.toString()}`);
      if (!response.ok) {
        throw new Error("Failed to fetch events");
      }

      const data: CuratedItem[] = await response.json();
      const convertedEvents = data.map(convertToEvent);
      
      setAllEvents(convertedEvents);
      setFilteredEvents(convertedEvents);
    } catch (error) {
      console.error("Error fetching events:", error);
      // Fallback to sample data
      setAllEvents(SAMPLE_EVENTS);
      setFilteredEvents(SAMPLE_EVENTS);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter events based on selected categories and search query
  useEffect(() => {
    let filtered = allEvents;

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.categories.some(category => 
          category.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    // Filter by selected filters
    if (selectedFilters.length > 0) {
      filtered = filtered.filter(event =>
        event.categories.some(category => selectedFilters.includes(category))
      );
    }

    setFilteredEvents(filtered);
  }, [selectedFilters, searchQuery, allEvents]);

  // Fetch data when component mounts or when switching between AI and Supabase
  useEffect(() => {
    fetchEvents();
  }, [useAI, searchQuery]);

  const handleAIToggle = () => {
    setUseAI(!useAI);
    setSelectedFilters([]);
    setSearchQuery("");
  };

  const handleFilterChange = (filter: string) => {
    setSelectedFilters(prev =>
      prev.includes(filter)
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

      return (
      <div className="min-h-screen bg-gray-50">
        <Header useAI={useAI} onAIToggle={handleAIToggle} />
        
        <main className="container mx-auto px-6 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-4xl font-light text-gray-900 mb-2">Curated Events</h1>
          <p className="text-gray-600">Discover our carefully selected experiences and workshops</p>
        </div>

        {/* Filter Menu */}
        <FilterMenu 
          selectedFilters={selectedFilters}
          onFilterChange={handleFilterChange}
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
        />

        {/* Events Grid */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"></div>
            <p className="mt-4 text-gray-600">Loading events...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredEvents.map((event, idx) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <EventCard 
                    event={event} 
                    onClick={() => handleEventClick(event)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Event Modal */}
        {selectedEvent && (
          <EventModal
            event={selectedEvent}
            isOpen={isModalOpen}
            onClose={handleCloseModal}
          />
        )}

        {/* No Results */}
        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No events match your selected filters.</p>
            <Button
              onClick={() => setSelectedFilters([])}
              className="mt-4 bg-amber-600 hover:bg-amber-700 text-white"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}

export default function CuratedPage() {
  return (
    <Suspense fallback={<div className="text-center py-12 text-gray-600">Loading...</div>}>
      <CuratedPageContent />
    </Suspense>
  );
} 
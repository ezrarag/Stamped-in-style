# Supabase Setup for Curated Events

## 🗄️ Database Schema

### 1. Create the `curated_items` table

Run this SQL in your Supabase SQL editor:

```sql
-- Create the curated_items table
CREATE TABLE curated_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  category TEXT NOT NULL,
  type TEXT NOT NULL,
  location TEXT NOT NULL,
  price TEXT,
  start_date DATE,
  end_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_featured BOOLEAN DEFAULT FALSE,
  highlights JSONB,
  price_range TEXT,
  distance TEXT
);

-- Create indexes for better performance
CREATE INDEX idx_curated_items_category ON curated_items(category);
CREATE INDEX idx_curated_items_type ON curated_items(type);
CREATE INDEX idx_curated_items_created_at ON curated_items(created_at DESC);
CREATE INDEX idx_curated_items_is_featured ON curated_items(is_featured);

-- Enable Row Level Security (RLS)
ALTER TABLE curated_items ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Allow public read access" ON curated_items
  FOR SELECT USING (true);

-- Create policy for authenticated users to insert/update
CREATE POLICY "Allow authenticated users to insert" ON curated_items
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to update" ON curated_items
  FOR UPDATE USING (auth.role() = 'authenticated');
```

### 2. Seed the database with sample data

Run this SQL to insert sample events:

```sql
-- Insert sample curated items
INSERT INTO curated_items (title, description, image_url, category, type, location, price, start_date, end_date, is_featured, highlights, price_range, distance) VALUES
(
  'Flavors of the UAE: A week-long culinary journey, Week #3',
  'Embark on a delectable journey celebrating the authentic and diverse culinary heritage of the UAE. Experience traditional flavors, modern interpretations, and the stories behind each dish.',
  'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'UAE Culture',
  'Workshop',
  'Dubai Heritage Center, Al Fahidi Historical District',
  '$150',
  '2025-07-28',
  '2025-08-03',
  true,
  '["Traditional Emirati cooking techniques", "Local market visit", "Chef-led demonstrations", "Tasting sessions", "Cultural storytelling"]',
  'Premium',
  'City Center'
),
(
  'Flavors of the UAE: A week-long culinary journey, Week #4',
  'Embark on a delectable journey celebrating the authentic and diverse culinary heritage of the UAE. Experience traditional flavors, modern interpretations, and the stories behind each dish.',
  'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'UAE Culture',
  'Workshop',
  'Abu Dhabi Cultural Center, Saadiyat Island',
  '$180',
  '2025-08-18',
  '2025-08-24',
  true,
  '["Traditional Emirati cooking techniques", "Local market visit", "Chef-led demonstrations", "Tasting sessions", "Cultural storytelling"]',
  'Premium',
  'City Center'
),
(
  'Inspiring through connecting lives',
  'Explore how sustainable technology can bridge divides, foster community connections, and create meaningful impact in our interconnected world.',
  'https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'Sustainable Technology',
  'Talk',
  'Dubai Future Foundation, Emirates Towers',
  'Free',
  '2025-09-22',
  '2025-09-25',
  false,
  '["Keynote presentations", "Panel discussions", "Networking sessions", "Technology demonstrations", "Q&A sessions"]',
  'Free',
  'City Center'
),
(
  'Digital Art Exhibition: Future Visions',
  'Immerse yourself in cutting-edge digital art installations that explore the intersection of technology and human creativity.',
  'https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'Digital Art',
  'Exhibition',
  'Sharjah Art Foundation, Al Mureijah Square',
  '$25',
  '2025-10-15',
  '2025-10-20',
  false,
  '["Interactive installations", "Artist talks", "Virtual reality experiences", "Live performances", "Workshop sessions"]',
  'Low Cost',
  'Outskirts'
),
(
  'Traditional Craftsmanship Workshop',
  'Learn the ancient art of Emirati craftsmanship through hands-on workshops with master artisans.',
  'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'UAE Culture',
  'Workshop',
  'Al Ain Oasis, Traditional Crafts Center',
  '$75',
  '2025-11-05',
  '2025-11-10',
  false,
  '["Traditional weaving techniques", "Pottery making", "Metalwork demonstrations", "Cultural history lessons", "Take-home creations"]',
  'Low Cost',
  'Remote'
),
(
  'Innovation Summit: Tomorrow''s Solutions',
  'Join thought leaders and innovators as they discuss breakthrough technologies and sustainable solutions for the future.',
  'https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'Sustainable Technology',
  'Talk',
  'Masdar City, Abu Dhabi',
  '$500',
  '2025-12-12',
  '2025-12-15',
  true,
  '["Expert presentations", "Innovation showcases", "Networking opportunities", "Startup pitches", "Sustainability workshops"]',
  'Luxury',
  'Outskirts'
),
(
  'Luxury Desert Safari Experience',
  'Experience the magic of the Arabian desert with our premium safari package including gourmet dining and traditional entertainment.',
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'Performance',
  'Tour',
  'Dubai Desert Conservation Reserve',
  '$350',
  '2025-01-15',
  '2025-01-15',
  true,
  '["Sunset dune bashing", "Traditional Bedouin camp", "Gourmet desert dinner", "Falconry demonstration", "Stargazing experience"]',
  'Luxury',
  'Remote'
),
(
  'Modern Architecture Walking Tour',
  'Discover Dubai''s most iconic buildings and learn about the city''s architectural evolution.',
  'https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'Performance',
  'Tour',
  'Downtown Dubai',
  '$45',
  '2025-02-20',
  '2025-02-20',
  false,
  '["Burj Khalifa visit", "Architectural insights", "Photo opportunities", "Local guide", "Refreshments included"]',
  'Low Cost',
  'City Center'
),
(
  'Sustainable Fashion Workshop',
  'Learn about eco-friendly fashion practices and create your own sustainable garment.',
  'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'Sustainable Technology',
  'Workshop',
  'Dubai Design District',
  '$120',
  '2025-03-10',
  '2025-03-12',
  false,
  '["Sustainable materials", "Design techniques", "Eco-friendly practices", "Take-home project", "Expert guidance"]',
  'Premium',
  'City Center'
),
(
  'AI and Future of Work Conference',
  'Explore how artificial intelligence is reshaping industries and creating new opportunities.',
  'https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'Innovation',
  'Talk',
  'Dubai Internet City',
  '$200',
  '2025-04-05',
  '2025-04-07',
  true,
  '["AI experts", "Industry insights", "Networking", "Technology demos", "Future trends"]',
  'Premium',
  'City Center'
);
```

## 🔧 Environment Setup

### 1. Add environment variables

Add these to your `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 2. Install Supabase client (if not already installed)

```bash
npm install @supabase/supabase-js
```

## 🚀 Testing the Integration

### 1. Test the API endpoint

```bash
# Test the GET endpoint
curl "http://localhost:3000/api/curated-items"

# Test with search
curl "http://localhost:3000/api/curated-items?search=culinary"

# Test with filters
curl "http://localhost:3000/api/curated-items?category=UAE%20Culture&type=Workshop"
```

### 2. Test the page functionality

1. **Start your development server:**
   ```bash
   npm run dev
   ```

2. **Navigate to `/curated`**

3. **Test the features:**
   - Search functionality
   - Filter dropdowns
   - AI toggle (switches between Supabase and sample data)
   - Event modal popups
   - Calendar integration

## 🔄 Data Flow

### Current Implementation:

1. **Page loads** → Fetches data from `/api/curated-items`
2. **Search** → Updates URL params and refetches
3. **Filters** → Client-side filtering of fetched data
4. **AI Toggle** → Switches between Supabase data and sample data
5. **Modal** → Displays detailed event information

### API Endpoints:

- `GET /api/curated-items` - Fetch all items
- `GET /api/curated-items?search=term` - Search items
- `GET /api/curated-items?category=X&type=Y` - Filter items
- `POST /api/curated-items` - Create new item (for admin use)

## 🛠️ Troubleshooting

### Common Issues:

1. **"Supabase connection failed"**
   - Check environment variables
   - Verify Supabase project URL and keys

2. **"No data showing"**
   - Check if the table exists and has data
   - Verify RLS policies allow public read access

3. **"API errors"**
   - Check browser console for detailed error messages
   - Verify the API route is working with curl

### Debug Commands:

```bash
# Check if Supabase is accessible
curl -H "apikey: YOUR_ANON_KEY" \
  "https://YOUR_PROJECT.supabase.co/rest/v1/curated_items?select=*" \
  -H "Authorization: Bearer YOUR_ANON_KEY"
```

## 📊 Database Schema Details

### Table Structure:

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key |
| `title` | TEXT | Event title |
| `description` | TEXT | Event description |
| `image_url` | TEXT | Optional image URL |
| `category` | TEXT | Event category |
| `type` | TEXT | Event type |
| `location` | TEXT | Event location |
| `price` | TEXT | Price information |
| `start_date` | DATE | Event start date |
| `end_date` | DATE | Event end date |
| `created_at` | TIMESTAMP | Record creation time |
| `is_featured` | BOOLEAN | Featured event flag |
| `highlights` | JSONB | Array of highlights |
| `price_range` | TEXT | Price category |
| `distance` | TEXT | Distance category |

### Indexes:

- `category` - For filtering by category
- `type` - For filtering by type  
- `created_at` - For sorting by date
- `is_featured` - For featured events

## 🎯 Next Steps

1. **Add more fields** to the database (time, organizer, contact info)
2. **Implement admin interface** for managing events
3. **Add image upload** functionality
4. **Implement real registration** system
5. **Add analytics** and tracking
6. **Multi-language support**

The integration is now complete and ready for testing! 
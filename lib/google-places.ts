import { Loader } from '@googlemaps/js-api-loader'

let google: any = null
let autocompleteService: any = null
let placesService: any = null

// Initialize Google Maps API
export async function initGooglePlaces() {
  if (google) return google

  const loader = new Loader({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    version: 'weekly',
    libraries: ['places']
  })

  try {
    google = await loader.load()
    autocompleteService = new google.maps.places.AutocompleteService()
    placesService = new google.maps.places.PlacesService(document.createElement('div'))
    return google
  } catch (error) {
    console.error('Failed to load Google Places API:', error)
    throw error
  }
}

// Search for cities with autocomplete
export async function searchCities(query: string): Promise<any[]> {
  if (!autocompleteService) {
    await initGooglePlaces()
  }

  return new Promise((resolve, reject) => {
    if (!query.trim()) {
      resolve([])
      return
    }

    autocompleteService.getPlacePredictions({
      input: query,
      types: ['(cities)'],
      componentRestrictions: { country: [] } // Worldwide search
    }, (predictions: any[], status: any) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && predictions) {
        const cities = predictions.map(prediction => ({
          id: prediction.place_id,
          name: prediction.structured_formatting.main_text,
          country: prediction.structured_formatting.secondary_text,
          fullName: prediction.description,
          placeId: prediction.place_id
        }))
        resolve(cities)
      } else {
        resolve([])
      }
    })
  })
}

// Get detailed place information including photos
export async function getPlaceDetails(placeId: string): Promise<any> {
  if (!placesService) {
    await initGooglePlaces()
  }

  return new Promise((resolve, reject) => {
    placesService.getDetails({
      placeId: placeId,
      fields: ['name', 'formatted_address', 'photos', 'geometry', 'types']
    }, (place: any, status: any) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && place) {
        const details = {
          id: placeId,
          name: place.name,
          address: place.formatted_address,
          photos: place.photos?.map((photo: any) => ({
            url: photo.getUrl({ maxWidth: 400, maxHeight: 300 }),
            alt: place.name
          })) || [],
          location: place.geometry?.location,
          types: place.types
        }
        resolve(details)
      } else {
        reject(new Error('Failed to get place details'))
      }
    })
  })
}

// Generate a placeholder image URL for cities without photos
export function getPlaceholderImage(cityName: string): string {
  return `https://source.unsplash.com/400x300/?${encodeURIComponent(cityName + ' city')}`
} 
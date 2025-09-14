import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Page } from '../App';

interface ExploreMonasteriesProps {
  onNavigate: (page: Page, monasteryId?: string) => void;
}

const monasteries = [
  {
    id: 'rumtek',
    name: 'Rumtek Monastery',
    location: 'Gangtok, East Sikkim',
    description: 'The largest monastery in Sikkim, known as the Dharma Chakra Centre',
    image: 'https://images.unsplash.com/photo-1731425281764-9f8e1c4aa2ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxydW10ZWslMjBtb25hc3RlcnklMjBzaWtraW0lMjB0aWJldHxlbnwxfHx8fDE3NTc3Mjg5MzF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tradition: 'Kagyu',
    established: '1966',
    coordinates: { lat: 27.3389, lng: 88.5753 }
  },
  {
    id: 'enchey',
    name: 'Enchey Monastery',
    location: 'Gangtok, East Sikkim',
    description: 'One of the most important monasteries in Sikkim with a 200-year history',
    image: 'https://images.unsplash.com/photo-1719154717559-c0952814e8c1?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    tradition: 'Nyingma',
    established: '1840',
    coordinates: { lat: 27.3353, lng: 88.6140 }
  },
  {
    id: 'tashiding',
    name: 'Tashiding Monastery',
    location: 'West Sikkim',
    description: 'Sacred monastery built on a heart-shaped hill between holy rivers',
    image: 'https://images.unsplash.com/photo-1611426663925-b6ceddb3a4d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaWtraW0lMjBtb25hc3RlcnklMjBwcmF5ZXIlMjBmbGFncyUyMG1vdW50YWluc3xlbnwxfHx8fDE3NTc3Mjg5MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tradition: 'Nyingma',
    established: '1641',
    coordinates: { lat: 27.3433, lng: 88.2367 }
  }
];

export function ExploreMonasteries({ onNavigate }: ExploreMonasteriesProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMonasteries = monasteries.filter(monastery =>
    monastery.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    monastery.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    monastery.tradition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl mb-4">Explore Sacred Monasteries</h1>
        <p className="text-muted-foreground text-lg">
          Discover the spiritual heritage of Sikkim through its ancient monasteries
        </p>
      </div>

      {/* Search and View Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1">
          <Input
            placeholder="Search monasteries by name, location, or tradition..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            onClick={() => setViewMode('grid')}
          >
            📋 Grid View
          </Button>
          <Button
            variant={viewMode === 'map' ? 'default' : 'outline'}
            onClick={() => setViewMode('map')}
          >
            🗺️ Map View
          </Button>
        </div>
      </div>

      {viewMode === 'map' ? (
        /* Map View */
        <div className="bg-gray-100 rounded-lg p-8 mb-8 min-h-[400px] flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">🗺️</div>
            <p className="text-xl mb-2">Interactive Map Coming Soon</p>
            <p className="text-muted-foreground">
              Google Maps integration with monastery locations and quick info
            </p>
            <div className="mt-6 space-y-2">
              {filteredMonasteries.map((monastery) => (
                <div key={monastery.id} className="flex items-center justify-between bg-white p-3 rounded-lg">
                  <div>
                    <span className="font-medium">{monastery.name}</span>
                    <span className="text-sm text-muted-foreground ml-2">
                      📍 {monastery.coordinates.lat}, {monastery.coordinates.lng}
                    </span>
                  </div>
                  <Button 
                    size="sm" 
                    onClick={() => onNavigate('monastery', monastery.id)}
                  >
                    Visit
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Grid View */
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMonasteries.map((monastery) => (
            <Card key={monastery.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
              <div className="aspect-video relative">
                <ImageWithFallback
                  src={monastery.image}
                  alt={monastery.name}
                  className="w-full h-full object-cover"
                />
                <Badge className="absolute top-2 right-2 bg-white/90 text-gray-800">
                  {monastery.tradition}
                </Badge>
              </div>
              
              <CardContent className="p-6">
                <h3 className="text-xl mb-2">{monastery.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">📍 {monastery.location}</p>
                <p className="text-sm text-muted-foreground mb-4">🏛️ Est. {monastery.established}</p>
                <p className="text-gray-600 mb-4 line-clamp-2">{monastery.description}</p>
                
                <Button 
                  className="w-full" 
                  onClick={() => onNavigate('monastery', monastery.id)}
                >
                  Explore Monastery
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {filteredMonasteries.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <p className="text-xl mb-2">No monasteries found</p>
          <p className="text-muted-foreground">Try adjusting your search terms</p>
        </div>
      )}
    </div>
  );
}

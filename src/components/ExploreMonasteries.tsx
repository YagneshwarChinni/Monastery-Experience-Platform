// src/components/ExploreMonasteries.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { MapPin, Calendar, Users } from 'lucide-react';

interface Monastery {
  id: string;
  name: string;
  location: string;
  description: string;
  image: string;
  duration: string;
  visitors: number;
  rating: number;
}

const mockMonasteries: Monastery[] = [
  {
    id: 'rumtek',
    name: 'Rumtek Monastery',
    location: 'Dzongu, Sikkim',
    description: 'The largest monastery in Sikkim and seat of the Karmapa Lama. A center of Tibetan Buddhist learning.',
    image: 'https://images.unsplash.com/photo-1576155731848-6b0866827201?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb21ldGhpbmcgaW4gc2lraW1cbW9uYXN0ZXJ5JTIwdG91ciUyMGxhbWF8ZW58MHx8fDE3NTc3MzI4ODN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    duration: '3 hours',
    visitors: 1200,
    rating: 4.9,
  },
  {
    id: 'enchey',
    name: 'Enchey Monastery',
    location: 'Gangtok',
    description: 'A serene Nyingma monastery perched on a hilltop with stunning views and ancient thangka paintings.',
    image: 'https://images.unsplash.com/photo-1507829585586-61e76f72065c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaWtraW0lMjBtb25hc3RlcnklMjBtYW51YWwlMjBjb25zdHJ1Y3Rpb258ZW58MHx8fDE3NTc3MzMwNTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    duration: '2 hours',
    visitors: 850,
    rating: 4.8,
  },
  {
    id: 'pemayangtse',
    name: 'Pemayangtse Monastery',
    location: 'Pelling',
    description: 'One of the oldest and most sacred monasteries in Sikkim, founded in 1705, known for its intricate wood carvings.',
    image: 'https://images.unsplash.com/photo-1551145577-29802111273b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaWtraW0lMjB2aWxsYWdlJTIwY3VsdHVyZXxlbnwxfHx8fDE3NTc3MzI5MjN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    duration: '4 hours',
    visitors: 920,
    rating: 4.7,
  },
];

interface ExploreMonasteriesProps {
  onNavigate: (page: string, monasteryId?: string) => void;
}

export function ExploreMonasteries({ onNavigate }: ExploreMonasteriesProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Explore Sacred Monasteries</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Discover the spiritual heart of Sikkim through its ancient monasteries — each a sanctuary of peace, art, and devotion.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {mockMonasteries.map((monastery) => (
          <Card key={monastery.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
            <div className="aspect-video relative">
              <img
                src={monastery.image}
                alt={monastery.name}
                className="w-full h-full object-cover"
              />
              <Badge className="absolute top-3 right-3 bg-yellow-500 text-white">
                ⭐ {monastery.rating}
              </Badge>
            </div>

            <CardContent className="p-6">
              <CardTitle className="text-xl font-semibold text-gray-800 mb-2">
                {monastery.name}
              </CardTitle>
              <div className="flex items-center text-sm text-gray-600 mb-3">
                <MapPin className="w-4 h-4 mr-1" />
                {monastery.location}
              </div>
              <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                {monastery.description}
              </p>

              <div className="flex justify-between text-xs text-gray-500 mb-4">
                <div className="flex items-center">
                  <Calendar className="w-3 h-3 mr-1" />
                  {monastery.duration}
                </div>
                <div className="flex items-center">
                  <Users className="w-3 h-3 mr-1" />
                  {monastery.visitors} visitors
                </div>
              </div>

              <Button
                onClick={() => onNavigate('monastery', monastery.id)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                View Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

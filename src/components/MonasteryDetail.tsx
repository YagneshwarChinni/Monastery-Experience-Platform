import React, { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Page } from '../App';

interface MonasteryDetailProps {
  monasteryId: string | null;
  onNavigate: (page: Page) => void;
}

const monasteryData = {
  rumtek: {
    name: 'Rumtek Monastery',
    location: 'Gangtok, East Sikkim',
    tradition: 'Kagyu',
    established: '1966',
    description: 'Rumtek Monastery, also called the Dharma Chakra Centre, is a gompa located in the Indian state of Sikkim near the capital Gangtok. It is the largest monastery in Sikkim and is the seat-in-exile of the Gyalwa Karmapa, inaugurated in 1966 by the 16th Karmapa.',
    images: [
      'https://images.unsplash.com/photo-1731425281764-9f8e1c4aa2ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxydW10ZWslMjBtb25hc3RlcnklMjBzaWtraW0lMjB0aWJldHxlbnwxfHx8fDE3NTc3Mjg5MzF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1611426663925-b6ceddb3a4d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaWtraW0lMjBtb25hc3RlcnklMjBwcmF5ZXIlMjBmbGFncyUyMG1vdW50YWluc3xlbnwxfHx8fDE3NTc3Mjg5MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    ],
    history: 'Built by the 16th Gyalwa Karmapa in 1966, Rumtek Monastery was constructed to replace Tsurphu Monastery in Tibet. The monastery houses some of the most sacred objects and scriptures of the Kagyu lineage.',
    significance: 'As the seat-in-exile of the Karmapa, Rumtek plays a crucial role in preserving Tibetan Buddhist traditions. The monastery is renowned for its golden stupa containing the relics of the 16th Karmapa.',
    etiquette: {
      dress: ['Wear modest clothing covering shoulders and knees', 'Remove shoes before entering prayer halls', 'Avoid wearing bright colors, especially red'],
      behavior: ['Maintain silence in prayer halls', 'Walk clockwise around stupas and prayer wheels', 'Do not point feet toward Buddha statues'],
      photography: ['Photography is generally not allowed inside temples', 'Ask permission before photographing monks', 'Flash photography is strictly prohibited']
    },
    audioStory: 'Listen to the sacred chants and learn about the monastery\'s founding from Lama Tenzin'
  }
};

export function MonasteryDetail({ monasteryId, onNavigate }: MonasteryDetailProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [player, setPlayer] = useState<YT.Player | null>(null);
  const playerRef = useRef<HTMLDivElement>(null);

  // Initialize YouTube Player when API is ready
  useEffect(() => {
    const onYouTubeIframeAPIReady = () => {
      if (!playerRef.current) return;

      const newPlayer = new YT.Player(playerRef.current, {
        height: '100%',
        width: '100%',
        videoId: 'EwRQkmEXhS4', // ← ONLY THE VIDEO ID — NO URL!
        playerVars: {
          autoplay: 0,
          rel: 0,
          showinfo: 0,
          modestbranding: 1,
          controls: 1,
          loop: 0,
          playlist: 'EwRQkmEXhS4', // Required for Shorts compatibility
        },
        events: {
          onReady: (event) => {
            console.log('YouTube player ready');
          },
          onError: (event) => {
            console.error('YouTube error:', event.data);
          },
        },
      });

      setPlayer(newPlayer);
    };

    // If API already loaded
    if (window.YT && window.YT.Player) {
      onYouTubeIframeAPIReady();
    } else {
      // Wait for API to load
      window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
    }

    return () => {
      if (player) {
        player.destroy();
      }
    };
  }, [player]);

  if (!monasteryId || !monasteryData[monasteryId as keyof typeof monasteryData]) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl mb-4">Monastery not found</h1>
        <Button onClick={() => onNavigate('explore')}>
          Back to Explore
        </Button>
      </div>
    );
  }

  const monastery = monasteryData[monasteryId as keyof typeof monasteryData];

  const playAudioStory = () => {
    setIsPlayingAudio(true);
    setTimeout(() => setIsPlayingAudio(false), 3000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <Button 
        variant="outline" 
        onClick={() => onNavigate('explore')}
        className="mb-6"
      >
        ← Back to Explore
      </Button>

      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-4 mb-4">
          <h1 className="text-4xl">{monastery.name}</h1>
          <Badge variant="secondary">{monastery.tradition}</Badge>
          <Badge variant="outline">Est. {monastery.established}</Badge>
        </div>
        <p className="text-muted-foreground text-lg">📍 {monastery.location}</p>
      </div>

      {/* Image Gallery */}
      <div className="mb-8">
        <div className="aspect-video relative mb-4 rounded-lg overflow-hidden">
          <ImageWithFallback
            src={monastery.images[currentImageIndex]}
            alt={`${monastery.name} - Image ${currentImageIndex + 1}`}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="flex gap-2 overflow-x-auto">
          {monastery.images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 ${
                currentImageIndex === index ? 'border-primary' : 'border-transparent'
              }`}
            >
              <ImageWithFallback
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Content Tabs */}
      <Tabs defaultValue="overview" className="mb-8">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="etiquette">Etiquette</TabsTrigger>
          <TabsTrigger value="vr-tour">VR Tour</TabsTrigger>
          <TabsTrigger value="stories">Stories</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>About {monastery.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{monastery.description}</p>
              <h4 className="mb-2">Historical Significance</h4>
              <p className="mb-4">{monastery.history}</p>
              <h4 className="mb-2">Spiritual Importance</h4>
              <p>{monastery.significance}</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="etiquette" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Cultural Etiquette Guide</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="mb-3 text-green-600">👕 Dress Code</h4>
                <ul className="space-y-2">
                  {monastery.etiquette.dress.map((rule, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">✓</span>
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="mb-3 text-blue-600">🙏 Respectful Behavior</h4>
                <ul className="space-y-2">
                  {monastery.etiquette.behavior.map((rule, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-blue-500 mt-1">✓</span>
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="mb-3 text-purple-600">📸 Photography Guidelines</h4>
                <ul className="space-y-2">
                  {monastery.etiquette.photography.map((rule, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-purple-500 mt-1">!</span>
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="vr-tour" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>360° Virtual Tour</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                <div className="text-center">
                  <div className="text-6xl mb-4">🥽</div>
                  <p className="text-xl mb-2">Immersive VR Experience</p>
                  <p className="text-muted-foreground mb-4">
                    Step inside {monastery.name} from the comfort of your home
                  </p>
                  <Button size="lg">
                    Launch VR Tour
                  </Button>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Best experienced with VR headset or mobile device. Move your device to look around.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="stories" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Sacred Stories & Legends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-amber-50 p-6 rounded-lg mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                    🧘‍♂️
                  </div>
                  <div>
                    <h4>Narrated by Lama Tenzin</h4>
                    <p className="text-sm text-muted-foreground">Senior Monk at {monastery.name}</p>
                  </div>
                </div>
                <p className="mb-4">{monastery.audioStory}</p>
                <Button 
                  onClick={playAudioStory}
                  disabled={isPlayingAudio}
                  className="w-full"
                >
                  {isPlayingAudio ? '🔊 Playing...' : '🎧 Listen to Sacred Story'}
                </Button>
              </div>

              {isPlayingAudio && (
                <div className="bg-blue-50 p-4 rounded-lg mb-6">
                  <p className="text-sm text-blue-800">
                    🎵 "Om Mani Padme Hum... Welcome, dear visitor, to our sacred home. 
                    Let me tell you the story of how this monastery came to be..."
                  </p>
                </div>
              )}

              {/* ✅ YouTube Shorts Embedded via Official API */}
              <div className="mb-6">
                <h4 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  <span>🎥</span> A Glimpse Inside Rumtek Monastery
                </h4>
                <div
                  ref={playerRef}
                  className="relative aspect-video rounded-lg overflow-hidden shadow-lg bg-gray-900"
                >
                  {/* Loading State */}
                  <div className="absolute inset-0 flex items-center justify-center text-white">
                    <div className="text-center">
                      <div className="text-4xl mb-2">🎬</div>
                      <p>Loading video...</p>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  A short visual journey through Rumtek Monastery — captured in a single take by a visiting monk.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4">
        <Button onClick={() => onNavigate('festivals')} className="flex-1 md:flex-none">
          📅 View Festivals
        </Button>
        <Button onClick={() => onNavigate('community')} variant="outline" className="flex-1 md:flex-none">
          🏠 Find Homestay
        </Button>
        <Button onClick={() => onNavigate('economy')} variant="outline" className="flex-1 md:flex-none">
          🛍️ Local Crafts
        </Button>
      </div>
    </div>
  );
}

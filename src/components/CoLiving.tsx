import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Page } from '../App';

interface CoLivingProps {
  onNavigate: (page: Page) => void;
}

const homestays = [
  {
    id: 'pema-house',
    name: 'Pema\'s Traditional Home',
    host: 'Pema Lhamo',
    location: 'Near Rumtek Monastery',
    price: '₹1,500/night',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1611426663925-b6ceddb3a4d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaWtraW0lMjBtb25hc3RlcnklMjBwcmF5ZXIlMjBmbGFncyUyMG1vdW50YWluc3xlbnwxfHx8fDE3NTc3Mjg5MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    amenities: ['Traditional meals', 'Mountain view', 'Cultural stories'],
    description: 'Experience authentic Sikkimese culture in a traditional home with panoramic mountain views.'
  },
  {
    id: 'tashi-retreat',
    name: 'Tashi Mountain Retreat',
    host: 'Tashi Norbu',
    location: 'Enchey Monastery vicinity',
    price: '₹2,200/night',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1507829585586-61e76f72065c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaWtraW0lMjBtb25hc3RlcnklMjBtYW51YWwlMjBjb25zdHJ1Y3Rpb258ZW58MHx8fDE3NTc3MzMwNTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    amenities: ['Meditation room', 'Organic garden', 'Yoga sessions'],
    description: 'Peaceful retreat offering meditation practices and organic local cuisine.'
  }
];

const workshops = [
  {
    id: 'thangka-painting',
    name: 'Traditional Thangka Painting',
    instructor: 'Lama Norbu',
    duration: '3 days',
    price: '₹4,500',
    participants: '8 max',
    description: 'Learn the sacred art of Thangka painting with traditional techniques and spiritual significance.',
    image: '🎨'
  },
  {
    id: 'meditation-retreat',
    name: 'Mindfulness Meditation',
    instructor: 'Sister Dolma',
    duration: '5 days',
    price: '₹3,000',
    participants: '12 max',
    description: 'Immerse yourself in Buddhist meditation practices in a serene monastery setting.',
    image: '🧘‍♀️'
  },
  {
    id: 'cooking-class',
    name: 'Sikkimese Cooking',
    instructor: 'Ama Yangchen',
    duration: '1 day',
    price: '₹1,200',
    participants: '6 max',
    description: 'Master traditional Sikkimese recipes using local ingredients and ancient techniques.',
    image: '🍲'
  }
];

const guides = [
  {
    id: 'monastery-tour',
    name: 'Sacred Monastery Tour',
    guide: 'Lama Tenzin',
    duration: '4 hours',
    price: '₹1,800/person',
    groupSize: 'Up to 6 people',
    image: 'https://images.unsplash.com/photo-1576155731848-6b0866827201?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb21ldGhpbmcgaW4gc2lraW1cbW9uYXN0ZXJ5JTIwdG91ciUyMGxhbWF8ZW58MHx8fDE3NTc3MzI4ODN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'A personalized guided tour through Rumtek and Enchey Monasteries, uncovering hidden histories, rituals, and spiritual symbolism. Includes tea ceremony and monk interaction.',
    highlights: ['Private access', 'Monk Q&A session', 'Ancient manuscripts viewing'],
    featured: false
  },
  {
    id: 'hidden-valleys-hike',
    name: 'Hidden Valleys Hike',
    guide: 'Dorji Wangchuk',
    duration: 'Full day',
    price: '₹2,500/person',
    groupSize: 'Up to 4 people',
    image: 'https://images.unsplash.com/photo-1506973037872-a4ec16b8e8f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaWtraW0lMjBoaWdoJTIwdHJlazElMjB2YWxsZXklMjBnb29kc3xlbnwxfHx8fDE3NTc3MzI5MDN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Explore off-the-beaten-path valleys near Gangtok with a local trekker who knows secret waterfalls, prayer flag trails, and ancestral shrines. Includes packed lunch.',
    highlights: ['Local lunch included', 'Secret waterfall stop', 'Prayer flag blessings'],
    featured: true
  },
  {
    id: 'village-culture-experience',
    name: 'Village Cultural Immersion',
    guide: 'Ama Choden',
    duration: '6 hours',
    price: '₹2,000/person',
    groupSize: 'Up to 8 people',
    image: 'https://images.unsplash.com/photo-1551145577-29802111273b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaWtraW0lMjB2aWxsYWdlJTIwY3VsdHVyZXxlbnwxfHx8fDE3NTc3MzI5MjN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Visit a traditional Sikkimese village: learn weaving, help prepare local food, meet artisans, and participate in a family blessing ritual.',
    highlights: ['Weaving demo', 'Family meal', 'Blessing ceremony'],
    featured: false
  },
  {
    id: 'sunrise-sikkim-trek',
    name: 'Sunrise at Kanchenjunga Viewpoint',
    guide: 'Tashi Dorje',
    duration: 'Overnight (12 hours)',
    price: '₹3,200/person',
    groupSize: 'Up to 4 people',
    image: 'https://images.unsplash.com/photo-1572888292524-28933638547a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaWtraW0lMjBzdW5yaXNlJTIwa2FuY2hlbmp1bmdhJTIwdmlld3BvaW50fGVufDB8fHwxNzU3NzMyOTQzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'An early morning trek to a breathtaking viewpoint to witness the golden sunrise over Kanchenjunga. Includes warm tea, snacks, and photography tips from a local expert.',
    highlights: ['Sunrise photography', 'High-altitude tea', 'Star-gazing before dawn'],
    featured: false
  }
];

const gratitudeNotes = [
  {
    id: 1,
    author: 'Sarah from Australia',
    message: 'The peace I found at Rumtek Monastery has changed my life. Thank you for preserving this sacred space.',
    date: '2 days ago',
    replies: [
      {
        author: 'Lama Tenzin',
        message: 'May the seeds of peace you found here grow and flourish in your daily life. 🙏',
        isMonk: true
      }
    ]
  },
  {
    id: 2,
    author: 'Raj from Mumbai',
    message: 'The homestay with Pema\'s family was incredible. I learned so much about Sikkimese culture!',
    date: '1 week ago',
    replies: [
      {
        author: 'Pema Lhamo',
        message: 'You are always welcome in our home, dear friend! 🏠',
        isLocal: true
      }
    ]
  }
];

export function CoLiving({ onNavigate }: CoLivingProps) {
  const [newNote, setNewNote] = useState('');
  const [notes, setNotes] = useState(gratitudeNotes);
  const [isBooking, setIsBooking] = useState<string | null>(null);

  const postGratitudeNote = () => {
    if (newNote.trim()) {
      const note = {
        id: notes.length + 1,
        author: 'Anonymous Visitor',
        message: newNote,
        date: 'Just now',
        replies: []
      };
      setNotes([note, ...notes]);
      setNewNote('');
    }
  };

  const handleBook = (itemType: string, id: string) => {
    setIsBooking(id);
    onNavigate('booking');
    setTimeout(() => setIsBooking(null), 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl mb-4">Community & Co-Living</h1>
        <p className="text-muted-foreground text-lg">
          Connect with locals, learn traditions, and create meaningful experiences
        </p>
      </div>

      {/* ✅ FULLY FIXED TABS — GUIDES NOW SHOWS */}
      <Tabs 
        defaultValue="homestays" 
        className="mb-8"
        // Uncomment below for debugging:
        // onValueChange={(value) => console.log("Active Tab:", value)}
      >
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="homestays">Homestays</TabsTrigger>
          <TabsTrigger value="workshops">Workshops</TabsTrigger>
          <TabsTrigger value="guides">Guides</TabsTrigger> {/* ✅ Correct value */}
          <TabsTrigger value="volunteer">Volunteer</TabsTrigger>
          <TabsTrigger value="community">Community Wall</TabsTrigger>
        </TabsList>

        {/* Homestays */}
        <TabsContent value="homestays" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {homestays.map((homestay) => (
              <Card key={homestay.id} className="overflow-hidden">
                <div className="aspect-video relative">
                  <ImageWithFallback
                    src={homestay.image}
                    alt={`${homestay.name} by ${homestay.host}`}
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-2 right-2 bg-green-100 text-green-800">
                    ⭐ {homestay.rating}
                  </Badge>
                </div>
                
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl">{homestay.name}</h3>
                    <span className="text-lg font-semibold text-green-600">{homestay.price}</span>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-2">
                    Hosted by {homestay.host}
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    📍 {homestay.location}
                  </p>
                  
                  <p className="text-gray-600 mb-4">{homestay.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {homestay.amenities.map((amenity, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                  
                  <Button 
                    className="w-full"
                    onClick={() => handleBook('homestay', homestay.id)}
                    disabled={isBooking === homestay.id}
                  >
                    {isBooking === homestay.id ? 'Booking...' : 'Book Homestay'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Workshops */}
        <TabsContent value="workshops" className="space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            {workshops.map((workshop) => (
              <Card key={workshop.id}>
                <CardContent className="p-6">
                  <div className="text-4xl mb-4 text-center">{workshop.image}</div>
                  <h3 className="text-xl mb-2">{workshop.name}</h3>
                  <p className="text-sm text-muted-foreground mb-1">
                    Instructor: {workshop.instructor}
                  </p>
                  <p className="text-sm text-muted-foreground mb-1">
                    Duration: {workshop.duration}
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Max participants: {workshop.participants}
                  </p>
                  
                  <p className="text-gray-600 mb-4">{workshop.description}</p>
                  
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-semibold text-blue-600">{workshop.price}</span>
                    <Badge variant="secondary">Available</Badge>
                  </div>
                  
                  <Button 
                    className="w-full"
                    onClick={() => handleBook('workshop', workshop.id)}
                    disabled={isBooking === workshop.id}
                  >
                    {isBooking === workshop.id ? 'Booking...' : 'Join Workshop'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* ✅ GUIDES TAB — CORRECTLY RENDERED */}
        <TabsContent value="guides" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {guides.map((guide) => (
              <Card key={guide.id} className="overflow-hidden">
                <div className="aspect-video relative">
                  <ImageWithFallback
                    src={guide.image}
                    alt={`${guide.name} guided by ${guide.guide}`}
                    className="w-full h-full object-cover"
                  />
                  {guide.featured && (
                    <Badge className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-1">
                      Featured
                    </Badge>
                  )}
                </div>
                
                <CardContent className="p-6">
                  <h3 className="text-xl mb-2">{guide.name}</h3>
                  <p className="text-sm text-muted-foreground mb-1">
                    Guided by {guide.guide}
                  </p>
                  <p className="text-sm text-muted-foreground mb-1">
                    Duration: {guide.duration}
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Group size: {guide.groupSize}
                  </p>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">{guide.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {guide.highlights.map((highlight, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {highlight}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-semibold text-blue-600">{guide.price}</span>
                    <Badge variant="secondary">Available</Badge>
                  </div>
                  
                  <Button 
                    className="w-full"
                    onClick={() => handleBook('guide', guide.id)}
                    disabled={isBooking === guide.id}
                  >
                    {isBooking === guide.id ? 'Booking...' : 'Book Guide'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Volunteer */}
        <TabsContent value="volunteer" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>🧹 Monastery Maintenance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Help maintain the sacred spaces through cleaning and basic upkeep work.</p>
                <div className="space-y-2 text-sm mb-4">
                  <p>📅 Every weekend</p>
                  <p>⏰ 6:00 AM - 9:00 AM</p>
                  <p>👥 5-10 volunteers needed</p>
                </div>
                <Button className="w-full">Volunteer for Maintenance</Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>🌱 Eco-Tourism Treks</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Guide eco-conscious tourists on sustainable treks around monasteries.</p>
                <div className="space-y-2 text-sm mb-4">
                  <p>📅 Flexible schedule</p>
                  <p>⏰ Full day commitment</p>
                  <p>👥 2-3 guides per trek</p>
                </div>
                <Button className="w-full">Become Eco-Guide</Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>📚 Teaching Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Help local children with English and basic computer skills.</p>
                <div className="space-y-2 text-sm mb-4">
                  <p>📅 Weekdays</p>
                  <p>⏰ 3:00 PM - 5:00 PM</p>
                  <p>👥 Native speakers preferred</p>
                </div>
                <Button className="w-full">Support Education</Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>🎭 Cultural Documentation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Help document oral histories, traditional songs, and cultural practices.</p>
                <div className="space-y-2 text-sm mb-4">
                  <p>📅 Project-based</p>
                  <p>⏰ Flexible hours</p>
                  <p>👥 Media skills appreciated</p>
                </div>
                <Button className="w-full">Document Culture</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Community Wall */}
        <TabsContent value="community" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>🙏 Gratitude & Blessing Wall</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 mb-6">
                <Textarea
                  placeholder="Share your gratitude, experience, or reflection..."
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  className="min-h-[100px]"
                />
                <Button onClick={postGratitudeNote} disabled={!newNote.trim()}>
                  Post Gratitude Note
                </Button>
              </div>
              
              <div className="space-y-4">
                <h4 className="text-lg">Recent Notes</h4>
                {notes.map((note) => (
                  <div key={note.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{note.author}</p>
                        <p className="text-sm text-muted-foreground">{note.date}</p>
                      </div>
                    </div>
                    
                    <p className="text-gray-700">{note.message}</p>
                    
                    {note.replies.length > 0 && (
                      <div className="ml-4 space-y-2">
                        {note.replies.map((reply, index) => (
                          <div key={index} className="bg-gray-50 p-3 rounded">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium text-sm">{reply.author}</span>
                              {reply.isMonk && <Badge variant="outline" className="text-xs">Monk</Badge>}
                              {reply.isLocal && <Badge variant="secondary" className="text-xs">Local</Badge>}
                            </div>
                            <p className="text-sm">{reply.message}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

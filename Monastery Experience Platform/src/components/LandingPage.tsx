import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Page } from '../App';

interface LandingPageProps {
  onNavigate: (page: Page) => void;
}

const blessings = [
  "May your journey bring peace to your heart 🙏",
  "May you find wisdom in the mountain silence 🏔️",
  "May compassion guide your path forward 💝",
  "May the dharma illuminate your way ✨",
  "May all beings be happy and free from suffering 🕊️"
];

export function LandingPage({ onNavigate }: LandingPageProps) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [currentBlessing, setCurrentBlessing] = useState("");
  const [showBlessing, setShowBlessing] = useState(false);

  const spinPrayerWheel = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    const randomBlessing = blessings[Math.floor(Math.random() * blessings.length)];
    
    setTimeout(() => {
      setCurrentBlessing(randomBlessing);
      setShowBlessing(true);
      setIsSpinning(false);
      
      setTimeout(() => {
        onNavigate('explore');
      }, 2500);
    }, 1500);
  };

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1611426663925-b6ceddb3a4d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaWtraW0lMjBtb25hc3RlcnklMjBwcmF5ZXIlMjBmbGFncyUyMG1vdW50YWluc3xlbnwxfHx8fDE3NTc3Mjg5MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Sikkim Monastery with Prayer Flags"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Animated Prayer Flags */}
        <div className="absolute top-0 left-0 w-full h-32 z-10">
          <motion.div
            className="flex space-x-4 h-full items-start pt-8 pl-8"
            animate={{ x: [-20, 20, -20] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            {['bg-red-500', 'bg-blue-500', 'bg-yellow-500', 'bg-green-500', 'bg-white'].map((color, index) => (
              <motion.div
                key={index}
                className={`w-8 h-12 ${color} opacity-80 transform rotate-3`}
                animate={{ rotate: [3, -3, 3] }}
                transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
              />
            ))}
          </motion.div>
        </div>

        <div className="relative z-20 text-center text-white max-w-4xl px-4">
          <motion.h1
            className="text-5xl md:text-7xl mb-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Experience the Monasteries of Sikkim
          </motion.h1>
          
          <motion.p
            className="text-xl md:text-2xl mb-12 text-gray-200"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Authentically, Respectfully, Together
          </motion.p>

          {/* Interactive Prayer Wheel */}
          <motion.div
            className="flex flex-col items-center space-y-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <div className="relative">
              <motion.button
                onClick={spinPrayerWheel}
                className="w-32 h-32 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-600 rounded-full flex items-center justify-center shadow-2xl border-4 border-yellow-300 hover:scale-105 transition-transform"
                animate={{ rotate: isSpinning ? 360 * 3 : 0 }}
                transition={{ duration: isSpinning ? 1.5 : 0, ease: "easeOut" }}
                disabled={isSpinning}
              >
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1686298102279-8bbbac05ba3c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidWRkaGlzdCUyMHByYXllciUyMHdoZWVsJTIwZ29sZGVufGVufDF8fHx8MTc1NzcyODkyOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Prayer Wheel"
                  className="w-20 h-20 rounded-full object-cover"
                />
              </motion.button>
              
              {/* Blessing Display */}
              {showBlessing && (
                <motion.div
                  className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 bg-white/90 text-gray-800 px-4 py-2 rounded-lg shadow-lg whitespace-nowrap"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {currentBlessing}
                </motion.div>
              )}
            </div>
            
            <p className="text-lg text-gray-300">
              {isSpinning ? "Spinning prayer wheel..." : "Click the prayer wheel for a blessing"}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Preview */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl text-center mb-12">Discover Sacred Sikkim</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🗺️</div>
              <h3 className="text-xl mb-2">Explore Monasteries</h3>
              <p className="text-muted-foreground">Discover ancient monasteries with interactive maps and detailed histories</p>
            </Card>
            
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🎋</div>
              <h3 className="text-xl mb-2">Cultural Festivals</h3>
              <p className="text-muted-foreground">Experience sacred festivals and ceremonies through live streams</p>
            </Card>
            
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🏠</div>
              <h3 className="text-xl mb-2">Community Living</h3>
              <p className="text-muted-foreground">Connect with locals through homestays and cultural workshops</p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Page } from '../App';

interface NavigationProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  isAuthenticated: boolean;
  user: { name: string; email: string; role: 'user' | 'admin' } | null;
  onLogout: () => void;
}

export function Navigation({ currentPage, onNavigate, isAuthenticated, user, onLogout }: NavigationProps) {
  const [emergencyDialogOpen, setEmergencyDialogOpen] = useState(false);
  
  const navItems = [
    { id: 'home' as Page, label: 'Home' },
    { id: 'explore' as Page, label: 'Explore' },
    { id: 'festivals' as Page, label: 'Festivals' },
    { id: 'community' as Page, label: 'Community' },
    { id: 'vault' as Page, label: 'Preservation' },
    { id: 'economy' as Page, label: 'Shop' },
  ];

  const emergencyContacts = [
    { name: 'Police Emergency', number: '100', description: 'General emergency police helpline' },
    { name: 'Medical Emergency', number: '108', description: 'Ambulance and medical emergency' },
    { name: 'Tourist Helpline Sikkim', number: '+91-3592-202425', description: 'For tourist assistance and guidance' },
    { name: 'Monastery Emergency', number: '+91-3592-205566', description: 'For monastery-related emergencies' },
    { name: 'Fire Emergency', number: '101', description: 'Fire department emergency' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 backdrop-blur border-b border-orange-300/30 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-600 rounded-full flex items-center justify-center shadow-md">
              <span className="text-white">🏔️</span>
            </div>
            <span className="text-lg font-semibold text-white drop-shadow-sm">Sikkim Monasteries</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Button
                key={item.id}
                variant={currentPage === item.id ? "secondary" : "ghost"}
                onClick={() => onNavigate(item.id)}
                className={`relative text-white hover:bg-white/20 hover:text-white transition-colors ${
                  currentPage === item.id 
                    ? 'bg-white/25 text-white shadow-sm' 
                    : 'text-white/90 hover:text-white'
                }`}
              >
                {item.label}
              </Button>
            ))}
          </div>

          <div className="flex items-center space-x-2">
            {/* Emergency Contact Button */}
            <Dialog open={emergencyDialogOpen} onOpenChange={setEmergencyDialogOpen}>
              <DialogTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="bg-red-600 hover:bg-red-700 text-white border-red-500 hover:border-red-600 shadow-sm"
                >
                  🚨 Emergency
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-red-600 flex items-center gap-2">
                    🚨 Emergency Contacts
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  {emergencyContacts.map((contact, index) => (
                    <div key={index} className="border rounded-lg p-3 bg-gray-50">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{contact.name}</h4>
                          <p className="text-sm text-gray-600 mt-1">{contact.description}</p>
                        </div>
                        <a 
                          href={`tel:${contact.number}`}
                          className="ml-3 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
                        >
                          {contact.number}
                        </a>
                      </div>
                    </div>
                  ))}
                  <div className="text-xs text-gray-500 mt-4 p-2 bg-yellow-50 rounded border">
                    <strong>Note:</strong> In case of immediate danger, call the appropriate emergency number directly. 
                    These contacts are for assistance within Sikkim region.
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            {isAuthenticated && user ? (
              <div className="hidden md:flex items-center space-x-2">
                <span className="text-sm text-white/90">Welcome, {user.name}</span>
                {user.role === 'admin' && (
                  <Button 
                    variant={currentPage === 'admin' ? "secondary" : "outline"}
                    onClick={() => onNavigate('admin')}
                    size="sm"
                    className={`${
                      currentPage === 'admin' 
                        ? 'bg-white/25 text-white hover:bg-white/30' 
                        : 'border-white/30 text-white hover:bg-white/20 hover:text-white'
                    }`}
                  >
                    Admin
                  </Button>
                )}
                <Button 
                  variant="outline" 
                  onClick={onLogout}
                  className="border-white/30 text-white hover:bg-white/20 hover:text-white"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Button 
                variant={currentPage === 'auth' ? "secondary" : "outline"}
                onClick={() => onNavigate('auth')}
                className={`${
                  currentPage === 'auth' 
                    ? 'bg-white/25 text-white hover:bg-white/30' 
                    : 'border-white/30 text-white hover:bg-white/20 hover:text-white'
                }`}
              >
                Login
              </Button>
            )}
            
            <div className="md:hidden">
              <Button 
                variant="ghost" 
                size="sm"
                className="text-white hover:bg-white/20"
              >
                ☰
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

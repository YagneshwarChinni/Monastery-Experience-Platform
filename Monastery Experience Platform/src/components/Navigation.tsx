import React from 'react';
import { Button } from './ui/button';
import { Page } from '../App';

interface NavigationProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  isAuthenticated: boolean;
  user: { name: string; email: string; role: 'user' | 'admin' } | null;
  onLogout: () => void;
}

export function Navigation({ currentPage, onNavigate, isAuthenticated, user, onLogout }: NavigationProps) {
  const navItems = [
    { id: 'home' as Page, label: 'Home' },
    { id: 'explore' as Page, label: 'Explore' },
    { id: 'festivals' as Page, label: 'Festivals' },
    { id: 'community' as Page, label: 'Community' },
    { id: 'vault' as Page, label: 'Preservation' },
    { id: 'economy' as Page, label: 'Shop' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center">
              <span className="text-white">🏔️</span>
            </div>
            <span className="text-lg font-semibold">Sikkim Monasteries</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Button
                key={item.id}
                variant={currentPage === item.id ? "default" : "ghost"}
                onClick={() => onNavigate(item.id)}
                className="relative"
              >
                {item.label}
              </Button>
            ))}
          </div>

          <div className="flex items-center space-x-2">
            {isAuthenticated && user ? (
              <div className="hidden md:flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">Welcome, {user.name}</span>
                {user.role === 'admin' && (
                  <Button 
                    variant={currentPage === 'admin' ? "default" : "outline"}
                    onClick={() => onNavigate('admin')}
                    size="sm"
                  >
                    Admin
                  </Button>
                )}
                <Button variant="outline" onClick={onLogout}>
                  Logout
                </Button>
              </div>
            ) : (
              <Button 
                variant={currentPage === 'auth' ? "default" : "outline"}
                onClick={() => onNavigate('auth')}
              >
                Login
              </Button>
            )}
            
            <div className="md:hidden">
              <Button variant="ghost" size="sm">
                ☰
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
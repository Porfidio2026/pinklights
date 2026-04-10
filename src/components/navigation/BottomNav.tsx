
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Search, User, Briefcase } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface NavItem {
  icon: React.ElementType;
  label: string;
  path: string;
}

interface BottomNavProps {
  userType: 'regular' | 'partner' | null;
  isAuthenticated: boolean;
}

const BottomNav = ({ userType, isAuthenticated }: BottomNavProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();

  if (!isMobile || !isAuthenticated) return null;

  const navItems: NavItem[] = [
    {
      icon: Home,
      label: 'Home',
      path: userType === 'partner' ? '/partner-dashboard' : '/home',
    },
    {
      icon: Search,
      label: 'Search',
      path: '/',
    },
    ...(userType === 'partner'
      ? [{ icon: Briefcase, label: 'Ads', path: '/edit-ads' }]
      : []),
    {
      icon: User,
      label: 'Profile',
      path: userType === 'partner' ? '/partner-settings' : '/account-settings',
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-t border-border pb-[env(safe-area-inset-bottom)]">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center justify-center gap-1 flex-1 h-full transition-colors"
              type="button"
            >
              <item.icon
                className={`h-5 w-5 ${
                  isActive ? 'text-primary' : 'text-muted-foreground'
                }`}
              />
              <span
                className={`text-[10px] font-medium ${
                  isActive ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                {item.label}
              </span>
              {isActive && (
                <div className="absolute top-0 w-8 h-0.5 bg-primary rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;

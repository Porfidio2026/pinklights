
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { User } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { supabase } from '@/lib/supabase';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userType, setUserType] = useState<'regular' | 'partner' | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setIsAuthenticated(!!session);
        
        if (session) {
          // Check if user is a partner
          const { data: partnerData } = await supabase
            .from('partners')
            .select('id')
            .eq('user_id', session.user.id)
            .maybeSingle();
          
          setUserType(partnerData ? 'partner' : 'regular');

          // Check if user is admin
          const { data: adminData } = await supabase
            .from('admin_users')
            .select('id')
            .eq('user_id', session.user.id)
            .maybeSingle();

          setIsAdmin(!!adminData);
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setIsAuthenticated(!!session);
        checkAuth();
      }
    );
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleLogoClick = () => {
    if (isAuthenticated) {
      if (userType === 'partner') {
        navigate('/partner-dashboard');
      } else {
        navigate('/home');
      }
    } else {
      navigate('/');
    }
  };

  const handleLoginClick = () => {
    navigate('/auth');
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const handleAccountSettings = () => {
    if (userType === 'partner') {
      navigate('/partner-settings');
    } else {
      navigate('/account-settings');
    }
  };

  const handleDashboard = () => {
    if (userType === 'partner') {
      navigate('/partner-dashboard');
    } else {
      navigate('/home');
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <button 
          onClick={handleLogoClick} 
          className="flex items-center gap-2"
          type="button"
        >
          <img 
            src="/uploads/737ebfb2-027b-48ad-bff0-23b3eebd1979.png"
            alt="Pinklights Logo"
            className="h-8 w-auto"
          />
          <span className="text-xl font-bold font-display tracking-tight">
            <span className="text-gradient-pink">Pink</span><span className="text-foreground">lights</span>
          </span>
        </button>

        <div className="flex items-center gap-4">
          {!loading && (
            isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem onClick={handleDashboard}>
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleAccountSettings}>
                    Account Settings
                  </DropdownMenuItem>
                  {userType === 'partner' && !isMobile && (
                    <>
                      <DropdownMenuItem onClick={() => navigate('/create-ad')}>
                        Create Ad
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate('/edit-ads')}>
                        Manage Ads
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate('/partner-billing')}>
                        Billing
                      </DropdownMenuItem>
                    </>
                  )}
                  {isAdmin && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => navigate('/admin')}>
                        Admin Panel
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <button
                onClick={handleLoginClick}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                type="button"
              >
                Sign in
              </button>
            )
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

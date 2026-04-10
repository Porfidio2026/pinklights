
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { supabase, handleLogout } from '@/lib/supabase';
import { useToast } from "@/components/ui/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  User,
  Image,
  MapPin,
  Settings,
  CreditCard,
  LogOut,
  ChevronDown,
  Clock,
  Home,
} from 'lucide-react';

export const UserMenu = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasProfile, setHasProfile] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        const isAuth = !!session;
        setIsAuthenticated(isAuth);
        
        if (isAuth) {
          // Check if user has a profile
          const { data: profile } = await supabase
            .from('profiles')
            .select('id')
            .eq('user_id', session.user.id)
            .maybeSingle();
          
          setHasProfile(!!profile);
          
          // Redirect to homepage if user has a profile and is on the index page
          if (profile && window.location.pathname === '/') {
            navigate('/home');
          }
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
      }
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      setIsAuthenticated(!!session);
      
      if (session) {
        // Check if user has a profile
        const { data: profile } = await supabase
          .from('profiles')
          .select('id')
          .eq('user_id', session.user.id)
          .maybeSingle();
        
        setHasProfile(!!profile);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const onLogout = async () => {
    if (isLoggingOut) return; // Prevent multiple clicks
    
    try {
      setIsLoggingOut(true);
      
      toast({
        title: "Logging out...",
        description: "Please wait while we log you out",
      });
      
      // Call the central logout handler
      await handleLogout();
      
      // Note: The code below may not execute due to the redirect in handleLogout
    } catch (error) {
      console.error('Logout error in UserMenu:', error);
      setIsLoggingOut(false);
      toast({
        title: "Error",
        description: "Failed to log out",
        variant: "destructive",
      });
    }
  };

  if (!isAuthenticated) {
    return (
      <Button variant="ghost" onClick={() => navigate('/auth')} className="flex items-center gap-2">
        <User className="h-4 w-4" />
        <span>Login</span>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2">
          <User className="h-4 w-4" />
          <span>My Account</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 bg-background">
        {hasProfile && (
          <DropdownMenuItem asChild>
            <Link to="/home" className="cursor-pointer">
              <Home className="mr-2 h-4 w-4" />
              <span>Dashboard</span>
            </Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem asChild>
          <Link to="/create-profile" className="cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            <span>Edit Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/upload-profile-picture" className="cursor-pointer">
            <Image className="mr-2 h-4 w-4" />
            <span>Edit Pictures</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/set-availabilities" className="cursor-pointer">
            <Clock className="mr-2 h-4 w-4" />
            <span>Set Availabilities</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to="/address" className="cursor-pointer">
            <MapPin className="mr-2 h-4 w-4" />
            <span>Address</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/account-settings" className="cursor-pointer">
            <Settings className="mr-2 h-4 w-4" />
            <span>Account Settings</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/buy-credits" className="cursor-pointer">
            <CreditCard className="mr-2 h-4 w-4" />
            <span>Payment & Visibility</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          onClick={onLogout} 
          disabled={isLoggingOut}
          className="cursor-pointer text-destructive"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>{isLoggingOut ? "Logging out..." : "Log out"}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, MessageCircle } from 'lucide-react';

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="border-t border-border bg-background/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <img
              src="/uploads/finallogo.jpeg"
              alt="Pinklights Logo"
              className="h-6 w-auto"
            />
            <span className="text-sm font-semibold font-display tracking-tight">
              <span className="text-gradient-pink">Pink</span><span className="text-foreground">lights</span><span className="text-white text-[0.9em]">.be</span>
            </span>
          </div>

          <div className="flex flex-col items-center md:items-end gap-3">
            <a
              href="https://wa.me/32478026479"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <MessageCircle className="h-4 w-4" />
              <span>+32 478 02 64 79</span>
            </a>
            <a
              href="mailto:support@pink-lights.be"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <Mail className="h-4 w-4" />
              <span>support@pink-lights.be</span>
            </a>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <button
                onClick={() => navigate('/privacy')}
                className="hover:text-foreground transition-colors"
                type="button"
              >
                Privacy Policy
              </button>
              <span>&copy; {new Date().getFullYear()} Pinklights</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

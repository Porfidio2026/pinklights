import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, MessageCircle } from 'lucide-react';

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="border-t border-border bg-background/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-start justify-between gap-8">
          {/* Brand + contact */}
          <div className="space-y-3">
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
          </div>

          {/* Link columns */}
          <div className="flex flex-wrap gap-x-12 gap-y-6">
            <div className="space-y-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">Explore</h4>
              <ul className="space-y-1.5 text-sm">
                <li><Link to="/find" className="text-muted-foreground hover:text-primary transition-colors">Find by City</Link></li>
                <li><Link to="/guides" className="text-muted-foreground hover:text-primary transition-colors">Guides</Link></li>
                <li><Link to="/faq" className="text-muted-foreground hover:text-primary transition-colors">FAQ</Link></li>
                <li><Link to="/compare" className="text-muted-foreground hover:text-primary transition-colors">Compare</Link></li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">Company</h4>
              <ul className="space-y-1.5 text-sm">
                <li><Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">About</Link></li>
                <li><Link to="/safety" className="text-muted-foreground hover:text-primary transition-colors">Safety</Link></li>
                <li><Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-4 border-t border-border text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Pinklights. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

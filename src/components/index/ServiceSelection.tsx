
import React, { useState } from 'react';
import { Lock, Phone, Heart, Sparkles } from 'lucide-react';

export type ServiceType = 'private' | 'outcall' | 'soft' | 'ropes' | null;

interface ServiceSelectionProps {
  setSelectedService: (service: ServiceType) => void;
  setStep: (step: 2) => void;
}

const services = [
  {
    name: 'Private',
    value: 'private' as ServiceType,
    icon: Lock,
    description: 'Exclusive in-location experiences',
  },
  {
    name: 'Out-Call',
    value: 'outcall' as ServiceType,
    icon: Phone,
    description: 'At your preferred location',
  },
  {
    name: 'Soft',
    value: 'soft' as ServiceType,
    icon: Heart,
    description: 'Gentle and intimate encounters',
  },
  {
    name: 'Ropes',
    value: 'ropes' as ServiceType,
    icon: Sparkles,
    description: 'Adventurous and bold sessions',
  },
];

const ServiceSelection: React.FC<ServiceSelectionProps> = ({ setSelectedService, setStep }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleSelect = (service: ServiceType) => {
    setSelectedService(service);
    localStorage.setItem('selectedService', service as string);
    setStep(2);
  };

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center px-5 animate-fade-in relative">
      {/* Ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-pink-500/[0.04] rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-sm space-y-10">
        {/* Header */}
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-bold font-display tracking-tight text-foreground">
            What are you <span className="text-gradient-pink">looking for</span>?
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Select a service to get started
          </p>
        </div>

        {/* Service cards */}
        <div className="grid grid-cols-1 gap-3">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isHovered = hoveredIndex === index;
            return (
              <button
                key={service.value}
                onClick={() => handleSelect(service.value)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`
                  group relative flex items-center gap-4 w-full p-4 rounded-2xl
                  border transition-all duration-300 ease-out text-left
                  opacity-0 animate-slide-up
                  ${isHovered
                    ? 'bg-pink-100 border-pink-300 pink-glow scale-[1.02]'
                    : 'bg-card/50 border-white/[0.06] hover:bg-card/80'
                  }
                `}
                style={{ animationDelay: `${index * 0.07}s`, animationFillMode: 'forwards' }}
                type="button"
              >
                {/* Icon */}
                <div className={`
                  flex items-center justify-center w-12 h-12 rounded-xl shrink-0
                  transition-all duration-300
                  ${isHovered
                    ? 'gradient-pink text-white shadow-lg'
                    : 'bg-white/[0.04] text-muted-foreground group-hover:text-primary'
                  }
                `}>
                  <Icon className="w-5 h-5" />
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <div className={`font-semibold font-display text-[15px] transition-colors duration-300 ${isHovered ? 'text-foreground' : 'text-foreground/90'}`}>
                    {service.name}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {service.description}
                  </div>
                </div>

                {/* Arrow indicator */}
                <div className={`
                  text-muted-foreground transition-all duration-300 shrink-0
                  ${isHovered ? 'translate-x-0.5 text-primary' : ''}
                `}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="opacity-40 group-hover:opacity-100 transition-opacity">
                    <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ServiceSelection;

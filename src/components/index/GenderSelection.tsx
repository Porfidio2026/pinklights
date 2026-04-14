
import React, { useState } from 'react';

export type GenderType = 'Female' | 'Trans' | null;

interface GenderSelectionProps {
  setSelectedGender: (gender: GenderType) => void;
  setProfilesError: (error: boolean) => void;
  setStep: (step: 3) => void;
}

const genders = [
  {
    label: 'Female',
    value: 'Female' as GenderType,
    image: '/uploads/4d41358f-07c1-4783-be77-49f7503654e7.png',
    alt: 'Female',
  },
  {
    label: 'Trans',
    value: 'Trans' as GenderType,
    image: '/uploads/c1b04e90-f5e6-4b67-ab69-1f73258dbfd9.png',
    alt: 'Transgender',
  },
];

const GenderSelection: React.FC<GenderSelectionProps> = ({
  setSelectedGender,
  setProfilesError,
  setStep
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleSelect = (gender: GenderType) => {
    setSelectedGender(gender);
    localStorage.setItem('selectedGender', gender as string);
    setProfilesError(false);
    setStep(3);
  };

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center px-5 animate-fade-in relative">
      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[350px] h-[350px] bg-pink-500/[0.04] rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-sm space-y-10">
        {/* Header */}
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-bold font-display tracking-tight text-foreground">
            Who would you <span className="text-gradient-pink">like to meet</span>?
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Choose your preference
          </p>
        </div>

        {/* Gender cards */}
        <div className="flex gap-5 justify-center">
          {genders.map((gender, index) => {
            const isHovered = hoveredIndex === index;
            return (
              <button
                key={gender.value}
                onClick={() => handleSelect(gender.value)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`
                  group relative flex flex-col items-center justify-center gap-4
                  w-36 h-44 rounded-2xl border
                  transition-all duration-300 ease-out
                  opacity-0 animate-slide-up
                  ${isHovered
                    ? 'bg-pink-100 border-pink-300 pink-glow scale-[1.03]'
                    : 'bg-card/50 border-white/[0.06] hover:bg-card/80'
                  }
                `}
                style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
                type="button"
              >
                {/* Image container */}
                <div className={`
                  flex items-center justify-center w-16 h-16 rounded-xl
                  transition-all duration-300
                  ${isHovered
                    ? 'gradient-pink shadow-lg'
                    : 'bg-white/[0.04]'
                  }
                `}>
                  <img
                    src={gender.image}
                    alt={gender.alt}
                    className={`
                      w-9 h-9 object-contain transition-all duration-300
                      ${isHovered ? 'brightness-0 invert scale-110' : 'brightness-0 invert opacity-60 group-hover:opacity-90'}
                    `}
                  />
                </div>

                {/* Label */}
                <span className={`
                  font-semibold font-display text-[15px] tracking-wide
                  transition-colors duration-300
                  ${isHovered ? 'text-primary' : 'text-foreground/80 group-hover:text-foreground'}
                `}>
                  {gender.label}
                </span>

                {/* Active indicator dot */}
                <div className={`
                  absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full
                  transition-all duration-300
                  ${isHovered ? 'bg-primary scale-100 opacity-100' : 'bg-primary scale-0 opacity-0'}
                `} />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GenderSelection;

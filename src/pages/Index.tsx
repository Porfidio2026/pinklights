
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ServiceSelection, { ServiceType } from '@/components/index/ServiceSelection';
import GenderSelection, { GenderType } from '@/components/index/GenderSelection';
import MainSearch from '@/components/index/MainSearch';

const stepLabels = ['Service', 'Preference', 'Browse'];

const StepIndicator = ({ currentStep }: { currentStep: 1 | 2 | 3 }) => (
  <div className="fixed top-16 left-0 right-0 z-40 flex justify-center py-3 pointer-events-none">
    <div className="flex items-center gap-2">
      {stepLabels.map((label, index) => {
        const stepNum = index + 1;
        const isActive = stepNum === currentStep;
        const isCompleted = stepNum < currentStep;
        return (
          <React.Fragment key={label}>
            {index > 0 && (
              <div className={`w-6 h-px transition-colors duration-500 ${isCompleted ? 'bg-primary' : 'bg-border'}`} />
            )}
            <div className="flex items-center gap-1.5">
              <div className={`
                w-1.5 h-1.5 rounded-full transition-all duration-500
                ${isActive ? 'bg-primary scale-125 shadow-[0_0_8px_hsl(330_65%_58%/0.5)]' : isCompleted ? 'bg-primary' : 'bg-muted-foreground/30'}
              `} />
              <span className={`
                text-[10px] font-medium tracking-wider uppercase transition-colors duration-500
                ${isActive ? 'text-primary' : isCompleted ? 'text-muted-foreground' : 'text-muted-foreground/40'}
              `}>
                {label}
              </span>
            </div>
          </React.Fragment>
        );
      })}
    </div>
  </div>
);

const Index = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [step, setStep] = useState<1 | 2 | 3>(() => {
    const urlParams = new URLSearchParams(location.search);
    const stepParam = urlParams.get('step');
    if (stepParam && ['1', '2', '3'].includes(stepParam)) {
      return parseInt(stepParam) as 1 | 2 | 3;
    }
    return location.state?.startAtStep === 3 ? 3 : 1;
  });

  const [selectedService, setSelectedService] = useState<ServiceType>(() => {
    const stored = localStorage.getItem('selectedService');
    return stored ? stored as ServiceType : null;
  });

  const [selectedGender, setSelectedGender] = useState<GenderType>(() => {
    const stored = localStorage.getItem('selectedGender');
    return stored ? stored as GenderType : null;
  });

  const [profilesError, setProfilesError] = useState<boolean>(false);

  // Update URL when step changes
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    params.set('step', step.toString());
    navigate(`?${params.toString()}`, { replace: true });
  }, [step, navigate, location.search]);

  return (
    <div className="relative">
      {/* Step indicator (only on steps 1 & 2, hides on full search page) */}
      {step < 3 && <StepIndicator currentStep={step} />}

      {step === 1 && (
        <ServiceSelection
          setSelectedService={setSelectedService}
          setStep={setStep as (step: 2) => void}
        />
      )}
      {step === 2 && (
        <GenderSelection
          setSelectedGender={setSelectedGender}
          setProfilesError={setProfilesError}
          setStep={setStep as (step: 3) => void}
        />
      )}
      {step === 3 && (
        <MainSearch
          selectedService={selectedService}
          selectedGender={selectedGender}
          profilesError={profilesError}
          setProfilesError={setProfilesError}
          setStep={setStep as (step: 1) => void}
        />
      )}
    </div>
  );
};

export default Index;

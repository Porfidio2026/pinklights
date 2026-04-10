
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchForm } from '@/components/SearchForm';
import { RelatedProfiles } from '@/components/RelatedProfiles';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { AlertTriangle, SlidersHorizontal } from 'lucide-react';
import { ServiceType } from './ServiceSelection';
import { GenderType } from './GenderSelection';
import { ErrorBoundary } from './ErrorBoundary';

interface MainSearchProps {
  selectedService: ServiceType;
  selectedGender: GenderType;
  profilesError: boolean;
  setProfilesError: (error: boolean) => void;
  setStep: (step: 1) => void;
}

const MainSearch: React.FC<MainSearchProps> = ({
  selectedService,
  selectedGender,
  profilesError,
  setProfilesError,
  setStep
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  // Handle case when no service or gender is selected
  if (!selectedService || !selectedGender) {
    useEffect(() => {
      toast({
        title: "Selection Required",
        description: "Please select service and gender preferences first.",
        variant: "destructive",
      });
      setStep(1);
    }, []);

    return null;
  }

  // Error Fallback Component for RelatedProfiles
  const ProfilesErrorFallback = () => (
    <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-6 text-center">
      <div className="flex justify-center mb-3">
        <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center">
          <AlertTriangle className="h-5 w-5 text-destructive" />
        </div>
      </div>
      <h3 className="font-semibold font-display text-foreground">Unable to load profiles</h3>
      <p className="text-muted-foreground text-sm mt-1.5 max-w-xs mx-auto">
        We're having trouble loading profiles right now. Please try again.
      </p>
      <Button
        variant="outline"
        size="sm"
        className="mt-4 rounded-full px-6"
        onClick={() => {
          setProfilesError(false);
          toast({
            title: "Retrying",
            description: "Attempting to reload profiles",
          });
        }}
      >
        Try Again
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen animate-fade-in">
      <main className="container py-6 space-y-8 px-5">
        {/* Hero Section */}
        <div className="text-center space-y-3 pt-2">
          <h1 className="text-3xl md:text-4xl font-bold font-display tracking-tight">
            Discover <span className="text-gradient-pink">Profiles</span>
          </h1>
          <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
            Browse curated profiles matching your preferences. No account required.
          </p>

          {/* Active filters pill */}
          <div className="flex items-center justify-center gap-2 pt-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-pink-100 border border-pink-200 text-xs">
              <span className="text-primary font-medium capitalize">{selectedService}</span>
              <span className="text-muted-foreground">&middot;</span>
              <span className="text-primary font-medium">{selectedGender}</span>
            </div>
            <button
              onClick={() => setStep(1)}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2"
              type="button"
            >
              Change
            </button>
          </div>
        </div>

        {/* Search Form */}
        <div className="glass-card p-5 md:p-6">
          <div className="flex items-center gap-2 mb-4">
            <SlidersHorizontal className="w-4 h-4 text-primary" />
            <h2 className="text-sm font-semibold font-display text-foreground/80 uppercase tracking-wider">
              Refine Search
            </h2>
          </div>
          <SearchForm
            onSearch={(criteria) => {
              navigate('/search', {
                state: {
                  searchCriteria: {
                    ...criteria,
                    serviceType: selectedService,
                    gender: selectedGender
                  },
                  fromSearch: true
                },
                replace: true
              });
            }}
          />
        </div>

        {/* Featured Profiles */}
        <section className="space-y-5">
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
            <h2 className="text-sm font-semibold font-display text-muted-foreground uppercase tracking-wider whitespace-nowrap">
              Featured Profiles
            </h2>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
          </div>
          {selectedService && selectedGender && (
            profilesError ? (
              <ProfilesErrorFallback />
            ) : (
              <ErrorBoundary
                onError={() => setProfilesError(true)}
                fallback={<ProfilesErrorFallback />}
              >
                <RelatedProfiles
                  linkToProfiles
                  selectedService={selectedService}
                  selectedGender={selectedGender}
                />
              </ErrorBoundary>
            )
          )}
        </section>
      </main>
    </div>
  );
};

export default MainSearch;

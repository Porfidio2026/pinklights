
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SearchForm } from '@/components/SearchForm';
import { useProfileSearch } from '@/hooks/useProfileSearch';
import { SearchResultsCarousel } from '@/components/search/SearchResultsCarousel';

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const initialCriteria = location.state?.searchCriteria;
  
  const { searchResults, isLoading, setSearchCriteria } = useProfileSearch();
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  // Set initial search criteria when component mounts
  useEffect(() => {
    if (initialCriteria) {
      setSearchCriteria(initialCriteria);
    } else {
      navigate('/', { replace: true });
    }
  }, [initialCriteria, navigate, setSearchCriteria]);

  if (!initialCriteria) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Search Form overlay */}
      {isSearchExpanded && (
        <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm overflow-y-auto">
          <div className="container py-8 max-w-lg mx-auto">
            <SearchForm
              initialValues={initialCriteria}
              onSearch={(criteria) => {
                setSearchCriteria(criteria);
                setIsSearchExpanded(false);
              }}
            />
          </div>
        </div>
      )}

      {/* Search Results — full-bleed immersive cards */}
      <main className="container py-4">
        {isLoading ? (
          <div className="h-[75vh] md:h-[70vh] animate-pulse bg-muted rounded-2xl" />
        ) : (
          searchResults && searchResults.length > 0 ? (
            <SearchResultsCarousel
              profiles={searchResults}
              onChangeSearch={() => setIsSearchExpanded(true)}
            />
          ) : (
            <div className="h-[75vh] md:h-[70vh] flex items-center justify-center">
              <p className="text-muted-foreground">No profiles found matching your criteria.</p>
            </div>
          )
        )}
      </main>
    </div>
  );
};

export default SearchResults;

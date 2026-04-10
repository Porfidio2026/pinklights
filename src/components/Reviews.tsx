
import React from 'react';
import { Card } from './ui/card';
import { Star } from 'lucide-react';
import { format } from 'date-fns';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

interface ReviewsProps {
  profileId: string;
}

const fetchReviews = async (profileId: string) => {
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('profile_id', profileId)
    .order('date', { ascending: false });

  if (error) throw error;
  return data;
};

export const Reviews = ({ profileId }: ReviewsProps) => {
  const { data: reviews, isLoading } = useQuery({
    queryKey: ['reviews', profileId],
    queryFn: () => fetchReviews(profileId),
  });

  if (isLoading) return <div>Loading reviews...</div>;
  if (!reviews?.length) return <div>No reviews yet</div>;

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <Card key={review.id} className="p-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">{review.reviewer_name}</h3>
                <p className="text-sm text-muted-foreground">
                  {review.location} • {format(new Date(review.date), 'MMM d, yyyy')}
                </p>
              </div>
              <div className="flex items-center">
                {[...Array(review.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-primary text-primary"
                  />
                ))}
              </div>
            </div>
            <p className="text-muted-foreground">{review.text}</p>
          </div>
        </Card>
      ))}
    </div>
  );
};

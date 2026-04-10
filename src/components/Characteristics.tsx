
import React from 'react';
import { Card } from './ui/card';
import { User2, Heart, Star, Scale, Flower } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

interface CharacteristicsProps {
  profileId: string;
}

const fetchCharacteristics = async (profileId: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('hair_colour, breast_size, skin_tone, body_type, favorite_flower')
    .eq('id', profileId)
    .maybeSingle();

  if (error) throw error;
  return data;
};

export const Characteristics = ({ profileId }: CharacteristicsProps) => {
  const { data: characteristics, isLoading } = useQuery({
    queryKey: ['characteristics', profileId],
    queryFn: () => fetchCharacteristics(profileId),
  });

  if (isLoading) return <div>Loading characteristics...</div>;
  if (!characteristics) return null;

  const characteristicsList = [
    { icon: User2, label: 'Hair Colour', value: characteristics.hair_colour },
    { icon: Heart, label: 'Breast Size', value: characteristics.breast_size },
    { icon: Star, label: 'Skin Tone', value: characteristics.skin_tone },
    { icon: Scale, label: 'Body Type', value: characteristics.body_type },
    { icon: Flower, label: 'Favorite Flower', value: characteristics.favorite_flower },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {characteristicsList.map(({ icon: Icon, label, value }) => (
        <Card key={label} className="p-4 hover:bg-accent transition-colors">
          <div className="flex items-start space-x-4">
            <div className="p-2 rounded-full bg-accent">
              <Icon className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">{label}</h3>
              <p className="text-base font-medium">{value}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

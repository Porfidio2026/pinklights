
import React from 'react';
import { Card } from '@/components/ui/card';
import { ProfilePictures } from '@/components/profile/ProfilePictures';
import { DistanceInfo } from '@/components/profile/DistanceInfo';
import { Characteristics } from '@/components/Characteristics';
import { AboutMe } from '@/components/profile/AboutMe';
import { ContactButton } from '@/components/profile/ContactButton';
import { ReportButton } from '@/components/moderation/ReportButton';
import { Reviews } from '@/components/Reviews';
import { RelatedProfiles } from '@/components/RelatedProfiles';

interface ProfilePicture {
  id: string;
  picture_url: string;
  display_order: number;
}

interface ProfileContentProps {
  profile: {
    id: string;
    full_name: string;
    latitude?: number;
    longitude?: number;
    location?: string;
    about_me?: string;
    phone_number?: string;
    profile_picture_url?: string;
    pictures: ProfilePicture[];
  };
}

export const ProfileContent = ({ profile }: ProfileContentProps) => {
  const defaultPicture = 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&auto=format&fit=crop&q=60';

  return (
    <main className="container max-w-4xl py-8">
      <div className="flex flex-col gap-8">
        <div className="w-full aspect-square max-w-2xl mx-auto overflow-hidden">
          <ProfilePictures
            pictures={profile.pictures}
            profileName={profile.full_name}
            defaultPictureUrl={defaultPicture}
            mainPictureUrl={profile.profile_picture_url}
          />
        </div>

        <DistanceInfo
          profileId={profile.id}
          profileLatitude={profile.latitude}
          profileLongitude={profile.longitude}
          profileLocation={profile.location}
        />

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-center">Characteristics</h2>
          <Card className="p-6">
            <Characteristics profileId={profile.id} />
          </Card>
        </section>

        <AboutMe content={profile.about_me} />

        <ContactButton phoneNumber={profile.phone_number} profileName={profile.full_name} />

        <div className="flex justify-center">
          <ReportButton profileId={profile.id} />
        </div>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-center">Reviews</h2>
          <Reviews profileId={profile.id} />
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-center">Similar Profiles</h2>
          <RelatedProfiles currentProfileId={profile.id} linkToProfiles />
        </section>
      </div>
    </main>
  );
};

import React from 'react';
import { CityLandingTemplate } from '@/components/seo/CityLandingTemplate';

const AntwerpPage = () => {
  return (
    <CityLandingTemplate
      cityName="Antwerp"
      slug="antwerp"
      metaTitle="Meet Companions in Antwerp | Pinklights.be"
      metaDescription="Connect with premium companions in Antwerp. Discover discreet meetups near the fashion district, Eilandje, and the city's vibrant nightlife scene."
      heroHeadline="Meet Someone Special in Antwerp"
      heroSubtext="Belgium's fashion capital offers the perfect backdrop for unforgettable encounters, from waterfront cocktails at the Eilandje to intimate dinners in the historic centre."
      sections={[
        {
          heading: 'Why Antwerp Is Belgium\'s Most Magnetic City',
          text: 'Antwerp has always attracted people who appreciate the finer things. As Belgium\'s second-largest city, it pulses with a creative energy that sets it apart from anywhere else in the country. The fashion district around the ModeNatie draws style-conscious visitors from across Europe, while the diamond quarter adds an unmistakable air of luxury to the city centre. Whether you\'re a local professional looking to meet someone new or a visitor hoping to experience the city with engaging company, Antwerp delivers an atmosphere where connections feel natural and effortless. The city\'s compact walkability means a spontaneous evening can flow from gallery openings in the Zuid to rooftop bars overlooking the Scheldt, all within minutes.',
        },
        {
          heading: 'The Best Neighbourhoods for a Memorable Evening',
          text: 'The Eilandje, Antwerp\'s revitalised harbour district, has transformed into one of Belgium\'s most sought-after evening destinations. The MAS museum glows against the water at night, and the surrounding terraces fill with well-dressed crowds as the sun sets. For something more bohemian, Zurenborg\'s art nouveau streets offer intimate wine bars and bistros where conversation flows as easily as the drinks. The historic centre around the Grote Markt and Groenplaats remains a classic choice for dinner, with cathedral views providing a dramatic backdrop. And for those who prefer a livelier scene, the bars along the Ossenmarkt and Kloosterstraat keep Antwerp\'s reputation for exceptional nightlife fully intact.',
        },
        {
          heading: 'A City That Values Discretion and Style',
          text: 'Antwerp\'s culture prizes individuality and understated elegance. The city that produced Dries Van Noten and the Antwerp Six understands that real style is about confidence, not flash. This sensibility extends to how people connect here, with sophistication and mutual respect. Pinklights.be reflects that same ethos: a platform designed for people who value quality encounters in a city that rewards good taste. Whether you\'re meeting at a Michelin-starred restaurant in the Sint-Andries quarter or sharing a sunset walk along the Left Bank, Antwerp provides settings that elevate every interaction.',
        },
        {
          heading: 'Connecting in Antwerp Through Pinklights.be',
          text: 'Navigating a new city, or rediscovering your own, is always better with the right company. Pinklights.be makes it straightforward to connect with verified companions in Antwerp who know the city\'s hidden gems and share your appetite for memorable experiences. Our platform prioritises privacy and authenticity, ensuring that every introduction leads to a genuine encounter. From business travellers spending a few nights near the Central Station to residents seeking fresh connections in their own backyard, Pinklights.be bridges the gap between curiosity and a truly enjoyable evening in one of Europe\'s most underrated cities.',
        },
      ]}
      faqItems={[
        {
          question: 'What areas of Antwerp are best for meeting someone?',
          answer: 'The Eilandje waterfront, the Zuid neighbourhood near FOMU and M HKA, and the historic centre around the Grote Markt are all excellent areas. Each offers a mix of upscale dining, atmospheric bars, and walkable streets perfect for an evening together.',
        },
        {
          question: 'Is Antwerp easy to reach for visitors?',
          answer: 'Very. Antwerp-Central station is one of Europe\'s most beautiful train stations with direct connections to Brussels (35 min), Amsterdam, and Paris. Brussels Airport is about 45 minutes away, and the city is easily accessible by car from the Netherlands and Germany.',
        },
        {
          question: 'How does Pinklights.be ensure discretion in Antwerp?',
          answer: 'Privacy is fundamental to our platform. Profiles are verified but communication stays within the platform until both parties choose otherwise. We never share user data and our design prioritises your confidentiality at every step.',
        },
        {
          question: 'What makes Antwerp different from Brussels for meeting people?',
          answer: 'Antwerp has a more intimate, design-forward atmosphere compared to Brussels\' international bustle. The city is more compact, making it easier to plan spontaneous evenings, and its creative culture lends itself to more relaxed, authentic connections.',
        },
        {
          question: 'Are there good hotels in Antwerp for visitors?',
          answer: 'Antwerp offers excellent accommodation ranging from boutique hotels in renovated historic buildings to luxury options near the Central Station and waterfront. The city\'s compact size means most hotels are within walking distance of the best dining and nightlife.',
        },
      ]}
      relatedCities={[
        {
          title: 'Brussels',
          description: 'Belgium\'s cosmopolitan capital with international flair and endless possibilities.',
          url: '/seo/cities/Brussels',
        },
        {
          title: 'Ghent',
          description: 'A youthful university city blending medieval charm with a vibrant social scene.',
          url: '/seo/cities/Ghent',
        },
        {
          title: 'Leuven',
          description: 'A lively student town with the longest bar street in Belgium and refined culture.',
          url: '/seo/cities/Leuven',
        },
      ]}
    />
  );
};

export default AntwerpPage;

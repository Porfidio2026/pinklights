import React from 'react';
import { CityLandingTemplate } from '@/components/seo/CityLandingTemplate';

const BrugesPage = () => {
  return (
    <CityLandingTemplate
      cityName="Bruges"
      slug="bruges"
      metaTitle="Meet Companions in Bruges | Pinklights.be"
      metaDescription="Find premium companions in Bruges. Discover discreet connections in Belgium's most romantic city — canal-side walks, fine dining, and intimate evenings."
      heroHeadline="Meet Someone Special in Bruges"
      heroSubtext="Belgium's most romantic city was made for meaningful encounters — candlelit restaurants, moonlit canals, and an atmosphere that turns any evening into something extraordinary."
      sections={[
        {
          heading: 'Bruges: Romance Written into Every Stone',
          text: 'There may be no city in Northern Europe more naturally suited to a memorable encounter than Bruges. The entire medieval centre is a UNESCO World Heritage Site, and walking its cobblestone streets after dark feels like stepping into a painting. Gas lamps flicker along the canals, horse-drawn carriages clip through the Markt square, and the Belfry tower presides over it all with a timeless authority. Bruges draws millions of visitors each year, but by evening the day-trippers have departed and the city reveals its more intimate character. This is when Bruges truly comes alive for those seeking connection — when the crowds thin and the candlelit restaurants along the Dijver canal fill with couples and companions settling in for long, unhurried evenings.',
        },
        {
          heading: 'Where to Spend an Unforgettable Evening',
          text: 'The area around the Rozenhoedkaai — often called the most photographed spot in Bruges — is equally stunning after sunset, when the medieval buildings reflect in the still canal water. Dinner in one of the restaurants near the Burg square offers a chance to savour West Flemish cuisine in settings that range from Michelin-quality to charmingly rustic. For drinks, the wine bars tucked into side streets off the Steenstraat offer privacy and atmosphere in equal measure. The neighbourhood around Sint-Anna, slightly removed from the tourist centre, rewards exploration with quieter bistros and a more local feel. And for chocolate lovers, an afternoon tasting at one of the city\'s renowned chocolatiers is a uniquely Bruges way to begin an encounter.',
        },
        {
          heading: 'Beyond the Tourist Surface',
          text: 'Visitors often arrive in Bruges expecting a museum piece and discover instead a living city with genuine character. The Concertgebouw brings world-class performances to the city\'s contemporary cultural scene. The brewery De Halve Maan still operates in the city centre, complete with an underground beer pipeline — a conversation starter unlike any other. The Beguinage and Minnewater Park offer tranquil afternoon walks far removed from the busier squares. Locals who live and work in Bruges appreciate its quality of life — the manageable pace, the beauty embedded in daily routines, the ease of a city you can cross on foot in twenty minutes. Meeting someone who can share these quieter sides of Bruges transforms a tourist visit into something genuinely personal.',
        },
      ]}
      faqItems={[
        {
          question: 'Is Bruges too touristy for discreet encounters?',
          answer: 'Not at all. While the Markt square can be crowded during the day, Bruges transforms in the evening. Most tourists leave by late afternoon, and the city becomes surprisingly intimate. The quieter neighbourhoods around Sint-Anna and the south side offer genuine privacy.',
        },
        {
          question: 'What is the best time of year to visit Bruges?',
          answer: 'Every season has its appeal. Spring and early summer offer canal-side terraces and long evenings. Autumn brings atmospheric mist over the waterways. Winter is magical with the Christmas market on the Markt and ice skating on the Minnewater.',
        },
        {
          question: 'How do I get to Bruges?',
          answer: 'Bruges is well connected by rail — about one hour from Brussels, 25 minutes from Ghent, and two hours from Antwerp. The compact city centre is entirely walkable, and the train station is a 15-minute walk from the Markt square.',
        },
        {
          question: 'Are there good accommodation options in Bruges?',
          answer: 'Bruges excels in boutique and heritage accommodation. Many hotels occupy restored medieval buildings with canal views. Options range from intimate B&Bs in the centre to luxury hotels near the Burg. Booking ahead is advisable during peak season and holidays.',
        },
        {
          question: 'Can I meet companions who know Bruges well?',
          answer: 'Yes. Pinklights.be features verified local companions in Bruges who can share the city\'s hidden gems — from quiet terraces tourists never find to the best restaurant tables with canal views. A local perspective transforms the Bruges experience.',
        },
      ]}
      relatedCities={[
        {
          title: 'Ghent',
          description: 'Just 25 minutes away — a youthful university city with vibrant nightlife and culture.',
          url: '/seo/cities/Ghent',
        },
        {
          title: 'Antwerp',
          description: 'Belgium\'s stylish second city with a fashion-forward edge and waterfront dining.',
          url: '/seo/cities/Antwerp',
        },
        {
          title: 'Brussels',
          description: 'The capital\'s international scene offers a completely different energy and endless options.',
          url: '/seo/cities/Brussels',
        },
      ]}
    />
  );
};

export default BrugesPage;

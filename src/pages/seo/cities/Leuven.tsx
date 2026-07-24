import React from 'react';
import { CityLandingTemplate } from '@/components/seo/CityLandingTemplate';

const LeuvenPage = () => {
  return (
    <CityLandingTemplate
      cityName="Leuven"
      slug="leuven"
      metaTitle="Meet Companions in Leuven | Pinklights.be"
      metaDescription="Connect with companions in Leuven. Discover Belgium's university city with its famous Oude Markt, beer culture, and intimate social atmosphere."
      heroHeadline="Meet Someone New in Leuven"
      heroSubtext="Belgium's premier university city combines intellectual energy with one of Europe's liveliest squares — a city where connections spark easily and evenings never end too soon."
      sections={[
        {
          heading: 'Leuven: Small City, Big Personality',
          text: 'Leuven punches far above its weight. Home to KU Leuven — consistently ranked among Europe\'s top universities and one of the oldest in the world — this compact Flemish city radiates an intellectual vitality that shapes everything from its conversation culture to its dining scene. But Leuven is far from purely academic. The city is the birthplace of AB InBev, the world\'s largest brewing company, and beer culture runs deep here. The Oude Markt — often called the longest bar in Europe — is lined on every side with terraces that fill with a diverse mix of students, researchers, young professionals, and visitors. It is a city built for meeting people, and Pinklights.be makes those meetings intentional and refined.',
        },
        {
          heading: 'The Oude Markt and Beyond',
          text: 'The Oude Markt is Leuven\'s beating heart, but the city offers much more than its most famous square. The Groot Begijnhof — a UNESCO World Heritage Site — is a tranquil enclave of brick houses and winding paths, ideal for a quiet afternoon walk with someone you are getting to know. The Vaartkom, a redeveloped industrial harbour area, has become Leuven\'s most exciting new neighbourhood, home to contemporary restaurants, design studios, and the striking OPEK cultural centre. For dinner, the streets between the Grote Markt and the university library hide excellent restaurants ranging from classic Flemish to contemporary fusion. And Leuven\'s size is a genuine advantage: nothing is more than a fifteen-minute walk, which means an evening can unfold spontaneously without logistical friction.',
        },
        {
          heading: 'Young, Educated, and Socially Open',
          text: 'With around a third of its population connected to the university, Leuven has an unusually young and well-educated demographic. This creates a social culture that values curiosity, open-mindedness, and good conversation. The city also attracts a significant international contingent — exchange students, visiting researchers, tech professionals drawn by Leuven\'s growing innovation hub around the Arenberg campus and the IMEC research centre. English is widely spoken, and the city\'s compact social scene means that it is easy to encounter familiar faces and build connections over time. For professionals based in nearby Brussels, Leuven offers a refreshing change of pace — close enough for a weeknight dinner, different enough to feel like an escape.',
        },
        {
          heading: 'Discover Leuven Connections on Pinklights.be',
          text: 'Leuven\'s intimate scale makes it a city where trust and reputation matter. Pinklights.be understands this — our verification process and privacy protections are designed for people who value discretion in close-knit communities. Whether you are looking for a companion to explore Leuven\'s celebrated beer bars, share a meal overlooking the Gothic town hall, or simply enjoy an engaging evening with someone new, our platform connects you with verified individuals who appreciate the same quality of encounter. In Leuven, where every street seems to lead to a pleasant surprise, Pinklights.be helps you find the best one.',
        },
      ]}
      faqItems={[
        {
          question: 'Is Leuven only a student city?',
          answer: 'Not at all. While the university is central to Leuven\'s identity, the city has a thriving professional community, a growing tech sector, and a cultural life that appeals to all ages. The Vaartkom neighbourhood and the Grote Markt cater to a more mature crowd.',
        },
        {
          question: 'How close is Leuven to Brussels?',
          answer: 'Leuven is just 25 minutes from Brussels by train, with frequent connections throughout the day and evening. This proximity makes it easy to combine both cities in a single trip or to meet someone from Brussels for an evening in Leuven.',
        },
        {
          question: 'What is the Oude Markt like?',
          answer: 'The Oude Markt is a large rectangular square surrounded entirely by bars and restaurants with outdoor terraces. It is lively most evenings and particularly vibrant on weekends. The atmosphere is social and relaxed — ideal for a casual first meeting.',
        },
        {
          question: 'Is Leuven known for beer?',
          answer: 'Absolutely. Leuven is the global headquarters of AB InBev and has a deep brewing heritage. Beyond the big brands, the city and surrounding region are home to craft breweries and traditional abbey beers. A brewery visit or beer tasting makes for an excellent shared experience.',
        },
        {
          question: 'How discreet is Pinklights.be in a smaller city like Leuven?',
          answer: 'Discretion is a core feature of our platform regardless of city size. Profiles are only visible to verified users, communication is encrypted, and we never share identifying information. In Leuven\'s close-knit community, these protections are especially valued.',
        },
      ]}
      relatedCities={[
        {
          title: 'Brussels',
          description: 'The cosmopolitan capital just 25 minutes away with an international social scene.',
          url: '/seo/cities/Brussels',
        },
        {
          title: 'Antwerp',
          description: 'Belgium\'s second city offers a fashion-forward atmosphere and waterfront nightlife.',
          url: '/seo/cities/Antwerp',
        },
        {
          title: 'Ghent',
          description: 'A fellow university city with medieval charm and one of Belgium\'s best cultural scenes.',
          url: '/seo/cities/Ghent',
        },
      ]}
    />
  );
};

export default LeuvenPage;

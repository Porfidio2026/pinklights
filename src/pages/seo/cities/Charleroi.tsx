import React from 'react';
import { CityLandingTemplate } from '@/components/seo/CityLandingTemplate';

const CharleroiPage = () => {
  return (
    <CityLandingTemplate
      cityName="Charleroi"
      slug="charleroi"
      metaTitle="Meet Companions in Charleroi | Pinklights.be"
      metaDescription="Discover companions in Charleroi. Connect discreetly in Wallonia's largest city, an evolving destination with an airport hub and authentic local character."
      heroHeadline="Connect with Companions in Charleroi"
      heroSubtext="Wallonia's largest city is shedding its industrial past and emerging as an authentic, affordable destination where real connections happen without pretence."
      sections={[
        {
          heading: 'Charleroi: A City in Transformation',
          text: 'Charleroi is not trying to be Brussels, and that is precisely its appeal. As Wallonia\'s largest city, it has spent the past decade in a remarkable process of reinvention. The former industrial capital, built on coal and steel, is finding new purpose through urban renewal, street art, and a cultural scene that prizes authenticity over polish. The renovated Place Charles II now anchors a city centre that feels genuinely renewed, with contemporary cafés and restaurants filling spaces that once stood empty. The BPS22 art centre, housed in a converted industrial building, has become one of Wallonia\'s most respected contemporary art spaces. For visitors who arrive through Brussels South Charleroi Airport, one of Belgium\'s busiest, Charleroi increasingly offers reasons to stay rather than simply pass through.',
        },
        {
          heading: 'Where to Meet in Charleroi',
          text: 'The upper town around Place Charles II has become the focal point for dining and evening outings. The recently redeveloped Rive Gauche district offers a modern counterpoint, with shopping and restaurants that cater to a growing professional community. Along the Sambre river, the quays are gradually transforming into pleasant walking and dining areas that hint at the waterfront culture other Belgian cities already enjoy. For a more local experience, the neighbourhood brasseries, serving generous Walloon cuisine with Belgian beers, provide the kind of unpretentious warmth that makes conversation flow naturally. Charleroi does not try to impress with glamour; instead, it offers a straightforwardness that many people find refreshing after the more performative atmospheres of larger cities.',
        },
        {
          heading: 'The Airport Advantage',
          text: 'Brussels South Charleroi Airport has made the city a gateway for millions of European travellers each year. Budget airlines connect Charleroi to dozens of destinations across the continent, bringing a steady stream of visitors who might otherwise never discover this part of Belgium. For travellers with an overnight stay between flights, or business visitors attending meetings in the broader Hainaut region, Charleroi offers a chance to experience an authentic slice of Walloon life. The city\'s accommodation options range from modern chain hotels near the airport to characterful options in the city centre, all at prices significantly below what you would pay in Brussels or the Flemish cities.',
        },
        {
          heading: 'Pinklights.be in Charleroi: Genuine Connections',
          text: 'Charleroi\'s evolving character attracts people who value substance. Pinklights.be serves this community by providing a secure, verified platform for meeting companions who share that sensibility. Whether you are a local exploring new social possibilities or a visitor looking for company during a stopover, our platform makes it simple to connect with real people in a city that does not do fake. Privacy and verification are standard features, ensuring that every encounter begins on a foundation of trust. Charleroi may not have the international profile of Antwerp or Brussels, but connections made here carry a directness and warmth that larger cities often lack.',
        },
      ]}
      faqItems={[
        {
          question: 'Is Charleroi worth visiting beyond the airport?',
          answer: 'Increasingly, yes. The city centre has undergone significant renewal with new restaurants, cultural spaces like BPS22, and an improving public realm. It offers an authentic Walloon experience at very accessible prices, a genuine alternative to the more touristed Belgian cities.',
        },
        {
          question: 'How far is Charleroi Airport from the city centre?',
          answer: 'Brussels South Charleroi Airport is about 7 kilometres from the city centre, easily reached by bus in 20 minutes or by taxi in about 15 minutes. The connection is straightforward and inexpensive.',
        },
        {
          question: 'What language is spoken in Charleroi?',
          answer: 'French is the primary language. While English is less universally spoken than in Flemish cities or Brussels, the hospitality industry and younger population increasingly speak English. Pinklights.be companion profiles indicate language abilities to help you find a match.',
        },
        {
          question: 'Is Charleroi affordable for dining and going out?',
          answer: 'Very much so. Dining, drinks, and accommodation in Charleroi are among the most affordable in Belgium. You can enjoy excellent Walloon cuisine and quality wines at prices that would be unthinkable in Brussels or Antwerp.',
        },
        {
          question: 'How does Pinklights.be work in smaller cities like Charleroi?',
          answer: 'Our platform functions the same way in every Belgian city. You browse verified profiles, communicate through our secure system, and arrange meetings at your own pace. In Charleroi, you benefit from genuine local connections in a city where people value authenticity.',
        },
      ]}
      relatedCities={[
        {
          title: 'Namur',
          description: 'The picturesque capital of Wallonia with a historic citadel and refined dining along the Meuse.',
          url: '/seo/cities/Namur',
        },
        {
          title: 'Liège',
          description: 'Wallonia\'s Ardent City with the legendary Carré nightlife district and cross-border energy.',
          url: '/seo/cities/Liege',
        },
        {
          title: 'Brussels',
          description: 'Belgium\'s international capital with a multilingual social scene just an hour away by train.',
          url: '/seo/cities/Brussels',
        },
      ]}
    />
  );
};

export default CharleroiPage;

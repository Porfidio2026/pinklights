import React from 'react';
import { CityLandingTemplate } from '@/components/seo/CityLandingTemplate';

const GhentPage = () => {
  return (
    <CityLandingTemplate
      cityName="Ghent"
      slug="ghent"
      metaTitle="Meet Companions in Ghent | Pinklights.be"
      metaDescription="Connect with companions in Ghent. Explore discreet encounters in Belgium's most vibrant university city, from Patershol to the Graslei waterfront."
      heroHeadline="Discover Connections in Ghent"
      heroSubtext="Belgium's best-kept secret blends medieval grandeur with youthful energy — the perfect city for spontaneous, authentic encounters."
      sections={[
        {
          heading: 'Ghent: Where History Meets a Young, Open Spirit',
          text: 'Ghent occupies a unique position in Belgium\'s cultural landscape. It has the architectural splendour of Bruges without the tourist crowds, the creative ambition of Antwerp without the fashion-industry pretension, and a social warmth that even Brussels struggles to match. With Ghent University bringing tens of thousands of students into the city, the energy here skews young and open-minded. But Ghent is far more than a student town — it is a serious cultural player, home to the Ghent Altarpiece, the annual Gentse Feesten (one of Europe\'s largest street festivals), and a food scene that consistently punches above its weight. For anyone looking to meet someone in a city where the atmosphere practically does the work for you, Ghent is an extraordinary choice.',
        },
        {
          heading: 'Evening Destinations That Set the Mood',
          text: 'Start along the Graslei and Korenlei — the twin medieval quays whose reflections shimmer in the Leie river after dark. In summer, locals and visitors line the waterfront steps with drinks, creating one of Belgium\'s most naturally social settings. For dinner, Patershol is unmatched: a labyrinth of cobblestone alleys tucked behind the Castle of the Counts, hiding some of the city\'s finest restaurants in centuries-old townhouses. The Overpoort strip delivers a completely different energy — louder, younger, and unapologetically fun. For a more refined late evening, the cocktail bars in the Kouter and Veldstraat area attract professionals and creatives who prefer conversation over volume. Ghent\'s scale means you can move between these worlds in a fifteen-minute walk.',
        },
        {
          heading: 'A Culture of Warmth and Authenticity',
          text: 'Ghentenaars are famously welcoming. There is a directness to the Flemish character here that cuts through social awkwardness — people say what they mean and appreciate the same in return. The city also holds the distinction of being Europe\'s vegetarian capital, reflecting a progressive, thoughtful community that values substance over appearances. This down-to-earth sensibility makes Ghent an ideal city for genuine connections. People here are interested in who you are, not what you do or where you are from. Pinklights.be aligns naturally with this ethos — our platform is designed for authentic introductions, not superficial swiping, and Ghent\'s culture rewards exactly that kind of intentionality.',
        },
        {
          heading: 'Meeting People in Ghent with Pinklights.be',
          text: 'Whether you are a student, a young professional, or a visitor drawn by Ghent\'s growing reputation, Pinklights.be offers a refined way to expand your social horizons in this city. Our verified profiles ensure that every connection begins with trust, and our communication tools let you plan an evening that suits both your style and your schedule. Ghent rewards spontaneity — a drink along the Graslei can turn into dinner in Patershol, which might lead to a moonlit walk past the illuminated Saint Bavo\'s Cathedral. With Pinklights.be, you simply need to take the first step. The city handles the rest.',
        },
      ]}
      faqItems={[
        {
          question: 'What makes Ghent a good city for meeting companions?',
          answer: 'Ghent\'s combination of intimate scale, youthful energy, and beautiful settings creates an ideal atmosphere. The city is walkable, socially open, and offers varied nightlife from quiet wine bars to lively terraces — perfect for any kind of encounter.',
        },
        {
          question: 'Is Ghent only active during the university term?',
          answer: 'While the student population adds energy during term time, Ghent is vibrant year-round. The Gentse Feesten in July, the Film Fest in October, and a thriving local creative community keep the city lively regardless of the academic calendar.',
        },
        {
          question: 'How easy is it to get to Ghent?',
          answer: 'Ghent-Sint-Pieters station has direct trains to Brussels (30 min), Antwerp (50 min), and Bruges (25 min). Brussels Airport is under an hour away by train. The city centre is compact and best explored on foot or by tram.',
        },
        {
          question: 'What is the Overpoort and is it a good place to meet people?',
          answer: 'The Overpoort is Ghent\'s famous nightlife strip near the university, lined with bars and clubs. It is lively and social but skews very young. For a more mature atmosphere, Patershol, the Kouter area, and the waterfront bars are better suited.',
        },
        {
          question: 'Does Pinklights.be have many users in Ghent?',
          answer: 'Ghent is one of our most active cities in Belgium. The combination of a young, open-minded population and a steady stream of cultural visitors means there is always a diverse range of companions available on the platform.',
        },
      ]}
      relatedCities={[
        {
          title: 'Antwerp',
          description: 'Belgium\'s fashion-forward port city with world-class nightlife and dining.',
          url: '/seo/cities/Antwerp',
        },
        {
          title: 'Brussels',
          description: 'The cosmopolitan capital with an international social scene unlike anywhere else.',
          url: '/seo/cities/Brussels',
        },
        {
          title: 'Bruges',
          description: 'A romantic UNESCO city where fairy-tale canals set the scene for special evenings.',
          url: '/seo/cities/Bruges',
        },
      ]}
    />
  );
};

export default GhentPage;

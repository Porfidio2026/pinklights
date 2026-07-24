import React from 'react';
import { CityLandingTemplate } from '@/components/seo/CityLandingTemplate';

const LiegePage = () => {
  return (
    <CityLandingTemplate
      cityName="Liège"
      slug="liege"
      metaTitle="Meet Companions in Liège | Pinklights.be"
      metaDescription="Connect with companions in Liège. Discover the vibrant Carré district, riverside dining, and Wallonia's most sociable city on Pinklights.be."
      heroHeadline="Find Connections in Liège"
      heroSubtext="Wallonia's most spirited city combines French-speaking warmth with a nightlife scene that rivals cities twice its size — the Carré district alone holds more bars per square metre than anywhere in Belgium."
      sections={[
        {
          heading: 'Liège: The Ardent City',
          text: 'Liège has earned its nickname — La Cité Ardente, the Ardent City — through centuries of fierce independence and passionate living. Situated at the crossroads of Belgium, Germany, and the Netherlands, Liège has always been a place where cultures collide and mingle. The city speaks French with a distinctive Walloon inflection and carries itself with a warmth and directness that visitors find instantly disarming. Unlike the more reserved Flemish cities, Liège wears its heart on its sleeve. Conversations start easily in this city, strangers share tables at busy brasseries without a second thought, and the boundary between acquaintance and friend dissolves faster than anywhere else in Belgium. For those seeking genuine human connection, Liège\'s natural sociability is a powerful asset.',
        },
        {
          heading: 'The Carré: Belgium\'s Most Concentrated Nightlife',
          text: 'The Carré district is legendary among those who know Belgian nightlife. Squeezed into a tight grid of pedestrian streets between the Place du Marché and the Place Saint-Lambert, it packs an astonishing density of bars, pubs, cocktail lounges, and restaurants into a walkable quarter that never sleeps — at least not on weekends. From craft beer bars pouring local Walloon ales to sleek cocktail spots with exposed brick and dim lighting, the Carré offers every possible mood. What makes it particularly appealing for meeting someone is the neighbourhood\'s organic flow: you can start with an apéro at a terrace on Rue du Pot d\'Or, move to dinner at one of the restaurants along Rue de la Casquette, and end the evening at a jazz bar — all without ever needing a taxi.',
        },
        {
          heading: 'A Cross-Border City with European Flair',
          text: 'Liège\'s position near the German and Dutch borders gives it a distinctly European character. Aachen is barely forty minutes away, and Maastricht is even closer. This proximity brings a steady flow of cross-border visitors — professionals, travellers, and adventure-seekers who find in Liège a French-speaking city with a cosmopolitan edge and prices that remain refreshingly reasonable compared to Brussels or Luxembourg. The Guillemins railway station, designed by Santiago Calatrava, has become a landmark in its own right and serves as a gateway for visitors arriving from across the region. The Meuse river, winding through the city centre, adds a scenic dimension that makes riverside walks and waterfront dining natural choices for a first encounter.',
        },
        {
          heading: 'Connecting Discreetly in Liège with Pinklights.be',
          text: 'Liège rewards those who approach it with curiosity and openness. Pinklights.be provides a secure, private platform to connect with companions who embody the city\'s famous warmth. Our verification process ensures authenticity, while our privacy features protect your identity until you are ready to meet. Whether you are visiting from across the border or you call Liège home, the platform makes it simple to find someone who matches your interests and your pace. In a city where socialising comes naturally, Pinklights.be simply helps you start the conversation with the right person.',
        },
      ]}
      faqItems={[
        {
          question: 'What is the Carré district and why is it popular?',
          answer: 'The Carré is a compact pedestrianised area in central Liège famous for its extraordinary concentration of bars and restaurants. On weekend evenings it becomes one of the liveliest spots in all of Belgium, attracting locals and visitors from across the region.',
        },
        {
          question: 'Is Liège welcoming to non-French speakers?',
          answer: 'While French is the dominant language, Liège is accustomed to visitors from neighbouring Germany and the Netherlands. Many people in the hospitality sector speak English, and the city\'s friendly culture makes communication easy regardless of language barriers.',
        },
        {
          question: 'How far is Liège from other major cities?',
          answer: 'Liège is about one hour from Brussels by train, 40 minutes from Aachen (Germany), and 30 minutes from Maastricht (Netherlands). This cross-border position makes it easily accessible from multiple countries.',
        },
        {
          question: 'What are good areas in Liège beyond the Carré?',
          answer: 'The Outremeuse quarter across the Meuse has a bohemian character with local bistros and the spirit of the folklore hero Tchantchès. The Guillemins area near the station offers more modern dining options, and the hilltop Cointe neighbourhood provides panoramic views of the city.',
        },
        {
          question: 'Is Liège affordable compared to other Belgian cities?',
          answer: 'Yes. Dining, drinks, and accommodation in Liège tend to be noticeably more affordable than in Brussels, Antwerp, or Ghent. This makes it possible to enjoy premium experiences — fine restaurants, boutique hotels — at a fraction of what you might expect.',
        },
      ]}
      relatedCities={[
        {
          title: 'Namur',
          description: 'The elegant capital of Wallonia with a charming citadel and riverside atmosphere.',
          url: '/seo/cities/Namur',
        },
        {
          title: 'Charleroi',
          description: 'Wallonia\'s largest city with an evolving cultural scene and accessible airport.',
          url: '/seo/cities/Charleroi',
        },
        {
          title: 'Brussels',
          description: 'Belgium\'s international capital with a multilingual social scene and endless variety.',
          url: '/seo/cities/Brussels',
        },
      ]}
    />
  );
};

export default LiegePage;

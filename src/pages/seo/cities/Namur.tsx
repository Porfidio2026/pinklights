import React from 'react';
import { CityLandingTemplate } from '@/components/seo/CityLandingTemplate';

const NamurPage = () => {
  return (
    <CityLandingTemplate
      cityName="Namur"
      slug="namur"
      metaTitle="Meet Companions in Namur | Pinklights.be"
      metaDescription="Connect with companions in Namur. Discover discreet encounters in Wallonia's elegant capital: riverside dining, the historic citadel, and refined charm."
      heroHeadline="Discover Companions in Namur"
      heroSubtext="The capital of Wallonia offers an understated elegance that larger cities cannot replicate. Where the Meuse and Sambre rivers meet, meaningful encounters follow naturally."
      sections={[
        {
          heading: 'Namur: Wallonia\'s Quietly Elegant Capital',
          text: 'Namur is a city that reveals itself slowly, and rewards those who take the time to look. As the capital of the Walloon Region and the Wallonia-Brussels Federation, it carries administrative importance, yet it feels nothing like a bureaucratic centre. Instead, Namur exudes a refined, unhurried charm that reflects the character of the region it represents. Perched at the confluence of the Meuse and Sambre rivers, the city is dominated by its magnificent Citadel, one of the most impressive fortifications in Europe, which looks down over terracotta rooftops and tree-lined quays. The population is modest enough that the city retains a human scale, where walking along the river or through the old town feels genuinely peaceful, yet large enough to sustain a sophisticated dining and cultural scene that makes for memorable evenings.',
        },
        {
          heading: 'Riverside Dining and the Old Town',
          text: 'Namur\'s greatest asset for an evening out is its relationship with water. The Meuse river curves gracefully through the city, and the quays along its banks have become the natural setting for restaurants, terraces, and evening promenades. In warmer months, the riverside terraces fill with locals enjoying apéros as the light softens over the water, a setting that is naturally romantic without being contrived. The pedestrianised old town, centred around the Rue de Fer and the Place d\'Armes, offers a compact but genuine selection of restaurants, wine bars, and brasseries. The food here leans Walloon: think game dishes in autumn, mussels prepared with local beer, and patisserie that holds its own against anything in Brussels. For a special occasion, dinner at one of the restaurants near the Citadel provides panoramic views that transform a meal into an event.',
        },
        {
          heading: 'A City That Values Discretion',
          text: 'One of Namur\'s defining qualities is its discretion. This is not a city of loud nightclubs or see-and-be-seen culture. Social life here is conducted at a lower volume: intimate dinners, quiet wine bars, afternoon walks along the river or up through the Citadel grounds. This atmosphere makes Namur exceptionally well-suited for those who prioritise privacy in their social encounters. The city\'s manageable size means you can choose settings that offer genuine seclusion without feeling isolated. Whether it is a corner table at a family-run restaurant in the old town or a sunset walk along the Meuse with the Citadel silhouetted above, Namur provides environments where connection can develop at its own pace, away from the noise and scrutiny of larger cities.',
        },
        {
          heading: 'Using Pinklights.be in Namur',
          text: 'Pinklights.be aligns naturally with Namur\'s sensibility. Our platform is designed for people who approach connection with intention and who value quality over quantity. In Namur, where the social scene favours depth over breadth, this means every introduction through Pinklights.be carries real potential. Our verified profiles give you confidence in who you are meeting, and our privacy features ensure that your personal life remains exactly that, personal. Whether you live in Namur, work in the regional government, or are visiting to explore the Ardennes gateway that this city provides, Pinklights.be offers a respectful, efficient way to meet someone who appreciates the same things you do about this graceful Walloon capital.',
        },
      ]}
      faqItems={[
        {
          question: 'What makes Namur different from other Belgian cities for meeting people?',
          answer: 'Namur offers an intimate, unhurried atmosphere that larger cities lack. Its smaller scale, riverside setting, and emphasis on quality over spectacle create conditions where genuine connections develop more naturally. It is ideal for those who prefer discretion and depth.',
        },
        {
          question: 'Is Namur easy to reach?',
          answer: 'Yes. Namur station has direct trains to Brussels (about one hour), Liège (50 minutes), and Charleroi (30 minutes). The city is also a gateway to the Ardennes region, making it a natural stop for travellers exploring southern Belgium.',
        },
        {
          question: 'What is the Citadel and is it worth visiting?',
          answer: 'The Citadel of Namur is a vast hilltop fortress with roots stretching back centuries. It offers panoramic views of both rivers and the city below. The grounds are open for walks, and several restaurants near the top provide atmospheric dining with exceptional views.',
        },
        {
          question: 'Is the nightlife in Namur limited?',
          answer: 'Namur\'s nightlife is quieter than Liège or Brussels, but it is far from absent. The old town has a solid selection of wine bars, cocktail lounges, and brasseries. The Rue des Brasseurs and surrounding streets are the main evening area. The atmosphere is sociable without being overwhelming.',
        },
        {
          question: 'Does Pinklights.be have companions available in Namur?',
          answer: 'Yes. While Namur is a smaller market, our platform features verified companions in the city and surrounding region. Many users appreciate Namur precisely for its intimate scale, which makes encounters feel more personal and genuine.',
        },
      ]}
      relatedCities={[
        {
          title: 'Charleroi',
          description: 'Wallonia\'s largest city with an evolving social scene and convenient airport access.',
          url: '/seo/cities/Charleroi',
        },
        {
          title: 'Liège',
          description: 'The Ardent City with legendary nightlife in the Carré district and cross-border charm.',
          url: '/seo/cities/Liege',
        },
        {
          title: 'Brussels',
          description: 'Belgium\'s cosmopolitan capital offering an international social scene an hour by train.',
          url: '/seo/cities/Brussels',
        },
      ]}
    />
  );
};

export default NamurPage;

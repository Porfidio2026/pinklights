import { Locale } from './locales';

interface CitySection {
  heading: string;
  text: string;
}

interface CityFAQ {
  question: string;
  answer: string;
}

interface RelatedCity {
  title: string;
  description: string;
  url: string;
}

interface CityData {
  cityName: string;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  heroHeadline: string;
  heroSubtext: string;
  sections: CitySection[];
  faqItems: CityFAQ[];
  relatedCities: RelatedCity[];
}

interface CityHubData {
  metaTitle: string;
  metaDescription: string;
  title: string;
  intro: string;
  howSearchWorks: { heading: string; text: string; text2: string };
  whyPinklights: { heading: string; text: string; text2: string };
  cities: { name: string; slug: string; description: string }[];
  browseByCityHeading: string;
}

export const CITY_HUB_TRANSLATIONS: Record<Locale, CityHubData> = {
  fr: {
    metaTitle: 'Escortes en Belgique par ville | Pinklights.be',
    metaDescription: 'Parcourez les profils d\'escortes dans les principales villes belges. Trouvez des accompagnatrices a Bruxelles, Anvers, Gand, Bruges et plus.',
    title: 'Trouvez des escortes dans votre ville',
    intro: 'Pinklights.be est la premiere plateforme de recherche d\'escortes en Belgique. Parcourez les profils verifies ville par ville et trouvez la personne qui vous convient.',
    howSearchWorks: {
      heading: 'Comment fonctionne la recherche',
      text: 'Selectionnez une ville pour voir les profils disponibles dans cette region. Chaque profil contient des photos, une description et les informations de contact.',
      text2: 'Vous pouvez filtrer les resultats par type de service, disponibilite et autres criteres pour trouver exactement ce que vous cherchez.',
    },
    whyPinklights: {
      heading: 'Pourquoi choisir Pinklights.be',
      text: 'La Belgique est notre marche principal. Nous connaissons les villes, les quartiers et les attentes locales mieux que quiconque.',
      text2: 'Notre plateforme est simple, rapide et ne necessite aucune inscription pour commencer a parcourir les profils.',
    },
    cities: [
      { name: 'Bruxelles', slug: 'brussels', description: 'La capitale belge, avec le plus grand nombre de profils disponibles.' },
      { name: 'Anvers', slug: 'antwerp', description: 'Deuxieme ville du pays, connue pour sa vie nocturne animee.' },
      { name: 'Gand', slug: 'ghent', description: 'Ville universitaire dynamique avec une scene variee.' },
      { name: 'Bruges', slug: 'bruges', description: 'Ville historique attirant visiteurs du monde entier.' },
      { name: 'Liege', slug: 'liege', description: 'La cite ardente, coeur de la Wallonie.' },
      { name: 'Louvain', slug: 'leuven', description: 'Ville etudiante proche de Bruxelles.' },
      { name: 'Charleroi', slug: 'charleroi', description: 'Grande ville wallonne en pleine transformation.' },
      { name: 'Namur', slug: 'namur', description: 'Capitale de la Wallonie, charmante et accessible.' },
    ],
    browseByCityHeading: 'Parcourir par ville',
  },
  nl: {
    metaTitle: 'Escorts in Belgie per stad | Pinklights.be',
    metaDescription: 'Bekijk escortprofielen in de grootste Belgische steden. Vind begeleiders in Brussel, Antwerpen, Gent, Brugge en meer.',
    title: 'Vind escorts in jouw stad',
    intro: 'Pinklights.be is het eerste escortzoekplatform in Belgie. Bekijk geverifieerde profielen per stad en vind de juiste persoon voor jou.',
    howSearchWorks: {
      heading: 'Hoe zoeken werkt',
      text: 'Selecteer een stad om beschikbare profielen in die regio te bekijken. Elk profiel bevat foto\'s, een beschrijving en contactgegevens.',
      text2: 'Je kunt resultaten filteren op type dienst, beschikbaarheid en andere criteria om precies te vinden wat je zoekt.',
    },
    whyPinklights: {
      heading: 'Waarom Pinklights.be',
      text: 'Belgie is onze belangrijkste markt. Wij kennen de steden, wijken en lokale verwachtingen beter dan wie ook.',
      text2: 'Ons platform is eenvoudig, snel en vereist geen registratie om profielen te bekijken.',
    },
    cities: [
      { name: 'Brussel', slug: 'brussels', description: 'De Belgische hoofdstad, met het grootste aantal beschikbare profielen.' },
      { name: 'Antwerpen', slug: 'antwerp', description: 'De tweede stad van het land, bekend om het bruisende nachtleven.' },
      { name: 'Gent', slug: 'ghent', description: 'Dynamische studentenstad met een gevarieerd aanbod.' },
      { name: 'Brugge', slug: 'bruges', description: 'Historische stad die bezoekers van over de hele wereld aantrekt.' },
      { name: 'Luik', slug: 'liege', description: 'De vurige stad, het hart van Wallonie.' },
      { name: 'Leuven', slug: 'leuven', description: 'Studentenstad vlakbij Brussel.' },
      { name: 'Charleroi', slug: 'charleroi', description: 'Grote Waalse stad in volle transformatie.' },
      { name: 'Namen', slug: 'namur', description: 'Hoofdstad van Wallonie, charmant en bereikbaar.' },
    ],
    browseByCityHeading: 'Zoek per stad',
  },
  es: {
    metaTitle: 'Escorts en Belgica por ciudad | Pinklights.be',
    metaDescription: 'Explora perfiles de escorts en las principales ciudades belgas. Encuentra acompanantes en Bruselas, Amberes, Gante, Brujas y mas.',
    title: 'Encuentra escorts en tu ciudad',
    intro: 'Pinklights.be es la primera plataforma de busqueda de escorts en Belgica. Explora perfiles verificados por ciudad y encuentra a la persona adecuada para ti.',
    howSearchWorks: {
      heading: 'Como funciona la busqueda',
      text: 'Selecciona una ciudad para ver los perfiles disponibles en esa zona. Cada perfil incluye fotos, una descripcion y datos de contacto.',
      text2: 'Puedes filtrar los resultados por tipo de servicio, disponibilidad y otros criterios para encontrar exactamente lo que buscas.',
    },
    whyPinklights: {
      heading: 'Por que elegir Pinklights.be',
      text: 'Belgica es nuestro mercado principal. Conocemos las ciudades, los barrios y las expectativas locales mejor que nadie.',
      text2: 'Nuestra plataforma es sencilla, rapida y no requiere registro para empezar a ver perfiles.',
    },
    cities: [
      { name: 'Bruselas', slug: 'brussels', description: 'La capital belga, con el mayor numero de perfiles disponibles.' },
      { name: 'Amberes', slug: 'antwerp', description: 'La segunda ciudad del pais, famosa por su vida nocturna.' },
      { name: 'Gante', slug: 'ghent', description: 'Ciudad universitaria dinamica con una oferta variada.' },
      { name: 'Brujas', slug: 'bruges', description: 'Ciudad historica que atrae visitantes de todo el mundo.' },
      { name: 'Lieja', slug: 'liege', description: 'La ciudad ardiente, corazon de Valonia.' },
      { name: 'Lovaina', slug: 'leuven', description: 'Ciudad estudiantil cerca de Bruselas.' },
      { name: 'Charleroi', slug: 'charleroi', description: 'Gran ciudad valona en plena transformacion.' },
      { name: 'Namur', slug: 'namur', description: 'Capital de Valonia, encantadora y accesible.' },
    ],
    browseByCityHeading: 'Buscar por ciudad',
  },
  pt: {
    metaTitle: 'Acompanhantes na Belgica por cidade | Pinklights.be',
    metaDescription: 'Explore perfis de acompanhantes nas principais cidades belgas. Encontre profissionais em Bruxelas, Antuérpia, Gante, Bruges e mais.',
    title: 'Encontre acompanhantes na sua cidade',
    intro: 'O Pinklights.be e a primeira plataforma de busca de acompanhantes na Belgica. Explore perfis verificados por cidade e encontre a pessoa certa para si.',
    howSearchWorks: {
      heading: 'Como funciona a pesquisa',
      text: 'Selecione uma cidade para ver os perfis disponiveis nessa regiao. Cada perfil inclui fotos, descricao e informacoes de contacto.',
      text2: 'Pode filtrar os resultados por tipo de servico, disponibilidade e outros criterios para encontrar exatamente o que procura.',
    },
    whyPinklights: {
      heading: 'Porque escolher o Pinklights.be',
      text: 'A Belgica e o nosso mercado principal. Conhecemos as cidades, os bairros e as expectativas locais melhor do que ninguem.',
      text2: 'A nossa plataforma e simples, rapida e nao requer registo para comecar a ver perfis.',
    },
    cities: [
      { name: 'Bruxelas', slug: 'brussels', description: 'A capital belga, com o maior numero de perfis disponiveis.' },
      { name: 'Antuérpia', slug: 'antwerp', description: 'A segunda cidade do pais, conhecida pela vida noturna.' },
      { name: 'Gante', slug: 'ghent', description: 'Cidade universitaria dinamica com oferta variada.' },
      { name: 'Bruges', slug: 'bruges', description: 'Cidade historica que atrai visitantes do mundo inteiro.' },
      { name: 'Liege', slug: 'liege', description: 'A cidade ardente, coracao da Valonia.' },
      { name: 'Lovaina', slug: 'leuven', description: 'Cidade estudantil perto de Bruxelas.' },
      { name: 'Charleroi', slug: 'charleroi', description: 'Grande cidade valona em plena transformacao.' },
      { name: 'Namur', slug: 'namur', description: 'Capital da Valonia, encantadora e acessivel.' },
    ],
    browseByCityHeading: 'Pesquisar por cidade',
  },
  ru: {
    metaTitle: 'Эскорт в Бельгии по городам | Pinklights.be',
    metaDescription: 'Просматривайте профили эскорта в крупнейших городах Бельгии. Найдите спутниц в Брюсселе, Антверпене, Генте, Брюгге и других городах.',
    title: 'Найдите эскорт в вашем городе',
    intro: 'Pinklights.be - первая платформа поиска эскорта в Бельгии. Просматривайте проверенные профили по городам и находите подходящего человека.',
    howSearchWorks: {
      heading: 'Как работает поиск',
      text: 'Выберите город, чтобы увидеть доступные профили в этом регионе. Каждый профиль содержит фотографии, описание и контактную информацию.',
      text2: 'Вы можете фильтровать результаты по типу услуги, доступности и другим критериям, чтобы найти именно то, что вам нужно.',
    },
    whyPinklights: {
      heading: 'Почему Pinklights.be',
      text: 'Бельгия - наш основной рынок. Мы знаем города, районы и местные особенности лучше, чем кто-либо.',
      text2: 'Наша платформа проста, быстра и не требует регистрации для просмотра профилей.',
    },
    cities: [
      { name: 'Брюссель', slug: 'brussels', description: 'Столица Бельгии с наибольшим количеством доступных профилей.' },
      { name: 'Антверпен', slug: 'antwerp', description: 'Второй город страны, известный своей ночной жизнью.' },
      { name: 'Гент', slug: 'ghent', description: 'Динамичный университетский город с разнообразным выбором.' },
      { name: 'Брюгге', slug: 'bruges', description: 'Исторический город, привлекающий гостей со всего мира.' },
      { name: 'Льеж', slug: 'liege', description: 'Пылающий город, сердце Валлонии.' },
      { name: 'Лёвен', slug: 'leuven', description: 'Студенческий город недалеко от Брюсселя.' },
      { name: 'Шарлеруа', slug: 'charleroi', description: 'Крупный валлонский город в процессе трансформации.' },
      { name: 'Намюр', slug: 'namur', description: 'Столица Валлонии, очаровательный и доступный город.' },
    ],
    browseByCityHeading: 'Поиск по городам',
  },
  de: {
    metaTitle: 'Escorts in Belgien nach Stadt | Pinklights.be',
    metaDescription: 'Durchsuchen Sie Escort-Profile in den grossten belgischen Stadten. Finden Sie Begleitung in Brussel, Antwerpen, Gent, Brugge und mehr.',
    title: 'Finden Sie Escorts in Ihrer Stadt',
    intro: 'Pinklights.be ist die erste Escort-Suchplattform in Belgien. Durchsuchen Sie verifizierte Profile nach Stadt und finden Sie die richtige Person fur Sie.',
    howSearchWorks: {
      heading: 'So funktioniert die Suche',
      text: 'Wahlen Sie eine Stadt, um verfugbare Profile in dieser Region anzuzeigen. Jedes Profil enthalt Fotos, eine Beschreibung und Kontaktdaten.',
      text2: 'Sie konnen die Ergebnisse nach Dienstleistungsart, Verfugbarkeit und weiteren Kriterien filtern, um genau das zu finden, was Sie suchen.',
    },
    whyPinklights: {
      heading: 'Warum Pinklights.be',
      text: 'Belgien ist unser Hauptmarkt. Wir kennen die Stadte, Viertel und lokalen Erwartungen besser als jeder andere.',
      text2: 'Unsere Plattform ist einfach, schnell und erfordert keine Registrierung, um Profile zu durchsuchen.',
    },
    cities: [
      { name: 'Brussel', slug: 'brussels', description: 'Die belgische Hauptstadt mit den meisten verfugbaren Profilen.' },
      { name: 'Antwerpen', slug: 'antwerp', description: 'Die zweitgrosste Stadt des Landes, bekannt fur ihr Nachtleben.' },
      { name: 'Gent', slug: 'ghent', description: 'Dynamische Universitatsstadt mit vielfaltigen Angeboten.' },
      { name: 'Brugge', slug: 'bruges', description: 'Historische Stadt, die Besucher aus aller Welt anzieht.' },
      { name: 'Luttich', slug: 'liege', description: 'Die feurige Stadt, Herz der Wallonie.' },
      { name: 'Leuven', slug: 'leuven', description: 'Studentenstadt in der Nahe von Brussel.' },
      { name: 'Charleroi', slug: 'charleroi', description: 'Grosse wallonische Stadt im Wandel.' },
      { name: 'Namur', slug: 'namur', description: 'Hauptstadt der Wallonie, charmant und gut erreichbar.' },
    ],
    browseByCityHeading: 'Nach Stadt suchen',
  },
};

export const CITY_TRANSLATIONS: Record<Locale, Record<string, CityData>> = {
  fr: {
    antwerp: {
      cityName: 'Anvers',
      slug: 'antwerp',
      metaTitle: 'Escortes a Anvers | Pinklights.be',
      metaDescription: 'Trouvez des escortes a Anvers. Parcourez les profils verifies et contactez des accompagnatrices dans la metropole flamande.',
      heroHeadline: 'Escortes a Anvers',
      heroSubtext: 'Parcourez les profils disponibles a Anvers et dans ses environs. Trouvez la personne ideale en quelques clics.',
      sections: [
        { heading: 'Anvers, metropole du nord', text: 'Anvers est la plus grande ville de Flandre et un centre economique majeur. Sa vie nocturne animee et son caractere cosmopolite en font un lieu ideal pour trouver des accompagnatrices de qualite. Le quartier du centre-ville et la zone autour de la gare centrale concentrent une grande partie de l\'activite.' },
        { heading: 'Comment trouver une escorte a Anvers', text: 'Sur Pinklights.be, vous pouvez parcourir les profils des escortes basees a Anvers. Chaque profil comprend des photos, une description des services proposes et les coordonnees de contact. Vous n\'avez pas besoin de creer un compte pour commencer votre recherche.' },
        { heading: 'Conseils pour votre rencontre', text: 'Privilegiez toujours la communication directe avant un rendez-vous. Convenez des details a l\'avance, y compris le lieu, la duree et les attentes. Le respect mutuel est la cle d\'une experience reussie. Pour toute question, contactez-nous par WhatsApp au +32 478 02 64 79.' },
      ],
      faqItems: [
        { question: 'Combien de profils sont disponibles a Anvers ?', answer: 'Le nombre de profils varie regulierement. Consultez la page de recherche pour voir les escortes actuellement actives a Anvers et dans ses environs.' },
        { question: 'Faut-il un compte pour contacter une escorte ?', answer: 'Non, aucun compte n\'est requis. Vous pouvez parcourir les profils et contacter directement les escortes via les coordonnees indiquees sur leur profil.' },
        { question: 'Les profils sont-ils verifies ?', answer: 'Nous encourageons la verification des profils pour garantir l\'authenticite. Recherchez les badges de verification sur les profils pour plus de confiance.' },
      ],
      relatedCities: [
        { title: 'Escortes a Bruxelles', description: 'Decouvrez les profils disponibles dans la capitale belge.', url: '/find/brussels' },
        { title: 'Escortes a Gand', description: 'Parcourez les profils dans cette ville universitaire dynamique.', url: '/find/ghent' },
        { title: 'Escortes a Bruges', description: 'Trouvez des accompagnatrices dans la Venise du Nord.', url: '/find/bruges' },
      ],
    },
    brussels: {
      cityName: 'Bruxelles',
      slug: 'brussels',
      metaTitle: 'Escortes a Bruxelles | Pinklights.be',
      metaDescription: 'Trouvez des escortes a Bruxelles. Parcourez les profils verifies dans la capitale belge et trouvez la compagnie ideale.',
      heroHeadline: 'Escortes a Bruxelles',
      heroSubtext: 'La capitale belge offre le plus grand choix de profils. Parcourez et trouvez la personne qui vous convient.',
      sections: [
        { heading: 'Bruxelles, coeur de la Belgique', text: 'Bruxelles est la capitale de la Belgique et le siege de l\'Union europeenne. Ville cosmopolite par excellence, elle attire des visiteurs du monde entier. Sa position centrale et son caractere international en font le lieu avec le plus grand nombre de profils sur Pinklights.be.' },
        { heading: 'Recherche par quartier', text: 'Bruxelles est composee de 19 communes, chacune avec son propre caractere. Que vous soyez dans le centre historique, a Ixelles, Saint-Gilles ou Uccle, vous trouverez des profils proches de votre localisation. Utilisez les filtres de recherche pour affiner vos resultats.' },
        { heading: 'Discretion et professionnalisme', text: 'Les escortes a Bruxelles sont habituees a une clientele internationale et offrent un service discret et professionnel. N\'hesitez pas a communiquer vos attentes clairement pour une experience optimale. Pour toute assistance, contactez-nous a support@pink-lights.be.' },
      ],
      faqItems: [
        { question: 'Bruxelles est-elle la ville avec le plus de profils ?', answer: 'Oui, en tant que capitale et plus grande ville du pays, Bruxelles dispose generalement du plus grand nombre de profils actifs sur la plateforme.' },
        { question: 'Puis-je rechercher par commune a Bruxelles ?', answer: 'Actuellement, la recherche se fait au niveau de la ville. Les profils indiquent souvent leur localisation plus precise dans leur description.' },
        { question: 'Comment contacter le support ?', answer: 'Vous pouvez nous contacter par WhatsApp au +32 478 02 64 79 ou par email a support@pink-lights.be pour toute question.' },
      ],
      relatedCities: [
        { title: 'Escortes a Anvers', description: 'Decouvrez les profils dans la metropole flamande.', url: '/find/antwerp' },
        { title: 'Escortes a Louvain', description: 'Ville universitaire a proximite de Bruxelles.', url: '/find/leuven' },
        { title: 'Escortes a Gand', description: 'Explorez les profils dans la capitale de la Flandre orientale.', url: '/find/ghent' },
      ],
    },
    ghent: {
      cityName: 'Gand',
      slug: 'ghent',
      metaTitle: 'Escortes a Gand | Pinklights.be',
      metaDescription: 'Trouvez des escortes a Gand. Parcourez les profils disponibles dans cette ville universitaire flamande dynamique.',
      heroHeadline: 'Escortes a Gand',
      heroSubtext: 'Decouvrez les profils disponibles a Gand, ville etudiante et culturelle au coeur de la Flandre.',
      sections: [
        { heading: 'Gand, ville culturelle', text: 'Gand est la troisieme plus grande ville de Belgique. Connue pour son universite et sa scene culturelle, elle combine histoire medievale et modernite. La ville attire un public jeune et dynamique, ce qui se reflete dans la diversite des profils disponibles.' },
        { heading: 'Trouver une escorte a Gand', text: 'Pinklights.be vous permet de parcourir facilement les profils des escortes basees a Gand. Filtrez par vos preferences pour trouver la personne ideale. Les profils incluent toutes les informations necessaires pour prendre contact directement.' },
      ],
      faqItems: [
        { question: 'Y a-t-il beaucoup d\'escortes a Gand ?', answer: 'Gand dispose d\'un bon nombre de profils, en particulier grace a son statut de ville universitaire et touristique.' },
        { question: 'Pinklights.be est-il gratuit ?', answer: 'La consultation des profils est gratuite et ne necessite aucune inscription. Les escortes fixent leurs propres tarifs pour leurs services.' },
        { question: 'Comment puis-je verifier l\'authenticite d\'un profil ?', answer: 'Recherchez les profils marques comme verifies. Nous travaillons constamment a ameliorer notre processus de verification.' },
      ],
      relatedCities: [
        { title: 'Escortes a Bruges', description: 'Explorez les profils dans la celebre ville historique.', url: '/find/bruges' },
        { title: 'Escortes a Anvers', description: 'Decouvrez les accompagnatrices dans la metropole portuaire.', url: '/find/antwerp' },
        { title: 'Escortes a Bruxelles', description: 'Le plus grand choix de profils en Belgique.', url: '/find/brussels' },
      ],
    },
    bruges: {
      cityName: 'Bruges',
      slug: 'bruges',
      metaTitle: 'Escortes a Bruges | Pinklights.be',
      metaDescription: 'Trouvez des escortes a Bruges. Parcourez les profils dans la Venise du Nord, destination touristique prisee.',
      heroHeadline: 'Escortes a Bruges',
      heroSubtext: 'Trouvez des accompagnatrices a Bruges, la perle de la Flandre occidentale.',
      sections: [
        { heading: 'Bruges, la Venise du Nord', text: 'Bruges est l\'une des villes les plus visitees de Belgique. Son centre historique classe au patrimoine mondial attire des millions de visiteurs chaque annee. Pour les voyageurs cherchant de la compagnie, Pinklights.be propose des profils locaux verifies.' },
        { heading: 'Services pour visiteurs', text: 'Beaucoup d\'escortes a Bruges sont habituees a une clientele internationale et parlent plusieurs langues. Que vous soyez en visite pour affaires ou pour le plaisir, vous trouverez des profils adaptes a vos besoins.' },
      ],
      faqItems: [
        { question: 'Les escortes a Bruges parlent-elles plusieurs langues ?', answer: 'De nombreuses escortes a Bruges maitrisent le francais, le neerlandais et l\'anglais, et parfois d\'autres langues. Les competences linguistiques sont souvent mentionnees dans les profils.' },
        { question: 'Puis-je trouver une escorte pour un evenement ?', answer: 'Oui, de nombreuses escortes proposent des services d\'accompagnement pour des evenements sociaux, diners ou soirees. Consultez les descriptions de profil pour plus de details.' },
        { question: 'Bruges est-elle bien desservie ?', answer: 'Oui, Bruges est facilement accessible en train depuis Bruxelles (environ 1 heure) et depuis Gand (environ 30 minutes).' },
      ],
      relatedCities: [
        { title: 'Escortes a Gand', description: 'Profils disponibles dans la ville voisine.', url: '/find/ghent' },
        { title: 'Escortes a Anvers', description: 'Decouvrez la scene a Anvers.', url: '/find/antwerp' },
        { title: 'Escortes a Bruxelles', description: 'Le plus grand choix dans la capitale.', url: '/find/brussels' },
      ],
    },
    liege: {
      cityName: 'Liege',
      slug: 'liege',
      metaTitle: 'Escortes a Liege | Pinklights.be',
      metaDescription: 'Trouvez des escortes a Liege. Parcourez les profils dans la cite ardente, coeur de la Wallonie.',
      heroHeadline: 'Escortes a Liege',
      heroSubtext: 'Decouvrez les profils disponibles a Liege, la cite ardente.',
      sections: [
        { heading: 'Liege, ville chaleureuse', text: 'Liege est la plus grande ville de Wallonie et un carrefour important entre la Belgique, l\'Allemagne et les Pays-Bas. Son ambiance conviviale et sa vie nocturne reputee en font une destination appreciee. La ville offre un bon nombre de profils sur Pinklights.be.' },
        { heading: 'Le Carre et la vie nocturne', text: 'Le quartier du Carre a Liege est celebre pour sa concentration de bars et de restaurants. C\'est un point de depart ideal pour une soiree. Les escortes liegoises connaissent bien la ville et peuvent vous conseiller les meilleurs endroits.' },
      ],
      faqItems: [
        { question: 'La plupart des escortes a Liege parlent-elles francais ?', answer: 'Oui, Liege etant une ville francophone, la grande majorite des escortes parlent francais couramment.' },
        { question: 'Liege est-elle proche d\'autres grandes villes ?', answer: 'Oui, Liege est situee a environ 1h de Bruxelles en train et a proximite de la frontiere allemande et neerlandaise.' },
        { question: 'Comment sont les tarifs a Liege ?', answer: 'Les tarifs varient d\'une escorte a l\'autre. Chaque profil indique ses propres conditions. Nous ne fixons pas les prix.' },
      ],
      relatedCities: [
        { title: 'Escortes a Namur', description: 'Profils dans la capitale wallonne.', url: '/find/namur' },
        { title: 'Escortes a Charleroi', description: 'Decouvrez les profils dans le Pays Noir.', url: '/find/charleroi' },
        { title: 'Escortes a Bruxelles', description: 'Le plus grand choix en Belgique.', url: '/find/brussels' },
      ],
    },
    leuven: {
      cityName: 'Louvain',
      slug: 'leuven',
      metaTitle: 'Escortes a Louvain | Pinklights.be',
      metaDescription: 'Trouvez des escortes a Louvain. Parcourez les profils dans cette ville universitaire proche de Bruxelles.',
      heroHeadline: 'Escortes a Louvain',
      heroSubtext: 'Trouvez des accompagnatrices a Louvain, ville universitaire animee du Brabant flamand.',
      sections: [
        { heading: 'Louvain, ville du savoir', text: 'Louvain abrite la KU Leuven, l\'une des plus anciennes universites d\'Europe. Cette ville compacte mais dynamique se trouve a seulement 25 minutes de Bruxelles en train, ce qui en fait un emplacement pratique avec une atmosphere unique.' },
        { heading: 'Parcourir les profils', text: 'Les escortes basees a Louvain sont facilement accessibles via Pinklights.be. La proximite avec Bruxelles signifie egalement que vous pouvez trouver des escortes disposees a se deplacer entre les deux villes.' },
      ],
      faqItems: [
        { question: 'Louvain est-elle proche de Bruxelles ?', answer: 'Oui, Louvain se trouve a environ 25 minutes en train de Bruxelles-Central, ce qui rend les deplacements entre les deux villes tres faciles.' },
        { question: 'Y a-t-il des escortes disponibles le soir ?', answer: 'Oui, de nombreuses escortes sont disponibles en soiree. Consultez les profils pour les horaires de disponibilite ou contactez-les directement.' },
        { question: 'Puis-je contacter une escorte par WhatsApp ?', answer: 'Cela depend de chaque escorte. Certaines preferent les appels, d\'autres les messages. Les moyens de contact sont precises sur chaque profil.' },
      ],
      relatedCities: [
        { title: 'Escortes a Bruxelles', description: 'La capitale, a quelques minutes en train.', url: '/find/brussels' },
        { title: 'Escortes a Anvers', description: 'La metropole flamande au nord.', url: '/find/antwerp' },
        { title: 'Escortes a Gand', description: 'Autre ville universitaire de Flandre.', url: '/find/ghent' },
      ],
    },
    charleroi: {
      cityName: 'Charleroi',
      slug: 'charleroi',
      metaTitle: 'Escortes a Charleroi | Pinklights.be',
      metaDescription: 'Trouvez des escortes a Charleroi. Parcourez les profils disponibles dans cette grande ville wallonne.',
      heroHeadline: 'Escortes a Charleroi',
      heroSubtext: 'Decouvrez les profils disponibles a Charleroi et dans la region du Hainaut.',
      sections: [
        { heading: 'Charleroi, ville en renouveau', text: 'Charleroi est la troisieme plus grande ville de Belgique par la population. En pleine renaissance urbaine, elle offre de plus en plus d\'attraits. La presence de l\'aeroport de Bruxelles-Sud a proximite attire egalement de nombreux voyageurs.' },
        { heading: 'Trouver des profils a Charleroi', text: 'Sur Pinklights.be, vous pouvez filtrer les profils par localisation pour trouver des escortes basees a Charleroi ou dans le Hainaut. Chaque profil comprend toutes les informations necessaires pour un premier contact.' },
      ],
      faqItems: [
        { question: 'L\'aeroport de Charleroi est-il proche du centre ?', answer: 'L\'aeroport de Bruxelles-Sud (Charleroi) est situe a environ 10 km du centre-ville, accessible en navette ou en taxi.' },
        { question: 'Puis-je trouver des escortes pres de l\'aeroport ?', answer: 'Oui, plusieurs escortes basees a Charleroi et dans les environs sont facilement accessibles depuis l\'aeroport.' },
        { question: 'Charleroi est-elle loin de Bruxelles ?', answer: 'Charleroi se trouve a environ 1 heure de Bruxelles en train, ce qui permet aussi de consulter les profils bruxellois si vous le souhaitez.' },
      ],
      relatedCities: [
        { title: 'Escortes a Namur', description: 'La capitale wallonne toute proche.', url: '/find/namur' },
        { title: 'Escortes a Liege', description: 'L\'autre grande ville de Wallonie.', url: '/find/liege' },
        { title: 'Escortes a Bruxelles', description: 'Le plus grand choix en Belgique.', url: '/find/brussels' },
      ],
    },
    namur: {
      cityName: 'Namur',
      slug: 'namur',
      metaTitle: 'Escortes a Namur | Pinklights.be',
      metaDescription: 'Trouvez des escortes a Namur. Parcourez les profils dans la capitale de la Region wallonne.',
      heroHeadline: 'Escortes a Namur',
      heroSubtext: 'Trouvez des accompagnatrices a Namur, ville charmante au confluent de la Sambre et de la Meuse.',
      sections: [
        { heading: 'Namur, capitale wallonne', text: 'Namur est la capitale de la Region wallonne. Ville a taille humaine, elle combine patrimoine historique et qualite de vie. Sa citadelle et son centre pietonnier attirent visiteurs et residents. Les escortes basees a Namur offrent un service personnalise dans un cadre agreable.' },
        { heading: 'Facilite de contact', text: 'Les profils namurois sur Pinklights.be sont detailles et a jour. Vous y trouverez les informations de contact directes, les services proposes et les disponibilites. N\'hesitez pas a prendre contact pour organiser une rencontre.' },
      ],
      faqItems: [
        { question: 'Namur est-elle facilement accessible ?', answer: 'Oui, Namur est bien desservie par le train depuis Bruxelles (environ 1h) et depuis Liege (environ 50 minutes). La gare est situee en plein centre-ville.' },
        { question: 'Y a-t-il des escortes disponibles le week-end ?', answer: 'Oui, de nombreuses escortes sont disponibles le week-end. Verifiez les profils pour les jours et horaires de disponibilite.' },
        { question: 'Comment savoir si un profil est recent ?', answer: 'Les profils recemment actifs sont mis en avant dans les resultats de recherche. Vous pouvez aussi verifier la date de derniere activite sur chaque profil.' },
      ],
      relatedCities: [
        { title: 'Escortes a Liege', description: 'La cite ardente, a moins d\'une heure.', url: '/find/liege' },
        { title: 'Escortes a Charleroi', description: 'La grande ville voisine du Hainaut.', url: '/find/charleroi' },
        { title: 'Escortes a Bruxelles', description: 'Le plus grand nombre de profils en Belgique.', url: '/find/brussels' },
      ],
    },
  },
  nl: {
    antwerp: {
      cityName: 'Antwerpen',
      slug: 'antwerp',
      metaTitle: 'Escorts in Antwerpen | Pinklights.be',
      metaDescription: 'Vind escorts in Antwerpen. Bekijk geverifieerde profielen en neem contact op met begeleiders in de Vlaamse metropool.',
      heroHeadline: 'Escorts in Antwerpen',
      heroSubtext: 'Bekijk de beschikbare profielen in Antwerpen en omgeving. Vind de juiste persoon in een paar klikken.',
      sections: [
        { heading: 'Antwerpen, metropool van het noorden', text: 'Antwerpen is de grootste stad van Vlaanderen en een belangrijk economisch centrum. Het bruisende nachtleven en het kosmopolitische karakter maken het een ideale plek om escorts van kwaliteit te vinden. Het stadscentrum en de omgeving van het Centraal Station zijn bijzonder populair.' },
        { heading: 'Hoe vind je een escort in Antwerpen', text: 'Op Pinklights.be kun je eenvoudig profielen bekijken van escorts in Antwerpen. Elk profiel bevat foto\'s, een beschrijving van de aangeboden diensten en contactgegevens. Je hebt geen account nodig om te beginnen met zoeken.' },
        { heading: 'Tips voor je afspraak', text: 'Communiceer altijd rechtstreeks voor een ontmoeting. Spreek de details vooraf af, inclusief locatie, duur en verwachtingen. Wederzijds respect is de sleutel tot een goede ervaring. Voor vragen kun je ons bereiken via WhatsApp op +32 478 02 64 79.' },
      ],
      faqItems: [
        { question: 'Hoeveel profielen zijn er beschikbaar in Antwerpen?', answer: 'Het aantal profielen varieert regelmatig. Bekijk de zoekpagina om de escorts te zien die momenteel actief zijn in Antwerpen en omgeving.' },
        { question: 'Heb ik een account nodig om een escort te contacteren?', answer: 'Nee, er is geen account nodig. Je kunt profielen bekijken en escorts rechtstreeks contacteren via de gegevens op hun profiel.' },
        { question: 'Zijn de profielen geverifieerd?', answer: 'We moedigen profielverificatie aan om de authenticiteit te garanderen. Zoek naar verificatiebadges op profielen voor extra vertrouwen.' },
      ],
      relatedCities: [
        { title: 'Escorts in Brussel', description: 'Ontdek de beschikbare profielen in de Belgische hoofdstad.', url: '/find/brussels' },
        { title: 'Escorts in Gent', description: 'Bekijk profielen in deze dynamische studentenstad.', url: '/find/ghent' },
        { title: 'Escorts in Brugge', description: 'Vind begeleiders in het Venetie van het Noorden.', url: '/find/bruges' },
      ],
    },
    brussels: {
      cityName: 'Brussel',
      slug: 'brussels',
      metaTitle: 'Escorts in Brussel | Pinklights.be',
      metaDescription: 'Vind escorts in Brussel. Bekijk geverifieerde profielen in de Belgische hoofdstad en vind het ideale gezelschap.',
      heroHeadline: 'Escorts in Brussel',
      heroSubtext: 'De Belgische hoofdstad biedt de grootste keuze aan profielen. Zoek en vind de juiste persoon voor jou.',
      sections: [
        { heading: 'Brussel, hart van Belgie', text: 'Brussel is de hoofdstad van Belgie en de zetel van de Europese Unie. Als kosmopolitische stad bij uitstek trekt ze bezoekers uit de hele wereld aan. Haar centrale ligging en internationaal karakter zorgen voor het grootste aantal profielen op Pinklights.be.' },
        { heading: 'Zoeken per wijk', text: 'Brussel bestaat uit 19 gemeenten, elk met een eigen karakter. Of je nu in het historische centrum bent, in Elsene, Sint-Gillis of Ukkel, je vindt profielen in de buurt. Gebruik de zoekfilters om je resultaten te verfijnen.' },
        { heading: 'Discretie en professionalisme', text: 'Escorts in Brussel zijn gewend aan een internationaal clienteel en bieden een discrete en professionele service. Communiceer je verwachtingen duidelijk voor een optimale ervaring. Voor hulp kun je ons mailen op support@pink-lights.be.' },
      ],
      faqItems: [
        { question: 'Heeft Brussel de meeste profielen?', answer: 'Ja, als hoofdstad en grootste stad van het land heeft Brussel doorgaans het meeste aantal actieve profielen op het platform.' },
        { question: 'Kan ik per gemeente zoeken in Brussel?', answer: 'Momenteel wordt er gezocht op stadsniveau. Profielen vermelden vaak hun preciezere locatie in hun beschrijving.' },
        { question: 'Hoe neem ik contact op met de klantenservice?', answer: 'Je kunt ons bereiken via WhatsApp op +32 478 02 64 79 of per email op support@pink-lights.be voor al je vragen.' },
      ],
      relatedCities: [
        { title: 'Escorts in Antwerpen', description: 'Ontdek profielen in de Vlaamse metropool.', url: '/find/antwerp' },
        { title: 'Escorts in Leuven', description: 'Universiteitstad vlakbij Brussel.', url: '/find/leuven' },
        { title: 'Escorts in Gent', description: 'Verken profielen in de hoofdstad van Oost-Vlaanderen.', url: '/find/ghent' },
      ],
    },
    ghent: {
      cityName: 'Gent',
      slug: 'ghent',
      metaTitle: 'Escorts in Gent | Pinklights.be',
      metaDescription: 'Vind escorts in Gent. Bekijk beschikbare profielen in deze dynamische Vlaamse studentenstad.',
      heroHeadline: 'Escorts in Gent',
      heroSubtext: 'Ontdek de beschikbare profielen in Gent, studentenstad en cultureel centrum in het hart van Vlaanderen.',
      sections: [
        { heading: 'Gent, culturele stad', text: 'Gent is de derde grootste stad van Belgie. Bekend om haar universiteit en culturele scene, combineert ze middeleeuwse geschiedenis met moderniteit. De stad trekt een jong en dynamisch publiek aan, wat zich weerspiegelt in de diversiteit van beschikbare profielen.' },
        { heading: 'Een escort vinden in Gent', text: 'Pinklights.be maakt het eenvoudig om profielen te bekijken van escorts in Gent. Filter op jouw voorkeuren om de ideale persoon te vinden. Profielen bevatten alle nodige informatie om direct contact op te nemen.' },
      ],
      faqItems: [
        { question: 'Zijn er veel escorts in Gent?', answer: 'Gent heeft een goed aantal profielen, mede dankzij de status als universitaire- en toeristenstad.' },
        { question: 'Is Pinklights.be gratis?', answer: 'Het bekijken van profielen is gratis en vereist geen registratie. Escorts bepalen zelf hun tarieven voor hun diensten.' },
        { question: 'Hoe kan ik de echtheid van een profiel controleren?', answer: 'Zoek naar profielen die als geverifieerd zijn gemarkeerd. We werken voortdurend aan het verbeteren van ons verificatieproces.' },
      ],
      relatedCities: [
        { title: 'Escorts in Brugge', description: 'Verken profielen in de beroemde historische stad.', url: '/find/bruges' },
        { title: 'Escorts in Antwerpen', description: 'Ontdek begeleiders in de havenmetropool.', url: '/find/antwerp' },
        { title: 'Escorts in Brussel', description: 'De grootste keuze aan profielen in Belgie.', url: '/find/brussels' },
      ],
    },
    bruges: {
      cityName: 'Brugge',
      slug: 'bruges',
      metaTitle: 'Escorts in Brugge | Pinklights.be',
      metaDescription: 'Vind escorts in Brugge. Bekijk profielen in het Venetie van het Noorden, een populaire toeristische bestemming.',
      heroHeadline: 'Escorts in Brugge',
      heroSubtext: 'Vind begeleiders in Brugge, de parel van West-Vlaanderen.',
      sections: [
        { heading: 'Brugge, het Venetie van het Noorden', text: 'Brugge is een van de meest bezochte steden van Belgie. Het historische centrum, dat op de UNESCO-werelderfgoedlijst staat, trekt miljoenen bezoekers per jaar aan. Voor reizigers die gezelschap zoeken, biedt Pinklights.be geverifieerde lokale profielen.' },
        { heading: 'Diensten voor bezoekers', text: 'Veel escorts in Brugge zijn gewend aan een internationaal clienteel en spreken meerdere talen. Of je nu op zakenreis bent of voor je plezier, je vindt profielen die passen bij jouw behoeften.' },
      ],
      faqItems: [
        { question: 'Spreken escorts in Brugge meerdere talen?', answer: 'Veel escorts in Brugge beheersen Nederlands, Frans en Engels, en soms ook andere talen. Taalvaardigheden worden vaak vermeld in de profielen.' },
        { question: 'Kan ik een escort vinden voor een evenement?', answer: 'Ja, veel escorts bieden begeleidingsdiensten aan voor sociale evenementen, diners of avondjes uit. Bekijk de profielbeschrijvingen voor meer details.' },
        { question: 'Is Brugge goed bereikbaar?', answer: 'Ja, Brugge is gemakkelijk bereikbaar per trein vanuit Brussel (ongeveer 1 uur) en vanuit Gent (ongeveer 30 minuten).' },
      ],
      relatedCities: [
        { title: 'Escorts in Gent', description: 'Beschikbare profielen in de naburige stad.', url: '/find/ghent' },
        { title: 'Escorts in Antwerpen', description: 'Ontdek het aanbod in Antwerpen.', url: '/find/antwerp' },
        { title: 'Escorts in Brussel', description: 'De grootste keuze in de hoofdstad.', url: '/find/brussels' },
      ],
    },
    liege: {
      cityName: 'Luik',
      slug: 'liege',
      metaTitle: 'Escorts in Luik | Pinklights.be',
      metaDescription: 'Vind escorts in Luik. Bekijk profielen in de vurige stad, het hart van Wallonie.',
      heroHeadline: 'Escorts in Luik',
      heroSubtext: 'Ontdek de beschikbare profielen in Luik, de vurige stad.',
      sections: [
        { heading: 'Luik, warme stad', text: 'Luik is de grootste stad van Wallonie en een belangrijk kruispunt tussen Belgie, Duitsland en Nederland. De gezellige sfeer en het bekende nachtleven maken het een gewaardeerde bestemming. De stad biedt een goed aantal profielen op Pinklights.be.' },
        { heading: 'Le Carre en het nachtleven', text: 'De wijk Le Carre in Luik is beroemd om de concentratie aan bars en restaurants. Het is een ideaal startpunt voor een avondje uit. Escorts uit Luik kennen de stad goed en kunnen je de beste plekken aanraden.' },
      ],
      faqItems: [
        { question: 'Spreken de meeste escorts in Luik Frans?', answer: 'Ja, aangezien Luik een Franstalige stad is, spreekt de overgrote meerderheid van de escorts vloeiend Frans.' },
        { question: 'Ligt Luik dicht bij andere grote steden?', answer: 'Ja, Luik ligt op ongeveer 1 uur met de trein van Brussel en dicht bij de Duitse en Nederlandse grens.' },
        { question: 'Hoe zijn de tarieven in Luik?', answer: 'De tarieven varieren per escort. Elk profiel vermeldt eigen voorwaarden. Wij bepalen de prijzen niet.' },
      ],
      relatedCities: [
        { title: 'Escorts in Namen', description: 'Profielen in de Waalse hoofdstad.', url: '/find/namur' },
        { title: 'Escorts in Charleroi', description: 'Ontdek profielen in het Pays Noir.', url: '/find/charleroi' },
        { title: 'Escorts in Brussel', description: 'De grootste keuze in Belgie.', url: '/find/brussels' },
      ],
    },
    leuven: {
      cityName: 'Leuven',
      slug: 'leuven',
      metaTitle: 'Escorts in Leuven | Pinklights.be',
      metaDescription: 'Vind escorts in Leuven. Bekijk profielen in deze universiteitstad vlakbij Brussel.',
      heroHeadline: 'Escorts in Leuven',
      heroSubtext: 'Vind begeleiders in Leuven, de bruisende universiteitstad van Vlaams-Brabant.',
      sections: [
        { heading: 'Leuven, stad van kennis', text: 'Leuven is de thuisbasis van de KU Leuven, een van de oudste universiteiten van Europa. Deze compacte maar dynamische stad ligt op slechts 25 minuten met de trein van Brussel, wat het een praktische locatie maakt met een unieke sfeer.' },
        { heading: 'Profielen bekijken', text: 'Escorts in Leuven zijn eenvoudig bereikbaar via Pinklights.be. De nabijheid van Brussel betekent ook dat je escorts kunt vinden die bereid zijn om tussen beide steden te reizen.' },
      ],
      faqItems: [
        { question: 'Ligt Leuven dicht bij Brussel?', answer: 'Ja, Leuven ligt op ongeveer 25 minuten met de trein van Brussel-Centraal, wat reizen tussen beide steden heel eenvoudig maakt.' },
        { question: 'Zijn er escorts beschikbaar in de avond?', answer: 'Ja, veel escorts zijn beschikbaar in de avonduren. Bekijk de profielen voor beschikbaarheidstijden of neem rechtstreeks contact op.' },
        { question: 'Kan ik een escort via WhatsApp contacteren?', answer: 'Dat hangt af van de escort. Sommigen geven de voorkeur aan bellen, anderen aan berichten. De contactmethoden staan vermeld op elk profiel.' },
      ],
      relatedCities: [
        { title: 'Escorts in Brussel', description: 'De hoofdstad, op enkele minuten met de trein.', url: '/find/brussels' },
        { title: 'Escorts in Antwerpen', description: 'De Vlaamse metropool in het noorden.', url: '/find/antwerp' },
        { title: 'Escorts in Gent', description: 'Andere universiteitstad in Vlaanderen.', url: '/find/ghent' },
      ],
    },
    charleroi: {
      cityName: 'Charleroi',
      slug: 'charleroi',
      metaTitle: 'Escorts in Charleroi | Pinklights.be',
      metaDescription: 'Vind escorts in Charleroi. Bekijk de beschikbare profielen in deze grote Waalse stad.',
      heroHeadline: 'Escorts in Charleroi',
      heroSubtext: 'Ontdek de beschikbare profielen in Charleroi en de regio Henegouwen.',
      sections: [
        { heading: 'Charleroi, stad in vernieuwing', text: 'Charleroi is qua inwoners de derde grootste stad van Belgie. In volle stedelijke vernieuwing biedt ze steeds meer aantrekkingskracht. De nabijheid van de luchthaven Brussel-Zuid trekt ook veel reizigers aan.' },
        { heading: 'Profielen vinden in Charleroi', text: 'Op Pinklights.be kun je profielen filteren op locatie om escorts te vinden in Charleroi of Henegouwen. Elk profiel bevat alle nodige informatie voor een eerste contact.' },
      ],
      faqItems: [
        { question: 'Ligt de luchthaven van Charleroi dicht bij het centrum?', answer: 'De luchthaven Brussel-Zuid (Charleroi) ligt op ongeveer 10 km van het stadscentrum, bereikbaar per shuttle of taxi.' },
        { question: 'Kan ik escorts vinden bij de luchthaven?', answer: 'Ja, verschillende escorts in Charleroi en omgeving zijn gemakkelijk bereikbaar vanaf de luchthaven.' },
        { question: 'Ligt Charleroi ver van Brussel?', answer: 'Charleroi ligt op ongeveer 1 uur met de trein van Brussel, waardoor je ook de Brusselse profielen kunt bekijken als je wilt.' },
      ],
      relatedCities: [
        { title: 'Escorts in Namen', description: 'De Waalse hoofdstad vlakbij.', url: '/find/namur' },
        { title: 'Escorts in Luik', description: 'De andere grote stad van Wallonie.', url: '/find/liege' },
        { title: 'Escorts in Brussel', description: 'De grootste keuze in Belgie.', url: '/find/brussels' },
      ],
    },
    namur: {
      cityName: 'Namen',
      slug: 'namur',
      metaTitle: 'Escorts in Namen | Pinklights.be',
      metaDescription: 'Vind escorts in Namen. Bekijk profielen in de hoofdstad van het Waals Gewest.',
      heroHeadline: 'Escorts in Namen',
      heroSubtext: 'Vind begeleiders in Namen, charmante stad aan de samenvloeiing van Samber en Maas.',
      sections: [
        { heading: 'Namen, Waalse hoofdstad', text: 'Namen is de hoofdstad van het Waals Gewest. Een stad op mensenmaat die historisch erfgoed combineert met levenskwaliteit. De citadel en het voetgangerscentrum trekken bezoekers en bewoners aan. Escorts in Namen bieden persoonlijke service in een aangename omgeving.' },
        { heading: 'Eenvoudig contact', text: 'De profielen uit Namen op Pinklights.be zijn gedetailleerd en actueel. Je vindt er directe contactgegevens, aangeboden diensten en beschikbaarheid. Neem gerust contact op om een ontmoeting te regelen.' },
      ],
      faqItems: [
        { question: 'Is Namen gemakkelijk bereikbaar?', answer: 'Ja, Namen is goed bereikbaar per trein vanuit Brussel (ongeveer 1 uur) en vanuit Luik (ongeveer 50 minuten). Het station ligt in het stadscentrum.' },
        { question: 'Zijn er escorts beschikbaar in het weekend?', answer: 'Ja, veel escorts zijn beschikbaar in het weekend. Controleer de profielen voor beschikbare dagen en tijden.' },
        { question: 'Hoe weet ik of een profiel recent is?', answer: 'Recent actieve profielen worden uitgelicht in de zoekresultaten. Je kunt ook de datum van laatste activiteit op elk profiel controleren.' },
      ],
      relatedCities: [
        { title: 'Escorts in Luik', description: 'De vurige stad, op minder dan een uur.', url: '/find/liege' },
        { title: 'Escorts in Charleroi', description: 'De grote naburige stad in Henegouwen.', url: '/find/charleroi' },
        { title: 'Escorts in Brussel', description: 'Het grootste aantal profielen in Belgie.', url: '/find/brussels' },
      ],
    },
  },
  es: {
    antwerp: {
      cityName: 'Amberes',
      slug: 'antwerp',
      metaTitle: 'Escorts en Amberes | Pinklights.be',
      metaDescription: 'Encuentra escorts en Amberes. Explora perfiles verificados y contacta acompanantes en la metropoli flamenca.',
      heroHeadline: 'Escorts en Amberes',
      heroSubtext: 'Explora los perfiles disponibles en Amberes y sus alrededores. Encuentra a la persona ideal en pocos clics.',
      sections: [
        { heading: 'Amberes, metropoli del norte', text: 'Amberes es la ciudad mas grande de Flandes y un importante centro economico. Su animada vida nocturna y su caracter cosmopolita la convierten en un lugar ideal para encontrar acompanantes de calidad. El centro de la ciudad y la zona alrededor de la Estacion Central concentran gran parte de la actividad.' },
        { heading: 'Como encontrar una escort en Amberes', text: 'En Pinklights.be puedes explorar los perfiles de escorts en Amberes. Cada perfil incluye fotos, descripcion de los servicios ofrecidos y datos de contacto. No necesitas crear una cuenta para comenzar tu busqueda.' },
      ],
      faqItems: [
        { question: 'Cuantos perfiles hay disponibles en Amberes?', answer: 'El numero de perfiles varia regularmente. Consulta la pagina de busqueda para ver las escorts actualmente activas en Amberes y alrededores.' },
        { question: 'Necesito una cuenta para contactar a una escort?', answer: 'No, no se necesita cuenta. Puedes explorar perfiles y contactar directamente a las escorts a traves de los datos indicados en su perfil.' },
        { question: 'Los perfiles estan verificados?', answer: 'Fomentamos la verificacion de perfiles para garantizar su autenticidad. Busca las insignias de verificacion en los perfiles para mayor confianza.' },
      ],
      relatedCities: [
        { title: 'Escorts en Bruselas', description: 'Descubre los perfiles disponibles en la capital belga.', url: '/find/brussels' },
        { title: 'Escorts en Gante', description: 'Explora perfiles en esta dinamica ciudad universitaria.', url: '/find/ghent' },
        { title: 'Escorts en Brujas', description: 'Encuentra acompanantes en la Venecia del Norte.', url: '/find/bruges' },
      ],
    },
    brussels: {
      cityName: 'Bruselas',
      slug: 'brussels',
      metaTitle: 'Escorts en Bruselas | Pinklights.be',
      metaDescription: 'Encuentra escorts en Bruselas. Explora perfiles verificados en la capital belga y encuentra la compania ideal.',
      heroHeadline: 'Escorts en Bruselas',
      heroSubtext: 'La capital belga ofrece la mayor seleccion de perfiles. Busca y encuentra a la persona adecuada para ti.',
      sections: [
        { heading: 'Bruselas, corazon de Belgica', text: 'Bruselas es la capital de Belgica y sede de la Union Europea. Ciudad cosmopolita por excelencia, atrae visitantes de todo el mundo. Su posicion central y caracter internacional la convierten en la ciudad con mas perfiles en Pinklights.be.' },
        { heading: 'Busqueda por barrio', text: 'Bruselas esta compuesta por 19 municipios, cada uno con personalidad propia. Ya sea que estes en el centro historico, en Ixelles, Saint-Gilles o Uccle, encontraras perfiles cercanos. Usa los filtros para refinar tus resultados.' },
      ],
      faqItems: [
        { question: 'Bruselas tiene la mayor cantidad de perfiles?', answer: 'Si, como capital y ciudad mas grande del pais, Bruselas suele tener el mayor numero de perfiles activos en la plataforma.' },
        { question: 'Puedo buscar por municipio en Bruselas?', answer: 'Actualmente la busqueda se realiza a nivel de ciudad. Los perfiles suelen indicar su ubicacion mas precisa en su descripcion.' },
        { question: 'Como contacto al soporte?', answer: 'Puedes contactarnos por WhatsApp al +32 478 02 64 79 o por email a support@pink-lights.be para cualquier consulta.' },
      ],
      relatedCities: [
        { title: 'Escorts en Amberes', description: 'Descubre perfiles en la metropoli flamenca.', url: '/find/antwerp' },
        { title: 'Escorts en Lovaina', description: 'Ciudad universitaria cercana a Bruselas.', url: '/find/leuven' },
        { title: 'Escorts en Gante', description: 'Explora perfiles en la capital de Flandes Oriental.', url: '/find/ghent' },
      ],
    },
    ghent: {
      cityName: 'Gante',
      slug: 'ghent',
      metaTitle: 'Escorts en Gante | Pinklights.be',
      metaDescription: 'Encuentra escorts en Gante. Explora los perfiles disponibles en esta dinamica ciudad universitaria flamenca.',
      heroHeadline: 'Escorts en Gante',
      heroSubtext: 'Descubre los perfiles disponibles en Gante, ciudad estudiantil y cultural en el corazon de Flandes.',
      sections: [
        { heading: 'Gante, ciudad cultural', text: 'Gante es la tercera ciudad mas grande de Belgica. Conocida por su universidad y su escena cultural, combina historia medieval con modernidad. La ciudad atrae a un publico joven y dinamico, lo que se refleja en la diversidad de perfiles disponibles.' },
        { heading: 'Encontrar una escort en Gante', text: 'Pinklights.be te permite explorar facilmente los perfiles de escorts en Gante. Filtra segun tus preferencias para encontrar a la persona ideal. Los perfiles incluyen toda la informacion necesaria para contactar directamente.' },
      ],
      faqItems: [
        { question: 'Hay muchas escorts en Gante?', answer: 'Gante cuenta con un buen numero de perfiles, en parte gracias a su condicion de ciudad universitaria y turistica.' },
        { question: 'Pinklights.be es gratuito?', answer: 'La consulta de perfiles es gratuita y no requiere registro. Las escorts fijan sus propias tarifas por sus servicios.' },
        { question: 'Como verifico la autenticidad de un perfil?', answer: 'Busca los perfiles marcados como verificados. Trabajamos constantemente en mejorar nuestro proceso de verificacion.' },
      ],
      relatedCities: [
        { title: 'Escorts en Brujas', description: 'Explora perfiles en la famosa ciudad historica.', url: '/find/bruges' },
        { title: 'Escorts en Amberes', description: 'Descubre acompanantes en la metropoli portuaria.', url: '/find/antwerp' },
        { title: 'Escorts en Bruselas', description: 'La mayor seleccion de perfiles en Belgica.', url: '/find/brussels' },
      ],
    },
    bruges: {
      cityName: 'Brujas',
      slug: 'bruges',
      metaTitle: 'Escorts en Brujas | Pinklights.be',
      metaDescription: 'Encuentra escorts en Brujas. Explora perfiles en la Venecia del Norte, destino turistico popular.',
      heroHeadline: 'Escorts en Brujas',
      heroSubtext: 'Encuentra acompanantes en Brujas, la perla de Flandes Occidental.',
      sections: [
        { heading: 'Brujas, la Venecia del Norte', text: 'Brujas es una de las ciudades mas visitadas de Belgica. Su centro historico, Patrimonio de la Humanidad, atrae millones de visitantes cada ano. Para quienes buscan compania, Pinklights.be ofrece perfiles locales verificados.' },
        { heading: 'Servicios para visitantes', text: 'Muchas escorts en Brujas estan acostumbradas a un clientela internacional y hablan varios idiomas. Ya sea por negocios o por placer, encontraras perfiles que se adaptan a tus necesidades.' },
      ],
      faqItems: [
        { question: 'Las escorts en Brujas hablan varios idiomas?', answer: 'Muchas escorts en Brujas dominan el neerlandes, frances e ingles, y a veces otros idiomas. Las habilidades linguisticas suelen mencionarse en los perfiles.' },
        { question: 'Puedo encontrar una escort para un evento?', answer: 'Si, muchas escorts ofrecen servicios de acompanamiento para eventos sociales, cenas o salidas. Consulta las descripciones de los perfiles para mas detalles.' },
        { question: 'Brujas esta bien comunicada?', answer: 'Si, Brujas es facilmente accesible en tren desde Bruselas (aprox. 1 hora) y desde Gante (aprox. 30 minutos).' },
      ],
      relatedCities: [
        { title: 'Escorts en Gante', description: 'Perfiles disponibles en la ciudad vecina.', url: '/find/ghent' },
        { title: 'Escorts en Amberes', description: 'Descubre la oferta en Amberes.', url: '/find/antwerp' },
        { title: 'Escorts en Bruselas', description: 'La mayor seleccion en la capital.', url: '/find/brussels' },
      ],
    },
    liege: {
      cityName: 'Lieja',
      slug: 'liege',
      metaTitle: 'Escorts en Lieja | Pinklights.be',
      metaDescription: 'Encuentra escorts en Lieja. Explora perfiles en la ciudad ardiente, corazon de Valonia.',
      heroHeadline: 'Escorts en Lieja',
      heroSubtext: 'Descubre los perfiles disponibles en Lieja, la ciudad ardiente.',
      sections: [
        { heading: 'Lieja, ciudad calida', text: 'Lieja es la ciudad mas grande de Valonia y un cruce importante entre Belgica, Alemania y los Paises Bajos. Su ambiente acogedor y su famosa vida nocturna la convierten en un destino apreciado. La ciudad ofrece un buen numero de perfiles en Pinklights.be.' },
        { heading: 'Le Carre y la vida nocturna', text: 'El barrio de Le Carre en Lieja es famoso por su concentracion de bares y restaurantes. Es un punto de partida ideal para una noche. Las escorts de Lieja conocen bien la ciudad y pueden recomendarte los mejores lugares.' },
      ],
      faqItems: [
        { question: 'La mayoria de escorts en Lieja hablan frances?', answer: 'Si, al ser Lieja una ciudad francofona, la gran mayoria de las escorts hablan frances con fluidez.' },
        { question: 'Lieja esta cerca de otras grandes ciudades?', answer: 'Si, Lieja esta a aproximadamente 1 hora en tren de Bruselas y cerca de la frontera con Alemania y los Paises Bajos.' },
        { question: 'Como son las tarifas en Lieja?', answer: 'Las tarifas varian entre escorts. Cada perfil indica sus propias condiciones. Nosotros no fijamos los precios.' },
      ],
      relatedCities: [
        { title: 'Escorts en Namur', description: 'Perfiles en la capital valona.', url: '/find/namur' },
        { title: 'Escorts en Charleroi', description: 'Descubre perfiles en el Pays Noir.', url: '/find/charleroi' },
        { title: 'Escorts en Bruselas', description: 'La mayor seleccion en Belgica.', url: '/find/brussels' },
      ],
    },
    leuven: {
      cityName: 'Lovaina',
      slug: 'leuven',
      metaTitle: 'Escorts en Lovaina | Pinklights.be',
      metaDescription: 'Encuentra escorts en Lovaina. Explora perfiles en esta ciudad universitaria cercana a Bruselas.',
      heroHeadline: 'Escorts en Lovaina',
      heroSubtext: 'Encuentra acompanantes en Lovaina, animada ciudad universitaria del Brabante Flamenco.',
      sections: [
        { heading: 'Lovaina, ciudad del saber', text: 'Lovaina alberga la KU Leuven, una de las universidades mas antiguas de Europa. Esta ciudad compacta pero dinamica se encuentra a solo 25 minutos en tren de Bruselas, lo que la convierte en una ubicacion practica con un ambiente unico.' },
        { heading: 'Explorar perfiles', text: 'Las escorts en Lovaina son facilmente accesibles a traves de Pinklights.be. La proximidad con Bruselas significa que tambien puedes encontrar escorts dispuestas a desplazarse entre ambas ciudades.' },
      ],
      faqItems: [
        { question: 'Lovaina esta cerca de Bruselas?', answer: 'Si, Lovaina esta a unos 25 minutos en tren de Bruselas-Central, lo que hace que desplazarse entre ambas ciudades sea muy facil.' },
        { question: 'Hay escorts disponibles por la noche?', answer: 'Si, muchas escorts estan disponibles por la noche. Consulta los perfiles para horarios de disponibilidad o contactalas directamente.' },
        { question: 'Puedo contactar a una escort por WhatsApp?', answer: 'Depende de cada escort. Algunas prefieren llamadas, otras mensajes. Los medios de contacto se indican en cada perfil.' },
      ],
      relatedCities: [
        { title: 'Escorts en Bruselas', description: 'La capital, a pocos minutos en tren.', url: '/find/brussels' },
        { title: 'Escorts en Amberes', description: 'La metropoli flamenca al norte.', url: '/find/antwerp' },
        { title: 'Escorts en Gante', description: 'Otra ciudad universitaria de Flandes.', url: '/find/ghent' },
      ],
    },
    charleroi: {
      cityName: 'Charleroi',
      slug: 'charleroi',
      metaTitle: 'Escorts en Charleroi | Pinklights.be',
      metaDescription: 'Encuentra escorts en Charleroi. Explora los perfiles disponibles en esta gran ciudad valona.',
      heroHeadline: 'Escorts en Charleroi',
      heroSubtext: 'Descubre los perfiles disponibles en Charleroi y la region de Henao.',
      sections: [
        { heading: 'Charleroi, ciudad en renovacion', text: 'Charleroi es la tercera ciudad mas grande de Belgica por poblacion. En plena renovacion urbana, ofrece cada vez mas atractivos. La presencia del aeropuerto de Bruselas-Sur cerca de la ciudad atrae a numerosos viajeros.' },
        { heading: 'Encontrar perfiles en Charleroi', text: 'En Pinklights.be puedes filtrar perfiles por ubicacion para encontrar escorts en Charleroi o en Henao. Cada perfil incluye toda la informacion necesaria para un primer contacto.' },
      ],
      faqItems: [
        { question: 'El aeropuerto de Charleroi esta cerca del centro?', answer: 'El aeropuerto de Bruselas-Sur (Charleroi) esta a unos 10 km del centro de la ciudad, accesible en lanzadera o taxi.' },
        { question: 'Puedo encontrar escorts cerca del aeropuerto?', answer: 'Si, varias escorts en Charleroi y alrededores son facilmente accesibles desde el aeropuerto.' },
        { question: 'Charleroi esta lejos de Bruselas?', answer: 'Charleroi esta a aproximadamente 1 hora en tren de Bruselas, lo que te permite consultar tambien los perfiles de Bruselas si lo deseas.' },
      ],
      relatedCities: [
        { title: 'Escorts en Namur', description: 'La capital valona muy cerca.', url: '/find/namur' },
        { title: 'Escorts en Lieja', description: 'La otra gran ciudad de Valonia.', url: '/find/liege' },
        { title: 'Escorts en Bruselas', description: 'La mayor seleccion en Belgica.', url: '/find/brussels' },
      ],
    },
    namur: {
      cityName: 'Namur',
      slug: 'namur',
      metaTitle: 'Escorts en Namur | Pinklights.be',
      metaDescription: 'Encuentra escorts en Namur. Explora perfiles en la capital de la Region Valona.',
      heroHeadline: 'Escorts en Namur',
      heroSubtext: 'Encuentra acompanantes en Namur, encantadora ciudad en la confluencia del Sambre y el Mosa.',
      sections: [
        { heading: 'Namur, capital valona', text: 'Namur es la capital de la Region Valona. Ciudad a escala humana, combina patrimonio historico con calidad de vida. Su ciudadela y centro peatonal atraen visitantes y residentes. Las escorts en Namur ofrecen un servicio personalizado en un entorno agradable.' },
        { heading: 'Facilidad de contacto', text: 'Los perfiles de Namur en Pinklights.be son detallados y actualizados. Encontraras datos de contacto directos, servicios ofrecidos y disponibilidad. No dudes en contactar para organizar un encuentro.' },
      ],
      faqItems: [
        { question: 'Namur es facilmente accesible?', answer: 'Si, Namur esta bien comunicada por tren desde Bruselas (aprox. 1 hora) y desde Lieja (aprox. 50 minutos). La estacion esta en pleno centro.' },
        { question: 'Hay escorts disponibles los fines de semana?', answer: 'Si, muchas escorts estan disponibles los fines de semana. Consulta los perfiles para dias y horarios de disponibilidad.' },
        { question: 'Como se si un perfil es reciente?', answer: 'Los perfiles recientemente activos se destacan en los resultados de busqueda. Tambien puedes verificar la fecha de ultima actividad en cada perfil.' },
      ],
      relatedCities: [
        { title: 'Escorts en Lieja', description: 'La ciudad ardiente, a menos de una hora.', url: '/find/liege' },
        { title: 'Escorts en Charleroi', description: 'La gran ciudad vecina de Henao.', url: '/find/charleroi' },
        { title: 'Escorts en Bruselas', description: 'El mayor numero de perfiles en Belgica.', url: '/find/brussels' },
      ],
    },
  },
  pt: {
    antwerp: {
      cityName: 'Antuérpia',
      slug: 'antwerp',
      metaTitle: 'Acompanhantes em Antuérpia | Pinklights.be',
      metaDescription: 'Encontre acompanhantes em Antuérpia. Explore perfis verificados e contacte profissionais na metropole flamenga.',
      heroHeadline: 'Acompanhantes em Antuérpia',
      heroSubtext: 'Explore os perfis disponiveis em Antuérpia e arredores. Encontre a pessoa ideal em poucos cliques.',
      sections: [
        { heading: 'Antuérpia, metropole do norte', text: 'Antuérpia e a maior cidade da Flandres e um importante centro economico. A sua vida noturna animada e o seu carater cosmopolita tornam-na um lugar ideal para encontrar acompanhantes de qualidade. O centro da cidade e a zona em torno da Estacao Central concentram grande parte da atividade.' },
        { heading: 'Como encontrar uma acompanhante em Antuérpia', text: 'No Pinklights.be pode explorar os perfis de acompanhantes em Antuérpia. Cada perfil inclui fotos, descricao dos servicos oferecidos e dados de contacto. Nao precisa de criar uma conta para comecar a sua pesquisa.' },
      ],
      faqItems: [
        { question: 'Quantos perfis estao disponiveis em Antuérpia?', answer: 'O numero de perfis varia regularmente. Consulte a pagina de pesquisa para ver as acompanhantes atualmente ativas em Antuérpia e arredores.' },
        { question: 'Preciso de uma conta para contactar uma acompanhante?', answer: 'Nao, nao e necessaria qualquer conta. Pode explorar perfis e contactar diretamente as acompanhantes atraves dos dados indicados no seu perfil.' },
        { question: 'Os perfis sao verificados?', answer: 'Incentivamos a verificacao de perfis para garantir a autenticidade. Procure os selos de verificacao nos perfis para maior confianca.' },
      ],
      relatedCities: [
        { title: 'Acompanhantes em Bruxelas', description: 'Descubra os perfis disponiveis na capital belga.', url: '/find/brussels' },
        { title: 'Acompanhantes em Gante', description: 'Explore perfis nesta dinamica cidade universitaria.', url: '/find/ghent' },
        { title: 'Acompanhantes em Bruges', description: 'Encontre profissionais na Veneza do Norte.', url: '/find/bruges' },
      ],
    },
    brussels: {
      cityName: 'Bruxelas',
      slug: 'brussels',
      metaTitle: 'Acompanhantes em Bruxelas | Pinklights.be',
      metaDescription: 'Encontre acompanhantes em Bruxelas. Explore perfis verificados na capital belga e encontre a companhia ideal.',
      heroHeadline: 'Acompanhantes em Bruxelas',
      heroSubtext: 'A capital belga oferece a maior selecao de perfis. Pesquise e encontre a pessoa certa para si.',
      sections: [
        { heading: 'Bruxelas, coracao da Belgica', text: 'Bruxelas e a capital da Belgica e sede da Uniao Europeia. Cidade cosmopolita por excelencia, atrai visitantes de todo o mundo. A sua posicao central e carater internacional fazem dela a cidade com mais perfis no Pinklights.be.' },
        { heading: 'Pesquisa por bairro', text: 'Bruxelas e composta por 19 municipios, cada um com personalidade propria. Esteja no centro historico, em Ixelles, Saint-Gilles ou Uccle, encontrara perfis proximos. Use os filtros para refinar os resultados.' },
      ],
      faqItems: [
        { question: 'Bruxelas tem o maior numero de perfis?', answer: 'Sim, como capital e maior cidade do pais, Bruxelas costuma ter o maior numero de perfis ativos na plataforma.' },
        { question: 'Posso pesquisar por municipio em Bruxelas?', answer: 'Atualmente a pesquisa e feita ao nivel da cidade. Os perfis costumam indicar a sua localizacao mais precisa na descricao.' },
        { question: 'Como contacto o suporte?', answer: 'Pode contactar-nos por WhatsApp no +32 478 02 64 79 ou por email em support@pink-lights.be para qualquer questao.' },
      ],
      relatedCities: [
        { title: 'Acompanhantes em Antuérpia', description: 'Descubra perfis na metropole flamenga.', url: '/find/antwerp' },
        { title: 'Acompanhantes em Lovaina', description: 'Cidade universitaria perto de Bruxelas.', url: '/find/leuven' },
        { title: 'Acompanhantes em Gante', description: 'Explore perfis na capital da Flandres Oriental.', url: '/find/ghent' },
      ],
    },
    ghent: {
      cityName: 'Gante',
      slug: 'ghent',
      metaTitle: 'Acompanhantes em Gante | Pinklights.be',
      metaDescription: 'Encontre acompanhantes em Gante. Explore perfis disponiveis nesta dinamica cidade universitaria flamenga.',
      heroHeadline: 'Acompanhantes em Gante',
      heroSubtext: 'Descubra os perfis disponiveis em Gante, cidade estudantil e cultural no coracao da Flandres.',
      sections: [
        { heading: 'Gante, cidade cultural', text: 'Gante e a terceira maior cidade da Belgica. Conhecida pela sua universidade e cena cultural, combina historia medieval com modernidade. A cidade atrai um publico jovem e dinamico, o que se reflete na diversidade dos perfis disponiveis.' },
        { heading: 'Encontrar uma acompanhante em Gante', text: 'O Pinklights.be permite-lhe explorar facilmente os perfis de acompanhantes em Gante. Filtre segundo as suas preferencias para encontrar a pessoa ideal. Os perfis incluem toda a informacao necessaria para contacto direto.' },
      ],
      faqItems: [
        { question: 'Ha muitas acompanhantes em Gante?', answer: 'Gante tem um bom numero de perfis, em parte gracas ao seu estatuto de cidade universitaria e turistica.' },
        { question: 'O Pinklights.be e gratuito?', answer: 'A consulta de perfis e gratuita e nao requer registo. As acompanhantes definem as suas proprias tarifas pelos seus servicos.' },
        { question: 'Como verifico a autenticidade de um perfil?', answer: 'Procure perfis marcados como verificados. Trabalhamos constantemente para melhorar o nosso processo de verificacao.' },
      ],
      relatedCities: [
        { title: 'Acompanhantes em Bruges', description: 'Explore perfis na famosa cidade historica.', url: '/find/bruges' },
        { title: 'Acompanhantes em Antuérpia', description: 'Descubra profissionais na metropole portuaria.', url: '/find/antwerp' },
        { title: 'Acompanhantes em Bruxelas', description: 'A maior selecao de perfis na Belgica.', url: '/find/brussels' },
      ],
    },
    bruges: {
      cityName: 'Bruges',
      slug: 'bruges',
      metaTitle: 'Acompanhantes em Bruges | Pinklights.be',
      metaDescription: 'Encontre acompanhantes em Bruges. Explore perfis na Veneza do Norte, destino turistico popular.',
      heroHeadline: 'Acompanhantes em Bruges',
      heroSubtext: 'Encontre profissionais em Bruges, a perola da Flandres Ocidental.',
      sections: [
        { heading: 'Bruges, a Veneza do Norte', text: 'Bruges e uma das cidades mais visitadas da Belgica. O seu centro historico, classificado como Patrimonio Mundial, atrai milhoes de visitantes por ano. Para quem procura companhia, o Pinklights.be oferece perfis locais verificados.' },
        { heading: 'Servicos para visitantes', text: 'Muitas acompanhantes em Bruges estao habituadas a uma clientela internacional e falam varios idiomas. Seja em viagem de negocios ou de lazer, encontrara perfis adequados as suas necessidades.' },
      ],
      faqItems: [
        { question: 'As acompanhantes em Bruges falam varios idiomas?', answer: 'Muitas acompanhantes em Bruges dominam o neerlandes, frances e ingles, e por vezes outros idiomas. As competencias linguisticas sao frequentemente mencionadas nos perfis.' },
        { question: 'Posso encontrar uma acompanhante para um evento?', answer: 'Sim, muitas acompanhantes oferecem servicos de acompanhamento para eventos sociais, jantares ou saidas. Consulte as descricoes dos perfis para mais detalhes.' },
        { question: 'Bruges e bem servida por transportes?', answer: 'Sim, Bruges e facilmente acessivel de comboio a partir de Bruxelas (cerca de 1 hora) e de Gante (cerca de 30 minutos).' },
      ],
      relatedCities: [
        { title: 'Acompanhantes em Gante', description: 'Perfis disponiveis na cidade vizinha.', url: '/find/ghent' },
        { title: 'Acompanhantes em Antuérpia', description: 'Descubra a oferta em Antuérpia.', url: '/find/antwerp' },
        { title: 'Acompanhantes em Bruxelas', description: 'A maior selecao na capital.', url: '/find/brussels' },
      ],
    },
    liege: {
      cityName: 'Liege',
      slug: 'liege',
      metaTitle: 'Acompanhantes em Liege | Pinklights.be',
      metaDescription: 'Encontre acompanhantes em Liege. Explore perfis na cidade ardente, coracao da Valonia.',
      heroHeadline: 'Acompanhantes em Liege',
      heroSubtext: 'Descubra os perfis disponiveis em Liege, a cidade ardente.',
      sections: [
        { heading: 'Liege, cidade calorosa', text: 'Liege e a maior cidade da Valonia e um cruzamento importante entre a Belgica, a Alemanha e os Paises Baixos. O seu ambiente acolhedor e a sua famosa vida noturna tornam-na um destino apreciado. A cidade oferece um bom numero de perfis no Pinklights.be.' },
        { heading: 'Le Carre e a vida noturna', text: 'O bairro Le Carre em Liege e famoso pela concentracao de bares e restaurantes. E um ponto de partida ideal para uma noite. As acompanhantes de Liege conhecem bem a cidade e podem recomendar-lhe os melhores locais.' },
      ],
      faqItems: [
        { question: 'A maioria das acompanhantes em Liege fala frances?', answer: 'Sim, sendo Liege uma cidade francofona, a grande maioria das acompanhantes fala frances fluentemente.' },
        { question: 'Liege fica perto de outras grandes cidades?', answer: 'Sim, Liege fica a aproximadamente 1 hora de comboio de Bruxelas e perto da fronteira com a Alemanha e os Paises Baixos.' },
        { question: 'Como sao as tarifas em Liege?', answer: 'As tarifas variam entre acompanhantes. Cada perfil indica as suas proprias condicoes. Nos nao fixamos os precos.' },
      ],
      relatedCities: [
        { title: 'Acompanhantes em Namur', description: 'Perfis na capital valona.', url: '/find/namur' },
        { title: 'Acompanhantes em Charleroi', description: 'Descubra perfis no Pays Noir.', url: '/find/charleroi' },
        { title: 'Acompanhantes em Bruxelas', description: 'A maior selecao na Belgica.', url: '/find/brussels' },
      ],
    },
    leuven: {
      cityName: 'Lovaina',
      slug: 'leuven',
      metaTitle: 'Acompanhantes em Lovaina | Pinklights.be',
      metaDescription: 'Encontre acompanhantes em Lovaina. Explore perfis nesta cidade universitaria perto de Bruxelas.',
      heroHeadline: 'Acompanhantes em Lovaina',
      heroSubtext: 'Encontre profissionais em Lovaina, animada cidade universitaria do Brabante Flamengo.',
      sections: [
        { heading: 'Lovaina, cidade do saber', text: 'Lovaina alberga a KU Leuven, uma das universidades mais antigas da Europa. Esta cidade compacta mas dinamica fica a apenas 25 minutos de comboio de Bruxelas, o que a torna uma localizacao pratica com uma atmosfera unica.' },
        { heading: 'Explorar perfis', text: 'As acompanhantes em Lovaina sao facilmente acessiveis atraves do Pinklights.be. A proximidade com Bruxelas significa que tambem pode encontrar acompanhantes dispostas a deslocar-se entre as duas cidades.' },
      ],
      faqItems: [
        { question: 'Lovaina fica perto de Bruxelas?', answer: 'Sim, Lovaina fica a cerca de 25 minutos de comboio de Bruxelas-Central, tornando as deslocacoes entre as duas cidades muito faceis.' },
        { question: 'Ha acompanhantes disponiveis a noite?', answer: 'Sim, muitas acompanhantes estao disponiveis a noite. Consulte os perfis para horarios de disponibilidade ou contacte-as diretamente.' },
        { question: 'Posso contactar uma acompanhante por WhatsApp?', answer: 'Depende de cada acompanhante. Algumas preferem chamadas, outras mensagens. Os meios de contacto estao indicados em cada perfil.' },
      ],
      relatedCities: [
        { title: 'Acompanhantes em Bruxelas', description: 'A capital, a poucos minutos de comboio.', url: '/find/brussels' },
        { title: 'Acompanhantes em Antuérpia', description: 'A metropole flamenga a norte.', url: '/find/antwerp' },
        { title: 'Acompanhantes em Gante', description: 'Outra cidade universitaria da Flandres.', url: '/find/ghent' },
      ],
    },
    charleroi: {
      cityName: 'Charleroi',
      slug: 'charleroi',
      metaTitle: 'Acompanhantes em Charleroi | Pinklights.be',
      metaDescription: 'Encontre acompanhantes em Charleroi. Explore os perfis disponiveis nesta grande cidade valona.',
      heroHeadline: 'Acompanhantes em Charleroi',
      heroSubtext: 'Descubra os perfis disponiveis em Charleroi e na regiao de Hainaut.',
      sections: [
        { heading: 'Charleroi, cidade em renovacao', text: 'Charleroi e a terceira maior cidade da Belgica por populacao. Em plena renovacao urbana, oferece cada vez mais atrativos. A presenca do aeroporto de Bruxelas-Sul nas proximidades atrai tambem numerosos viajantes.' },
        { heading: 'Encontrar perfis em Charleroi', text: 'No Pinklights.be pode filtrar perfis por localizacao para encontrar acompanhantes em Charleroi ou no Hainaut. Cada perfil inclui toda a informacao necessaria para um primeiro contacto.' },
      ],
      faqItems: [
        { question: 'O aeroporto de Charleroi fica perto do centro?', answer: 'O aeroporto de Bruxelas-Sul (Charleroi) fica a cerca de 10 km do centro da cidade, acessivel por shuttle ou taxi.' },
        { question: 'Posso encontrar acompanhantes perto do aeroporto?', answer: 'Sim, varias acompanhantes em Charleroi e arredores sao facilmente acessiveis a partir do aeroporto.' },
        { question: 'Charleroi fica longe de Bruxelas?', answer: 'Charleroi fica a aproximadamente 1 hora de comboio de Bruxelas, permitindo-lhe tambem consultar os perfis de Bruxelas se desejar.' },
      ],
      relatedCities: [
        { title: 'Acompanhantes em Namur', description: 'A capital valona bem perto.', url: '/find/namur' },
        { title: 'Acompanhantes em Liege', description: 'A outra grande cidade da Valonia.', url: '/find/liege' },
        { title: 'Acompanhantes em Bruxelas', description: 'A maior selecao na Belgica.', url: '/find/brussels' },
      ],
    },
    namur: {
      cityName: 'Namur',
      slug: 'namur',
      metaTitle: 'Acompanhantes em Namur | Pinklights.be',
      metaDescription: 'Encontre acompanhantes em Namur. Explore perfis na capital da Regiao Valona.',
      heroHeadline: 'Acompanhantes em Namur',
      heroSubtext: 'Encontre profissionais em Namur, encantadora cidade na confluencia do Sambre e do Mosa.',
      sections: [
        { heading: 'Namur, capital valona', text: 'Namur e a capital da Regiao Valona. Cidade a escala humana, combina patrimonio historico com qualidade de vida. A sua cidadela e centro pedonal atraem visitantes e residentes. As acompanhantes em Namur oferecem um servico personalizado num ambiente agradavel.' },
        { heading: 'Facilidade de contacto', text: 'Os perfis de Namur no Pinklights.be sao detalhados e atualizados. Encontrara dados de contacto diretos, servicos oferecidos e disponibilidade. Nao hesite em contactar para organizar um encontro.' },
      ],
      faqItems: [
        { question: 'Namur e facilmente acessivel?', answer: 'Sim, Namur e bem servida por comboio a partir de Bruxelas (cerca de 1 hora) e de Liege (cerca de 50 minutos). A estacao fica em pleno centro.' },
        { question: 'Ha acompanhantes disponiveis ao fim de semana?', answer: 'Sim, muitas acompanhantes estao disponiveis ao fim de semana. Verifique os perfis para dias e horarios de disponibilidade.' },
        { question: 'Como sei se um perfil e recente?', answer: 'Os perfis recentemente ativos sao destacados nos resultados de pesquisa. Pode tambem verificar a data de ultima atividade em cada perfil.' },
      ],
      relatedCities: [
        { title: 'Acompanhantes em Liege', description: 'A cidade ardente, a menos de uma hora.', url: '/find/liege' },
        { title: 'Acompanhantes em Charleroi', description: 'A grande cidade vizinha do Hainaut.', url: '/find/charleroi' },
        { title: 'Acompanhantes em Bruxelas', description: 'O maior numero de perfis na Belgica.', url: '/find/brussels' },
      ],
    },
  },
  ru: {
    antwerp: {
      cityName: 'Антверпен',
      slug: 'antwerp',
      metaTitle: 'Эскорт в Антверпене | Pinklights.be',
      metaDescription: 'Найдите эскорт в Антверпене. Просматривайте проверенные профили и связывайтесь со спутницами во фламандской столице.',
      heroHeadline: 'Эскорт в Антверпене',
      heroSubtext: 'Просматривайте доступные профили в Антверпене и окрестностях. Найдите подходящего человека за несколько кликов.',
      sections: [
        { heading: 'Антверпен - северная столица', text: 'Антверпен - крупнейший город Фландрии и важный экономический центр. Оживленная ночная жизнь и космополитичный характер делают его идеальным местом для поиска качественного эскорта. Центр города и район вокруг Центрального вокзала сосредотачивают основную активность.' },
        { heading: 'Как найти эскорт в Антверпене', text: 'На Pinklights.be вы можете просматривать профили эскорта в Антверпене. Каждый профиль включает фотографии, описание предлагаемых услуг и контактные данные. Вам не нужно создавать аккаунт для начала поиска.' },
      ],
      faqItems: [
        { question: 'Сколько профилей доступно в Антверпене?', answer: 'Количество профилей регулярно меняется. Посетите страницу поиска, чтобы увидеть активных на данный момент эскорт в Антверпене и окрестностях.' },
        { question: 'Нужен ли аккаунт для связи с эскортом?', answer: 'Нет, аккаунт не требуется. Вы можете просматривать профили и связываться напрямую через контактные данные, указанные в профиле.' },
        { question: 'Профили проверены?', answer: 'Мы поощряем верификацию профилей для гарантии подлинности. Ищите значки верификации на профилях для большей уверенности.' },
      ],
      relatedCities: [
        { title: 'Эскорт в Брюсселе', description: 'Откройте для себя профили в бельгийской столице.', url: '/find/brussels' },
        { title: 'Эскорт в Генте', description: 'Просматривайте профили в динамичном университетском городе.', url: '/find/ghent' },
        { title: 'Эскорт в Брюгге', description: 'Найдите спутниц в Северной Венеции.', url: '/find/bruges' },
      ],
    },
    brussels: {
      cityName: 'Брюссель',
      slug: 'brussels',
      metaTitle: 'Эскорт в Брюсселе | Pinklights.be',
      metaDescription: 'Найдите эскорт в Брюсселе. Просматривайте проверенные профили в столице Бельгии и найдите идеальную компанию.',
      heroHeadline: 'Эскорт в Брюсселе',
      heroSubtext: 'Столица Бельгии предлагает самый большой выбор профилей. Ищите и находите подходящего человека.',
      sections: [
        { heading: 'Брюссель - сердце Бельгии', text: 'Брюссель - столица Бельгии и штаб-квартира Европейского союза. Космополитичный город привлекает посетителей со всего мира. Центральное расположение и международный характер обеспечивают наибольшее количество профилей на Pinklights.be.' },
        { heading: 'Поиск по районам', text: 'Брюссель состоит из 19 коммун, каждая со своим характером. Находитесь ли вы в историческом центре, в Икселе, Сен-Жиле или Юкле - вы найдете профили поблизости. Используйте фильтры для уточнения результатов.' },
      ],
      faqItems: [
        { question: 'В Брюсселе больше всего профилей?', answer: 'Да, как столица и крупнейший город страны, Брюссель обычно имеет наибольшее количество активных профилей на платформе.' },
        { question: 'Можно ли искать по коммуне в Брюсселе?', answer: 'Сейчас поиск осуществляется на уровне города. Профили часто указывают более точное расположение в своем описании.' },
        { question: 'Как связаться с поддержкой?', answer: 'Вы можете связаться с нами через WhatsApp по номеру +32 478 02 64 79 или по email support@pink-lights.be по любым вопросам.' },
      ],
      relatedCities: [
        { title: 'Эскорт в Антверпене', description: 'Откройте для себя профили во фламандской столице.', url: '/find/antwerp' },
        { title: 'Эскорт в Лёвене', description: 'Университетский город рядом с Брюсселем.', url: '/find/leuven' },
        { title: 'Эскорт в Генте', description: 'Исследуйте профили в столице Восточной Фландрии.', url: '/find/ghent' },
      ],
    },
    ghent: {
      cityName: 'Гент',
      slug: 'ghent',
      metaTitle: 'Эскорт в Генте | Pinklights.be',
      metaDescription: 'Найдите эскорт в Генте. Просматривайте доступные профили в динамичном фламандском университетском городе.',
      heroHeadline: 'Эскорт в Генте',
      heroSubtext: 'Откройте для себя доступные профили в Генте - студенческом и культурном городе в сердце Фландрии.',
      sections: [
        { heading: 'Гент - культурный город', text: 'Гент - третий по величине город Бельгии. Известный своим университетом и культурной сценой, он сочетает средневековую историю с современностью. Город привлекает молодую и динамичную аудиторию, что отражается в разнообразии доступных профилей.' },
        { heading: 'Найти эскорт в Генте', text: 'Pinklights.be позволяет легко просматривать профили эскорта в Генте. Фильтруйте по своим предпочтениям, чтобы найти идеального человека. Профили содержат всю необходимую информацию для прямого контакта.' },
      ],
      faqItems: [
        { question: 'Много ли эскорта в Генте?', answer: 'В Генте хорошее количество профилей, во многом благодаря статусу университетского и туристического города.' },
        { question: 'Pinklights.be бесплатный?', answer: 'Просмотр профилей бесплатен и не требует регистрации. Эскорт сами устанавливают свои тарифы за свои услуги.' },
        { question: 'Как проверить подлинность профиля?', answer: 'Ищите профили, отмеченные как верифицированные. Мы постоянно работаем над улучшением процесса верификации.' },
      ],
      relatedCities: [
        { title: 'Эскорт в Брюгге', description: 'Исследуйте профили в знаменитом историческом городе.', url: '/find/bruges' },
        { title: 'Эскорт в Антверпене', description: 'Откройте для себя спутниц в портовой столице.', url: '/find/antwerp' },
        { title: 'Эскорт в Брюсселе', description: 'Самый большой выбор профилей в Бельгии.', url: '/find/brussels' },
      ],
    },
    bruges: {
      cityName: 'Брюгге',
      slug: 'bruges',
      metaTitle: 'Эскорт в Брюгге | Pinklights.be',
      metaDescription: 'Найдите эскорт в Брюгге. Просматривайте профили в Северной Венеции - популярном туристическом направлении.',
      heroHeadline: 'Эскорт в Брюгге',
      heroSubtext: 'Найдите спутниц в Брюгге - жемчужине Западной Фландрии.',
      sections: [
        { heading: 'Брюгге - Северная Венеция', text: 'Брюгге - один из самых посещаемых городов Бельгии. Его исторический центр, включенный в список Всемирного наследия ЮНЕСКО, ежегодно привлекает миллионы посетителей. Для путешественников, ищущих компанию, Pinklights.be предлагает проверенные местные профили.' },
        { heading: 'Услуги для посетителей', text: 'Многие эскорт в Брюгге привыкли к международной клиентуре и владеют несколькими языками. Будь вы в деловой поездке или на отдыхе, вы найдете профили, соответствующие вашим потребностям.' },
      ],
      faqItems: [
        { question: 'Эскорт в Брюгге владеют несколькими языками?', answer: 'Многие эскорт в Брюгге владеют нидерландским, французским и английским, а иногда и другими языками. Языковые навыки часто указаны в профилях.' },
        { question: 'Могу ли я найти эскорт для мероприятия?', answer: 'Да, многие эскорт предлагают услуги сопровождения на социальных мероприятиях, ужинах или вечеринках. Подробности смотрите в описаниях профилей.' },
        { question: 'Брюгге хорошо связан транспортом?', answer: 'Да, Брюгге легко добраться на поезде из Брюсселя (около 1 часа) и из Гента (около 30 минут).' },
      ],
      relatedCities: [
        { title: 'Эскорт в Генте', description: 'Доступные профили в соседнем городе.', url: '/find/ghent' },
        { title: 'Эскорт в Антверпене', description: 'Откройте для себя предложения Антверпена.', url: '/find/antwerp' },
        { title: 'Эскорт в Брюсселе', description: 'Самый большой выбор в столице.', url: '/find/brussels' },
      ],
    },
    liege: {
      cityName: 'Льеж',
      slug: 'liege',
      metaTitle: 'Эскорт в Льеже | Pinklights.be',
      metaDescription: 'Найдите эскорт в Льеже. Просматривайте профили в пылающем городе - сердце Валлонии.',
      heroHeadline: 'Эскорт в Льеже',
      heroSubtext: 'Откройте для себя доступные профили в Льеже - пылающем городе.',
      sections: [
        { heading: 'Льеж - теплый город', text: 'Льеж - крупнейший город Валлонии и важный перекресток между Бельгией, Германией и Нидерландами. Дружелюбная атмосфера и известная ночная жизнь делают его привлекательным направлением. Город предлагает хорошее количество профилей на Pinklights.be.' },
        { heading: 'Le Carre и ночная жизнь', text: 'Район Le Carre в Льеже знаменит концентрацией баров и ресторанов. Это идеальная отправная точка для вечернего отдыха. Эскорт из Льежа хорошо знают город и могут порекомендовать лучшие места.' },
      ],
      faqItems: [
        { question: 'Большинство эскорт в Льеже говорят по-французски?', answer: 'Да, поскольку Льеж - франкоязычный город, подавляющее большинство эскорт свободно говорят по-французски.' },
        { question: 'Льеж находится рядом с другими крупными городами?', answer: 'Да, Льеж находится примерно в 1 часе езды на поезде от Брюсселя и недалеко от границы с Германией и Нидерландами.' },
        { question: 'Какие тарифы в Льеже?', answer: 'Тарифы варьируются от эскорта к эскорту. Каждый профиль указывает свои собственные условия. Мы не устанавливаем цены.' },
      ],
      relatedCities: [
        { title: 'Эскорт в Намюре', description: 'Профили в валлонской столице.', url: '/find/namur' },
        { title: 'Эскорт в Шарлеруа', description: 'Откройте для себя профили в Pays Noir.', url: '/find/charleroi' },
        { title: 'Эскорт в Брюсселе', description: 'Самый большой выбор в Бельгии.', url: '/find/brussels' },
      ],
    },
    leuven: {
      cityName: 'Лёвен',
      slug: 'leuven',
      metaTitle: 'Эскорт в Лёвене | Pinklights.be',
      metaDescription: 'Найдите эскорт в Лёвене. Просматривайте профили в университетском городе рядом с Брюсселем.',
      heroHeadline: 'Эскорт в Лёвене',
      heroSubtext: 'Найдите спутниц в Лёвене - оживленном университетском городе Фламандского Брабанта.',
      sections: [
        { heading: 'Лёвен - город знаний', text: 'Лёвен - дом KU Leuven, одного из старейших университетов Европы. Этот компактный, но динамичный город находится всего в 25 минутах на поезде от Брюсселя, что делает его удобным местом с уникальной атмосферой.' },
        { heading: 'Просмотр профилей', text: 'Эскорт в Лёвене легко доступны через Pinklights.be. Близость к Брюсселю также означает, что вы можете найти эскорт, готовых перемещаться между двумя городами.' },
      ],
      faqItems: [
        { question: 'Лёвен рядом с Брюсселем?', answer: 'Да, Лёвен находится примерно в 25 минутах на поезде от Брюсселя-Центрального, что делает перемещение между городами очень простым.' },
        { question: 'Есть ли эскорт, доступные вечером?', answer: 'Да, многие эскорт доступны в вечернее время. Проверьте профили для уточнения времени доступности или свяжитесь напрямую.' },
        { question: 'Могу ли я связаться с эскортом через WhatsApp?', answer: 'Это зависит от конкретного эскорта. Некоторые предпочитают звонки, другие - сообщения. Способы связи указаны в каждом профиле.' },
      ],
      relatedCities: [
        { title: 'Эскорт в Брюсселе', description: 'Столица, в нескольких минутах на поезде.', url: '/find/brussels' },
        { title: 'Эскорт в Антверпене', description: 'Фламандская столица на севере.', url: '/find/antwerp' },
        { title: 'Эскорт в Генте', description: 'Другой университетский город Фландрии.', url: '/find/ghent' },
      ],
    },
    charleroi: {
      cityName: 'Шарлеруа',
      slug: 'charleroi',
      metaTitle: 'Эскорт в Шарлеруа | Pinklights.be',
      metaDescription: 'Найдите эскорт в Шарлеруа. Просматривайте доступные профили в этом крупном валлонском городе.',
      heroHeadline: 'Эскорт в Шарлеруа',
      heroSubtext: 'Откройте для себя доступные профили в Шарлеруа и регионе Эно.',
      sections: [
        { heading: 'Шарлеруа - город обновления', text: 'Шарлеруа - третий по населению город Бельгии. Находясь в процессе городского обновления, он предлагает все больше привлекательности. Близость аэропорта Брюссель-Юг также привлекает многих путешественников.' },
        { heading: 'Поиск профилей в Шарлеруа', text: 'На Pinklights.be вы можете фильтровать профили по расположению, чтобы найти эскорт в Шарлеруа или в Эно. Каждый профиль содержит всю необходимую информацию для первого контакта.' },
      ],
      faqItems: [
        { question: 'Аэропорт Шарлеруа рядом с центром?', answer: 'Аэропорт Брюссель-Юг (Шарлеруа) расположен примерно в 10 км от центра города, доступен на шаттле или такси.' },
        { question: 'Могу ли я найти эскорт рядом с аэропортом?', answer: 'Да, несколько эскорт в Шарлеруа и окрестностях легко доступны из аэропорта.' },
        { question: 'Шарлеруа далеко от Брюсселя?', answer: 'Шарлеруа находится примерно в 1 часе на поезде от Брюсселя, что позволяет также просматривать брюссельские профили при желании.' },
      ],
      relatedCities: [
        { title: 'Эскорт в Намюре', description: 'Валлонская столица совсем рядом.', url: '/find/namur' },
        { title: 'Эскорт в Льеже', description: 'Другой крупный город Валлонии.', url: '/find/liege' },
        { title: 'Эскорт в Брюсселе', description: 'Самый большой выбор в Бельгии.', url: '/find/brussels' },
      ],
    },
    namur: {
      cityName: 'Намюр',
      slug: 'namur',
      metaTitle: 'Эскорт в Намюре | Pinklights.be',
      metaDescription: 'Найдите эскорт в Намюре. Просматривайте профили в столице Валлонского региона.',
      heroHeadline: 'Эскорт в Намюре',
      heroSubtext: 'Найдите спутниц в Намюре - очаровательном городе у слияния Самбры и Мааса.',
      sections: [
        { heading: 'Намюр - столица Валлонии', text: 'Намюр - столица Валлонского региона. Город с человеческим масштабом, сочетающий историческое наследие с качеством жизни. Его цитадель и пешеходный центр привлекают посетителей и жителей. Эскорт в Намюре предлагают персональный сервис в приятной обстановке.' },
        { heading: 'Простота контакта', text: 'Профили из Намюра на Pinklights.be подробны и актуальны. Вы найдете прямые контактные данные, предлагаемые услуги и доступность. Не стесняйтесь связаться для организации встречи.' },
      ],
      faqItems: [
        { question: 'Намюр легко доступен?', answer: 'Да, Намюр хорошо связан поездом из Брюсселя (около 1 часа) и из Льежа (около 50 минут). Вокзал находится в центре города.' },
        { question: 'Есть ли эскорт, доступные в выходные?', answer: 'Да, многие эскорт доступны по выходным. Проверяйте профили для уточнения дней и часов доступности.' },
        { question: 'Как узнать, актуален ли профиль?', answer: 'Недавно активные профили выделяются в результатах поиска. Вы также можете проверить дату последней активности на каждом профиле.' },
      ],
      relatedCities: [
        { title: 'Эскорт в Льеже', description: 'Пылающий город, менее чем в часе езды.', url: '/find/liege' },
        { title: 'Эскорт в Шарлеруа', description: 'Крупный соседний город в Эно.', url: '/find/charleroi' },
        { title: 'Эскорт в Брюсселе', description: 'Наибольшее количество профилей в Бельгии.', url: '/find/brussels' },
      ],
    },
  },
  de: {
    antwerp: {
      cityName: 'Antwerpen',
      slug: 'antwerp',
      metaTitle: 'Escorts in Antwerpen | Pinklights.be',
      metaDescription: 'Finden Sie Escorts in Antwerpen. Durchsuchen Sie verifizierte Profile und kontaktieren Sie Begleitung in der flamischen Metropole.',
      heroHeadline: 'Escorts in Antwerpen',
      heroSubtext: 'Durchsuchen Sie die verfugbaren Profile in Antwerpen und Umgebung. Finden Sie die ideale Person in wenigen Klicks.',
      sections: [
        { heading: 'Antwerpen, Metropole des Nordens', text: 'Antwerpen ist die grosste Stadt Flanderns und ein bedeutendes Wirtschaftszentrum. Das lebhafte Nachtleben und der kosmopolitische Charakter machen es zu einem idealen Ort, um hochwertige Begleitung zu finden. Das Stadtzentrum und die Gegend rund um den Hauptbahnhof konzentrieren einen Grossteil der Aktivitat.' },
        { heading: 'So finden Sie eine Escort in Antwerpen', text: 'Auf Pinklights.be konnen Sie Profile von Escorts in Antwerpen durchsuchen. Jedes Profil enthalt Fotos, eine Beschreibung der angebotenen Dienstleistungen und Kontaktdaten. Sie brauchen kein Konto, um mit der Suche zu beginnen.' },
      ],
      faqItems: [
        { question: 'Wie viele Profile sind in Antwerpen verfugbar?', answer: 'Die Anzahl der Profile andert sich regelmassig. Besuchen Sie die Suchseite, um die derzeit aktiven Escorts in Antwerpen und Umgebung zu sehen.' },
        { question: 'Brauche ich ein Konto, um eine Escort zu kontaktieren?', answer: 'Nein, es ist kein Konto erforderlich. Sie konnen Profile durchsuchen und Escorts direkt uber die im Profil angegebenen Kontaktdaten erreichen.' },
        { question: 'Sind die Profile verifiziert?', answer: 'Wir fordern die Profilverifizierung, um die Authentizitat zu gewahrleisten. Achten Sie auf Verifizierungsabzeichen in den Profilen fur mehr Vertrauen.' },
      ],
      relatedCities: [
        { title: 'Escorts in Brussel', description: 'Entdecken Sie verfugbare Profile in der belgischen Hauptstadt.', url: '/find/brussels' },
        { title: 'Escorts in Gent', description: 'Durchsuchen Sie Profile in dieser dynamischen Universitatsstadt.', url: '/find/ghent' },
        { title: 'Escorts in Brugge', description: 'Finden Sie Begleitung im Venedig des Nordens.', url: '/find/bruges' },
      ],
    },
    brussels: {
      cityName: 'Brussel',
      slug: 'brussels',
      metaTitle: 'Escorts in Brussel | Pinklights.be',
      metaDescription: 'Finden Sie Escorts in Brussel. Durchsuchen Sie verifizierte Profile in der belgischen Hauptstadt und finden Sie ideale Begleitung.',
      heroHeadline: 'Escorts in Brussel',
      heroSubtext: 'Die belgische Hauptstadt bietet die grosste Auswahl an Profilen. Suchen und finden Sie die richtige Person fur Sie.',
      sections: [
        { heading: 'Brussel, Herz Belgiens', text: 'Brussel ist die Hauptstadt Belgiens und Sitz der Europaischen Union. Als kosmopolitische Stadt par excellence zieht sie Besucher aus aller Welt an. Ihre zentrale Lage und ihr internationaler Charakter sorgen fur die meisten Profile auf Pinklights.be.' },
        { heading: 'Suche nach Stadtteil', text: 'Brussel besteht aus 19 Gemeinden, jede mit eigenem Charakter. Ob Sie im historischen Zentrum, in Ixelles, Saint-Gilles oder Uccle sind, Sie finden Profile in Ihrer Nahe. Nutzen Sie die Suchfilter, um Ihre Ergebnisse zu verfeinern.' },
      ],
      faqItems: [
        { question: 'Hat Brussel die meisten Profile?', answer: 'Ja, als Hauptstadt und grosste Stadt des Landes verfugt Brussel in der Regel uber die meisten aktiven Profile auf der Plattform.' },
        { question: 'Kann ich in Brussel nach Gemeinde suchen?', answer: 'Derzeit wird auf Stadtebene gesucht. Profile geben oft ihre genauere Lage in ihrer Beschreibung an.' },
        { question: 'Wie kontaktiere ich den Support?', answer: 'Sie konnen uns per WhatsApp unter +32 478 02 64 79 oder per E-Mail an support@pink-lights.be bei allen Fragen erreichen.' },
      ],
      relatedCities: [
        { title: 'Escorts in Antwerpen', description: 'Entdecken Sie Profile in der flamischen Metropole.', url: '/find/antwerp' },
        { title: 'Escorts in Leuven', description: 'Universitatsstadt in der Nahe von Brussel.', url: '/find/leuven' },
        { title: 'Escorts in Gent', description: 'Erkunden Sie Profile in der Hauptstadt Ostflanderns.', url: '/find/ghent' },
      ],
    },
    ghent: {
      cityName: 'Gent',
      slug: 'ghent',
      metaTitle: 'Escorts in Gent | Pinklights.be',
      metaDescription: 'Finden Sie Escorts in Gent. Durchsuchen Sie verfugbare Profile in dieser dynamischen flamischen Universitatsstadt.',
      heroHeadline: 'Escorts in Gent',
      heroSubtext: 'Entdecken Sie verfugbare Profile in Gent, der Studentenstadt und dem kulturellen Zentrum Flanderns.',
      sections: [
        { heading: 'Gent, Kulturstadt', text: 'Gent ist die drittgrosste Stadt Belgiens. Bekannt fur ihre Universitat und Kulturszene, verbindet sie mittelalterliche Geschichte mit Modernitat. Die Stadt zieht ein junges und dynamisches Publikum an, was sich in der Vielfalt der verfugbaren Profile widerspiegelt.' },
        { heading: 'Eine Escort in Gent finden', text: 'Pinklights.be ermoglicht es Ihnen, einfach Profile von Escorts in Gent zu durchsuchen. Filtern Sie nach Ihren Vorlieben, um die ideale Person zu finden. Die Profile enthalten alle notwendigen Informationen fur eine direkte Kontaktaufnahme.' },
      ],
      faqItems: [
        { question: 'Gibt es viele Escorts in Gent?', answer: 'Gent verfugt uber eine gute Anzahl an Profilen, unter anderem dank seines Status als Universitats- und Touristenstadt.' },
        { question: 'Ist Pinklights.be kostenlos?', answer: 'Das Durchsuchen von Profilen ist kostenlos und erfordert keine Registrierung. Escorts legen ihre eigenen Tarife fur ihre Dienstleistungen fest.' },
        { question: 'Wie kann ich die Echtheit eines Profils prufen?', answer: 'Suchen Sie nach Profilen, die als verifiziert markiert sind. Wir arbeiten standig an der Verbesserung unseres Verifizierungsprozesses.' },
      ],
      relatedCities: [
        { title: 'Escorts in Brugge', description: 'Erkunden Sie Profile in der beruhmten historischen Stadt.', url: '/find/bruges' },
        { title: 'Escorts in Antwerpen', description: 'Entdecken Sie Begleitung in der Hafenmetropole.', url: '/find/antwerp' },
        { title: 'Escorts in Brussel', description: 'Die grosste Auswahl an Profilen in Belgien.', url: '/find/brussels' },
      ],
    },
    bruges: {
      cityName: 'Brugge',
      slug: 'bruges',
      metaTitle: 'Escorts in Brugge | Pinklights.be',
      metaDescription: 'Finden Sie Escorts in Brugge. Durchsuchen Sie Profile im Venedig des Nordens, einem beliebten Reiseziel.',
      heroHeadline: 'Escorts in Brugge',
      heroSubtext: 'Finden Sie Begleitung in Brugge, der Perle Westflanderns.',
      sections: [
        { heading: 'Brugge, das Venedig des Nordens', text: 'Brugge ist eine der meistbesuchten Stadte Belgiens. Das historische Zentrum, UNESCO-Weltkulturerbe, zieht jahrlich Millionen Besucher an. Fur Reisende, die Gesellschaft suchen, bietet Pinklights.be verifizierte lokale Profile.' },
        { heading: 'Services fur Besucher', text: 'Viele Escorts in Brugge sind an internationale Kundschaft gewohnt und sprechen mehrere Sprachen. Ob auf Geschaftsreise oder zum Vergnugen, Sie finden Profile, die zu Ihren Bedurfnissen passen.' },
      ],
      faqItems: [
        { question: 'Sprechen Escorts in Brugge mehrere Sprachen?', answer: 'Viele Escorts in Brugge beherrschen Niederlandisch, Franzosisch und Englisch, manchmal auch weitere Sprachen. Sprachkenntnisse werden oft in den Profilen erwahnt.' },
        { question: 'Kann ich eine Escort fur eine Veranstaltung finden?', answer: 'Ja, viele Escorts bieten Begleitservices fur gesellschaftliche Veranstaltungen, Abendessen oder Ausgehen an. Details finden Sie in den Profilbeschreibungen.' },
        { question: 'Ist Brugge gut erreichbar?', answer: 'Ja, Brugge ist leicht per Zug von Brussel (ca. 1 Stunde) und von Gent (ca. 30 Minuten) erreichbar.' },
      ],
      relatedCities: [
        { title: 'Escorts in Gent', description: 'Verfugbare Profile in der Nachbarstadt.', url: '/find/ghent' },
        { title: 'Escorts in Antwerpen', description: 'Entdecken Sie das Angebot in Antwerpen.', url: '/find/antwerp' },
        { title: 'Escorts in Brussel', description: 'Die grosste Auswahl in der Hauptstadt.', url: '/find/brussels' },
      ],
    },
    liege: {
      cityName: 'Luttich',
      slug: 'liege',
      metaTitle: 'Escorts in Luttich | Pinklights.be',
      metaDescription: 'Finden Sie Escorts in Luttich. Durchsuchen Sie Profile in der feurigen Stadt, dem Herzen der Wallonie.',
      heroHeadline: 'Escorts in Luttich',
      heroSubtext: 'Entdecken Sie verfugbare Profile in Luttich, der feurigen Stadt.',
      sections: [
        { heading: 'Luttich, warme Stadt', text: 'Luttich ist die grosste Stadt der Wallonie und ein wichtiger Knotenpunkt zwischen Belgien, Deutschland und den Niederlanden. Die freundliche Atmosphare und das bekannte Nachtleben machen sie zu einem geschatzten Reiseziel. Die Stadt bietet eine gute Anzahl an Profilen auf Pinklights.be.' },
        { heading: 'Le Carre und das Nachtleben', text: 'Das Viertel Le Carre in Luttich ist beruhmt fur seine Konzentration an Bars und Restaurants. Es ist der ideale Ausgangspunkt fur einen Abend. Escorts aus Luttich kennen die Stadt gut und konnen Ihnen die besten Orte empfehlen.' },
      ],
      faqItems: [
        { question: 'Sprechen die meisten Escorts in Luttich Franzosisch?', answer: 'Ja, da Luttich eine franzosischsprachige Stadt ist, spricht die grosse Mehrheit der Escorts fliessend Franzosisch.' },
        { question: 'Liegt Luttich in der Nahe anderer grosser Stadte?', answer: 'Ja, Luttich liegt etwa 1 Stunde mit dem Zug von Brussel entfernt und nahe der deutschen und niederlandischen Grenze.' },
        { question: 'Wie sind die Tarife in Luttich?', answer: 'Die Tarife variieren von Escort zu Escort. Jedes Profil gibt seine eigenen Bedingungen an. Wir setzen keine Preise fest.' },
      ],
      relatedCities: [
        { title: 'Escorts in Namur', description: 'Profile in der wallonischen Hauptstadt.', url: '/find/namur' },
        { title: 'Escorts in Charleroi', description: 'Entdecken Sie Profile im Pays Noir.', url: '/find/charleroi' },
        { title: 'Escorts in Brussel', description: 'Die grosste Auswahl in Belgien.', url: '/find/brussels' },
      ],
    },
    leuven: {
      cityName: 'Leuven',
      slug: 'leuven',
      metaTitle: 'Escorts in Leuven | Pinklights.be',
      metaDescription: 'Finden Sie Escorts in Leuven. Durchsuchen Sie Profile in dieser Universitatsstadt nahe Brussel.',
      heroHeadline: 'Escorts in Leuven',
      heroSubtext: 'Finden Sie Begleitung in Leuven, der lebhaften Universitatsstadt in Flamisch-Brabant.',
      sections: [
        { heading: 'Leuven, Stadt des Wissens', text: 'Leuven beherbergt die KU Leuven, eine der altesten Universitaten Europas. Diese kompakte, aber dynamische Stadt liegt nur 25 Minuten mit dem Zug von Brussel entfernt und bietet eine praktische Lage mit einzigartiger Atmosphare.' },
        { heading: 'Profile durchsuchen', text: 'Escorts in Leuven sind uber Pinklights.be leicht erreichbar. Die Nahe zu Brussel bedeutet auch, dass Sie Escorts finden konnen, die bereit sind, zwischen beiden Stadten zu reisen.' },
      ],
      faqItems: [
        { question: 'Liegt Leuven nahe an Brussel?', answer: 'Ja, Leuven liegt etwa 25 Minuten mit dem Zug von Brussel-Zentral entfernt, was das Reisen zwischen beiden Stadten sehr einfach macht.' },
        { question: 'Gibt es Escorts, die abends verfugbar sind?', answer: 'Ja, viele Escorts sind abends verfugbar. Prufen Sie die Profile fur Verfugbarkeitszeiten oder kontaktieren Sie direkt.' },
        { question: 'Kann ich eine Escort per WhatsApp kontaktieren?', answer: 'Das hangt von der jeweiligen Escort ab. Manche bevorzugen Anrufe, andere Nachrichten. Die Kontaktmethoden sind in jedem Profil angegeben.' },
      ],
      relatedCities: [
        { title: 'Escorts in Brussel', description: 'Die Hauptstadt, nur wenige Minuten mit dem Zug.', url: '/find/brussels' },
        { title: 'Escorts in Antwerpen', description: 'Die flamische Metropole im Norden.', url: '/find/antwerp' },
        { title: 'Escorts in Gent', description: 'Weitere Universitatsstadt in Flandern.', url: '/find/ghent' },
      ],
    },
    charleroi: {
      cityName: 'Charleroi',
      slug: 'charleroi',
      metaTitle: 'Escorts in Charleroi | Pinklights.be',
      metaDescription: 'Finden Sie Escorts in Charleroi. Durchsuchen Sie verfugbare Profile in dieser grossen wallonischen Stadt.',
      heroHeadline: 'Escorts in Charleroi',
      heroSubtext: 'Entdecken Sie verfugbare Profile in Charleroi und der Region Hennegau.',
      sections: [
        { heading: 'Charleroi, Stadt im Wandel', text: 'Charleroi ist die drittgrosste Stadt Belgiens nach Einwohnerzahl. In voller stadtischer Erneuerung bietet sie immer mehr Attraktivitat. Die Nahe des Flughafens Brussel-Sud zieht ebenfalls viele Reisende an.' },
        { heading: 'Profile in Charleroi finden', text: 'Auf Pinklights.be konnen Sie Profile nach Standort filtern, um Escorts in Charleroi oder im Hennegau zu finden. Jedes Profil enthalt alle notigen Informationen fur einen ersten Kontakt.' },
      ],
      faqItems: [
        { question: 'Liegt der Flughafen Charleroi nahe am Zentrum?', answer: 'Der Flughafen Brussel-Sud (Charleroi) liegt etwa 10 km vom Stadtzentrum entfernt, erreichbar per Shuttle oder Taxi.' },
        { question: 'Kann ich Escorts in Flughafennahe finden?', answer: 'Ja, mehrere Escorts in Charleroi und Umgebung sind vom Flughafen aus leicht erreichbar.' },
        { question: 'Liegt Charleroi weit von Brussel?', answer: 'Charleroi liegt etwa 1 Stunde mit dem Zug von Brussel entfernt, sodass Sie bei Bedarf auch die Brusseler Profile ansehen konnen.' },
      ],
      relatedCities: [
        { title: 'Escorts in Namur', description: 'Die wallonische Hauptstadt ganz in der Nahe.', url: '/find/namur' },
        { title: 'Escorts in Luttich', description: 'Die andere grosse Stadt der Wallonie.', url: '/find/liege' },
        { title: 'Escorts in Brussel', description: 'Die grosste Auswahl in Belgien.', url: '/find/brussels' },
      ],
    },
    namur: {
      cityName: 'Namur',
      slug: 'namur',
      metaTitle: 'Escorts in Namur | Pinklights.be',
      metaDescription: 'Finden Sie Escorts in Namur. Durchsuchen Sie Profile in der Hauptstadt der Wallonischen Region.',
      heroHeadline: 'Escorts in Namur',
      heroSubtext: 'Finden Sie Begleitung in Namur, der charmanten Stadt am Zusammenfluss von Sambre und Maas.',
      sections: [
        { heading: 'Namur, wallonische Hauptstadt', text: 'Namur ist die Hauptstadt der Wallonischen Region. Eine Stadt mit menschlichem Mass, die historisches Erbe mit Lebensqualitat verbindet. Die Zitadelle und die Fusgangerzone ziehen Besucher und Bewohner an. Escorts in Namur bieten personalisierten Service in angenehmer Umgebung.' },
        { heading: 'Einfache Kontaktaufnahme', text: 'Die Profile aus Namur auf Pinklights.be sind detailliert und aktuell. Sie finden dort direkte Kontaktdaten, angebotene Dienste und Verfugbarkeit. Zogern Sie nicht, Kontakt aufzunehmen, um ein Treffen zu organisieren.' },
      ],
      faqItems: [
        { question: 'Ist Namur leicht erreichbar?', answer: 'Ja, Namur ist gut per Zug von Brussel (ca. 1 Stunde) und von Luttich (ca. 50 Minuten) erreichbar. Der Bahnhof liegt mitten im Stadtzentrum.' },
        { question: 'Gibt es Escorts, die am Wochenende verfugbar sind?', answer: 'Ja, viele Escorts sind am Wochenende verfugbar. Prufen Sie die Profile fur verfugbare Tage und Zeiten.' },
        { question: 'Wie erkenne ich, ob ein Profil aktuell ist?', answer: 'Kurzlich aktive Profile werden in den Suchergebnissen hervorgehoben. Sie konnen auch das Datum der letzten Aktivitat auf jedem Profil prufen.' },
      ],
      relatedCities: [
        { title: 'Escorts in Luttich', description: 'Die feurige Stadt, weniger als eine Stunde entfernt.', url: '/find/liege' },
        { title: 'Escorts in Charleroi', description: 'Die grosse Nachbarstadt im Hennegau.', url: '/find/charleroi' },
        { title: 'Escorts in Brussel', description: 'Die meisten Profile in Belgien.', url: '/find/brussels' },
      ],
    },
  },
};

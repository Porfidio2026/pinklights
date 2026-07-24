import { Locale } from './locales';

interface GuideData {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  title: string;
  sections: { heading: string; paragraphs: string[] }[];
  relatedPages: { title: string; description: string; url: string }[];
}

interface FAQCategory {
  title: string;
  items: { question: string; answer: string }[];
}

interface FAQData {
  metaTitle: string;
  metaDescription: string;
  title: string;
  intro: string;
  categories: FAQCategory[];
  relatedPages: { title: string; description: string; url: string }[];
}

interface GuidesHubData {
  metaTitle: string;
  metaDescription: string;
  title: string;
  intro: string;
  guides: { slug: string; title: string; description: string }[];
}

// ---------------------------------------------------------------------------
// GUIDES HUB
// ---------------------------------------------------------------------------

export const GUIDES_HUB_TRANSLATIONS: Record<Locale, GuidesHubData> = {
  fr: {
    metaTitle: 'Guides Pinklights - Conseils et informations',
    metaDescription: 'Guides pratiques pour utiliser Pinklights : fonctionnement de la plateforme, conseils de securite, premiere rencontre, visiteurs et profil.',
    title: 'Guides',
    intro: 'Tout ce que vous devez savoir pour profiter pleinement de Pinklights. Parcourez nos guides pour des conseils pratiques et des informations utiles.',
    guides: [
      { slug: 'how-it-works', title: 'Comment fonctionne Pinklights', description: 'Guide etape par etape pour parcourir les profils, filtrer vos preferences et contacter directement via WhatsApp.' },
      { slug: 'safety-tips', title: 'Conseils de securite', description: 'Dix conseils pratiques pour rester en securite lors de vos rencontres.' },
      { slug: 'first-meeting', title: 'Guide de premiere rencontre', description: 'Preparez votre premiere rencontre en personne en toute confiance.' },
      { slug: 'for-visitors', title: 'Guide pour les visiteurs', description: 'Utiliser Pinklights lors d\'un court sejour en Belgique.' },
      { slug: 'profile-tips', title: 'Conseils pour votre profil', description: 'Bonnes pratiques pour creer un profil attractif et efficace.' },
    ],
  },
  nl: {
    metaTitle: 'Pinklights Gidsen - Tips en informatie',
    metaDescription: 'Praktische gidsen voor het gebruik van Pinklights: hoe het werkt, veiligheidstips, eerste ontmoeting, bezoekers en profieltips.',
    title: 'Gidsen',
    intro: 'Alles wat je moet weten om het meeste uit Pinklights te halen. Bekijk onze gidsen voor praktische tips en nuttige informatie.',
    guides: [
      { slug: 'how-it-works', title: 'Hoe Pinklights werkt', description: 'Stapsgewijze gids voor het bekijken van profielen, filteren op voorkeuren en direct contact via WhatsApp.' },
      { slug: 'safety-tips', title: 'Veiligheidstips', description: 'Tien praktische tips om veilig te blijven bij het ontmoeten van nieuwe mensen.' },
      { slug: 'first-meeting', title: 'Gids voor je eerste ontmoeting', description: 'Bereid je eerste persoonlijke ontmoeting voor met vertrouwen.' },
      { slug: 'for-visitors', title: 'Gids voor bezoekers', description: 'Pinklights gebruiken tijdens een kort verblijf in Belgie.' },
      { slug: 'profile-tips', title: 'Profieltips', description: 'Best practices voor het maken van een aantrekkelijk en effectief profiel.' },
    ],
  },
  es: {
    metaTitle: 'Guias Pinklights - Consejos e informacion',
    metaDescription: 'Guias practicas para usar Pinklights: como funciona, consejos de seguridad, primer encuentro, visitantes y perfil.',
    title: 'Guias',
    intro: 'Todo lo que necesitas saber para aprovechar Pinklights al maximo. Consulta nuestras guias para consejos practicos e informacion util.',
    guides: [
      { slug: 'how-it-works', title: 'Como funciona Pinklights', description: 'Guia paso a paso para explorar perfiles, filtrar preferencias y contactar directamente por WhatsApp.' },
      { slug: 'safety-tips', title: 'Consejos de seguridad', description: 'Diez consejos practicos para mantenerte seguro al conocer gente nueva.' },
      { slug: 'first-meeting', title: 'Guia del primer encuentro', description: 'Preparate para tu primer encuentro en persona con confianza.' },
      { slug: 'for-visitors', title: 'Guia para visitantes', description: 'Usar Pinklights durante una estancia corta en Belgica.' },
      { slug: 'profile-tips', title: 'Consejos para tu perfil', description: 'Buenas practicas para crear un perfil atractivo y eficaz.' },
    ],
  },
  pt: {
    metaTitle: 'Guias Pinklights - Dicas e informacoes',
    metaDescription: 'Guias praticos para usar o Pinklights: como funciona, dicas de seguranca, primeiro encontro, visitantes e perfil.',
    title: 'Guias',
    intro: 'Tudo o que precisa saber para tirar o maximo partido do Pinklights. Consulte os nossos guias para dicas praticas e informacoes uteis.',
    guides: [
      { slug: 'how-it-works', title: 'Como funciona o Pinklights', description: 'Guia passo a passo para explorar perfis, filtrar preferencias e contactar diretamente por WhatsApp.' },
      { slug: 'safety-tips', title: 'Dicas de seguranca', description: 'Dez dicas praticas para se manter seguro ao conhecer pessoas novas.' },
      { slug: 'first-meeting', title: 'Guia do primeiro encontro', description: 'Prepare-se para o seu primeiro encontro presencial com confianca.' },
      { slug: 'for-visitors', title: 'Guia para visitantes', description: 'Usar o Pinklights durante uma estadia curta na Belgica.' },
      { slug: 'profile-tips', title: 'Dicas para o seu perfil', description: 'Boas praticas para criar um perfil atraente e eficaz.' },
    ],
  },
  ru: {
    metaTitle: 'Руководства Pinklights - Советы и информация',
    metaDescription: 'Практические руководства по использованию Pinklights: как работает платформа, советы по безопасности, первая встреча, для гостей и профиль.',
    title: 'Руководства',
    intro: 'Все, что нужно знать для эффективного использования Pinklights. Ознакомьтесь с нашими руководствами для практических советов и полезной информации.',
    guides: [
      { slug: 'how-it-works', title: 'Как работает Pinklights', description: 'Пошаговое руководство по просмотру профилей, настройке фильтров и прямой связи через WhatsApp.' },
      { slug: 'safety-tips', title: 'Советы по безопасности', description: 'Десять практических советов для безопасных встреч с новыми людьми.' },
      { slug: 'first-meeting', title: 'Руководство по первой встрече', description: 'Подготовьтесь к первой личной встрече с уверенностью.' },
      { slug: 'for-visitors', title: 'Для гостей Бельгии', description: 'Использование Pinklights во время краткого визита в Бельгию.' },
      { slug: 'profile-tips', title: 'Советы по профилю', description: 'Лучшие практики для создания привлекательного и эффективного профиля.' },
    ],
  },
  de: {
    metaTitle: 'Pinklights Ratgeber - Tipps und Informationen',
    metaDescription: 'Praktische Ratgeber zur Nutzung von Pinklights: Funktionsweise, Sicherheitstipps, erstes Treffen, Besucher und Profiltipps.',
    title: 'Ratgeber',
    intro: 'Alles, was Sie wissen muessen, um Pinklights optimal zu nutzen. Durchstoebern Sie unsere Ratgeber fuer praktische Tipps und nuetzliche Informationen.',
    guides: [
      { slug: 'how-it-works', title: 'Wie Pinklights funktioniert', description: 'Schritt-fuer-Schritt-Anleitung zum Durchsuchen von Profilen, Filtern und direktem Kontakt ueber WhatsApp.' },
      { slug: 'safety-tips', title: 'Sicherheitstipps', description: 'Zehn praktische Tipps, um beim Kennenlernen neuer Menschen sicher zu bleiben.' },
      { slug: 'first-meeting', title: 'Ratgeber fuer das erste Treffen', description: 'Bereiten Sie sich selbstbewusst auf Ihr erstes persoenliches Treffen vor.' },
      { slug: 'for-visitors', title: 'Fuer Besucher in Belgien', description: 'Pinklights waehrend eines kurzen Aufenthalts in Belgien nutzen.' },
      { slug: 'profile-tips', title: 'Profiltipps', description: 'Best Practices fuer ein attraktives und wirkungsvolles Profil.' },
    ],
  },
};

// ---------------------------------------------------------------------------
// GUIDE TRANSLATIONS
// ---------------------------------------------------------------------------

export const GUIDE_TRANSLATIONS: Record<Locale, Record<string, GuideData>> = {
  // =======================================================================
  // FRENCH
  // =======================================================================
  fr: {
    'how-it-works': {
      slug: 'how-it-works',
      metaTitle: 'Comment fonctionne Pinklights - Guide etape par etape',
      metaDescription: 'Decouvrez comment parcourir les profils, filtrer vos preferences et contacter directement via WhatsApp sur Pinklights.',
      title: 'Comment fonctionne Pinklights',
      sections: [
        {
          heading: '',
          paragraphs: [
            'Pinklights est concu pour etre simple. Contrairement aux applications de rencontre classiques qui exigent de longues inscriptions et des questionnaires de personnalite, notre plateforme vous permet de parcourir de vrais profils et de prendre contact en quelques minutes.',
          ],
        },
        {
          heading: 'Etape 1 : Visitez le site',
          paragraphs: [
            'Rendez-vous sur Pinklights.be depuis n\'importe quel appareil : ordinateur, tablette ou smartphone. La plateforme est entierement responsive et fonctionne dans tout navigateur moderne. Il n\'y a aucune application a telecharger et aucun compte a creer pour commencer a explorer.',
          ],
        },
        {
          heading: 'Etape 2 : Choisissez un type de service',
          paragraphs: [
            'Pinklights organise les profils par type de service afin que vous puissiez trouver exactement ce que vous cherchez. Selectionnez la categorie qui correspond a votre interet. Ce premier filtre reduit les resultats aux profils les plus pertinents.',
          ],
        },
        {
          heading: 'Etape 3 : Selectionnez vos preferences',
          paragraphs: [
            'Apres avoir choisi un type de service, vous pouvez affiner votre recherche en selectionnant vos preferences de genre. Cette combinaison garantit que les profils affiches correspondent reellement a ce qui vous interesse.',
          ],
        },
        {
          heading: 'Etape 4 : Parcourez les profils avec des filtres',
          paragraphs: [
            'La page de resultats affiche des cartes de profil avec photos, informations de base et localisation. Vous pouvez filtrer par ville ou rayon de distance (jusqu\'a 50 km), ainsi que par attributs physiques comme l\'apparence et la tranche d\'age. La Belgique est compacte, donc un profil a Anvers peut etre a seulement 30 minutes de Gand ou Bruxelles.',
          ],
        },
        {
          heading: 'Etape 5 : Consultez les profils detailles',
          paragraphs: [
            'Cliquez sur une carte de profil pour voir le profil complet. Vous y trouverez plusieurs photos, une bio, des details physiques, des informations de disponibilite et les services proposes. Prenez le temps de consulter les profils en detail avant de prendre contact.',
          ],
        },
        {
          heading: 'Etape 6 : Contactez directement via WhatsApp',
          paragraphs: [
            'Quand vous trouvez un profil qui vous interesse, contactez la personne directement via WhatsApp. C\'est le moyen le plus rapide et le plus personnel de demarrer une conversation. Il n\'y a pas de systeme de messagerie integre, pas de credits a depenser et aucun intermediaire.',
            'WhatsApp fonctionne egalement a l\'international, ce qui rend Pinklights particulierement pratique pour les voyageurs visitant la Belgique.',
          ],
        },
        {
          heading: 'Navigation sans compte',
          paragraphs: [
            'L\'un des atouts de Pinklights est que la navigation est entierement ouverte. Vous n\'avez pas besoin de creer un compte, de verifier un e-mail ou de fournir des informations personnelles pour consulter les profils.',
          ],
        },
        {
          heading: 'Pour les proprietaires de profils : visibilite et credits',
          paragraphs: [
            'Si vous etes proprietaire d\'un profil, la creation et la gestion de votre profil fonctionnent avec un systeme de credits journaliers. Ces credits maintiennent votre profil visible et decouvert dans les resultats de recherche. Vous pouvez egalement booster votre visibilite pour apparaitre plus haut dans les resultats pendant les heures de pointe.',
            'La gestion de votre profil est simple. Mettez a jour vos photos, ajustez votre disponibilite et rechargez vos credits depuis votre tableau de bord.',
          ],
        },
      ],
      relatedPages: [
        { title: 'Conseils de securite', description: 'Dix conseils pratiques pour rester en securite lors de vos rencontres.', url: '/guides/safety-tips' },
        { title: 'Guide de premiere rencontre', description: 'Preparez votre premiere rencontre en personne en toute confiance.', url: '/guides/first-meeting' },
        { title: 'Guide pour les visiteurs', description: 'Utiliser Pinklights lors d\'un court sejour en Belgique.', url: '/guides/for-visitors' },
      ],
    },
    'safety-tips': {
      slug: 'safety-tips',
      metaTitle: '10 conseils de securite pour rencontrer quelqu\'un',
      metaDescription: 'Conseils de securite pratiques : rencontrez en public, verifiez les profils, protegez votre vie privee. Restez en securite avec Pinklights.',
      title: '10 conseils de securite pour rencontrer quelqu\'un',
      sections: [
        {
          heading: '',
          paragraphs: [
            'Rencontrer quelqu\'un de nouveau devrait etre excitant, pas stressant. Que vous soyez habitue aux plateformes en ligne ou que ce soit votre premiere fois, ces dix conseils vous aideront a vous proteger et a vivre une experience positive.',
          ],
        },
        {
          heading: '1. Rencontrez-vous toujours dans un lieu public',
          paragraphs: [
            'Pour une premiere rencontre, choisissez un lieu public bien eclaire comme un cafe, le hall d\'un hotel ou un restaurant. Les lieux publics offrent une securite naturelle et permettent aux deux parties d\'evaluer leur niveau de confort.',
          ],
        },
        {
          heading: '2. Prevenez une personne de confiance',
          paragraphs: [
            'Avant de partir, informez quelqu\'un de confiance de l\'endroit ou vous allez, de la personne que vous allez rencontrer et de l\'heure prevue de votre retour. C\'est une precaution simple qui prend moins d\'une minute.',
          ],
        },
        {
          heading: '3. Fiez-vous a votre instinct',
          paragraphs: [
            'Si quelque chose ne semble pas normal, que ce soit pendant la conversation ou a tout moment de la rencontre, faites confiance a ce ressenti. Vous n\'etes jamais oblige de rester. Votre confort est plus important que la politesse dans une situation inconfortable.',
          ],
        },
        {
          heading: '4. Verifiez que les photos correspondent',
          paragraphs: [
            'Lorsque vous arrivez au point de rencontre, prenez un moment pour confirmer que la personne correspond a ses photos de profil. Si elle semble significativement differente, il est parfaitement acceptable de vous excuser.',
          ],
        },
        {
          heading: '5. Utilisez WhatsApp, pas votre numero personnel',
          paragraphs: [
            'Pinklights utilise WhatsApp pour le contact direct, ce qui offre une couche de separation entre votre identite personnelle et vos conversations. Vous pouvez controler vos parametres de confidentialite WhatsApp pour limiter ce que l\'autre personne voit.',
          ],
        },
        {
          heading: '6. Ne partagez jamais d\'informations financieres',
          paragraphs: [
            'Ne partagez pas de coordonnees bancaires, de numeros de carte de credit et ne transferez pas d\'argent a quiconque rencontre via la plateforme. Les connexions legitimes ne demanderont jamais d\'informations financieres.',
          ],
        },
        {
          heading: '7. Convenez des attentes a l\'avance',
          paragraphs: [
            'Une communication claire avant la rencontre evite les malentendus. Discutez de ce que vous recherchez tous les deux, des limites et des details pratiques comme le lieu et l\'horaire.',
          ],
        },
        {
          heading: '8. Respectez les limites, les votres et les leurs',
          paragraphs: [
            'Le consentement est continu et s\'applique dans chaque situation. Si l\'une des parties change d\'avis a tout moment, cette decision doit etre respectee sans question. Une experience positive repose sur le respect mutuel.',
          ],
        },
        {
          heading: '9. Connaissez vos droits',
          paragraphs: [
            'En Belgique, vous avez des droits legaux qui vous protegent dans chaque interaction. Familiarisez-vous avec ce qui est legal et sachez que vous pouvez contacter les autorites locales si vous vous sentez en danger.',
          ],
        },
        {
          heading: '10. Signalez les problemes a la plateforme',
          paragraphs: [
            'Si vous rencontrez un profil frauduleux ou un comportement inapproprie, signalez-le. Pinklights prend les signalements au serieux et examine les profils signales rapidement. Votre signalement est traite de maniere confidentielle.',
          ],
        },
        {
          heading: 'En conclusion',
          paragraphs: [
            'La securite est une responsabilite partagee. En prenant ces precautions simples, vous contribuez a une culture de respect et de confiance sur la plateforme.',
          ],
        },
      ],
      relatedPages: [
        { title: 'Securite et confidentialite', description: 'Decouvrez comment Pinklights protege vos donnees.', url: '/safety' },
        { title: 'Guide de premiere rencontre', description: 'Preparez votre premiere rencontre en personne en toute confiance.', url: '/guides/first-meeting' },
        { title: 'Comment ca marche', description: 'Guide etape par etape pour parcourir et se connecter sur Pinklights.', url: '/guides/how-it-works' },
      ],
    },
    'first-meeting': {
      slug: 'first-meeting',
      metaTitle: 'Guide de premiere rencontre - Conseils pratiques',
      metaDescription: 'Vous preparez votre premiere rencontre ? Conseils pratiques sur les lieux, la conversation et a quoi vous attendre.',
      title: 'Votre premiere rencontre : guide complet',
      sections: [
        {
          heading: '',
          paragraphs: [
            'Rencontrer quelqu\'un en personne pour la premiere fois peut etre stressant, surtout si vous etes nouveau sur les plateformes en ligne. La bonne nouvelle, c\'est qu\'un peu de preparation fait toute la difference.',
          ],
        },
        {
          heading: 'Gerer vos attentes',
          paragraphs: [
            'Avant de vous rencontrer, prenez un moment pour reflechir a ce que vous recherchez reellement. Etre honnete avec vous-meme sur vos attentes vous aide a les communiquer clairement et evite les deceptions.',
          ],
        },
        {
          heading: 'Communication avant la rencontre',
          paragraphs: [
            'La conversation WhatsApp avant votre rencontre est l\'occasion d\'etablir un lien et de definir le ton. Gardez vos messages respectueux et clairs. Discutez des details pratiques : quand et ou se rencontrer, combien de temps vous avez.',
          ],
        },
        {
          heading: 'Choisir le bon lieu',
          paragraphs: [
            'Le lieu donne le ton de votre rencontre. Pour un premier rendez-vous, un espace public est toujours recommande. Un bar d\'hotel, un cafe calme ou un restaurant elegant conviennent bien. A Bruxelles, les environs de la Grand-Place offrent des lieux discrets et accessibles. A Anvers, le quartier Zuid a des bars elegants.',
          ],
        },
        {
          heading: 'Comment s\'habiller',
          paragraphs: [
            'Habillez-vous d\'une maniere qui vous met en confiance et qui vous represente. Des vetements propres et bien ajustes adaptes au lieu sont suffisants. L\'objectif est de vous sentir bien dans votre peau.',
          ],
        },
        {
          heading: 'Lancer la conversation',
          paragraphs: [
            'Les premieres minutes peuvent etre maladroites, et c\'est tout a fait normal. Les sujets de conversation simples fonctionnent le mieux. Commentez le lieu, demandez comment s\'est passee leur journee ou faites reference a votre conversation WhatsApp.',
          ],
        },
        {
          heading: 'Gerer le trac',
          paragraphs: [
            'Il est tout a fait normal d\'etre nerveux. Arrivez quelques minutes en avance pour vous installer, commandez une boisson et rappelez-vous que l\'autre personne est peut-etre aussi nerveuse que vous. Le trac disparait souvent dans les cinq premieres minutes.',
          ],
        },
        {
          heading: 'Quand recontacter',
          paragraphs: [
            'Si la rencontre s\'est bien passee, un bref message WhatsApp par la suite est apprecie. Quelque chose de simple comme remercier la personne pour un bon moment suffit. La communication directe et sincere est toujours appreciee.',
          ],
        },
        {
          heading: 'Signaux d\'alerte',
          paragraphs: [
            'Restez vigilant face aux signes d\'alerte : la personne ne ressemble pas a ses photos, elle vous pousse a vous rendre dans un lieu prive immediatement, elle demande de l\'argent ou elle ne respecte pas vos limites. Si cela se produit, faites confiance a votre instinct et partez.',
          ],
        },
        {
          heading: 'Un dernier mot d\'encouragement',
          paragraphs: [
            'Tout le monde a une premiere fois. La preparation n\'est pas une question de controler chaque detail, mais de se donner les outils pour se detendre et profiter de l\'experience. Soyez vous-meme, soyez respectueux, et n\'oubliez pas que les meilleures connexions naissent quand les deux personnes sont a l\'aise.',
          ],
        },
      ],
      relatedPages: [
        { title: 'Conseils de securite', description: 'Dix conseils pratiques pour rester en securite.', url: '/guides/safety-tips' },
        { title: 'Comment ca marche', description: 'Guide etape par etape pour parcourir et se connecter sur Pinklights.', url: '/guides/how-it-works' },
        { title: 'Guide pour les visiteurs', description: 'Utiliser Pinklights lors d\'un court sejour en Belgique.', url: '/guides/for-visitors' },
      ],
    },
    'for-visitors': {
      slug: 'for-visitors',
      metaTitle: 'Pinklights pour les visiteurs en Belgique',
      metaDescription: 'Vous visitez la Belgique ? Decouvrez comment utiliser Pinklights pour les courts sejours. WhatsApp fonctionne a l\'international.',
      title: 'Pinklights pour les visiteurs en Belgique',
      sections: [
        {
          heading: '',
          paragraphs: [
            'La Belgique est l\'un des pays les plus accessibles d\'Europe, et Pinklights fonctionne aussi bien pour les visiteurs que pour les habitants. Que vous soyez en voyage d\'affaires, en escapade ou en vacances, ce guide vous aidera a tirer le meilleur de votre sejour.',
          ],
        },
        {
          heading: 'La taille compacte de la Belgique est un avantage',
          paragraphs: [
            'Vous pouvez traverser la Belgique en train en environ deux heures. Bruxelles-Anvers prend environ 40 minutes, Gand-Bruges moins de 30 minutes. Les profils des villes voisines sont donc facilement accessibles. Definissez un rayon de distance genereux et vous verrez des profils de plusieurs villes.',
          ],
        },
        {
          heading: 'Les meilleures villes a visiter',
          paragraphs: [
            'Chaque ville belge a son propre caractere. Bruxelles est cosmopolite et multilingue. Anvers est connue pour la mode et la vie nocturne. Gand combine une atmosphere universitaire avec une architecture medievale. Bruges offre un cadre plus intime. Liege apporte chaleur et culture francophone avec le celebre quartier du Carre.',
          ],
        },
        {
          heading: 'Comment Pinklights fonctionne pour les courts sejours',
          paragraphs: [
            'Pinklights ne necessite aucune creation de compte pour parcourir les profils, ce qui est ideal pour les visiteurs. Vous pouvez ouvrir le site sur votre telephone, filtrer par ville, parcourir les profils et contacter via WhatsApp en quelques minutes. Pas de periode d\'attente, pas d\'algorithme et pas d\'abonnement a annuler.',
          ],
        },
        {
          heading: 'Pas besoin de numero belge',
          paragraphs: [
            'Pinklights utilise WhatsApp pour toutes les communications directes, vous n\'avez donc pas besoin de carte SIM belge. WhatsApp fonctionne en Wi-Fi et avec les donnees mobiles avec n\'importe quel numero international. Connectez-vous au Wi-Fi de l\'hotel ou utilisez vos donnees en itinerance.',
          ],
        },
        {
          heading: 'Considerations linguistiques',
          paragraphs: [
            'La Belgique a trois langues officielles (neerlandais, francais et allemand) mais l\'anglais est largement parle, en particulier a Bruxelles, Anvers et Gand. La plupart des profils incluent des descriptions en anglais. N\'hesitez pas a demander les preferences linguistiques dans votre premier message.',
          ],
        },
        {
          heading: 'Etiquette pour les rencontres en hotel',
          paragraphs: [
            'De nombreux visiteurs preferent se rencontrer a leur hotel. Si vous choisissez cette option, envisagez de vous retrouver d\'abord dans le hall ou au bar plutot que d\'aller directement en chambre. Cela donne aux deux parties une chance de confirmer leur niveau de confort.',
          ],
        },
        {
          heading: 'Profiter au maximum d\'un court sejour',
          paragraphs: [
            'Si votre temps en Belgique est limite, un peu de planification peut faire une grande difference. Parcourez les profils avant votre arrivee. Envoyez un message WhatsApp un jour ou deux avant pour vous presenter. Soyez transparent sur vos dates et votre disponibilite.',
            'La Belgique est petite mais regorge de culture, de gastronomie et de possibilites de connexion. Pinklights est la pour vous aider a tirer le meilleur de chaque visite.',
          ],
        },
      ],
      relatedPages: [
        { title: 'Trouver des profils', description: 'Parcourez les profils par ville a travers la Belgique.', url: '/find' },
        { title: 'Guide de premiere rencontre', description: 'Preparez votre premiere rencontre en toute confiance.', url: '/guides/first-meeting' },
        { title: 'Comment ca marche', description: 'Guide etape par etape pour Pinklights.', url: '/guides/how-it-works' },
      ],
    },
    'profile-tips': {
      slug: 'profile-tips',
      metaTitle: 'Conseils pour un profil attractif sur Pinklights',
      metaDescription: 'Conseils pour les createurs de profils : choisir les bonnes photos, ecrire une bio honnete, gerer la visibilite et attirer des connexions.',
      title: 'Conseils pour votre profil : se demarquer sur Pinklights',
      sections: [
        {
          heading: '',
          paragraphs: [
            'Votre profil est votre premiere impression sur Pinklights. C\'est ce que les visiteurs voient quand ils parcourent, filtrent et decidint qui contacter. Un profil bien concu attire de meilleures connexions et rend votre experience sur la plateforme plus gratifiante.',
          ],
        },
        {
          heading: 'Choisissez des photos claires et bien eclairees',
          paragraphs: [
            'Les photos sont l\'element le plus important de votre profil. Choisissez des images bien eclairees, nettes et representant votre apparence actuelle. La lumiere naturelle est presque toujours plus flatteuse. Evitez les filtres lourds. Votre photo principale doit montrer clairement votre visage et etre recente.',
          ],
        },
        {
          heading: 'Utilisez plusieurs photos sous differents angles',
          paragraphs: [
            'Une seule photo ne raconte qu\'une partie de l\'histoire. Televersez plusieurs images montrant differents angles, tenues et environnements. Un melange de gros plans et de photos en pied donne une image complete. La variete renforce la confiance dans l\'authenticite de votre profil.',
          ],
        },
        {
          heading: 'Ecrivez une bio honnete et engageante',
          paragraphs: [
            'Votre bio est l\'occasion de montrer votre personnalite au-dela des photos. Ecrivez avec votre propre voix. Mentionnez ce qui vous rend unique et le type de connexions que vous recherchez. Evitez les phrases generiques. La specificite est memorable.',
          ],
        },
        {
          heading: 'Definissez une disponibilite realiste',
          paragraphs: [
            'Si vous indiquez etre disponible a certaines heures, assurez-vous que cette information est exacte. Mettez a jour votre disponibilite regulierement. La coherence entre ce que dit votre profil et vos reponses construit la confiance.',
          ],
        },
        {
          heading: 'Utilisez la fonction de boost de visibilite',
          paragraphs: [
            'Pinklights offre un boost de visibilite qui place votre profil plus haut dans les resultats de recherche pendant les heures de pointe. Programmez vos boosts strategiquement : les soirees et les week-ends voient un trafic plus eleve. Utilisez les boosts quand vous etes disponible pour repondre.',
          ],
        },
        {
          heading: 'Repondez rapidement aux messages WhatsApp',
          paragraphs: [
            'La rapidite compte. Quand quelqu\'un vous contacte via WhatsApp, il exprime un interet actif. Une reponse rapide et amicale augmente significativement les chances de transformer cet interet en rencontre.',
          ],
        },
        {
          heading: 'Maintenez votre profil a jour',
          paragraphs: [
            'Un profil obsolete est pire que pas de profil du tout. Mettez a jour vos photos, votre localisation et votre disponibilite regulierement. Prenez l\'habitude de revoir votre profil au moins une fois par mois.',
          ],
        },
        {
          heading: 'Decrivez vos services clairement',
          paragraphs: [
            'La clarte evite les malentendus. Votre profil doit decrire clairement ce que vous proposez. Utilisez un langage direct et soyez precis. Plus votre profil est clair, plus vous attirerez des personnes reellement interessees.',
          ],
        },
        {
          heading: 'La qualite plutot que la quantite',
          paragraphs: [
            'Un excellent profil n\'est pas une question d\'avoir le plus de photos ou la bio la plus longue. C\'est une question de vous presenter de maniere authentique et professionnelle. Chaque element doit servir un objectif.',
          ],
        },
      ],
      relatedPages: [
        { title: 'Comment ca marche', description: 'Guide etape par etape pour Pinklights.', url: '/guides/how-it-works' },
        { title: 'Conseils de securite', description: 'Dix conseils pratiques pour rester en securite.', url: '/guides/safety-tips' },
      ],
    },
  },

  // =======================================================================
  // DUTCH
  // =======================================================================
  nl: {
    'how-it-works': {
      slug: 'how-it-works',
      metaTitle: 'Hoe Pinklights werkt - Stapsgewijze gids',
      metaDescription: 'Ontdek hoe je profielen bekijkt, filtert op voorkeuren en direct contact opneemt via WhatsApp op Pinklights.',
      title: 'Hoe Pinklights werkt',
      sections: [
        {
          heading: '',
          paragraphs: [
            'Pinklights is ontworpen om eenvoudig te zijn. In tegenstelling tot traditionele dating-apps die lange aanmeldingen en persoonlijkheidstests vereisen, kun je op ons platform echte profielen bekijken en direct contact opnemen.',
          ],
        },
        {
          heading: 'Stap 1: Bezoek de site',
          paragraphs: [
            'Ga naar Pinklights.be op elk apparaat: desktop, tablet of smartphone. Het platform is volledig responsive en werkt in elke moderne browser. Er is geen app om te downloaden en geen account nodig om te beginnen met verkennen.',
          ],
        },
        {
          heading: 'Stap 2: Kies een servicetype',
          paragraphs: [
            'Pinklights organiseert profielen per servicetype zodat je precies vindt wat je zoekt. Selecteer de categorie die bij je interesse past. Dit eerste filter beperkt de resultaten tot de meest relevante profielen.',
          ],
        },
        {
          heading: 'Stap 3: Selecteer je voorkeuren',
          paragraphs: [
            'Na het kiezen van een servicetype kun je je zoekopdracht verder verfijnen door gendervoorkeuren te selecteren. Deze combinatie zorgt ervoor dat de profielen die je ziet aansluiten bij wat je echt zoekt.',
          ],
        },
        {
          heading: 'Stap 4: Bekijk profielen met filters',
          paragraphs: [
            'De zoekresultatenpagina toont profielkaarten met foto\'s, basisgegevens en locatie-informatie. Je kunt verder filteren op stad of afstand (tot 50 km), en op uiterlijke kenmerken zoals leeftijd en verschijning. Belgie is compact, dus iemand in Antwerpen kan slechts 30 minuten van Gent of Brussel zijn.',
          ],
        },
        {
          heading: 'Stap 5: Bekijk uitgebreide profielen',
          paragraphs: [
            'Klik op een profielkaart om het volledige profiel te bekijken. Hier vind je meerdere foto\'s, een bio, fysieke details, beschikbaarheid en aangeboden diensten. Neem de tijd om profielen grondig te bekijken voordat je contact opneemt.',
          ],
        },
        {
          heading: 'Stap 6: Neem direct contact op via WhatsApp',
          paragraphs: [
            'Als je een interessant profiel vindt, neem je direct contact op via WhatsApp. Dit is de snelste en meest persoonlijke manier om een gesprek te beginnen. Er is geen in-app berichtensysteem, geen credits om berichten te versturen en geen tussenpersoon.',
            'WhatsApp werkt ook internationaal, wat Pinklights bijzonder handig maakt voor reizigers die Belgie bezoeken.',
          ],
        },
        {
          heading: 'Bladeren zonder account',
          paragraphs: [
            'Een van de dingen die Pinklights onderscheidt, is dat het bladeren volledig open is. Je hoeft geen account aan te maken, geen e-mail te verifieren en geen persoonlijke gegevens te verstrekken om profielen te bekijken.',
          ],
        },
        {
          heading: 'Voor profieleigenaren: zichtbaarheid en credits',
          paragraphs: [
            'Als je een profieleigenaar bent, werkt het aanmaken en beheren van je profiel op basis van dagcredits. Deze credits houden je profiel zichtbaar en vindbaar in zoekresultaten. Je kunt ook je zichtbaarheid boosten om hoger in de zoekresultaten te verschijnen tijdens piekuren.',
            'Het beheren van je profiel is eenvoudig. Werk je foto\'s bij, pas je beschikbaarheid aan en vul credits aan vanuit je dashboard.',
          ],
        },
      ],
      relatedPages: [
        { title: 'Veiligheidstips', description: 'Tien praktische tips om veilig te blijven bij ontmoetingen.', url: '/guides/safety-tips' },
        { title: 'Gids voor je eerste ontmoeting', description: 'Bereid je eerste ontmoeting voor met vertrouwen.', url: '/guides/first-meeting' },
        { title: 'Gids voor bezoekers', description: 'Pinklights gebruiken tijdens een kort verblijf in Belgie.', url: '/guides/for-visitors' },
      ],
    },
    'safety-tips': {
      slug: 'safety-tips',
      metaTitle: '10 veiligheidstips voor het ontmoeten van iemand',
      metaDescription: 'Praktische veiligheidstips: ontmoet op een openbare plek, verifieer profielen, bescherm je privacy. Blijf veilig met Pinklights.',
      title: '10 veiligheidstips voor het ontmoeten van iemand nieuw',
      sections: [
        {
          heading: '',
          paragraphs: [
            'Iemand nieuw ontmoeten zou spannend moeten zijn, niet stressvol. Of je nu ervaring hebt met online platforms of het voor het eerst doet, deze tien tips helpen je om jezelf te beschermen en een positieve ervaring te hebben.',
          ],
        },
        {
          heading: '1. Ontmoet altijd eerst op een openbare plek',
          paragraphs: [
            'Kies voor een eerste ontmoeting een goed verlichte openbare locatie zoals een cafe, hotellobby of restaurant. Openbare plekken bieden natuurlijke veiligheid en geven beide partijen de kans om het comfortniveau te beoordelen.',
          ],
        },
        {
          heading: '2. Vertel het aan een vertrouwd persoon',
          paragraphs: [
            'Laat voor je vertrekt iemand die je vertrouwt weten waar je naartoe gaat, wie je ontmoet en wanneer je terug verwacht. Dit is een verstandige voorzorgsmaatregel die minder dan een minuut duurt.',
          ],
        },
        {
          heading: '3. Vertrouw op je instinct',
          paragraphs: [
            'Als iets niet goed voelt, vertrouw dan op dat gevoel. Je bent nooit verplicht om te blijven. Een beleefd vertrek is altijd acceptabel. Je comfort is belangrijker dan beleefdheid in een ongemakkelijke situatie.',
          ],
        },
        {
          heading: '4. Controleer of de foto\'s kloppen',
          paragraphs: [
            'Neem bij aankomst even de tijd om te bevestigen dat de persoon overeenkomt met de profielfoto\'s. Als ze er aanzienlijk anders uitzien, is het volkomen acceptabel om je te excuseren.',
          ],
        },
        {
          heading: '5. Gebruik WhatsApp, niet je persoonlijke nummer',
          paragraphs: [
            'Pinklights gebruikt WhatsApp voor direct contact, wat een laag van scheiding biedt tussen je persoonlijke identiteit en je gesprekken. Je kunt je WhatsApp-privacyinstellingen aanpassen om te beperken wat de andere persoon ziet.',
          ],
        },
        {
          heading: '6. Deel nooit financiele informatie',
          paragraphs: [
            'Deel geen bankgegevens, creditcardnummers en maak geen geld over aan iemand die je via het platform hebt ontmoet. Legitieme connecties zullen nooit om financiele informatie vragen.',
          ],
        },
        {
          heading: '7. Spreek verwachtingen vooraf af',
          paragraphs: [
            'Duidelijke communicatie vooraf voorkomt misverstanden. Bespreek wat jullie beiden zoeken, grenzen en praktische details zoals timing en locatie.',
          ],
        },
        {
          heading: '8. Respecteer grenzen, die van jou en die van hen',
          paragraphs: [
            'Toestemming is doorlopend en geldt in elke situatie. Als een van beide partijen van gedachten verandert, moet die beslissing zonder vragen worden gerespecteerd. Een positieve ervaring is gebouwd op wederzijds respect.',
          ],
        },
        {
          heading: '9. Ken je rechten',
          paragraphs: [
            'In Belgie heb je wettelijke rechten die je beschermen bij elke interactie. Maak je vertrouwd met wat wel en niet legaal is, en weet dat je de lokale autoriteiten kunt contacteren als je je onveilig voelt.',
          ],
        },
        {
          heading: '10. Meld problemen aan het platform',
          paragraphs: [
            'Als je een frauduleus profiel of ongepast gedrag tegenkomt, meld het dan. Pinklights neemt meldingen serieus en beoordeelt gemarkeerde profielen snel. Je melding wordt vertrouwelijk behandeld.',
          ],
        },
        {
          heading: 'Tot slot',
          paragraphs: [
            'Veiligheid is een gedeelde verantwoordelijkheid. Door deze eenvoudige voorzorgsmaatregelen te nemen, draag je bij aan een cultuur van respect en vertrouwen op het platform.',
          ],
        },
      ],
      relatedPages: [
        { title: 'Veiligheid en privacy', description: 'Ontdek hoe Pinklights je gegevens beschermt.', url: '/safety' },
        { title: 'Gids voor je eerste ontmoeting', description: 'Bereid je eerste ontmoeting voor met vertrouwen.', url: '/guides/first-meeting' },
        { title: 'Hoe het werkt', description: 'Stapsgewijze gids voor het bladeren en verbinden op Pinklights.', url: '/guides/how-it-works' },
      ],
    },
    'first-meeting': {
      slug: 'first-meeting',
      metaTitle: 'Gids voor je eerste ontmoeting - Praktische tips',
      metaDescription: 'Bereid je voor op je eerste ontmoeting. Praktisch advies over locaties, gesprekken en wat je kunt verwachten.',
      title: 'Je eerste ontmoeting: een complete gids',
      sections: [
        {
          heading: '',
          paragraphs: [
            'Iemand voor het eerst persoonlijk ontmoeten kan zenuwslopend zijn, vooral als je nieuw bent op online platforms. Het goede nieuws is dat een beetje voorbereiding een groot verschil maakt.',
          ],
        },
        {
          heading: 'Verwachtingen beheren',
          paragraphs: [
            'Denk vooraf na over wat je echt zoekt. Wees eerlijk tegen jezelf over je verwachtingen, dat helpt om ze duidelijk te communiceren en voorkomt teleurstelling aan beide kanten.',
          ],
        },
        {
          heading: 'Communicatie voor de ontmoeting',
          paragraphs: [
            'Het WhatsApp-gesprek voorafgaand aan de ontmoeting is je kans om een band op te bouwen en de toon te zetten. Houd berichten respectvol en duidelijk. Bespreek praktische details: wanneer en waar je afspreekt en hoelang jullie beschikbaar zijn.',
          ],
        },
        {
          heading: 'De juiste locatie kiezen',
          paragraphs: [
            'De locatie bepaalt de sfeer van je ontmoeting. Voor een eerste keer is een openbare ruimte altijd aan te raden. Een hotellobbybar, een rustig cafe of een stijlvol restaurant zijn goede opties. In Brussel biedt de omgeving van de Grote Markt discrete en toegankelijke ontmoetingsplekken. In Antwerpen heeft het Zuid-district elegante bars.',
          ],
        },
        {
          heading: 'Wat trek je aan',
          paragraphs: [
            'Kleed je op een manier die je zelfverzekerd maakt. Schone, goed passende kleding die bij de locatie past is voldoende. Het doel is dat je je goed voelt in je eigen vel.',
          ],
        },
        {
          heading: 'Het gesprek beginnen',
          paragraphs: [
            'De eerste paar minuten kunnen ongemakkelijk zijn, en dat is heel normaal. Eenvoudige gespreksonderwerpen werken het best. Geef een opmerking over de locatie, vraag naar hun dag of verwijs naar jullie WhatsApp-gesprek.',
          ],
        },
        {
          heading: 'Omgaan met zenuwen',
          paragraphs: [
            'Het is volkomen normaal om zenuwachtig te zijn. Kom een paar minuten eerder om tot rust te komen, bestel een drankje en bedenk dat de andere persoon misschien net zo zenuwachtig is als jij. Zenuwen verdwijnen vaak binnen de eerste vijf minuten.',
          ],
        },
        {
          heading: 'Wanneer opnieuw contact opnemen',
          paragraphs: [
            'Als de ontmoeting goed is verlopen, is een kort WhatsApp-berichtje achteraf gepast. Iets eenvoudigs als bedanken voor een fijne tijd is voldoende. Eerlijke, directe communicatie wordt altijd gewaardeerd.',
          ],
        },
        {
          heading: 'Waarschuwingssignalen',
          paragraphs: [
            'Blijf alert op waarschuwingssignalen: de persoon ziet er heel anders uit dan op de foto\'s, dringt aan op een prive-locatie, vraagt om geld of respecteert je grenzen niet. Als dit gebeurt, vertrouw op je instinct en vertrek.',
          ],
        },
        {
          heading: 'Een laatste woord van aanmoediging',
          paragraphs: [
            'Iedereen heeft een eerste keer. Voorbereiding gaat niet over het controleren van elk detail, maar over jezelf de tools geven om te ontspannen en van de ervaring te genieten. Wees jezelf, wees respectvol, en onthoud dat de beste connecties ontstaan wanneer beide mensen op hun gemak zijn.',
          ],
        },
      ],
      relatedPages: [
        { title: 'Veiligheidstips', description: 'Tien praktische tips om veilig te blijven.', url: '/guides/safety-tips' },
        { title: 'Hoe het werkt', description: 'Stapsgewijze gids voor Pinklights.', url: '/guides/how-it-works' },
        { title: 'Gids voor bezoekers', description: 'Pinklights gebruiken tijdens een kort verblijf in Belgie.', url: '/guides/for-visitors' },
      ],
    },
    'for-visitors': {
      slug: 'for-visitors',
      metaTitle: 'Pinklights voor bezoekers aan Belgie',
      metaDescription: 'Bezoek je Belgie? Ontdek hoe je Pinklights gebruikt voor korte verblijven. WhatsApp werkt internationaal, geen Belgisch nummer nodig.',
      title: 'Pinklights voor bezoekers aan Belgie',
      sections: [
        {
          heading: '',
          paragraphs: [
            'Belgie is een van de meest toegankelijke landen van Europa, en Pinklights werkt net zo goed voor bezoekers als voor inwoners. Of je nu op zakenreis bent, een weekendje weg of een langere vakantie, deze gids helpt je het meeste uit je tijd hier te halen.',
          ],
        },
        {
          heading: 'Belgie\'s compacte formaat werkt in je voordeel',
          paragraphs: [
            'Je kunt het hele land met de trein doorkruisen in ongeveer twee uur. Brussel-Antwerpen duurt ongeveer 40 minuten, Gent-Brugge minder dan 30 minuten. Profielen in naburige steden zijn dus echt binnen bereik. Stel een ruim afstandsfilter in en je ziet profielen uit meerdere steden tegelijk.',
          ],
        },
        {
          heading: 'Beste steden om te bezoeken',
          paragraphs: [
            'Elke Belgische stad heeft zijn eigen karakter. Brussel is kosmopolitisch en meertalig. Antwerpen staat bekend om mode en nachtleven. Gent combineert een levendige universiteitssfeer met middeleeuwse architectuur. Brugge biedt een intiemere, romantische setting. Luik brengt warmte en Franstalige cultuur met het beroemde Carre-uitgaansgebied.',
          ],
        },
        {
          heading: 'Hoe Pinklights werkt voor korte verblijven',
          paragraphs: [
            'Pinklights vereist geen accountaanmaak om profielen te bekijken, ideaal voor bezoekers. Je kunt de site openen op je telefoon, filteren op je huidige stad, door profielen scrollen en contact opnemen via WhatsApp, allemaal binnen enkele minuten. Geen wachttijd, geen matching-algoritme en geen abonnement om op te zeggen.',
          ],
        },
        {
          heading: 'Geen Belgisch telefoonnummer nodig',
          paragraphs: [
            'Omdat Pinklights WhatsApp gebruikt voor alle directe communicatie, heb je geen Belgische SIM-kaart nodig. WhatsApp werkt via wifi en mobiele data met elk internationaal nummer. Verbind met hotel-wifi of gebruik je roaming-data en je bent klaar.',
          ],
        },
        {
          heading: 'Taaloverwegingen',
          paragraphs: [
            'Belgie heeft drie officiele talen (Nederlands, Frans en Duits) maar Engels wordt veel gesproken, vooral in Brussel, Antwerpen en Gent. De meeste profielen bevatten Engelse beschrijvingen. Aarzel niet om in je eerste bericht naar taalvoorkeuren te vragen.',
          ],
        },
        {
          heading: 'Etiquette voor hotelontmoetingen',
          paragraphs: [
            'Veel bezoekers geven de voorkeur aan een ontmoeting in hun hotel. Overweeg om eerst in de lobby of bar af te spreken in plaats van direct naar een kamer te gaan. Dit geeft beide partijen de kans om het comfortniveau te bevestigen.',
          ],
        },
        {
          heading: 'Het meeste uit een kort bezoek halen',
          paragraphs: [
            'Als je tijd in Belgie beperkt is, kan wat voorbereidend werk een groot verschil maken. Bekijk profielen voor je aankomst. Stuur een dag of twee van tevoren een WhatsApp-bericht om jezelf voor te stellen. Wees open over je data en beschikbaarheid.',
            'Belgie mag dan klein zijn, het biedt een opmerkelijke hoeveelheid cultuur, keuken en mogelijkheden. Pinklights helpt je om het meeste uit elk bezoek te halen.',
          ],
        },
      ],
      relatedPages: [
        { title: 'Profielen zoeken', description: 'Bekijk profielen per stad in heel Belgie.', url: '/find' },
        { title: 'Gids eerste ontmoeting', description: 'Bereid je eerste ontmoeting voor met vertrouwen.', url: '/guides/first-meeting' },
        { title: 'Hoe het werkt', description: 'Stapsgewijze gids voor Pinklights.', url: '/guides/how-it-works' },
      ],
    },
    'profile-tips': {
      slug: 'profile-tips',
      metaTitle: 'Profieltips - Maak een aantrekkelijk profiel',
      metaDescription: 'Tips voor profielmakers op Pinklights: kies de juiste foto\'s, schrijf een eerlijke bio, beheer zichtbaarheid en trek goede connecties aan.',
      title: 'Profieltips: opvallen op Pinklights',
      sections: [
        {
          heading: '',
          paragraphs: [
            'Je profiel is je eerste indruk op Pinklights. Het is wat bezoekers zien wanneer ze bladeren, filteren en beslissen wie ze willen contacteren. Een goed profiel trekt betere connecties aan en maakt je tijd op het platform waardevoller.',
          ],
        },
        {
          heading: 'Kies duidelijke, goed verlichte foto\'s',
          paragraphs: [
            'Foto\'s zijn het belangrijkste element van je profiel. Kies beelden die goed verlicht, scherp en representatief zijn voor hoe je er nu uitziet. Natuurlijk licht is bijna altijd flatteuzer. Vermijd zware filters. Je hoofdfoto moet duidelijk je gezicht tonen en recent zijn.',
          ],
        },
        {
          heading: 'Gebruik meerdere foto\'s vanuit verschillende hoeken',
          paragraphs: [
            'Een enkele foto vertelt maar een deel van het verhaal. Upload meerdere beelden die verschillende hoeken, outfits en settings tonen. Een mix van close-ups en full-body foto\'s geeft een compleet beeld. Variatie versterkt het vertrouwen in de authenticiteit van je profiel.',
          ],
        },
        {
          heading: 'Schrijf een eerlijke, boeiende bio',
          paragraphs: [
            'Je bio is je kans om persoonlijkheid te tonen voorbij de foto\'s. Schrijf in je eigen stem. Vermeld wat je uniek maakt en welk type connecties je zoekt. Vermijd generieke zinnen. Specificiteit valt op.',
          ],
        },
        {
          heading: 'Stel een realistische beschikbaarheid in',
          paragraphs: [
            'Als je aangeeft beschikbaar te zijn op bepaalde tijden, zorg ervoor dat die informatie klopt. Werk je beschikbaarheid regelmatig bij. Consistentie tussen wat je profiel zegt en hoe je reageert bouwt vertrouwen op.',
          ],
        },
        {
          heading: 'Gebruik de zichtbaarheidsboost',
          paragraphs: [
            'Pinklights biedt een zichtbaarheidsboost die je profiel hoger plaatst in zoekresultaten tijdens piekuren. Plan je boosts strategisch: avonden en weekenden kennen meer verkeer. Gebruik boosts wanneer je daadwerkelijk beschikbaar bent om te reageren.',
          ],
        },
        {
          heading: 'Reageer snel op WhatsApp-berichten',
          paragraphs: [
            'Snelheid telt. Wanneer iemand je via WhatsApp bereikt, toont diegene actieve interesse. Een snelle, vriendelijke reactie vergroot de kans dat die interesse wordt omgezet in een ontmoeting.',
          ],
        },
        {
          heading: 'Houd je profielinformatie actueel',
          paragraphs: [
            'Een verouderd profiel is erger dan geen profiel. Werk je foto\'s, locatie en beschikbaarheid regelmatig bij. Maak er een gewoonte van om je profiel minstens eenmaal per maand te controleren.',
          ],
        },
        {
          heading: 'Beschrijf je diensten duidelijk',
          paragraphs: [
            'Duidelijkheid voorkomt misverstanden. Je profiel moet helder beschrijven wat je aanbiedt. Gebruik directe taal en wees specifiek. Hoe duidelijker je profiel, hoe groter de kans dat je mensen aantrekt die echt geinteresseerd zijn.',
          ],
        },
        {
          heading: 'Kwaliteit boven kwantiteit',
          paragraphs: [
            'Een geweldig profiel gaat niet over de meeste foto\'s of de langste bio. Het gaat over jezelf authentiek en professioneel presenteren. Elk element moet een doel dienen.',
          ],
        },
      ],
      relatedPages: [
        { title: 'Hoe het werkt', description: 'Stapsgewijze gids voor Pinklights.', url: '/guides/how-it-works' },
        { title: 'Veiligheidstips', description: 'Tien praktische tips om veilig te blijven.', url: '/guides/safety-tips' },
      ],
    },
  },

  // =======================================================================
  // SPANISH
  // =======================================================================
  es: {
    'how-it-works': {
      slug: 'how-it-works',
      metaTitle: 'Como funciona Pinklights - Guia paso a paso',
      metaDescription: 'Aprende a explorar perfiles, filtrar preferencias y contactar directamente por WhatsApp en Pinklights. Sin necesidad de cuenta.',
      title: 'Como funciona Pinklights',
      sections: [
        {
          heading: '',
          paragraphs: [
            'Pinklights esta disenado para ser sencillo. A diferencia de las apps de citas tradicionales que requieren largos registros y cuestionarios de personalidad, nuestra plataforma te permite explorar perfiles reales y contactar directamente en pocos minutos.',
          ],
        },
        {
          heading: 'Paso 1: Visita el sitio',
          paragraphs: [
            'Entra en Pinklights.be desde cualquier dispositivo: ordenador, tableta o movil. La plataforma es totalmente responsive y funciona en cualquier navegador moderno. No hay ninguna app que descargar ni cuenta que crear para empezar a explorar.',
          ],
        },
        {
          heading: 'Paso 2: Elige un tipo de servicio',
          paragraphs: [
            'Pinklights organiza los perfiles por tipo de servicio para que encuentres exactamente lo que buscas. Selecciona la categoria que coincida con tu interes. Este primer filtro reduce los resultados a los perfiles mas relevantes.',
          ],
        },
        {
          heading: 'Paso 3: Selecciona tus preferencias',
          paragraphs: [
            'Despues de elegir un tipo de servicio, puedes refinar tu busqueda seleccionando preferencias de genero. Esta combinacion asegura que los perfiles que ves se ajustan a lo que realmente te interesa.',
          ],
        },
        {
          heading: 'Paso 4: Explora perfiles con filtros',
          paragraphs: [
            'La pagina de resultados muestra tarjetas de perfil con fotos, datos basicos e informacion de ubicacion. Puedes filtrar por ciudad o radio de distancia (hasta 50 km), asi como por atributos fisicos como apariencia y rango de edad. Belgica es compacta, por lo que alguien en Amberes puede estar a solo 30 minutos de Gante o Bruselas.',
          ],
        },
        {
          heading: 'Paso 5: Consulta perfiles detallados',
          paragraphs: [
            'Haz clic en cualquier tarjeta para ver el perfil completo. Encontraras varias fotos, una bio, detalles fisicos, informacion de disponibilidad y los servicios ofrecidos. Tomate tu tiempo para revisar los perfiles antes de contactar.',
          ],
        },
        {
          heading: 'Paso 6: Contacta directamente por WhatsApp',
          paragraphs: [
            'Cuando encuentres un perfil que te interese, contacta a la persona directamente por WhatsApp. Es la forma mas rapida y personal de iniciar una conversacion. No hay mensajeria interna, no hay creditos que gastar en mensajes y no hay intermediarios.',
            'WhatsApp tambien funciona a nivel internacional, lo que hace que Pinklights sea especialmente conveniente para viajeros que visitan Belgica.',
          ],
        },
        {
          heading: 'Navegar sin cuenta',
          paragraphs: [
            'Una de las cosas que distingue a Pinklights es que la navegacion es completamente abierta. No necesitas crear una cuenta, verificar un correo ni proporcionar informacion personal para ver los perfiles.',
          ],
        },
        {
          heading: 'Para propietarios de perfiles: visibilidad y creditos',
          paragraphs: [
            'Si eres propietario de un perfil, la creacion y el mantenimiento funcionan con un sistema de creditos diarios. Estos creditos mantienen tu perfil visible en los resultados de busqueda. Tambien puedes aumentar tu visibilidad para aparecer mas arriba durante las horas punta.',
            'Gestionar tu perfil es sencillo. Actualiza tus fotos, ajusta tu disponibilidad y recarga creditos desde tu panel de control.',
          ],
        },
      ],
      relatedPages: [
        { title: 'Consejos de seguridad', description: 'Diez consejos practicos para mantenerte seguro en tus encuentros.', url: '/guides/safety-tips' },
        { title: 'Guia del primer encuentro', description: 'Preparate para tu primer encuentro en persona.', url: '/guides/first-meeting' },
        { title: 'Guia para visitantes', description: 'Usar Pinklights durante una estancia corta en Belgica.', url: '/guides/for-visitors' },
      ],
    },
    'safety-tips': {
      slug: 'safety-tips',
      metaTitle: '10 consejos de seguridad para conocer a alguien',
      metaDescription: 'Consejos de seguridad practicos: quedar en publico, verificar perfiles, proteger tu privacidad. Mantente seguro con Pinklights.',
      title: '10 consejos de seguridad para conocer a alguien nuevo',
      sections: [
        {
          heading: '',
          paragraphs: [
            'Conocer a alguien nuevo deberia ser emocionante, no estresante. Tanto si tienes experiencia con plataformas online como si es tu primera vez, estos diez consejos te ayudaran a protegerte y tener una experiencia positiva.',
          ],
        },
        {
          heading: '1. Queda siempre en un lugar publico',
          paragraphs: [
            'Para un primer encuentro, elige un lugar publico bien iluminado como una cafeteria, el vestibulo de un hotel o un restaurante. Los espacios publicos ofrecen seguridad natural y permiten a ambas partes evaluar su nivel de comodidad.',
          ],
        },
        {
          heading: '2. Informa a una persona de confianza',
          paragraphs: [
            'Antes de ir, dile a alguien de confianza adonde vas, con quien te vas a encontrar y cuando esperas volver. Es una precaucion sensata que lleva menos de un minuto.',
          ],
        },
        {
          heading: '3. Confia en tu instinto',
          paragraphs: [
            'Si algo no te parece bien, en cualquier momento del encuentro, confia en esa sensacion. Nunca estas obligado a quedarte. Una salida educada siempre es aceptable. Tu comodidad es mas importante que la cortesia en una situacion incomoda.',
          ],
        },
        {
          heading: '4. Verifica que las fotos coinciden',
          paragraphs: [
            'Al llegar al punto de encuentro, confirma que la persona coincide con sus fotos de perfil. Si se ve significativamente diferente, es perfectamente aceptable excusarte.',
          ],
        },
        {
          heading: '5. Usa WhatsApp, no tu numero personal',
          paragraphs: [
            'Pinklights usa WhatsApp para el contacto directo, lo que proporciona una capa de separacion entre tu identidad personal y tus conversaciones. Puedes ajustar la configuracion de privacidad de WhatsApp para limitar lo que la otra persona ve.',
          ],
        },
        {
          heading: '6. Nunca compartas informacion financiera',
          paragraphs: [
            'No compartas datos bancarios, numeros de tarjeta de credito ni transfieras dinero a nadie que hayas conocido a traves de la plataforma. Las conexiones legitimas nunca pediran informacion financiera.',
          ],
        },
        {
          heading: '7. Acuerda las expectativas de antemano',
          paragraphs: [
            'La comunicacion clara antes del encuentro previene malentendidos. Habla sobre lo que ambos buscan, los limites y los detalles practicos como el horario y el lugar.',
          ],
        },
        {
          heading: '8. Respeta los limites, los tuyos y los suyos',
          paragraphs: [
            'El consentimiento es continuo y se aplica en toda situacion. Si cualquiera de las partes cambia de opinion en cualquier momento, esa decision debe ser respetada sin cuestionamiento. Una experiencia positiva se construye sobre el respeto mutuo.',
          ],
        },
        {
          heading: '9. Conoce tus derechos',
          paragraphs: [
            'En Belgica, tienes derechos legales que te protegen en cada interaccion. Familiarizate con lo que es legal y ten en cuenta que puedes contactar a las autoridades locales si te sientes inseguro.',
          ],
        },
        {
          heading: '10. Reporta los problemas a la plataforma',
          paragraphs: [
            'Si encuentras un perfil fraudulento o un comportamiento inapropiado, reportalo. Pinklights toma los reportes en serio y revisa los perfiles senalados con prontitud. Tu reporte sera tratado con confidencialidad.',
          ],
        },
        {
          heading: 'Reflexion final',
          paragraphs: [
            'La seguridad es una responsabilidad compartida. Al tomar estas precauciones simples, contribuyes a una cultura de respeto y confianza en la plataforma.',
          ],
        },
      ],
      relatedPages: [
        { title: 'Seguridad y privacidad', description: 'Descubre como Pinklights protege tus datos.', url: '/safety' },
        { title: 'Guia del primer encuentro', description: 'Preparate para tu primer encuentro con confianza.', url: '/guides/first-meeting' },
        { title: 'Como funciona', description: 'Guia paso a paso para explorar y conectar en Pinklights.', url: '/guides/how-it-works' },
      ],
    },
    'first-meeting': {
      slug: 'first-meeting',
      metaTitle: 'Guia del primer encuentro - Consejos practicos',
      metaDescription: 'Preparandote para tu primer encuentro en persona? Consejos sobre lugares, conversacion y que esperar.',
      title: 'Tu primer encuentro: guia completa',
      sections: [
        {
          heading: '',
          paragraphs: [
            'Conocer a alguien en persona por primera vez puede poner nervioso, especialmente si eres nuevo en las plataformas online. La buena noticia es que un poco de preparacion marca una gran diferencia.',
          ],
        },
        {
          heading: 'Gestionar expectativas',
          paragraphs: [
            'Antes de quedar, piensa en lo que realmente buscas. Ser honesto contigo mismo sobre tus expectativas te ayuda a comunicarlas con claridad y evita decepciones.',
          ],
        },
        {
          heading: 'Comunicacion antes del encuentro',
          paragraphs: [
            'La conversacion por WhatsApp antes de veros es tu oportunidad para establecer una conexion y definir el tono. Manten los mensajes respetuosos y claros. Habla de detalles practicos: cuando y donde quedar, cuanto tiempo tienen.',
          ],
        },
        {
          heading: 'Elegir el lugar adecuado',
          paragraphs: [
            'El lugar define el ambiente del encuentro. Para la primera vez, un espacio publico es siempre recomendable. El bar de un hotel, una cafeteria tranquila o un restaurante elegante funcionan bien. En Bruselas, la zona de la Grand-Place ofrece lugares discretos y accesibles. En Amberes, el distrito Zuid tiene bares elegantes.',
          ],
        },
        {
          heading: 'Como vestirse',
          paragraphs: [
            'Viste de forma que te haga sentir seguro y te represente. Ropa limpia y bien ajustada apropiada para el lugar es suficiente. El objetivo es sentirte comodo en tu propia piel.',
          ],
        },
        {
          heading: 'Iniciar la conversacion',
          paragraphs: [
            'Los primeros minutos pueden ser un poco incomodos, y eso es totalmente normal. Los temas sencillos funcionan mejor. Comenta algo sobre el lugar, pregunta por su dia o haz referencia a vuestra conversacion por WhatsApp.',
          ],
        },
        {
          heading: 'Manejar los nervios',
          paragraphs: [
            'Es completamente normal estar nervioso. Llega unos minutos antes para acomodarte, pide una bebida y recuerda que la otra persona puede estar igual de nerviosa. Los nervios suelen desaparecer en los primeros cinco minutos.',
          ],
        },
        {
          heading: 'Cuando hacer seguimiento',
          paragraphs: [
            'Si el encuentro fue bien, un breve mensaje de WhatsApp despues es lo apropiado. Algo sencillo como agradecer por un buen rato es suficiente. La comunicacion directa y sincera siempre se agradece.',
          ],
        },
        {
          heading: 'Senales de alerta',
          paragraphs: [
            'Mantente alerta ante senales de advertencia: la persona se ve muy diferente a sus fotos, te presiona para ir a un lugar privado, pide dinero o no respeta tus limites. Si ocurre algo de esto, confia en tu instinto y vete.',
          ],
        },
        {
          heading: 'Unas palabras de animo',
          paragraphs: [
            'Todos tienen una primera vez. La preparacion no se trata de controlar cada detalle, sino de darte las herramientas para relajarte y disfrutar la experiencia. Se tu mismo, se respetuoso, y recuerda que las mejores conexiones surgen cuando ambas personas se sienten a gusto.',
          ],
        },
      ],
      relatedPages: [
        { title: 'Consejos de seguridad', description: 'Diez consejos practicos para mantenerte seguro.', url: '/guides/safety-tips' },
        { title: 'Como funciona', description: 'Guia paso a paso para Pinklights.', url: '/guides/how-it-works' },
        { title: 'Guia para visitantes', description: 'Usar Pinklights durante una estancia corta en Belgica.', url: '/guides/for-visitors' },
      ],
    },
    'for-visitors': {
      slug: 'for-visitors',
      metaTitle: 'Pinklights para visitantes en Belgica',
      metaDescription: 'Visitas Belgica? Aprende a usar Pinklights para estancias cortas. WhatsApp funciona internacionalmente, sin necesidad de numero belga.',
      title: 'Pinklights para visitantes en Belgica',
      sections: [
        {
          heading: '',
          paragraphs: [
            'Belgica es uno de los paises mas accesibles de Europa, y Pinklights funciona igual de bien para visitantes que para residentes. Ya sea que estes de viaje de negocios, una escapada o unas vacaciones largas, esta guia te ayudara a aprovechar tu tiempo aqui.',
          ],
        },
        {
          heading: 'El tamano compacto de Belgica juega a tu favor',
          paragraphs: [
            'Puedes cruzar todo el pais en tren en unas dos horas. Bruselas-Amberes tarda unos 40 minutos, Gante-Brujas menos de 30. Los perfiles en ciudades cercanas estan realmente al alcance. Configura un filtro de distancia generoso y veras perfiles de varias ciudades.',
          ],
        },
        {
          heading: 'Mejores ciudades para visitar',
          paragraphs: [
            'Cada ciudad belga tiene su propio caracter. Bruselas es cosmopolita y multilingue. Amberes es conocida por la moda y la vida nocturna. Gante combina ambiente universitario con arquitectura medieval. Brujas ofrece un entorno mas intimo y romantico. Lieja aporta calidez y cultura francofona con su famoso barrio del Carre.',
          ],
        },
        {
          heading: 'Como funciona Pinklights para estancias cortas',
          paragraphs: [
            'Pinklights no requiere crear una cuenta para explorar perfiles, lo que es perfecto para visitantes. Puedes abrir el sitio en tu telefono, filtrar por ciudad, revisar perfiles y contactar por WhatsApp en minutos. Sin periodos de espera, sin algoritmos y sin suscripcion que cancelar.',
          ],
        },
        {
          heading: 'No necesitas un numero belga',
          paragraphs: [
            'Como Pinklights usa WhatsApp para toda la comunicacion directa, no necesitas una tarjeta SIM belga. WhatsApp funciona por wifi y datos moviles con cualquier numero internacional. Conectate al wifi del hotel o usa tus datos de roaming.',
          ],
        },
        {
          heading: 'Consideraciones sobre el idioma',
          paragraphs: [
            'Belgica tiene tres idiomas oficiales (neerlandes, frances y aleman) pero el ingles se habla ampliamente, especialmente en Bruselas, Amberes y Gante. La mayoria de los perfiles incluyen descripciones en ingles. No dudes en preguntar por las preferencias de idioma en tu primer mensaje.',
          ],
        },
        {
          heading: 'Protocolo para encuentros en hoteles',
          paragraphs: [
            'Muchos visitantes prefieren quedar en su hotel. Si eliges esta opcion, considera encontrarte primero en el vestibulo o el bar en lugar de ir directamente a la habitacion. Esto da a ambas partes la oportunidad de confirmar su nivel de comodidad.',
          ],
        },
        {
          heading: 'Aprovechar al maximo una visita corta',
          paragraphs: [
            'Si tu tiempo en Belgica es limitado, un poco de planificacion previa puede marcar la diferencia. Explora perfiles antes de llegar. Envia un mensaje de WhatsApp uno o dos dias antes para presentarte. Se directo sobre tus fechas y disponibilidad.',
            'Belgica es pequena pero ofrece una cantidad notable de cultura, gastronomia y oportunidades de conexion. Pinklights esta aqui para ayudarte a aprovechar cada visita.',
          ],
        },
      ],
      relatedPages: [
        { title: 'Buscar perfiles', description: 'Explora perfiles por ciudad en toda Belgica.', url: '/find' },
        { title: 'Guia del primer encuentro', description: 'Preparate para tu primer encuentro con confianza.', url: '/guides/first-meeting' },
        { title: 'Como funciona', description: 'Guia paso a paso para Pinklights.', url: '/guides/how-it-works' },
      ],
    },
    'profile-tips': {
      slug: 'profile-tips',
      metaTitle: 'Consejos de perfil - Crea un perfil atractivo',
      metaDescription: 'Consejos para creadores de perfiles en Pinklights: elige las fotos correctas, escribe una bio honesta y atrae conexiones de calidad.',
      title: 'Consejos para tu perfil: destaca en Pinklights',
      sections: [
        {
          heading: '',
          paragraphs: [
            'Tu perfil es tu primera impresion en Pinklights. Es lo que los visitantes ven cuando exploran, filtran y deciden a quien contactar. Un perfil bien hecho atrae mejores conexiones y hace que tu experiencia en la plataforma sea mas gratificante.',
          ],
        },
        {
          heading: 'Elige fotos claras y bien iluminadas',
          paragraphs: [
            'Las fotos son el elemento mas importante de tu perfil. Elige imagenes bien iluminadas, enfocadas y que representen tu aspecto actual. La luz natural es casi siempre mas favorecedora. Evita los filtros pesados. Tu foto principal debe mostrar claramente tu rostro y ser reciente.',
          ],
        },
        {
          heading: 'Usa varias fotos desde distintos angulos',
          paragraphs: [
            'Una sola foto solo cuenta parte de la historia. Sube varias imagenes que muestren diferentes angulos, atuendos y escenarios. La variedad refuerza la confianza en la autenticidad de tu perfil.',
          ],
        },
        {
          heading: 'Escribe una bio honesta y atractiva',
          paragraphs: [
            'Tu bio es tu oportunidad de mostrar personalidad mas alla de las fotos. Escribe con tu propia voz. Menciona lo que te hace unico y el tipo de conexiones que buscas. Evita frases genericas. La especificidad se recuerda.',
          ],
        },
        {
          heading: 'Establece una disponibilidad realista',
          paragraphs: [
            'Si indicas que estas disponible en determinados horarios, asegurate de que esa informacion sea precisa. Actualiza tu disponibilidad con regularidad. La coherencia entre lo que dice tu perfil y como respondes genera confianza.',
          ],
        },
        {
          heading: 'Usa la funcion de impulso de visibilidad',
          paragraphs: [
            'Pinklights ofrece un impulso de visibilidad que coloca tu perfil mas arriba en los resultados de busqueda durante las horas punta. Programa tus impulsos estrategicamente: las tardes y los fines de semana tienen mas trafico. Usalo cuando estes disponible para responder.',
          ],
        },
        {
          heading: 'Responde rapido a los mensajes de WhatsApp',
          paragraphs: [
            'La rapidez importa. Cuando alguien te contacta por WhatsApp, esta mostrando interes activo. Una respuesta rapida y amable aumenta significativamente las posibilidades de convertir ese interes en un encuentro.',
          ],
        },
        {
          heading: 'Manten la informacion de tu perfil actualizada',
          paragraphs: [
            'Un perfil desactualizado es peor que no tener perfil. Actualiza tus fotos, ubicacion y disponibilidad con regularidad. Revisa tu perfil al menos una vez al mes.',
          ],
        },
        {
          heading: 'Describe tus servicios con claridad',
          paragraphs: [
            'La claridad previene malentendidos. Tu perfil debe describir claramente lo que ofreces. Usa un lenguaje directo y se especifico. Cuanto mas claro sea tu perfil, mas probabilidades tendras de atraer a personas genuinamente interesadas.',
          ],
        },
        {
          heading: 'Calidad antes que cantidad',
          paragraphs: [
            'Un gran perfil no se trata de tener mas fotos o la bio mas larga. Se trata de presentarte de forma autentica y profesional. Cada elemento debe tener un proposito.',
          ],
        },
      ],
      relatedPages: [
        { title: 'Como funciona', description: 'Guia paso a paso para Pinklights.', url: '/guides/how-it-works' },
        { title: 'Consejos de seguridad', description: 'Diez consejos practicos para mantenerte seguro.', url: '/guides/safety-tips' },
      ],
    },
  },

  // =======================================================================
  // PORTUGUESE
  // =======================================================================
  pt: {
    'how-it-works': {
      slug: 'how-it-works',
      metaTitle: 'Como funciona o Pinklights - Guia passo a passo',
      metaDescription: 'Saiba como explorar perfis, filtrar preferencias e contactar diretamente por WhatsApp no Pinklights. Sem necessidade de conta.',
      title: 'Como funciona o Pinklights',
      sections: [
        {
          heading: '',
          paragraphs: [
            'O Pinklights foi concebido para ser simples. Ao contrario das apps de encontros tradicionais que exigem registos longos e questionarios de personalidade, a nossa plataforma permite explorar perfis reais e estabelecer contacto em poucos minutos.',
          ],
        },
        {
          heading: 'Passo 1: Visite o site',
          paragraphs: [
            'Aceda a Pinklights.be em qualquer dispositivo: computador, tablet ou smartphone. A plataforma e totalmente responsiva e funciona em qualquer browser moderno. Nao ha nenhuma app para descarregar nem conta para criar para comecar a explorar.',
          ],
        },
        {
          heading: 'Passo 2: Escolha um tipo de servico',
          paragraphs: [
            'O Pinklights organiza os perfis por tipo de servico para que encontre exatamente o que procura. Selecione a categoria que corresponde ao seu interesse. Este primeiro filtro reduz os resultados aos perfis mais relevantes.',
          ],
        },
        {
          heading: 'Passo 3: Selecione as suas preferencias',
          paragraphs: [
            'Apos escolher um tipo de servico, pode refinar a sua pesquisa selecionando preferencias de genero. Esta combinacao garante que os perfis apresentados correspondem ao que realmente lhe interessa.',
          ],
        },
        {
          heading: 'Passo 4: Explore perfis com filtros',
          paragraphs: [
            'A pagina de resultados apresenta cartoes de perfil com fotos, dados basicos e informacao de localizacao. Pode filtrar por cidade ou raio de distancia (ate 50 km), bem como por atributos fisicos como aparencia e faixa etaria. A Belgica e compacta, por isso alguem em Antuerpica pode estar a apenas 30 minutos de Gante ou Bruxelas.',
          ],
        },
        {
          heading: 'Passo 5: Consulte perfis detalhados',
          paragraphs: [
            'Clique em qualquer cartao para ver o perfil completo. Encontrara varias fotos, uma bio, detalhes fisicos, informacao de disponibilidade e os servicos oferecidos. Dedique tempo a analisar os perfis antes de entrar em contacto.',
          ],
        },
        {
          heading: 'Passo 6: Contacte diretamente por WhatsApp',
          paragraphs: [
            'Quando encontrar um perfil que lhe interesse, contacte a pessoa diretamente por WhatsApp. E a forma mais rapida e pessoal de iniciar uma conversa. Nao ha sistema de mensagens interno, nao ha creditos para gastar em mensagens e nao ha intermediarios.',
            'O WhatsApp tambem funciona internacionalmente, o que torna o Pinklights especialmente pratico para viajantes que visitam a Belgica.',
          ],
        },
        {
          heading: 'Navegar sem conta',
          paragraphs: [
            'Um dos pontos fortes do Pinklights e que a navegacao e completamente aberta. Nao precisa de criar uma conta, verificar um e-mail ou fornecer qualquer informacao pessoal para consultar perfis.',
          ],
        },
        {
          heading: 'Para proprietarios de perfis: visibilidade e creditos',
          paragraphs: [
            'Se e proprietario de um perfil, a criacao e gestao funcionam com um sistema de creditos diarios. Estes creditos mantem o seu perfil visivel nos resultados de pesquisa. Tambem pode aumentar a sua visibilidade para aparecer mais acima durante as horas de ponta.',
            'Gerir o seu perfil e simples. Atualize as suas fotos, ajuste a sua disponibilidade e recarregue creditos a partir do seu painel.',
          ],
        },
      ],
      relatedPages: [
        { title: 'Dicas de seguranca', description: 'Dez dicas praticas para se manter seguro nos seus encontros.', url: '/guides/safety-tips' },
        { title: 'Guia do primeiro encontro', description: 'Prepare-se para o seu primeiro encontro presencial.', url: '/guides/first-meeting' },
        { title: 'Guia para visitantes', description: 'Usar o Pinklights durante uma estadia curta na Belgica.', url: '/guides/for-visitors' },
      ],
    },
    'safety-tips': {
      slug: 'safety-tips',
      metaTitle: '10 dicas de seguranca para conhecer alguem',
      metaDescription: 'Conselhos de seguranca praticos: encontre-se em publico, verifique perfis, proteja a sua privacidade. Mantenha-se seguro com o Pinklights.',
      title: '10 dicas de seguranca para conhecer alguem novo',
      sections: [
        {
          heading: '',
          paragraphs: [
            'Conhecer alguem novo deve ser entusiasmante, nao stressante. Quer tenha experiencia com plataformas online ou seja a sua primeira vez, estas dez dicas ajudam a proteger-se e a ter uma experiencia positiva.',
          ],
        },
        {
          heading: '1. Encontre-se sempre num local publico primeiro',
          paragraphs: [
            'Para um primeiro encontro, escolha um local publico bem iluminado como um cafe, o lobby de um hotel ou um restaurante. Os espacos publicos oferecem seguranca natural e dao a ambas as partes a oportunidade de avaliar o nivel de conforto.',
          ],
        },
        {
          heading: '2. Informe uma pessoa de confianca',
          paragraphs: [
            'Antes de sair, diga a alguem de confianca para onde vai, quem vai encontrar e quando espera voltar. E uma precaucao sensata que leva menos de um minuto.',
          ],
        },
        {
          heading: '3. Confie nos seus instintos',
          paragraphs: [
            'Se algo nao lhe parece bem, em qualquer momento do encontro, confie nessa sensacao. Nunca e obrigado a ficar. Uma saida educada e sempre aceitavel. O seu conforto e mais importante do que ser educado numa situacao desconfortavel.',
          ],
        },
        {
          heading: '4. Verifique se as fotos correspondem',
          paragraphs: [
            'Ao chegar ao ponto de encontro, confirme que a pessoa corresponde as suas fotos de perfil. Se parecer significativamente diferente, e perfeitamente aceitavel desculpar-se.',
          ],
        },
        {
          heading: '5. Use o WhatsApp, nao o seu numero pessoal',
          paragraphs: [
            'O Pinklights usa o WhatsApp para contacto direto, o que proporciona uma camada de separacao entre a sua identidade pessoal e as suas conversas. Pode ajustar as definicoes de privacidade do WhatsApp para limitar o que a outra pessoa ve.',
          ],
        },
        {
          heading: '6. Nunca partilhe informacoes financeiras',
          paragraphs: [
            'Nao partilhe dados bancarios, numeros de cartao de credito nem transfira dinheiro para ninguem que tenha conhecido atraves da plataforma. Conexoes legitimas nunca pedem informacoes financeiras.',
          ],
        },
        {
          heading: '7. Combine as expectativas antecipadamente',
          paragraphs: [
            'Comunicacao clara antes do encontro previne mal-entendidos. Fale sobre o que ambos procuram, limites e detalhes praticos como horario e local.',
          ],
        },
        {
          heading: '8. Respeite os limites, os seus e os deles',
          paragraphs: [
            'O consentimento e continuo e aplica-se em todas as situacoes. Se qualquer uma das partes mudar de ideias em qualquer momento, essa decisao deve ser respeitada sem questionar. Uma experiencia positiva baseia-se no respeito mutuo.',
          ],
        },
        {
          heading: '9. Conheca os seus direitos',
          paragraphs: [
            'Na Belgica, tem direitos legais que o protegem em cada interacao. Familiarize-se com o que e legal e saiba que pode contactar as autoridades locais se se sentir inseguro.',
          ],
        },
        {
          heading: '10. Reporte problemas a plataforma',
          paragraphs: [
            'Se encontrar um perfil fraudulento ou comportamento inadequado, reporte-o. O Pinklights leva os reportes a serio e analisa os perfis sinalizados rapidamente. O seu reporte sera tratado com confidencialidade.',
          ],
        },
        {
          heading: 'Reflexao final',
          paragraphs: [
            'A seguranca e uma responsabilidade partilhada. Ao tomar estas precaucoes simples, contribui para uma cultura de respeito e confianca na plataforma.',
          ],
        },
      ],
      relatedPages: [
        { title: 'Seguranca e privacidade', description: 'Descubra como o Pinklights protege os seus dados.', url: '/safety' },
        { title: 'Guia do primeiro encontro', description: 'Prepare-se para o seu primeiro encontro com confianca.', url: '/guides/first-meeting' },
        { title: 'Como funciona', description: 'Guia passo a passo para explorar e conectar no Pinklights.', url: '/guides/how-it-works' },
      ],
    },
    'first-meeting': {
      slug: 'first-meeting',
      metaTitle: 'Guia do primeiro encontro - Dicas praticas',
      metaDescription: 'A preparar-se para o seu primeiro encontro presencial? Conselhos praticos sobre locais, conversa e o que esperar.',
      title: 'O seu primeiro encontro: guia completo',
      sections: [
        {
          heading: '',
          paragraphs: [
            'Conhecer alguem pessoalmente pela primeira vez pode ser stressante, especialmente se e novo nas plataformas online. A boa noticia e que um pouco de preparacao faz toda a diferenca.',
          ],
        },
        {
          heading: 'Gerir expectativas',
          paragraphs: [
            'Antes de se encontrar, pense no que realmente procura. Ser honesto consigo mesmo sobre as suas expectativas ajuda a comunica-las com clareza e evita decepcoes.',
          ],
        },
        {
          heading: 'Comunicacao antes do encontro',
          paragraphs: [
            'A conversa por WhatsApp antes do encontro e a sua oportunidade de estabelecer uma ligacao e definir o tom. Mantenha as mensagens respeitosas e claras. Fale de detalhes praticos: quando e onde se encontrar, quanto tempo tem disponivel.',
          ],
        },
        {
          heading: 'Escolher o local certo',
          paragraphs: [
            'O local define o ambiente do encontro. Para a primeira vez, um espaco publico e sempre recomendado. O bar de um hotel, um cafe tranquilo ou um restaurante elegante funcionam bem. Em Bruxelas, a zona da Grand-Place oferece locais discretos e acessiveis. Em Antuerpica, o distrito Zuid tem bares elegantes.',
          ],
        },
        {
          heading: 'Como vestir-se',
          paragraphs: [
            'Vista-se de forma que lhe de confianca e que o represente. Roupa limpa e bem ajustada apropriada para o local e suficiente. O objetivo e sentir-se bem na sua propria pele.',
          ],
        },
        {
          heading: 'Iniciar a conversa',
          paragraphs: [
            'Os primeiros minutos podem ser um pouco desconfortaveis, e isso e perfeitamente normal. Temas simples funcionam melhor. Comente algo sobre o local, pergunte pelo seu dia ou faca referencia a conversa por WhatsApp.',
          ],
        },
        {
          heading: 'Lidar com o nervosismo',
          paragraphs: [
            'E completamente normal sentir-se nervoso. Chegue uns minutos mais cedo para se acomodar, peca uma bebida e lembre-se de que a outra pessoa pode estar igualmente nervosa. O nervosismo costuma desaparecer nos primeiros cinco minutos.',
          ],
        },
        {
          heading: 'Quando fazer seguimento',
          paragraphs: [
            'Se o encontro correu bem, uma breve mensagem de WhatsApp a seguir e apropriada. Algo simples como agradecer por um bom momento e suficiente. Comunicacao direta e sincera e sempre apreciada.',
          ],
        },
        {
          heading: 'Sinais de alerta',
          paragraphs: [
            'Mantenha-se atento a sinais de alerta: a pessoa parece muito diferente das fotos, pressiona para ir a um local privado, pede dinheiro ou nao respeita os seus limites. Se algo acontecer, confie nos seus instintos e va-se embora.',
          ],
        },
        {
          heading: 'Uma palavra final de encorajamento',
          paragraphs: [
            'Toda a gente tem uma primeira vez. A preparacao nao e sobre controlar cada detalhe, e sobre dar-se as ferramentas para relaxar e desfrutar da experiencia. Seja voce mesmo, seja respeitoso, e lembre-se de que as melhores conexoes acontecem quando ambas as pessoas se sentem a vontade.',
          ],
        },
      ],
      relatedPages: [
        { title: 'Dicas de seguranca', description: 'Dez dicas praticas para se manter seguro.', url: '/guides/safety-tips' },
        { title: 'Como funciona', description: 'Guia passo a passo para o Pinklights.', url: '/guides/how-it-works' },
        { title: 'Guia para visitantes', description: 'Usar o Pinklights durante uma estadia curta na Belgica.', url: '/guides/for-visitors' },
      ],
    },
    'for-visitors': {
      slug: 'for-visitors',
      metaTitle: 'Pinklights para visitantes na Belgica',
      metaDescription: 'A visitar a Belgica? Saiba como usar o Pinklights para estadias curtas. O WhatsApp funciona internacionalmente, sem necessidade de numero belga.',
      title: 'Pinklights para visitantes na Belgica',
      sections: [
        {
          heading: '',
          paragraphs: [
            'A Belgica e um dos paises mais acessiveis da Europa, e o Pinklights funciona tao bem para visitantes como para residentes. Quer esteja em viagem de negocios, numa escapadela ou em ferias prolongadas, este guia ajuda-o a tirar o maximo do seu tempo aqui.',
          ],
        },
        {
          heading: 'O tamanho compacto da Belgica e uma vantagem',
          paragraphs: [
            'Pode atravessar todo o pais de comboio em cerca de duas horas. Bruxelas-Antuerpica demora cerca de 40 minutos, Gante-Bruges menos de 30 minutos. Os perfis em cidades vizinhas estao realmente ao alcance. Defina um filtro de distancia generoso e vera perfis de varias cidades.',
          ],
        },
        {
          heading: 'Melhores cidades para visitar',
          paragraphs: [
            'Cada cidade belga tem o seu proprio carater. Bruxelas e cosmopolita e multilingue. Antuerpica e conhecida pela moda e vida noturna. Gante combina ambiente universitario com arquitetura medieval. Bruges oferece um cenario mais intimo e romantico. Liege traz calor e cultura francofona com o famoso bairro do Carre.',
          ],
        },
        {
          heading: 'Como o Pinklights funciona para estadias curtas',
          paragraphs: [
            'O Pinklights nao requer criacao de conta para explorar perfis, ideal para visitantes. Pode abrir o site no telefone, filtrar por cidade, percorrer perfis e contactar por WhatsApp em minutos. Sem periodo de espera, sem algoritmo e sem subscricao para cancelar.',
          ],
        },
        {
          heading: 'Sem necessidade de numero belga',
          paragraphs: [
            'Como o Pinklights usa o WhatsApp para toda a comunicacao direta, nao precisa de cartao SIM belga. O WhatsApp funciona por wifi e dados moveis com qualquer numero internacional. Ligue-se ao wifi do hotel ou use os seus dados de roaming.',
          ],
        },
        {
          heading: 'Consideracoes sobre o idioma',
          paragraphs: [
            'A Belgica tem tres linguas oficiais (neerlandes, frances e alemao) mas o ingles e amplamente falado, especialmente em Bruxelas, Antuerpica e Gante. A maioria dos perfis inclui descricoes em ingles. Nao hesite em perguntar sobre preferencias linguisticas na sua primeira mensagem.',
          ],
        },
        {
          heading: 'Etiqueta para encontros em hoteis',
          paragraphs: [
            'Muitos visitantes preferem encontrar-se no seu hotel. Se escolher esta opcao, considere encontrar-se primeiro no lobby ou no bar em vez de ir diretamente para o quarto. Isto da a ambas as partes a oportunidade de confirmar o nivel de conforto.',
          ],
        },
        {
          heading: 'Tirar o maximo de uma visita curta',
          paragraphs: [
            'Se o seu tempo na Belgica e limitado, um pouco de planeamento previo pode fazer uma grande diferenca. Explore perfis antes de chegar. Envie uma mensagem de WhatsApp um ou dois dias antes para se apresentar. Seja direto sobre as suas datas e disponibilidade.',
            'A Belgica e pequena mas oferece uma quantidade notavel de cultura, gastronomia e oportunidades de conexao. O Pinklights esta aqui para o ajudar a tirar o maximo de cada visita.',
          ],
        },
      ],
      relatedPages: [
        { title: 'Encontrar perfis', description: 'Explore perfis por cidade em toda a Belgica.', url: '/find' },
        { title: 'Guia do primeiro encontro', description: 'Prepare-se para o seu primeiro encontro com confianca.', url: '/guides/first-meeting' },
        { title: 'Como funciona', description: 'Guia passo a passo para o Pinklights.', url: '/guides/how-it-works' },
      ],
    },
    'profile-tips': {
      slug: 'profile-tips',
      metaTitle: 'Dicas de perfil - Crie um perfil atraente',
      metaDescription: 'Dicas para criadores de perfis no Pinklights: escolha as fotos certas, escreva uma bio honesta e atraia conexoes de qualidade.',
      title: 'Dicas para o seu perfil: destaque-se no Pinklights',
      sections: [
        {
          heading: '',
          paragraphs: [
            'O seu perfil e a sua primeira impressao no Pinklights. E o que os visitantes veem quando exploram, filtram e decidem quem contactar. Um perfil bem feito atrai melhores conexoes e torna a sua experiencia na plataforma mais gratificante.',
          ],
        },
        {
          heading: 'Escolha fotos claras e bem iluminadas',
          paragraphs: [
            'As fotos sao o elemento mais importante do seu perfil. Escolha imagens bem iluminadas, nitidas e que representem a sua aparencia atual. A luz natural e quase sempre mais favorecedora. Evite filtros pesados. A sua foto principal deve mostrar claramente o seu rosto e ser recente.',
          ],
        },
        {
          heading: 'Use varias fotos de diferentes angulos',
          paragraphs: [
            'Uma unica foto so conta parte da historia. Carregue varias imagens que mostrem diferentes angulos, roupas e cenarios. A variedade reforc a confianca na autenticidade do seu perfil.',
          ],
        },
        {
          heading: 'Escreva uma bio honesta e envolvente',
          paragraphs: [
            'A sua bio e a oportunidade de mostrar personalidade para alem das fotos. Escreva com a sua propria voz. Mencione o que o torna unico e o tipo de conexoes que procura. Evite frases genericas. A especificidade e memoravel.',
          ],
        },
        {
          heading: 'Defina uma disponibilidade realista',
          paragraphs: [
            'Se indica estar disponivel em determinados horarios, certifique-se de que essa informacao e precisa. Atualize a sua disponibilidade regularmente. A coerencia entre o que o seu perfil diz e como responde gera confianca.',
          ],
        },
        {
          heading: 'Use a funcao de impulso de visibilidade',
          paragraphs: [
            'O Pinklights oferece um impulso de visibilidade que coloca o seu perfil mais acima nos resultados de pesquisa durante as horas de ponta. Programe os seus impulsos estrategicamente: as noites e os fins de semana tem mais trafego. Use-os quando estiver disponivel para responder.',
          ],
        },
        {
          heading: 'Responda rapidamente as mensagens de WhatsApp',
          paragraphs: [
            'A rapidez importa. Quando alguem o contacta por WhatsApp, esta a demonstrar interesse ativo. Uma resposta rapida e simpatica aumenta significativamente as hipoteses de converter esse interesse num encontro.',
          ],
        },
        {
          heading: 'Mantenha a informacao do perfil atualizada',
          paragraphs: [
            'Um perfil desatualizado e pior do que nao ter perfil. Atualize as suas fotos, localizacao e disponibilidade regularmente. Reveja o seu perfil pelo menos uma vez por mes.',
          ],
        },
        {
          heading: 'Descreva os seus servicos com clareza',
          paragraphs: [
            'A clareza previne mal-entendidos. O seu perfil deve descrever claramente o que oferece. Use linguagem direta e seja especifico. Quanto mais claro for o seu perfil, maior a probabilidade de atrair pessoas genuinamente interessadas.',
          ],
        },
        {
          heading: 'Qualidade em vez de quantidade',
          paragraphs: [
            'Um otimo perfil nao se trata de ter mais fotos ou a bio mais longa. Trata-se de se apresentar de forma autentica e profissional. Cada elemento deve ter um proposito.',
          ],
        },
      ],
      relatedPages: [
        { title: 'Como funciona', description: 'Guia passo a passo para o Pinklights.', url: '/guides/how-it-works' },
        { title: 'Dicas de seguranca', description: 'Dez dicas praticas para se manter seguro.', url: '/guides/safety-tips' },
      ],
    },
  },

  // =======================================================================
  // RUSSIAN
  // =======================================================================
  ru: {
    'how-it-works': {
      slug: 'how-it-works',
      metaTitle: 'Как работает Pinklights - Пошаговое руководство',
      metaDescription: 'Узнайте, как просматривать профили, настраивать фильтры и связываться напрямую через WhatsApp на Pinklights.',
      title: 'Как работает Pinklights',
      sections: [
        {
          heading: '',
          paragraphs: [
            'Pinklights создан для простоты. В отличие от традиционных приложений для знакомств, требующих долгой регистрации и тестов на совместимость, наша платформа позволяет просматривать реальные профили и связываться напрямую за несколько минут.',
          ],
        },
        {
          heading: 'Шаг 1: Откройте сайт',
          paragraphs: [
            'Перейдите на Pinklights.be с любого устройства: компьютера, планшета или смартфона. Платформа полностью адаптивна и работает в любом современном браузере. Не нужно скачивать приложение или создавать аккаунт, чтобы начать просмотр.',
          ],
        },
        {
          heading: 'Шаг 2: Выберите тип услуги',
          paragraphs: [
            'Pinklights организует профили по типу услуг, чтобы вы могли найти именно то, что ищете. Выберите подходящую категорию. Этот первый фильтр сужает результаты до наиболее подходящих профилей.',
          ],
        },
        {
          heading: 'Шаг 3: Укажите свои предпочтения',
          paragraphs: [
            'После выбора типа услуги вы можете уточнить поиск, выбрав предпочтения по полу. Эта комбинация гарантирует, что отображаемые профили соответствуют вашим реальным интересам.',
          ],
        },
        {
          heading: 'Шаг 4: Просматривайте профили с фильтрами',
          paragraphs: [
            'На странице результатов отображаются карточки профилей с фотографиями, основной информацией и местоположением. Вы можете фильтровать по городу или радиусу (до 50 км), а также по внешним данным, таким как возраст и внешность. Бельгия компактна, поэтому человек в Антверпене может быть всего в 30 минутах от Гента или Брюсселя.',
          ],
        },
        {
          heading: 'Шаг 5: Изучите подробные профили',
          paragraphs: [
            'Нажмите на карточку профиля, чтобы увидеть полную информацию. Здесь вы найдете несколько фотографий, описание, физические данные, информацию о доступности и предлагаемые услуги. Уделите время изучению профилей перед тем, как связаться.',
          ],
        },
        {
          heading: 'Шаг 6: Свяжитесь напрямую через WhatsApp',
          paragraphs: [
            'Когда вы найдете интересный профиль, свяжитесь с человеком напрямую через WhatsApp. Это самый быстрый и личный способ начать общение. Нет встроенной системы сообщений, нет кредитов на сообщения и нет посредников.',
            'WhatsApp также работает по всему миру, что делает Pinklights особенно удобным для путешественников, посещающих Бельгию.',
          ],
        },
        {
          heading: 'Просмотр без аккаунта',
          paragraphs: [
            'Одно из отличий Pinklights в том, что просмотр полностью открыт. Вам не нужно создавать аккаунт, подтверждать email или предоставлять личную информацию для просмотра профилей.',
          ],
        },
        {
          heading: 'Для владельцев профилей: видимость и кредиты',
          paragraphs: [
            'Если вы владелец профиля, создание и управление профилем работает на системе дневных кредитов. Кредиты поддерживают видимость вашего профиля в результатах поиска. Вы также можете усилить видимость, чтобы появляться выше в результатах в часы пик.',
            'Управление профилем простое. Обновляйте фотографии, корректируйте доступность и пополняйте кредиты из личного кабинета.',
          ],
        },
      ],
      relatedPages: [
        { title: 'Советы по безопасности', description: 'Десять практических советов для безопасных встреч.', url: '/guides/safety-tips' },
        { title: 'Руководство по первой встрече', description: 'Подготовьтесь к первой личной встрече.', url: '/guides/first-meeting' },
        { title: 'Для гостей Бельгии', description: 'Использование Pinklights во время короткого визита.', url: '/guides/for-visitors' },
      ],
    },
    'safety-tips': {
      slug: 'safety-tips',
      metaTitle: '10 советов по безопасности при встрече с новыми людьми',
      metaDescription: 'Практические советы по безопасности: встречайтесь в публичных местах, проверяйте профили, защищайте свою конфиденциальность.',
      title: '10 советов по безопасности при встрече с новым человеком',
      sections: [
        {
          heading: '',
          paragraphs: [
            'Встреча с новым человеком должна быть увлекательной, а не стрессовой. Независимо от того, есть ли у вас опыт с онлайн-платформами или вы новичок, эти десять советов помогут вам защитить себя и получить положительный опыт.',
          ],
        },
        {
          heading: '1. Всегда встречайтесь сначала в публичном месте',
          paragraphs: [
            'Для первой встречи выберите хорошо освещенное публичное место: кафе, лобби отеля или ресторан. Публичные пространства обеспечивают естественную безопасность и дают обеим сторонам возможность оценить уровень комфорта.',
          ],
        },
        {
          heading: '2. Сообщите близкому человеку',
          paragraphs: [
            'Перед выходом сообщите кому-то, кому доверяете, куда идете, с кем встречаетесь и когда планируете вернуться. Это разумная предосторожность, которая занимает меньше минуты.',
          ],
        },
        {
          heading: '3. Доверяйте своей интуиции',
          paragraphs: [
            'Если что-то кажется неправильным в любой момент встречи, доверьтесь этому ощущению. Вы никогда не обязаны оставаться. Вежливый уход всегда приемлем. Ваш комфорт важнее вежливости в неудобной ситуации.',
          ],
        },
        {
          heading: '4. Убедитесь, что фотографии соответствуют',
          paragraphs: [
            'По прибытии на встречу убедитесь, что человек соответствует своим фотографиям в профиле. Если он выглядит значительно иначе, вполне допустимо извиниться и уйти.',
          ],
        },
        {
          heading: '5. Используйте WhatsApp, а не личный номер',
          paragraphs: [
            'Pinklights использует WhatsApp для прямого контакта, что обеспечивает разделение между вашей личной информацией и перепиской. Вы можете настроить параметры конфиденциальности WhatsApp, чтобы ограничить видимую информацию.',
          ],
        },
        {
          heading: '6. Никогда не делитесь финансовой информацией',
          paragraphs: [
            'Не сообщайте банковские реквизиты, номера карт и не переводите деньги людям, с которыми познакомились через платформу. Настоящие знакомства никогда не требуют финансовой информации.',
          ],
        },
        {
          heading: '7. Согласуйте ожидания заранее',
          paragraphs: [
            'Четкое общение перед встречей предотвращает недопонимание. Обсудите, чего вы оба ждете, границы и практические детали, такие как время и место.',
          ],
        },
        {
          heading: '8. Уважайте границы, свои и чужие',
          paragraphs: [
            'Согласие действует постоянно и применяется в каждой ситуации. Если кто-то из сторон передумает в любой момент, это решение должно быть уважено безоговорочно. Позитивный опыт строится на взаимном уважении.',
          ],
        },
        {
          heading: '9. Знайте свои права',
          paragraphs: [
            'В Бельгии у вас есть законные права, защищающие вас в каждом взаимодействии. Ознакомьтесь с тем, что является законным, и знайте, что можете обратиться в местные органы власти, если чувствуете себя в опасности.',
          ],
        },
        {
          heading: '10. Сообщайте о проблемах на платформу',
          paragraphs: [
            'Если вы столкнулись с мошенническим профилем или неподобающим поведением, сообщите об этом. Pinklights серьезно относится к жалобам и оперативно проверяет отмеченные профили. Ваше сообщение будет рассмотрено конфиденциально.',
          ],
        },
        {
          heading: 'В заключение',
          paragraphs: [
            'Безопасность - это общая ответственность. Принимая эти простые меры предосторожности, вы вносите вклад в культуру уважения и доверия на платформе.',
          ],
        },
      ],
      relatedPages: [
        { title: 'Безопасность и конфиденциальность', description: 'Узнайте, как Pinklights защищает ваши данные.', url: '/safety' },
        { title: 'Руководство по первой встрече', description: 'Подготовьтесь к первой личной встрече.', url: '/guides/first-meeting' },
        { title: 'Как это работает', description: 'Пошаговое руководство по просмотру и связи на Pinklights.', url: '/guides/how-it-works' },
      ],
    },
    'first-meeting': {
      slug: 'first-meeting',
      metaTitle: 'Руководство по первой встрече - Практические советы',
      metaDescription: 'Готовитесь к первой встрече? Практические советы по выбору места, общению и чему ожидать.',
      title: 'Ваша первая встреча: полное руководство',
      sections: [
        {
          heading: '',
          paragraphs: [
            'Первая личная встреча с человеком может вызывать волнение, особенно если вы новичок на онлайн-платформах. Хорошая новость в том, что небольшая подготовка существенно помогает.',
          ],
        },
        {
          heading: 'Управление ожиданиями',
          paragraphs: [
            'Перед встречей подумайте о том, чего вы действительно хотите. Честность с самим собой относительно ожиданий помогает четко их озвучить и избежать разочарований.',
          ],
        },
        {
          heading: 'Общение перед встречей',
          paragraphs: [
            'Переписка в WhatsApp перед встречей - это возможность наладить контакт и задать тон. Пишите уважительно и понятно. Обсудите практические детали: когда и где встретиться, сколько времени у вас есть.',
          ],
        },
        {
          heading: 'Выбор подходящего места',
          paragraphs: [
            'Место задает атмосферу встречи. Для первого раза всегда рекомендуется публичное пространство. Бар в лобби отеля, тихое кафе или стильный ресторан подойдут. В Брюсселе район Гран-Плас предлагает дискретные и доступные места. В Антверпене в районе Зюид есть элегантные бары.',
          ],
        },
        {
          heading: 'Как одеться',
          paragraphs: [
            'Одевайтесь так, чтобы чувствовать себя уверенно. Чистая, хорошо сидящая одежда, подходящая для выбранного места, вполне достаточна. Главное - чувствовать себя комфортно.',
          ],
        },
        {
          heading: 'Начало разговора',
          paragraphs: [
            'Первые минуты могут быть немного неловкими, и это совершенно нормально. Простые темы работают лучше всего. Прокомментируйте обстановку, спросите, как прошел день, или вспомните что-то из вашей переписки в WhatsApp.',
          ],
        },
        {
          heading: 'Как справиться с волнением',
          paragraphs: [
            'Волноваться совершенно нормально. Придите на пару минут раньше, чтобы освоиться, закажите напиток и помните, что другой человек может нервничать не меньше вас. Волнение обычно проходит в первые пять минут.',
          ],
        },
        {
          heading: 'Когда написать после встречи',
          paragraphs: [
            'Если встреча прошла хорошо, короткое сообщение в WhatsApp после нее будет уместным. Достаточно просто поблагодарить за приятно проведенное время. Прямое и искреннее общение всегда ценится.',
          ],
        },
        {
          heading: 'Тревожные сигналы',
          paragraphs: [
            'Будьте внимательны к тревожным сигналам: человек выглядит совсем не так, как на фотографиях, настаивает на уединенном месте, просит деньги или не уважает ваши границы. Если что-то из этого происходит, доверьтесь интуиции и уходите.',
          ],
        },
        {
          heading: 'Слова поддержки',
          paragraphs: [
            'У каждого бывает первый раз. Подготовка - это не контроль каждой детали, а инструменты для того, чтобы расслабиться и получить удовольствие. Будьте собой, проявляйте уважение, и помните, что лучшие связи возникают, когда обе стороны чувствуют себя комфортно.',
          ],
        },
      ],
      relatedPages: [
        { title: 'Советы по безопасности', description: 'Десять практических советов для безопасных встреч.', url: '/guides/safety-tips' },
        { title: 'Как это работает', description: 'Пошаговое руководство по Pinklights.', url: '/guides/how-it-works' },
        { title: 'Для гостей Бельгии', description: 'Использование Pinklights во время короткого визита.', url: '/guides/for-visitors' },
      ],
    },
    'for-visitors': {
      slug: 'for-visitors',
      metaTitle: 'Pinklights для гостей Бельгии',
      metaDescription: 'Приезжаете в Бельгию? Узнайте, как использовать Pinklights для коротких визитов. WhatsApp работает по всему миру.',
      title: 'Pinklights для гостей Бельгии',
      sections: [
        {
          heading: '',
          paragraphs: [
            'Бельгия - одна из самых доступных стран Европы, и Pinklights одинаково хорошо работает как для гостей, так и для местных жителей. Будь вы в деловой поездке, на выходных или в длительном отпуске, это руководство поможет вам провести время максимально эффективно.',
          ],
        },
        {
          heading: 'Компактный размер Бельгии - ваше преимущество',
          paragraphs: [
            'Вы можете пересечь всю страну на поезде примерно за два часа. Брюссель-Антверпен занимает около 40 минут, Гент-Брюгге - менее 30 минут. Профили в соседних городах действительно доступны. Установите широкий фильтр расстояния, и вы увидите профили из нескольких городов.',
          ],
        },
        {
          heading: 'Лучшие города для посещения',
          paragraphs: [
            'Каждый бельгийский город имеет свой характер. Брюссель космополитичен и многоязычен. Антверпен известен модой и ночной жизнью. Гент сочетает студенческую атмосферу со средневековой архитектурой. Брюгге предлагает более камерную, романтическую обстановку. Льеж привносит теплоту и франкоязычную культуру с известным районом Карре.',
          ],
        },
        {
          heading: 'Как Pinklights работает для коротких визитов',
          paragraphs: [
            'Pinklights не требует создания аккаунта для просмотра профилей, что идеально для гостей. Вы можете открыть сайт на телефоне, отфильтровать по городу, просмотреть профили и связаться через WhatsApp за несколько минут. Без ожидания, без алгоритмов и без подписки.',
          ],
        },
        {
          heading: 'Бельгийский номер не нужен',
          paragraphs: [
            'Поскольку Pinklights использует WhatsApp для всей прямой связи, вам не нужна бельгийская SIM-карта. WhatsApp работает через Wi-Fi и мобильные данные с любым международным номером. Подключитесь к Wi-Fi отеля или используйте роуминг.',
          ],
        },
        {
          heading: 'Языковые особенности',
          paragraphs: [
            'В Бельгии три официальных языка (нидерландский, французский и немецкий), но английский широко распространен, особенно в Брюсселе, Антверпене и Генте. Большинство профилей содержат описания на английском языке. Не стесняйтесь спросить о языковых предпочтениях в первом сообщении.',
          ],
        },
        {
          heading: 'Этикет встреч в отеле',
          paragraphs: [
            'Многие гости предпочитают встречаться в своем отеле. Если вы выберете этот вариант, рассмотрите возможность встретиться сначала в лобби или баре, а не идти сразу в номер. Это дает обеим сторонам возможность оценить уровень комфорта.',
          ],
        },
        {
          heading: 'Как провести короткий визит максимально эффективно',
          paragraphs: [
            'Если ваше время в Бельгии ограничено, небольшая предварительная подготовка может существенно помочь. Просмотрите профили до приезда. Отправьте сообщение в WhatsApp за день-два до поездки, чтобы представиться. Будьте открыты относительно ваших дат и доступности.',
            'Бельгия невелика, но предлагает удивительное количество культуры, кухни и возможностей для общения. Pinklights поможет вам использовать каждый визит по максимуму.',
          ],
        },
      ],
      relatedPages: [
        { title: 'Найти профили', description: 'Просматривайте профили по городам Бельгии.', url: '/find' },
        { title: 'Руководство по первой встрече', description: 'Подготовьтесь к первой встрече.', url: '/guides/first-meeting' },
        { title: 'Как это работает', description: 'Пошаговое руководство по Pinklights.', url: '/guides/how-it-works' },
      ],
    },
    'profile-tips': {
      slug: 'profile-tips',
      metaTitle: 'Советы по профилю - Создайте привлекательный профиль',
      metaDescription: 'Советы для создателей профилей на Pinklights: выберите правильные фотографии, напишите честное описание и привлеките качественные контакты.',
      title: 'Советы по профилю: выделитесь на Pinklights',
      sections: [
        {
          heading: '',
          paragraphs: [
            'Ваш профиль - это первое впечатление на Pinklights. Это то, что посетители видят, когда просматривают, фильтруют и решают, с кем связаться. Качественный профиль привлекает лучшие контакты и делает ваш опыт на платформе более ценным.',
          ],
        },
        {
          heading: 'Выбирайте четкие, хорошо освещенные фотографии',
          paragraphs: [
            'Фотографии - самый важный элемент вашего профиля. Выбирайте хорошо освещенные, четкие снимки, отражающие вашу нынешнюю внешность. Естественное освещение почти всегда выигрышнее. Избегайте тяжелых фильтров. Главная фотография должна четко показывать ваше лицо и быть актуальной.',
          ],
        },
        {
          heading: 'Используйте несколько фотографий с разных ракурсов',
          paragraphs: [
            'Одна фотография рассказывает лишь часть истории. Загрузите несколько снимков, показывающих разные ракурсы, наряды и обстановку. Разнообразие укрепляет доверие к подлинности вашего профиля.',
          ],
        },
        {
          heading: 'Напишите честное и увлекательное описание',
          paragraphs: [
            'Ваше описание - возможность показать характер помимо фотографий. Пишите своим голосом. Упомяните, что делает вас уникальным, и какие контакты вы ищете. Избегайте шаблонных фраз. Конкретика запоминается.',
          ],
        },
        {
          heading: 'Устанавливайте реалистичную доступность',
          paragraphs: [
            'Если вы указываете доступность в определенные часы, убедитесь, что эта информация точна. Регулярно обновляйте доступность. Соответствие между тем, что указано в профиле, и вашими реальными ответами создает доверие.',
          ],
        },
        {
          heading: 'Используйте функцию повышения видимости',
          paragraphs: [
            'Pinklights предлагает повышение видимости, которое поднимает ваш профиль в результатах поиска в часы пик. Планируйте повышения стратегически: вечера и выходные отличаются большим трафиком. Используйте их, когда вы действительно готовы отвечать.',
          ],
        },
        {
          heading: 'Быстро отвечайте на сообщения в WhatsApp',
          paragraphs: [
            'Скорость имеет значение. Когда кто-то пишет вам в WhatsApp, он проявляет активный интерес. Быстрый и дружелюбный ответ значительно повышает шансы превратить этот интерес во встречу.',
          ],
        },
        {
          heading: 'Поддерживайте информацию профиля актуальной',
          paragraphs: [
            'Устаревший профиль хуже, чем отсутствие профиля. Регулярно обновляйте фотографии, местоположение и доступность. Возьмите за правило проверять профиль хотя бы раз в месяц.',
          ],
        },
        {
          heading: 'Четко описывайте свои услуги',
          paragraphs: [
            'Ясность предотвращает недоразумения. Ваш профиль должен четко описывать, что вы предлагаете. Используйте простой язык и будьте конкретны. Чем яснее ваш профиль, тем выше вероятность привлечь людей, которые действительно заинтересованы.',
          ],
        },
        {
          heading: 'Качество важнее количества',
          paragraphs: [
            'Отличный профиль - это не про наибольшее количество фотографий или самое длинное описание. Это про то, чтобы представить себя подлинно и профессионально. Каждый элемент должен выполнять свою задачу.',
          ],
        },
      ],
      relatedPages: [
        { title: 'Как это работает', description: 'Пошаговое руководство по Pinklights.', url: '/guides/how-it-works' },
        { title: 'Советы по безопасности', description: 'Десять практических советов для безопасных встреч.', url: '/guides/safety-tips' },
      ],
    },
  },

  // =======================================================================
  // GERMAN
  // =======================================================================
  de: {
    'how-it-works': {
      slug: 'how-it-works',
      metaTitle: 'Wie Pinklights funktioniert - Schritt-fuer-Schritt',
      metaDescription: 'Erfahren Sie, wie Sie Profile durchsuchen, Praeferenzen filtern und direkt ueber WhatsApp auf Pinklights Kontakt aufnehmen.',
      title: 'Wie Pinklights funktioniert',
      sections: [
        {
          heading: '',
          paragraphs: [
            'Pinklights ist fuer Einfachheit konzipiert. Im Gegensatz zu herkoemmlichen Dating-Apps, die lange Anmeldungen und Persoenlichkeitstests erfordern, koennen Sie auf unserer Plattform echte Profile durchsuchen und in wenigen Minuten direkten Kontakt aufnehmen.',
          ],
        },
        {
          heading: 'Schritt 1: Besuchen Sie die Website',
          paragraphs: [
            'Rufen Sie Pinklights.be auf jedem Geraet auf: Desktop, Tablet oder Smartphone. Die Plattform ist vollstaendig responsiv und funktioniert in jedem modernen Browser. Es gibt keine App zum Herunterladen und kein Konto zum Erstellen.',
          ],
        },
        {
          heading: 'Schritt 2: Waehlen Sie einen Servicetyp',
          paragraphs: [
            'Pinklights organisiert Profile nach Servicetyp, damit Sie genau finden, was Sie suchen. Waehlen Sie die Kategorie, die zu Ihrem Interesse passt. Dieser erste Filter grenzt die Ergebnisse auf die relevantesten Profile ein.',
          ],
        },
        {
          heading: 'Schritt 3: Legen Sie Ihre Praeferenzen fest',
          paragraphs: [
            'Nach der Wahl eines Servicetyps koennen Sie Ihre Suche verfeinern, indem Sie Geschlechtspraeferenzen auswaehlen. Diese Kombination stellt sicher, dass die angezeigten Profile Ihren tatsaechlichen Interessen entsprechen.',
          ],
        },
        {
          heading: 'Schritt 4: Durchsuchen Sie Profile mit Filtern',
          paragraphs: [
            'Die Ergebnisseite zeigt Profilkarten mit Fotos, grundlegenden Informationen und Standortangaben. Sie koennen nach Stadt oder Entfernungsradius (bis 50 km) sowie nach aeusseren Merkmalen wie Aussehen und Altersgruppe filtern. Belgien ist kompakt, daher kann jemand in Antwerpen nur 30 Minuten von Gent oder Bruessel entfernt sein.',
          ],
        },
        {
          heading: 'Schritt 5: Detaillierte Profile ansehen',
          paragraphs: [
            'Klicken Sie auf eine Profilkarte, um das vollstaendige Profil zu sehen. Hier finden Sie mehrere Fotos, eine Biografie, koerperliche Details, Verfuegbarkeitsinformationen und angebotene Dienstleistungen. Nehmen Sie sich Zeit, Profile gruendlich anzusehen, bevor Sie Kontakt aufnehmen.',
          ],
        },
        {
          heading: 'Schritt 6: Direkter Kontakt ueber WhatsApp',
          paragraphs: [
            'Wenn Sie ein interessantes Profil finden, kontaktieren Sie die Person direkt ueber WhatsApp. Das ist der schnellste und persoenlichste Weg, ein Gespraech zu beginnen. Es gibt kein internes Nachrichtensystem, keine Credits fuer Nachrichten und keinen Vermittler.',
            'WhatsApp funktioniert auch international, was Pinklights besonders praktisch fuer Reisende macht, die Belgien besuchen.',
          ],
        },
        {
          heading: 'Stoeberung ohne Konto',
          paragraphs: [
            'Eines der Merkmale, die Pinklights auszeichnen, ist dass das Stoeberung voellig offen ist. Sie muessen kein Konto erstellen, keine E-Mail verifizieren und keine persoenlichen Daten angeben, um Profile anzusehen.',
          ],
        },
        {
          heading: 'Fuer Profileigentuemer: Sichtbarkeit und Credits',
          paragraphs: [
            'Als Profileigentuemer funktioniert die Erstellung und Verwaltung Ihres Profils mit einem System von Tagescredits. Diese Credits halten Ihr Profil in den Suchergebnissen sichtbar. Sie koennen auch Ihre Sichtbarkeit erhoehen, um zu Spitzenzeiten weiter oben zu erscheinen.',
            'Die Verwaltung Ihres Profils ist unkompliziert. Aktualisieren Sie Ihre Fotos, passen Sie Ihre Verfuegbarkeit an und laden Sie Credits ueber Ihr Dashboard auf.',
          ],
        },
      ],
      relatedPages: [
        { title: 'Sicherheitstipps', description: 'Zehn praktische Tipps fuer sichere Treffen.', url: '/guides/safety-tips' },
        { title: 'Ratgeber erstes Treffen', description: 'Bereiten Sie sich auf Ihr erstes Treffen vor.', url: '/guides/first-meeting' },
        { title: 'Fuer Besucher', description: 'Pinklights waehrend eines kurzen Aufenthalts in Belgien nutzen.', url: '/guides/for-visitors' },
      ],
    },
    'safety-tips': {
      slug: 'safety-tips',
      metaTitle: '10 Sicherheitstipps fuer das Kennenlernen',
      metaDescription: 'Praktische Sicherheitstipps: Treffen Sie sich oeffentlich, ueberpruefen Sie Profile, schuetzen Sie Ihre Privatsphaere. Sicher mit Pinklights.',
      title: '10 Sicherheitstipps fuer das Treffen mit neuen Menschen',
      sections: [
        {
          heading: '',
          paragraphs: [
            'Jemanden Neues kennenzulernen sollte aufregend sein, nicht stressig. Ob Sie Erfahrung mit Online-Plattformen haben oder es Ihr erstes Mal ist, diese zehn Tipps helfen Ihnen, sich zu schuetzen und eine positive Erfahrung zu machen.',
          ],
        },
        {
          heading: '1. Treffen Sie sich immer zuerst an einem oeffentlichen Ort',
          paragraphs: [
            'Waehlen Sie fuer ein erstes Treffen einen gut beleuchteten oeffentlichen Ort wie ein Cafe, eine Hotellobby oder ein Restaurant. Oeffentliche Orte bieten natuerliche Sicherheit und geben beiden Parteien die Moeglichkeit, den Komfort zu beurteilen.',
          ],
        },
        {
          heading: '2. Informieren Sie eine Vertrauensperson',
          paragraphs: [
            'Bevor Sie gehen, teilen Sie jemandem, dem Sie vertrauen, mit, wohin Sie gehen, wen Sie treffen und wann Sie zurueck sein werden. Das ist eine vernuenftige Vorsichtsmassnahme, die weniger als eine Minute dauert.',
          ],
        },
        {
          heading: '3. Vertrauen Sie Ihrem Bauchgefuehl',
          paragraphs: [
            'Wenn sich etwas nicht richtig anfuehlt, zu irgendeinem Zeitpunkt des Treffens, vertrauen Sie diesem Gefuehl. Sie sind nie verpflichtet zu bleiben. Ein hoeflicher Abgang ist immer akzeptabel. Ihr Wohlbefinden ist wichtiger als Hoeflichkeit in einer unangenehmen Situation.',
          ],
        },
        {
          heading: '4. Ueberpruefen Sie, ob die Fotos uebereinstimmen',
          paragraphs: [
            'Nehmen Sie sich bei Ihrer Ankunft einen Moment Zeit, um zu bestaetigen, dass die Person ihren Profilfotos entspricht. Wenn sie deutlich anders aussieht, ist es voellig in Ordnung, sich zu entschuldigen.',
          ],
        },
        {
          heading: '5. Nutzen Sie WhatsApp, nicht Ihre private Nummer',
          paragraphs: [
            'Pinklights nutzt WhatsApp fuer direkten Kontakt, was eine Trennschicht zwischen Ihrer persoenlichen Identitaet und Ihren Gespraechen bietet. Sie koennen Ihre WhatsApp-Datenschutzeinstellungen anpassen, um einzuschraenken, was die andere Person sieht.',
          ],
        },
        {
          heading: '6. Teilen Sie niemals Finanzinformationen',
          paragraphs: [
            'Geben Sie keine Bankdaten, Kreditkartennummern weiter und ueberweisen Sie kein Geld an Personen, die Sie ueber die Plattform kennengelernt haben. Echte Kontakte werden niemals nach Finanzinformationen fragen.',
          ],
        },
        {
          heading: '7. Klaren Sie Erwartungen im Voraus',
          paragraphs: [
            'Klare Kommunikation vor dem Treffen verhindert Missverstaendnisse. Besprechen Sie, was Sie beide suchen, Grenzen und praktische Details wie Zeit und Ort.',
          ],
        },
        {
          heading: '8. Respektieren Sie Grenzen, Ihre und deren',
          paragraphs: [
            'Einverstaendnis ist fortlaufend und gilt in jeder Situation. Wenn eine der Parteien ihre Meinung aendert, muss diese Entscheidung ohne Fragen respektiert werden. Eine positive Erfahrung basiert auf gegenseitigem Respekt.',
          ],
        },
        {
          heading: '9. Kennen Sie Ihre Rechte',
          paragraphs: [
            'In Belgien haben Sie gesetzliche Rechte, die Sie bei jeder Interaktion schuetzen. Machen Sie sich vertraut mit dem, was legal ist, und wissen Sie, dass Sie die oertlichen Behoerden kontaktieren koennen, wenn Sie sich unsicher fuehlen.',
          ],
        },
        {
          heading: '10. Melden Sie Probleme an die Plattform',
          paragraphs: [
            'Wenn Sie auf ein betruegerisches Profil oder unangemessenes Verhalten stossen, melden Sie es. Pinklights nimmt Meldungen ernst und ueberprueft markierte Profile zeitnah. Ihre Meldung wird vertraulich behandelt.',
          ],
        },
        {
          heading: 'Abschliessend',
          paragraphs: [
            'Sicherheit ist eine gemeinsame Verantwortung. Indem Sie diese einfachen Vorsichtsmassnahmen treffen, tragen Sie zu einer Kultur des Respekts und Vertrauens auf der Plattform bei.',
          ],
        },
      ],
      relatedPages: [
        { title: 'Sicherheit und Datenschutz', description: 'Erfahren Sie, wie Pinklights Ihre Daten schuetzt.', url: '/safety' },
        { title: 'Ratgeber erstes Treffen', description: 'Bereiten Sie sich auf Ihr erstes Treffen vor.', url: '/guides/first-meeting' },
        { title: 'Wie es funktioniert', description: 'Schritt-fuer-Schritt-Anleitung fuer Pinklights.', url: '/guides/how-it-works' },
      ],
    },
    'first-meeting': {
      slug: 'first-meeting',
      metaTitle: 'Ratgeber erstes Treffen - Praktische Tipps',
      metaDescription: 'Sie bereiten sich auf Ihr erstes Treffen vor? Praktische Ratschlaege zu Treffpunkten, Gespraechen und was Sie erwarten koennen.',
      title: 'Ihr erstes Treffen: ein vollstaendiger Ratgeber',
      sections: [
        {
          heading: '',
          paragraphs: [
            'Jemanden zum ersten Mal persoenlich zu treffen kann aufregend sein, besonders wenn Sie neu auf Online-Plattformen sind. Die gute Nachricht ist, dass ein wenig Vorbereitung einen grossen Unterschied macht.',
          ],
        },
        {
          heading: 'Erwartungen steuern',
          paragraphs: [
            'Bevor Sie sich treffen, ueberlegen Sie, was Sie wirklich suchen. Ehrlichkeit mit sich selbst hilft, Erwartungen klar zu kommunizieren und Enttaeuschungen zu vermeiden.',
          ],
        },
        {
          heading: 'Kommunikation vor dem Treffen',
          paragraphs: [
            'Das WhatsApp-Gespraech vor dem Treffen ist Ihre Gelegenheit, eine Verbindung aufzubauen und den Ton anzugeben. Halten Sie Nachrichten respektvoll und klar. Besprechen Sie praktische Details: wann und wo Sie sich treffen, wie viel Zeit Sie haben.',
          ],
        },
        {
          heading: 'Den richtigen Ort waehlen',
          paragraphs: [
            'Der Ort bestimmt die Atmosphaere Ihres Treffens. Fuer das erste Mal ist ein oeffentlicher Raum immer empfehlenswert. Eine Hotellobby-Bar, ein ruhiges Cafe oder ein gehobenes Restaurant eignen sich gut. In Bruessel bietet die Gegend um den Grand-Place diskrete und zugaengliche Treffpunkte. In Antwerpen hat das Zuid-Viertel elegante Bars.',
          ],
        },
        {
          heading: 'Was anziehen',
          paragraphs: [
            'Kleiden Sie sich so, dass Sie sich sicher fuehlen und sich repraesentiert fuehlen. Saubere, gut sitzende Kleidung, die zum Veranstaltungsort passt, genuegt. Das Ziel ist, sich in Ihrer Haut wohlzufuehlen.',
          ],
        },
        {
          heading: 'Das Gespraech beginnen',
          paragraphs: [
            'Die ersten Minuten koennen etwas unbeholfen sein, und das ist voellig normal. Einfache Gespraechsthemen funktionieren am besten. Kommentieren Sie den Ort, fragen Sie nach dem Tag oder beziehen Sie sich auf Ihr WhatsApp-Gespraech.',
          ],
        },
        {
          heading: 'Mit Nervositaet umgehen',
          paragraphs: [
            'Es ist voellig normal, nervoes zu sein. Kommen Sie ein paar Minuten frueher, um sich einzuleben, bestellen Sie ein Getraenk und denken Sie daran, dass die andere Person moeglicherweise genauso nervoes ist. Nervositaet verfliegt meist in den ersten fuenf Minuten.',
          ],
        },
        {
          heading: 'Wann nachfassen',
          paragraphs: [
            'Wenn das Treffen gut verlaufen ist, ist eine kurze WhatsApp-Nachricht danach angemessen. Etwas Einfaches wie ein Dankeschoen fuer eine schoene Zeit reicht aus. Direkte und ehrliche Kommunikation wird immer geschaetzt.',
          ],
        },
        {
          heading: 'Warnsignale',
          paragraphs: [
            'Bleiben Sie wachsam bei Warnsignalen: Die Person sieht ganz anders aus als auf den Fotos, draengt auf einen privaten Ort, bittet um Geld oder respektiert Ihre Grenzen nicht. Wenn etwas davon passiert, vertrauen Sie Ihrem Instinkt und gehen Sie.',
          ],
        },
        {
          heading: 'Ein letztes Wort der Ermutigung',
          paragraphs: [
            'Jeder hat ein erstes Mal. Vorbereitung bedeutet nicht, jedes Detail zu kontrollieren, sondern sich die Werkzeuge zu geben, um sich zu entspannen und die Erfahrung zu geniessen. Seien Sie Sie selbst, seien Sie respektvoll, und denken Sie daran, dass die besten Verbindungen entstehen, wenn sich beide Seiten wohlfuehlen.',
          ],
        },
      ],
      relatedPages: [
        { title: 'Sicherheitstipps', description: 'Zehn praktische Tipps fuer sichere Treffen.', url: '/guides/safety-tips' },
        { title: 'Wie es funktioniert', description: 'Schritt-fuer-Schritt-Anleitung fuer Pinklights.', url: '/guides/how-it-works' },
        { title: 'Fuer Besucher', description: 'Pinklights waehrend eines kurzen Aufenthalts in Belgien.', url: '/guides/for-visitors' },
      ],
    },
    'for-visitors': {
      slug: 'for-visitors',
      metaTitle: 'Pinklights fuer Besucher in Belgien',
      metaDescription: 'Sie besuchen Belgien? Erfahren Sie, wie Sie Pinklights fuer kurze Aufenthalte nutzen. WhatsApp funktioniert international.',
      title: 'Pinklights fuer Besucher in Belgien',
      sections: [
        {
          heading: '',
          paragraphs: [
            'Belgien ist eines der zugaenglichsten Laender Europas, und Pinklights funktioniert fuer Besucher genauso gut wie fuer Einheimische. Ob Geschaeftsreise, Wochenendtrip oder laengerer Urlaub, dieser Ratgeber hilft Ihnen, Ihre Zeit hier optimal zu nutzen.',
          ],
        },
        {
          heading: 'Belgiens kompakte Groesse ist Ihr Vorteil',
          paragraphs: [
            'Sie koennen das ganze Land mit dem Zug in etwa zwei Stunden durchqueren. Bruessel-Antwerpen dauert etwa 40 Minuten, Gent-Bruegge weniger als 30 Minuten. Profile in Nachbarstaedte sind also wirklich erreichbar. Stellen Sie einen grosszuegigen Entfernungsfilter ein und Sie sehen Profile aus mehreren Staedten.',
          ],
        },
        {
          heading: 'Beste Staedte zum Besuchen',
          paragraphs: [
            'Jede belgische Stadt hat ihren eigenen Charakter. Bruessel ist kosmopolitisch und mehrsprachig. Antwerpen ist bekannt fuer Mode und Nachtleben. Gent kombiniert Universitaetsatmosphaere mit mittelalterlicher Architektur. Bruegge bietet eine intimere, romantische Kulisse. Luettich bringt Waerme und franzoesischsprachige Kultur mit dem beruehmten Carre-Viertel.',
          ],
        },
        {
          heading: 'Wie Pinklights fuer kurze Aufenthalte funktioniert',
          paragraphs: [
            'Pinklights erfordert keine Kontoerstellung zum Durchsuchen von Profilen, ideal fuer Besucher. Sie koennen die Website auf Ihrem Handy oeffnen, nach Stadt filtern, Profile durchsehen und ueber WhatsApp Kontakt aufnehmen, alles in wenigen Minuten. Keine Wartezeit, kein Matching-Algorithmus und kein Abo zum Kuendigen.',
          ],
        },
        {
          heading: 'Keine belgische Telefonnummer noetig',
          paragraphs: [
            'Da Pinklights WhatsApp fuer alle direkte Kommunikation nutzt, brauchen Sie keine belgische SIM-Karte. WhatsApp funktioniert ueber WLAN und mobile Daten mit jeder internationalen Nummer. Verbinden Sie sich mit dem Hotel-WLAN oder nutzen Sie Ihre Roaming-Daten.',
          ],
        },
        {
          heading: 'Sprachliche Ueberlegungen',
          paragraphs: [
            'Belgien hat drei Amtssprachen (Niederlaendisch, Franzoesisch und Deutsch), aber Englisch wird weit verbreitet gesprochen, besonders in Bruessel, Antwerpen und Gent. Die meisten Profile enthalten englische Beschreibungen. Zoegern Sie nicht, in Ihrer ersten Nachricht nach Sprachpraeferenzen zu fragen.',
          ],
        },
        {
          heading: 'Etikette fuer Treffen im Hotel',
          paragraphs: [
            'Viele Besucher bevorzugen ein Treffen in ihrem Hotel. Wenn Sie sich dafuer entscheiden, erwaegen Sie, sich zuerst in der Lobby oder der Bar zu treffen, anstatt direkt zum Zimmer zu gehen. Das gibt beiden Seiten die Moeglichkeit, den Komfort zu pruefen.',
          ],
        },
        {
          heading: 'Das Beste aus einem kurzen Besuch machen',
          paragraphs: [
            'Wenn Ihre Zeit in Belgien begrenzt ist, kann ein wenig Vorausplanung einen grossen Unterschied machen. Durchsuchen Sie Profile vor Ihrer Ankunft. Senden Sie ein oder zwei Tage vorher eine WhatsApp-Nachricht, um sich vorzustellen. Seien Sie offen bezueglich Ihrer Reisedaten und Verfuegbarkeit.',
            'Belgien mag klein sein, bietet aber eine bemerkenswerte Menge an Kultur, Kueche und Moeglichkeiten. Pinklights hilft Ihnen, jeden Besuch optimal zu nutzen.',
          ],
        },
      ],
      relatedPages: [
        { title: 'Profile finden', description: 'Durchsuchen Sie Profile nach Stadt in ganz Belgien.', url: '/find' },
        { title: 'Ratgeber erstes Treffen', description: 'Bereiten Sie sich auf Ihr erstes Treffen vor.', url: '/guides/first-meeting' },
        { title: 'Wie es funktioniert', description: 'Schritt-fuer-Schritt-Anleitung fuer Pinklights.', url: '/guides/how-it-works' },
      ],
    },
    'profile-tips': {
      slug: 'profile-tips',
      metaTitle: 'Profiltipps - Erstellen Sie ein attraktives Profil',
      metaDescription: 'Tipps fuer Profilersteller auf Pinklights: die richtigen Fotos waehlen, eine ehrliche Bio schreiben und hochwertige Kontakte anziehen.',
      title: 'Profiltipps: Heben Sie sich auf Pinklights ab',
      sections: [
        {
          heading: '',
          paragraphs: [
            'Ihr Profil ist Ihr erster Eindruck auf Pinklights. Es ist das, was Besucher sehen, wenn sie durchsuchen, filtern und entscheiden, wen sie kontaktieren. Ein gut gestaltetes Profil zieht bessere Kontakte an und macht Ihre Erfahrung auf der Plattform lohnender.',
          ],
        },
        {
          heading: 'Waehlen Sie klare, gut beleuchtete Fotos',
          paragraphs: [
            'Fotos sind das wichtigste Element Ihres Profils. Waehlen Sie gut beleuchtete, scharfe Bilder, die Ihr aktuelles Aussehen zeigen. Natuerliches Licht ist fast immer vorteilhafter. Vermeiden Sie starke Filter. Ihr Hauptfoto sollte Ihr Gesicht deutlich zeigen und aktuell sein.',
          ],
        },
        {
          heading: 'Verwenden Sie mehrere Fotos aus verschiedenen Winkeln',
          paragraphs: [
            'Ein einzelnes Foto erzaehlt nur einen Teil der Geschichte. Laden Sie mehrere Bilder hoch, die verschiedene Winkel, Outfits und Umgebungen zeigen. Abwechslung staerkt das Vertrauen in die Authentizitaet Ihres Profils.',
          ],
        },
        {
          heading: 'Schreiben Sie eine ehrliche, ansprechende Bio',
          paragraphs: [
            'Ihre Bio ist Ihre Chance, Persoenlichkeit jenseits der Fotos zu zeigen. Schreiben Sie in Ihrer eigenen Stimme. Erwaehnen Sie, was Sie einzigartig macht und welche Art von Kontakten Sie suchen. Vermeiden Sie generische Phrasen. Spezifisches bleibt im Gedaechtnis.',
          ],
        },
        {
          heading: 'Legen Sie eine realistische Verfuegbarkeit fest',
          paragraphs: [
            'Wenn Sie angeben, zu bestimmten Zeiten verfuegbar zu sein, stellen Sie sicher, dass diese Information stimmt. Aktualisieren Sie Ihre Verfuegbarkeit regelmaessig. Konsistenz zwischen dem, was Ihr Profil sagt, und Ihrem tatsaechlichen Antwortverhalten baut Vertrauen auf.',
          ],
        },
        {
          heading: 'Nutzen Sie die Sichtbarkeitsverstaerkung',
          paragraphs: [
            'Pinklights bietet eine Sichtbarkeitsverstaerkung, die Ihr Profil zu Spitzenzeiten weiter oben in den Suchergebnissen platziert. Planen Sie Ihre Verstaerkungen strategisch: Abende und Wochenenden haben mehr Verkehr. Nutzen Sie sie, wenn Sie tatsaechlich verfuegbar sind.',
          ],
        },
        {
          heading: 'Antworten Sie schnell auf WhatsApp-Nachrichten',
          paragraphs: [
            'Geschwindigkeit zaehlt. Wenn jemand Sie ueber WhatsApp kontaktiert, zeigt diese Person aktives Interesse. Eine schnelle, freundliche Antwort erhoeht die Chancen deutlich, dieses Interesse in ein Treffen umzuwandeln.',
          ],
        },
        {
          heading: 'Halten Sie Ihre Profilinformationen aktuell',
          paragraphs: [
            'Ein veraltetes Profil ist schlimmer als kein Profil. Aktualisieren Sie Ihre Fotos, Ihren Standort und Ihre Verfuegbarkeit regelmaessig. Machen Sie es sich zur Gewohnheit, Ihr Profil mindestens einmal im Monat zu ueberpruefen.',
          ],
        },
        {
          heading: 'Beschreiben Sie Ihre Dienstleistungen klar',
          paragraphs: [
            'Klarheit vermeidet Missverstaendnisse. Ihr Profil sollte klar beschreiben, was Sie anbieten. Verwenden Sie direkte Sprache und seien Sie konkret. Je klarer Ihr Profil, desto wahrscheinlicher ziehen Sie Menschen an, die wirklich interessiert sind.',
          ],
        },
        {
          heading: 'Qualitaet vor Quantitaet',
          paragraphs: [
            'Ein grossartiges Profil bedeutet nicht die meisten Fotos oder die laengste Bio. Es bedeutet, sich authentisch und professionell zu praesentieren. Jedes Element sollte einen Zweck erfuellen.',
          ],
        },
      ],
      relatedPages: [
        { title: 'Wie es funktioniert', description: 'Schritt-fuer-Schritt-Anleitung fuer Pinklights.', url: '/guides/how-it-works' },
        { title: 'Sicherheitstipps', description: 'Zehn praktische Tipps fuer sichere Treffen.', url: '/guides/safety-tips' },
      ],
    },
  },
};

// ---------------------------------------------------------------------------
// FAQ TRANSLATIONS
// ---------------------------------------------------------------------------

export const FAQ_TRANSLATIONS: Record<Locale, FAQData> = {
  // =======================================================================
  // FRENCH
  // =======================================================================
  fr: {
    metaTitle: 'Questions frequentes - Pinklights',
    metaDescription: 'Trouvez des reponses aux questions courantes sur Pinklights : navigation, contact, securite, confidentialite et paiements.',
    title: 'Questions frequentes',
    intro: 'Tout ce que vous devez savoir sur Pinklights. Que vous soyez un premier visiteur, un createur de profil ou simplement curieux, vous trouverez les reponses ci-dessous.',
    categories: [
      {
        title: 'Premiers pas',
        items: [
          { question: 'La navigation sur Pinklights est-elle gratuite ?', answer: 'Oui. Vous pouvez parcourir tous les profils visibles, voir les photos et lire les bios sans creer de compte ni payer quoi que ce soit.' },
          { question: 'Dois-je creer un compte pour utiliser Pinklights ?', answer: 'Non, aucun compte n\'est necessaire pour parcourir les profils. Vous devez uniquement creer un compte si vous souhaitez publier votre propre profil.' },
          { question: 'Comment rechercher des profils ?', answer: 'Commencez par selectionner un type de service et vos preferences sur la page d\'accueil. Vous verrez ensuite les profils correspondants que vous pouvez filtrer par ville, distance, apparence et autres criteres.' },
          { question: 'Pinklights est-il disponible en dehors de la Belgique ?', answer: 'Pinklights se concentre actuellement sur la Belgique. Tous les profils sont bases dans des villes belges. Cependant, la plateforme est accessible depuis n\'importe ou dans le monde, ce qui la rend ideale pour les voyageurs.' },
        ],
      },
      {
        title: 'Contacter des profils',
        items: [
          { question: 'Comment contacter quelqu\'un sur Pinklights ?', answer: 'Vous pouvez contacter la personne directement via WhatsApp. Il n\'y a pas de messagerie integree. Les conversations se font sur WhatsApp pour plus de rapidite et de simplicite.' },
          { question: 'Mon numero de telephone est-il visible ?', answer: 'Quand vous envoyez un message via WhatsApp, votre numero est visible, comme c\'est le cas standard avec WhatsApp. Vous pouvez ajuster vos parametres de confidentialite WhatsApp.' },
          { question: 'Puis-je envoyer un message anonymement ?', answer: 'WhatsApp necessite un numero de telephone, donc les messages completement anonymes ne sont pas possibles. Vous pouvez cependant limiter les informations personnelles visibles via les parametres de confidentialite.' },
        ],
      },
      {
        title: 'Pour les proprietaires de profils',
        items: [
          { question: 'Comment creer un profil sur Pinklights ?', answer: 'Pour creer un profil, inscrivez-vous et suivez le processus guide. Vous ajouterez des photos, une bio, votre localisation et votre type de service. Le processus prend quelques minutes.' },
          { question: 'Que sont les credits journaliers ?', answer: 'Les credits journaliers maintiennent votre profil visible sur la plateforme. Chaque credit active votre profil pour un jour. Quand vos credits sont actifs, votre profil apparait dans les resultats de recherche.' },
          { question: 'Comment fonctionne la visibilite ?', answer: 'Votre profil apparait dans les resultats de recherche quand vous avez des credits actifs. Vous pouvez aussi booster votre visibilite pour apparaitre plus haut pendant les heures de pointe.' },
          { question: 'Puis-je definir ma disponibilite ?', answer: 'Oui. Votre profil inclut des parametres de disponibilite ou vous pouvez indiquer quand vous etes disponible. Garder cette information a jour aide a attirer les bonnes connexions.' },
        ],
      },
      {
        title: 'Securite et confidentialite',
        items: [
          { question: 'Pinklights est-il sur a utiliser ?', answer: 'Pinklights est concu en pensant a la securite. Nous encourageons les premieres rencontres en public, fournissons des guides de securite et examinons les profils signales. Nous recommandons de suivre nos conseils de securite.' },
          { question: 'Comment mes donnees personnelles sont-elles protegees ?', answer: 'Pinklights respecte le RGPD et prend la protection des donnees au serieux. Nous ne collectons que les informations necessaires au fonctionnement de la plateforme et ne vendons jamais de donnees a des tiers.' },
          { question: 'Puis-je supprimer mon compte et mes donnees ?', answer: 'Oui. Vous pouvez supprimer votre compte a tout moment depuis les parametres de votre profil. Vos donnees personnelles seront effacees conformement au RGPD.' },
        ],
      },
      {
        title: 'Paiements',
        items: [
          { question: 'Quels modes de paiement Pinklights accepte-t-il ?', answer: 'Pinklights accepte les principales cartes de credit et de debit ainsi que d\'autres methodes de paiement en ligne courantes. Toutes les transactions sont traitees de maniere securisee.' },
          { question: 'Les credits sont-ils remboursables ?', answer: 'Les credits ne sont generalement pas remboursables une fois achetes. Nous recommandons de commencer par un petit forfait pour vous familiariser avec la plateforme.' },
          { question: 'Combien coute un credit journalier ?', answer: 'Le prix des credits journaliers varie selon la taille du forfait. Les forfaits plus grands offrent un cout par jour inferieur. Consultez la section credits de votre tableau de bord pour les tarifs actuels.' },
        ],
      },
    ],
    relatedPages: [
      { title: 'Comment ca marche', description: 'Guide etape par etape pour parcourir et se connecter sur Pinklights.', url: '/guides/how-it-works' },
      { title: 'Conseils de securite', description: 'Dix conseils pratiques pour rester en securite.', url: '/guides/safety-tips' },
      { title: 'Conseils pour votre profil', description: 'Bonnes pratiques pour un profil attractif.', url: '/guides/profile-tips' },
      { title: 'Trouver des profils', description: 'Parcourez les profils par ville en Belgique.', url: '/find' },
    ],
  },

  // =======================================================================
  // DUTCH
  // =======================================================================
  nl: {
    metaTitle: 'Veelgestelde vragen - Pinklights',
    metaDescription: 'Vind antwoorden op veelgestelde vragen over Pinklights: bladeren, contact opnemen, veiligheid, privacy en betalingen.',
    title: 'Veelgestelde vragen',
    intro: 'Alles wat je moet weten over Pinklights. Of je nu een eerste bezoeker bent, een profielmaker of gewoon nieuwsgierig, je vindt de antwoorden hieronder.',
    categories: [
      {
        title: 'Aan de slag',
        items: [
          { question: 'Is het gratis om profielen te bekijken op Pinklights?', answer: 'Ja. Je kunt alle zichtbare profielen bekijken, foto\'s zien en bio\'s lezen zonder een account aan te maken of iets te betalen.' },
          { question: 'Moet ik een account aanmaken om Pinklights te gebruiken?', answer: 'Er is geen account nodig om profielen te bekijken. Je hoeft alleen een account aan te maken als je je eigen profiel wilt plaatsen.' },
          { question: 'Hoe zoek ik naar profielen?', answer: 'Begin met het selecteren van een servicetype en je voorkeuren op de homepage. Je ziet dan overeenkomende profielen die je verder kunt filteren op stad, afstand, uiterlijk en andere criteria.' },
          { question: 'Is Pinklights beschikbaar buiten Belgie?', answer: 'Pinklights richt zich momenteel op Belgie. Alle profielen zijn gevestigd in Belgische steden. De website is echter wereldwijd toegankelijk, ideaal voor reizigers.' },
        ],
      },
      {
        title: 'Contact opnemen',
        items: [
          { question: 'Hoe neem ik contact op met iemand op Pinklights?', answer: 'Je kunt direct contact opnemen via WhatsApp. Er is geen in-app berichten systeem. Gesprekken vinden plaats op WhatsApp voor snelheid en gemak.' },
          { question: 'Is mijn telefoonnummer zichtbaar?', answer: 'Wanneer je iemand een bericht stuurt via WhatsApp, is je telefoonnummer zichtbaar, zoals standaard is bij WhatsApp. Je kunt je WhatsApp-privacyinstellingen aanpassen.' },
          { question: 'Kan ik anoniem berichten sturen?', answer: 'WhatsApp vereist een telefoonnummer, dus volledig anoniem berichten is niet mogelijk. Je kunt wel beperken welke persoonlijke informatie zichtbaar is via je privacy-instellingen.' },
        ],
      },
      {
        title: 'Voor profieleigenaren',
        items: [
          { question: 'Hoe maak ik een profiel aan op Pinklights?', answer: 'Meld je aan en volg het begeleide installationsproces. Je voegt foto\'s toe, schrijft een bio, stelt je locatie in en kiest je servicetype. Het proces duurt slechts een paar minuten.' },
          { question: 'Wat zijn dagcredits?', answer: 'Dagcredits houden je profiel zichtbaar op het platform. Elk credit activeert je profiel voor een dag. Met actieve credits verschijnt je profiel in zoekresultaten.' },
          { question: 'Hoe werkt zichtbaarheid?', answer: 'Je profiel verschijnt in zoekresultaten wanneer je actieve dagcredits hebt. Je kunt ook je zichtbaarheid boosten om hoger te verschijnen tijdens piekuren.' },
          { question: 'Kan ik mijn beschikbaarheid instellen?', answer: 'Ja. Je profiel bevat beschikbaarheidsinstellingen waar je kunt aangeven wanneer je beschikbaar bent. Deze informatie actueel houden helpt de juiste connecties aan te trekken.' },
        ],
      },
      {
        title: 'Veiligheid en privacy',
        items: [
          { question: 'Is Pinklights veilig om te gebruiken?', answer: 'Pinklights is ontworpen met veiligheid in gedachten. We moedigen openbare eerste ontmoetingen aan, bieden veiligheidsgidsen en beoordelen gemelde profielen. We raden aan onze veiligheidstips te volgen.' },
          { question: 'Hoe worden mijn persoonlijke gegevens beschermd?', answer: 'Pinklights volgt de AVG-regelgeving en neemt gegevensbescherming serieus. We verzamelen alleen informatie die nodig is voor het platform en verkopen nooit persoonlijke gegevens aan derden.' },
          { question: 'Kan ik mijn account en gegevens verwijderen?', answer: 'Ja. Je kunt je account op elk moment verwijderen via je profielinstellingen. Je persoonlijke gegevens worden gewist in overeenstemming met de AVG.' },
        ],
      },
      {
        title: 'Betalingen',
        items: [
          { question: 'Welke betaalmethoden accepteert Pinklights?', answer: 'Pinklights accepteert de belangrijkste credit- en debitcards en andere gangbare online betaalmethoden. Alle transacties worden veilig verwerkt.' },
          { question: 'Zijn credits restitueerbaar?', answer: 'Credits zijn over het algemeen niet restitueerbaar na aankoop. We raden aan te beginnen met een klein pakket om het platform te leren kennen.' },
          { question: 'Wat kost een dagcredit?', answer: 'De prijs van dagcredits varieert afhankelijk van de pakketgrootte. Grotere pakketten bieden lagere kosten per dag. Bekijk de creditssectie in je dashboard voor actuele prijzen.' },
        ],
      },
    ],
    relatedPages: [
      { title: 'Hoe het werkt', description: 'Stapsgewijze gids voor Pinklights.', url: '/guides/how-it-works' },
      { title: 'Veiligheidstips', description: 'Tien praktische tips om veilig te blijven.', url: '/guides/safety-tips' },
      { title: 'Profieltips', description: 'Best practices voor een aantrekkelijk profiel.', url: '/guides/profile-tips' },
      { title: 'Profielen zoeken', description: 'Bekijk profielen per stad in heel Belgie.', url: '/find' },
    ],
  },

  // =======================================================================
  // SPANISH
  // =======================================================================
  es: {
    metaTitle: 'Preguntas frecuentes - Pinklights',
    metaDescription: 'Encuentra respuestas a las preguntas mas comunes sobre Pinklights: navegacion, contacto, seguridad, privacidad y pagos.',
    title: 'Preguntas frecuentes',
    intro: 'Todo lo que necesitas saber sobre Pinklights. Ya seas un visitante por primera vez, un creador de perfil o simplemente tengas curiosidad, encontraras las respuestas a continuacion.',
    categories: [
      {
        title: 'Primeros pasos',
        items: [
          { question: 'Es gratis explorar perfiles en Pinklights?', answer: 'Si. Puedes ver todos los perfiles visibles, fotos y bios sin crear una cuenta ni pagar nada.' },
          { question: 'Necesito crear una cuenta para usar Pinklights?', answer: 'No se necesita cuenta para explorar perfiles. Solo necesitas crear una cuenta si deseas publicar tu propio perfil.' },
          { question: 'Como busco perfiles?', answer: 'Empieza seleccionando un tipo de servicio y tus preferencias en la pagina principal. Veras perfiles que coinciden y que puedes filtrar por ciudad, distancia, apariencia y otros criterios.' },
          { question: 'Esta Pinklights disponible fuera de Belgica?', answer: 'Pinklights se centra actualmente en Belgica. Todos los perfiles estan en ciudades belgas. Sin embargo, la plataforma es accesible desde cualquier parte del mundo, ideal para viajeros.' },
        ],
      },
      {
        title: 'Contactar perfiles',
        items: [
          { question: 'Como contacto a alguien en Pinklights?', answer: 'Puedes contactar a la persona directamente por WhatsApp. No hay mensajeria interna. Las conversaciones se realizan en WhatsApp por rapidez y comodidad.' },
          { question: 'Es visible mi numero de telefono?', answer: 'Cuando envias un mensaje por WhatsApp, tu numero es visible, como es estandar en WhatsApp. Puedes ajustar tu configuracion de privacidad de WhatsApp.' },
          { question: 'Puedo enviar mensajes de forma anonima?', answer: 'WhatsApp requiere un numero de telefono, por lo que la mensajeria completamente anonima no es posible. Puedes limitar la informacion personal visible a traves de la configuracion de privacidad.' },
        ],
      },
      {
        title: 'Para propietarios de perfiles',
        items: [
          { question: 'Como creo un perfil en Pinklights?', answer: 'Registrate y sigue el proceso guiado. Anadiras fotos, una bio, tu ubicacion y tipo de servicio. El proceso lleva solo unos minutos.' },
          { question: 'Que son los creditos diarios?', answer: 'Los creditos diarios mantienen tu perfil visible en la plataforma. Cada credito activa tu perfil por un dia. Con creditos activos, tu perfil aparece en los resultados de busqueda.' },
          { question: 'Como funciona la visibilidad?', answer: 'Tu perfil aparece en los resultados de busqueda cuando tienes creditos activos. Tambien puedes impulsar tu visibilidad para aparecer mas arriba durante las horas punta.' },
          { question: 'Puedo establecer mi disponibilidad?', answer: 'Si. Tu perfil incluye ajustes de disponibilidad donde puedes indicar cuando estas disponible. Mantener esta informacion actualizada ayuda a atraer las conexiones adecuadas.' },
        ],
      },
      {
        title: 'Seguridad y privacidad',
        items: [
          { question: 'Es seguro usar Pinklights?', answer: 'Pinklights esta disenado pensando en la seguridad. Fomentamos los primeros encuentros en publico, ofrecemos guias de seguridad y revisamos los perfiles reportados. Recomendamos seguir nuestros consejos de seguridad.' },
          { question: 'Como se protegen mis datos personales?', answer: 'Pinklights cumple con el RGPD y toma la proteccion de datos en serio. Solo recopilamos la informacion necesaria para operar la plataforma y nunca vendemos datos personales a terceros.' },
          { question: 'Puedo eliminar mi cuenta y mis datos?', answer: 'Si. Puedes eliminar tu cuenta en cualquier momento desde la configuracion de tu perfil. Tus datos personales se borraran de acuerdo con el RGPD.' },
        ],
      },
      {
        title: 'Pagos',
        items: [
          { question: 'Que metodos de pago acepta Pinklights?', answer: 'Pinklights acepta las principales tarjetas de credito y debito, asi como otros metodos de pago online habituales. Todas las transacciones se procesan de forma segura.' },
          { question: 'Los creditos son reembolsables?', answer: 'Los creditos generalmente no son reembolsables una vez comprados. Recomendamos empezar con un paquete pequeno para familiarizarte con la plataforma.' },
          { question: 'Cuanto cuesta un credito diario?', answer: 'El precio de los creditos diarios varia segun el tamano del paquete. Los paquetes mas grandes ofrecen un menor coste por dia. Consulta la seccion de creditos en tu panel para los precios actuales.' },
        ],
      },
    ],
    relatedPages: [
      { title: 'Como funciona', description: 'Guia paso a paso para Pinklights.', url: '/guides/how-it-works' },
      { title: 'Consejos de seguridad', description: 'Diez consejos practicos para mantenerte seguro.', url: '/guides/safety-tips' },
      { title: 'Consejos de perfil', description: 'Buenas practicas para un perfil atractivo.', url: '/guides/profile-tips' },
      { title: 'Buscar perfiles', description: 'Explora perfiles por ciudad en Belgica.', url: '/find' },
    ],
  },

  // =======================================================================
  // PORTUGUESE
  // =======================================================================
  pt: {
    metaTitle: 'Perguntas frequentes - Pinklights',
    metaDescription: 'Encontre respostas para as perguntas mais comuns sobre o Pinklights: navegacao, contacto, seguranca, privacidade e pagamentos.',
    title: 'Perguntas frequentes',
    intro: 'Tudo o que precisa saber sobre o Pinklights. Quer seja um primeiro visitante, um criador de perfil ou apenas curioso, encontrara as respostas abaixo.',
    categories: [
      {
        title: 'Primeiros passos',
        items: [
          { question: 'E gratuito explorar perfis no Pinklights?', answer: 'Sim. Pode ver todos os perfis visiveis, fotos e bios sem criar uma conta ou pagar qualquer coisa.' },
          { question: 'Preciso de criar uma conta para usar o Pinklights?', answer: 'Nao e necessaria uma conta para explorar perfis. So precisa de criar uma conta se quiser publicar o seu proprio perfil.' },
          { question: 'Como pesquiso perfis?', answer: 'Comece por selecionar um tipo de servico e as suas preferencias na pagina inicial. Vera perfis correspondentes que pode filtrar por cidade, distancia, aparencia e outros criterios.' },
          { question: 'O Pinklights esta disponivel fora da Belgica?', answer: 'O Pinklights foca-se atualmente na Belgica. Todos os perfis estao em cidades belgas. No entanto, a plataforma e acessivel de qualquer parte do mundo, ideal para viajantes.' },
        ],
      },
      {
        title: 'Contactar perfis',
        items: [
          { question: 'Como contacto alguem no Pinklights?', answer: 'Pode contactar a pessoa diretamente por WhatsApp. Nao ha mensagens internas. As conversas acontecem no WhatsApp pela rapidez e conveniencia.' },
          { question: 'O meu numero de telefone e visivel?', answer: 'Quando envia uma mensagem por WhatsApp, o seu numero e visivel, como e padrao no WhatsApp. Pode ajustar as definicoes de privacidade do WhatsApp.' },
          { question: 'Posso enviar mensagens anonimamente?', answer: 'O WhatsApp requer um numero de telefone, por isso mensagens completamente anonimas nao sao possiveis. Pode limitar a informacao pessoal visivel atraves das definicoes de privacidade.' },
        ],
      },
      {
        title: 'Para proprietarios de perfis',
        items: [
          { question: 'Como crio um perfil no Pinklights?', answer: 'Registe-se e siga o processo guiado. Adicionara fotos, uma bio, a sua localizacao e tipo de servico. O processo demora apenas alguns minutos.' },
          { question: 'O que sao creditos diarios?', answer: 'Os creditos diarios mantem o seu perfil visivel na plataforma. Cada credito ativa o seu perfil por um dia. Com creditos ativos, o seu perfil aparece nos resultados de pesquisa.' },
          { question: 'Como funciona a visibilidade?', answer: 'O seu perfil aparece nos resultados de pesquisa quando tem creditos ativos. Tambem pode impulsionar a sua visibilidade para aparecer mais acima durante as horas de ponta.' },
          { question: 'Posso definir a minha disponibilidade?', answer: 'Sim. O seu perfil inclui definicoes de disponibilidade onde pode indicar quando esta disponivel. Manter esta informacao atualizada ajuda a atrair as conexoes certas.' },
        ],
      },
      {
        title: 'Seguranca e privacidade',
        items: [
          { question: 'O Pinklights e seguro?', answer: 'O Pinklights e concebido com a seguranca em mente. Encorajamos primeiros encontros em publico, fornecemos guias de seguranca e analisamos perfis reportados. Recomendamos seguir as nossas dicas de seguranca.' },
          { question: 'Como sao protegidos os meus dados pessoais?', answer: 'O Pinklights cumpre o RGPD e leva a protecao de dados a serio. Apenas recolhemos informacao necessaria para operar a plataforma e nunca vendemos dados pessoais a terceiros.' },
          { question: 'Posso apagar a minha conta e dados?', answer: 'Sim. Pode apagar a sua conta a qualquer momento nas definicoes do perfil. Os seus dados pessoais serao eliminados de acordo com o RGPD.' },
        ],
      },
      {
        title: 'Pagamentos',
        items: [
          { question: 'Que metodos de pagamento o Pinklights aceita?', answer: 'O Pinklights aceita os principais cartoes de credito e debito, bem como outros metodos de pagamento online comuns. Todas as transacoes sao processadas de forma segura.' },
          { question: 'Os creditos sao reembolsaveis?', answer: 'Os creditos geralmente nao sao reembolsaveis apos a compra. Recomendamos comecar com um pacote pequeno para se familiarizar com a plataforma.' },
          { question: 'Quanto custa um credito diario?', answer: 'O preco dos creditos diarios varia consoante o tamanho do pacote. Pacotes maiores oferecem um custo por dia inferior. Consulte a seccao de creditos no seu painel para os precos atuais.' },
        ],
      },
    ],
    relatedPages: [
      { title: 'Como funciona', description: 'Guia passo a passo para o Pinklights.', url: '/guides/how-it-works' },
      { title: 'Dicas de seguranca', description: 'Dez dicas praticas para se manter seguro.', url: '/guides/safety-tips' },
      { title: 'Dicas de perfil', description: 'Boas praticas para um perfil atraente.', url: '/guides/profile-tips' },
      { title: 'Encontrar perfis', description: 'Explore perfis por cidade na Belgica.', url: '/find' },
    ],
  },

  // =======================================================================
  // RUSSIAN
  // =======================================================================
  ru: {
    metaTitle: 'Частые вопросы - Pinklights',
    metaDescription: 'Ответы на частые вопросы о Pinklights: просмотр профилей, связь, безопасность, конфиденциальность и оплата.',
    title: 'Частые вопросы',
    intro: 'Все, что нужно знать о Pinklights. Независимо от того, вы впервые на платформе, создатель профиля или просто интересуетесь, ответы находятся ниже.',
    categories: [
      {
        title: 'Начало работы',
        items: [
          { question: 'Бесплатно ли просматривать профили на Pinklights?', answer: 'Да. Вы можете просматривать все видимые профили, фотографии и описания без создания аккаунта и без оплаты.' },
          { question: 'Нужно ли создавать аккаунт для использования Pinklights?', answer: 'Для просмотра профилей аккаунт не нужен. Аккаунт необходим только для размещения собственного профиля.' },
          { question: 'Как искать профили?', answer: 'Начните с выбора типа услуги и ваших предпочтений на главной странице. Затем вы увидите подходящие профили, которые можно дополнительно фильтровать по городу, расстоянию, внешности и другим критериям.' },
          { question: 'Доступен ли Pinklights за пределами Бельгии?', answer: 'В настоящее время Pinklights ориентирован на Бельгию. Все профили расположены в бельгийских городах. Однако платформа доступна из любой точки мира, что удобно для путешественников.' },
        ],
      },
      {
        title: 'Связь с профилями',
        items: [
          { question: 'Как связаться с человеком на Pinklights?', answer: 'Вы можете связаться напрямую через WhatsApp. Встроенной системы сообщений нет. Общение происходит в WhatsApp для быстроты и удобства.' },
          { question: 'Виден ли мой номер телефона?', answer: 'Когда вы отправляете сообщение через WhatsApp, ваш номер виден собеседнику, как это стандартно для WhatsApp. Вы можете настроить параметры конфиденциальности WhatsApp.' },
          { question: 'Можно ли писать анонимно?', answer: 'WhatsApp требует номер телефона, поэтому полностью анонимное общение невозможно. Однако вы можете ограничить видимую личную информацию через настройки конфиденциальности.' },
        ],
      },
      {
        title: 'Для владельцев профилей',
        items: [
          { question: 'Как создать профиль на Pinklights?', answer: 'Зарегистрируйтесь и следуйте пошаговому процессу. Вы добавите фотографии, описание, местоположение и тип услуги. Процесс занимает всего несколько минут.' },
          { question: 'Что такое дневные кредиты?', answer: 'Дневные кредиты поддерживают видимость вашего профиля на платформе. Каждый кредит активирует профиль на один день. При активных кредитах ваш профиль отображается в результатах поиска.' },
          { question: 'Как работает видимость?', answer: 'Ваш профиль появляется в результатах поиска при наличии активных кредитов. Вы также можете повысить видимость, чтобы появляться выше в часы пик.' },
          { question: 'Могу ли я указать свою доступность?', answer: 'Да. В профиле есть настройки доступности, где вы можете указать, когда вы свободны. Поддержание актуальной информации помогает привлекать подходящие контакты.' },
        ],
      },
      {
        title: 'Безопасность и конфиденциальность',
        items: [
          { question: 'Безопасно ли использовать Pinklights?', answer: 'Pinklights разработан с учетом безопасности. Мы рекомендуем первые встречи в публичных местах, предоставляем руководства по безопасности и проверяем отмеченные профили. Рекомендуем следовать нашим советам по безопасности.' },
          { question: 'Как защищены мои личные данные?', answer: 'Pinklights соблюдает GDPR и серьезно относится к защите данных. Мы собираем только информацию, необходимую для работы платформы, и никогда не продаем личные данные третьим лицам.' },
          { question: 'Могу ли я удалить свой аккаунт и данные?', answer: 'Да. Вы можете удалить аккаунт в любое время в настройках профиля. Ваши личные данные будут удалены в соответствии с требованиями GDPR.' },
        ],
      },
      {
        title: 'Оплата',
        items: [
          { question: 'Какие способы оплаты принимает Pinklights?', answer: 'Pinklights принимает основные кредитные и дебетовые карты, а также другие распространенные способы онлайн-оплаты. Все транзакции обрабатываются безопасно.' },
          { question: 'Можно ли вернуть кредиты?', answer: 'Кредиты, как правило, не подлежат возврату после покупки. Рекомендуем начать с небольшого пакета, чтобы познакомиться с платформой.' },
          { question: 'Сколько стоит дневной кредит?', answer: 'Цена дневных кредитов зависит от размера пакета. Большие пакеты предлагают более низкую стоимость за день. Актуальные цены смотрите в разделе кредитов в личном кабинете.' },
        ],
      },
    ],
    relatedPages: [
      { title: 'Как это работает', description: 'Пошаговое руководство по Pinklights.', url: '/guides/how-it-works' },
      { title: 'Советы по безопасности', description: 'Десять практических советов для безопасных встреч.', url: '/guides/safety-tips' },
      { title: 'Советы по профилю', description: 'Лучшие практики для привлекательного профиля.', url: '/guides/profile-tips' },
      { title: 'Найти профили', description: 'Просматривайте профили по городам Бельгии.', url: '/find' },
    ],
  },

  // =======================================================================
  // GERMAN
  // =======================================================================
  de: {
    metaTitle: 'Haeufige Fragen - Pinklights',
    metaDescription: 'Antworten auf haeufige Fragen zu Pinklights: Durchsuchen, Kontakt, Sicherheit, Datenschutz und Zahlungen.',
    title: 'Haeufig gestellte Fragen',
    intro: 'Alles, was Sie ueber Pinklights wissen muessen. Ob Sie zum ersten Mal hier sind, ein Profilersteller oder einfach neugierig, Sie finden die Antworten unten.',
    categories: [
      {
        title: 'Erste Schritte',
        items: [
          { question: 'Ist das Durchsuchen von Profilen auf Pinklights kostenlos?', answer: 'Ja. Sie koennen alle sichtbaren Profile durchsuchen, Fotos ansehen und Bios lesen, ohne ein Konto zu erstellen oder etwas zu bezahlen.' },
          { question: 'Muss ich ein Konto erstellen, um Pinklights zu nutzen?', answer: 'Zum Durchsuchen von Profilen ist kein Konto erforderlich. Ein Konto wird nur benoetigt, wenn Sie Ihr eigenes Profil veroeffentlichen moechten.' },
          { question: 'Wie suche ich nach Profilen?', answer: 'Beginnen Sie mit der Auswahl eines Servicetyps und Ihrer Praeferenzen auf der Startseite. Sie sehen dann passende Profile, die Sie nach Stadt, Entfernung, Aussehen und anderen Kriterien filtern koennen.' },
          { question: 'Ist Pinklights ausserhalb von Belgien verfuegbar?', answer: 'Pinklights konzentriert sich derzeit auf Belgien. Alle Profile befinden sich in belgischen Staedten. Die Plattform ist jedoch weltweit zugaenglich, ideal fuer Reisende.' },
        ],
      },
      {
        title: 'Kontaktaufnahme',
        items: [
          { question: 'Wie kontaktiere ich jemanden auf Pinklights?', answer: 'Sie koennen die Person direkt ueber WhatsApp kontaktieren. Es gibt kein internes Nachrichtensystem. Gespraeche finden auf WhatsApp statt fuer Schnelligkeit und Bequemlichkeit.' },
          { question: 'Ist meine Telefonnummer sichtbar?', answer: 'Wenn Sie jemandem ueber WhatsApp schreiben, ist Ihre Telefonnummer sichtbar, wie es bei WhatsApp Standard ist. Sie koennen Ihre WhatsApp-Datenschutzeinstellungen anpassen.' },
          { question: 'Kann ich anonym Nachrichten senden?', answer: 'WhatsApp erfordert eine Telefonnummer, daher sind voellig anonyme Nachrichten nicht moeglich. Sie koennen jedoch ueber die Datenschutzeinstellungen einschraenken, welche persoenlichen Informationen sichtbar sind.' },
        ],
      },
      {
        title: 'Fuer Profileigentuemer',
        items: [
          { question: 'Wie erstelle ich ein Profil auf Pinklights?', answer: 'Registrieren Sie sich und folgen Sie dem gefuehrten Einrichtungsprozess. Sie fuegen Fotos hinzu, schreiben eine Bio, legen Ihren Standort und Servicetyp fest. Der Prozess dauert nur wenige Minuten.' },
          { question: 'Was sind Tagescredits?', answer: 'Tagescredits halten Ihr Profil auf der Plattform sichtbar. Jeder Credit aktiviert Ihr Profil fuer einen Tag. Mit aktiven Credits erscheint Ihr Profil in den Suchergebnissen.' },
          { question: 'Wie funktioniert die Sichtbarkeit?', answer: 'Ihr Profil erscheint in den Suchergebnissen, wenn Sie aktive Tagescredits haben. Sie koennen auch Ihre Sichtbarkeit verstaerken, um zu Spitzenzeiten weiter oben zu erscheinen.' },
          { question: 'Kann ich meine Verfuegbarkeit einstellen?', answer: 'Ja. Ihr Profil enthaelt Verfuegbarkeitseinstellungen, in denen Sie angeben koennen, wann Sie verfuegbar sind. Aktuelle Informationen helfen, die richtigen Kontakte anzuziehen.' },
        ],
      },
      {
        title: 'Sicherheit und Datenschutz',
        items: [
          { question: 'Ist Pinklights sicher?', answer: 'Pinklights ist mit Blick auf Sicherheit konzipiert. Wir empfehlen erste Treffen an oeffentlichen Orten, stellen Sicherheitsleitfaeden bereit und ueberpruefen gemeldete Profile. Wir empfehlen, unsere Sicherheitstipps zu befolgen.' },
          { question: 'Wie werden meine persoenlichen Daten geschuetzt?', answer: 'Pinklights haelt sich an die DSGVO und nimmt Datenschutz ernst. Wir erheben nur Informationen, die fuer den Betrieb der Plattform erforderlich sind, und verkaufen niemals persoenliche Daten an Dritte.' },
          { question: 'Kann ich mein Konto und meine Daten loeschen?', answer: 'Ja. Sie koennen Ihr Konto jederzeit in Ihren Profileinstellungen loeschen. Ihre persoenlichen Daten werden gemaess DSGVO geloescht.' },
        ],
      },
      {
        title: 'Zahlungen',
        items: [
          { question: 'Welche Zahlungsmethoden akzeptiert Pinklights?', answer: 'Pinklights akzeptiert gaengige Kredit- und Debitkarten sowie andere uebliche Online-Zahlungsmethoden. Alle Transaktionen werden sicher abgewickelt.' },
          { question: 'Sind Credits erstattungsfaehig?', answer: 'Credits sind nach dem Kauf in der Regel nicht erstattungsfaehig. Wir empfehlen, mit einem kleinen Paket zu beginnen, um die Plattform kennenzulernen.' },
          { question: 'Was kostet ein Tagescredit?', answer: 'Der Preis fuer Tagescredits variiert je nach Paketgroesse. Groessere Pakete bieten niedrigere Kosten pro Tag. Aktuelle Preise finden Sie im Credits-Bereich Ihres Dashboards.' },
        ],
      },
    ],
    relatedPages: [
      { title: 'Wie es funktioniert', description: 'Schritt-fuer-Schritt-Anleitung fuer Pinklights.', url: '/guides/how-it-works' },
      { title: 'Sicherheitstipps', description: 'Zehn praktische Tipps fuer sichere Treffen.', url: '/guides/safety-tips' },
      { title: 'Profiltipps', description: 'Best Practices fuer ein attraktives Profil.', url: '/guides/profile-tips' },
      { title: 'Profile finden', description: 'Durchsuchen Sie Profile nach Stadt in Belgien.', url: '/find' },
    ],
  },
};

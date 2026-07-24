import { Locale } from './locales';

interface PageSection {
  heading: string;
  paragraphs: string[];
}

interface PageData {
  metaTitle: string;
  metaDescription: string;
  title: string;
  sections: PageSection[];
  faqItems?: { question: string; answer: string }[];
  relatedPages: { title: string; description: string; url: string }[];
}

interface CompareHubData {
  metaTitle: string;
  metaDescription: string;
  title: string;
  intro: string;
  comparisons: { slug: string; title: string; description: string }[];
}

// ---------------------------------------------------------------------------
// ABOUT
// ---------------------------------------------------------------------------
export const ABOUT_TRANSLATIONS: Record<Locale, PageData> = {
  fr: {
    metaTitle: 'A propos de Pinklights - Plateforme en Belgique',
    metaDescription: 'Pinklights est une plateforme de mise en relation pensee pour des connexions plus sures et plus directes. Decouvrez notre mission et nos valeurs.',
    title: 'A propos de Pinklights',
    sections: [
      {
        heading: 'Notre mission',
        paragraphs: [
          'Pinklights est une plateforme de mise en relation concue pour rendre les connexions plus sures, plus directes et plus transparentes. Nous avons construit cette plateforme parce que nous avons identifie un vide entre les applications de rencontres classiques, basees sur des algorithmes et du matching gamifie, et les sites de petites annonces, souvent depourvus de fonctionnalites de securite et de controle qualite.',
          'Notre mission est simple : faciliter la decouverte et la mise en relation avec des accompagnantes en Belgique, sans les frictions des algorithmes, les risques des plateformes non moderees, ou les barrieres de la creation de compte obligatoire. Nous pensons qu\'une plateforme peut etre a la fois accessible et sure.',
          'Chaque decision que nous prenons, de la navigation sans compte a l\'utilisation de WhatsApp comme methode de contact principale, est guidee par ce principe. Nous voulons que la plateforme s\'efface et laisse les gens se connecter selon leurs propres conditions.',
        ],
      },
      {
        heading: 'Pourquoi nous avons cree Pinklights',
        paragraphs: [
          'L\'espace des accompagnantes en Belgique a historiquement ete desservi par deux types de plateformes, chacune avec des limites importantes. Les applications de rencontres exigent un matching mutuel et des semaines de messages avant toute vraie connexion. Les sites de petites annonces offrent de la spontaneite mais presentent de serieux problemes de securite : pas de verification, pas de moderation, pas de responsabilisation.',
          'Nous avons cree Pinklights pour offrir une alternative qui combine la spontaneite des annonces classees avec la securite et la qualite d\'une plateforme curatee. De vrais profils avec de vraies photos, examines par notre equipe de moderation. Un contact WhatsApp direct. Une recherche geographique adaptee a la Belgique. Et des controles de confidentialite qui laissent les proprietaires de profils decider exactement ce qu\'ils partagent.',
        ],
      },
      {
        heading: 'Notre presence en Belgique',
        paragraphs: [
          'La Belgique est notre premier marche et notre marche principal. Nous comprenons le paysage local : la realite bilingue des regions flamande et wallonne, les distances compactes entre les villes, et l\'importance de la discretion dans un petit pays. Notre plateforme prend en charge plusieurs langues et couvre des villes dans les deux regions, d\'Anvers et Gand a Bruxelles, Liege et Namur.',
          'Nous sommes pleinement conformes aux reglementations europeennes et belges en matiere de vie privee. Nous prenons la conformite RGPD au serieux : vos donnees sont stockees de maniere securisee, vous avez le droit d\'acceder a vos informations et de les supprimer, et nous ne vendons pas de donnees personnelles a des tiers.',
        ],
      },
      {
        heading: 'Nous contacter',
        paragraphs: [
          'Nous sommes la pour vous aider. Que vous ayez une question sur la plateforme, que vous souhaitiez signaler un probleme ou partager un retour, vous pouvez nous joindre par WhatsApp au +32 478 02 64 79 ou par email a support@pink-lights.be.',
          'Nous visons a repondre a toutes les demandes dans les 24 heures. Pour les preoccupations urgentes en matiere de securite, WhatsApp est le moyen le plus rapide de nous contacter.',
        ],
      },
    ],
    relatedPages: [
      { title: 'Securite sur Pinklights', description: 'Comment nous protegens votre vie privee et votre securite sur la plateforme.', url: '/safety' },
      { title: 'FAQ', description: 'Questions frequemment posees sur l\'utilisation de Pinklights.', url: '/faq' },
      { title: 'Comment ca marche', description: 'Un guide etape par etape pour naviguer et se connecter.', url: '/guides/how-it-works' },
    ],
  },

  nl: {
    metaTitle: 'Over Pinklights - Platform in Belgie',
    metaDescription: 'Pinklights is een platform voor veiligere en directere connecties. Ontdek onze missie, waarden en hoe je ons kunt bereiken.',
    title: 'Over Pinklights',
    sections: [
      {
        heading: 'Onze missie',
        paragraphs: [
          'Pinklights is een platform dat ontworpen is om connecties veiliger, directer en transparanter te maken. We hebben dit platform gebouwd omdat we een kloof zagen tussen reguliere dating-apps, die vertrouwen op algoritmes en gamified matching, en advertentiesites, die vaak basale veiligheidsfuncties en kwaliteitscontrole missen.',
          'Onze missie is eenvoudig: het makkelijker maken om metgezellen te vinden in Belgie, zonder de wrijving van algoritmes, de risico\'s van niet-gemodereerde platformen, of de barriere van verplichte accountcreatie. Wij geloven dat een platform zowel toegankelijk als veilig kan zijn.',
          'Elke beslissing die we nemen, van het toestaan van browsen zonder account tot het gebruik van WhatsApp als primaire contactmethode, wordt gedreven door dit principe. We willen dat het platform uit de weg gaat en mensen laat verbinden op hun eigen voorwaarden.',
        ],
      },
      {
        heading: 'Waarom we Pinklights hebben gebouwd',
        paragraphs: [
          'De metgezellenwereld in Belgie werd historisch bediend door twee soorten platformen, elk met aanzienlijke beperkingen. Dating-apps vereisen wederzijdse matching en weken berichten voor er echte connectie plaatsvindt. Advertentiesites bieden directheid maar brengen ernstige veiligheidsproblemen met zich mee: geen verificatie, geen moderatie, geen verantwoording.',
          'We hebben Pinklights gebouwd om een alternatief te bieden dat de directheid van advertenties combineert met de veiligheid en kwaliteit van een gecureerd platform. Echte profielen met echte foto\'s, beoordeeld door ons moderatieteam. Direct WhatsApp-contact. Locatiegebaseerd zoeken afgestemd op Belgie. En privacycontroles waarmee profieleigenaren precies bepalen wat ze delen.',
        ],
      },
      {
        heading: 'Onze aanwezigheid in Belgie',
        paragraphs: [
          'Belgie is onze eerste en primaire markt. We begrijpen het lokale landschap: de tweetalige realiteit van Vlaamse en Waalse regio\'s, de compacte afstanden tussen steden, en het belang van discretie in een klein land. Ons platform ondersteunt meerdere talen en dekt steden in beide regio\'s, van Antwerpen en Gent tot Brussel, Luik en Namen.',
          'We zijn volledig in overeenstemming met Europese en Belgische privacyregelgeving. We nemen AVG-naleving serieus: uw gegevens worden veilig opgeslagen, u heeft het recht om uw informatie in te zien en te verwijderen, en we verkopen geen persoonlijke gegevens aan derden.',
        ],
      },
      {
        heading: 'Contact',
        paragraphs: [
          'We staan voor u klaar. Of u nu een vraag heeft over het platform, een probleem wilt melden of feedback wilt delen, u kunt ons bereiken via WhatsApp op +32 478 02 64 79 of via e-mail op support@pink-lights.be.',
          'We streven ernaar alle vragen binnen 24 uur te beantwoorden. Voor dringende veiligheidskwesties is WhatsApp de snelste manier om ons te bereiken.',
        ],
      },
    ],
    relatedPages: [
      { title: 'Veiligheid op Pinklights', description: 'Hoe we uw privacy en veiligheid beschermen op het platform.', url: '/safety' },
      { title: 'FAQ', description: 'Veelgestelde vragen over het gebruik van Pinklights.', url: '/faq' },
      { title: 'Hoe het werkt', description: 'Een stapsgewijze gids om te bladeren en contact te leggen.', url: '/guides/how-it-works' },
    ],
  },

  es: {
    metaTitle: 'Sobre Pinklights - Plataforma en Belgica',
    metaDescription: 'Pinklights es una plataforma de acompanantes pensada para conexiones mas seguras y directas. Conoce nuestra mision y valores.',
    title: 'Sobre Pinklights',
    sections: [
      {
        heading: 'Nuestra mision',
        paragraphs: [
          'Pinklights es una plataforma de acompanantes disenada para hacer las conexiones mas seguras, directas y transparentes. Creamos esta plataforma porque detectamos un vacio entre las aplicaciones de citas convencionales, basadas en algoritmos y gamificacion, y los sitios de anuncios clasificados, que a menudo carecen de funciones basicas de seguridad y control de calidad.',
          'Nuestra mision es sencilla: facilitar el descubrimiento y la conexion con acompanantes en Belgica, sin la friccion de los algoritmos, los riesgos de plataformas sin moderacion, ni las barreras de la creacion obligatoria de cuenta. Creemos que una plataforma puede ser accesible y segura al mismo tiempo.',
          'Cada decision que tomamos, desde permitir la navegacion sin cuenta hasta usar WhatsApp como metodo principal de contacto, esta guiada por este principio. Queremos que la plataforma se aparte y deje que las personas se conecten en sus propios terminos.',
        ],
      },
      {
        heading: 'Por que creamos Pinklights',
        paragraphs: [
          'El espacio de acompanantes en Belgica ha sido atendido historicamente por dos tipos de plataformas, ambas con limitaciones importantes. Las apps de citas exigen matching mutuo y semanas de mensajes antes de que se produzca cualquier conexion real. Los sitios de clasificados ofrecen inmediatez pero presentan problemas serios de seguridad: sin verificacion, sin moderacion y sin responsabilidad.',
          'Creamos Pinklights para ofrecer una alternativa que combina la inmediatez de los clasificados con la seguridad y calidad de una plataforma curada. Perfiles reales con fotos reales, revisados por nuestro equipo de moderacion. Contacto directo por WhatsApp. Busqueda por ubicacion adaptada a la geografia compacta de Belgica. Y controles de privacidad que permiten a los propietarios de perfiles decidir exactamente que compartir.',
        ],
      },
      {
        heading: 'Nuestra presencia en Belgica',
        paragraphs: [
          'Belgica es nuestro primer mercado y nuestro mercado principal. Entendemos el panorama local: la realidad bilingue de las regiones flamenca y valona, las distancias cortas entre ciudades y la importancia de la discrecion en un pais pequeno. Nuestra plataforma soporta multiples idiomas y cubre ciudades en ambas regiones, desde Amberes y Gante hasta Bruselas, Lieja y Namur.',
          'Cumplimos plenamente con la normativa europea y belga de privacidad. Nos tomamos el cumplimiento del RGPD en serio: sus datos se almacenan de forma segura, tiene derecho a acceder y eliminar su informacion, y no vendemos datos personales a terceros.',
        ],
      },
      {
        heading: 'Contacto',
        paragraphs: [
          'Estamos aqui para ayudarle. Ya sea que tenga una pregunta sobre la plataforma, quiera reportar un problema o compartir sus comentarios, puede contactarnos por WhatsApp al +32 478 02 64 79 o por email a support@pink-lights.be.',
          'Nuestro objetivo es responder a todas las consultas en un plazo de 24 horas. Para asuntos urgentes de seguridad, WhatsApp es la via mas rapida para contactarnos.',
        ],
      },
    ],
    relatedPages: [
      { title: 'Seguridad en Pinklights', description: 'Como protegemos tu privacidad y seguridad en la plataforma.', url: '/safety' },
      { title: 'FAQ', description: 'Preguntas frecuentes sobre el uso de Pinklights.', url: '/faq' },
      { title: 'Como funciona', description: 'Una guia paso a paso para navegar y conectar.', url: '/guides/how-it-works' },
    ],
  },

  pt: {
    metaTitle: 'Sobre o Pinklights - Plataforma na Belgica',
    metaDescription: 'O Pinklights e uma plataforma de acompanhantes pensada para conexoes mais seguras e diretas. Conheca a nossa missao e valores.',
    title: 'Sobre o Pinklights',
    sections: [
      {
        heading: 'A nossa missao',
        paragraphs: [
          'O Pinklights e uma plataforma de acompanhantes concebida para tornar as conexoes mais seguras, diretas e transparentes. Criamos esta plataforma porque identificamos uma lacuna entre as aplicacoes de encontros convencionais, baseadas em algoritmos e matching gamificado, e os sites de classificados, que frequentemente carecem de funcionalidades basicas de seguranca e controlo de qualidade.',
          'A nossa missao e simples: facilitar a descoberta e a ligacao com acompanhantes na Belgica, sem a friccao dos algoritmos, os riscos das plataformas sem moderacao ou as barreiras da criacao obrigatoria de conta. Acreditamos que uma plataforma pode ser acessivel e segura ao mesmo tempo.',
          'Cada decisao que tomamos, desde permitir a navegacao sem conta ate usar o WhatsApp como metodo principal de contacto, e guiada por este principio. Queremos que a plataforma se apague e deixe as pessoas conectarem-se nos seus proprios termos.',
        ],
      },
      {
        heading: 'Porque criamos o Pinklights',
        paragraphs: [
          'O espaco de acompanhantes na Belgica tem sido historicamente servido por dois tipos de plataformas, ambas com limitacoes significativas. As apps de encontros exigem matching mutuo e semanas de mensagens antes de qualquer conexao real. Os sites de classificados oferecem imediatismo mas apresentam preocupacoes serias de seguranca: sem verificacao, sem moderacao e sem responsabilizacao.',
          'Criamos o Pinklights para oferecer uma alternativa que combina a imediatez dos classificados com a seguranca e qualidade de uma plataforma curada. Perfis reais com fotos reais, revisados pela nossa equipa de moderacao. Contacto direto por WhatsApp. Pesquisa por localizacao adaptada a geografia compacta da Belgica. E controlos de privacidade que permitem aos proprietarios de perfis decidir exatamente o que partilhar.',
        ],
      },
      {
        heading: 'A nossa presenca na Belgica',
        paragraphs: [
          'A Belgica e o nosso primeiro e principal mercado. Compreendemos a realidade local: a natureza bilingue das regioes flamenga e valona, as distancias curtas entre cidades e a importancia da discricao num pais pequeno. A nossa plataforma suporta multiplos idiomas e abrange cidades em ambas as regioes, de Antuérpia e Gante a Bruxelas, Liege e Namur.',
          'Cumprimos integralmente a regulamentacao europeia e belga de privacidade. Levamos o cumprimento do RGPD a serio: os seus dados sao armazenados de forma segura, tem o direito de aceder e apagar a sua informacao, e nao vendemos dados pessoais a terceiros.',
        ],
      },
      {
        heading: 'Contacto',
        paragraphs: [
          'Estamos aqui para ajudar. Quer tenha uma questao sobre a plataforma, queira reportar um problema ou partilhar a sua opiniao, pode contactar-nos por WhatsApp no +32 478 02 64 79 ou por email em support@pink-lights.be.',
          'O nosso objetivo e responder a todas as questoes no prazo de 24 horas. Para questoes urgentes de seguranca, o WhatsApp e a forma mais rapida de nos contactar.',
        ],
      },
    ],
    relatedPages: [
      { title: 'Seguranca no Pinklights', description: 'Como protegemos a sua privacidade e seguranca na plataforma.', url: '/safety' },
      { title: 'FAQ', description: 'Perguntas frequentes sobre a utilizacao do Pinklights.', url: '/faq' },
      { title: 'Como funciona', description: 'Um guia passo a passo para navegar e conectar.', url: '/guides/how-it-works' },
    ],
  },

  ru: {
    metaTitle: 'O Pinklights - Platforma v Belgii',
    metaDescription: 'Pinklights - platforma dlya bolee bezopasnykh i pryamykh svyazey. Uznayte o nashey missii, tsennostyakh i kontaktakh.',
    title: 'O Pinklights',
    sections: [
      {
        heading: 'Nasha missiya',
        paragraphs: [
          'Pinklights - eto platforma, sozdannaya dlya togo, chtoby sdelat\' svyazi bolee bezopasnymi, pryamymi i prozrachnymi. My sozdali etu platformu, potomu chto uvideli razryv mezhdu obychnymi prilozheniyami dlya znakomstv, kotoryye polagayutsya na algoritmy i igrovoy matching, i saytami ob\'yavleniy, kotoryye chasto ne imeyut bazovykh funktsiy bezopasnosti.',
          'Nasha missiya prosta: oblegchit\' poisk i svyaz\' s kompan\'onami v Belgii bez trudnostey algoritmov, riskov nemoderiruemykh platform ili bar\'yerov obyazatel\'noy registratsii. My schitayem, chto platforma mozhet byt\' odnovremenno dostupnoy i bezopasnoy.',
          'Kazhdoye resheniye, kotoroye my prinimayem, ot prosmotra bez akkaunta do ispol\'zovaniya WhatsApp kak osnovnogo sposoba svyazi, prodiktovano etim printsipom. My khotim, chtoby platforma ustupal dorogu i pozvolyala lyudyam svyazyvat\'sya na ikh usloviyakh.',
        ],
      },
      {
        heading: 'Pochemu my sozdali Pinklights',
        paragraphs: [
          'Rynok kompan\'onov v Belgii istoricheski obsluzhivalsya dvumya tipami platform, kazhdaya s sushchestvennymi ogranicheniyami. Prilozheniya dlya znakomstv trebuyut vzaimnogo matchinga i nedel\' perepiski prezhde chem proiskhodit nastoyashchaya svyaz\'. Sayty ob\'yavleniy predlagayut neposredstvennost\', no nesut ser\'yoznyye riski bezopasnosti: net verifikatsii, net moderatsii, net otvetstvennosti.',
          'My sozdali Pinklights, chtoby predlozhit\' al\'ternativu, kotoraya ob\'yedinyayet neposredstvennost\' ob\'yavleniy s bezopasnost\'yu i kachestvom kurirovanoy platformy. Real\'nyye profili s real\'nymi foto, proverennyye nashey komandoy moderatsii. Pryamoy kontakt cherez WhatsApp. Poisk po mestopolozheniyu, adaptirovannyy k kompaktnoy geografii Belgii. I nastroyki konfidentsial\'nosti, pozvolyayushchiye vladelets profiley reshat\', chto imenno oni dlyat.',
        ],
      },
      {
        heading: 'Nashe prisutstviye v Belgii',
        paragraphs: [
          'Belgiya - nash pervyy i osnovnoy rynok. My ponimayem mestnyy landshaft: dvuyazychnuyu real\'nost\' Flamandskogo i Vallonskogo regionov, kompaktnyye rasstoyaniya mezhdu gorodami i vazhnost\' diskretnosti v malen\'koy strane. Nasha platforma podderzhivayet neskol\'ko yazykov i okhvatyvayet goroda v oboikh regionakh, ot Antverpena i Genta do Bryusselya, L\'yezha i Namyura.',
          'My polnost\'yu sootvetstvuyem yevropeyskim i bel\'giyskim normam konfidentsial\'nosti. My ser\'yozno otnosimsya k soblyudeniyu GDPR: vashi dannyye khranyatsya v bezopasnosti, vy imeyete pravo na dostup i udaleniye vashey informatsii, i my ne prodayom personal\'nyye dannyye tret\'im litsam.',
        ],
      },
      {
        heading: 'Svyazhites\' s nami',
        paragraphs: [
          'My vsegda gotovy pomoch\'. Yesli u vas yest\' vopros o platforme, vy khotite soobshchit\' o probleme ili podelitsya otzyvom, vy mozhete svyazat\'sya s nami cherez WhatsApp po nomeru +32 478 02 64 79 ili po email support@pink-lights.be.',
          'My streminsya otvechat\' na vse zaprosy v techeniye 24 chasov. Dlya srochnykh voprosov bezopasnosti WhatsApp - samyy bystryy sposob svyazat\'sya s nami.',
        ],
      },
    ],
    relatedPages: [
      { title: 'Bezopasnost\' na Pinklights', description: 'Kak my zashchishchayem vashu konfidentsial\'nost\' i bezopasnost\' na platforme.', url: '/safety' },
      { title: 'FAQ', description: 'Chasto zadavayemyye voprosy ob ispol\'zovanii Pinklights.', url: '/faq' },
      { title: 'Kak eto rabotayet', description: 'Poshagovoye rukovodstvo po prosmotra i svyazi.', url: '/guides/how-it-works' },
    ],
  },

  de: {
    metaTitle: 'Ueber Pinklights - Plattform in Belgien',
    metaDescription: 'Pinklights ist eine Begleit-Plattform fuer sicherere und direktere Verbindungen. Erfahren Sie mehr ueber unsere Mission und Werte.',
    title: 'Ueber Pinklights',
    sections: [
      {
        heading: 'Unsere Mission',
        paragraphs: [
          'Pinklights ist eine Begleit-Plattform, die darauf ausgelegt ist, Verbindungen sicherer, direkter und transparenter zu gestalten. Wir haben diese Plattform entwickelt, weil wir eine Luecke zwischen herkoemmlichen Dating-Apps, die auf Algorithmen und gamifiziertes Matching setzen, und Kleinanzeigen-Seiten, denen oft grundlegende Sicherheitsfunktionen fehlen, erkannt haben.',
          'Unsere Mission ist einfach: Es soll leichter sein, Begleitpersonen in Belgien zu finden und zu kontaktieren, ohne die Reibung von Algorithmen, die Risiken unmoderierter Plattformen oder die Huerden einer Pflichtregistrierung. Wir sind ueberzeugt, dass eine Plattform gleichzeitig zugaenglich und sicher sein kann.',
          'Jede Entscheidung, die wir treffen, vom Browsen ohne Konto bis zur Nutzung von WhatsApp als primaere Kontaktmethode, wird von diesem Prinzip geleitet. Wir wollen, dass die Plattform sich zuruecknimmt und Menschen auf ihren eigenen Bedingungen verbindet.',
        ],
      },
      {
        heading: 'Warum wir Pinklights entwickelt haben',
        paragraphs: [
          'Der Begleitmarkt in Belgien wurde historisch von zwei Plattformtypen bedient, beide mit erheblichen Einschraenkungen. Dating-Apps erfordern gegenseitiges Matching und wochenlange Nachrichten, bevor echte Verbindungen entstehen. Kleinanzeigen-Seiten bieten Direktheit, bringen aber ernsthafte Sicherheitsbedenken mit sich: keine Verifizierung, keine Moderation, keine Rechenschaftspflicht.',
          'Wir haben Pinklights entwickelt, um eine Alternative zu bieten, die die Direktheit von Kleinanzeigen mit der Sicherheit und Qualitaet einer kuratierten Plattform verbindet. Echte Profile mit echten Fotos, geprueft von unserem Moderationsteam. Direkter WhatsApp-Kontakt. Standortbasierte Suche, abgestimmt auf Belgiens kompakte Geografie. Und Datenschutzkontrollen, mit denen Profileigentuemer genau bestimmen, was sie teilen.',
        ],
      },
      {
        heading: 'Unsere Praesenz in Belgien',
        paragraphs: [
          'Belgien ist unser erster und wichtigster Markt. Wir verstehen die lokalen Gegebenheiten: die zweisprachige Realitaet der flaemischen und wallonischen Regionen, die kurzen Entfernungen zwischen Staedten und die Bedeutung von Diskretion in einem kleinen Land. Unsere Plattform unterstuetzt mehrere Sprachen und deckt Staedte in beiden Regionen ab, von Antwerpen und Gent bis Bruessel, Luettich und Namur.',
          'Wir sind vollstaendig konform mit europaeischen und belgischen Datenschutzvorschriften. Wir nehmen die DSGVO-Konformitaet ernst: Ihre Daten werden sicher gespeichert, Sie haben das Recht auf Auskunft und Loeschung Ihrer Informationen, und wir verkaufen keine personenbezogenen Daten an Dritte.',
        ],
      },
      {
        heading: 'Kontakt',
        paragraphs: [
          'Wir sind fuer Sie da. Ob Sie eine Frage zur Plattform haben, ein Problem melden oder Feedback teilen moechten, Sie erreichen uns per WhatsApp unter +32 478 02 64 79 oder per E-Mail an support@pink-lights.be.',
          'Wir bemuehen uns, alle Anfragen innerhalb von 24 Stunden zu beantworten. Bei dringenden Sicherheitsanliegen ist WhatsApp der schnellste Weg, uns zu erreichen.',
        ],
      },
    ],
    relatedPages: [
      { title: 'Sicherheit auf Pinklights', description: 'Wie wir Ihre Privatsphaere und Sicherheit auf der Plattform schuetzen.', url: '/safety' },
      { title: 'FAQ', description: 'Haeufig gestellte Fragen zur Nutzung von Pinklights.', url: '/faq' },
      { title: 'So funktioniert es', description: 'Eine Schritt-fuer-Schritt-Anleitung zum Durchsuchen und Verbinden.', url: '/guides/how-it-works' },
    ],
  },
};

// ---------------------------------------------------------------------------
// SAFETY
// ---------------------------------------------------------------------------
export const SAFETY_TRANSLATIONS: Record<Locale, PageData> = {
  fr: {
    metaTitle: 'Pinklights est-il sur ? Securite et confidentialite',
    metaDescription: 'Decouvrez comment Pinklights protege votre vie privee avec un stockage chiffre, la moderation des profils, la conformite RGPD et des outils de signalement.',
    title: 'Securite sur Pinklights',
    sections: [
      {
        heading: 'Securite de la plateforme',
        paragraphs: [
          'La securite n\'est pas une fonctionnalite secondaire chez Pinklights. C\'est un principe fondamental qui facon chaque aspect de la plateforme. Du stockage de vos donnees a la moderation des profils et au traitement des signalements, chaque decision est prise en pensant a votre securite et votre confidentialite.',
          'Nous utilisons une infrastructure de securite de niveau entreprise pour proteger vos donnees. Vos informations sont securisees avec un stockage chiffre, au repos et en transit. Nous appliquons des controles d\'acces stricts sur notre base de donnees, ce qui signifie que les utilisateurs ne peuvent acceder qu\'aux donnees qu\'ils sont autorises a voir.',
          'Notre systeme d\'authentification utilise des protocoles securises aux normes de l\'industrie. Les proprietaires de profils accedent a leurs comptes via des sessions authentifiees, et tous les points d\'acces de l\'API sont proteges contre les acces non autorises.',
        ],
      },
      {
        heading: 'Controles de confidentialite',
        paragraphs: [
          'La confidentialite sur Pinklights est controlee par l\'utilisateur. Les proprietaires de profils decident quelles informations apparaissent sur leur profil, des photos aux coordonnees. Les numeros WhatsApp ne sont affiches que sur les pages de profil individuelles, pas dans les resultats de recherche.',
          'Pour les visiteurs, la confidentialite est egalement protegee. Vous pouvez parcourir tous les profils sans creer de compte, ce qui signifie qu\'aucune donnee personnelle n\'est collectee aupres des visiteurs occasionnels. Si vous creez un compte en tant que proprietaire de profil, les informations de votre compte sont stockees en securite et jamais partagees avec d\'autres utilisateurs ou des tiers.',
        ],
      },
      {
        heading: 'Moderation et signalement',
        paragraphs: [
          'Chaque profil sur Pinklights passe par un processus de revision administrative avant de devenir publiquement visible. Notre equipe de moderation verifie les profils pour leur completude, leur contenu approprie et le respect des normes de la plateforme. Cette couche de revision aide a empecher les faux profils et le contenu trompeur d\'atteindre la plateforme.',
          'Si vous rencontrez un profil ou un comportement qui vous preoccupe, notre systeme de signalement facilite le marquage du probleme. Vous pouvez signaler un profil directement depuis sa page. Chaque signalement est examine par notre equipe de moderation. Nous ne divulguons pas a la partie signalee qui a depose le signalement.',
        ],
      },
      {
        heading: 'Conformite RGPD et contact',
        paragraphs: [
          'Pinklights est pleinement conforme au Reglement General sur la Protection des Donnees (RGPD). Vous disposez de droits clairs et applicables sur vos donnees personnelles : droit d\'acces, de rectification, de suppression, de portabilite et d\'opposition.',
          'Pour exercer l\'un de ces droits ou signaler toute preoccupation, contactez-nous via WhatsApp au +32 478 02 64 79 ou par email a support@pink-lights.be. Nous traitons toutes les demandes RGPD rapidement et sans frais. Pour les questions urgentes de securite, WhatsApp est le moyen le plus rapide de nous joindre.',
        ],
      },
    ],
    faqItems: [
      { question: 'Mes donnees personnelles sont-elles en securite sur Pinklights ?', answer: 'Oui. Nous utilisons un stockage chiffre et des controles d\'acces stricts. Vos donnees sont protegees au repos et en transit, et nous sommes pleinement conformes aux exigences du RGPD.' },
      { question: 'Puis-je supprimer mes donnees de Pinklights ?', answer: 'Absolument. En vertu du RGPD, vous avez le droit de demander l\'acces, l\'exportation ou la suppression de toutes vos donnees personnelles. Contactez-nous via WhatsApp ou email et nous traiterons votre demande rapidement.' },
      { question: 'Comment signaler un profil problematique ?', answer: 'Vous pouvez signaler tout profil directement depuis sa page. Notre equipe de moderation examine tous les signalements et prend les mesures appropriees, allant de l\'avertissement a la suppression du profil ou au bannissement permanent.' },
    ],
    relatedPages: [
      { title: 'Conseils de securite', description: 'Dix conseils pratiques pour rester en securite lors d\'une rencontre.', url: '/guides/safety-tips' },
      { title: 'FAQ', description: 'Questions frequemment posees sur l\'utilisation de Pinklights.', url: '/faq' },
      { title: 'A propos de Pinklights', description: 'Decouvrez notre mission, nos valeurs et notre equipe.', url: '/about' },
    ],
  },

  nl: {
    metaTitle: 'Is Pinklights veilig? Beveiliging en privacy',
    metaDescription: 'Ontdek hoe Pinklights uw privacy beschermt met versleutelde opslag, profielmoderatie, AVG-naleving en meldtools.',
    title: 'Veiligheid op Pinklights',
    sections: [
      {
        heading: 'Platformbeveiliging',
        paragraphs: [
          'Veiligheid is geen bijzaak bij Pinklights. Het is een fundamenteel principe dat elk aspect van het platform vormgeeft. Van hoe we uw gegevens opslaan tot hoe we profielen modereren en meldingen afhandelen, elke beslissing wordt genomen met uw beveiliging en privacy in gedachten.',
          'We gebruiken beveiligingsinfrastructuur op bedrijfsniveau om uw gegevens te beschermen. Uw informatie is beveiligd met versleutelde opslag, zowel in rust als tijdens overdracht. We hanteren strikte toegangscontroles op onze database, wat betekent dat gebruikers alleen toegang hebben tot gegevens die ze mogen zien.',
          'Ons authenticatiesysteem maakt gebruik van veilige, industriestandaard protocollen. Profieleigenaren hebben toegang tot hun accounts via geauthenticeerde sessies, en alle API-eindpunten zijn beschermd tegen ongeautoriseerde toegang.',
        ],
      },
      {
        heading: 'Privacycontroles',
        paragraphs: [
          'Privacy op Pinklights wordt door de gebruiker bepaald. Profieleigenaren beslissen welke informatie op hun profiel verschijnt, van foto\'s tot contactgegevens. WhatsApp-nummers worden alleen weergegeven op individuele profielpagina\'s, niet in zoekresultaten.',
          'Voor bezoekers is privacy eveneens beschermd. U kunt alle profielen bekijken zonder een account aan te maken, wat betekent dat er geen persoonlijke gegevens worden verzameld van gewone bezoekers. Als u wel een account aanmaakt als profieleigenaar, worden uw accountgegevens veilig opgeslagen en nooit gedeeld met andere gebruikers of derden.',
        ],
      },
      {
        heading: 'Moderatie en melden',
        paragraphs: [
          'Elk profiel op Pinklights doorloopt een administratief beoordelingsproces voordat het publiek zichtbaar wordt. Ons moderatieteam controleert profielen op volledigheid, gepaste inhoud en naleving van platformnormen. Deze beoordelingslaag helpt nepprofielen en misleidende informatie van het platform te weren.',
          'Als u een profiel of gedrag tegenkomt dat u zorgen baart, maakt ons meldsysteem het eenvoudig om het probleem te signaleren. U kunt een profiel rechtstreeks vanaf de profielpagina melden. Elke melding wordt beoordeeld door ons moderatieteam. We onthullen niet aan de gemelde partij wie de melding heeft ingediend.',
        ],
      },
      {
        heading: 'AVG-naleving en contact',
        paragraphs: [
          'Pinklights voldoet volledig aan de Algemene Verordening Gegevensbescherming (AVG). U heeft duidelijke, afdwingbare rechten over uw persoonlijke gegevens: recht op inzage, rectificatie, verwijdering, overdraagbaarheid en bezwaar.',
          'Om een van deze rechten uit te oefenen of een zorg te melden, neem contact met ons op via WhatsApp op +32 478 02 64 79 of per e-mail op support@pink-lights.be. We verwerken alle AVG-verzoeken snel en kosteloos. Voor dringende veiligheidskwesties is WhatsApp de snelste manier om ons te bereiken.',
        ],
      },
    ],
    faqItems: [
      { question: 'Zijn mijn persoonlijke gegevens veilig op Pinklights?', answer: 'Ja. We gebruiken versleutelde opslag en strikte toegangscontroles. Uw gegevens zijn beschermd in rust en tijdens overdracht, en we voldoen volledig aan de AVG-vereisten.' },
      { question: 'Kan ik mijn gegevens van Pinklights verwijderen?', answer: 'Absoluut. Onder de AVG heeft u het recht om toegang tot, export van of verwijdering van al uw persoonlijke gegevens te verzoeken. Neem contact met ons op via WhatsApp of e-mail en we verwerken uw verzoek snel.' },
      { question: 'Hoe meld ik een problematisch profiel?', answer: 'U kunt elk profiel rechtstreeks vanaf de profielpagina melden. Ons moderatieteam beoordeelt alle meldingen en neemt passende maatregelen, van waarschuwingen tot profielverwijdering of permanente verbanning.' },
    ],
    relatedPages: [
      { title: 'Veiligheidstips', description: 'Tien praktische tips om veilig te blijven bij een ontmoeting.', url: '/guides/safety-tips' },
      { title: 'FAQ', description: 'Veelgestelde vragen over het gebruik van Pinklights.', url: '/faq' },
      { title: 'Over Pinklights', description: 'Ontdek onze missie, waarden en team.', url: '/about' },
    ],
  },

  es: {
    metaTitle: 'Es seguro Pinklights? Seguridad y privacidad',
    metaDescription: 'Descubre como Pinklights protege tu privacidad con almacenamiento cifrado, moderacion de perfiles, cumplimiento del RGPD y herramientas de denuncia.',
    title: 'Seguridad en Pinklights',
    sections: [
      {
        heading: 'Seguridad de la plataforma',
        paragraphs: [
          'La seguridad no es un complemento en Pinklights. Es un principio fundamental que determina cada aspecto de la plataforma. Desde como almacenamos tus datos hasta como moderamos perfiles y gestionamos denuncias, cada decision se toma pensando en tu seguridad y privacidad.',
          'Utilizamos infraestructura de seguridad de nivel empresarial para proteger tus datos. Tu informacion esta asegurada con almacenamiento cifrado, tanto en reposo como en transito. Aplicamos controles de acceso estrictos en nuestra base de datos, lo que significa que los usuarios solo pueden acceder a los datos que estan autorizados a ver.',
          'Nuestro sistema de autenticacion utiliza protocolos seguros estandar de la industria. Los propietarios de perfiles acceden a sus cuentas a traves de sesiones autenticadas, y todos los endpoints de la API estan protegidos contra accesos no autorizados.',
        ],
      },
      {
        heading: 'Controles de privacidad',
        paragraphs: [
          'La privacidad en Pinklights esta controlada por el usuario. Los propietarios de perfiles deciden que informacion aparece en su perfil, desde fotos hasta datos de contacto. Los numeros de WhatsApp solo se muestran en las paginas individuales de perfil, no en los resultados de busqueda.',
          'Para los visitantes, la privacidad esta igualmente protegida. Puedes explorar todos los perfiles sin crear una cuenta, lo que significa que no se recopilan datos personales de visitantes casuales. Si creas una cuenta como propietario de perfil, la informacion de tu cuenta se almacena de forma segura y nunca se comparte con otros usuarios o terceros.',
        ],
      },
      {
        heading: 'Moderacion y denuncias',
        paragraphs: [
          'Cada perfil en Pinklights pasa por un proceso de revision administrativa antes de ser visible publicamente. Nuestro equipo de moderacion revisa los perfiles en cuanto a completitud, contenido apropiado y cumplimiento de las normas de la plataforma. Esta capa de revision ayuda a prevenir que perfiles falsos e informacion enganosa lleguen a la plataforma.',
          'Si encuentras un perfil o comportamiento que te preocupa, nuestro sistema de denuncias facilita marcar el problema. Puedes denunciar un perfil directamente desde su pagina. Cada denuncia es revisada por nuestro equipo de moderacion. No revelamos a la parte denunciada quien realizo la denuncia.',
        ],
      },
      {
        heading: 'Cumplimiento del RGPD y contacto',
        paragraphs: [
          'Pinklights cumple integramente con el Reglamento General de Proteccion de Datos (RGPD). Tienes derechos claros y exigibles sobre tus datos personales: derecho de acceso, rectificacion, supresion, portabilidad y oposicion.',
          'Para ejercer cualquiera de estos derechos o reportar cualquier preocupacion, contactanos por WhatsApp al +32 478 02 64 79 o por email a support@pink-lights.be. Procesamos todas las solicitudes RGPD de forma rapida y gratuita. Para asuntos urgentes de seguridad, WhatsApp es la via mas rapida para contactarnos.',
        ],
      },
    ],
    faqItems: [
      { question: 'Estan seguros mis datos personales en Pinklights?', answer: 'Si. Utilizamos almacenamiento cifrado y controles de acceso estrictos. Tus datos estan protegidos en reposo y en transito, y cumplimos integramente con los requisitos del RGPD.' },
      { question: 'Puedo eliminar mis datos de Pinklights?', answer: 'Por supuesto. Segun el RGPD, tienes derecho a solicitar el acceso, la exportacion o la eliminacion de todos tus datos personales. Contactanos por WhatsApp o email y procesaremos tu solicitud con prontitud.' },
      { question: 'Como denuncio un perfil problematico?', answer: 'Puedes denunciar cualquier perfil directamente desde su pagina. Nuestro equipo de moderacion revisa todas las denuncias y toma las medidas adecuadas, desde advertencias hasta eliminacion del perfil o prohibicion permanente.' },
    ],
    relatedPages: [
      { title: 'Consejos de seguridad', description: 'Diez consejos practicos para mantenerte seguro al conocer a alguien.', url: '/guides/safety-tips' },
      { title: 'FAQ', description: 'Preguntas frecuentes sobre el uso de Pinklights.', url: '/faq' },
      { title: 'Sobre Pinklights', description: 'Conoce nuestra mision, valores y equipo.', url: '/about' },
    ],
  },

  pt: {
    metaTitle: 'O Pinklights e seguro? Seguranca e privacidade',
    metaDescription: 'Descubra como o Pinklights protege a sua privacidade com armazenamento encriptado, moderacao de perfis, conformidade com o RGPD e ferramentas de denuncia.',
    title: 'Seguranca no Pinklights',
    sections: [
      {
        heading: 'Seguranca da plataforma',
        paragraphs: [
          'A seguranca nao e uma funcionalidade adicional no Pinklights. E um principio fundamental que molda cada aspeto da plataforma. Desde a forma como armazenamos os seus dados ate a moderacao de perfis e o tratamento de denuncias, cada decisao e tomada com a sua seguranca e privacidade em mente.',
          'Utilizamos infraestrutura de seguranca de nivel empresarial para proteger os seus dados. A sua informacao esta protegida com armazenamento encriptado, tanto em repouso como em transito. Implementamos controlos de acesso rigorosos na nossa base de dados, o que significa que os utilizadores so podem aceder aos dados que estao autorizados a ver.',
          'O nosso sistema de autenticacao utiliza protocolos seguros de padroes da industria. Os proprietarios de perfis acedem as suas contas atraves de sessoes autenticadas, e todos os endpoints da API estao protegidos contra acessos nao autorizados.',
        ],
      },
      {
        heading: 'Controlos de privacidade',
        paragraphs: [
          'A privacidade no Pinklights e controlada pelo utilizador. Os proprietarios de perfis decidem que informacao aparece no seu perfil, desde fotos a dados de contacto. Os numeros de WhatsApp so sao apresentados nas paginas individuais de perfil, nao nos resultados de pesquisa.',
          'Para os visitantes, a privacidade e igualmente protegida. Pode navegar por todos os perfis sem criar uma conta, o que significa que nao sao recolhidos dados pessoais de visitantes casuais. Se criar uma conta como proprietario de perfil, as informacoes da sua conta sao armazenadas de forma segura e nunca partilhadas com outros utilizadores ou terceiros.',
        ],
      },
      {
        heading: 'Moderacao e denuncias',
        paragraphs: [
          'Cada perfil no Pinklights passa por um processo de revisao administrativa antes de se tornar publicamente visivel. A nossa equipa de moderacao verifica os perfis quanto a completude, conteudo apropriado e conformidade com as normas da plataforma. Esta camada de revisao ajuda a impedir que perfis falsos e informacao enganosa cheguem a plataforma.',
          'Se encontrar um perfil ou comportamento que o preocupe, o nosso sistema de denuncias facilita a sinalizacao do problema. Pode denunciar um perfil diretamente a partir da sua pagina. Cada denuncia e analisada pela nossa equipa de moderacao. Nao revelamos a parte denunciada quem apresentou a denuncia.',
        ],
      },
      {
        heading: 'Conformidade com o RGPD e contacto',
        paragraphs: [
          'O Pinklights cumpre integralmente o Regulamento Geral sobre a Protecao de Dados (RGPD). Tem direitos claros e aplicaveis sobre os seus dados pessoais: direito de acesso, retificacao, apagamento, portabilidade e oposicao.',
          'Para exercer qualquer um destes direitos ou reportar qualquer preocupacao, contacte-nos via WhatsApp no +32 478 02 64 79 ou por email em support@pink-lights.be. Processamos todos os pedidos RGPD de forma rapida e gratuita. Para questoes urgentes de seguranca, o WhatsApp e a forma mais rapida de nos contactar.',
        ],
      },
    ],
    faqItems: [
      { question: 'Os meus dados pessoais estao seguros no Pinklights?', answer: 'Sim. Utilizamos armazenamento encriptado e controlos de acesso rigorosos. Os seus dados estao protegidos em repouso e em transito, e cumprimos integralmente os requisitos do RGPD.' },
      { question: 'Posso apagar os meus dados do Pinklights?', answer: 'Absolutamente. Ao abrigo do RGPD, tem o direito de solicitar o acesso, a exportacao ou o apagamento de todos os seus dados pessoais. Contacte-nos via WhatsApp ou email e processaremos o seu pedido com brevidade.' },
      { question: 'Como denuncio um perfil problematico?', answer: 'Pode denunciar qualquer perfil diretamente a partir da sua pagina. A nossa equipa de moderacao analisa todas as denuncias e toma as medidas adequadas, desde avisos ate a remocao do perfil ou proibicao permanente.' },
    ],
    relatedPages: [
      { title: 'Dicas de seguranca', description: 'Dez dicas praticas para se manter seguro ao conhecer alguem.', url: '/guides/safety-tips' },
      { title: 'FAQ', description: 'Perguntas frequentes sobre a utilizacao do Pinklights.', url: '/faq' },
      { title: 'Sobre o Pinklights', description: 'Conheca a nossa missao, valores e equipa.', url: '/about' },
    ],
  },

  ru: {
    metaTitle: 'Bezopasen li Pinklights? Bezopasnost\' i privatnost\'',
    metaDescription: 'Uznayte, kak Pinklights zashchishchayet vashu konfidentsial\'nost\' s pomoshch\'yu shifrovannogo khraneniya, moderatsii profiley i sootvetstviya GDPR.',
    title: 'Bezopasnost\' na Pinklights',
    sections: [
      {
        heading: 'Bezopasnost\' platformy',
        paragraphs: [
          'Bezopasnost\' - eto ne dopolnitel\'naya funktsiya Pinklights. Eto fundamental\'nyy printsip, kotoryy opredelyayet kazhdyy aspekt platformy. Ot togo, kak my khranim vashi dannyye, do togo, kak my moderiruem profili i obrabatyvayem zhaloby, kazhdoye resheniye prinimayetsya s uchyotom vashey bezopasnosti i konfidentsial\'nosti.',
          'My ispol\'zuyem infrastrukturu bezopasnosti korporativnogo urovnya dlya zashchity vashikh dannykh. Vasha informatsiya zashchishchena shifrovaannym khraneniyem, kak v sostoyanii pokoya, tak i pri peredache. My primenyayem strogiyer kontroli dostupa k nashey baze dannykh, chto oznachayet, chto pol\'zovateli mogut poluchit\' dostup tol\'ko k tem dannym, kotoryye im razresheno videt\'.',
          'Nasha sistema autentifikatsii ispol\'zuyet bezopasnyye, otraslevyye standarty protokolov. Vladelets profiley poluchayut dostup k svoim akkauntam cherez autentifitsirovannyye sessii, i vse konechnyye tochki API zashchishcheny ot nesanktsionirovannogo dostupa.',
        ],
      },
      {
        heading: 'Kontrol\' konfidentsial\'nosti',
        paragraphs: [
          'Konfidentsial\'nost\' na Pinklights kontroliruyetsya pol\'zovatelem. Vladelets profiley reshayut, kakaya informatsiya otobrazahyetsya v ikh profile, ot fotografiy do kontaktnykh dannykh. Nomera WhatsApp otobrazahyutsya tol\'ko na stranitiskakh otdel\'nykh profiley, a ne v resul\'tatakh poiska.',
          'Dlya posetiteley konfidentsial\'nost\' zashchishchena v ravnoy stepeni. Vy mozhete prosmatrivat\' vse profili bez sozdaniya akkaunta, chto oznachayet, chto u sluchaynykh posetiteley ne sobirayutsya personal\'nyye dannyye. Yesli vy sozdadite akkaunt kak vladelets profilya, informatsiya vashego akkaunta khraniitsya v bezopasnosti i nikogda ne peredayotsya drugim pol\'zovatelyam ili tret\'im litsam.',
        ],
      },
      {
        heading: 'Moderatsiya i zhaloby',
        paragraphs: [
          'Kazhdyy profil\' na Pinklights prokhodit protsess administrativnoy proverki prezhde chem stat\' publichno vidimym. Nasha komanda moderatsii proveryayet profili na polnotu, sootvetstviye soderzhhaniya i soblyudeniye standartov platformy. Etot uroven\' proverki pomogayet predotvratit\' poyavleniye poddelanykh profiley i vvodyashchey v zabluzhdeniye informatsii na platforme.',
          'Yesli vy stalkivayetes\' s profilem ili povedeniyem, kotoroye vas bespokoit, nasha sistema zhalob uprostit\' signalizatsiyu o probleme. Vy mozhete pozhalovat\'sya na profil\' pryamo s yego stranitsy. Kazhdaya zhaloba rassmatrivayetsya nashey komandoy moderatsii. My ne raskryvayem storone, na kotoruyu podana zhaloba, kto yee podal.',
        ],
      },
      {
        heading: 'Sootvetstviye GDPR i kontakty',
        paragraphs: [
          'Pinklights polnost\'yu sootvetstvuyet Obshchemu reglamentu po zashchite dannykh (GDPR). U vas yest\' chetke, obespechivayemyye prava na vashi personal\'nyye dannyye: pravo na dostup, ispravleniye, udaleniye, perenosimost\' i vozrazheniye.',
          'Chtoby vospol\'zovat\'sya lyubym iz etikh prav ili soobshchit\' o probleme, svyazhites\' s nami cherez WhatsApp po nomeru +32 478 02 64 79 ili po email support@pink-lights.be. My obrabatyvayem vse zaprosy po GDPR operativno i besplatno. Dlya srochnykh voprosov bezopasnosti WhatsApp - samyy bystryy sposob svyazat\'sya s nami.',
        ],
      },
    ],
    faqItems: [
      { question: 'V bezopasnosti li moi personal\'nyye dannyye na Pinklights?', answer: 'Da. My ispol\'zuyem shifrovannoe khraneniye i strogiye kontroli dostupa. Vashi dannyye zashchishcheny v sostoyanii pokoya i pri peredache, i my polnost\'yu sootvetstvuyem trebovaniyam GDPR.' },
      { question: 'Mogu li ya udalit\' svoi dannyye iz Pinklights?', answer: 'Bezuslovno. V sootvetstvii s GDPR vy imeyete pravo zaprosit\' dostup, eksport ili udaleniye vsekh vashikh personal\'nykh dannykh. Svyazhites\' s nami cherez WhatsApp ili email, i my operativno obrabotayem vash zapros.' },
      { question: 'Kak soobshchit\' o problemnom profile?', answer: 'Vy mozhete soobshchit\' o lyubom profile pryamo s yego stranitsy. Nasha komanda moderatsii rassmatrivayet vse zhaloby i prinimayet sootvetstvuyushchiye mery, ot preduprezhdeniy do udaleniya profilya ili permanentnogo bana.' },
    ],
    relatedPages: [
      { title: 'Sovety po bezopasnosti', description: 'Desyat\' prakticheskikh sovetov, kak ostavat\'sya v bezopasnosti pri vstreche.', url: '/guides/safety-tips' },
      { title: 'FAQ', description: 'Chasto zadavayemyye voprosy ob ispol\'zovanii Pinklights.', url: '/faq' },
      { title: 'O Pinklights', description: 'Uznayte o nashey missii, tsennostyakh i komande.', url: '/about' },
    ],
  },

  de: {
    metaTitle: 'Ist Pinklights sicher? Sicherheit und Datenschutz',
    metaDescription: 'Erfahren Sie, wie Pinklights Ihre Privatsphaere mit verschluesselter Speicherung, Profilmoderation, DSGVO-Konformitaet und Meldetools schuetzt.',
    title: 'Sicherheit auf Pinklights',
    sections: [
      {
        heading: 'Plattformsicherheit',
        paragraphs: [
          'Sicherheit ist kein Zusatzfeature bei Pinklights. Es ist ein grundlegendes Prinzip, das jeden Aspekt der Plattform praegt. Von der Speicherung Ihrer Daten ueber die Moderation von Profilen bis hin zur Bearbeitung von Meldungen wird jede Entscheidung mit Blick auf Ihre Sicherheit und Privatsphaere getroffen.',
          'Wir verwenden Sicherheitsinfrastruktur auf Unternehmensniveau zum Schutz Ihrer Daten. Ihre Informationen sind mit verschluesselter Speicherung gesichert, sowohl im Ruhezustand als auch bei der Uebertragung. Wir setzen strikte Zugriffskontrollen fuer unsere Datenbank ein, was bedeutet, dass Nutzer nur auf Daten zugreifen koennen, die sie sehen duerfen.',
          'Unser Authentifizierungssystem nutzt sichere, branchenuebliche Protokolle. Profilinhaber greifen ueber authentifizierte Sitzungen auf ihre Konten zu, und alle API-Endpunkte sind gegen unbefugten Zugriff geschuetzt.',
        ],
      },
      {
        heading: 'Datenschutzkontrollen',
        paragraphs: [
          'Datenschutz auf Pinklights wird vom Nutzer gesteuert. Profilinhaber entscheiden, welche Informationen in ihrem Profil erscheinen, von Fotos bis zu Kontaktdaten. WhatsApp-Nummern werden nur auf den einzelnen Profilseiten angezeigt, nicht in Suchergebnissen.',
          'Fuer Besucher ist der Datenschutz ebenso gewaehrleistet. Sie koennen alle Profile durchsuchen, ohne ein Konto zu erstellen, was bedeutet, dass von Gelegenheitsbesuchern keine persoenlichen Daten erhoben werden. Wenn Sie als Profilinhaber ein Konto erstellen, werden Ihre Kontoinformationen sicher gespeichert und niemals an andere Nutzer oder Dritte weitergegeben.',
        ],
      },
      {
        heading: 'Moderation und Meldungen',
        paragraphs: [
          'Jedes Profil auf Pinklights durchlaeuft einen administrativen Pruefprozess, bevor es oeffentlich sichtbar wird. Unser Moderationsteam prueft Profile auf Vollstaendigkeit, angemessenen Inhalt und Einhaltung der Plattformstandards. Diese Pruefebene hilft, Fake-Profile und irrefuehrende Informationen von der Plattform fernzuhalten.',
          'Wenn Sie auf ein Profil oder Verhalten stossen, das Ihnen Sorgen bereitet, erleichtert unser Meldesystem die Kennzeichnung des Problems. Sie koennen ein Profil direkt von dessen Seite melden. Jede Meldung wird von unserem Moderationsteam geprueft. Wir geben der gemeldeten Partei nicht preis, wer die Meldung eingereicht hat.',
        ],
      },
      {
        heading: 'DSGVO-Konformitaet und Kontakt',
        paragraphs: [
          'Pinklights entspricht vollstaendig der Datenschutz-Grundverordnung (DSGVO). Sie haben klare, durchsetzbare Rechte ueber Ihre personenbezogenen Daten: Recht auf Auskunft, Berichtigung, Loeschung, Datenportabilitaet und Widerspruch.',
          'Um eines dieser Rechte auszuueben oder ein Anliegen zu melden, kontaktieren Sie uns per WhatsApp unter +32 478 02 64 79 oder per E-Mail an support@pink-lights.be. Wir bearbeiten alle DSGVO-Anfragen zeitnah und kostenfrei. Bei dringenden Sicherheitsanliegen ist WhatsApp der schnellste Weg, uns zu erreichen.',
        ],
      },
    ],
    faqItems: [
      { question: 'Sind meine persoenlichen Daten auf Pinklights sicher?', answer: 'Ja. Wir verwenden verschluesselte Speicherung und strikte Zugriffskontrollen. Ihre Daten sind im Ruhezustand und bei der Uebertragung geschuetzt, und wir erfuellen vollstaendig die DSGVO-Anforderungen.' },
      { question: 'Kann ich meine Daten von Pinklights loeschen lassen?', answer: 'Selbstverstaendlich. Gemaess der DSGVO haben Sie das Recht, Zugang zu, Export von oder Loeschung aller Ihrer personenbezogenen Daten zu verlangen. Kontaktieren Sie uns per WhatsApp oder E-Mail und wir bearbeiten Ihre Anfrage umgehend.' },
      { question: 'Wie melde ich ein problematisches Profil?', answer: 'Sie koennen jedes Profil direkt von dessen Seite melden. Unser Moderationsteam prueft alle Meldungen und ergreift angemessene Massnahmen, von Verwarnungen ueber Profilentfernung bis hin zu permanenten Sperren.' },
    ],
    relatedPages: [
      { title: 'Sicherheitstipps', description: 'Zehn praktische Tipps fuer Ihre Sicherheit bei einem Treffen.', url: '/guides/safety-tips' },
      { title: 'FAQ', description: 'Haeufig gestellte Fragen zur Nutzung von Pinklights.', url: '/faq' },
      { title: 'Ueber Pinklights', description: 'Erfahren Sie mehr ueber unsere Mission, Werte und unser Team.', url: '/about' },
    ],
  },
};

// ---------------------------------------------------------------------------
// COMPARE HUB
// ---------------------------------------------------------------------------
export const COMPARE_HUB_TRANSLATIONS: Record<Locale, CompareHubData> = {
  fr: {
    metaTitle: 'Comparer les plateformes en Belgique',
    metaDescription: 'Comparez Pinklights avec les applications de rencontres, les petites annonces et d\'autres plateformes. Trouvez la bonne plateforme en Belgique.',
    title: 'Comparer les plateformes',
    intro: 'Choisir la bonne plateforme compte. Que vous envisagiez une application de rencontres, un site de petites annonces ou une plateforme dediee comme Pinklights, chaque option a ses forces et ses limites. Nos guides comparatifs exposent les differences avec honnetete pour que vous puissiez prendre une decision eclairee en fonction de ce qui compte le plus pour vous : securite, spontaneite, confidentialite ou portee.',
    comparisons: [
      { slug: 'pinklights-vs-dating-apps', title: 'Pinklights vs applications de rencontres', description: 'Contact WhatsApp direct et navigation libre face au matching algorithmique de Tinder, Bumble et similaires.' },
      { slug: 'pinklights-vs-classified-ads', title: 'Pinklights vs petites annonces', description: 'Profils curtes avec verification et controles de confidentialite face aux sites de petites annonces ouverts avec une moderation minimale.' },
      { slug: 'best-platforms-belgium', title: 'Meilleures plateformes Belgique 2026', description: 'Ce qu\'il faut rechercher dans une plateforme en Belgique : securite, verification, facilite de contact et confidentialite.' },
    ],
  },

  nl: {
    metaTitle: 'Platformen vergelijken in Belgie',
    metaDescription: 'Vergelijk Pinklights met dating-apps, advertentiesites en andere platformen. Vind het juiste platform in Belgie.',
    title: 'Platformen vergelijken',
    intro: 'Het juiste platform kiezen is belangrijk. Of u nu een dating-app, een advertentiesite of een gespecialiseerd platform zoals Pinklights overweegt, elke optie heeft zijn sterke punten en beperkingen. Onze vergelijkingsgidsen zetten de verschillen eerlijk uiteen, zodat u een weloverwogen keuze kunt maken op basis van wat voor u het belangrijkst is: veiligheid, directheid, privacy of bereik.',
    comparisons: [
      { slug: 'pinklights-vs-dating-apps', title: 'Pinklights vs dating-apps', description: 'Direct WhatsApp-contact en vrij browsen tegenover algoritmegestuurd matching bij Tinder, Bumble en soortgelijke apps.' },
      { slug: 'pinklights-vs-classified-ads', title: 'Pinklights vs advertentiesites', description: 'Gecureerde profielen met verificatie en privacycontroles tegenover open advertentiesites met minimale moderatie.' },
      { slug: 'best-platforms-belgium', title: 'Beste platformen Belgie 2026', description: 'Waar u op moet letten bij een platform in Belgie: veiligheid, verificatie, contactgemak en privacy.' },
    ],
  },

  es: {
    metaTitle: 'Comparar plataformas en Belgica',
    metaDescription: 'Compara Pinklights con apps de citas, clasificados y otras plataformas. Encuentra la plataforma adecuada en Belgica.',
    title: 'Comparar plataformas',
    intro: 'Elegir la plataforma adecuada importa. Ya sea que estes considerando una app de citas, un sitio de anuncios clasificados o una plataforma dedicada como Pinklights, cada opcion tiene sus fortalezas y limitaciones. Nuestras guias comparativas exponen las diferencias con honestidad para que puedas tomar una decision informada basada en lo que mas te importa: seguridad, inmediatez, privacidad o alcance.',
    comparisons: [
      { slug: 'pinklights-vs-dating-apps', title: 'Pinklights vs apps de citas', description: 'Contacto directo por WhatsApp y navegacion libre frente al matching algoritmico de Tinder, Bumble y similares.' },
      { slug: 'pinklights-vs-classified-ads', title: 'Pinklights vs anuncios clasificados', description: 'Perfiles curados con verificacion y controles de privacidad frente a sitios de clasificados abiertos con moderacion minima.' },
      { slug: 'best-platforms-belgium', title: 'Mejores plataformas Belgica 2026', description: 'Que buscar en una plataforma en Belgica: seguridad, verificacion, facilidad de contacto y privacidad.' },
    ],
  },

  pt: {
    metaTitle: 'Comparar plataformas na Belgica',
    metaDescription: 'Compare o Pinklights com apps de encontros, classificados e outras plataformas. Encontre a plataforma certa na Belgica.',
    title: 'Comparar plataformas',
    intro: 'Escolher a plataforma certa e importante. Quer esteja a considerar uma app de encontros, um site de classificados ou uma plataforma dedicada como o Pinklights, cada opcao tem os seus pontos fortes e limitacoes. Os nossos guias comparativos apresentam as diferencas com honestidade para que possa tomar uma decisao informada com base no que mais lhe importa: seguranca, imediatismo, privacidade ou alcance.',
    comparisons: [
      { slug: 'pinklights-vs-dating-apps', title: 'Pinklights vs apps de encontros', description: 'Contacto direto por WhatsApp e navegacao livre face ao matching algoritmico do Tinder, Bumble e similares.' },
      { slug: 'pinklights-vs-classified-ads', title: 'Pinklights vs classificados', description: 'Perfis curados com verificacao e controlos de privacidade face a sites de classificados abertos com moderacao minima.' },
      { slug: 'best-platforms-belgium', title: 'Melhores plataformas Belgica 2026', description: 'O que procurar numa plataforma na Belgica: seguranca, verificacao, facilidade de contacto e privacidade.' },
    ],
  },

  ru: {
    metaTitle: 'Sravneniye platform v Belgii',
    metaDescription: 'Sravnite Pinklights s prilozheniyami dlya znakomstv, saytami ob\'yavleniy i drugimi platformami. Naydite podkhodyashchuyu platformu v Belgii.',
    title: 'Sravneniye platform',
    intro: 'Vybor pravil\'noy platformy vazhen. Rassmatrivayete li vy prilozheniye dlya znakomstv, sayt ob\'yavleniy ili spetsializirovannuyu platformu, takuyu kak Pinklights, u kazhdogo varianta yest\' svoi sil\'nyye storony i ogranicheniya. Nashi sravnitel\'nyye rukovodstva chest\'no izlagayut razlichiya, chtoby vy mogli prinyat\' obosnovannoye resheniye na osnove togo, chto dlya vas vazhneye vsego: bezopasnost\', neposredstvennost\', konfidentsial\'nost\' ili okhvat.',
    comparisons: [
      { slug: 'pinklights-vs-dating-apps', title: 'Pinklights vs prilozheniya dlya znakomstv', description: 'Pryamoy kontakt cherez WhatsApp i svobodnyy prosmotr v sravnenii s algoritmicheskim matchingom Tinder, Bumble i podobnykh.' },
      { slug: 'pinklights-vs-classified-ads', title: 'Pinklights vs sayty ob\'yavleniy', description: 'Kurirovannyye profili s verifikatsiyey i nastroykamii konfidentsial\'nosti v sravnenii s otkrytymi saytami ob\'yavleniy s minimal\'noy moderatsiyey.' },
      { slug: 'best-platforms-belgium', title: 'Luchshiye platformy Belgiya 2026', description: 'Na chto obratit\' vnimaniye pri vybore platformy v Belgii: bezopasnost\', verifikatsiya, prostota kontakta i konfidentsial\'nost\'.' },
    ],
  },

  de: {
    metaTitle: 'Plattformen in Belgien vergleichen',
    metaDescription: 'Vergleichen Sie Pinklights mit Dating-Apps, Kleinanzeigen und anderen Plattformen. Finden Sie die richtige Plattform in Belgien.',
    title: 'Plattformen vergleichen',
    intro: 'Die richtige Plattform zu waehlen ist wichtig. Ob Sie eine Dating-App, eine Kleinanzeigen-Seite oder eine spezialisierte Plattform wie Pinklights in Betracht ziehen, jede Option hat ihre Staerken und Grenzen. Unsere Vergleichsleitfaeden legen die Unterschiede ehrlich dar, damit Sie eine fundierte Entscheidung treffen koennen, basierend auf dem, was Ihnen am wichtigsten ist: Sicherheit, Direktheit, Datenschutz oder Reichweite.',
    comparisons: [
      { slug: 'pinklights-vs-dating-apps', title: 'Pinklights vs Dating-Apps', description: 'Direkter WhatsApp-Kontakt und freies Browsen im Vergleich zu algorithmusgesteuertem Matching bei Tinder, Bumble und aehnlichen Apps.' },
      { slug: 'pinklights-vs-classified-ads', title: 'Pinklights vs Kleinanzeigen', description: 'Kuratierte Profile mit Verifizierung und Datenschutzkontrollen im Vergleich zu offenen Kleinanzeigen-Seiten mit minimaler Moderation.' },
      { slug: 'best-platforms-belgium', title: 'Beste Plattformen Belgien 2026', description: 'Worauf Sie bei einer Plattform in Belgien achten sollten: Sicherheit, Verifizierung, Kontaktfreundlichkeit und Datenschutz.' },
    ],
  },
};

// ---------------------------------------------------------------------------
// COMPARE PAGES (individual)
// ---------------------------------------------------------------------------
export const COMPARE_TRANSLATIONS: Record<Locale, Record<string, PageData>> = {
  fr: {
    'pinklights-vs-dating-apps': {
      metaTitle: 'Pinklights vs applis de rencontres - Comparaison',
      metaDescription: 'Comparez Pinklights avec des applis comme Tinder et Bumble. Contact WhatsApp direct face au matching algorithmique. Trouvez ce qui vous convient.',
      title: 'Pinklights vs applications de rencontres',
      sections: [
        {
          heading: 'Comment vous decouvrez les profils',
          paragraphs: [
            'Les applications de rencontres comme Tinder et Bumble utilisent un matching par algorithme. Vous creez un profil, definissez vos preferences et l\'application vous montre des profils un par un. Vous faites glisser a droite ou a gauche, et une conversation ne commence que lorsque les deux personnes expriment de l\'interet. L\'algorithme decide ce que vous voyez et quand.',
            'Pinklights fonctionne differemment. Il n\'y a pas d\'algorithme de matching ni de glissement. Vous parcourez tous les profils disponibles librement, filtrez par localisation et preferences, et consultez des profils detailles avec photos et descriptions. C\'est vous qui choisissez qui contacter. La plateforme ne prend pas cette decision a votre place.',
          ],
        },
        {
          heading: 'Comment vous etablissez le contact',
          paragraphs: [
            'Sur les applis de rencontres, la messagerie se fait dans l\'application elle-meme. Vous ne pouvez pas echanger de numeros de telephone tant que les deux parties n\'acceptent pas de le faire dans le chat. Certaines applis limitent le nombre de messages ou exigent un abonnement premium.',
            'Sur Pinklights, le contact se fait directement par WhatsApp. Quand vous trouvez un profil qui vous interesse, le numero WhatsApp est disponible sur la page du profil. Vous contactez directement la personne. Il n\'y a pas de messagerie integree, pas de credits a depenser, et pas d\'intermediaire. Le processus est plus rapide et plus personnel.',
          ],
        },
        {
          heading: 'Exigences de compte et qualite des profils',
          paragraphs: [
            'Les applis de rencontres exigent la creation d\'un compte avant de pouvoir voir un seul profil. Cela implique generalement de fournir un numero de telephone ou un email, de telecharger des photos et de remplir des details. Pinklights permet une navigation complete sans compte. Vous pouvez voir tous les profils actifs, utiliser les filtres de recherche et lire les details complets des profils avant de decider de contacter quelqu\'un.',
            'Les profils sur les applis de rencontres montrent des informations limitees, quelques photos et une courte bio. Les profils Pinklights sont concus pour etre complets : plusieurs photos, details physiques, bio ecrite, disponibilites et informations sur les services. Cela vous donne une image plus claire avant de prendre contact.',
          ],
        },
        {
          heading: 'Le verdict',
          paragraphs: [
            'Les applis de rencontres sont mieux adaptees si vous cherchez une relation amoureuse ou si le matching mutuel est important pour vous. Leur vaste base d\'utilisateurs signifie plus de correspondances potentielles dans n\'importe quelle zone. Pour les rencontres sociales ou l\'interet mutuel compte, elles restent un choix solide.',
            'Pinklights est concu pour les personnes qui veulent des connexions directes et sans detour. Pas d\'attente de match, pas d\'algorithme filtrant qui vous pouvez voir, pas de barriere de messagerie integree. Si vous valorisez la rapidite, la transparence et la spontaneite, Pinklights offre une approche fondamentalement differente.',
          ],
        },
      ],
      relatedPages: [
        { title: 'Pinklights vs petites annonces', description: 'Profils curtes face aux sites de petites annonces ouverts.', url: '/compare/pinklights-vs-classified-ads' },
        { title: 'Meilleures plateformes Belgique', description: 'Que rechercher dans une plateforme en Belgique.', url: '/compare/best-platforms-belgium' },
        { title: 'Comment ca marche', description: 'Guide etape par etape pour utiliser Pinklights.', url: '/guides/how-it-works' },
      ],
    },

    'pinklights-vs-classified-ads': {
      metaTitle: 'Pinklights vs petites annonces - Securite et qualite',
      metaDescription: 'Comparez Pinklights avec les sites de petites annonces. Profils curtes et verification face a la publication ouverte. Plus de securite et de qualite.',
      title: 'Pinklights vs sites de petites annonces',
      sections: [
        {
          heading: 'Qualite et curation des profils',
          paragraphs: [
            'Les sites de petites annonces permettent generalement a n\'importe qui de publier une annonce avec des exigences minimales. Les annonces sont souvent chargees de texte avec peu de photos, et il y a peu de standardisation. La qualite varie enormement : certaines sont detaillees et authentiques, d\'autres sont vagues, obsoletes ou trompeuses.',
            'Pinklights adopte une approche curatee. Chaque profil suit un format coherent avec plusieurs photos, des details physiques, une bio, des disponibilites et des informations sur les services. Les profils sont examines par notre equipe de moderation, et les profils inactifs ou problematiques sont supprimes.',
          ],
        },
        {
          heading: 'Verification et confiance',
          paragraphs: [
            'L\'une des plus grandes preoccupations avec les sites de petites annonces est le manque de verification. La plupart des plateformes ne verifient pas l\'identite des annonceurs, l\'exactitude des photos ou la legitimite de l\'annonce. Cela cree un environnement ou les arnaques et les faux profils sont des preoccupations courantes.',
            'Pinklights inclut un processus de revision administrative pour tous les profils. Notre equipe de moderation examine les soumissions, et les utilisateurs peuvent signaler les profils qui semblent problematiques. Bien qu\'aucune plateforme ne puisse garantir une authenticite complete, la couche de revision ajoute un niveau de confiance significatif.',
          ],
        },
        {
          heading: 'Securite et methode de contact',
          paragraphs: [
            'La securite est un facteur de differenciation majeur. Les sites de petites annonces fonctionnent generalement avec une moderation minimale. Les annonces sont publiees et restent en place sauf signalement. Les coordonnees dans les annonces classees sont parfois collectees par des robots ou utilisees pour du spam.',
            'Pinklights dispose de fonctionnalites de securite integrees incluant la moderation des profils, un systeme de signalement et la possibilite de bannir les utilisateurs qui enfreignent les normes. Pinklights utilise WhatsApp comme methode de contact principale. Les numeros WhatsApp sont affiches sur les pages de profil plutot que dans les resultats de recherche publics, ajoutant une couche de confidentialite.',
          ],
        },
        {
          heading: 'Le verdict',
          paragraphs: [
            'Les sites de petites annonces ont de vrais avantages. Ils offrent generalement la publication gratuite, ce qui signifie un plus grand nombre d\'annonces. Leur portee est souvent plus large car ils sont etablis depuis des annees. Si vous cherchez le volume maximum et que la variation de qualite ne vous derange pas, les sites de petites annonces offrent la selection la plus large.',
            'Pinklights privilegiie la qualite a la quantite. Des profils curtes, une moderation, des controles de confidentialite et une experience de recherche ciblee creent un environnement de navigation plus sur et plus fiable. Pour les utilisateurs qui valorisent la confiance, la coherence et une plateforme pensee specifiquement pour la Belgique, Pinklights offre une experience plus aboutie.',
          ],
        },
      ],
      relatedPages: [
        { title: 'Pinklights vs applis de rencontres', description: 'Contact direct face au matching algorithmique.', url: '/compare/pinklights-vs-dating-apps' },
        { title: 'Securite sur Pinklights', description: 'Comment nous protegens votre vie privee et votre securite.', url: '/safety' },
        { title: 'Meilleures plateformes Belgique', description: 'Que rechercher dans une plateforme en Belgique.', url: '/compare/best-platforms-belgium' },
      ],
    },

    'best-platforms-belgium': {
      metaTitle: 'Meilleures plateformes Belgique 2026 - Guide',
      metaDescription: 'Que rechercher dans une plateforme en Belgique. Comparez securite, verification, methodes de contact et confidentialite entre les differents types.',
      title: 'Meilleures plateformes en Belgique (2026)',
      sections: [
        {
          heading: 'Ce qu\'il faut rechercher dans une plateforme',
          paragraphs: [
            'Avant de comparer des plateformes specifiques, il est utile de savoir ce qui compte le plus. Les criteres suivants separent une plateforme fiable d\'une plateforme risquee : securite et moderation, verification des profils, facilite de contact, controles de confidentialite et focus sur la Belgique.',
            'Une plateforme qui se concentre sur la Belgique aura une meilleure couverture locale, comprendra les preferences linguistiques (neerlandais, francais, anglais) et s\'adaptera a la geographie specifique d\'un pays compact. La conformite RGPD est une exigence legale en Belgique, mais toutes les plateformes ne la respectent pas de la meme facon.',
          ],
        },
        {
          heading: 'Types de plateformes disponibles',
          paragraphs: [
            'Le marche belge comprend plusieurs categories distinctes. Les applications de rencontres classiques comme Tinder et Bumble offrent de larges bases d\'utilisateurs et un matching algorithmique, mais sont principalement concues pour les relations amoureuses. Les sites de petites annonces existent depuis des annees et offrent une large portee avec une publication gratuite ou peu couteuse, mais avec une verification minimale et une moderation limitee.',
            'Les plateformes dediees se concentrent specifiquement sur la mise en relation avec des accompagnantes. Elles offrent generalement une meilleure curation, des profils plus detailles et des fonctionnalites de recherche adaptees. Le compromis est generalement une base d\'utilisateurs plus petite, mais la qualite des profils et la pertinence des resultats sont significativement superieures.',
          ],
        },
        {
          heading: 'Ou se situe Pinklights',
          paragraphs: [
            'Pinklights est une plateforme dediee concue specifiquement pour la Belgique. Elle combine plusieurs fonctionnalites qui repondent aux problemes courants des autres types de plateformes : navigation sans compte, contact WhatsApp direct, profils curtes et examines par l\'equipe de moderation, recherche par localisation avec filtre de distance (jusqu\'a 50 km), et infrastructure securisee conforme au RGPD.',
            'La plateforme est concue pour le marche belge avec un support multilingue et une couverture des villes flamandes et wallonnes, d\'Anvers et Gand a Bruxelles, Liege et Namur.',
          ],
        },
        {
          heading: 'Faire votre choix',
          paragraphs: [
            'Il n\'existe pas de plateforme universellement "meilleure" ; tout depend de vos priorites. Si vous voulez le plus grand bassin possible de matchs romantiques, une application de rencontres classique peut etre le bon choix. Si vous voulez le volume maximum et la publication gratuite, les petites annonces ont leur place.',
            'Si vous valorisez des profils curtes, un contact direct, des fonctionnalites de securite et une plateforme concue specifiquement pour la Belgique, Pinklights est concu exactement pour cela. Le plus important est de choisir une plateforme ou vous vous sentez en securite et ou l\'experience correspond a vos attentes.',
          ],
        },
      ],
      relatedPages: [
        { title: 'Pinklights vs applis de rencontres', description: 'Contact direct face au matching algorithmique.', url: '/compare/pinklights-vs-dating-apps' },
        { title: 'Pinklights vs petites annonces', description: 'Profils curtes face aux sites de petites annonces ouverts.', url: '/compare/pinklights-vs-classified-ads' },
        { title: 'Securite sur Pinklights', description: 'Comment nous protegens votre vie privee et votre securite.', url: '/safety' },
      ],
    },
  },

  nl: {
    'pinklights-vs-dating-apps': {
      metaTitle: 'Pinklights vs dating-apps - Eerlijke vergelijking',
      metaDescription: 'Vergelijk Pinklights met dating-apps zoals Tinder en Bumble. Direct WhatsApp-contact vs algoritme-matching. Ontdek wat bij u past.',
      title: 'Pinklights vs dating-apps',
      sections: [
        {
          heading: 'Hoe u mensen ontdekt',
          paragraphs: [
            'Dating-apps zoals Tinder en Bumble gebruiken algoritmisch matching. U maakt een profiel aan, stelt voorkeuren in en de app toont u potentiele matches een voor een. U veegt naar rechts of links, en een gesprek begint pas als beide personen interesse tonen. Het algoritme bepaalt wat u ziet en wanneer.',
            'Pinklights werkt anders. Er is geen matching-algoritme en geen swipen. U bladert vrij door alle beschikbare profielen, filtert op locatie en voorkeuren, en bekijkt gedetailleerde profielen met foto\'s en beschrijvingen. U kiest zelf wie u contacteert. Het platform neemt die beslissing niet voor u.',
          ],
        },
        {
          heading: 'Hoe u contact legt',
          paragraphs: [
            'Op dating-apps verloopt berichten via de app zelf. U kunt geen telefoonnummers uitwisselen tot beide partijen ermee instemmen. Sommige apps beperken het aantal berichten of vereisen een premiumabonnement om te zien wie uw profiel leuk vindt.',
            'Op Pinklights verloopt contact direct via WhatsApp. Wanneer u een profiel vindt dat u interesseert, is het WhatsApp-nummer beschikbaar op de profielpagina. U neemt direct contact op. Geen in-app berichten, geen credits, geen tussenpersoon. Dit maakt het proces sneller en persoonlijker.',
          ],
        },
        {
          heading: 'Accountvereisten en profielkwaliteit',
          paragraphs: [
            'Dating-apps vereisen dat u een account aanmaakt voordat u profielen kunt zien. Dit omvat doorgaans het verstrekken van een telefoonnummer of e-mail, het uploaden van foto\'s en het invullen van profielgegevens. Pinklights maakt volledig browsen mogelijk zonder account. U kunt alle actieve profielen bekijken, zoekfilters gebruiken en volledige profieldetails lezen voordat u besluit contact op te nemen.',
            'Profielen op dating-apps tonen beperkte informatie, meestal een paar foto\'s en een korte bio. Pinklights-profielen zijn ontworpen om uitgebreid te zijn: meerdere foto\'s, fysieke details, een geschreven bio, beschikbaarheid en service-informatie. Dit geeft u een duidelijker beeld voordat u contact opneemt.',
          ],
        },
        {
          heading: 'Het oordeel',
          paragraphs: [
            'Dating-apps zijn beter geschikt als u op zoek bent naar een romantische relatie of als wederzijdse matching belangrijk voor u is. Hun grote gebruikersbasis betekent meer potentiele matches in elk gebied. Voor sociaal daten waarbij wederzijdse interesse telt, blijven ze een sterke keuze.',
            'Pinklights is ontworpen voor mensen die directe, no-nonsense connecties willen. Geen wachten op een match, geen algoritme dat filtert wie u kunt zien, geen in-app berichtenbarriere. Als u snelheid, transparantie en directheid waardeert, biedt Pinklights een fundamenteel andere aanpak.',
          ],
        },
      ],
      relatedPages: [
        { title: 'Pinklights vs advertentiesites', description: 'Gecureerde profielen tegenover open advertentiesites.', url: '/compare/pinklights-vs-classified-ads' },
        { title: 'Beste platformen Belgie', description: 'Waar u op moet letten bij een platform in Belgie.', url: '/compare/best-platforms-belgium' },
        { title: 'Hoe het werkt', description: 'Stapsgewijze gids voor het gebruik van Pinklights.', url: '/guides/how-it-works' },
      ],
    },

    'pinklights-vs-classified-ads': {
      metaTitle: 'Pinklights vs advertentiesites - Veiligheid',
      metaDescription: 'Vergelijk Pinklights met advertentiesites. Gecureerde profielen en verificatie vs open plaatsing. Meer veiligheid en kwaliteit.',
      title: 'Pinklights vs advertentiesites',
      sections: [
        {
          heading: 'Profielkwaliteit en curatie',
          paragraphs: [
            'Advertentiesites staan doorgaans toe dat iedereen een advertentie plaatst met minimale vereisten. Advertenties zijn vaak tekstzwaar met weinig foto\'s, en er is weinig standaardisatie. De kwaliteit varieert enorm: sommige zijn gedetailleerd en echt, andere zijn vaag, verouderd of misleidend.',
            'Pinklights hanteert een gecureerde aanpak. Elk profiel volgt een consistent formaat met meerdere foto\'s, fysieke details, een bio, beschikbaarheid en service-informatie. Profielen worden beoordeeld door ons moderatieteam, en inactieve of problematische profielen worden verwijderd.',
          ],
        },
        {
          heading: 'Verificatie en vertrouwen',
          paragraphs: [
            'Een van de grootste zorgen bij advertentiesites is het gebrek aan verificatie. De meeste platformen verifieren de identiteit van plaatsers niet, noch de nauwkeurigheid van foto\'s of de legitimiteit van de advertentie. Dit schept een omgeving waar oplichting en nepprofielen veelvoorkomende zorgen zijn.',
            'Pinklights bevat een administratief beoordelingsproces voor alle profielen. Ons moderatieteam beoordeelt inzendingen en gebruikers kunnen profielen melden die problematisch lijken. Hoewel geen enkel platform volledige authenticiteit kan garanderen, voegt de beoordelingslaag een betekenisvol vertrouwensniveau toe.',
          ],
        },
        {
          heading: 'Veiligheid en contactmethode',
          paragraphs: [
            'Veiligheid is een belangrijke onderscheidende factor. Advertentiesites werken over het algemeen met minimale moderatie. Advertenties worden geplaatst en blijven staan tenzij iemand ze meldt. Contactgegevens op advertentiesites worden soms verzameld door bots of gebruikt voor spam.',
            'Pinklights heeft ingebouwde veiligheidsfuncties waaronder profielmoderatie, een meldsysteem en de mogelijkheid om gebruikers te bannen. Pinklights gebruikt WhatsApp als primaire contactmethode. WhatsApp-nummers worden weergegeven op profielpagina\'s in plaats van in openbare zoekresultaten, wat een extra laag privacy toevoegt.',
          ],
        },
        {
          heading: 'Het oordeel',
          paragraphs: [
            'Advertentiesites hebben echte voordelen. Ze bieden doorgaans gratis plaatsing, wat een breder aanbod betekent. Hun bereik is vaak groter omdat ze al jarenlang bestaan. Als u maximaal volume zoekt en variatie in kwaliteit u niet stoort, bieden advertentiesites de breedste selectie.',
            'Pinklights geeft prioriteit aan kwaliteit boven kwantiteit. Gecureerde profielen, moderatie, privacycontroles en een gerichte zoekervaring creeren een veiligere en betrouwbaardere browseomgeving. Voor gebruikers die vertrouwen, consistentie en een platform specifiek ontworpen voor Belgie waarderen, biedt Pinklights een meer verfijnde ervaring.',
          ],
        },
      ],
      relatedPages: [
        { title: 'Pinklights vs dating-apps', description: 'Direct contact tegenover algoritmegestuurd matching.', url: '/compare/pinklights-vs-dating-apps' },
        { title: 'Veiligheid op Pinklights', description: 'Hoe we uw privacy en veiligheid beschermen.', url: '/safety' },
        { title: 'Beste platformen Belgie', description: 'Waar u op moet letten bij een platform in Belgie.', url: '/compare/best-platforms-belgium' },
      ],
    },

    'best-platforms-belgium': {
      metaTitle: 'Beste platformen Belgie 2026 - Gids',
      metaDescription: 'Waar u op moet letten bij een platform in Belgie. Vergelijk veiligheid, verificatie, contactmethoden en privacy tussen platformtypes.',
      title: 'Beste platformen in Belgie (2026)',
      sections: [
        {
          heading: 'Waar u op moet letten',
          paragraphs: [
            'Voordat u specifieke platformen vergelijkt, is het handig om te weten wat het belangrijkst is. De volgende criteria onderscheiden een betrouwbaar platform van een riskant platform: veiligheid en moderatie, verificatie van profielen, gemak van contact, privacycontroles en focus op Belgie.',
            'Een platform dat zich richt op Belgie heeft betere lokale dekking, begrijpt taalvoorkeuren (Nederlands, Frans, Engels) en is afgestemd op de specifieke geografie van een compact land. AVG-naleving is een wettelijke vereiste in Belgie, maar niet alle platformen voldoen er op dezelfde manier aan.',
          ],
        },
        {
          heading: 'Beschikbare platformtypes',
          paragraphs: [
            'De Belgische markt omvat verschillende categorieen. Reguliere dating-apps zoals Tinder en Bumble bieden grote gebruikersbestanden en algoritmisch matching, maar zijn voornamelijk ontworpen voor romantische relaties. Advertentiesites bestaan al jaren en bieden breed bereik met gratis of goedkoop plaatsen, maar met minimale verificatie en beperkte moderatie.',
            'Gespecialiseerde platformen richten zich specifiek op het leggen van contacten met metgezellen. Ze bieden doorgaans betere curatie, gedetailleerdere profielen en doelgerichte zoekfuncties. De afweging is meestal een kleinere gebruikersbasis, maar de kwaliteit van profielen en relevantie van zoekresultaten zijn aanzienlijk hoger.',
          ],
        },
        {
          heading: 'Waar Pinklights past',
          paragraphs: [
            'Pinklights is een gespecialiseerd platform dat specifiek is gebouwd voor Belgie. Het combineert functies die veelvoorkomende pijnpunten bij andere platformtypen aanpakken: browsen zonder account, direct WhatsApp-contact, gecureerde profielen beoordeeld door het moderatieteam, locatiegebaseerd zoeken met afstandsfilter (tot 50 km) en beveiligde infrastructuur die voldoet aan de AVG.',
            'Het platform is ontworpen voor de Belgische markt met meertalige ondersteuning en dekking van zowel Vlaamse als Waalse steden, van Antwerpen en Gent tot Brussel, Luik en Namen.',
          ],
        },
        {
          heading: 'Uw keuze maken',
          paragraphs: [
            'Er is geen enkel "best" platform; het hangt af van uw prioriteiten. Als u het grootst mogelijke aanbod aan romantische matches wilt, kan een reguliere dating-app de juiste keuze zijn. Als u maximaal volume en gratis plaatsing wilt, hebben advertentiesites hun plaats.',
            'Als u gecureerde profielen, direct contact, veiligheidsfuncties en een platform specifiek ontworpen voor Belgie waardeert, is Pinklights precies daarvoor gebouwd. Het belangrijkste is dat u een platform kiest waar u zich veilig voelt en waar de ervaring overeenkomt met uw verwachtingen.',
          ],
        },
      ],
      relatedPages: [
        { title: 'Pinklights vs dating-apps', description: 'Direct contact tegenover algoritmegestuurd matching.', url: '/compare/pinklights-vs-dating-apps' },
        { title: 'Pinklights vs advertentiesites', description: 'Gecureerde profielen tegenover open advertentiesites.', url: '/compare/pinklights-vs-classified-ads' },
        { title: 'Veiligheid op Pinklights', description: 'Hoe we uw privacy en veiligheid beschermen.', url: '/safety' },
      ],
    },
  },

  es: {
    'pinklights-vs-dating-apps': {
      metaTitle: 'Pinklights vs apps de citas - Comparacion honesta',
      metaDescription: 'Compara Pinklights con apps como Tinder y Bumble. Contacto directo por WhatsApp vs matching algoritmico. Descubre que te conviene.',
      title: 'Pinklights vs aplicaciones de citas',
      sections: [
        {
          heading: 'Como descubres perfiles',
          paragraphs: [
            'Las aplicaciones de citas como Tinder y Bumble utilizan matching algoritmico. Creas un perfil, estableces preferencias y la app te muestra perfiles uno a uno. Deslizas a la derecha o izquierda, y solo se inicia una conversacion cuando ambas personas muestran interes. El algoritmo decide lo que ves y cuando.',
            'Pinklights funciona de manera diferente. No hay algoritmo de matching ni deslizamiento. Navegas libremente por todos los perfiles disponibles, filtras por ubicacion y preferencias, y consultas perfiles detallados con fotos y descripciones. Tu eliges a quien contactar. La plataforma no toma esa decision por ti.',
          ],
        },
        {
          heading: 'Como estableces contacto',
          paragraphs: [
            'En las apps de citas, la mensajeria ocurre dentro de la propia aplicacion. No puedes intercambiar numeros de telefono hasta que ambas partes acepten hacerlo en el chat. Algunas apps limitan la cantidad de mensajes o requieren una suscripcion premium.',
            'En Pinklights, el contacto se realiza directamente por WhatsApp. Cuando encuentras un perfil que te interesa, el numero de WhatsApp esta disponible en la pagina del perfil. Te comunicas directamente. Sin mensajeria integrada, sin creditos para gastar y sin intermediarios. El proceso es mas rapido y personal.',
          ],
        },
        {
          heading: 'Requisitos de cuenta y calidad de perfiles',
          paragraphs: [
            'Las apps de citas requieren crear una cuenta antes de poder ver cualquier perfil. Esto suele implicar proporcionar un numero de telefono o email, subir fotos y completar datos del perfil. Pinklights permite la navegacion completa sin cuenta. Puedes ver todos los perfiles activos, usar filtros de busqueda y leer los detalles completos antes de decidir contactar a alguien.',
            'Los perfiles en apps de citas muestran informacion limitada, normalmente unas pocas fotos y una bio corta. Los perfiles de Pinklights estan disenados para ser completos: multiples fotos, detalles fisicos, bio escrita, disponibilidad e informacion de servicios. Esto te da una imagen mas clara antes de hacer contacto.',
          ],
        },
        {
          heading: 'El veredicto',
          paragraphs: [
            'Las apps de citas son mas adecuadas si buscas una relacion romantica o si el matching mutuo es importante para ti. Su amplia base de usuarios significa mas posibles coincidencias en cualquier zona. Para citas sociales donde el interes mutuo importa, siguen siendo una opcion solida.',
            'Pinklights esta disenado para personas que quieren conexiones directas y sin rodeos. Sin esperar un match, sin algoritmo filtrando a quien puedes ver, sin barreras de mensajeria integrada. Si valoras la rapidez, la transparencia y la inmediatez, Pinklights ofrece un enfoque fundamentalmente diferente.',
          ],
        },
      ],
      relatedPages: [
        { title: 'Pinklights vs clasificados', description: 'Perfiles curados frente a sitios de clasificados abiertos.', url: '/compare/pinklights-vs-classified-ads' },
        { title: 'Mejores plataformas Belgica', description: 'Que buscar en una plataforma en Belgica.', url: '/compare/best-platforms-belgium' },
        { title: 'Como funciona', description: 'Guia paso a paso para usar Pinklights.', url: '/guides/how-it-works' },
      ],
    },

    'pinklights-vs-classified-ads': {
      metaTitle: 'Pinklights vs clasificados - Seguridad y calidad',
      metaDescription: 'Compara Pinklights con sitios de clasificados. Perfiles curados y verificacion vs publicacion abierta. Mas seguridad y calidad.',
      title: 'Pinklights vs sitios de anuncios clasificados',
      sections: [
        {
          heading: 'Calidad y curacion de perfiles',
          paragraphs: [
            'Los sitios de clasificados suelen permitir que cualquiera publique un anuncio con requisitos minimos. Los anuncios suelen tener mucho texto con pocas fotos, y hay poca estandarizacion. La calidad varia enormemente: algunos son detallados y autenticos, mientras que otros son vagos, desactualizados o enganosos.',
            'Pinklights adopta un enfoque curado. Cada perfil sigue un formato coherente con multiples fotos, detalles fisicos, una bio, disponibilidad e informacion de servicios. Los perfiles son revisados por nuestro equipo de moderacion, y los perfiles inactivos o problematicos son eliminados.',
          ],
        },
        {
          heading: 'Verificacion y confianza',
          paragraphs: [
            'Una de las mayores preocupaciones con los sitios de clasificados es la falta de verificacion. La mayoria de las plataformas no verifican la identidad de los anunciantes, la exactitud de las fotos ni la legitimidad del anuncio. Esto crea un entorno donde las estafas y los perfiles falsos son preocupaciones habituales.',
            'Pinklights incluye un proceso de revision administrativa para todos los perfiles. Nuestro equipo de moderacion revisa las publicaciones, y los usuarios pueden reportar perfiles que parezcan problematicos. Aunque ninguna plataforma puede garantizar autenticidad completa, la capa de revision anade un nivel significativo de confianza.',
          ],
        },
        {
          heading: 'Seguridad y metodo de contacto',
          paragraphs: [
            'La seguridad es un diferenciador importante. Los sitios de clasificados generalmente operan con moderacion minima. Los anuncios se publican y permanecen a menos que alguien los reporte. La informacion de contacto en los clasificados a veces es recopilada por bots o utilizada para spam.',
            'Pinklights tiene funciones de seguridad integradas que incluyen moderacion de perfiles, un sistema de denuncias y la capacidad de prohibir usuarios que violen las normas. Pinklights usa WhatsApp como metodo principal de contacto. Los numeros de WhatsApp se muestran en las paginas de perfil en lugar de en los resultados de busqueda publicos, anadiendo una capa de privacidad.',
          ],
        },
        {
          heading: 'El veredicto',
          paragraphs: [
            'Los sitios de clasificados tienen ventajas genuinas. Suelen ofrecer publicacion gratuita, lo que significa un mayor numero de anuncios. Su alcance suele ser mayor porque llevan anos establecidos. Si buscas el maximo volumen y no te importa la variacion de calidad, los clasificados ofrecen la seleccion mas amplia.',
            'Pinklights prioriza la calidad sobre la cantidad. Perfiles curados, moderacion, controles de privacidad y una experiencia de busqueda enfocada crean un entorno de navegacion mas seguro y fiable. Para usuarios que valoran la confianza, la coherencia y una plataforma pensada especificamente para Belgica, Pinklights ofrece una experiencia mas refinada.',
          ],
        },
      ],
      relatedPages: [
        { title: 'Pinklights vs apps de citas', description: 'Contacto directo frente a matching algoritmico.', url: '/compare/pinklights-vs-dating-apps' },
        { title: 'Seguridad en Pinklights', description: 'Como protegemos tu privacidad y seguridad.', url: '/safety' },
        { title: 'Mejores plataformas Belgica', description: 'Que buscar en una plataforma en Belgica.', url: '/compare/best-platforms-belgium' },
      ],
    },

    'best-platforms-belgium': {
      metaTitle: 'Mejores plataformas Belgica 2026 - Guia',
      metaDescription: 'Que buscar en una plataforma en Belgica. Compara seguridad, verificacion, metodos de contacto y privacidad entre tipos de plataformas.',
      title: 'Mejores plataformas en Belgica (2026)',
      sections: [
        {
          heading: 'Que buscar en una plataforma',
          paragraphs: [
            'Antes de comparar plataformas especificas, conviene saber que es lo mas importante. Los siguientes criterios separan una plataforma fiable de una arriesgada: seguridad y moderacion, verificacion de perfiles, facilidad de contacto, controles de privacidad y enfoque en Belgica.',
            'Una plataforma centrada en Belgica tendra mejor cobertura local, comprendera las preferencias linguisticas (neerlandes, frances, ingles) y se adaptara a la geografia especifica de un pais compacto. El cumplimiento del RGPD es un requisito legal en Belgica, pero no todas las plataformas lo cumplen de igual manera.',
          ],
        },
        {
          heading: 'Tipos de plataformas disponibles',
          paragraphs: [
            'El mercado belga incluye varias categorias diferenciadas. Las aplicaciones de citas como Tinder y Bumble ofrecen grandes bases de usuarios y matching algoritmico, pero estan disenadas principalmente para relaciones romanticas. Los sitios de clasificados llevan anos y ofrecen amplio alcance con publicacion gratuita o de bajo coste, pero con verificacion minima y moderacion limitada.',
            'Las plataformas dedicadas se centran especificamente en facilitar conexiones con acompanantes. Suelen ofrecer mejor curacion, perfiles mas detallados y funciones de busqueda especificas. La contrapartida suele ser una base de usuarios mas reducida, pero la calidad de los perfiles y la relevancia de los resultados suelen ser significativamente superiores.',
          ],
        },
        {
          heading: 'Donde encaja Pinklights',
          paragraphs: [
            'Pinklights es una plataforma dedicada disenada especificamente para Belgica. Combina funcionalidades que abordan los problemas comunes de otros tipos de plataformas: navegacion sin cuenta, contacto directo por WhatsApp, perfiles curados y revisados por el equipo de moderacion, busqueda por ubicacion con filtro de distancia (hasta 50 km) e infraestructura segura conforme al RGPD.',
            'La plataforma esta disenada para el mercado belga con soporte multilingue y cobertura de ciudades flamencas y valonas, desde Amberes y Gante hasta Bruselas, Lieja y Namur.',
          ],
        },
        {
          heading: 'Tomar tu decision',
          paragraphs: [
            'No existe una plataforma universalmente "mejor"; depende de tus prioridades. Si quieres el mayor numero posible de coincidencias romanticas, una app de citas convencional puede ser la opcion adecuada. Si quieres maximo volumen y publicacion gratuita, los clasificados tienen su lugar.',
            'Si valoras perfiles curados, contacto directo, funciones de seguridad y una plataforma disenada especificamente para Belgica, Pinklights esta construido exactamente para eso. Lo mas importante es elegir una plataforma donde te sientas seguro y donde la experiencia coincida con tus expectativas.',
          ],
        },
      ],
      relatedPages: [
        { title: 'Pinklights vs apps de citas', description: 'Contacto directo frente a matching algoritmico.', url: '/compare/pinklights-vs-dating-apps' },
        { title: 'Pinklights vs clasificados', description: 'Perfiles curados frente a sitios de clasificados abiertos.', url: '/compare/pinklights-vs-classified-ads' },
        { title: 'Seguridad en Pinklights', description: 'Como protegemos tu privacidad y seguridad.', url: '/safety' },
      ],
    },
  },

  pt: {
    'pinklights-vs-dating-apps': {
      metaTitle: 'Pinklights vs apps de encontros - Comparacao',
      metaDescription: 'Compare o Pinklights com apps como o Tinder e Bumble. Contacto direto por WhatsApp vs matching algoritmico. Descubra o que lhe convem.',
      title: 'Pinklights vs aplicacoes de encontros',
      sections: [
        {
          heading: 'Como descobre perfis',
          paragraphs: [
            'Aplicacoes de encontros como o Tinder e o Bumble utilizam matching algoritmico. Cria um perfil, define preferencias e a app mostra-lhe perfis um a um. Desliza para a direita ou esquerda, e uma conversa so comeca quando ambas as pessoas mostram interesse. O algoritmo decide o que ve e quando.',
            'O Pinklights funciona de forma diferente. Nao ha algoritmo de matching nem deslizamento. Navega livremente por todos os perfis disponiveis, filtra por localizacao e preferencias, e consulta perfis detalhados com fotos e descricoes. E voce que escolhe quem contactar. A plataforma nao toma essa decisao por si.',
          ],
        },
        {
          heading: 'Como estabelece contacto',
          paragraphs: [
            'Nas apps de encontros, as mensagens ocorrem dentro da propria aplicacao. Nao pode trocar numeros de telefone ate que ambas as partes concordem em faze-lo no chat. Algumas apps limitam o numero de mensagens ou exigem uma subscricao premium.',
            'No Pinklights, o contacto acontece diretamente por WhatsApp. Quando encontra um perfil que lhe interessa, o numero de WhatsApp esta disponivel na pagina do perfil. Comunica diretamente. Sem mensagens na app, sem creditos para gastar e sem intermediarios. O processo e mais rapido e pessoal.',
          ],
        },
        {
          heading: 'Requisitos de conta e qualidade dos perfis',
          paragraphs: [
            'As apps de encontros exigem a criacao de uma conta antes de poder ver qualquer perfil. Isto envolve normalmente fornecer um numero de telefone ou email, carregar fotos e preencher dados do perfil. O Pinklights permite navegacao completa sem conta. Pode ver todos os perfis ativos, usar filtros de pesquisa e ler os detalhes completos dos perfis antes de decidir contactar alguem.',
            'Os perfis nas apps de encontros mostram informacao limitada, normalmente algumas fotos e uma bio curta. Os perfis do Pinklights sao concebidos para serem completos: multiplas fotos, detalhes fisicos, bio escrita, disponibilidade e informacao de servicos. Isto da-lhe uma imagem mais clara antes de estabelecer contacto.',
          ],
        },
        {
          heading: 'O veredicto',
          paragraphs: [
            'As apps de encontros sao mais adequadas se procura uma relacao romantica ou se o matching mutuo e importante para si. A sua ampla base de utilizadores significa mais correspondencias potenciais em qualquer area. Para encontros sociais onde o interesse mutuo conta, continuam a ser uma escolha solida.',
            'O Pinklights e concebido para pessoas que querem conexoes diretas e sem rodeios. Sem esperar por um match, sem algoritmo a filtrar quem pode ver, sem barreiras de mensagens na app. Se valoriza rapidez, transparencia e imediatismo, o Pinklights oferece uma abordagem fundamentalmente diferente.',
          ],
        },
      ],
      relatedPages: [
        { title: 'Pinklights vs classificados', description: 'Perfis curados face a sites de classificados abertos.', url: '/compare/pinklights-vs-classified-ads' },
        { title: 'Melhores plataformas Belgica', description: 'O que procurar numa plataforma na Belgica.', url: '/compare/best-platforms-belgium' },
        { title: 'Como funciona', description: 'Guia passo a passo para usar o Pinklights.', url: '/guides/how-it-works' },
      ],
    },

    'pinklights-vs-classified-ads': {
      metaTitle: 'Pinklights vs classificados - Seguranca e qualidade',
      metaDescription: 'Compare o Pinklights com sites de classificados. Perfis curados e verificacao vs publicacao aberta. Mais seguranca e qualidade.',
      title: 'Pinklights vs sites de classificados',
      sections: [
        {
          heading: 'Qualidade e curacao de perfis',
          paragraphs: [
            'Os sites de classificados normalmente permitem que qualquer pessoa publique um anuncio com requisitos minimos. Os anuncios sao frequentemente carregados de texto com poucas fotos, e ha pouca padronizacao. A qualidade varia enormemente: alguns sao detalhados e genuinos, enquanto outros sao vagos, desatualizados ou enganosos.',
            'O Pinklights adota uma abordagem curada. Cada perfil segue um formato consistente com multiplas fotos, detalhes fisicos, uma bio, disponibilidade e informacao de servicos. Os perfis sao revistos pela nossa equipa de moderacao, e perfis inativos ou problematicos sao removidos.',
          ],
        },
        {
          heading: 'Verificacao e confianca',
          paragraphs: [
            'Uma das maiores preocupacoes com sites de classificados e a falta de verificacao. A maioria das plataformas nao verifica a identidade dos anunciantes, a precisao das fotos nem a legitimidade do anuncio. Isto cria um ambiente onde burlas e perfis falsos sao preocupacoes comuns.',
            'O Pinklights inclui um processo de revisao administrativa para todos os perfis. A nossa equipa de moderacao revisa as submissoes, e os utilizadores podem denunciar perfis que parecam problematicos. Embora nenhuma plataforma possa garantir autenticidade completa, a camada de revisao acrescenta um nivel significativo de confianca.',
          ],
        },
        {
          heading: 'Seguranca e metodo de contacto',
          paragraphs: [
            'A seguranca e um diferenciador significativo. Os sites de classificados geralmente operam com moderacao minima. Os anuncios sao publicados e permanecem a menos que alguem os denuncie. A informacao de contacto nos classificados e por vezes recolhida por bots ou usada para spam.',
            'O Pinklights tem funcionalidades de seguranca integradas que incluem moderacao de perfis, um sistema de denuncias e a capacidade de banir utilizadores que violem as normas. O Pinklights usa WhatsApp como metodo principal de contacto. Os numeros de WhatsApp sao apresentados nas paginas de perfil em vez dos resultados de pesquisa publicos, acrescentando uma camada de privacidade.',
          ],
        },
        {
          heading: 'O veredicto',
          paragraphs: [
            'Os sites de classificados tem vantagens genuinas. Normalmente oferecem publicacao gratuita, o que significa um maior numero de anuncios. O seu alcance e frequentemente maior porque estao estabelecidos ha anos. Se procura o maximo volume e nao se importa com a variacao de qualidade, os classificados oferecem a selecao mais ampla.',
            'O Pinklights prioriza a qualidade em detrimento da quantidade. Perfis curados, moderacao, controlos de privacidade e uma experiencia de pesquisa focada criam um ambiente de navegacao mais seguro e fiavel. Para utilizadores que valorizam confianca, consistencia e uma plataforma pensada especificamente para a Belgica, o Pinklights oferece uma experiencia mais refinada.',
          ],
        },
      ],
      relatedPages: [
        { title: 'Pinklights vs apps de encontros', description: 'Contacto direto face ao matching algoritmico.', url: '/compare/pinklights-vs-dating-apps' },
        { title: 'Seguranca no Pinklights', description: 'Como protegemos a sua privacidade e seguranca.', url: '/safety' },
        { title: 'Melhores plataformas Belgica', description: 'O que procurar numa plataforma na Belgica.', url: '/compare/best-platforms-belgium' },
      ],
    },

    'best-platforms-belgium': {
      metaTitle: 'Melhores plataformas Belgica 2026 - Guia',
      metaDescription: 'O que procurar numa plataforma na Belgica. Compare seguranca, verificacao, metodos de contacto e privacidade entre tipos de plataformas.',
      title: 'Melhores plataformas na Belgica (2026)',
      sections: [
        {
          heading: 'O que procurar numa plataforma',
          paragraphs: [
            'Antes de comparar plataformas especificas, e util saber o que mais importa. Os seguintes criterios separam uma plataforma fiavel de uma arriscada: seguranca e moderacao, verificacao de perfis, facilidade de contacto, controlos de privacidade e foco na Belgica.',
            'Uma plataforma focada na Belgica tera melhor cobertura local, compreendera as preferencias linguisticas (neerlandes, frances, ingles) e sera adaptada a geografia especifica de um pais compacto. A conformidade com o RGPD e um requisito legal na Belgica, mas nem todas as plataformas o cumprem da mesma forma.',
          ],
        },
        {
          heading: 'Tipos de plataformas disponiveis',
          paragraphs: [
            'O mercado belga inclui varias categorias distintas. As apps de encontros como o Tinder e o Bumble oferecem grandes bases de utilizadores e matching algoritmico, mas sao concebidas principalmente para relacoes romanticas. Os sites de classificados existem ha anos e oferecem amplo alcance com publicacao gratuita ou de baixo custo, mas com verificacao minima e moderacao limitada.',
            'As plataformas dedicadas focam-se especificamente em facilitar conexoes com acompanhantes. Normalmente oferecem melhor curacao, perfis mais detalhados e funcionalidades de pesquisa especificas. A contrapartida e geralmente uma base de utilizadores mais reduzida, mas a qualidade dos perfis e a relevancia dos resultados sao significativamente superiores.',
          ],
        },
        {
          heading: 'Onde o Pinklights se encaixa',
          paragraphs: [
            'O Pinklights e uma plataforma dedicada concebida especificamente para a Belgica. Combina funcionalidades que abordam os problemas comuns de outros tipos de plataformas: navegacao sem conta, contacto direto por WhatsApp, perfis curados e revistos pela equipa de moderacao, pesquisa por localizacao com filtro de distancia (ate 50 km) e infraestrutura segura em conformidade com o RGPD.',
            'A plataforma e concebida para o mercado belga com suporte multilingue e cobertura de cidades flamengas e valonas, de Antuérpia e Gante a Bruxelas, Liege e Namur.',
          ],
        },
        {
          heading: 'Fazer a sua escolha',
          paragraphs: [
            'Nao existe uma plataforma universalmente "melhor"; depende das suas prioridades. Se quer o maior numero possivel de correspondencias romanticas, uma app de encontros convencional pode ser a escolha certa. Se quer maximo volume e publicacao gratuita, os classificados tem o seu lugar.',
            'Se valoriza perfis curados, contacto direto, funcionalidades de seguranca e uma plataforma concebida especificamente para a Belgica, o Pinklights foi construido exatamente para isso. O mais importante e escolher uma plataforma onde se sinta seguro e onde a experiencia corresponda as suas expectativas.',
          ],
        },
      ],
      relatedPages: [
        { title: 'Pinklights vs apps de encontros', description: 'Contacto direto face ao matching algoritmico.', url: '/compare/pinklights-vs-dating-apps' },
        { title: 'Pinklights vs classificados', description: 'Perfis curados face a sites de classificados abertos.', url: '/compare/pinklights-vs-classified-ads' },
        { title: 'Seguranca no Pinklights', description: 'Como protegemos a sua privacidade e seguranca.', url: '/safety' },
      ],
    },
  },

  ru: {
    'pinklights-vs-dating-apps': {
      metaTitle: 'Pinklights vs prilozheniya dlya znakomstv',
      metaDescription: 'Sravnite Pinklights s Tinder i Bumble. Pryamoy kontakt cherez WhatsApp vs algoritmicheskiy matching. Uznayte, chto vam podkhodit.',
      title: 'Pinklights vs prilozheniya dlya znakomstv',
      sections: [
        {
          heading: 'Kak vy nakhodite lyudey',
          paragraphs: [
            'Prilozheniya dlya znakomstv, takiye kak Tinder i Bumble, ispol\'zuyut algoritmicheskiy matching. Vy sozdayote profil\', ustanavlivayete predpochteniya, i prilozheniye pokazyvayet vam potentsial\'nyye sovpadeniya po odnomu. Vy prolistyvayete vpravo ili vlevo, i razgovor nachinayet\'sya tol\'ko kogda oba cheloveka proyavlyayut interes. Algoritm reshayet, chto vy vidite i kogda.',
            'Pinklights rabotayet inache. Zdes\' net algoritma matchinga i prolistyvaniya. Vy svobodno prosmatrivayete vse dostupnyye profili, fil\'truyete po mestopolozheniyu i predpochteniyam, i izuchayete podrobnyye profili s fotografiyami i opisaniyami. Vy sami vybirayete, s kem svyazat\'sya. Platforma ne prinimayet eto resheniye za vas.',
          ],
        },
        {
          heading: 'Kak vy ustanavlivayete kontakt',
          paragraphs: [
            'V prilozheniyakh dlya znakomstv obmen soobshcheniyami proiskhodit vnutri samogo prilozheniya. Vy ne mozhete obmenyat\'sya nomerami telefonov, poka obe storony ne soglasyatsya sdelat\' eto v chate. Nekotoryye prilozheniya ogranichivayut kolichestvo soobshcheniy ili trebuyut premium-podpisku.',
            'Na Pinklights kontakt proiskhodit napryamuyu cherez WhatsApp. Kogda vy nakhodite profil\', kotoryy vas interesuyet, nomer WhatsApp dostupen na stranitse profilya. Vy svyazhetes\' napryamuyu. Nikakikh soobshcheniy v prilozhenii, nikakikh kreditov i nikakikh posrednikov. Protsess bystree i lichnee.',
          ],
        },
        {
          heading: 'Trebovaniya k akkauntu i kachestvo profiley',
          paragraphs: [
            'Prilozheniya dlya znakomstv trebuyut sozdaniya akkaunta prezhde chem vy smozhete uvidet\' khotyaby odin profil\'. Obychno eto vklyuchayet predostavleniye nomera telefona ili email, zagruzku fotografiy i zapolneniye dannykh profilya. Pinklights pozvolyayet polnost\'yu prosmatrivat\' profili bez akkaunta. Vy mozhete videt\' vse aktivnyye profili, ispol\'zovat\' fil\'try poiska i chitat\' polnyye dannye profiley pered tem, kak reshite svyazat\'sya.',
            'Profili v prilozheniyakh dlya znakomstv pokazyvayut ogranichennuyu informatsiyu, obychno neskol\'ko fotografiy i korotkuyu biografiyu. Profili Pinklights razrabotany kak podrobnyye: neskol\'ko fotografiy, fizicheskiye dannyye, pis\'mennaya biografiya, dostupnost\' i informatsiya ob uslugakh. Eto dayet vam boleye chetkoye predstavleniye pered tem, kak svyazat\'sya.',
          ],
        },
        {
          heading: 'Vyvod',
          paragraphs: [
            'Prilozheniya dlya znakomstv luchshe podkhodyat, yesli vy ishchete romanticheskiye otnosheniya ili yesli vzaimnyy matching vazhen dlya vas. Ikh bol\'shaya baza pol\'zovateley oznachayet bol\'she potentsial\'nykh sovpadeniy v lyuboy zone. Dlya sotsial\'nykh znakomstv, gde vazhno vzaimnoye interes, oni ostayutsya sil\'nym vyborom.',
            'Pinklights sozdan dlya lyudey, kotoryye khotyat pryamykh svyazey bez lishney suety. Bez ozhidaniya matcha, bez algoritma, fil\'truyushchego, kogo vy mozhete videt\', bez bar\'yerov soobshcheniy v prilozhenii. Yesli vy tsenite skorost\', prozrachnost\' i neposredstvennost\', Pinklights predlagayet printsipial\'no drugoy podkhod.',
          ],
        },
      ],
      relatedPages: [
        { title: 'Pinklights vs sayty ob\'yavleniy', description: 'Kurirovannyye profili v sravnenii s otkrytymi saytami ob\'yavleniy.', url: '/compare/pinklights-vs-classified-ads' },
        { title: 'Luchshiye platformy Belgiya', description: 'Na chto obratit\' vnimaniye pri vybore platformy v Belgii.', url: '/compare/best-platforms-belgium' },
        { title: 'Kak eto rabotayet', description: 'Poshagovoye rukovodstvo po ispol\'zovaniyu Pinklights.', url: '/guides/how-it-works' },
      ],
    },

    'pinklights-vs-classified-ads': {
      metaTitle: 'Pinklights vs sayty ob\'yavleniy - Bezopasnost\'',
      metaDescription: 'Sravnite Pinklights s saytami ob\'yavleniy. Kurirovannyye profili i verifikatsiya vs otkrytaya publikatsiya. Bol\'she bezopasnosti i kachestva.',
      title: 'Pinklights vs sayty ob\'yavleniy',
      sections: [
        {
          heading: 'Kachestvo i kurirovaniye profiley',
          paragraphs: [
            'Sayty ob\'yavleniy obychno pozvolyayut komu ugodno razmiestit\' ob\'yavleniye s minimal\'nymi trebovaniyami. Ob\'yavleniya chasto soderzhat mnogo teksta s nemnogimi fotografiyami, i pochti net standartizatsii. Kachestvo sil\'no var\'iruyetsya: nekotoryye podrobnyye i podlinnyye, drugiye rasplyvchatyye, ustarevshiye ili vvodyashchiye v zabluzhdeniye.',
            'Pinklights ispol\'zuyet kurirovannyy podkhod. Kazhdyy profil\' sootvetstvuyet yedinomu formatu s neskol\'kimi fotografiyami, fizicheskimi dannymi, biografiyey, dostupnost\'yu i informatsiyey ob uslugakh. Profili proveryayutsya nashey komandoy moderatsii, a neaktivnyye ili problemnyye profili udalyayutsya.',
          ],
        },
        {
          heading: 'Verifikatsiya i doveriye',
          paragraphs: [
            'Odna iz naibol\'shikh problem s saytami ob\'yavleniy - otsutstviye verifikatsii. Bol\'shinstvo platform ne proveryayut lichnost\' reklamo-dateley, tochnost\' fotografiy ili zakonnost\' ob\'yavleniya. Eto sozdayot sredu, gde moshennichestvo i poddelannyye profili yavlyayutsya rasprostranennymi problemami.',
            'Pinklights vklyuchayet protsess administrativnoy proverki dlya vsekh profiley. Nasha komanda moderatsii rassmatrivayet podannyye profili, a pol\'zovateli mogut soobshchat\' o profiilyakh, kotoryye kazhutsa problemnymi. Khotya ni odna platforma ne mozhet garantirovat\' polnuyu podlinnost\', uroven\' proverki dobavlyayet znachimyy uroven\' doveriya.',
          ],
        },
        {
          heading: 'Bezopasnost\' i sposob svyazi',
          paragraphs: [
            'Bezopasnost\' yavlyaet\'sya sushchestvennym otlichiyem. Sayty ob\'yavleniy obychno rabotayut s minimal\'noy moderatsiyey. Ob\'yavleniya publikuyutsya i ostayutsya, yesli nikto ne soobshchit o nikh. Kontaktnyye dannyye na saytakh ob\'yavleniy inogda sobirayutsya botami ili ispol\'zuyutsya dlya spama.',
            'Pinklights imyet vstroyennyye funktsii bezopasnosti, vklyuchaya moderatsiyu profiley, sistemu zhalob i vozmozhnost\' banit\' pol\'zovateley, narushayushchikh standarty. Pinklights ispol\'zuyet WhatsApp kak osnovnoy sposob svyazi. Nomera WhatsApp otobrazahyutsya na stranitsakh profiley, a ne v publichnykh resul\'tatakh poiska, chto dobavlyayet dopolnitel\'nyy uroven\' konfidentsial\'nosti.',
          ],
        },
        {
          heading: 'Vyvod',
          paragraphs: [
            'Sayty ob\'yavleniy imeyut real\'nyye preimushchestva. Oni obychno predlagayut besplatnuyu publikatsiyu, chto oznachayet boleye shirokit vybor. Ikh okhvat chasto bol\'she, potomu chto oni sushchestvuyut mnogo let. Yesli vy ishchete maksimal\'nyy ob\'yem i varyatsiya kachestva vas ne bespokoit, sayty ob\'yavleniy predlagayut samyy shirokit vybor.',
            'Pinklights otdayet prioritet kachestvu nad kolichestvom. Kurirovannyye profili, moderatsiya, nastroyki konfidentsial\'nosti i tselevoy poisk sozdayut boleye bezopasnoye i nadyozhnoye okruzheniye dlya prosmotra. Dlya pol\'zovateley, kotoryye tsenyat doveriye, posledovatel\'nost\' i platformu, spetsial\'no razrabotannuyu dlya Belgii, Pinklights predlagayet boleye utonchonnyy opyt.',
          ],
        },
      ],
      relatedPages: [
        { title: 'Pinklights vs prilozheniya dlya znakomstv', description: 'Pryamoy kontakt v sravnenii s algoritmicheskim matchingom.', url: '/compare/pinklights-vs-dating-apps' },
        { title: 'Bezopasnost\' na Pinklights', description: 'Kak my zashchishchayem vashu konfidentsial\'nost\' i bezopasnost\'.', url: '/safety' },
        { title: 'Luchshiye platformy Belgiya', description: 'Na chto obratit\' vnimaniye pri vybore platformy v Belgii.', url: '/compare/best-platforms-belgium' },
      ],
    },

    'best-platforms-belgium': {
      metaTitle: 'Luchshiye platformy Belgiya 2026 - Rukovodstvo',
      metaDescription: 'Na chto obratit\' vnimaniye pri vybore platformy v Belgii. Sravnite bezopasnost\', verifikatsiyu, sposoby svyazi i konfidentsial\'nost\'.',
      title: 'Luchshiye platformy v Belgii (2026)',
      sections: [
        {
          heading: 'Na chto obratit\' vnimaniye',
          paragraphs: [
            'Prezhde chem sravnivat\' konkretnyye platformy, polezno znat\', chto vazhneye vsego. Sleduyushchiye kriterii otdelyayut nadyozhnuyu platformu ot riskovannoy: bezopasnost\' i moderatsiya, verifikatsiya profiley, prostota kontakta, nastroyki konfidentsial\'nosti i fokus na Belgii.',
            'Platforma, orientirovannaya na Belgiyu, budet imet\' luchshiy mestnyy okhvat, ponimat\' yazykovyye predpochteniya (niderlandskiy, frantsuzskiy, angliyskiy) i adaptirovana k spetsificheskoy geografii kompaktnoy strany. Sootvetstviye GDPR yavlyayet\'sya zakonnym trebovaniyem v Belgii, no ne vse platformy soblyudayut yego odinakovo.',
          ],
        },
        {
          heading: 'Tipy dostupnykh platform',
          paragraphs: [
            'Bel\'giyskiy rynok vklyuchayet neskol\'ko razlichnykh kategoriy. Obychnyye prilozheniya dlya znakomstv, takiye kak Tinder i Bumble, predlagayut bol\'shiye bazy pol\'zovateley i algoritmicheskiy matching, no prednaznacheny v osnovnom dlya romanticheskikh otnosheniy. Sayty ob\'yavleniy sushchestvuyut mnogo let i predlagayut shirokit okhvat s besplatnoy ili nedorogoy publikatsiyey, no s minimal\'noy verifikatsiyey i ogranichennoy moderatsiyey.',
            'Spetsializirovannyye platformy sosredotocheny imenno na sozdanii svyazey s kompan\'onami. Oni obychno predlagayut luchshuyu kuratsiyu, boleye podrobnyye profili i spetsializirovannyye funktsii poiska. Kompromiss obychno zaklyuchayetsya v men\'shey baze pol\'zovateley, no kachestvo profiley i relevantnost\' resul\'tatov poiska obychno znachitel\'no vyshe.',
          ],
        },
        {
          heading: 'Gde Pinklights',
          paragraphs: [
            'Pinklights - eto spetsializirovannaya platforma, sozdannaya spetsial\'no dlya Belgii. Ona ob\'yedinyayet funktsii, kotoryye reshayut rasprostranonnyye problemy drugikh tipov platform: prosmotr bez akkaunta, pryamoy kontakt cherez WhatsApp, kurirovannyye profili, proverennyye komandoy moderatsii, poisk po mestopolozheniyu s fil\'trom rasstoyaniya (do 50 km) i zashchishchonnaya infrastruktura, sootvetstvuyushchaya GDPR.',
            'Platforma razrabotana dlya bel\'giyskogo rynka s mnogoyyazychnoy podderzhkoy i okhvatom kak flamandskikh, tak i vallonskikh gorodov, ot Antverpena i Genta do Bryusselya, L\'yezha i Namyura.',
          ],
        },
        {
          heading: 'Sdelat\' svoy vybor',
          paragraphs: [
            'Net yedinstvennoy "luchshey" platformy; vse zavisit ot vashikh prioritetov. Yesli vy khotite naibol\'shiy pul romanticheskikh sovpadeniy, obychnoye prilozheniye dlya znakomstv mozhet byt\' pravil\'nym vyborom. Yesli vy khotite maksimal\'nyy ob\'yem i besplatnuyu publikatsiyu, sayty ob\'yavleniy imeyut svoyo mesto.',
            'Yesli vy tsenite kurirovannyye profili, pryamoy kontakt, funktsii bezopasnosti i platformu, spetsial\'no razrabotannuyu dlya Belgii, Pinklights sozdan imenno dlya etogo. Samoye glavnoye - vybrat\' platformu, gde vy chuvstvuyete sebya v bezopasnosti i gde opyt sootvetstvuyet vashim ozhidaniyam.',
          ],
        },
      ],
      relatedPages: [
        { title: 'Pinklights vs prilozheniya dlya znakomstv', description: 'Pryamoy kontakt v sravnenii s algoritmicheskim matchingom.', url: '/compare/pinklights-vs-dating-apps' },
        { title: 'Pinklights vs sayty ob\'yavleniy', description: 'Kurirovannyye profili v sravnenii s otkrytymi saytami ob\'yavleniy.', url: '/compare/pinklights-vs-classified-ads' },
        { title: 'Bezopasnost\' na Pinklights', description: 'Kak my zashchishchayem vashu konfidentsial\'nost\' i bezopasnost\'.', url: '/safety' },
      ],
    },
  },

  de: {
    'pinklights-vs-dating-apps': {
      metaTitle: 'Pinklights vs Dating-Apps - Ehrlicher Vergleich',
      metaDescription: 'Vergleichen Sie Pinklights mit Apps wie Tinder und Bumble. Direkter WhatsApp-Kontakt vs Algorithmus-Matching. Finden Sie, was passt.',
      title: 'Pinklights vs Dating-Apps',
      sections: [
        {
          heading: 'Wie Sie Menschen entdecken',
          paragraphs: [
            'Dating-Apps wie Tinder und Bumble verwenden algorithmisches Matching. Sie erstellen ein Profil, legen Praeferenzen fest und die App zeigt Ihnen potenzielle Matches einzeln. Sie wischen nach rechts oder links, und ein Gespraech beginnt erst, wenn beide Personen Interesse zeigen. Der Algorithmus entscheidet, was Sie sehen und wann.',
            'Pinklights funktioniert anders. Es gibt keinen Matching-Algorithmus und kein Wischen. Sie durchsuchen alle verfuegbaren Profile frei, filtern nach Standort und Praeferenzen und betrachten detaillierte Profile mit Fotos und Beschreibungen. Sie waehlen selbst, wen Sie kontaktieren. Die Plattform trifft diese Entscheidung nicht fuer Sie.',
          ],
        },
        {
          heading: 'Wie Sie Kontakt aufnehmen',
          paragraphs: [
            'Bei Dating-Apps findet der Nachrichtenaustausch innerhalb der App selbst statt. Sie koennen keine Telefonnummern austauschen, bis beide Parteien im Chat zustimmen. Einige Apps beschraenken die Anzahl der Nachrichten oder erfordern ein Premium-Abonnement.',
            'Auf Pinklights erfolgt der Kontakt direkt ueber WhatsApp. Wenn Sie ein Profil finden, das Sie interessiert, ist die WhatsApp-Nummer auf der Profilseite verfuegbar. Sie nehmen direkt Kontakt auf. Keine In-App-Nachrichten, keine Credits und kein Vermittler. Der Prozess ist schneller und persoenlicher.',
          ],
        },
        {
          heading: 'Kontoanforderungen und Profilqualitaet',
          paragraphs: [
            'Dating-Apps erfordern die Erstellung eines Kontos, bevor Sie Profile sehen koennen. Dies umfasst in der Regel die Angabe einer Telefonnummer oder E-Mail, das Hochladen von Fotos und das Ausfuellen von Profildaten. Pinklights ermoeglicht vollstaendiges Browsen ohne Konto. Sie koennen alle aktiven Profile ansehen, Suchfilter nutzen und vollstaendige Profildetails lesen, bevor Sie sich entscheiden, jemanden zu kontaktieren.',
            'Profile auf Dating-Apps zeigen begrenzte Informationen, normalerweise einige Fotos und eine kurze Bio. Pinklights-Profile sind ausfuehrlich gestaltet: mehrere Fotos, koerperliche Details, eine geschriebene Bio, Verfuegbarkeit und Service-Informationen. Das gibt Ihnen ein klareres Bild, bevor Sie Kontakt aufnehmen.',
          ],
        },
        {
          heading: 'Das Fazit',
          paragraphs: [
            'Dating-Apps sind besser geeignet, wenn Sie eine romantische Beziehung suchen oder gegenseitiges Matching fuer Sie wichtig ist. Ihre grosse Nutzerbasis bedeutet mehr potenzielle Treffer in jedem Gebiet. Fuer soziales Dating, bei dem gegenseitiges Interesse zaehlt, bleiben sie eine starke Wahl.',
            'Pinklights ist fuer Menschen konzipiert, die direkte Verbindungen ohne Umwege wollen. Kein Warten auf einen Match, kein Algorithmus, der filtert, wen Sie sehen koennen, keine In-App-Nachrichtenbarriere. Wenn Sie Geschwindigkeit, Transparenz und Direktheit schaetzen, bietet Pinklights einen grundlegend anderen Ansatz.',
          ],
        },
      ],
      relatedPages: [
        { title: 'Pinklights vs Kleinanzeigen', description: 'Kuratierte Profile im Vergleich zu offenen Kleinanzeigen-Seiten.', url: '/compare/pinklights-vs-classified-ads' },
        { title: 'Beste Plattformen Belgien', description: 'Worauf Sie bei einer Plattform in Belgien achten sollten.', url: '/compare/best-platforms-belgium' },
        { title: 'So funktioniert es', description: 'Schritt-fuer-Schritt-Anleitung zur Nutzung von Pinklights.', url: '/guides/how-it-works' },
      ],
    },

    'pinklights-vs-classified-ads': {
      metaTitle: 'Pinklights vs Kleinanzeigen - Sicherheit',
      metaDescription: 'Vergleichen Sie Pinklights mit Kleinanzeigen-Seiten. Kuratierte Profile und Verifizierung vs offene Anzeigen. Mehr Sicherheit und Qualitaet.',
      title: 'Pinklights vs Kleinanzeigen-Seiten',
      sections: [
        {
          heading: 'Profilqualitaet und Kuration',
          paragraphs: [
            'Kleinanzeigen-Seiten erlauben es typischerweise jedem, eine Anzeige mit minimalen Anforderungen zu schalten. Anzeigen sind oft textlastig mit wenigen Fotos, und es gibt kaum Standardisierung. Die Qualitaet variiert stark: Manche sind detailliert und authentisch, andere vage, veraltet oder irrefuehrend.',
            'Pinklights verfolgt einen kuratierten Ansatz. Jedes Profil folgt einem einheitlichen Format mit mehreren Fotos, koerperlichen Details, einer Bio, Verfuegbarkeit und Service-Informationen. Profile werden von unserem Moderationsteam geprueft, und inaktive oder problematische Profile werden entfernt.',
          ],
        },
        {
          heading: 'Verifizierung und Vertrauen',
          paragraphs: [
            'Eines der groessten Bedenken bei Kleinanzeigen-Seiten ist der Mangel an Verifizierung. Die meisten Plattformen ueberpruefen weder die Identitaet der Inserenten noch die Genauigkeit der Fotos oder die Legitimnitaet der Anzeige. Das schafft ein Umfeld, in dem Betrug und Fake-Profile haeufige Probleme darstellen.',
            'Pinklights beinhaltet einen administrativen Pruefprozess fuer alle Profile. Unser Moderationsteam prueft Einreichungen, und Nutzer koennen Profile melden, die problematisch erscheinen. Obwohl keine Plattform vollstaendige Authentizitaet garantieren kann, fuegt die Pruefebene ein bedeutsames Mass an Vertrauen hinzu.',
          ],
        },
        {
          heading: 'Sicherheit und Kontaktmethode',
          paragraphs: [
            'Sicherheit ist ein wesentlicher Unterscheidungsfaktor. Kleinanzeigen-Seiten arbeiten generell mit minimaler Moderation. Anzeigen werden geschaltet und bleiben bestehen, sofern niemand sie meldet. Kontaktdaten auf Kleinanzeigen-Seiten werden manchmal von Bots gesammelt oder fuer Spam verwendet.',
            'Pinklights verfuegt ueber integrierte Sicherheitsfunktionen einschliesslich Profilmoderation, ein Meldesystem und die Moeglichkeit, Nutzer zu sperren, die gegen Standards verstossen. Pinklights verwendet WhatsApp als primaere Kontaktmethode. WhatsApp-Nummern werden auf Profilseiten statt in oeffentlichen Suchergebnissen angezeigt, was eine zusaetzliche Datenschutzschicht hinzufuegt.',
          ],
        },
        {
          heading: 'Das Fazit',
          paragraphs: [
            'Kleinanzeigen-Seiten haben echte Vorteile. Sie bieten typischerweise kostenloses Inserieren, was eine breitere Auswahl an Anzeigen bedeutet. Ihre Reichweite ist oft groesser, da sie seit Jahren etabliert sind. Wenn Sie maximales Volumen suchen und Qualitaetsschwankungen Sie nicht stoeren, bieten Kleinanzeigen-Seiten die breiteste Auswahl.',
            'Pinklights priorisiert Qualitaet vor Quantitaet. Kuratierte Profile, Moderation, Datenschutzkontrollen und eine gezielte Sucherfahrung schaffen eine sicherere und zuverlaessigere Browsingumgebung. Fuer Nutzer, die Vertrauen, Konsistenz und eine Plattform schaetzen, die speziell fuer Belgien entwickelt wurde, bietet Pinklights ein ausgereifteres Erlebnis.',
          ],
        },
      ],
      relatedPages: [
        { title: 'Pinklights vs Dating-Apps', description: 'Direkter Kontakt im Vergleich zu algorithmusgesteuertem Matching.', url: '/compare/pinklights-vs-dating-apps' },
        { title: 'Sicherheit auf Pinklights', description: 'Wie wir Ihre Privatsphaere und Sicherheit schuetzen.', url: '/safety' },
        { title: 'Beste Plattformen Belgien', description: 'Worauf Sie bei einer Plattform in Belgien achten sollten.', url: '/compare/best-platforms-belgium' },
      ],
    },

    'best-platforms-belgium': {
      metaTitle: 'Beste Plattformen Belgien 2026 - Leitfaden',
      metaDescription: 'Worauf Sie bei einer Plattform in Belgien achten sollten. Vergleichen Sie Sicherheit, Verifizierung, Kontaktmethoden und Datenschutz.',
      title: 'Beste Plattformen in Belgien (2026)',
      sections: [
        {
          heading: 'Worauf Sie achten sollten',
          paragraphs: [
            'Bevor Sie bestimmte Plattformen vergleichen, ist es hilfreich zu wissen, was am wichtigsten ist. Die folgenden Kriterien trennen eine vertrauenswuerdige Plattform von einer riskanten: Sicherheit und Moderation, Verifizierung von Profilen, Kontaktfreundlichkeit, Datenschutzkontrollen und Fokus auf Belgien.',
            'Eine auf Belgien ausgerichtete Plattform hat bessere lokale Abdeckung, versteht Sprachpraeferenzen (Niederlaendisch, Franzoesisch, Englisch) und ist auf die spezifische Geographie eines kompakten Landes abgestimmt. DSGVO-Konformitaet ist eine gesetzliche Anforderung in Belgien, aber nicht alle Plattformen erfuellen sie gleichermassen.',
          ],
        },
        {
          heading: 'Verfuegbare Plattformtypen',
          paragraphs: [
            'Der belgische Markt umfasst mehrere verschiedene Kategorien. Gaengige Dating-Apps wie Tinder und Bumble bieten grosse Nutzerbestande und algorithmisches Matching, sind aber vorrangig fuer romantische Beziehungen konzipiert. Kleinanzeigen-Seiten bestehen seit Jahren und bieten breite Reichweite mit kostenlosem oder guenstigem Inserieren, aber mit minimaler Verifizierung und begrenzter Moderation.',
            'Spezialisierte Plattformen konzentrieren sich spezifisch auf die Vermittlung von Begleitverbindungen. Sie bieten typischerweise bessere Kuration, detailliertere Profile und zweckgebundene Suchfunktionen. Der Kompromiss ist in der Regel eine kleinere Nutzerbasis, aber die Profilqualitaet und Relevanz der Suchergebnisse sind deutlich hoeher.',
          ],
        },
        {
          heading: 'Wo Pinklights sich einordnet',
          paragraphs: [
            'Pinklights ist eine spezialisierte Plattform, die eigens fuer Belgien entwickelt wurde. Sie vereint Funktionen, die haeufige Schwachstellen anderer Plattformtypen adressieren: Browsen ohne Konto, direkter WhatsApp-Kontakt, kuratierte und vom Moderationsteam gepruefte Profile, standortbasierte Suche mit Entfernungsfilter (bis 50 km) und gesicherte, DSGVO-konforme Infrastruktur.',
            'Die Plattform ist fuer den belgischen Markt konzipiert mit mehrsprachiger Unterstuetzung und Abdeckung sowohl flaemischer als auch wallonischer Staedte, von Antwerpen und Gent bis Bruessel, Luettich und Namur.',
          ],
        },
        {
          heading: 'Ihre Entscheidung treffen',
          paragraphs: [
            'Es gibt keine universell "beste" Plattform; es haengt von Ihren Prioritaeten ab. Wenn Sie den groesstmoeglichen Pool an romantischen Matches wuenschen, kann eine gaengige Dating-App die richtige Wahl sein. Wenn Sie maximales Volumen und kostenloses Inserieren wuenschen, haben Kleinanzeigen ihren Platz.',
            'Wenn Sie kuratierte Profile, direkten Kontakt, Sicherheitsfunktionen und eine speziell fuer Belgien entwickelte Plattform schaetzen, ist Pinklights genau dafuer gemacht. Das Wichtigste ist, eine Plattform zu waehlen, auf der Sie sich sicher fuehlen und auf der das Erlebnis Ihren Erwartungen entspricht.',
          ],
        },
      ],
      relatedPages: [
        { title: 'Pinklights vs Dating-Apps', description: 'Direkter Kontakt im Vergleich zu algorithmusgesteuertem Matching.', url: '/compare/pinklights-vs-dating-apps' },
        { title: 'Pinklights vs Kleinanzeigen', description: 'Kuratierte Profile im Vergleich zu offenen Kleinanzeigen-Seiten.', url: '/compare/pinklights-vs-classified-ads' },
        { title: 'Sicherheit auf Pinklights', description: 'Wie wir Ihre Privatsphaere und Sicherheit schuetzen.', url: '/safety' },
      ],
    },
  },
};

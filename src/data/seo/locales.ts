export const SUPPORTED_LOCALES = ['fr', 'nl', 'es', 'pt', 'ru', 'de'] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];

export function isValidLocale(locale: string): locale is Locale {
  return SUPPORTED_LOCALES.includes(locale as Locale);
}

export const LOCALE_LABELS: Record<Locale, string> = {
  fr: 'Français',
  nl: 'Nederlands',
  es: 'Español',
  pt: 'Português',
  ru: 'Русский',
  de: 'Deutsch',
};

/** Common UI strings per locale */
export const UI_STRINGS: Record<Locale, {
  home: string;
  find: string;
  guides: string;
  compare: string;
  faq: string;
  searchNow: string;
  startBrowsing: string;
  readyToBrowse: string;
  readyToBrowseDesc: string;
  relatedPages: string;
  exploreOtherCities: string;
  commonQuestions: string;
  backToHub: string;
}> = {
  fr: {
    home: 'Accueil',
    find: 'Trouver',
    guides: 'Guides',
    compare: 'Comparer',
    faq: 'FAQ',
    searchNow: 'Rechercher',
    startBrowsing: 'Parcourir les profils',
    readyToBrowse: 'Prêt à parcourir les profils ?',
    readyToBrowseDesc: 'Aucun compte requis pour commencer. Trouvez quelqu\'un près de chez vous en quelques secondes.',
    relatedPages: 'Pages associées',
    exploreOtherCities: 'Explorer d\'autres villes',
    commonQuestions: 'Questions fréquentes',
    backToHub: 'Retour',
  },
  nl: {
    home: 'Home',
    find: 'Zoeken',
    guides: 'Gidsen',
    compare: 'Vergelijken',
    faq: 'FAQ',
    searchNow: 'Nu zoeken',
    startBrowsing: 'Profielen bekijken',
    readyToBrowse: 'Klaar om profielen te bekijken?',
    readyToBrowseDesc: 'Geen account nodig om te beginnen. Vind iemand bij jou in de buurt in enkele seconden.',
    relatedPages: 'Gerelateerde pagina\'s',
    exploreOtherCities: 'Ontdek andere steden',
    commonQuestions: 'Veelgestelde vragen',
    backToHub: 'Terug',
  },
  es: {
    home: 'Inicio',
    find: 'Buscar',
    guides: 'Guías',
    compare: 'Comparar',
    faq: 'FAQ',
    searchNow: 'Buscar ahora',
    startBrowsing: 'Ver perfiles',
    readyToBrowse: '¿Listo para ver perfiles?',
    readyToBrowseDesc: 'No necesitas cuenta para empezar. Encuentra a alguien cerca de ti en segundos.',
    relatedPages: 'Páginas relacionadas',
    exploreOtherCities: 'Explorar otras ciudades',
    commonQuestions: 'Preguntas frecuentes',
    backToHub: 'Volver',
  },
  pt: {
    home: 'Início',
    find: 'Encontrar',
    guides: 'Guias',
    compare: 'Comparar',
    faq: 'FAQ',
    searchNow: 'Pesquisar agora',
    startBrowsing: 'Ver perfis',
    readyToBrowse: 'Pronto para ver perfis?',
    readyToBrowseDesc: 'Não precisa de conta para começar. Encontre alguém perto de si em segundos.',
    relatedPages: 'Páginas relacionadas',
    exploreOtherCities: 'Explorar outras cidades',
    commonQuestions: 'Perguntas frequentes',
    backToHub: 'Voltar',
  },
  ru: {
    home: 'Главная',
    find: 'Найти',
    guides: 'Руководства',
    compare: 'Сравнить',
    faq: 'FAQ',
    searchNow: 'Искать сейчас',
    startBrowsing: 'Смотреть профили',
    readyToBrowse: 'Готовы смотреть профили?',
    readyToBrowseDesc: 'Регистрация не требуется. Найдите кого-то рядом за несколько секунд.',
    relatedPages: 'Похожие страницы',
    exploreOtherCities: 'Другие города',
    commonQuestions: 'Частые вопросы',
    backToHub: 'Назад',
  },
  de: {
    home: 'Startseite',
    find: 'Finden',
    guides: 'Ratgeber',
    compare: 'Vergleichen',
    faq: 'FAQ',
    searchNow: 'Jetzt suchen',
    startBrowsing: 'Profile durchsuchen',
    readyToBrowse: 'Bereit, Profile zu durchsuchen?',
    readyToBrowseDesc: 'Kein Konto erforderlich. Finden Sie jemanden in Ihrer Nähe in Sekunden.',
    relatedPages: 'Verwandte Seiten',
    exploreOtherCities: 'Andere Städte entdecken',
    commonQuestions: 'Häufige Fragen',
    backToHub: 'Zurück',
  },
};

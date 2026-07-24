import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { isValidLocale } from '@/data/seo/locales';
import { CITY_TRANSLATIONS } from '@/data/seo/cities';
import { CityLandingTemplate } from '@/components/seo/CityLandingTemplate';

const LocaleCityPage = () => {
  const { locale, slug } = useParams<{ locale: string; slug: string }>();

  if (!locale || !isValidLocale(locale) || !slug) {
    return <Navigate to="/find" replace />;
  }

  const cities = CITY_TRANSLATIONS[locale];
  const city = cities?.[slug];

  if (!city) {
    return <Navigate to={`/${locale}/find`} replace />;
  }

  // Prefix related city URLs with locale
  const relatedCities = city.relatedCities.map((c) => ({
    ...c,
    url: `/${locale}${c.url}`,
  }));

  return (
    <CityLandingTemplate
      cityName={city.cityName}
      slug={slug}
      metaTitle={city.metaTitle}
      metaDescription={city.metaDescription}
      heroHeadline={city.heroHeadline}
      heroSubtext={city.heroSubtext}
      sections={city.sections}
      faqItems={city.faqItems}
      relatedCities={relatedCities}
    />
  );
};

export default LocaleCityPage;

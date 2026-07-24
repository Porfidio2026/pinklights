import React from 'react';
import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://www.pink-lights.be';
const DEFAULT_TITLE = 'Pinklights — Premium Companion Platform in Belgium';
const DEFAULT_DESCRIPTION = 'Discover curated profiles on Pinklights. Browse, connect, and find your perfect match across Belgium.';
const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`;

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

interface SEOHeadProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  breadcrumbs?: BreadcrumbItem[];
  faqItems?: FAQItem[];
  datePublished?: string;
  dateModified?: string;
  noIndex?: boolean;
}

export const SEOHead = ({
  title,
  description,
  image,
  url,
  type = 'website',
  breadcrumbs,
  faqItems,
  datePublished,
  dateModified,
  noIndex,
}: SEOHeadProps) => {
  const fullTitle = title ? `${title} | Pinklights` : DEFAULT_TITLE;
  const desc = description || DEFAULT_DESCRIPTION;
  const pageUrl = url ? `${SITE_URL}${url}` : SITE_URL;
  const pageImage = image || DEFAULT_IMAGE;

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Pinklights',
    url: SITE_URL,
    logo: `${SITE_URL}/uploads/finallogo.jpeg`,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+32-478-02-64-79',
      contactType: 'customer service',
      availableLanguage: ['English', 'Dutch', 'French'],
    },
    sameAs: [],
  };

  const breadcrumbSchema = breadcrumbs && breadcrumbs.length > 0
    ? {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((item, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: item.name,
          item: `${SITE_URL}${item.url}`,
        })),
      }
    : null;

  const faqSchema = faqItems && faqItems.length > 0
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqItems.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      }
    : null;

  const articleSchema = type === 'article'
    ? {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: title || DEFAULT_TITLE,
        description: desc,
        image: pageImage,
        url: pageUrl,
        publisher: {
          '@type': 'Organization',
          name: 'Pinklights',
          logo: { '@type': 'ImageObject', url: `${SITE_URL}/uploads/finallogo.jpeg` },
        },
        ...(datePublished && { datePublished }),
        ...(dateModified && { dateModified }),
      }
    : null;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={pageUrl} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:image" content={pageImage} />
      <meta property="og:site_name" content="Pinklights" />
      <meta property="og:locale" content="en_BE" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={pageImage} />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      {breadcrumbSchema && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      )}
      {faqSchema && (
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      )}
      {articleSchema && (
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
      )}
    </Helmet>
  );
};

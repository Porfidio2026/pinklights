import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

const DEFAULT_TITLE = 'Pinklights — Premium Companion Platform';
const DEFAULT_DESCRIPTION = 'Discover curated profiles on Pinklights. Browse, connect, and find your perfect match.';

export const SEO = ({ title, description, image, url }: SEOProps) => {
  const fullTitle = title ? `${title} | Pinklights` : DEFAULT_TITLE;
  const desc = description || DEFAULT_DESCRIPTION;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:type" content="website" />
      {image && <meta property="og:image" content={image} />}
      {url && <meta property="og:url" content={url} />}
    </Helmet>
  );
};

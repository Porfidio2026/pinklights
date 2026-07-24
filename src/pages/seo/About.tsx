import React from 'react';
import { ContentPageTemplate } from '@/components/seo/ContentPageTemplate';

const About = () => {
  return (
    <ContentPageTemplate
      title="About Pinklights"
      metaTitle="About Pinklights — Belgian Companion Platform"
      metaDescription="Pinklights is a Belgian companion platform built for safer, more direct connections. Learn about our mission, values, and how to contact us."
      url="/about"
      breadcrumbs={[
        { name: 'About', url: '/about' },
      ]}
      datePublished="2026-07-24"
      relatedPages={[
        { title: 'Safety on Pinklights', description: 'How we protect your privacy and security on the platform.', url: '/safety' },
        { title: 'FAQ', description: 'Frequently asked questions about using Pinklights.', url: '/faq' },
        { title: 'How It Works', description: 'A step-by-step guide to browsing and connecting.', url: '/guides/how-it-works' },
      ]}
      ctaHeadline="See What We Have Built"
      ctaDescription="Browse real profiles across Belgium — no account required."
    >
      <p className="text-muted-foreground leading-relaxed">
        Pinklights is a Belgian-based companion platform designed to make connections safer, more direct, and more transparent. We built the platform because we saw a gap between mainstream dating apps — which rely on algorithms and gamified matching — and classified ad sites, which often lack basic safety features and quality control. Pinklights sits in the space between, offering curated profiles with direct contact and privacy built in from the start.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-3">Our Mission</h2>
      <p className="text-muted-foreground leading-relaxed">
        Our mission is straightforward: make it easier for people to discover and connect with companions in Belgium, without the friction of algorithms, the risks of unmoderated platforms, or the barriers of mandatory account creation. We believe that a platform can be both accessible and safe — that you should not have to choose between convenience and security.
      </p>
      <p className="text-muted-foreground leading-relaxed mt-3">
        Every decision we make — from allowing account-free browsing to using WhatsApp as the primary contact method — is driven by this principle. We want the platform to get out of the way and let people connect on their own terms, while providing the safety infrastructure that makes those connections trustworthy.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-3">Why We Built Pinklights</h2>
      <p className="text-muted-foreground leading-relaxed">
        The companion space in Belgium has historically been served by two types of platforms, both with significant limitations. Dating apps require mutual matching and weeks of messaging before any real connection happens — they are designed for romantic relationships, not direct companion connections. Classified ad sites offer directness but come with serious safety concerns: no verification, no moderation, and no accountability.
      </p>
      <p className="text-muted-foreground leading-relaxed mt-3">
        We built Pinklights to offer an alternative that combines the directness of classifieds with the safety and quality of a curated platform. Real profiles with real photos, reviewed by our moderation team. Direct WhatsApp contact without in-app messaging barriers. Location-based search tailored to Belgium's compact geography. And privacy controls that let profile owners decide exactly what to share.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-3">A Belgian Company</h2>
      <p className="text-muted-foreground leading-relaxed">
        Pinklights is a Belgian company serving the Belgian market. We understand the local landscape — the bilingual reality of Flemish and Walloon regions, the compact distances between cities, the importance of privacy in a small country where discretion matters. Our platform supports multiple languages and covers cities across both regions, from Antwerp and Ghent to Brussels, Liege, and Namur.
      </p>
      <p className="text-muted-foreground leading-relaxed mt-3">
        As a Belgian company, we are fully subject to European and Belgian privacy regulations. We take GDPR compliance seriously — your data is stored securely, you have the right to access and delete your information, and we do not sell personal data to third parties. Read more about our security measures on our <a href="/safety" className="text-primary hover:underline">safety page</a>.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-3">Our Values</h2>
      <ul className="list-disc pl-6 mt-3 space-y-2 text-muted-foreground">
        <li><strong>Transparency:</strong> We are honest about what the platform does and does not do. No fabricated reviews, no inflated numbers, no misleading marketing.</li>
        <li><strong>Safety first:</strong> Profile moderation, reporting systems, and ban mechanisms are core features, not afterthoughts.</li>
        <li><strong>Directness:</strong> No algorithms deciding who you see. No in-app messaging forcing you to stay on the platform. Browse openly, connect directly.</li>
        <li><strong>Privacy:</strong> Encrypted data storage, GDPR compliance, and user-controlled visibility settings. Your information stays under your control.</li>
        <li><strong>Respect:</strong> We foster a platform culture built on mutual respect between browsers and profile owners.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-3">Multilingual Support</h2>
      <p className="text-muted-foreground leading-relaxed">
        Belgium is a multilingual country, and Pinklights reflects that reality. Profiles can be written in Dutch, French, English, or any combination. Our platform interface and support are available in multiple languages to serve users across all Belgian regions as well as international visitors.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-3">Contact Us</h2>
      <p className="text-muted-foreground leading-relaxed">
        We are here to help — whether you have a question about the platform, need to report a concern, or want to share feedback. You can reach us through:
      </p>
      <ul className="list-disc pl-6 mt-3 space-y-2 text-muted-foreground">
        <li><strong>WhatsApp:</strong> <a href="https://wa.me/32478026479" className="text-primary hover:underline">+32 478 02 64 79</a></li>
        <li><strong>Email:</strong> <a href="mailto:support@pink-lights.be" className="text-primary hover:underline">support@pink-lights.be</a></li>
      </ul>
      <p className="text-muted-foreground leading-relaxed mt-3">
        We aim to respond to all enquiries within 24 hours. For urgent safety concerns, WhatsApp is the fastest way to reach us.
      </p>
    </ContentPageTemplate>
  );
};

export default About;

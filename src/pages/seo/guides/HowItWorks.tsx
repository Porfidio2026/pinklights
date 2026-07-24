import React from 'react';
import { ContentPageTemplate } from '@/components/seo/ContentPageTemplate';

const HowItWorks = () => {
  return (
    <ContentPageTemplate
      title="How Pinklights Works"
      metaTitle="How Pinklights Works — Step-by-Step Guide"
      metaDescription="Learn how to browse profiles, filter by preferences, and connect directly via WhatsApp on Pinklights. No account required to start."
      url="/guides/how-it-works"
      breadcrumbs={[
        { name: 'Guides', url: '/guides' },
        { name: 'How It Works', url: '/guides/how-it-works' },
      ]}
      datePublished="2026-07-24"
      relatedPages={[
        { title: 'Safety Tips', description: 'Ten practical tips for staying safe when meeting someone new.', url: '/guides/safety-tips' },
        { title: 'First Meeting Guide', description: 'Prepare for your first in-person meeting with confidence.', url: '/guides/first-meeting' },
        { title: 'For Visitors', description: 'Using Pinklights during a short stay in Belgium.', url: '/guides/for-visitors' },
      ]}
      ctaHeadline="Ready to Try It Yourself?"
      ctaDescription="Browse real profiles across Belgium — no sign-up needed."
    >
      <p className="text-muted-foreground leading-relaxed">
        Pinklights is designed to be straightforward. Unlike traditional dating apps that require lengthy sign-ups, personality quizzes, and waiting for algorithmic matches, our platform lets you browse real profiles and make direct contact in minutes. Here is exactly how the process works, from your first visit to your first conversation.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-3">Step 1: Visit the Site</h2>
      <p className="text-muted-foreground leading-relaxed">
        Navigate to Pinklights.be on any device — desktop, tablet, or smartphone. The platform is fully responsive and works in any modern browser. There is no app to download and no account to create just to look around. You land on the homepage and can start exploring immediately.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-3">Step 2: Choose a Service Type</h2>
      <p className="text-muted-foreground leading-relaxed">
        Pinklights organises profiles by service type so you can find exactly what you are looking for. Select the category that matches your interest. This first filter narrows the results to the most relevant profiles, saving you time and ensuring a focused browsing experience.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-3">Step 3: Select Your Preferences</h2>
      <p className="text-muted-foreground leading-relaxed">
        After choosing a service type, you can further refine your search by selecting gender preferences. This combination of service type and preference ensures the profiles you see are aligned with what you are genuinely interested in — no irrelevant results cluttering your experience.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-3">Step 4: Browse Profiles with Filters</h2>
      <p className="text-muted-foreground leading-relaxed">
        The search results page displays profile cards with photos, basic details, and location information. You can filter further by city or distance radius (up to 50 km from your chosen location), as well as physical attributes such as appearance, age range, and other details. Belgium is compact — someone listed in Antwerp might be just 30 minutes from Ghent or Brussels. The distance filter lets you decide how far you are willing to travel.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-3">Step 5: View Detailed Profiles</h2>
      <p className="text-muted-foreground leading-relaxed">
        Click on any profile card to see the full profile. Here you will find multiple photos, a written bio, physical details, availability information, and the services offered. Profiles on Pinklights are created by the individuals themselves, and we encourage honest, up-to-date information. Take your time to review profiles thoroughly before reaching out — it leads to better conversations and more respectful interactions.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-3">Step 6: Contact Directly via WhatsApp</h2>
      <p className="text-muted-foreground leading-relaxed">
        When you find a profile that interests you, contact the person directly through WhatsApp. This is the fastest, most personal way to start a conversation. There is no in-app messaging system, no credits to spend on messages, and no intermediary. You and the profile owner communicate one-on-one, on your own terms.
      </p>
      <p className="text-muted-foreground leading-relaxed mt-3">
        WhatsApp also works internationally, which makes Pinklights particularly convenient for travelers visiting Belgium. You do not need a Belgian phone number — just a working WhatsApp account.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-3">A Note on Browsing Without an Account</h2>
      <p className="text-muted-foreground leading-relaxed">
        One of the things that sets Pinklights apart is that browsing is completely open. You do not need to create an account, verify an email, or provide any personal information to view profiles. This is by design — we want you to evaluate the platform on your own terms before making any commitment.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-3">For Profile Owners: Visibility and Credits</h2>
      <p className="text-muted-foreground leading-relaxed">
        If you are a profile owner (the person listing their services), creating and maintaining your profile works on a credit-based system. Day credits keep your profile visible and discoverable in search results. When your credits are active, your profile appears to browsers in your area. You can also boost your visibility to appear higher in search results during peak times. This system ensures that active, engaged profiles are the ones visitors see first, maintaining quality across the platform.
      </p>
      <p className="text-muted-foreground leading-relaxed mt-3">
        Managing your profile is straightforward — update your photos, adjust your availability, and top up credits all from your dashboard. For more tips on creating an effective profile, see our dedicated profile tips guide.
      </p>
    </ContentPageTemplate>
  );
};

export default HowItWorks;

import React from 'react';
import { Card } from '@/components/ui/card';
import { SEOHead } from '@/components/seo/SEOHead';
import { BreadcrumbNav } from '@/components/seo/BreadcrumbNav';
import { CTABanner } from '@/components/seo/CTABanner';
import { FAQAccordion } from '@/components/seo/FAQAccordion';
import { RelatedPages } from '@/components/seo/RelatedPages';

const GETTING_STARTED_FAQS = [
  {
    question: 'Is browsing profiles on Pinklights free?',
    answer: 'Yes. You can browse all visible profiles, view photos, and read bios without creating an account or paying anything. Browsing is completely free and open to everyone.',
  },
  {
    question: 'Do I need to create an account to use Pinklights?',
    answer: 'No account is required to browse profiles. You only need to create an account if you want to list your own profile on the platform. Visitors can search, filter, and view profiles without registering.',
  },
  {
    question: 'How do I search for profiles?',
    answer: 'Start by selecting a service type and your preferences on the homepage. You will then see matching profiles that you can further filter by city, distance, appearance, and other criteria. The search is designed to be intuitive — no complicated steps or hidden menus.',
  },
  {
    question: 'Is Pinklights available outside Belgium?',
    answer: 'Pinklights currently focuses on Belgium. All profiles are based in Belgian cities. However, the platform is accessible from anywhere in the world, making it ideal for travelers planning a visit to Belgium.',
  },
];

const CONTACTING_FAQS = [
  {
    question: 'How do I contact someone on Pinklights?',
    answer: 'When you find a profile you are interested in, you can contact the person directly via WhatsApp. There is no in-app messaging — conversations happen on WhatsApp for speed and convenience.',
  },
  {
    question: 'Is my phone number visible to profile owners?',
    answer: 'When you message someone on WhatsApp, your phone number is visible to them, as is standard with WhatsApp. You can adjust your WhatsApp privacy settings to control what else they see, such as your profile photo, status, and last seen.',
  },
  {
    question: 'Can I message someone anonymously?',
    answer: 'WhatsApp requires a phone number, so fully anonymous messaging is not possible. However, you can limit what personal information is visible by adjusting your WhatsApp privacy settings before reaching out.',
  },
];

const PROFILE_OWNER_FAQS = [
  {
    question: 'How do I create a profile on Pinklights?',
    answer: 'To create a profile, sign up for an account and follow the guided setup process. You will add photos, write a bio, set your location, and choose your service type. The process takes just a few minutes.',
  },
  {
    question: 'What are day credits?',
    answer: 'Day credits are what keep your profile visible on the platform. Each credit activates your profile for one day. While your credits are active, your profile appears in search results and is visible to browsers. When credits run out, your profile is temporarily hidden until you top up.',
  },
  {
    question: 'How does visibility work?',
    answer: 'Your profile appears in search results when you have active day credits. You can also boost your visibility to appear higher in search results during peak times. Profiles with recent activity and complete information tend to perform better in search rankings.',
  },
  {
    question: 'Can I set my availability?',
    answer: 'Yes. Your profile includes availability settings where you can indicate when you are available for meetings. Keeping this information accurate helps attract the right connections and avoids missed opportunities.',
  },
];

const SAFETY_FAQS = [
  {
    question: 'Is Pinklights safe to use?',
    answer: 'Pinklights is designed with safety in mind. We encourage public first meetings, provide safety guides, and review reported profiles. However, as with any platform where you meet new people, we recommend following our safety tips and using common sense.',
  },
  {
    question: 'How is my personal data protected?',
    answer: 'Pinklights follows GDPR regulations and takes data protection seriously. We only collect information necessary to operate the platform, and your data is stored securely. We never sell personal information to third parties.',
  },
  {
    question: 'Can I delete my account and data?',
    answer: 'Yes. You can delete your account at any time from your profile settings. Upon deletion, your profile is removed from search results and your personal data is erased in accordance with GDPR requirements.',
  },
  {
    question: 'What about GDPR compliance?',
    answer: 'Pinklights is fully compliant with the General Data Protection Regulation (GDPR). You have the right to access, correct, and delete your personal data. You can also request a copy of all data we hold about you. Our privacy policy outlines these rights in detail.',
  },
];

const PAYMENT_FAQS = [
  {
    question: 'What payment methods does Pinklights accept?',
    answer: 'Pinklights accepts major credit and debit cards as well as other common online payment methods. All transactions are processed securely through our payment provider.',
  },
  {
    question: 'Are credits refundable?',
    answer: 'Credits are generally non-refundable once purchased. We recommend starting with a smaller package to familiarise yourself with the platform before committing to larger purchases. If you experience a technical issue that prevents credit usage, please contact our support team.',
  },
  {
    question: 'What does a day credit cost?',
    answer: 'Day credit pricing varies depending on the package size. Larger packages offer a lower cost per day. Visit the credits section in your dashboard for current pricing. We periodically offer introductory packages for new profile creators.',
  },
];

const ALL_FAQ_ITEMS = [
  ...GETTING_STARTED_FAQS,
  ...CONTACTING_FAQS,
  ...PROFILE_OWNER_FAQS,
  ...SAFETY_FAQS,
  ...PAYMENT_FAQS,
];

const RELATED_PAGES = [
  { title: 'How It Works', description: 'A step-by-step guide to browsing and connecting on Pinklights.', url: '/guides/how-it-works' },
  { title: 'Safety Tips', description: 'Ten practical tips for staying safe when meeting someone new.', url: '/guides/safety-tips' },
  { title: 'Profile Tips', description: 'Best practices for creating a standout profile.', url: '/guides/profile-tips' },
  { title: 'Find Companions', description: 'Browse profiles by city across Belgium.', url: '/find' },
];

const FAQ = () => {
  const breadcrumbs = [{ name: 'FAQ', url: '/faq' }];

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <SEOHead
        title="Frequently Asked Questions"
        description="Find answers to common questions about Pinklights: browsing, contacting profiles, safety, privacy, payments, and more."
        url="/faq"
        breadcrumbs={breadcrumbs}
        faqItems={ALL_FAQ_ITEMS}
      />

      <div className="max-w-3xl mx-auto">
        <BreadcrumbNav items={breadcrumbs} />

        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold font-display mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Everything you need to know about using Pinklights. Whether you are a first-time visitor, a profile creator, or just curious about how the platform works, you will find answers below.
          </p>
        </header>

        <Card className="p-8 prose prose-sm max-w-none mb-8">
          <p className="text-muted-foreground leading-relaxed">
            Pinklights is a premium companion platform serving Belgium. We connect visitors with curated profiles across all major Belgian cities. Below, we have organized the most common questions into categories so you can quickly find what you are looking for. If your question is not answered here, feel free to reach out to our support team.
          </p>
        </Card>

        <FAQAccordion items={GETTING_STARTED_FAQS} title="Getting Started" />
        <FAQAccordion items={CONTACTING_FAQS} title="Contacting Profiles" />
        <FAQAccordion items={PROFILE_OWNER_FAQS} title="For Profile Owners" />
        <FAQAccordion items={SAFETY_FAQS} title="Safety & Privacy" />
        <FAQAccordion items={PAYMENT_FAQS} title="Payments" />

        <CTABanner />

        <RelatedPages pages={RELATED_PAGES} />
      </div>
    </div>
  );
};

export default FAQ;

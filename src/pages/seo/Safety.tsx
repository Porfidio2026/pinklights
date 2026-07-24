import React from 'react';
import { ContentPageTemplate } from '@/components/seo/ContentPageTemplate';

const Safety = () => {
  return (
    <ContentPageTemplate
      title="Safety on Pinklights"
      metaTitle="Is Pinklights Safe? — Security & Privacy"
      metaDescription="Learn how Pinklights protects your privacy with encrypted storage, profile moderation, GDPR compliance, and reporting tools. Your safety matters."
      url="/safety"
      breadcrumbs={[
        { name: 'Safety', url: '/safety' },
      ]}
      datePublished="2026-07-24"
      faqItems={[
        { question: 'Is my personal data safe on Pinklights?', answer: 'Yes. We use Supabase with encrypted storage and row-level security policies. Your data is protected at rest and in transit, and we comply fully with GDPR requirements.' },
        { question: 'Can I delete my data from Pinklights?', answer: 'Absolutely. Under GDPR, you have the right to request access to, export, or deletion of all your personal data. Contact us via WhatsApp or email and we will process your request promptly.' },
        { question: 'How do I report a problematic profile?', answer: 'You can report any profile directly from the profile page. Our moderation team reviews all reports and takes action including warnings, profile removal, or permanent bans as appropriate.' },
      ]}
      relatedPages={[
        { title: 'Safety Tips', description: 'Ten practical tips for staying safe when meeting someone new.', url: '/guides/safety-tips' },
        { title: 'FAQ', description: 'Frequently asked questions about using Pinklights.', url: '/faq' },
        { title: 'About Pinklights', description: 'Learn about our mission, values, and team.', url: '/about' },
      ]}
      ctaHeadline="Browse with Confidence"
      ctaDescription="A platform built with your safety in mind — explore profiles across Belgium."
    >
      <p className="text-muted-foreground leading-relaxed">
        Safety is not an add-on feature at Pinklights — it is a foundational principle that shapes every aspect of the platform. From how we store your data to how we moderate profiles and handle reports, every decision is made with your security and privacy in mind. This page explains exactly what we do to keep you safe and what you can do to protect yourself.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-3">Platform Security</h2>
      <p className="text-muted-foreground leading-relaxed">
        Pinklights is built on Supabase, a modern infrastructure platform that provides enterprise-grade security features. Your data is protected with encrypted storage — both at rest and in transit. We implement row-level security (RLS) policies on our database, which means that users can only access data they are authorised to see. There is no way for one user to view another user's private account information through the platform.
      </p>
      <p className="text-muted-foreground leading-relaxed mt-3">
        Our authentication system uses secure, industry-standard protocols. Profile owners access their accounts through authenticated sessions, and all API endpoints are protected against unauthorised access. We regularly review our security configuration to ensure it meets current best practices.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-3">User Privacy Controls</h2>
      <p className="text-muted-foreground leading-relaxed">
        Privacy on Pinklights is user-controlled. Profile owners decide what information appears on their profile — from photos to personal details to contact information. WhatsApp numbers are displayed only on individual profile pages, not in search results or public listings. This means your contact information is only visible to people who have actively chosen to view your full profile.
      </p>
      <p className="text-muted-foreground leading-relaxed mt-3">
        For browsers, privacy is equally protected. You can browse all profiles without creating an account, which means no personal data is collected from casual visitors. If you do create an account as a profile owner, your account information is stored securely and never shared with other users or third parties.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-3">Profile Moderation</h2>
      <p className="text-muted-foreground leading-relaxed">
        Every profile on Pinklights goes through an admin review process before becoming publicly visible. Our moderation team checks profiles for completeness, appropriate content, and adherence to platform standards. This review layer helps prevent fake profiles, misleading information, and inappropriate content from reaching the platform.
      </p>
      <p className="text-muted-foreground leading-relaxed mt-3">
        Moderation is ongoing, not just at creation. Our team monitors the platform for profiles that may have been updated with problematic content, and we respond to user reports promptly. When a profile violates our standards, we take graduated action — from warnings to profile removal to permanent bans depending on the severity and nature of the violation.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-3">Reporting System</h2>
      <p className="text-muted-foreground leading-relaxed">
        If you encounter a profile or behaviour that concerns you, our reporting system makes it easy to flag the issue. You can report a profile directly from the profile page. Every report is reviewed by our moderation team, and we take all reports seriously. We do not disclose to the reported party who filed the report, protecting your anonymity in the process.
      </p>
      <p className="text-muted-foreground leading-relaxed mt-3">
        We encourage users to report any profile that appears fake, uses misleading photos, contains inappropriate content, or behaves in a way that makes them feel unsafe. Your reports help us maintain platform quality for everyone.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-3">GDPR Compliance</h2>
      <p className="text-muted-foreground leading-relaxed">
        As a Belgian company, Pinklights is fully subject to the General Data Protection Regulation (GDPR). This means you have clear, enforceable rights over your personal data:
      </p>
      <ul className="list-disc pl-6 mt-3 space-y-2 text-muted-foreground">
        <li><strong>Right to access:</strong> You can request a copy of all personal data we hold about you.</li>
        <li><strong>Right to rectification:</strong> You can correct inaccurate information in your profile or account.</li>
        <li><strong>Right to deletion:</strong> You can request that we delete all your personal data from our systems.</li>
        <li><strong>Right to data portability:</strong> You can request your data in a structured, machine-readable format.</li>
        <li><strong>Right to object:</strong> You can object to certain types of data processing.</li>
      </ul>
      <p className="text-muted-foreground leading-relaxed mt-3">
        To exercise any of these rights, contact us via WhatsApp at <a href="https://wa.me/32478026479" className="text-primary hover:underline">+32 478 02 64 79</a> or email at <a href="mailto:support@pink-lights.be" className="text-primary hover:underline">support@pink-lights.be</a>. We process all GDPR requests promptly and without charge.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-3">Tips for Staying Safe</h2>
      <p className="text-muted-foreground leading-relaxed">
        While we work to make the platform as safe as possible, your personal safety also depends on the precautions you take. We have created a comprehensive <a href="/guides/safety-tips" className="text-primary hover:underline">safety tips guide</a> that covers practical advice for meeting someone new, including choosing public venues, informing a trusted person, and trusting your instincts. We strongly recommend reading it before your first connection through the platform.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-3">How to Report a Problem</h2>
      <p className="text-muted-foreground leading-relaxed">
        If you experience or witness anything concerning on Pinklights, we want to hear about it. You can:
      </p>
      <ul className="list-disc pl-6 mt-3 space-y-2 text-muted-foreground">
        <li>Use the report button on any profile page to flag a specific profile.</li>
        <li>Contact us via WhatsApp at <a href="https://wa.me/32478026479" className="text-primary hover:underline">+32 478 02 64 79</a> for urgent concerns.</li>
        <li>Email <a href="mailto:support@pink-lights.be" className="text-primary hover:underline">support@pink-lights.be</a> for non-urgent reports or questions.</li>
      </ul>
      <p className="text-muted-foreground leading-relaxed mt-3">
        We take every report seriously and aim to respond within 24 hours. For urgent safety matters, WhatsApp is the fastest way to reach us. Your safety is our priority, and we are committed to maintaining a platform where everyone can connect with confidence.
      </p>
    </ContentPageTemplate>
  );
};

export default Safety;

import React from 'react';
import { Card } from '@/components/ui/card';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <Card className="p-8 prose prose-sm max-w-none">
          <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
          <p className="text-muted-foreground mb-4">Last updated: February 2026</p>

          <h2 className="text-xl font-semibold mt-6 mb-3">1. Information We Collect</h2>
          <p>We collect information you provide directly, including your name, email address, profile information, photographs, location data, and phone number. We also collect usage data such as search queries and browsing patterns.</p>

          <h2 className="text-xl font-semibold mt-6 mb-3">2. How We Use Your Information</h2>
          <p>We use your information to provide and improve our services, display your profile to other users, enable contact between users, and ensure platform safety. We may use anonymized data for analytics and service improvement.</p>

          <h2 className="text-xl font-semibold mt-6 mb-3">3. Information Sharing</h2>
          <p>Your profile information (except phone number) is visible to all visitors. Your phone number is only displayed on your profile page. We do not sell your personal data to third parties.</p>

          <h2 className="text-xl font-semibold mt-6 mb-3">4. Data Storage and Security</h2>
          <p>Your data is stored securely using industry-standard encryption. We use Supabase for data storage with row-level security policies to protect your information.</p>

          <h2 className="text-xl font-semibold mt-6 mb-3">5. Your Rights</h2>
          <p>Under GDPR and applicable privacy laws, you have the right to access, correct, delete, and export your personal data. You can manage your data through your account settings or by contacting us.</p>

          <h2 className="text-xl font-semibold mt-6 mb-3">6. Cookies</h2>
          <p>We use essential cookies for authentication and session management. We may use analytics cookies with your consent to understand how our service is used.</p>

          <h2 className="text-xl font-semibold mt-6 mb-3">7. Data Retention</h2>
          <p>We retain your data for as long as your account is active. Upon deletion of your account, your personal data will be removed within 30 days.</p>

          <h2 className="text-xl font-semibold mt-6 mb-3">8. Contact</h2>
          <p>For privacy-related inquiries, please contact us through the platform or email our data protection officer.</p>
        </Card>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

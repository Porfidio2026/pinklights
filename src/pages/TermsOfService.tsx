import React from 'react';
import { Card } from '@/components/ui/card';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <Card className="p-8 prose prose-sm max-w-none">
          <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
          <p className="text-muted-foreground mb-4">Last updated: February 2026</p>

          <h2 className="text-xl font-semibold mt-6 mb-3">1. Acceptance of Terms</h2>
          <p>By accessing or using our platform, you agree to be bound by these Terms of Service. If you do not agree, you may not use the service.</p>

          <h2 className="text-xl font-semibold mt-6 mb-3">2. Eligibility</h2>
          <p>You must be at least 18 years old to use this service. By creating an account, you confirm that you meet this age requirement.</p>

          <h2 className="text-xl font-semibold mt-6 mb-3">3. User Accounts</h2>
          <p>You are responsible for maintaining the confidentiality of your account credentials. You agree to provide accurate information in your profile and to update it as necessary.</p>

          <h2 className="text-xl font-semibold mt-6 mb-3">4. User Conduct</h2>
          <p>You agree not to post false, misleading, or fraudulent content. You may not use the platform for illegal activities, harassment, or spam. We reserve the right to remove content and ban users who violate these terms.</p>

          <h2 className="text-xl font-semibold mt-6 mb-3">5. Content Ownership</h2>
          <p>You retain ownership of content you upload. By posting content, you grant us a non-exclusive license to display and distribute it within the platform.</p>

          <h2 className="text-xl font-semibold mt-6 mb-3">6. Credits and Payments</h2>
          <p>Credits purchased on the platform are non-refundable. Credits have no cash value and cannot be transferred between accounts. We reserve the right to modify credit pricing.</p>

          <h2 className="text-xl font-semibold mt-6 mb-3">7. Disclaimer of Warranties</h2>
          <p>The service is provided "as is" without warranties of any kind. We do not guarantee the accuracy of user profiles or the safety of interactions between users.</p>

          <h2 className="text-xl font-semibold mt-6 mb-3">8. Limitation of Liability</h2>
          <p>We are not liable for any damages arising from your use of the platform, including interactions with other users.</p>

          <h2 className="text-xl font-semibold mt-6 mb-3">9. Termination</h2>
          <p>We may terminate or suspend your account at any time for violations of these terms. You may delete your account at any time through account settings.</p>

          <h2 className="text-xl font-semibold mt-6 mb-3">10. Changes to Terms</h2>
          <p>We may update these terms at any time. Continued use of the service after changes constitutes acceptance of the updated terms.</p>
        </Card>
      </div>
    </div>
  );
};

export default TermsOfService;

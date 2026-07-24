
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { ThemeProvider } from 'next-themes';
import { HelmetProvider } from 'react-helmet-async';

// Components (always loaded)
import AppLayout from './components/layout/AppLayout';
import { RequireAuth } from './components/auth/RequireAuth';
import { RequireAdmin } from './components/auth/RequireAdmin';
import { AdminLayout } from './components/admin/AdminLayout';
import { GlobalErrorBoundary } from './components/ErrorBoundary';
import { CookieConsent } from './components/privacy/CookieConsent';
import { Toaster as ShadcnToaster } from './components/ui/toaster';

// Lazy-loaded pages
const Index = React.lazy(() => import('./pages/Index'));
const Auth = React.lazy(() => import('./pages/Auth'));
const NotFound = React.lazy(() => import('./pages/NotFound'));
const Profile = React.lazy(() => import('./pages/Profile'));
const SearchResults = React.lazy(() => import('./pages/SearchResults'));
const CreateProfile = React.lazy(() => import('./pages/CreateProfile'));
const UploadProfilePicture = React.lazy(() => import('./pages/UploadProfilePicture'));
const HomePage = React.lazy(() => import('./pages/HomePage'));
const AccountSettings = React.lazy(() => import('./pages/AccountSettings'));
const SetAvailabilities = React.lazy(() => import('./pages/SetAvailabilities'));
const CreatePartner = React.lazy(() => import('./pages/CreatePartner'));
const PartnerDashboard = React.lazy(() => import('./pages/PartnerDashboard'));
const PartnerSettings = React.lazy(() => import('./pages/PartnerSettings'));
const CreateAd = React.lazy(() => import('./pages/CreateAd'));
const EditAds = React.lazy(() => import('./pages/EditAds'));
const PartnerBilling = React.lazy(() => import('./pages/PartnerBilling'));
const BuyDayCredits = React.lazy(() => import('./pages/BuyDayCredits'));
const PaymentSuccess = React.lazy(() => import('./pages/PaymentSuccess'));
const ClaimProfile = React.lazy(() => import('./pages/ClaimProfile'));
const Address = React.lazy(() => import('./pages/Address'));
const PartnerAccountSettings = React.lazy(() => import('./pages/PartnerAccountSettings'));
const PrivacyPolicy = React.lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfService = React.lazy(() => import('./pages/TermsOfService'));

// Admin pages (lazy-loaded as a group)
const AdminDashboard = React.lazy(() => import('./pages/admin/AdminDashboard'));
const AdminProfiles = React.lazy(() => import('./pages/admin/AdminProfiles'));
const AdminReports = React.lazy(() => import('./pages/admin/AdminReports'));
const AdminUsers = React.lazy(() => import('./pages/admin/AdminUsers'));
const AdminSettings = React.lazy(() => import('./pages/admin/AdminSettings'));
const AdminBulkImport = React.lazy(() => import('./pages/admin/AdminBulkImport'));
const AdminCreateProfile = React.lazy(() => import('./pages/admin/AdminCreateProfile'));
const AdminInvoices = React.lazy(() => import('./pages/admin/AdminInvoices'));
const MyInvoices = React.lazy(() => import('./pages/MyInvoices'));

// SEO pages — cities
const FindHub = React.lazy(() => import('./pages/seo/FindHub'));
const CityAntwerp = React.lazy(() => import('./pages/seo/cities/Antwerp'));
const CityBrussels = React.lazy(() => import('./pages/seo/cities/Brussels'));
const CityGhent = React.lazy(() => import('./pages/seo/cities/Ghent'));
const CityBruges = React.lazy(() => import('./pages/seo/cities/Bruges'));
const CityLiege = React.lazy(() => import('./pages/seo/cities/Liege'));
const CityLeuven = React.lazy(() => import('./pages/seo/cities/Leuven'));
const CityCharleroi = React.lazy(() => import('./pages/seo/cities/Charleroi'));
const CityNamur = React.lazy(() => import('./pages/seo/cities/Namur'));

// SEO pages — guides + FAQ
const GuidesHub = React.lazy(() => import('./pages/seo/GuidesHub'));
const GuideHowItWorks = React.lazy(() => import('./pages/seo/guides/HowItWorks'));
const GuideSafetyTips = React.lazy(() => import('./pages/seo/guides/SafetyTips'));
const GuideFirstMeeting = React.lazy(() => import('./pages/seo/guides/FirstMeeting'));
const GuideForVisitors = React.lazy(() => import('./pages/seo/guides/ForVisitors'));
const GuideProfileTips = React.lazy(() => import('./pages/seo/guides/ProfileTips'));
const FAQ = React.lazy(() => import('./pages/seo/FAQ'));

// SEO pages — compare + about + safety
const CompareHub = React.lazy(() => import('./pages/seo/CompareHub'));
const CompareVsDatingApps = React.lazy(() => import('./pages/seo/compare/VsDatingApps'));
const CompareVsClassifiedAds = React.lazy(() => import('./pages/seo/compare/VsClassifiedAds'));
const CompareBestPlatforms = React.lazy(() => import('./pages/seo/compare/BestPlatforms'));
const About = React.lazy(() => import('./pages/seo/About'));
const Safety = React.lazy(() => import('./pages/seo/Safety'));

const queryClient = new QueryClient();

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background animate-fade-in">
    <div className="animate-pulse text-muted-foreground">Loading...</div>
  </div>
);

function App() {
  return (
    <GlobalErrorBoundary>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark">
          <Router>
            <AppLayout>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<Index />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/profile/:id" element={<Profile />} />
                <Route path="/search" element={<SearchResults />} />
                <Route path="/claim-profile/:id" element={<ClaimProfile />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/terms" element={<TermsOfService />} />

                {/* SEO pages — cities */}
                <Route path="/find" element={<FindHub />} />
                <Route path="/find/antwerp" element={<CityAntwerp />} />
                <Route path="/find/brussels" element={<CityBrussels />} />
                <Route path="/find/ghent" element={<CityGhent />} />
                <Route path="/find/bruges" element={<CityBruges />} />
                <Route path="/find/liege" element={<CityLiege />} />
                <Route path="/find/leuven" element={<CityLeuven />} />
                <Route path="/find/charleroi" element={<CityCharleroi />} />
                <Route path="/find/namur" element={<CityNamur />} />

                {/* SEO pages — guides + FAQ */}
                <Route path="/guides" element={<GuidesHub />} />
                <Route path="/guides/how-it-works" element={<GuideHowItWorks />} />
                <Route path="/guides/safety-tips" element={<GuideSafetyTips />} />
                <Route path="/guides/first-meeting" element={<GuideFirstMeeting />} />
                <Route path="/guides/for-visitors" element={<GuideForVisitors />} />
                <Route path="/guides/profile-tips" element={<GuideProfileTips />} />
                <Route path="/faq" element={<FAQ />} />

                {/* SEO pages — compare + about + safety */}
                <Route path="/compare" element={<CompareHub />} />
                <Route path="/compare/pinklights-vs-dating-apps" element={<CompareVsDatingApps />} />
                <Route path="/compare/pinklights-vs-classified-ads" element={<CompareVsClassifiedAds />} />
                <Route path="/compare/best-platforms-belgium" element={<CompareBestPlatforms />} />
                <Route path="/about" element={<About />} />
                <Route path="/safety" element={<Safety />} />

                {/* Protected profile routes */}
                <Route path="/create-profile" element={<RequireAuth><CreateProfile /></RequireAuth>} />
                <Route path="/upload-profile-picture" element={<RequireAuth><UploadProfilePicture /></RequireAuth>} />
                <Route path="/home" element={<RequireAuth><HomePage /></RequireAuth>} />
                <Route path="/account-settings" element={<RequireAuth><AccountSettings /></RequireAuth>} />
                <Route path="/set-availabilities" element={<RequireAuth><SetAvailabilities /></RequireAuth>} />
                <Route path="/address" element={<RequireAuth><Address /></RequireAuth>} />
                <Route path="/buy-credits" element={<RequireAuth><BuyDayCredits /></RequireAuth>} />
                <Route path="/payment-success" element={<RequireAuth><PaymentSuccess /></RequireAuth>} />
                <Route path="/invoices" element={<RequireAuth><MyInvoices /></RequireAuth>} />

                {/* Protected partner routes */}
                <Route path="/create-partner" element={<RequireAuth><CreatePartner /></RequireAuth>} />
                <Route path="/partner-dashboard" element={<RequireAuth><PartnerDashboard /></RequireAuth>} />
                <Route path="/partner-settings" element={<RequireAuth><PartnerSettings /></RequireAuth>} />
                <Route path="/create-ad" element={<RequireAuth><CreateAd /></RequireAuth>} />
                <Route path="/edit-ads" element={<RequireAuth><EditAds /></RequireAuth>} />
                <Route path="/partner-billing" element={<RequireAuth><PartnerBilling /></RequireAuth>} />
                <Route path="/partner-account-settings" element={<RequireAuth><PartnerAccountSettings /></RequireAuth>} />

                {/* Admin routes */}
                <Route path="/admin" element={<RequireAdmin><AdminLayout /></RequireAdmin>}>
                  <Route index element={<AdminDashboard />} />
                  <Route path="profiles" element={<AdminProfiles />} />
                  <Route path="reports" element={<AdminReports />} />
                  <Route path="users" element={<AdminUsers />} />
                  <Route path="create-profile" element={<AdminCreateProfile />} />
                  <Route path="edit-profile/:id" element={<AdminCreateProfile />} />
                  <Route path="invoices" element={<AdminInvoices />} />
                  <Route path="bulk-import" element={<AdminBulkImport />} />
                  <Route path="settings" element={<AdminSettings />} />
                </Route>

                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
            </AppLayout>
            <CookieConsent />
            <Toaster position="top-right" richColors />
            <ShadcnToaster />
          </Router>
        </ThemeProvider>
        </QueryClientProvider>
      </HelmetProvider>
    </GlobalErrorBoundary>
  );
}

export default App;

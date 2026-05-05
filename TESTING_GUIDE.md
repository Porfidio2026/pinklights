# Pinklights Platform Testing Guide

This guide walks testers through the three user roles on the platform. Each section is a step-by-step scenario you can follow end-to-end.

**Test environment:** https://your-vercel-domain.vercel.app (or `http://localhost:8081` for local)

---

## Role 1: Profile Owner (Paying User)

You are a companion who wants to create a profile and make it visible to potential clients.

### 1.1 Sign Up

1. Open the app and click **Sign In / Register**
2. On the auth page, switch to the **Register** tab
3. Enter an email and password (min 6 chars)
4. Click **Sign Up**
5. Check your email for a confirmation link and click it
6. You should be redirected back to the app, now authenticated

**Expected:** You land on the profile creation flow.

### 1.2 Create Your Profile

1. Fill in the profile form:
   - Full name
   - Age
   - Gender (Female / Trans)
   - Service type (Private / Outcall / Soft / Ropes)
   - Hair colour, body type, skin tone, breast size
   - About me (short bio)
   - Phone number
2. Click **Continue** or **Save**

**Expected:** Profile saved successfully. You're redirected to the picture upload page.

### 1.3 Upload Profile Pictures

1. Click **Choose Photos** (or the upload area)
2. Select 1-3 images from your device (JPEG, PNG, or WebP — up to 50 MB each)
3. Verify the preview thumbnails appear
4. Click **Upload X Pictures**

**Expected:** "Pictures uploaded successfully" toast. Redirected to set availabilities.

### 1.4 Set Availabilities

1. For each day you're available, add time blocks (e.g., Monday 09:00-17:00)
2. You can add multiple blocks per day
3. Click **Save Availabilities**

**Expected:** Saved successfully. Redirected to your home page.

### 1.5 Set Your Location

1. Navigate to **Address** (from home page or menu)
2. Start typing a Belgian address in the autocomplete field
3. Select an address from the Google suggestions dropdown
4. Wait for the "Location updated" toast

**Expected:** Your profile now has coordinates attached. You'll appear in location-based search results.

### 1.6 Buy Day Credits

1. Navigate to **Buy Credits** (from home page or menu)
2. You'll see your credit balance (starts at 0) and a status banner ("Profile is Hidden")
3. Choose a package:
   - 1 Day — $5.00
   - 7 Days — $25.00
   - 30 Days — $75.00
4. Click the package to purchase
5. You'll be redirected to the DitoBanx payment page
6. Complete the payment (use test card if in sandbox mode)
7. After payment, you're redirected back to the app

**Expected:** Credits appear in your balance.

### 1.7 Activate Visibility

1. On the Buy Credits page, click **Go Live for 24 Hours**
2. One credit is deducted

**Expected:** Status banner changes to "Your Profile is LIVE" with an expiry timestamp. Your profile now appears in search results.

### 1.8 Verify Profile Visibility

1. Open the app in an incognito/private window (not logged in)
2. Go through the search flow (select service → gender → search by location)
3. Your profile should appear in results if you're within the search radius

**Expected:** Profile shows in search with picture, name, distance.

---

## Role 2: Admin

You manage the platform — moderate profiles, handle reports, configure settings.

### 2.1 Log In as Admin

1. Log in with the admin account (must be added to `admin_users` table via SQL)
2. Navigate to `/admin` in the URL bar

**Expected:** You see the Admin Dashboard with navigation to Profiles, Reports, Users, Settings, Bulk Import.

### 2.2 View & Manage Profiles

1. Click **Profiles** in the admin sidebar
2. You should see a list of all profiles with: name, location, gender, featured status, banned status, payment exempt status, visibility expiry

**Test actions:**
- **Feature a profile:** Toggle the "Featured" flag on a profile. Verify it appears first in featured/search results.
- **Ban a profile:** Toggle "Banned" on a profile. Verify it no longer appears in search.
- **Exempt from payment:** Toggle "Payment Exempt." Verify the profile appears in search without needing day credits.

**Expected:** Changes save immediately. Verify effects from a visitor's perspective (incognito window).

### 2.3 Review Reports

1. Click **Reports** in the admin sidebar
2. View any reported content (submitted by visitors via the Report button on profiles)
3. Change status from "Pending" to "Reviewed" or "Dismissed"

**Expected:** Report status updates. Profile remains accessible unless you also ban it.

### 2.4 Manage Users

1. Click **Users** in the admin sidebar
2. View registered accounts

**Expected:** List of auth users with roles/status.

### 2.5 App Settings

1. Click **Settings** in the admin sidebar
2. Toggle **Marketing Mode** on/off

**Expected:** When Marketing Mode is ON, all profiles are visible in search regardless of payment status. When OFF, only paid/exempt/live profiles appear.

### 2.6 Bulk Import

1. Click **Bulk Import** in the admin sidebar
2. Upload a CSV or fill in the bulk import form with profile data
3. Submit

**Expected:** Multiple profiles created at once with associated pictures.

---

## Role 3: Visitor (Profile Searcher)

You are someone browsing the platform to find companions. No account required for browsing.

### 3.1 Landing Page & Search Flow

1. Open the app (no login needed)
2. **Step 1 — Service:** Select a service type (Private, Outcall, Soft, Ropes)
3. **Step 2 — Preference:** Select gender preference (Female / Trans)
4. **Step 3 — Search:** You'll see featured profiles and a search interface

**Expected:** Smooth 3-step flow with back/forward navigation.

### 3.2 Search by Location

1. On Step 3, enter a location (Belgian address) and set a distance radius
2. Click **Search** or wait for auto-search
3. Results show profiles within the radius, sorted by distance

**Expected:** Only profiles that are LIVE (paid/exempt/marketing mode) appear. Each result shows: photo, name, distance, availability status.

### 3.3 Apply Filters

1. In the search interface, apply filters:
   - Hair colour
   - Breast size
   - Skin tone
   - Body type
   - Age range
2. Results update to match your criteria

**Expected:** Filters narrow results correctly. Clearing filters shows all matching profiles again.

### 3.4 View a Profile

1. Click on a profile card in search results
2. View the full profile page with:
   - Photo gallery (swipeable)
   - Bio / About me
   - Physical attributes
   - Availability schedule
   - Location (city-level, not exact address)
   - Reviews from other visitors

**Expected:** All profile data displays correctly. Photos load. Availability blocks show as a readable schedule.

### 3.5 Leave a Review

1. On a profile page, scroll to the Reviews section
2. Fill in:
   - Your name (or pseudonym)
   - Rating (1-5 stars)
   - Written review
3. Submit

**Expected:** Review appears on the profile. No login required.

### 3.6 Report a Profile

1. On a profile page, click the **Report** button
2. Select a reason and optionally add details
3. Submit

**Expected:** "Report submitted" confirmation. The report appears in the admin Reports panel for review.

---

## Quick Reference: Test Accounts

| Role | Email | Password | Notes |
|------|-------|----------|-------|
| Admin | tester1@test.com | Test1234! | Also has a profile; added to admin_users |
| Profile | (create new) | (your choice) | Sign up flow creates this |
| Visitor | — | — | No account needed for browsing |

## Common Issues & Troubleshooting

| Symptom | Likely cause | Fix |
|---------|-------------|-----|
| "Profile is Hidden" even after payment | Day credit not activated | Click "Go Live for 24 Hours" on Buy Credits page |
| Profiles don't appear in search | Marketing mode OFF + no active credits | Admin: enable Marketing Mode, or activate credits |
| Location autocomplete not working | Google Maps API key issue | Check browser console for API errors |
| Payment button gives error | Edge function misconfigured | Check Supabase Edge Functions logs |
| Admin pages redirect to /home | User not in admin_users table | Add via SQL: `insert into admin_users (user_id) values ('...')` |
| Pictures fail to upload | Storage bucket or policy issue | Run `npm run health-check` to diagnose |

## Running the Health Check

To verify the entire infrastructure is correctly wired:

```sh
cd pinklights
npm run health-check
```

This runs 25 automated checks across connectivity, auth, schema, RLS, storage, edge functions, and RPC functions. All should pass before testing.

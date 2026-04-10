# TODO BEN — Pinklights Operator Setup & Deployment

## 1. Supabase Project Setup
- [ ] Create a new Supabase project at https://supabase.com/dashboard
- [ ] Run `supabase/seed.sql` in SQL Editor (creates all tables, RPCs, RLS policies, storage bucket, and seed data)
- [ ] Create 3 auth users in Dashboard > Authentication > Users > Add user:
  - `admin@pinklights.com` / `Test1234!`
  - `user@pinklights.com` / `Test1234!`
  - `partner@pinklights.com` / `Test1234!`
- [ ] Copy each user's UUID from the Auth dashboard
- [ ] Uncomment Section 7 in `supabase/seed.sql`, paste the UUIDs, and run that block
- [ ] Run the migration `supabase/migrations/20260406_day_credits_payment.sql` in SQL Editor (adds payment system on top of seed schema)

## 2. Environment Variables (`.env`)
- [ ] Update `VITE_SUPABASE_URL` with new project URL (Project Settings > API)
- [ ] Update `VITE_SUPABASE_ANON_KEY` with new anon key (Project Settings > API)
- [ ] Add `VITE_GOOGLE_MAPS_API_KEY` for location autocomplete

## 3. Google Maps API Key
- [ ] Create a Google Cloud project (or use existing)
- [ ] Enable Maps JavaScript API + Places API + Directions API
- [ ] Create an API key and restrict it to your domain
- [ ] Add the key to `.env` as `VITE_GOOGLE_MAPS_API_KEY`

## 4. DitoBanx Payment Provider
- [ ] Get production credentials from DitoBanx (merchant key + merchant password)
- [ ] Set Edge Function secrets in Supabase Dashboard > Edge Functions > Secrets:
  - `DITOBANX_API_URL` — DitoBanx API base URL
  - `DITOBANX_MERCHANT_KEY` — your merchant key
  - `DITOBANX_MERCHANT_PASSWORD` — your merchant password
  - `SITE_URL` — your frontend URL (e.g. `https://pinklights.com`)
- [ ] Configure notification/callback URL in DitoBanx admin panel:
  `https://<your-project>.supabase.co/functions/v1/payment-callback`
- [ ] Adjust package prices in `supabase/functions/create-payment/index.ts` (currently placeholder: $5 / $25 / $75)

## 5. Deploy Edge Functions
- [ ] Install Supabase CLI (`npm install -g supabase`)
- [ ] Link project: `supabase link --project-ref <your-project-ref>`
- [ ] Deploy functions:
  - `supabase functions deploy create-payment`
  - `supabase functions deploy payment-callback`
  - `supabase functions deploy calculate-drive-time`
  - `supabase functions deploy generate-about-me`

## 6. Edge Function Secrets (Server-Side)
- [ ] Set `OPENAI_API_KEY` in Supabase Edge Function Secrets (for bio generation)
- [ ] Set `VITE_GOOGLE_MAPS_API_KEY` in Supabase Edge Function Secrets (for drive time calculation)

## 7. Frontend Deployment
- [ ] Choose hosting (Vercel, Netlify, or similar)
- [ ] Set environment variables on hosting platform (same as `.env`)
- [ ] Deploy: `npm run build` and upload `dist/` folder

## 8. Bulk Import Preparation
- [ ] Prepare CSV file with columns: `name`, `description`, `location`, `phone_number`
- [ ] Prepare photo folder structure: one subfolder per phone number, containing that profile's pictures
- [ ] ZIP the photo folders into a single `.zip` file
- [ ] Go to Admin > Bulk Import, upload CSV + ZIP, and run the import
- [ ] After import: use the WhatsApp buttons to notify each profile owner

## 9. WhatsApp Message Content
- [ ] Write the automated WhatsApp message template that will be sent to profile owners after bulk import (currently placeholder text in `src/pages/admin/AdminBulkImport.tsx` — update the `WHATSAPP_MESSAGE` constant)

## 10. Post-Launch
- [ ] Test full payment flow: purchase day credits > activate > verify profile appears in search
- [ ] Test admin tools: toggle payment exempt, enable/disable marketing mode
- [ ] Test callback webhook: verify DitoBanx sends to `/payment-callback` and credits are added
- [ ] Consider enabling marketing mode initially to show all profiles during launch

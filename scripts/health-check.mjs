#!/usr/bin/env node
/**
 * System health check — verifies Supabase infrastructure is correctly wired.
 * Run: npm run health-check
 */

import { readFileSync } from 'fs';
import { resolve } from 'path';

// --- Config -------------------------------------------------------------------

function loadEnv() {
  const envPath = resolve(process.cwd(), '.env');
  try {
    const content = readFileSync(envPath, 'utf-8');
    const vars = {};
    for (const line of content.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eqIdx = trimmed.indexOf('=');
      if (eqIdx === -1) continue;
      vars[trimmed.slice(0, eqIdx).trim()] = trimmed.slice(eqIdx + 1).trim();
    }
    return vars;
  } catch {
    console.error('Could not read .env file. Run from project root.');
    process.exit(1);
  }
}

const env = loadEnv();
const SUPABASE_URL = env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error('Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY in .env');
  process.exit(1);
}

// Test user credentials (set via env or defaults for dev)
const TEST_EMAIL = env.HEALTH_CHECK_EMAIL || 'tester1@test.com';
const TEST_PASSWORD = env.HEALTH_CHECK_PASSWORD || 'Test1234!';

// --- Helpers ------------------------------------------------------------------

let passed = 0;
let failed = 0;

function pass(name, detail) {
  passed++;
  console.log(`  \x1b[32m✓\x1b[0m ${name}${detail ? ` — ${detail}` : ''}`);
}

function fail(name, detail) {
  failed++;
  console.log(`  \x1b[31m✗\x1b[0m ${name}${detail ? ` — ${detail}` : ''}`);
}

async function supabaseGet(path, token) {
  const headers = { apikey: SUPABASE_ANON_KEY };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(`${SUPABASE_URL}${path}`, { headers });
  return { status: res.status, data: await res.json().catch(() => null) };
}

async function supabasePost(path, body, token) {
  const headers = {
    apikey: SUPABASE_ANON_KEY,
    'Content-Type': 'application/json',
  };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(`${SUPABASE_URL}${path}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  });
  return { status: res.status, data: await res.json().catch(() => null) };
}

// --- Checks -------------------------------------------------------------------

async function checkSupabaseReachable() {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/profiles?select=id&limit=0`, {
      headers: { apikey: SUPABASE_ANON_KEY },
    });
    if (res.status === 200) pass('Supabase reachable');
    else fail('Supabase reachable', `HTTP ${res.status}`);
  } catch (e) {
    fail('Supabase reachable', e.message);
  }
}

async function checkAuthSettings() {
  const { status, data } = await supabaseGet('/auth/v1/settings');
  if (status === 200 && data?.external?.email) {
    pass('Auth settings', 'email auth enabled');
  } else {
    fail('Auth settings', `HTTP ${status}`);
  }
}

async function checkLogin() {
  const { status, data } = await supabasePost(
    '/auth/v1/token?grant_type=password',
    { email: TEST_EMAIL, password: TEST_PASSWORD }
  );
  if (status === 200 && data?.access_token) {
    pass('Auth login', `${TEST_EMAIL} authenticated`);
    return data.access_token;
  } else {
    fail('Auth login', data?.msg || data?.error_description || `HTTP ${status}`);
    return null;
  }
}

async function checkTable(table, expectedColumns, token) {
  const select = expectedColumns.join(',');
  const { status, data } = await supabaseGet(
    `/rest/v1/${table}?select=${select}&limit=0`,
    token
  );
  if (status === 200) {
    pass(`Table: ${table}`, `columns [${expectedColumns.join(', ')}] exist`);
    return true;
  } else {
    const msg = data?.message || `HTTP ${status}`;
    fail(`Table: ${table}`, msg);
    return false;
  }
}

async function checkRlsInsertBlocked(token) {
  // A regular user should NOT be able to insert into admin_users
  const { status, data } = await supabasePost(
    '/rest/v1/admin_users',
    { user_id: '00000000-0000-0000-0000-000000000000', role: 'admin' },
    token
  );
  if (status === 403 || status === 401 || (status === 400 && data?.code === '42501')) {
    pass('RLS: admin_users insert blocked for non-owner');
  } else if (status === 409 || (data?.code === '23505')) {
    // Conflict = row exists = insert was attempted (RLS allowed it for admin user)
    pass('RLS: admin_users insert reached DB (user is admin)');
  } else {
    fail('RLS: admin_users insert', `unexpected status ${status}: ${JSON.stringify(data)}`);
  }
}

async function checkStorageBucket(token) {
  const { status } = await supabasePost(
    '/storage/v1/object/list/profile_pictures',
    { prefix: '', limit: 1 },
    token
  );
  if (status === 200) {
    pass('Storage: profile_pictures bucket', 'listable');
  } else {
    fail('Storage: profile_pictures bucket', `HTTP ${status}`);
  }
}

async function checkStorageUpload(token) {
  const testPath = `health-check/${Date.now()}.txt`;
  const res = await fetch(
    `${SUPABASE_URL}/storage/v1/object/profile_pictures/${testPath}`,
    {
      method: 'POST',
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${token}`,
        'Content-Type': 'text/plain',
      },
      body: 'health-check-test',
    }
  );

  if (res.status === 200 || res.status === 201) {
    pass('Storage: upload works');
    // Clean up
    await fetch(
      `${SUPABASE_URL}/storage/v1/object/profile_pictures/${testPath}`,
      {
        method: 'DELETE',
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } else {
    const data = await res.json().catch(() => null);
    fail('Storage: upload', `HTTP ${res.status} ${data?.error || data?.message || ''}`);
  }
}

async function checkEdgeFunction(name, token) {
  const headers = {
    apikey: SUPABASE_ANON_KEY,
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
  try {
    const res = await fetch(`${SUPABASE_URL}/functions/v1/${name}`, {
      method: 'POST',
      headers,
      body: JSON.stringify({}),
    });
    // Any response other than 401/404 means the function is deployed and reachable
    if (res.status !== 401 && res.status !== 404) {
      pass(`Edge function: ${name}`, `responds (HTTP ${res.status})`);
    } else if (res.status === 401) {
      const data = await res.json().catch(() => null);
      if (data?.code === 'UNAUTHORIZED_UNSUPPORTED_TOKEN_ALGORITHM') {
        fail(`Edge function: ${name}`, 'JWT algorithm rejected — redeploy with --no-verify-jwt');
      } else {
        fail(`Edge function: ${name}`, `401 — ${data?.error || 'unauthorized'}`);
      }
    } else {
      fail(`Edge function: ${name}`, 'not deployed (404)');
    }
  } catch (e) {
    fail(`Edge function: ${name}`, e.message);
  }
}

async function checkRpcFunction(name, params, token) {
  const { status, data } = await supabasePost(`/rest/v1/rpc/${name}`, params, token);
  if (status === 200) {
    pass(`RPC: ${name}`, 'callable');
  } else {
    const msg = data?.message || data?.hint || `HTTP ${status}`;
    fail(`RPC: ${name}`, msg);
  }
}

// --- Main ---------------------------------------------------------------------

async function main() {
  console.log('\n\x1b[1mPinklights Health Check\x1b[0m');
  console.log(`Target: ${SUPABASE_URL}\n`);

  // 1. Connectivity
  console.log('\x1b[1m1. Connectivity\x1b[0m');
  await checkSupabaseReachable();
  await checkAuthSettings();

  // 2. Authentication
  console.log('\n\x1b[1m2. Authentication\x1b[0m');
  const token = await checkLogin();
  if (!token) {
    console.log('\n  Cannot continue without auth token. Fix login first.\n');
    process.exit(1);
  }

  // 3. Tables & Schema
  console.log('\n\x1b[1m3. Tables & Schema\x1b[0m');
  await checkTable('profiles', ['id', 'full_name', 'location', 'gender', 'is_banned', 'payment_exempt', 'visibility_expires_at', 'user_id'], token);
  await checkTable('admin_users', ['id', 'user_id', 'role', 'created_at'], token);
  await checkTable('credits', ['id', 'user_id', 'balance'], token);
  await checkTable('credit_transactions', ['id', 'user_id', 'amount', 'type'], token);
  await checkTable('partners', ['id', 'user_id'], token);
  await checkTable('partner_ads', ['id', 'partner_id', 'title', 'is_active'], token);
  await checkTable('profile_pictures', ['id', 'profile_id', 'picture_url'], token);
  await checkTable('availabilities', ['id', 'profile_id', 'day_of_week', 'hour'], token);
  await checkTable('reviews', ['id', 'profile_id', 'rating', 'text'], token);
  await checkTable('reported_content', ['id', 'profile_id', 'reason', 'status'], token);
  await checkTable('cached_coordinates', ['id', 'address', 'latitude', 'longitude'], token);
  await checkTable('app_settings', ['key', 'value'], token);
  await checkTable('payment_sessions', ['id', 'user_id', 'order_number', 'status'], token);

  // 4. RLS Policies
  console.log('\n\x1b[1m4. RLS Policies\x1b[0m');
  await checkRlsInsertBlocked(token);

  // 5. Storage
  console.log('\n\x1b[1m5. Storage\x1b[0m');
  await checkStorageBucket(token);
  await checkStorageUpload(token);

  // 6. Edge Functions
  console.log('\n\x1b[1m6. Edge Functions\x1b[0m');
  await checkEdgeFunction('create-payment', token);
  await checkEdgeFunction('payment-callback', token);
  await checkEdgeFunction('calculate-drive-time', token);
  await checkEdgeFunction('generate-about-me', token);

  // 7. RPC Functions
  console.log('\n\x1b[1m7. RPC Functions\x1b[0m');
  await checkRpcFunction('get_featured_profiles', {}, token);
  await checkRpcFunction('search_nearby_profiles', { search_lat: 50.85, search_lon: 4.35, max_distance_km: 50 }, token);

  // Summary
  console.log(`\n\x1b[1mResult: ${passed} passed, ${failed} failed\x1b[0m\n`);
  process.exit(failed > 0 ? 1 : 0);
}

main().catch((e) => {
  console.error('Health check crashed:', e);
  process.exit(1);
});

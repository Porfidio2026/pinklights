import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import type { EmailOtpType } from '@supabase/supabase-js';

/**
 * Exchanges a magic-link token for a session.
 *
 * Invites are sent as pink-lights.be/auth/confirm?token_hash=...&type=magiclink
 * rather than the raw Supabase action_link, so recipients see our domain. The
 * token is single use, so the exchange must run exactly once.
 */
const AuthConfirm = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const exchanged = useRef(false);

  useEffect(() => {
    // Guard against React running the effect twice (StrictMode): the second
    // call would consume an already-spent token and report a bogus failure.
    if (exchanged.current) return;
    exchanged.current = true;

    const tokenHash = params.get('token_hash');
    const type = (params.get('type') || 'magiclink') as EmailOtpType;

    if (!tokenHash) {
      setError('This link is missing its token. Ask for a new invite link.');
      return;
    }

    supabase.auth
      .verifyOtp({ token_hash: tokenHash, type })
      .then(({ error: verifyError }) => {
        if (verifyError) {
          setError(
            verifyError.message.toLowerCase().includes('expired')
              ? 'This link has expired or was already used. Ask for a new invite link.'
              : verifyError.message,
          );
          return;
        }
        navigate('/home', { replace: true });
      });
  }, [params, navigate]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-5 text-center gap-4">
      {error ? (
        <>
          <h1 className="text-2xl font-bold font-display">Link not valid</h1>
          <p className="text-muted-foreground max-w-sm">{error}</p>
          <Button onClick={() => navigate('/auth')}>Go to sign in</Button>
        </>
      ) : (
        <>
          <h1 className="text-2xl font-bold font-display">Signing you in…</h1>
          <p className="text-muted-foreground">One moment.</p>
        </>
      )}
    </div>
  );
};

export default AuthConfirm;

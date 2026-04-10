
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const ProfileAuthForm = () => {
  return (
    <Card className="bg-card/80 backdrop-blur-xl rounded-lg border border-border">
      <CardHeader>
        <CardTitle className="text-center">Profile User Login</CardTitle>
        <CardDescription className="text-center">Sign in to manage your personal profile</CardDescription>
      </CardHeader>
      <CardContent>
        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: 'hsl(330 65% 58%)',
                  brandAccent: 'hsl(330 65% 48%)',
                  inputBorder: 'hsl(0 0% 20%)',
                  inputBackground: 'hsl(0 0% 11%)',
                  inputText: 'hsl(0 0% 95%)',
                  inputLabelText: 'hsl(0 0% 55%)',
                  inputPlaceholder: 'hsl(0 0% 40%)',
                },
                radii: {
                  borderRadiusButton: '0.75rem',
                },
              },
            },
            style: {
              button: {
                background: 'hsl(330 65% 58%)',
                border: 'none',
                color: 'hsl(0 0% 100%)',
              },
              input: {
                borderRadius: '0.75rem',
                background: 'hsl(0 0% 11%)',
                color: 'hsl(0 0% 95%)',
              },
              anchor: {
                color: 'hsl(330 65% 58%)',
              },
              label: {
                color: 'hsl(0 0% 55%)',
              },
              container: {
                background: 'transparent',
              },
            },
          }}
          theme="default"
          providers={['google']}
          redirectTo={`${window.location.origin}/auth`}
        />
      </CardContent>
    </Card>
  );
};

export default ProfileAuthForm;

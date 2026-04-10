
import { useState } from 'react';
import ProfileAuthForm from '@/components/auth/ProfileAuthForm';
import PartnerAuthForm from '@/components/auth/PartnerAuthForm';
import AuthLayout from '@/components/auth/AuthLayout';
import { useAuthRedirect } from '@/hooks/useAuthRedirect';

const AuthPage = () => {
  const [userType, setUserType] = useState<'profile' | 'partner'>('profile');
  
  // Use the hook for authentication and redirection logic
  useAuthRedirect(userType);

  const handleUserTypeChange = (value: string) => {
    setUserType(value as 'profile' | 'partner');
  };

  return (
    <AuthLayout
      defaultValue={userType}
      onValueChange={handleUserTypeChange}
      profileContent={<ProfileAuthForm />}
      partnerContent={<PartnerAuthForm />}
    />
  );
};

export default AuthPage;

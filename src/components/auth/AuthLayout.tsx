
import { ReactNode } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Users } from 'lucide-react';

interface AuthLayoutProps {
  defaultValue: 'profile' | 'partner';
  onValueChange: (value: string) => void;
  profileContent: ReactNode;
  partnerContent: ReactNode;
}

const AuthLayout = ({ 
  defaultValue, 
  onValueChange, 
  profileContent, 
  partnerContent 
}: AuthLayoutProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md space-y-8 fade-in">
        <div className="text-center">
          <h2 className="mt-6 text-4xl font-bold text-primary font-display">Welcome</h2>
          <p className="mt-2 text-muted-foreground">Sign in or create an account</p>
        </div>
        
        <Tabs 
          defaultValue={defaultValue} 
          className="w-full" 
          onValueChange={onValueChange}
        >
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>Profile User</span>
            </TabsTrigger>
            <TabsTrigger value="partner" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>Partner</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            {profileContent}
          </TabsContent>
          
          <TabsContent value="partner">
            {partnerContent}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AuthLayout;

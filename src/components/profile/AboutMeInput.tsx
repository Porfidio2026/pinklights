
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from '@/lib/supabase';
import { ProfileFormData } from '@/hooks/useProfileForm';

interface AboutMeInputProps {
  formData: ProfileFormData;
  setFormData: (data: ProfileFormData) => void;
}

export const AboutMeInput: React.FC<AboutMeInputProps> = ({ formData, setFormData }) => {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);

  const generateAboutMe = async () => {
    if (!formData.about_me?.trim()) {
      toast({
        title: "Error",
        description: "Please enter some keywords about yourself first.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsGenerating(true);
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('Authentication required');

      const response = await supabase.functions.invoke('generate-about-me', {
        body: {
          keywords: formData.about_me,
        },
      });

      if (response.error) {
        console.error('OpenAI API error:', response.error);
        throw response.error;
      }
      
      const { data } = response;

      if (!data?.generatedText) {
        throw new Error('No text was generated');
      }
      
      setFormData({ ...formData, about_me: data.generatedText });
      
      toast({
        title: "Success",
        description: "About me text generated successfully",
      });
    } catch (error) {
      console.error('Generate about me error:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to generate about me text. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label>About Me</label>
        <div className="flex gap-2">
          <Textarea
            value={formData.about_me}
            onChange={(e) => setFormData({ ...formData, about_me: e.target.value })}
            placeholder="Give us some keywords about who you are, and we'll create a sexy bio for you."
            required
          />
          <Button 
            type="button" 
            onClick={generateAboutMe} 
            variant="outline"
            disabled={isGenerating}
          >
            {isGenerating ? 'Generating...' : 'Generate'}
          </Button>
        </div>
      </div>
    </div>
  );
};

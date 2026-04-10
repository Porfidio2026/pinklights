
import React from 'react';
import { Input } from "@/components/ui/input";
import { ProfileFormData } from '@/hooks/useProfileForm';

interface CharacteristicsInputProps {
  formData: ProfileFormData;
  setFormData: (data: ProfileFormData) => void;
}

export const CharacteristicsInput: React.FC<CharacteristicsInputProps> = ({ formData, setFormData }) => {
  // Predefined options for dropdowns
  const hairColours = ["Blonde", "Dark", "Red", "Coloured"];

  const breastSizes = [
    "A Cup", "B Cup", "C Cup", "D Cup", 
    "DD Cup", "E Cup", "F Cup", "G Cup", 
    "H Cup", "I Cup", "J Cup"
  ];

  const skinTones = ["Light", "Brown", "Dark"];

  const bodyTypes = ["Petite", "Medium", "Large", "XL"];

  const flowerTypes = ["Roses", "Tulips", "Sunflowers", "Orchids", "Peonies"];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <label>Hair Colour</label>
        <Input
          value={formData.hair_colour}
          onChange={(e) => setFormData({ ...formData, hair_colour: e.target.value })}
          required
          list="hairColours"
          className="bg-background"
          placeholder="Select hair colour"
        />
        <datalist id="hairColours">
          {hairColours.map((colour) => (
            <option key={colour} value={colour} />
          ))}
        </datalist>
      </div>

      <div className="space-y-2">
        <label>Breast Size</label>
        <Input
          value={formData.breast_size}
          onChange={(e) => setFormData({ ...formData, breast_size: e.target.value })}
          required
          list="breastSizes"
          className="bg-background"
          placeholder="Select breast size"
        />
        <datalist id="breastSizes">
          {breastSizes.map((size) => (
            <option key={size} value={size} />
          ))}
        </datalist>
      </div>

      <div className="space-y-2">
        <label>Skin Tone</label>
        <Input
          value={formData.skin_tone}
          onChange={(e) => setFormData({ ...formData, skin_tone: e.target.value })}
          required
          list="skinTones"
          className="bg-background"
          placeholder="Select skin tone"
        />
        <datalist id="skinTones">
          {skinTones.map((tone) => (
            <option key={tone} value={tone} />
          ))}
        </datalist>
      </div>

      <div className="space-y-2">
        <label>Body Type</label>
        <Input
          value={formData.body_type}
          onChange={(e) => setFormData({ ...formData, body_type: e.target.value })}
          required
          list="bodyTypes"
          className="bg-background"
          placeholder="Select body type"
        />
        <datalist id="bodyTypes">
          {bodyTypes.map((type) => (
            <option key={type} value={type} />
          ))}
        </datalist>
      </div>

      <div className="space-y-2">
        <label>Favorite Flower</label>
        <Input
          value={formData.favorite_flower}
          onChange={(e) => setFormData({ ...formData, favorite_flower: e.target.value })}
          required
          list="flowerTypes"
          className="bg-background"
          placeholder="Select favorite flower"
        />
        <datalist id="flowerTypes">
          {flowerTypes.map((flower) => (
            <option key={flower} value={flower} />
          ))}
        </datalist>
      </div>
    </div>
  );
};

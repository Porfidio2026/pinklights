
/**
 * Types for email settings component
 */
export interface EmailSettingsProps {
  email: string;
  onSuccess?: () => void;
}

/**
 * Types for phone settings component
 */
export interface PhoneSettingsProps {
  phone: string;
  onSuccess?: () => void;
}

/**
 * Types for password settings component
 */
export interface PasswordSettingsProps {
  onSuccess?: () => void;
}

/**
 * Types for form data
 */
export interface PasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

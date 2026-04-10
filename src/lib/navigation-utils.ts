
/**
 * Navigation utilities for authentication flows
 */

// Function to navigate to auth page
export const navigateToAuth = () => {
  // Use window.location for a hard redirect to ensure clean state
  window.location.href = '/auth';
};

// Function to navigate to home page
export const navigateToHome = () => {
  window.location.href = '/home';
};

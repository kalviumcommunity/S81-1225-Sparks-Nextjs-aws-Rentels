/**
 * Toast utility helpers for consistent toast notifications across the application.
 * 
 * This module re-exports react-hot-toast with custom default configurations
 * to ensure consistent styling and behavior throughout the app.
 * 
 * @example
 * ```tsx
 * import { toast } from '@/lib/toast';
 * 
 * // Success notification
 * toast.success('User created successfully!');
 * 
 * // Error notification
 * toast.error('Failed to save data');
 * 
 * // Loading notification
 * const toastId = toast.loading('Saving...');
 * // Later dismiss it
 * toast.dismiss(toastId);
 * 
 * // Promise-based toast
 * toast.promise(
 *   saveData(),
 *   {
 *     loading: 'Saving...',
 *     success: 'Data saved!',
 *     error: 'Failed to save',
 *   }
 * );
 * ```
 */

import { default as hotToast, type Toast } from 'react-hot-toast';

/**
 * Re-export the toast function with default configuration
 */
export const toast = hotToast;

/**
 * Re-export Toast type for use in components
 */
export type { Toast };

/**
 * Default toast configuration
 * Applied globally via the Toaster component in layout.tsx
 */
export const toastConfig = {
  duration: 4000, // 4 seconds
  position: 'top-center' as const,
  
  // Styling
  style: {
    background: '#363636',
    color: '#fff',
    padding: '16px',
    borderRadius: '8px',
    fontSize: '14px',
    maxWidth: '500px',
  },
  
  // Success toast styling
  success: {
    duration: 3000,
    iconTheme: {
      primary: '#10b981',
      secondary: '#fff',
    },
  },
  
  // Error toast styling
  error: {
    duration: 5000,
    iconTheme: {
      primary: '#ef4444',
      secondary: '#fff',
    },
  },
  
  // Loading toast styling
  loading: {
    iconTheme: {
      primary: '#3b82f6',
      secondary: '#fff',
    },
  },
};

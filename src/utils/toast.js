import toast from 'react-hot-toast';

/**
 * Utility functions for common toast notifications
 */

export const showSuccessToast = (message) => {
  toast.success(message);
};

export const showErrorToast = (message) => {
  toast.error(message);
};

export const showInfoToast = (message) => {
  toast(message, {
    icon: 'ℹ️',
  });
};

export const showLoadingToast = (message) => {
  return toast.loading(message);
};

export const dismissToast = (toastId) => {
  toast.dismiss(toastId);
};

/**
 * Show a promise toast that handles loading, success, and error states
 * @param {Promise} promise - The promise to track
 * @param {Object} messages - Object with loading, success, and error messages
 */
export const showPromiseToast = (promise, messages) => {
  return toast.promise(promise, {
    loading: messages.loading || 'Loading...',
    success: messages.success || 'Success!',
    error: messages.error || 'Something went wrong!',
  });
};

/**
 * Extract error message from API error response
 * @param {Error} error - The error object from API
 * @param {string} defaultMessage - Default message if no error message found
 */
export const getErrorMessage = (error, defaultMessage = 'An error occurred') => {
  return error.response?.data?.message || error.message || defaultMessage;
};

/**
 * Consolidated toast object for easier imports
 */
export const showToast = {
  success: showSuccessToast,
  error: showErrorToast,
  info: showInfoToast,
  loading: showLoadingToast,
  promise: showPromiseToast,
  dismiss: dismissToast,
};

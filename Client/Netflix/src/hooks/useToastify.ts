import { useEffect, useMemo } from "react";
import { FieldErrors } from "react-hook-form";
import { ToastOptions as ReactToastifyOptions, toast } from "react-toastify";

type ToastPosition =
  | "top-right"
  | "top-center"
  | "top-left"
  | "bottom-right"
  | "bottom-center"
  | "bottom-left";
type ToastTheme = "light" | "dark" | "colored";

type ToastOptions = {
  position?: ToastPosition;
  autoClose?: number;
  hideProgressBar?: boolean;
  closeOnClick?: boolean;
  pauseOnHover?: boolean;
  draggable?: boolean;
  theme?: ToastTheme;
};

interface UseToastFormProps<TFormValues extends Record<string, unknown>> {
  formErrors: FieldErrors<TFormValues>;
  serverError?: string | null;
  successMessage?: string | null;
  options?: ToastOptions;
}

/**
 * Custom hook to handle form toast notifications
 *
 * @param formErrors - Form validation errors from react-hook-form
 * @param serverError - Error message from server/API response
 * @param successMessage - Success message to show on successful submission
 * @param options - Toast configuration options
 */
const useToastForm = <TFormValues extends Record<string, unknown>>({
  formErrors,
  serverError,
  successMessage,
  options = {},
}: UseToastFormProps<TFormValues>) => {
  // Memoize the options object to prevent unnecessary re-renders
  const defaultOptions = useMemo(
    () =>
      ({
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        ...options,
      } as ReactToastifyOptions),
    [options],
  );

  // Handle form validation errors
  useEffect(() => {
    const errorMessages = Object.values(formErrors)
      .map((err) => err?.message)
      .filter((message): message is string => typeof message === "string");

    // Only show the first error to avoid overwhelming the user
    if (errorMessages.length > 0) {
      toast.error(errorMessages[0], defaultOptions);
    }
  }, [formErrors, defaultOptions]);

  // Handle server errors
  useEffect(() => {
    if (serverError) {
      toast.error(serverError, defaultOptions);
    }
  }, [serverError, defaultOptions]);

  // Handle success message
  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage, {
        ...defaultOptions,
        autoClose: 3000, // Success messages can be shorter
      });
    }
  }, [successMessage, defaultOptions]);

  // Helper functions to manually trigger toasts
  const showSuccessToast = (message: string) => {
    toast.success(message, defaultOptions);
  };

  const showErrorToast = (message: string) => {
    toast.error(message, defaultOptions);
  };

  const showInfoToast = (message: string) => {
    toast.info(message, defaultOptions);
  };

  const showWarningToast = (message: string) => {
    toast.warning(message, defaultOptions);
  };

  return {
    showSuccessToast,
    showErrorToast,
    showInfoToast,
    showWarningToast,
  };
};

export default useToastForm;

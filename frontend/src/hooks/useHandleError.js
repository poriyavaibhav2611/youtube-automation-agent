import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { MessageBox } from "../components/ui/MessageBox";
import { removeCookie } from "../utils/cookies";
import * as authService from "../services/authService";

let suppressErrorToastsUntil = 0;
let sessionExpiryToastShownUntil = 0;

const isToastSuppressed = () => Date.now() < suppressErrorToastsUntil;
const canShowSessionExpiryToast = () => Date.now() >= sessionExpiryToastShownUntil;

export const useHandleError = () => {

  const navigate = useNavigate();

  const handleError = useCallback((error, isHandleErrorCode = true, skipToast = false) => {
    if (isHandleErrorCode) {
      if (error?.response) {
        const data = error.response.data || {};
        const apiMessage = data.message || data.detail || data.errors || data.error;

        if (error.response.status === 429) return;

        if (error.response.status === 401) {
          suppressErrorToastsUntil = Date.now() + 3000;
          const shouldShowSessionToast = canShowSessionExpiryToast();
          sessionExpiryToastShownUntil = Date.now() + 3000;

          const proceedToLogout = () => {
            removeCookie('token');
            removeCookie('username');
            if (shouldShowSessionToast) {
              toast.dismiss();
              MessageBox('error', apiMessage || 'Session expired, please sign in again.');
            }
            navigate('/login', { replace: true });
          };

          proceedToLogout();
          return;
        }

        if (!skipToast && !isToastSuppressed()) {
          MessageBox('error', apiMessage || 'Something went wrong, please try again.');
        }
      } else {
        if (!skipToast && !isToastSuppressed()) {
          MessageBox('error', error?.message || 'Something went wrong, please try again.');
        }
      }
    }
  }, [navigate]);

  return { handleError };
};

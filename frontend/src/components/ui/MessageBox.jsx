import React from 'react';
import { toast } from 'react-toastify';
import { CheckCircle2, AlertCircle, AlertTriangle, Info } from 'lucide-react';

const toastOptions = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: true,
  closeOnClick: true,
  closeButton: false,
  draggable: true,
  pauseOnHover: true,
  className: (context) => `set-message-box set-message-box--${context?.type || 'default'}`,
  bodyClassName: 'set-message-box__body',
};

const toastIcons = {
  success: <CheckCircle2 size={18} strokeWidth={2} color="#d4ff32" />,
  error: <AlertCircle size={18} strokeWidth={2} color="#ef4444" />,
  warn: <AlertTriangle size={18} strokeWidth={2} color="#f59e0b" />,
  info: <Info size={18} strokeWidth={2} color="#3b82f6" />,
};

export const MessageBox = (type, message) => {
  if (type && message) {
    if (type === 'success') toast.success(message, { ...toastOptions, icon: toastIcons.success });
    if (type === 'error') toast.error(message, { ...toastOptions, icon: toastIcons.error });
    if (type === 'warn') toast.warn(message, { ...toastOptions, icon: toastIcons.warn });
    if (type === 'info') toast.info(message, { ...toastOptions, icon: toastIcons.info });
  }
};

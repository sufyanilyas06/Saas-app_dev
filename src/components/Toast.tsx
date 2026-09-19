import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, AlertTriangle, Info, X } from 'lucide-react';
import { ToastMessage } from '../types';

export interface ToastProps {
  id: string;
  message: string;
  type?: 'success' | 'warning' | 'info';
}

interface ToastComponentProps {
  toast: ToastMessage | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastComponentProps> = ({ toast, onClose }) => {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onClose();
    }, 2800);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  return (
    <div className="fixed top-16 left-4 right-4 z-50 pointer-events-none flex flex-col items-center">
      <AnimatePresence>
        <motion.div
          key={toast.id}
          initial={{ opacity: 0, y: -15, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -15, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="pointer-events-auto bg-[#0b1c30] text-[#eaf1ff] px-3.5 py-2.5 rounded-xl shadow-2xl flex items-center justify-between gap-3 max-w-md w-full border border-white/10 backdrop-blur-md"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            {toast.type === 'warning' ? (
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
            ) : toast.type === 'info' ? (
              <Info className="w-4 h-4 text-[#85f8c4] shrink-0" />
            ) : (
              <CheckCircle className="w-4 h-4 text-[#85f8c4] shrink-0" />
            )}
            <span className="text-xs font-medium text-white line-clamp-2">
              {toast.message}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-white/60 hover:text-white transition-colors p-1 rounded-lg"
            aria-label="Dismiss notification"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

interface ToastContainerProps {
  toasts: ToastProps[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onDismiss }) => {
  return (
    <div className="fixed bottom-24 left-4 right-4 z-50 pointer-events-none flex flex-col items-center gap-2">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-auto bg-[#213145] text-[#eaf1ff] px-4 py-3 rounded-xl shadow-2xl flex items-center justify-between gap-3 max-w-md w-full border border-white/10"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              {toast.type === 'warning' ? (
                <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
              ) : toast.type === 'info' ? (
                <Info className="w-5 h-5 text-sky-400 shrink-0" />
              ) : (
                <CheckCircle className="w-5 h-5 text-[#85f8c4] shrink-0" />
              )}
              <span className="text-sm font-medium tracking-tight text-white line-clamp-2">
                {toast.message}
              </span>
            </div>
            <button
              onClick={() => onDismiss(toast.id)}
              className="text-white/60 hover:text-white transition-colors p-1 rounded-lg"
              aria-label="Dismiss toast"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};


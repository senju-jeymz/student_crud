import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  const isSuccess = toast.type === 'success';
  const isError = toast.type === 'error';

  return (
    <div className="fixed top-20 right-4 sm:right-6 z-50 transition-all transform animate-in fade-in slide-in-from-top-4 duration-300">
      <div
        className={`flex items-start gap-3 p-4 rounded-xl shadow-lg border max-w-md ${
          isSuccess
            ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
            : isError
            ? 'bg-rose-50 border-rose-200 text-rose-900'
            : 'bg-indigo-50 border-indigo-200 text-indigo-900'
        }`}
      >
        <div className="shrink-0 mt-0.5">
          {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
          {isError && <AlertCircle className="w-5 h-5 text-rose-600" />}
          {!isSuccess && !isError && <Info className="w-5 h-5 text-indigo-600" />}
        </div>
        <div className="flex-1 text-sm font-medium">{toast.message}</div>
        <button
          onClick={onClose}
          className="shrink-0 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

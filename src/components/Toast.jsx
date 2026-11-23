import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Toast() {
  const { toast } = useApp();

  if (!toast) return null;

  const isSuccess = toast.type === 'success';
  const isError = toast.type === 'error';

  return (
    <div className="fixed bottom-4 sm:bottom-6 left-4 right-4 sm:left-auto sm:right-6 z-50 max-w-md animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className={`flex items-start gap-3 p-4 rounded-2xl shadow-xl border backdrop-blur-md ${
        isSuccess
          ? 'bg-zinc-900/95 text-white border-zinc-700/80'
          : isError
          ? 'bg-rose-900/95 text-white border-rose-700'
          : 'bg-zinc-900/95 text-white border-zinc-700'
      }`}>
        <div className="mt-0.5">
          {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
          {isError && <AlertCircle className="w-5 h-5 text-rose-400" />}
          {!isSuccess && !isError && <Info className="w-5 h-5 text-blue-400" />}
        </div>
        <div className="flex-1 text-sm font-medium pr-2">
          {toast.message}
        </div>
      </div>
    </div>
  );
}

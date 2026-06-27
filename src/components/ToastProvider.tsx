"use client";

import React, { useState, useEffect } from "react";
import { toastSystem, ToastType } from "@/lib/toastEvent";
import { Terminal, ShieldCheck, Cpu } from "lucide-react";

interface ToastData {
  id: string;
  message: string;
  type: ToastType;
}

export default function ToastProvider() {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  useEffect(() => {
    const unsubscribe = toastSystem.subscribe((message, type = "info") => {
      const id =
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

      setToasts((prev) => [...prev, { id, message, type }]);

      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 4000);
    });

    // Clean, direct unmount reference mapping safely returning void
    return () => unsubscribe();
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 w-full max-w-sm pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="animate-slide-up pointer-events-auto flex items-start gap-3 p-4 bg-neutral-900/90 backdrop-blur-md border border-neutral-800 rounded-xl shadow-2xl transition-all duration-300"
        >
          {toast.type === "atomic" && (
            <Cpu className="text-amber-500 shrink-0 mt-0.5" size={16} />
          )}
          {toast.type === "success" && (
            <ShieldCheck
              className="text-emerald-500 shrink-0 mt-0.5"
              size={16}
            />
          )}
          {toast.type === "info" && (
            <Terminal className="text-blue-400 shrink-0 mt-0.5" size={16} />
          )}

          <div className="flex-1">
            <span className="text-[10px] uppercase font-mono text-neutral-500 block tracking-wider">
              System Telemetry / {toast.type}
            </span>
            <p className="text-xs font-mono text-neutral-200 mt-0.5 leading-relaxed">
              {toast.message}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

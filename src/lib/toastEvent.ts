export type ToastType = "info" | "success" | "atomic" | "error" | "warning";

export type ToastCallback = (message: string, type?: ToastType) => void;

class ToastEventManager {
  private listeners: Set<ToastCallback> = new Set();

  subscribe(callback: ToastCallback) {
    this.listeners.add(callback);
    // ⚡ DEFINITIVE FIX: Wrap the delete invocation inside curly braces
    // to discard the implicit Set boolean and return clean 'void'
    return () => {
      this.listeners.delete(callback);
    };
  }

  emit(message: string, type: ToastType = "info") {
    this.listeners.forEach((callback) => callback(message, type));
  }
}

export const toastSystem = new ToastEventManager();

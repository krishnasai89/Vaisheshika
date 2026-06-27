type ToastCallback = (
  message: string,
  type?: "info" | "success" | "atomic",
) => void;

class ToastEventManager {
  private listeners: Set<ToastCallback> = new Set();

  subscribe(callback: ToastCallback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  emit(message: string, type: "info" | "success" | "atomic" = "info") {
    this.listeners.forEach((callback) => callback(message, type));
  }
}

export const toastSystem = new ToastEventManager();

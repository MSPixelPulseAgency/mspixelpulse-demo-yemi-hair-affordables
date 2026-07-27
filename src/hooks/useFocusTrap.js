import { useEffect } from "react";

export function useFocusTrap(ref, active, onClose) {
  useEffect(() => {
    if (!active || !ref.current) return undefined;
    const previous = document.activeElement;
    const root = ref.current;
    const getFocusable = () => [...root.querySelectorAll("a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex='-1'])")];
    getFocusable()[0]?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose?.();
      if (event.key !== "Tab") return;
      const focusable = getFocusable();
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.classList.add("no-scroll");
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.classList.remove("no-scroll");
      previous?.focus?.();
    };
  }, [active, onClose, ref]);
}

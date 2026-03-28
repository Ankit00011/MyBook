import { useEffect } from "react";

const ModalLayout = ({ isOpen, close, children }) => {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleEsc = (event) => {
      if (event.key === "Escape") {
        close();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEsc);

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, close]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="premium-modal" role="dialog" aria-modal="true">
      <button
        type="button"
        aria-label="Close dialog"
        className="premium-modal-backdrop"
        onClick={close}
      />
      <div className="premium-modal-panel">
        <div className="flex justify-end pb-2">
          <button type="button" onClick={close} className="premium-btn-outline px-3 py-1">
            Close
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default ModalLayout;

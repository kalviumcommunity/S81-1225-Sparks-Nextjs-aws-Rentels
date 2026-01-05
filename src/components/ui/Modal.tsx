/**
 * Modal Component
 *
 * A fully accessible modal dialog component with focus trap and keyboard support.
 * Follows WAI-ARIA best practices for dialog accessibility.
 *
 * @example
 * ```tsx
 * const [isOpen, setIsOpen] = useState(false);
 *
 * <Modal
 *   isOpen={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   title="Confirm Delete"
 *   description="Are you sure you want to delete this item?"
 * >
 *   <div className="flex gap-2">
 *     <button onClick={() => setIsOpen(false)}>Cancel</button>
 *     <button onClick={handleDelete}>Delete</button>
 *   </div>
 * </Modal>
 * ```
 */

"use client";

import React, { useEffect, useRef } from "react";

export interface ModalProps {
  /**
   * Whether the modal is open
   */
  isOpen: boolean;

  /**
   * Callback when the modal should close
   */
  onClose: () => void;

  /**
   * Modal title (required for accessibility)
   */
  title: string;

  /**
   * Optional description for additional context
   */
  description?: string;

  /**
   * Modal content
   */
  children: React.ReactNode;

  /**
   * Additional CSS classes for the modal content
   */
  className?: string;

  /**
   * If true, clicking the backdrop will not close the modal
   * @default false
   */
  disableBackdropClick?: boolean;
}

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  className = "",
  disableBackdropClick = false,
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // Handle Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  // Focus trap and body scroll lock
  useEffect(() => {
    if (!isOpen) return;

    // Save the currently focused element
    previousActiveElement.current = document.activeElement as HTMLElement;

    // Prevent body scroll
    document.body.style.overflow = "hidden";

    // Focus the modal
    if (modalRef.current) {
      const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      if (focusableElements.length > 0) {
        focusableElements[0].focus();
      }

      // Focus trap
      const handleTab = (event: KeyboardEvent) => {
        if (event.key !== "Tab") return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey) {
          // Shift + Tab
          if (document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
          }
        } else {
          // Tab
          if (document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
          }
        }
      };

      document.addEventListener("keydown", handleTab);

      return () => {
        document.removeEventListener("keydown", handleTab);
        document.body.style.overflow = "";

        // Restore focus to the previously focused element
        if (previousActiveElement.current) {
          previousActiveElement.current.focus();
        }
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (disableBackdropClick) return;
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby={description ? "modal-description" : undefined}
    >
      <div
        ref={modalRef}
        className={`relative w-full max-w-md rounded-lg bg-white p-6 shadow-xl dark:bg-gray-800 ${className}`}
        role="document"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-300"
          aria-label="Close modal"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Title */}
        <h2
          id="modal-title"
          className="mb-4 text-xl font-semibold text-gray-900 dark:text-white"
        >
          {title}
        </h2>

        {/* Description */}
        {description && (
          <p
            id="modal-description"
            className="mb-6 text-sm text-gray-600 dark:text-gray-400"
          >
            {description}
          </p>
        )}

        {/* Content */}
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
}

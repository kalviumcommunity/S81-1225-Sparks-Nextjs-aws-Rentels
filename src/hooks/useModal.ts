/**
 * useModal Hook
 *
 * A custom hook for managing modal state.
 * Provides open, close, and toggle functions for modal dialogs.
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { isOpen, openModal, closeModal, toggleModal } = useModal();
 *
 *   return (
 *     <>
 *       <button onClick={openModal}>Open Modal</button>
 *       <Modal isOpen={isOpen} onClose={closeModal} title="My Modal">
 *         <p>Modal content here</p>
 *       </Modal>
 *     </>
 *   );
 * }
 * ```
 */

"use client";

import { useCallback, useState } from "react";

export interface UseModalReturn {
  /**
   * Whether the modal is currently open
   */
  isOpen: boolean;

  /**
   * Open the modal
   */
  openModal: () => void;

  /**
   * Close the modal
   */
  closeModal: () => void;

  /**
   * Toggle the modal open/closed state
   */
  toggleModal: () => void;
}

/**
 * Hook for managing modal state
 *
 * @param defaultOpen - Initial open state (default: false)
 * @returns Modal state and control functions
 */
export function useModal(defaultOpen = false): UseModalReturn {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggleModal = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return {
    isOpen,
    openModal,
    closeModal,
    toggleModal,
  };
}

/**
 * Delete Confirmation Modal Example
 * 
 * Demonstrates the complete feedback flow:
 * Modal → Loader → Toast (Success/Failure)
 * 
 * This example shows how to combine all three feedback UI elements
 * for a common use case: confirming a destructive action.
 */

'use client';

import { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Loader } from '@/components/ui/Loader';
import { useModal } from '@/hooks/useModal';
import { toast } from '@/lib/toast';

interface DeleteConfirmModalProps {
    /**
     * Name of the item being deleted (for display)
     */
    itemName: string;

    /**
     * Callback function to perform the delete operation
     * Should return a promise
     */
    onDelete: () => Promise<void>;

    /**
     * Optional callback after successful deletion
     */
    onSuccess?: () => void;
}

export function DeleteConfirmModal({
    itemName,
    onDelete,
    onSuccess,
}: DeleteConfirmModalProps) {
    const { isOpen, openModal, closeModal } = useModal();
    const [isDeleting, setIsDeleting] = useState(false);

    const handleConfirm = async () => {
        setIsDeleting(true);
        const toastId = toast.loading(`Deleting ${itemName}...`);

        try {
            await onDelete();

            toast.success(`${itemName} deleted successfully!`, {
                id: toastId,
            });

            closeModal();
            onSuccess?.();
        } catch (error) {
            toast.error(`Failed to delete ${itemName}. Please try again.`, {
                id: toastId,
            });
            console.error('Delete error:', error);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <>
            {/* Trigger button */}
            <button
                onClick={openModal}
                className="rounded-lg bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
                Delete {itemName}
            </button>

            {/* Confirmation Modal */}
            <Modal
                isOpen={isOpen}
                onClose={closeModal}
                title="Confirm Deletion"
                description={`Are you sure you want to delete "${itemName}"? This action cannot be undone.`}
                disableBackdropClick={isDeleting}
            >
                {isDeleting ? (
                    <div className="py-4">
                        <Loader text="Deleting..." />
                    </div>
                ) : (
                    <div className="flex gap-3">
                        <button
                            onClick={closeModal}
                            className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleConfirm}
                            className="flex-1 rounded-lg bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                        >
                            Delete
                        </button>
                    </div>
                )}
            </Modal>
        </>
    );
}

/**
 * Example Usage Page
 * 
 * Demonstrates how to use the DeleteConfirmModal component
 */
export default function DeleteConfirmExample() {
    const [items, setItems] = useState([
        { id: 1, name: 'Product A' },
        { id: 2, name: 'Product B' },
        { id: 3, name: 'Product C' },
    ]);

    const handleDelete = (id: number) => async () => {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Remove item from list
        setItems((prev) => prev.filter((item) => item.id !== id));
    };

    return (
        <main className="min-h-screen bg-gray-50 p-8">
            <div className="mx-auto max-w-2xl">
                <h1 className="mb-2 text-3xl font-bold text-gray-900">
                    Delete Confirmation Example
                </h1>
                <p className="mb-8 text-gray-600">
                    This page demonstrates the complete feedback flow: Modal → Loader → Toast
                </p>

                <div className="space-y-4">
                    {items.length === 0 ? (
                        <div className="rounded-lg border border-gray-200 bg-white p-8 text-center">
                            <p className="text-gray-500">All items deleted!</p>
                            <button
                                onClick={() =>
                                    setItems([
                                        { id: 1, name: 'Product A' },
                                        { id: 2, name: 'Product B' },
                                        { id: 3, name: 'Product C' },
                                    ])
                                }
                                className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
                            >
                                Reset Items
                            </button>
                        </div>
                    ) : (
                        items.map((item) => (
                            <div
                                key={item.id}
                                className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4"
                            >
                                <span className="font-medium text-gray-900">{item.name}</span>
                                <DeleteConfirmModal
                                    itemName={item.name}
                                    onDelete={handleDelete(item.id)}
                                />
                            </div>
                        ))
                    )}
                </div>

                <div className="mt-8 rounded-lg border border-blue-200 bg-blue-50 p-4">
                    <h2 className="mb-2 font-semibold text-blue-900">Try it out:</h2>
                    <ol className="list-inside list-decimal space-y-1 text-sm text-blue-800">
                        <li>Click "Delete" button → Modal opens</li>
                        <li>Press Esc or click backdrop → Modal closes</li>
                        <li>Click "Delete" again, then click "Confirm" → Loader appears</li>
                        <li>After 2 seconds → Success toast shows, modal closes</li>
                        <li>Item is removed from the list</li>
                    </ol>
                </div>
            </div>
        </main>
    );
}

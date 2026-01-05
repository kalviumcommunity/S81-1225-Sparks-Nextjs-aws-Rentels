/**
 * Loader Component
 *
 * A reusable loading spinner component for async operations.
 * Accessible with proper ARIA attributes and screen reader support.
 *
 * @example
 * ```tsx
 * // Inline loader
 * <Loader size="small" />
 *
 * // Loader with text
 * <Loader text="Loading data..." />
 *
 * // Full-page overlay loader
 * <Loader overlay text="Processing..." />
 * ```
 */

export interface LoaderProps {
  /**
   * Size of the loader spinner
   * @default 'medium'
   */
  size?: "small" | "medium" | "large";

  /**
   * Optional loading text to display below the spinner
   */
  text?: string;

  /**
   * If true, displays as a full-page overlay with backdrop
   * @default false
   */
  overlay?: boolean;

  /**
   * Additional CSS classes
   */
  className?: string;
}

const sizeClasses = {
  small: "w-4 h-4 border-2",
  medium: "w-8 h-8 border-3",
  large: "w-12 h-12 border-4",
};

export function Loader({
  size = "medium",
  text,
  overlay = false,
  className = "",
}: LoaderProps) {
  const spinner = (
    <div
      className={`inline-block animate-spin rounded-full border-solid border-blue-600 border-t-transparent ${sizeClasses[size]} ${className}`}
      role="status"
      aria-live="polite"
      aria-label={text || "Loading"}
    >
      <span className="sr-only">{text || "Loading..."}</span>
    </div>
  );

  const content = (
    <div className="flex flex-col items-center justify-center gap-3">
      {spinner}
      {text && (
        <p
          className="text-sm text-gray-700 dark:text-gray-300"
          aria-live="polite"
        >
          {text}
        </p>
      )}
    </div>
  );

  if (overlay) {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        role="dialog"
        aria-modal="true"
        aria-labelledby="loader-text"
      >
        <div className="rounded-lg bg-white p-8 shadow-xl dark:bg-gray-800">
          {content}
        </div>
      </div>
    );
  }

  return content;
}

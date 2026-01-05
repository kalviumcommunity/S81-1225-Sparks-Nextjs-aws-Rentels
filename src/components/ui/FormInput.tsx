import { UseFormRegister, FieldValues, Path } from "react-hook-form";

/**
 * Props for the reusable FormInput component
 * Generic type T extends FieldValues for type-safe form field names
 */
interface FormInputProps<T extends FieldValues> {
  /** Display label for the input field */
  label: string;
  /** Field name matching the form schema */
  name: Path<T>;
  /** Input type (text, email, password, etc.) */
  type?: string;
  /** React Hook Form register function */
  register: UseFormRegister<T>;
  /** Error message to display (if any) */
  error?: string;
}

/**
 * Reusable form input component with built-in validation display
 * Features:
 * - Proper label-input association for accessibility
 * - ARIA attributes for screen readers
 * - Conditional error message display
 * - Type-safe field names via generics
 */
export default function FormInput<T extends FieldValues>({
  label,
  name,
  type = "text",
  register,
  error,
}: FormInputProps<T>) {
  return (
    <div className="mb-3">
      <label htmlFor={name} className="block mb-1 font-medium text-gray-700">
        {label}
      </label>
      <input
        id={name}
        type={type}
        {...register(name)}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
        className={`w-full border p-2 rounded focus:outline-none focus:ring-2 transition-colors ${
          error
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:ring-blue-500"
        }`}
      />
      {error && (
        <p
          id={`${name}-error`}
          className="text-red-500 text-sm mt-1"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}

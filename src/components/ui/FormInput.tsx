import React from "react";
import { UseFormRegister, FieldError } from "react-hook-form";

/**
 * Props for the FormInput component
 */
interface FormInputProps {
    /** Label text displayed above the input */
    label: string;
    /** Field name for form registration */
    name: string;
    /** Input type (text, email, password, etc.) */
    type?: string;
    /** React Hook Form register function */
    register: UseFormRegister<any>;
    /** Error message from validation */
    error?: string;
    /** Optional placeholder text */
    placeholder?: string;
}

/**
 * Reusable form input component with validation and accessibility features
 *
 * Features:
 * - Proper label association via htmlFor
 * - Error message display with conditional rendering
 * - ARIA attributes for accessibility (aria-invalid)
 * - Consistent styling across all forms
 *
 * @example
 * ```tsx
 * <FormInput
 *   label="Email"
 *   name="email"
 *   type="email"
 *   register={register}
 *   error={errors.email?.message}
 * />
 * ```
 */
export default function FormInput({
    label,
    name,
    type = "text",
    register,
    error,
    placeholder,
}: FormInputProps) {
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
                placeholder={placeholder}
                className={`w-full border p-2 rounded focus:outline-none focus:ring-2 transition-colors ${error
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-blue-500"
                    }`}
            />
            {error && (
                <p id={`${name}-error`} className="text-red-500 text-sm mt-1" role="alert">
                    {error}
                </p>
            )}
        </div>
    );
}

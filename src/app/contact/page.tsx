"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, ContactFormData } from "@/lib/schemas/contactSchema";
import FormInput from "@/components/ui/FormInput";
import { toast } from "@/lib/toast";

/**
 * Contact Form Page
 *
 * Demonstrates reusable form components with:
 * - Schema-based validation
 * - Clean separation of concerns
 * - Consistent error handling
 * - Accessible design
 */
export default function ContactPage() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
    });

    const onSubmit = async (data: ContactFormData) => {
        const toastId = toast.loading('Sending your message...');

        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1500));

            console.log("Contact Form Submitted:", data);

            toast.success("Message sent successfully! We'll get back to you soon.", {
                id: toastId,
            });

            reset(); // Reset form after successful submission
        } catch (error) {
            toast.error('Failed to send message. Please try again.', {
                id: toastId,
            });
            console.error('Contact form error:', error);
        }
    };

    return (
        <main className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100 p-6 flex flex-col items-center justify-center">
            <div className="w-full max-w-lg">
                <h1 className="text-3xl font-bold mb-2 text-center text-gray-800">
                    Contact Us
                </h1>
                <p className="text-center text-gray-600 mb-6">
                    Have questions? We'd love to hear from you.
                </p>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="bg-white p-8 rounded-lg shadow-lg"
                    noValidate
                >
                    <FormInput
                        label="Your Name"
                        name="name"
                        register={register}
                        error={errors.name?.message}
                        placeholder="Enter your name"
                    />

                    <FormInput
                        label="Email Address"
                        name="email"
                        type="email"
                        register={register}
                        error={errors.email?.message}
                        placeholder="you@example.com"
                    />

                    <div className="mb-3">
                        <label
                            htmlFor="message"
                            className="block mb-1 font-medium text-gray-700"
                        >
                            Message
                        </label>
                        <textarea
                            id="message"
                            {...register("message")}
                            aria-invalid={!!errors.message}
                            aria-describedby={errors.message ? "message-error" : undefined}
                            placeholder="Tell us what's on your mind..."
                            rows={5}
                            className={`w-full border p-2 rounded focus:outline-none focus:ring-2 transition-colors resize-none ${errors.message
                                ? "border-red-500 focus:ring-red-500"
                                : "border-gray-300 focus:ring-green-500"
                                }`}
                        />
                        {errors.message && (
                            <p
                                id="message-error"
                                className="text-red-500 text-sm mt-1"
                                role="alert"
                            >
                                {errors.message.message}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors disabled:bg-green-300 disabled:cursor-not-allowed font-medium mt-4"
                    >
                        {isSubmitting ? "Sending..." : "Send Message"}
                    </button>
                </form>

                <p className="text-center text-sm text-gray-600 mt-4">
                    Need immediate assistance?{" "}
                    <a href="tel:+1234567890" className="text-green-600 hover:underline">
                        Call us
                    </a>
                </p>
            </div>
        </main>
    );
}

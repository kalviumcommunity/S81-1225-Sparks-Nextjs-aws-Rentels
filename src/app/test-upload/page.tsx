import FileUpload from "@/components/FileUpload";

export default function UploadPage() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 dark:bg-gray-900">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Upload Test</h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                    Verify S3 presigned URL uploads securely.
                </p>
                <p className="text-sm text-yellow-600 mt-2 bg-yellow-50 inline-block px-3 py-1 rounded-full">
                    Note: You must be authenticated to upload.
                </p>
            </div>

            <FileUpload />
        </div>
    );
}

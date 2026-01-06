"use client";

import React, { useState } from "react";

export default function FileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<
    "idle" | "uploading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    // Validation
    const validTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/gif",
      "application/pdf",
    ];
    if (!validTypes.includes(selectedFile.type)) {
      setStatus("error");
      setMessage("Invalid file type. Only Images and PDFs are allowed.");
      setFile(null);
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      // 5MB
      setStatus("error");
      setMessage("File too large. Max 5MB.");
      setFile(null);
      return;
    }

    setFile(selectedFile);
    setStatus("idle");
    setMessage("");
    setUploadedUrl(null);
  };

  const handleUpload = async () => {
    if (!file) return;

    setStatus("uploading");
    setMessage("Getting upload URL...");

    try {
      // 1. Get Presigned URL
      const res = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileName: file.name,
          fileType: file.type,
          fileSize: file.size,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to get upload URL");
      }

      const { uploadUrl, objectUrl } = await res.json();

      // 2. Upload to S3
      setMessage("Uploading to Storage...");
      const uploadRes = await fetch(uploadUrl, {
        method: "PUT",
        headers: {
          "Content-Type": file.type,
        },
        body: file,
      });

      if (!uploadRes.ok) {
        throw new Error("Failed to upload file to storage");
      }

      setStatus("success");
      setMessage("Upload successful!");
      setUploadedUrl(objectUrl);
    } catch (err) {
      console.error(err);
      setStatus("error");
      setMessage(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4 border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">
        Secure File Upload
      </h2>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Select File
        </label>
        <input
          type="file"
          accept="image/*,application/pdf"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100
            dark:file:bg-gray-700 dark:file:text-gray-200
          "
        />
        <p className="text-xs text-gray-500">Max 5MB. Images and PDF only.</p>
      </div>

      {message && (
        <div
          className={`text-sm p-3 rounded-md ${
            status === "error"
              ? "bg-red-50 text-red-700"
              : status === "success"
                ? "bg-green-50 text-green-700"
                : "bg-blue-50 text-blue-700"
          }`}
        >
          {message}
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={!file || status === "uploading"}
        className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
          ${
            !file || status === "uploading"
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          }
        `}
      >
        {status === "uploading" ? "Uploading..." : "Upload File"}
      </button>

      {uploadedUrl && (
        <div className="mt-4 p-4 border rounded-md bg-gray-50 dark:bg-gray-900">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Uploaded File:
          </p>
          {file?.type.startsWith("image/") ? (
            <img
              src={uploadedUrl}
              alt="Uploaded"
              className="max-w-full h-auto rounded-md shadow-sm"
            />
          ) : (
            <a
              href={uploadedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline break-all"
            >
              open file
            </a>
          )}
        </div>
      )}
    </div>
  );
}

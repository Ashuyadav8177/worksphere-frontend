import { useState } from "react";
import Button from "../../../components/common/Button";

function DocumentUpload({ onUpload }) {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) {
      setFile(null);
      return;
    }

    // Only PDF for now
    if (selectedFile.type !== "application/pdf") {
      alert("Only PDF files are allowed.");
      event.target.value = "";
      setFile(null);
      return;
    }

    setFile(selectedFile);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file) {
      alert("Please select a PDF file.");
      return;
    }

    try {
      setUploading(true);

      await onUpload(file);

      setFile(null);

      // Reset file input
      event.target.reset();
    } catch (error) {
      console.error("Failed to upload document:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm"
    >
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-gray-900">
          Upload Document
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Select a PDF file from your computer.
        </p>
      </div>

      {/* File Input */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Select PDF
        </label>

        <input
          type="file"
          accept="application/pdf,.pdf"
          onChange={handleFileChange}
          className="block w-full cursor-pointer rounded-lg border border-gray-200 bg-gray-50 text-sm text-gray-600 file:mr-4 file:cursor-pointer file:border-0 file:bg-gray-100 file:px-4 file:py-2.5 file:text-sm file:font-medium file:text-gray-700 hover:file:bg-gray-200"
        />
      </div>

      {/* Selected File */}
      {file && (
        <div className="mt-4 rounded-lg border border-gray-100 bg-gray-50 p-4">
          <p className="text-sm font-medium text-gray-900">
            {file.name}
          </p>

          <p className="mt-1 text-xs text-gray-500">
            {(file.size / 1024).toFixed(2)} KB
          </p>

          <p className="mt-1 text-xs text-gray-500">
            {file.type}
          </p>
        </div>
      )}

      {/* Upload Button */}
      <div className="mt-5">
        <Button
          type="submit"
          disabled={!file || uploading}
        >
          {uploading ? "Uploading..." : "Upload PDF"}
        </Button>
      </div>
    </form>
  );
}

export default DocumentUpload;
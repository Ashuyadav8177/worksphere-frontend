import { fileTypeStyles, getFileType } from "./DocumentCard";
import Button from "../../../components/common/Button";

function DocumentDetails({
  document,
  onDownload,
  onClose,
}) {
  const fileType = getFileType(
    document?.documentType,
    document?.documentName
  );

  const style =
    fileTypeStyles[fileType] || fileTypeStyles.OTHER;

  const details = [
    {
      label: "Document Name",
      value: document?.documentName || "N/A",
    },
    {
      label: "File Type",
      value: document?.documentType || "N/A",
    },
    {
      label: "Document ID",
      value: document?.id || "N/A",
    },
  ];

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">
          Document Details
        </h2>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Preview */}
      <div className="mt-6 flex flex-col items-center text-center">
        <div
          className={`flex h-16 w-16 items-center justify-center rounded-xl text-sm font-bold ${style.bg} ${style.text}`}
        >
          {fileType}
        </div>

        <h3 className="mt-3 max-w-full truncate text-base font-semibold text-gray-900">
          {document?.documentName || "Unnamed Document"}
        </h3>
      </div>

      {/* Details */}
      <div className="mt-6 space-y-4 border-t border-gray-100 pt-5">
        {details.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between gap-4"
          >
            <span className="text-sm text-gray-500">
              {item.label}
            </span>

            <span className="max-w-[60%] truncate text-right text-sm font-medium text-gray-900">
              {item.value}
            </span>
          </div>
        ))}
      </div>

      {/* File URL */}
      <div className="mt-5 border-t border-gray-100 pt-5">
        <p className="text-sm text-gray-500">
          File URL
        </p>

        <p className="mt-1 break-all text-xs text-gray-600">
          {document?.fileUrl || "No file URL available"}
        </p>
      </div>

      {/* Actions */}
      <div className="mt-6 flex gap-3 border-t border-gray-100 pt-5">
        {onDownload && (
          <Button
            variant="secondary"
            className="flex-1"
            onClick={onDownload}
          >
            Open Document
          </Button>
        )}

        {onClose && (
          <Button
            variant="secondary"
            className="flex-1"
            onClick={onClose}
          >
            Close
          </Button>
        )}
      </div>
    </div>
  );
}

export default DocumentDetails;
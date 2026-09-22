const fileTypeStyles = {
  PDF: {
    bg: "bg-red-100",
    text: "text-red-600",
  },

  XLSX: {
    bg: "bg-emerald-100",
    text: "text-emerald-600",
  },

  DOCX: {
    bg: "bg-blue-100",
    text: "text-blue-600",
  },

  IMAGE: {
    bg: "bg-violet-100",
    text: "text-violet-600",
  },

  TEXT: {
    bg: "bg-gray-100",
    text: "text-gray-600",
  },

  OTHER: {
    bg: "bg-gray-100",
    text: "text-gray-600",
  },
};

const getFileType = (documentType, documentName) => {
  const type = documentType?.toLowerCase() || "";
  const name = documentName?.toLowerCase() || "";

  if (type.includes("pdf") || name.endsWith(".pdf")) {
    return "PDF";
  }

  if (
    type.includes("spreadsheet") ||
    type.includes("xlsx") ||
    name.endsWith(".xlsx")
  ) {
    return "XLSX";
  }

  if (
    type.includes("word") ||
    type.includes("docx") ||
    name.endsWith(".docx")
  ) {
    return "DOCX";
  }

  if (type.startsWith("image/")) {
    return "IMAGE";
  }

  if (type.startsWith("text/") || name.endsWith(".txt")) {
    return "TEXT";
  }

  return "OTHER";
};

function DocumentCard({ document, onClick }) {
  const fileType = getFileType(
    document.documentType,
    document.documentName
  );

  const style =
    fileTypeStyles[fileType] || fileTypeStyles.OTHER;

  return (
    <div
      onClick={onClick}
      className="cursor-pointer rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
    >
      {/* Header */}
      <div className="flex items-start gap-3">
        {/* File Type */}
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${style.bg} ${style.text}`}
        >
          {fileType}
        </div>

        {/* Document Information */}
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-semibold text-gray-900">
            {document.documentName}
          </h3>

          <p className="mt-1 truncate text-xs text-gray-500">
            {document.documentType}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">
        <span className="text-xs text-gray-500">
          Document #{document.id}
        </span>

        <span
          className={`rounded-full px-2 py-1 text-[10px] font-semibold ${style.bg} ${style.text}`}
        >
          {fileType}
        </span>
      </div>
    </div>
  );
}

export default DocumentCard;

export { fileTypeStyles, getFileType };

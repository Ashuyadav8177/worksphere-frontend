import { getFileType, fileTypeStyles } from "./DocumentCard";

function DocumentTable({
  documents,
  onView,
  onDownload,
  onDelete,
}) {
  const handleDownload = (document) => {
    if (onDownload) {
      onDownload(document);
    }
  };

  const handleDelete = (document) => {
    if (onDelete) {
      onDelete(document);
    }
  };

  if (!documents || documents.length === 0) {
    return (
      <div className="rounded-xl border border-gray-100 bg-white p-8 text-center shadow-sm">
        <p className="text-sm text-gray-500">
          No documents found.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-225">
          <thead className="border-b border-gray-100 bg-gray-50">
            <tr>
              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                Document
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                Type
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                ID
              </th>

              <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {documents.map((document) => {
              const fileType = getFileType(
                document.documentType,
                document.documentName
              );

              const style =
                fileTypeStyles[fileType] ||
                fileTypeStyles.OTHER;

              return (
                <tr
                  key={document.id}
                  className="transition-colors hover:bg-gray-50"
                >
                  {/* Document */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-[10px] font-bold ${style.bg} ${style.text}`}
                      >
                        {fileType}
                      </div>

                      <div className="min-w-0">
                        <p className="max-w-70 truncate text-sm font-semibold text-gray-900">
                          {document.documentName}
                        </p>

                        <p className="mt-0.5 max-w-70 truncate text-xs text-gray-500">
                          {document.documentType}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Type */}
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${style.bg} ${style.text}`}
                    >
                      {fileType}
                    </span>
                  </td>

                  {/* ID */}
                  <td className="px-5 py-4">
                    <span className="text-sm text-gray-600">
                      #{document.id}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-2">
                      {/* View */}
                      {onView && (
                        <button
                          type="button"
                          onClick={() => onView(document)}
                          className="rounded-lg px-3 py-2 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
                        >
                          View
                        </button>
                      )}

                      {/* Download / Open */}
                      {onDownload && (
                        <button
                          type="button"
                          onClick={() =>
                            handleDownload(document)
                          }
                          className="rounded-lg px-3 py-2 text-xs font-medium text-blue-600 transition-colors hover:bg-blue-50"
                        >
                          Open
                        </button>
                      )}

                      {/* Delete */}
                      {onDelete && (
                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(document)
                          }
                          className="rounded-lg px-3 py-2 text-xs font-medium text-red-600 transition-colors hover:bg-red-50"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DocumentTable;
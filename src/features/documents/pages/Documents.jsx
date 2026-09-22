import { useEffect, useMemo, useState } from "react";

import DocumentTable from "../components/DocumentTable";
import DocumentUpload from "../components/DocumentUpload";
import DocumentCard from "../components/DocumentCard";
import DocumentDetails from "../components/DocumentDetails";

import SearchBar from "../../../components/ui/SearchBar";
import Button from "../../../components/common/Button";
import Pagination from "../../../components/common/Pagination";

import {
  getMyDocuments,
  uploadDocument,
} from "../../../services/documentService";

function Documents() {
  const [documents, setDocuments] = useState([]);
  const [search, setSearch] = useState("");
  const [fileTypeFilter, setFileTypeFilter] = useState("ALL");
  const [selectedDocument, setSelectedDocument] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);

  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const recordsPerPage = 5;

  /* =========================
     FILE TYPE
  ========================= */

  const getFileType = (documentType = "", documentName = "") => {
    const type = documentType.toLowerCase();
    const name = documentName.toLowerCase();

    if (type.includes("pdf") || name.endsWith(".pdf")) {
      return "PDF";
    }

    if (
      type.includes("spreadsheet") ||
      type.includes("excel") ||
      type.includes("xlsx") ||
      name.endsWith(".xlsx")
    ) {
      return "XLSX";
    }

    if (
      type.includes("word") ||
      type.includes("document") ||
      type.includes("docx") ||
      name.endsWith(".docx")
    ) {
      return "DOCX";
    }

    if (type.includes("image")) {
      return "IMAGE";
    }

    if (
      type.includes("text") ||
      name.endsWith(".txt")
    ) {
      return "TEXT";
    }

    return "OTHER";
  };

  /* =========================
     FETCH DOCUMENTS
  ========================= */

  const fetchDocuments = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getMyDocuments();

      setDocuments(response.data || []);
    } catch (error) {
      console.error("Failed to fetch documents:", error);

      setError(
        error.response?.data?.message ||
          "Failed to load documents."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  /* =========================
     UPLOAD DOCUMENT
  ========================= */

  const handleUpload = async (file) => {
    try {
      setUploading(true);
      setError("");

      await uploadDocument(file);

      const response = await getMyDocuments();

      setDocuments(response.data || []);

      setCurrentPage(1);
    } catch (error) {
      console.error("Failed to upload document:", error);

      setError(
        error.response?.data?.message ||
          "Failed to upload document."
      );

      throw error;
    } finally {
      setUploading(false);
    }
  };

  /* =========================
     OPEN DOCUMENT
  ========================= */

  const handleDownload = (document) => {
    if (!document?.fileUrl) {
      setError("Document file is not available.");
      return;
    }

  const backendUrl = import.meta.env.VITE_API_BASE_URL.replace("/api", "");

    const fileUrl = document.fileUrl.startsWith("http")
      ? document.fileUrl
      : `${backendUrl}${document.fileUrl}`;

    window.open(fileUrl, "_blank", "noopener,noreferrer");
  };

  /* =========================
     FILTER
  ========================= */

  const filteredDocuments = useMemo(() => {
    return documents.filter((document) => {
      const documentName =
        document.documentName?.toLowerCase() || "";

      const documentType =
        document.documentType?.toLowerCase() || "";

      const searchValue = search.toLowerCase();

      const matchesSearch =
        documentName.includes(searchValue) ||
        documentType.includes(searchValue);

      const matchesFileType =
        fileTypeFilter === "ALL" ||
        getFileType(
          document.documentType,
          document.documentName
        ) === fileTypeFilter;

      return matchesSearch && matchesFileType;
    });
  }, [documents, search, fileTypeFilter]);

  /* =========================
     PAGINATION
  ========================= */

  const totalPages = Math.ceil(
    filteredDocuments.length / recordsPerPage
  );

  const startIndex =
    (currentPage - 1) * recordsPerPage;

  const currentDocuments = filteredDocuments.slice(
    startIndex,
    startIndex + recordsPerPage
  );

  /* =========================
     CLEAR FILTERS
  ========================= */

  const handleClearFilters = () => {
    setSearch("");
    setFileTypeFilter("ALL");
    setCurrentPage(1);
  };

  /* =========================
     LOADING
  ========================= */

  if (loading) {
    return (
      <div className="flex min-h-75 items-center justify-center">
        <p className="text-sm text-gray-500">
          Loading documents...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* =========================
          HEADING
      ========================= */}

      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Documents
        </h1>

        <p className="text-sm text-gray-500">
          Manage your documents.
        </p>
      </div>

      {/* =========================
          ERROR
      ========================= */}

      {error && (
        <div className="flex items-center justify-between rounded-lg border border-red-200 bg-red-50 px-4 py-3">
          <p className="text-sm text-red-600">
            {error}
          </p>

          <button
            type="button"
            onClick={() => setError("")}
            className="text-sm font-medium text-red-600 hover:text-red-700"
          >
            ×
          </button>
        </div>
      )}

      {/* =========================
          UPLOAD
      ========================= */}

      <DocumentUpload
        onUpload={handleUpload}
        uploading={uploading}
      />

      {/* =========================
          SEARCH & FILTER
      ========================= */}

      <section className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
        <h2 className="mb-4 text-base font-semibold text-gray-900">
          Search & Filter
        </h2>

        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">

          <div className="w-full sm:w-64">
            <SearchBar
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search document..."
            />
          </div>

          <select
            value={fileTypeFilter}
            onChange={(event) => {
              setFileTypeFilter(event.target.value);
              setCurrentPage(1);
            }}
            className="h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-700 outline-none transition-all duration-200 hover:border-gray-300 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10 sm:w-44"
          >
            <option value="ALL">
              All File Types
            </option>

            <option value="PDF">PDF</option>
            <option value="XLSX">XLSX</option>
            <option value="DOCX">DOCX</option>
            <option value="IMAGE">IMAGE</option>
            <option value="TEXT">TEXT</option>
            <option value="OTHER">OTHER</option>
          </select>

          <Button
            variant="secondary"
            onClick={handleClearFilters}
          >
            Clear Filters
          </Button>

        </div>
      </section>

      {/* =========================
          DOCUMENT TABLE
      ========================= */}

      <DocumentTable
        documents={currentDocuments}
        onView={setSelectedDocument}
        onDownload={handleDownload}
      />

      {/* =========================
          DOCUMENT CARDS
      ========================= */}

      <section>
        <h2 className="mb-4 text-base font-semibold text-gray-900">
          Documents
        </h2>

        {currentDocuments.length === 0 ? (
          <div className="rounded-xl border border-gray-100 bg-white p-8 text-center shadow-sm">
            <p className="text-sm text-gray-500">
              No documents found.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

            {currentDocuments.map((document) => (
              <div
                key={document.id}
                className="space-y-3"
              >
                <DocumentCard
                  document={document}
                  onClick={() =>
                    setSelectedDocument(document)
                  }
                />

                <div className="flex gap-2">

                  <Button
                    variant="secondary"
                    size="sm"
                    className="flex-1"
                    onClick={() =>
                      setSelectedDocument(document)
                    }
                  >
                    View
                  </Button>

                  <Button
                    variant="secondary"
                    size="sm"
                    className="flex-1"
                    onClick={() =>
                      handleDownload(document)
                    }
                  >
                    Open
                  </Button>

                </div>
              </div>
            ))}

          </div>
        )}
      </section>

      {/* =========================
          DOCUMENT DETAILS
      ========================= */}

      {selectedDocument && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() =>
            setSelectedDocument(null)
          }
        >
          <div
            className="w-full max-w-sm"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <DocumentDetails
              document={selectedDocument}
              onDownload={() =>
                handleDownload(selectedDocument)
              }
              onClose={() =>
                setSelectedDocument(null)
              }
            />
          </div>
        </div>
      )}

      {/* =========================
          PAGINATION
      ========================= */}

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}

    </div>
  );
}

export default Documents;
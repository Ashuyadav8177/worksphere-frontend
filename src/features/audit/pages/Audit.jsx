
import { useEffect, useMemo, useState } from "react";

import AuditTable from "../components/AuditTable";
import AuditCard from "../components/AuditCard";
import AuditDetails from "../components/AuditDetails";

import SearchBar from "../../../components/ui/SearchBar";
import Button from "../../../components/common/Button";
import Pagination from "../../../components/common/Pagination";

import { getAllAuditLogs } from "../../../services/auditService";

function Audit() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [actionFilter, setActionFilter] = useState("ALL");
  const [resourceFilter, setResourceFilter] = useState("ALL");
  const [selectedLog, setSelectedLog] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const recordsPerPage = 5;

  useEffect(() => {
    const fetchAuditLogs = async () => {
      try {
        const response = await getAllAuditLogs();

        const formattedLogs = response.data.map((log) => ({
          id: log.id,
          user: log.performedBy,
          action: log.action,
          resource: log.entityName,
          timestamp: new Date(log.timeStamp).toLocaleString(),
        }));

        setLogs(formattedLogs);
      } catch (error) {
        console.error("Failed to fetch audit logs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAuditLogs();
  }, []);

  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
      const matchesSearch =
        log.user.toLowerCase().includes(search.toLowerCase()) ||
        log.resource.toLowerCase().includes(search.toLowerCase()) ||
        log.action.toLowerCase().includes(search.toLowerCase());

      const matchesAction =
        actionFilter === "ALL" || log.action === actionFilter;

      const matchesResource =
        resourceFilter === "ALL" || log.resource === resourceFilter;

      return matchesSearch && matchesAction && matchesResource;
    });
  }, [logs, search, actionFilter, resourceFilter]);

  const totalPages = Math.ceil(filteredLogs.length / recordsPerPage);

  const startIndex = (currentPage - 1) * recordsPerPage;

  const currentLogs = filteredLogs.slice(
    startIndex,
    startIndex + recordsPerPage
  );

  const handleClearFilters = () => {
    setSearch("");
    setActionFilter("ALL");
    setResourceFilter("ALL");
    setCurrentPage(1);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-10">
        <p className="text-sm text-gray-500">Loading audit logs...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Heading */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Audit Logs</h1>

        <p className="text-sm text-gray-500">
          Track user activities and system changes.
        </p>
      </div>

      {/* Search & Filter */}
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
              placeholder="Search audit logs..."
            />
          </div>

          <select
            value={actionFilter}
            onChange={(event) => {
              setActionFilter(event.target.value);
              setCurrentPage(1);
            }}
            className="h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-700 outline-none transition-all duration-200 hover:border-gray-300 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10 sm:w-40"
          >
            <option value="ALL">All Actions</option>
            <option value="CREATE">CREATE</option>
            <option value="UPDATE">UPDATE</option>
            <option value="DELETE">DELETE</option>
            <option value="LOGIN">LOGIN</option>
            <option value="APPROVE">APPROVE</option>
          </select>

          <select
            value={resourceFilter}
            onChange={(event) => {
              setResourceFilter(event.target.value);
              setCurrentPage(1);
            }}
            className="h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-700 outline-none transition-all duration-200 hover:border-gray-300 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10 sm:w-44"
          >
            <option value="ALL">All Resources</option>
            <option value="Employee">Employee</option>
            <option value="Attendance">Attendance</option>
            <option value="Leave">Leave</option>
            <option value="Task">Task</option>
            <option value="Authentication">Authentication</option>
          </select>

          <Button variant="secondary" onClick={handleClearFilters}>
            Clear Filters
          </Button>
        </div>
      </section>

      {/* Audit Table */}
      {currentLogs.length === 0 ? (
        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">
            No audit logs found.
          </p>
        </div>
      ) : (
        <AuditTable logs={currentLogs} />
      )}

      {/* Audit Cards */}
      <section>
        <h2 className="mb-4 text-base font-semibold text-gray-900">
          Audit Activity
        </h2>

        {currentLogs.length === 0 ? (
          <p className="text-sm text-gray-500">
            No audit activity found.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {currentLogs.map((log) => (
              <div key={log.id} className="space-y-3">
                <AuditCard
                  user={log.user}
                  action={log.action}
                  resource={log.resource}
                  timestamp={log.timestamp}
                />

                <Button
                  variant="secondary"
                  size="sm"
                  className="w-full"
                  onClick={() => setSelectedLog(log)}
                >
                  View Details
                </Button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Audit Details - overlay */}
      {selectedLog && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setSelectedLog(null)}
        >
          <div
            className="w-full max-w-sm"
            onClick={(event) => event.stopPropagation()}
          >
            <AuditDetails
              user={selectedLog.user}
              action={selectedLog.action}
              resource={selectedLog.resource}
              timestamp={selectedLog.timestamp}
              onClose={() => setSelectedLog(null)}
            />
          </div>
        </div>
      )}

      {/* Pagination */}
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

export default Audit;

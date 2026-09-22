import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";

import LeaveTable from "../components/LeaveTable";
import LeaveForm from "../components/LeaveForm";
import LeaveCard from "../components/LeaveCard";
import LeaveDetails from "../components/LeaveDetails";

import SearchBar from "../../../components/ui/SearchBar";
import Button from "../../../components/common/Button";
import Pagination from "../../../components/common/Pagination";
import Badge from "../../../components/ui/Badge";

import {
  applyLeave,
  getMyLeaves,
  getAllLeaves,
  approveLeave,
  rejectLeave,
  cancelLeave,
} from "../../../services/leaveService";

const statusVariant = {
  APPROVED: "active",
  PENDING: "pending",
  REJECTED: "inactive",
  CANCELLED: "default",
};

function Leaves() {
  const role = useSelector((state) => state.auth.user?.role);
  const isApprover = role === "ADMIN" || role === "MANAGER";

  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLeave, setSelectedLeave] = useState(null);
  const recordsPerPage = 5;

  const fetchLeaves = async () => {
    setLoading(true);
    try {
      const response = isApprover ? await getAllLeaves() : await getMyLeaves();
      const mapped = response.data.map((leave) => ({
        id: leave.id,
        employee: leave.employeeName,
        leaveType: leave.leaveType,
        startDate: leave.startDate,
        endDate: leave.endDate,
        reason: leave.reason,
        status: leave.status,
      }));
      setLeaves(mapped);
    } catch (error) {
      console.error("Failed to fetch leaves", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, [role]);

  const handleAddLeave = async (leaveData) => {
    try {
      await applyLeave({
        startDate: leaveData.startDate,
        endDate: leaveData.endDate,
        reason: leaveData.reason,
        leaveType: leaveData.leaveType,
      });
      setCurrentPage(1);
      fetchLeaves();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to apply leave");
    }
  };

  const filteredLeaves = useMemo(() => {
    return leaves.filter((leave) => {
      const matchesSearch = leave.employee.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === "ALL" || leave.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [leaves, search, statusFilter]);

  const totalPages = Math.ceil(filteredLeaves.length / recordsPerPage);
  const startIndex = (currentPage - 1) * recordsPerPage;
  const currentLeaves = filteredLeaves.slice(startIndex, startIndex + recordsPerPage);

  const handleApprove = async (id) => {
    try {
      await approveLeave(id);
      fetchLeaves();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to approve leave");
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectLeave(id);
      fetchLeaves();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to reject leave");
    }
  };

  const handleCancel = async (id) => {
    try {
      await cancelLeave(id);
      fetchLeaves();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to cancel leave");
    }
  };

  const handleViewDetails = (leave) => {
    setSelectedLeave(leave);
  };

  const handleClearFilters = () => {
    setSearch("");
    setStatusFilter("ALL");
    setCurrentPage(1);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Leaves</h1>
          <p className="text-sm text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Heading */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Leaves</h1>
          <p className="text-sm text-gray-500">Manage employee leave requests.</p>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>Current Role:</span>
          <Badge variant="new">{role}</Badge>
        </div>
      </div>

      {/* Apply Leave (Employee only) */}
      {!isApprover && <LeaveForm onSubmit={handleAddLeave} />}

      {/* Approver Message */}
      {isApprover && (
        <div className="rounded-lg border border-violet-100 bg-violet-50/50 px-4 py-3 text-sm text-violet-700">
          You can approve or reject employee leave requests.
        </div>
      )}

      {/* Search & Filter */}
      <section className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
        <h2 className="mb-4 text-base font-semibold text-gray-900">Search & Filter</h2>

        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <div className="w-full sm:w-56">
            <SearchBar
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search employee..."
            />
          </div>

          <select
            value={statusFilter}
            onChange={(event) => {
              setStatusFilter(event.target.value);
              setCurrentPage(1);
            }}
            className="h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-700 outline-none transition-all duration-200 hover:border-gray-300 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10 sm:w-44"
          >
            <option value="ALL">All Status</option>
            <option value="PENDING">Pending</option>
            <option value="APPROVED">Approved</option>
            <option value="REJECTED">Rejected</option>
            <option value="CANCELLED">Cancelled</option>
          </select>

          <Button variant="secondary" onClick={handleClearFilters}>
            Clear Filters
          </Button>
        </div>
      </section>

      {/* Leave Table */}
      <section>
        <LeaveTable leaves={currentLeaves} onView={handleViewDetails} />
      </section>

      {/* Action Buttons */}
      <section className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
        <h2 className="mb-4 text-base font-semibold text-gray-900">Leave Actions</h2>

        <div className="divide-y divide-gray-100">
          {currentLeaves.map((leave) => (
            <div key={leave.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
              <div>
                <h3 className="text-sm font-semibold text-gray-900">{leave.employee}</h3>
                <div className="mt-1">
                  <Badge variant={statusVariant[leave.status] || "default"}>{leave.status}</Badge>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="secondary" size="sm" onClick={() => handleViewDetails(leave)}>
                  View
                </Button>

                {isApprover && leave.status === "PENDING" && (
                  <>
                    <Button variant="success" size="sm" onClick={() => handleApprove(leave.id)}>
                      Approve
                    </Button>
                    <Button variant="danger" size="sm" onClick={() => handleReject(leave.id)}>
                      Reject
                    </Button>
                  </>
                )}

                {!isApprover && leave.status === "PENDING" && (
                  <Button variant="secondary" size="sm" onClick={() => handleCancel(leave.id)}>
                    Cancel
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Selected Leave - Card + Details, overlay */}
      {selectedLeave && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setSelectedLeave(null)}
        >
          <div className="flex w-full max-w-3xl flex-col gap-4 sm:flex-row" onClick={(e) => e.stopPropagation()}>
            <div className="flex-1">
              <LeaveCard
                employee={selectedLeave.employee}
                leaveType={selectedLeave.leaveType}
                startDate={selectedLeave.startDate}
                endDate={selectedLeave.endDate}
                reason={selectedLeave.reason}
                status={selectedLeave.status}
              />
            </div>

            <div className="flex-1">
              <LeaveDetails
                employee={selectedLeave.employee}
                leaveType={selectedLeave.leaveType}
                startDate={selectedLeave.startDate}
                endDate={selectedLeave.endDate}
                reason={selectedLeave.reason}
                status={selectedLeave.status}
                onClose={() => setSelectedLeave(null)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      )}
    </div>
  );
}

export default Leaves;
import { useEffect, useMemo, useState } from "react";

import AttendanceStats from "../components/AttendanceStats";
import AttendanceTable from "../components/AttendanceTable";
import AttendanceCard from "../components/AttendanceCard";
import AttendanceHistory from "../components/AttendanceHistory";

import SearchBar from "../../../components/ui/SearchBar";
import Button from "../../../components/common/Button";
import Pagination from "../../../components/common/Pagination";

import {
  getAllAttendance,
  checkIn,
  checkOut,
} from "../../../services/attendanceService";

function Attendance() {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [dateFilter, setDateFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const recordsPerPage = 5;

  const fetchAttendance = async () => {
    setLoading(true);
    try {
      const response = await getAllAttendance();
      const mapped = response.data.map((record) => ({
        id: record.id,
        employee: record.employeeName,
        date: record.date,
        status: record.status,
        checkInTime: record.checkInTime,
        checkOutTime: record.checkOutTime,
      }));
      setAttendance(mapped);
    } catch (error) {
      console.error("Failed to fetch attendance", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  const handleCheckIn = async () => {
    setActionLoading(true);
    try {
      await checkIn();
      alert("Checked in successfully!");
      fetchAttendance();
    } catch (error) {
      alert(error.response?.data?.message || "Check-in failed");
    } finally {
      setActionLoading(false);
    }
  };

  const handleCheckOut = async () => {
    setActionLoading(true);
    try {
      await checkOut();
      alert("Checked out successfully!");
      fetchAttendance();
    } catch (error) {
      alert(error.response?.data?.message || "Check-out failed");
    } finally {
      setActionLoading(false);
    }
  };

  const filteredAttendance = useMemo(() => {
    return attendance.filter((record) => {
      const matchesSearch = record.employee.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === "ALL" || record.status === statusFilter;
      const matchesDate = dateFilter === "" || record.date === dateFilter;
      return matchesSearch && matchesStatus && matchesDate;
    });
  }, [attendance, search, statusFilter, dateFilter]);

  const totalPages = Math.ceil(filteredAttendance.length / recordsPerPage);
  const startIndex = (currentPage - 1) * recordsPerPage;
  const currentAttendance = filteredAttendance.slice(startIndex, startIndex + recordsPerPage);

  const presentCount = filteredAttendance.filter((record) => record.status === "PRESENT").length;
  const absentCount = filteredAttendance.filter((record) => record.status === "ABSENT").length;
  const halfDayCount = filteredAttendance.filter((record) => record.status === "HALF_DAY").length;

  const handleClearFilters = () => {
    setSearch("");
    setStatusFilter("ALL");
    setDateFilter("");
    setCurrentPage(1);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
    setCurrentPage(1);
  };

  const handleStatusChange = (event) => {
    setStatusFilter(event.target.value);
    setCurrentPage(1);
  };

  const handleDateChange = (event) => {
    setDateFilter(event.target.value);
    setCurrentPage(1);
  };

  const handleEmployeeSelect = (employee) => {
    setSelectedEmployee(employee);
  };

  // Group attendance by date for the history section (client-side, backend has no direct endpoint for this)
  const history = useMemo(() => {
    const grouped = {};
    attendance.forEach((record) => {
      if (!grouped[record.date]) {
        grouped[record.date] = { id: record.date, date: record.date, present: 0, absent: 0, late: 0 };
      }
      if (record.status === "PRESENT") grouped[record.date].present += 1;
      if (record.status === "ABSENT") grouped[record.date].absent += 1;
      if (record.status === "HALF_DAY") grouped[record.date].late += 1;
    });
    return Object.values(grouped).sort((a, b) => (a.date < b.date ? 1 : -1));
  }, [attendance]);

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Attendance Dashboard</h1>
          <p className="text-sm text-gray-500">Loading attendance data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Heading + Check-In/Check-Out */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Attendance Dashboard</h1>
          <p className="text-sm text-gray-500">Manage employee attendance and attendance history.</p>
        </div>

        <div className="flex gap-3">
          <Button variant="primary" onClick={handleCheckIn} disabled={actionLoading}>
            Check In
          </Button>
          <Button variant="secondary" onClick={handleCheckOut} disabled={actionLoading}>
            Check Out
          </Button>
        </div>
      </div>

      {/* Attendance Statistics */}
      <AttendanceStats present={presentCount} absent={absentCount} late={halfDayCount} />

      {/* Search & Filter */}
      <section className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
        <h2 className="mb-4 text-base font-semibold text-gray-900">Search & Filter</h2>

        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <div className="w-full sm:w-56">
            <SearchBar value={search} onChange={handleSearch} placeholder="Search employee..." />
          </div>

          <select
            value={statusFilter}
            onChange={handleStatusChange}
            className="h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-700 outline-none transition-all duration-200 hover:border-gray-300 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10 sm:w-40"
          >
            <option value="ALL">All Status</option>
            <option value="PRESENT">Present</option>
            <option value="ABSENT">Absent</option>
            <option value="HALF_DAY">Half Day</option>
            <option value="LEAVE">Leave</option>
          </select>

          <input
            type="date"
            value={dateFilter}
            onChange={handleDateChange}
            className="h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-700 outline-none transition-all duration-200 hover:border-gray-300 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10 sm:w-44"
          />

          <Button variant="secondary" onClick={handleClearFilters}>
            Clear Filters
          </Button>
        </div>
      </section>

      {/* Employee Attendance Table */}
      <section>
        {currentAttendance.length > 0 ? (
          <AttendanceTable attendance={currentAttendance} />
        ) : (
          <div className="rounded-xl border border-gray-100 bg-white p-8 text-center text-sm text-gray-500 shadow-sm">
            No attendance records found.
          </div>
        )}
      </section>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      )}

      {/* Employee Selection */}
      <section className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
        <h2 className="mb-4 text-base font-semibold text-gray-900">Select Employee</h2>

        <div className="flex flex-wrap gap-2">
          {filteredAttendance.map((employee) => {
            const isSelected = selectedEmployee?.id === employee.id;
            return (
              <button
                key={employee.id}
                onClick={() => handleEmployeeSelect(employee)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  isSelected
                    ? "bg-violet-600 text-white"
                    : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                }`}
              >
                {employee.employee}
              </button>
            );
          })}
        </div>
      </section>

      {/* Selected Employee Card */}
      {selectedEmployee && (
        <AttendanceCard
          employee={selectedEmployee.employee}
          department=""
          present={selectedEmployee.status === "PRESENT" ? 1 : 0}
          absent={selectedEmployee.status === "ABSENT" ? 1 : 0}
          late={selectedEmployee.status === "HALF_DAY" ? 1 : 0}
        />
      )}

      {/* Attendance History */}
      <AttendanceHistory history={history} />
    </div>
  );
}

export default Attendance;
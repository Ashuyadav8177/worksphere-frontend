import { useEffect, useState } from "react";

import StatisticsCard from "../components/StatisticsCard";
import EmployeeOverview from "../components/EmployeeOverview";
import AttendanceOverview from "../components/AttendanceOverview";
import LeaveOverview from "../components/LeaveOverview";
import RecentActivities from "../components/RecentActivities";

import { getDashboardSummary } from "../../../services/dashboardService";
import { getAllAttendance } from "../../../services/attendanceService";
import { getAllLeaves } from "../../../services/leaveService";
import { getAllAuditLogs } from "../../../services/auditService";

function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [attendance, setAttendance] = useState([]);
  const [leaves, setLeaves] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const [
          summaryResponse,
          attendanceResponse,
          leavesResponse,
          auditLogsResponse,
        ] = await Promise.all([
          getDashboardSummary(),
          getAllAttendance(),
          getAllLeaves(),
          getAllAuditLogs(),
        ]);

        setSummary(summaryResponse.data);
        setAttendance(attendanceResponse.data);
        setLeaves(leavesResponse.data);
        setAuditLogs(auditLogsResponse.data);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
        setError("Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-75 items-center justify-center">
        <p className="text-sm text-gray-500">
          Loading dashboard...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-6">
        <p className="text-sm text-red-600">{error}</p>
      </div>
    );
  }

  if (!summary) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <p className="text-sm text-gray-500">
          No dashboard data available.
        </p>
      </div>
    );
  }

  // Get today's date in YYYY-MM-DD format
  const today = new Date();

  const todayDate = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");

  // Filter today's attendance records
  const todayAttendance = attendance.filter(
    (item) => item.date === todayDate
  );

  // Calculate today's attendance counts
  const presentCount = todayAttendance.filter(
    (item) => item.status === "PRESENT"
  ).length;

  const absentCount = todayAttendance.filter(
    (item) => item.status === "ABSENT"
  ).length;

  const halfDayCount = todayAttendance.filter(
    (item) => item.status === "HALF_DAY"
  ).length;

  const leaveCount = todayAttendance.filter(
    (item) => item.status === "LEAVE"
  ).length;

  // Calculate leave status counts
  const approvedLeaveCount = leaves.filter(
    (leave) => leave.status === "APPROVED"
  ).length;

  const pendingLeaveCount = leaves.filter(
    (leave) => leave.status === "PENDING"
  ).length;

  const rejectedLeaveCount = leaves.filter(
    (leave) => leave.status === "REJECTED"
  ).length;

  // Calculate pending tasks
  const pendingTasks = Math.max(
    summary.totalTasks - summary.completedTasks,
    0
  );

  // Prepare recent activities
  const recentActivities = auditLogs
    .slice()
    .sort(
      (a, b) =>
        new Date(b.timeStamp) - new Date(a.timeStamp)
    )
    .slice(0, 5)
    .map((log) => ({
      text: `${log.action} ${log.entityName} by ${log.performedBy}`,
      time: new Date(log.timeStamp).toLocaleString(),
    }));

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Dashboard
        </h1>

        <p className="text-sm text-gray-500">
          Home / Dashboard
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatisticsCard
          title="Total Employees"
          value={summary.totalEmployees}
          icon="👥"
          iconColor="violet"
        />

        <StatisticsCard
          title="Total Departments"
          value={summary.totalDepartments}
          icon="🏢"
          iconColor="emerald"
        />

        <StatisticsCard
          title="Pending Leaves"
          value={summary.pendingLeaves}
          icon="⛱️"
          iconColor="orange"
        />

        <StatisticsCard
          title="Pending Tasks"
          value={pendingTasks}
          icon="📝"
          iconColor="blue"
        />
      </div>

      {/* Dashboard Overview */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <EmployeeOverview
          total={summary.totalEmployees}
        />

        <AttendanceOverview
          present={presentCount}
          absent={absentCount}
          halfDay={halfDayCount}
          leave={leaveCount}
        />

        <LeaveOverview
          approved={approvedLeaveCount}
          pending={pendingLeaveCount}
          rejected={rejectedLeaveCount}
        />
      </div>

      {/* Recent Activities */}
      <RecentActivities
        activities={recentActivities}
      />
    </div>
  );
}

export default Dashboard;



import { Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "../components/layout/MainLayout";

// Auth
import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";
import ForgotPassword from "../features/auth/pages/ForgotPassword";
import ResetPassword from "../features/auth/pages/ResetPassword";

// Features
import Dashboard from "../features/dashboard/pages/Dashboard";
import Employees from "../features/employees/pages/Employees";
import Departments from "../features/departments/pages/Departments";
import Attendance from "../features/attendance/pages/Attendance";
import Leaves from "../features/leaves/pages/Leaves";
import Tasks from "../features/tasks/pages/Tasks";
import Notifications from "../features/notifications/pages/Notifications";
import Documents from "../features/documents/pages/Documents";
import Profile from "../features/profile/pages/Profile";
import Settings from "../features/settings/pages/Settings";
import Audit from "../features/audit/pages/Audit";

import NotFound from "../pages/NotFound";

function AppRoutes() {
  return (
    <Routes>
      {/* Auth Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* App Routes */}
      <Route path="/dashboard" element={<MainLayout><Dashboard /></MainLayout>} />
      <Route path="/employees" element={<MainLayout><Employees /></MainLayout>} />
      <Route path="/departments" element={<MainLayout><Departments /></MainLayout>} />
      <Route path="/attendance" element={<MainLayout><Attendance /></MainLayout>} />
      <Route path="/leaves" element={<MainLayout><Leaves /></MainLayout>} />
      <Route path="/tasks" element={<MainLayout><Tasks /></MainLayout>} />
      <Route path="/notifications" element={<MainLayout><Notifications /></MainLayout>} />
      <Route path="/documents" element={<MainLayout><Documents /></MainLayout>} />
      <Route path="/profile" element={<MainLayout><Profile /></MainLayout>} />
      <Route path="/settings" element={<MainLayout><Settings /></MainLayout>} />
      <Route path="/audit" element={<MainLayout><Audit /></MainLayout>} />

      {/* Default */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
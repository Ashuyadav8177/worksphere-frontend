import { useEffect, useState } from "react";

import EmployeeTable from "../components/EmployeeTable";
import EmployeeForm from "../components/EmployeeForm";
import EmployeeCard from "../components/EmployeeCard";
import EmployeeDetails from "../components/EmployeeDetails";

import Pagination from "../../../components/common/Pagination";
import Loader from "../../../components/common/Loader";
import SearchBar from "../../../components/ui/SearchBar";

import {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../../../services/employeeService";

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const employeesPerPage = 4;

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const response = await getEmployees();
      const mapped = response.data.content.map((emp) => ({
        id: emp.id,
        name: `${emp.firstName} ${emp.lastName}`,
        firstName: emp.firstName,
        lastName: emp.lastName,
        department: emp.department,
        designation: emp.designation,
        salary: emp.salary,
        email: emp.email,
        phone: emp.phone,
      }));
      setEmployees(mapped);
    } catch (error) {
      console.error("Failed to fetch employees", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleSubmitEmployee = async (employeeData) => {
    const nameParts = employeeData.name.trim().split(" ");
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(" ") || "";

    const payload = {
      firstName,
      lastName,
      email: employeeData.email,
      phone: employeeData.phone,
      department: employeeData.department,
      designation: employeeData.designation || "Employee",
      salary: employeeData.salary || 0,
    };

    try {
      if (editingEmployee) {
        await updateEmployee(editingEmployee.id, payload);
      } else {
        await createEmployee(payload);
        setCurrentPage(1);
      }
      setEditingEmployee(null);
      fetchEmployees();
    } catch (error) {
      console.error("Failed to save employee", error);
      alert(error.response?.data?.message || "Failed to save employee");
    }
  };

  const handleViewEmployee = (employee) => {
    setSelectedEmployee(employee);
  };

  const handleCloseDetails = () => {
    setSelectedEmployee(null);
  };

  const handleEditEmployee = (employee) => {
    setEditingEmployee(employee);
    setSelectedEmployee(null);
  };

  const handleDeleteEmployee = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this employee?");
    if (!confirmed) return;

    try {
      await deleteEmployee(id);

      if (selectedEmployee?.id === id) setSelectedEmployee(null);
      if (editingEmployee?.id === id) setEditingEmployee(null);

      fetchEmployees();
    } catch (error) {
      console.error("Failed to delete employee", error);
      alert(error.response?.data?.message || "Failed to delete employee");
    }
  };

  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredEmployees.length / employeesPerPage);
  const startIndex = (currentPage - 1) * employeesPerPage;
  const endIndex = startIndex + employeesPerPage;
  const currentEmployees = filteredEmployees.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setCurrentPage(1);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Employees</h1>
          <p className="text-sm text-gray-500">Home / Employees</p>
        </div>
        <Loader />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Employees</h1>
          <p className="text-sm text-gray-500">Home / Employees</p>
        </div>

        <div className="w-full sm:w-72">
          <SearchBar
            value={search}
            onChange={handleSearchChange}
            placeholder="Search employee..."
          />
        </div>
      </div>

      <EmployeeForm onSubmit={handleSubmitEmployee} employee={editingEmployee} />

      <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-semibold text-gray-900">Employee List</h2>
          <span className="text-xs text-gray-500">
            {filteredEmployees.length} employee{filteredEmployees.length !== 1 ? "s" : ""}
          </span>
        </div>

        <EmployeeTable
          employees={currentEmployees}
          onView={handleViewEmployee}
          onEdit={handleEditEmployee}
          onDelete={handleDeleteEmployee}
        />

        {totalPages > 1 && (
          <div className="mt-5">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>

      <div>
        <h2 className="mb-4 text-base font-semibold text-gray-900">Employee Cards</h2>

        {currentEmployees.length === 0 ? (
          <p className="text-sm text-gray-500">No employees found.</p>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {currentEmployees.map((employee) => (
              <EmployeeCard
                key={employee.id}
                employee={employee}
                onView={handleViewEmployee}
                onEdit={handleEditEmployee}
                onDelete={handleDeleteEmployee}
              />
            ))}
          </div>
        )}
      </div>

      {selectedEmployee && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={handleCloseDetails}
        >
          <div className="w-full max-w-sm" onClick={(e) => e.stopPropagation()}>
            <EmployeeDetails employee={selectedEmployee} onClose={handleCloseDetails} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Employees;
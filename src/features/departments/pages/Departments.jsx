import { useEffect, useState } from "react";

import DepartmentForm from "../components/DepartmentForm";
import DepartmentTable from "../components/DepartmentTable";

import Pagination from "../../../components/common/Pagination";
import Loader from "../../../components/common/Loader";
import SearchBar from "../../../components/ui/SearchBar";
import Button from "../../../components/common/Button";

import {
  getDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} from "../../../services/departmentService";
import { getEmployees } from "../../../services/employeeService";

function Departments() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [editingDepartment, setEditingDepartment] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const departmentsPerPage = 5;

  const fetchDepartments = async () => {
    setLoading(true);
    try {
      const [deptResponse, empResponse] = await Promise.all([
        getDepartments(),
        getEmployees(),
      ]);

      const employees = empResponse.data.content;

      const mapped = deptResponse.data.map((dept) => ({
        id: dept.id,
        name: dept.name,
        description: dept.description,
        employeeCount: employees.filter((emp) => emp.department === dept.name).length,
      }));

      setDepartments(mapped);
    } catch (error) {
      console.error("Failed to fetch departments", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleSubmitDepartment = async (departmentData) => {
    const payload = {
      name: departmentData.name,
      description: departmentData.description || "",
    };

    try {
      if (editingDepartment) {
        await updateDepartment(editingDepartment.id, payload);
      } else {
        await createDepartment(payload);
        setCurrentPage(1);
      }
      setEditingDepartment(null);
      setShowForm(false);
      fetchDepartments();
    } catch (error) {
      console.error("Failed to save department", error);
      alert(error.response?.data?.message || "Failed to save department");
    }
  };

  const handleEditDepartment = (department) => {
    setEditingDepartment(department);
    setShowForm(true);
  };

  const handleAddClick = () => {
    setEditingDepartment(null);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setEditingDepartment(null);
    setShowForm(false);
  };

  const handleDeleteDepartment = async (department) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${department.name}"?`
    );
    if (!confirmed) return;

    try {
      await deleteDepartment(department.id);
      fetchDepartments();
    } catch (error) {
      console.error("Failed to delete department", error);
      alert(error.response?.data?.message || "Failed to delete department");
    }
  };

  const filteredDepartments = departments.filter((department) =>
    department.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredDepartments.length / departmentsPerPage);
  const startIndex = (currentPage - 1) * departmentsPerPage;
  const endIndex = startIndex + departmentsPerPage;
  const currentDepartments = filteredDepartments.slice(startIndex, endIndex);

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
          <h1 className="text-2xl font-bold text-gray-900">Departments</h1>
          <p className="text-sm text-gray-500">Home / Departments</p>
        </div>
        <Loader />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Departments</h1>
          <p className="text-sm text-gray-500">Home / Departments</p>
        </div>

        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
          <div className="w-full sm:w-64">
            <SearchBar
              value={search}
              onChange={handleSearchChange}
              placeholder="Search department..."
            />
          </div>
          <Button variant="primary" onClick={handleAddClick}>
            + Add Department
          </Button>
        </div>
      </div>

      {showForm && (
        <DepartmentForm
          onSubmit={handleSubmitDepartment}
          department={editingDepartment}
          onCancel={handleCancelForm}
        />
      )}

      <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-semibold text-gray-900">Department List</h2>
          <span className="text-xs text-gray-500">
            {filteredDepartments.length} department{filteredDepartments.length !== 1 ? "s" : ""}
          </span>
        </div>

        <DepartmentTable
          departments={currentDepartments}
          onEdit={handleEditDepartment}
          onDelete={handleDeleteDepartment}
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
    </div>
  );
}

export default Departments;
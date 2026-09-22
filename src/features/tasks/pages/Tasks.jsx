import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";

import TaskTable from "../components/TaskTable";
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";
import TaskDetails from "../components/TaskDetails";

import SearchBar from "../../../components/ui/SearchBar";
import Button from "../../../components/common/Button";
import Pagination from "../../../components/common/Pagination";

import {
  createTask,
  getMyTasks,
  getAllTasks,
  updateTask,
  updateTaskStatus,
  deleteTask,
} from "../../../services/taskService";

function Tasks() {
  const role = useSelector((state) => state.auth.user?.role);
  const isApprover = role === "ADMIN" || role === "MANAGER";

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const [editingTask, setEditingTask] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const recordsPerPage = 5;

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = isApprover ? await getAllTasks() : await getMyTasks();
      const mapped = response.data.map((task) => ({
        id: task.id,
        title: task.title,
        description: task.description,
        assignedTo: task.assignedToName,
        assignedToId: task.assignedToId,
        assignedBy: task.assignedByName,
        status: task.status,
        dueDate: task.dueDate,
      }));
      setTasks(mapped);
    } catch (error) {
      console.error("Failed to fetch tasks", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [role]);

  const handleSubmitTask = async (taskData) => {
    const payload = {
      title: taskData.title,
      description: taskData.description,
      assignedToId: Number(taskData.assignedToId),
      dueDate: taskData.dueDate,
    };

    try {
      if (editingTask) {
        await updateTask(editingTask.id, payload);
      } else {
        await createTask(payload);
      }
      setEditingTask(null);
      fetchTasks();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to save task");
    }
  };

  const handleDeleteTask = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this task?");
    if (!confirmDelete) return;

    try {
      await deleteTask(id);
      if (selectedTask?.id === id) setSelectedTask(null);
      fetchTasks();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to delete task");
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateTaskStatus(id, newStatus);
      fetchTasks();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to update status");
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
  };

  const handleViewTask = (task) => {
    setSelectedTask(task);
  };

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(search.toLowerCase()) ||
        task.assignedTo.toLowerCase().includes(search.toLowerCase());

      const matchesStatus = statusFilter === "ALL" || task.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [tasks, search, statusFilter]);

  const totalPages = Math.ceil(filteredTasks.length / recordsPerPage);
  const startIndex = (currentPage - 1) * recordsPerPage;
  const currentTasks = filteredTasks.slice(startIndex, startIndex + recordsPerPage);

  const handleClearFilters = () => {
    setSearch("");
    setStatusFilter("ALL");
    setCurrentPage(1);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Task Dashboard</h1>
          <p className="text-sm text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Task Dashboard</h1>
        <p className="text-sm text-gray-500">Manage employee tasks.</p>
      </div>

      {/* Task Form (Create/Edit — ADMIN/MANAGER only) */}
      {isApprover && (
        <TaskForm onSubmit={handleSubmitTask} editingTask={editingTask} />
      )}

      {/* Search & Filter */}
      <section className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
        <h2 className="mb-4 text-base font-semibold text-gray-900">Search & Filter</h2>

        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <div className="w-full sm:w-64">
            <SearchBar
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search task or employee..."
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
            <option value="TODO">TODO</option>
            <option value="IN_PROGRESS">IN PROGRESS</option>
            <option value="DONE">DONE</option>
          </select>

          <Button variant="secondary" onClick={handleClearFilters}>
            Clear Filters
          </Button>
        </div>
      </section>

      {/* Task Table */}
      <TaskTable tasks={currentTasks} onView={handleViewTask} onEdit={isApprover ? handleEditTask : undefined} onDelete={isApprover ? handleDeleteTask : undefined} />

      {/* Actions — status change for everyone, edit/delete for approvers */}
      <section className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
        <h2 className="mb-4 text-base font-semibold text-gray-900">Task Actions</h2>

        <div className="divide-y divide-gray-100">
          {currentTasks.map((task) => (
            <div key={task.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
              <div>
                <h3 className="text-sm font-semibold text-gray-900">{task.title}</h3>
                <p className="text-xs text-gray-500">Assigned to: {task.assignedTo}</p>
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={task.status}
                  onChange={(event) => handleStatusChange(task.id, event.target.value)}
                  className="h-9 rounded-lg border border-gray-200 bg-white px-2 text-xs text-gray-700 outline-none focus:border-violet-500"
                >
                  <option value="TODO">TODO</option>
                  <option value="IN_PROGRESS">IN PROGRESS</option>
                  <option value="DONE">DONE</option>
                </select>

                <Button variant="secondary" size="sm" onClick={() => handleViewTask(task)}>
                  View
                </Button>

                {isApprover && (
                  <>
                    <Button variant="secondary" size="sm" onClick={() => handleEditTask(task)}>
                      Edit
                    </Button>
                    <Button variant="danger" size="sm" onClick={() => handleDeleteTask(task.id)}>
                      Delete
                    </Button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Selected Task - Card + Details, overlay */}
      {selectedTask && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setSelectedTask(null)}
        >
          <div className="flex w-full max-w-3xl flex-col gap-4 sm:flex-row" onClick={(e) => e.stopPropagation()}>
            <div className="flex-1">
              <TaskCard
                title={selectedTask.title}
                assignedTo={selectedTask.assignedTo}
                status={selectedTask.status}
                dueDate={selectedTask.dueDate}
              />
            </div>

            <div className="flex-1">
              <TaskDetails
                title={selectedTask.title}
                assignedTo={selectedTask.assignedTo}
                status={selectedTask.status}
                dueDate={selectedTask.dueDate}
                description={selectedTask.description}
                onClose={() => setSelectedTask(null)}
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

export default Tasks;
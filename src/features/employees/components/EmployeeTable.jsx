import { useSelector } from "react-redux";
import Table, { TableHead, TableHeaderCell, TableBody, TableRow, TableCell } from "../../../components/ui/Table";
import Badge from "../../../components/ui/Badge";
import EmptyState from "../../../components/common/EmptyState";

const statusVariant = {
  active: "active",
  pending: "pending",
  inactive: "inactive",
};

function EmployeeTable({ employees, onView, onEdit, onDelete }) {
  const role = useSelector((state) => state.auth.user?.role);
  const isAdmin = role === "ADMIN";

  if (!employees || employees.length === 0) {
    return <EmptyState title="No employees found.">Try adjusting your search or filters.</EmptyState>;
  }

  return (
    <Table>
      <TableHead>
        <TableHeaderCell>ID</TableHeaderCell>
        <TableHeaderCell>Name</TableHeaderCell>
        <TableHeaderCell>Department</TableHeaderCell>
        <TableHeaderCell>Designation</TableHeaderCell>
        <TableHeaderCell>Email</TableHeaderCell>
        <TableHeaderCell>Status</TableHeaderCell>
        <TableHeaderCell>Actions</TableHeaderCell>
      </TableHead>

      <TableBody>
        {employees.map((employee) => (
          <TableRow key={employee.id}>
            <TableCell className="font-medium text-gray-500">{employee.id}</TableCell>

            <TableCell>
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-violet-100 text-xs font-semibold text-violet-600">
                  {employee.name?.charAt(0)}
                </div>
                <span className="font-medium text-gray-900">{employee.name}</span>
              </div>
            </TableCell>

            <TableCell>{employee.department}</TableCell>

            <TableCell>{employee.designation}</TableCell>

            <TableCell className="text-gray-500">{employee.email}</TableCell>

            <TableCell>
              <Badge variant={statusVariant[employee.status?.toLowerCase()] || "default"}>
                {employee.status?.toUpperCase()}
              </Badge>
            </TableCell>

            <TableCell>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => onView(employee)}
                  aria-label="View employee"
                  className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-violet-50 hover:text-violet-600"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>

                {isAdmin && (
                  <button
                    type="button"
                    onClick={() => onEdit(employee)}
                    aria-label="Edit employee"
                    className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-blue-50 hover:text-blue-600"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" />
                    </svg>
                  </button>
                )}

                {isAdmin && onDelete && (
                  <button
                    type="button"
                    onClick={() => onDelete(employee.id)}
                    aria-label="Delete employee"
                    className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                  </button>
                )}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default EmployeeTable;
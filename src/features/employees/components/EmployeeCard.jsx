import Badge from "../../../components/ui/Badge";
import Button from "../../../components/common/Button";

const statusVariant = {
  active: "active",
  pending: "pending",
  inactive: "inactive",
};

function EmployeeCard({ employee, onView, onEdit }) {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-violet-100 text-base font-semibold text-violet-600">
          {employee.name?.charAt(0)}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-semibold text-gray-900">{employee.name}</h3>
          <p className="truncate text-xs text-gray-500">{employee.department}</p>
        </div>
        <Badge variant={statusVariant[employee.status?.toLowerCase()] || "default"}>
          {employee.status?.toUpperCase()}
        </Badge>
      </div>

      {/* Details */}
      <div className="mt-4 space-y-2 border-t border-gray-100 pt-4">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
          </svg>
          <span className="truncate">{employee.email}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
          </svg>
          <span>{employee.phone}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-4 flex gap-2 border-t border-gray-100 pt-4">
        <Button variant="secondary" size="sm" className="flex-1" onClick={() => onView(employee)}>
          View
        </Button>
        <Button variant="primary" size="sm" className="flex-1" onClick={() => onEdit(employee)}>
          Edit
        </Button>
      </div>
    </div>
  );
}

export default EmployeeCard;
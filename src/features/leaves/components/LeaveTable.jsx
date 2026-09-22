import Table, { TableHead, TableHeaderCell, TableBody, TableRow, TableCell } from "../../../components/ui/Table";
import Badge from "../../../components/ui/Badge";
import EmptyState from "../../../components/common/EmptyState";

const statusVariant = {
  approved: "active",
  pending: "pending",
  rejected: "inactive",
};

function LeaveTable({ leaves, onView }) {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
      <h2 className="mb-4 text-base font-semibold text-gray-900">Leave List</h2>

      {!leaves || leaves.length === 0 ? (
        <EmptyState title="No leave requests found." />
      ) : (
        <Table>
          <TableHead>
            <TableHeaderCell>ID</TableHeaderCell>
            <TableHeaderCell>Employee</TableHeaderCell>
            <TableHeaderCell>Leave Type</TableHeaderCell>
            <TableHeaderCell>Start Date</TableHeaderCell>
            <TableHeaderCell>End Date</TableHeaderCell>
            <TableHeaderCell>Reason</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
            <TableHeaderCell>Action</TableHeaderCell>
          </TableHead>

          <TableBody>
            {leaves.map((leave) => (
              <TableRow key={leave.id}>
                <TableCell className="font-medium text-gray-500">{leave.id}</TableCell>

                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-violet-100 text-xs font-semibold text-violet-600">
                      {leave.employee?.charAt(0)}
                    </div>
                    <span className="font-medium text-gray-900">{leave.employee}</span>
                  </div>
                </TableCell>

                <TableCell>{leave.leaveType}</TableCell>
                <TableCell className="text-gray-500">{leave.startDate}</TableCell>
                <TableCell className="text-gray-500">{leave.endDate}</TableCell>
                <TableCell className="max-w-45 truncate text-gray-500">{leave.reason}</TableCell>

                <TableCell>
                  <Badge variant={statusVariant[leave.status?.toLowerCase()] || "default"}>
                    {leave.status?.toUpperCase()}
                  </Badge>
                </TableCell>

                <TableCell>
                  <button
                    type="button"
                    onClick={() => onView && onView(leave)}
                    className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-violet-50 hover:text-violet-600"
                    aria-label="View leave"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}

export default LeaveTable;
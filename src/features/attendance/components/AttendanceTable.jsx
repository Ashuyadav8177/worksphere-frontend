import Table, { TableHead, TableHeaderCell, TableBody, TableRow, TableCell } from "../../../components/ui/Table";
import Badge from "../../../components/ui/Badge";
import EmptyState from "../../../components/common/EmptyState";

const statusVariant = {
  present: "active",
  absent: "inactive",
  late: "pending",
  "half day": "pending",
};

function AttendanceTable({ attendance }) {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
      <h2 className="mb-4 text-base font-semibold text-gray-900">Employee Attendance</h2>

      {!attendance || attendance.length === 0 ? (
        <EmptyState title="No attendance records found." />
      ) : (
        <Table>
          <TableHead>
            <TableHeaderCell>ID</TableHeaderCell>
            <TableHeaderCell>Employee</TableHeaderCell>
            <TableHeaderCell>Date</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
          </TableHead>

          <TableBody>
            {attendance.map((record) => (
              <TableRow key={record.id}>
                <TableCell className="font-medium text-gray-500">{record.id}</TableCell>

                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-violet-100 text-xs font-semibold text-violet-600">
                      {record.employee?.charAt(0)}
                    </div>
                    <span className="font-medium text-gray-900">{record.employee}</span>
                  </div>
                </TableCell>

                <TableCell className="text-gray-500">{record.date}</TableCell>

                <TableCell>
                  <Badge variant={statusVariant[record.status?.toLowerCase()] || "default"}>
                    {record.status?.toUpperCase()}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}

export default AttendanceTable;

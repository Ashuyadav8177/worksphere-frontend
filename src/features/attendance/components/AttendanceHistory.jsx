import Table, { TableHead, TableHeaderCell, TableBody, TableRow, TableCell } from "../../../components/ui/Table";
import EmptyState from "../../../components/common/EmptyState";

function AttendanceHistory({ history }) {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
      <h2 className="mb-4 text-base font-semibold text-gray-900">Attendance History</h2>

      {!history || history.length === 0 ? (
        <EmptyState title="No history found.">No attendance records to display.</EmptyState>
      ) : (
        <Table>
          <TableHead>
            <TableHeaderCell>Date</TableHeaderCell>
            <TableHeaderCell>Present</TableHeaderCell>
            <TableHeaderCell>Absent</TableHeaderCell>
            <TableHeaderCell>Late</TableHeaderCell>
          </TableHead>

          <TableBody>
            {history.map((record) => (
              <TableRow key={record.id}>
                <TableCell className="font-medium text-gray-900">{record.date}</TableCell>
                <TableCell>
                  <span className="font-semibold text-emerald-600">{record.present}</span>
                </TableCell>
                <TableCell>
                  <span className="font-semibold text-red-600">{record.absent}</span>
                </TableCell>
                <TableCell>
                  <span className="font-semibold text-orange-600">{record.late}</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}

export default AttendanceHistory;

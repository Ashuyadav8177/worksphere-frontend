import Table, { TableHead, TableHeaderCell, TableBody, TableRow, TableCell } from "../../../components/ui/Table";
import EmptyState from "../../../components/common/EmptyState";

const actionStyles = {
  CREATE: "bg-emerald-100 text-emerald-700",
  UPDATE: "bg-blue-100 text-blue-700",
  DELETE: "bg-red-100 text-red-700",
  LOGIN: "bg-violet-100 text-violet-700",
};

function AuditTable({ logs }) {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
      <h2 className="mb-4 text-base font-semibold text-gray-900">Audit Logs</h2>

      {!logs || logs.length === 0 ? (
        <EmptyState title="No audit logs found." />
      ) : (
        <Table>
          <TableHead>
            <TableHeaderCell>ID</TableHeaderCell>
            <TableHeaderCell>User</TableHeaderCell>
            <TableHeaderCell>Action</TableHeaderCell>
            <TableHeaderCell>Resource</TableHeaderCell>
            <TableHeaderCell>Timestamp</TableHeaderCell>
            <TableHeaderCell>IP Address</TableHeaderCell>
          </TableHead>

          <TableBody>
            {logs.map((log) => (
              <TableRow key={log.id}>
                <TableCell className="font-medium text-gray-500">{log.id}</TableCell>

                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-violet-100 text-xs font-semibold text-violet-600">
                      {log.user?.charAt(0)}
                    </div>
                    <span className="font-medium text-gray-900">{log.user}</span>
                  </div>
                </TableCell>

                <TableCell>
                  <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${actionStyles[log.action] || "bg-gray-100 text-gray-600"}`}>
                    {log.action}
                  </span>
                </TableCell>

                <TableCell className="text-gray-700">{log.resource}</TableCell>
                <TableCell className="text-gray-500">{log.timestamp}</TableCell>
                <TableCell className="font-mono text-xs text-gray-500">{log.ip}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}

export default AuditTable;
export { actionStyles };
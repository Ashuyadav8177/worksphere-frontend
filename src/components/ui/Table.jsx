function Table({ children }) {
  return (
    <div className="w-full overflow-x-auto rounded-lg border border-gray-100">
      <table className="w-full text-left text-sm">
        {children}
      </table>
    </div>
  );
}

export function TableHead({ children }) {
  return (
    <thead className="bg-gray-50">
      <tr className="border-b border-gray-100">{children}</tr>
    </thead>
  );
}

export function TableHeaderCell({ children }) {
  return (
    <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
      {children}
    </th>
  );
}

export function TableBody({ children }) {
  return <tbody className="divide-y divide-gray-100">{children}</tbody>;
}

export function TableRow({ children, className = "" }) {
  return (
    <tr className={`transition-colors hover:bg-gray-50 ${className}`}>
      {children}
    </tr>
  );
}

export function TableCell({ children, className = "" }) {
  return (
    <td className={`px-5 py-4 text-sm text-gray-700 ${className}`}>
      {children}
    </td>
  );
}

export default Table;
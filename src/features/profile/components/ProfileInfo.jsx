function ProfileInfo({ name, email, phone, department, designation, employeeId, joiningDate }) {
  const details = [
    { label: "Full Name", value: name },
    { label: "Email", value: email },
    { label: "Phone", value: phone },
    { label: "Department", value: department },
    { label: "Designation", value: designation },
    { label: "Employee ID", value: employeeId },
    { label: "Date of Joining", value: joiningDate },
  ];

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
      <h2 className="mb-5 text-base font-semibold text-gray-900">Personal Information</h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {details.map((item) => (
          <div key={item.label}>
            <p className="text-xs text-gray-500">{item.label}</p>
            <p className="mt-1 text-sm font-medium text-gray-900">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProfileInfo;
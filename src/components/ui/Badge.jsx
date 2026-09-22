function Badge({
  children,
  variant = "default",
}) {
  const baseStyles =
    "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold";

  const variants = {
    default: "bg-gray-100 text-gray-700",
    active: "bg-emerald-100 text-emerald-700",
    pending: "bg-orange-100 text-orange-700",
    inactive: "bg-red-100 text-red-700",
    new: "bg-blue-100 text-blue-700",
  };

  return (
    <span className={`${baseStyles} ${variants[variant] || variants.default}`}>
      {children}
    </span>
  );
}

export default Badge;
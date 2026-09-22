function Button({
  children,
  type = "button",
  variant = "primary",
  size = "md",
  disabled = false,
  onClick,
  className = "",
}) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

  const variants = {
    primary:
      "bg-violet-600 text-white shadow-sm hover:bg-violet-700 hover:shadow-md focus:ring-violet-500",

    secondary:
      "border border-gray-200 bg-white text-gray-700 shadow-sm hover:bg-gray-50 hover:border-gray-300 focus:ring-gray-400",

    danger:
      "bg-red-600 text-white shadow-sm hover:bg-red-700 hover:shadow-md focus:ring-red-500",

    success:
      "bg-emerald-600 text-white shadow-sm hover:bg-emerald-700 hover:shadow-md focus:ring-emerald-500",

    warning:
      "bg-orange-500 text-white shadow-sm hover:bg-orange-600 hover:shadow-md focus:ring-orange-400",

    ghost:
      "text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:ring-gray-400",
  };

  const sizes = {
    sm: "h-8 px-3 text-xs",
    md: "h-10 px-4 text-sm",
    lg: "h-11 px-5 text-sm",
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
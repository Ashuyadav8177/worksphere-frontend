function Card({
  title,
  subtitle,
  children,
  variant = "default",
  action,
  padding = "md",
  hover = false,
  className = "",
}) {
  const variants = {
    default: "border-gray-100 bg-white",
    primary: "border-violet-100 bg-violet-50/40",
    success: "border-emerald-100 bg-emerald-50/40",
    warning: "border-amber-100 bg-amber-50/40",
    danger: "border-red-100 bg-red-50/40",
  };

  const paddings = {
    sm: "p-4",
    md: "p-5",
    lg: "p-6",
  };

  return (
    <section
      className={`
        w-full
        overflow-hidden
        rounded-xl
        border
        shadow-sm
        ${variants[variant]}
        ${hover ? "transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md" : ""}
        ${className}
      `}
    >
      {/* Header */}
      {(title || subtitle || action) && (
        <div
          className={`
            flex
            items-start
            justify-between
            gap-4
            border-b
            border-gray-100
            ${paddings[padding]}
          `}
        >
          <div className="min-w-0">
            {title && (
              <h3 className="text-base font-semibold text-gray-900">
                {title}
              </h3>
            )}

            {subtitle && (
              <p className="mt-1 text-sm text-gray-500">
                {subtitle}
              </p>
            )}
          </div>

          {action && (
            <div className="shrink-0">
              {action}
            </div>
          )}
        </div>
      )}

      {/* Body */}
      <div className={paddings[padding]}>
        {children}
      </div>
    </section>
  );
}

export default Card;
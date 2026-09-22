function Input({
  label,
  name,
  type = "text",
  value,
  placeholder = "",
  disabled = false,
  required = false,
  error = "",
  helperText = "",
  leftIcon,
  rightIcon,
  onChange,
  onBlur,
  className = "",
  ...props
}) {
  const hasError = Boolean(error);

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={name}
          className="mb-1.5 block text-sm font-medium text-gray-700"
        >
          {label}
          {required && (
            <span className="ml-1 text-red-500" aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}

      <div className="relative">
        {leftIcon && (
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {leftIcon}
          </span>
        )}

        <input
          id={name}
          type={type}
          name={name}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          onChange={onChange}
          onBlur={onBlur}
          aria-invalid={hasError}
          aria-describedby={
            error ? `${name}-error` : helperText ? `${name}-helper` : undefined
          }
          className={`
            h-10 w-full rounded-lg border bg-white px-3 text-sm text-gray-900
            outline-none transition-all duration-200 placeholder:text-gray-400
            ${leftIcon ? "pl-10" : ""}
            ${rightIcon ? "pr-10" : ""}
            ${
              hasError
                ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/10"
                : "border-gray-200 hover:border-gray-300 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10"
            }
            disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-100
            disabled:text-gray-400 disabled:placeholder:text-gray-400
            ${className}
          `}
          {...props}
        />

        {rightIcon && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            {rightIcon}
          </span>
        )}
      </div>

      {error && (
        <p id={`${name}-error`} className="mt-1.5 text-xs font-medium text-red-500">
          {error}
        </p>
      )}

      {!error && helperText && (
        <p id={`${name}-helper`} className="mt-1.5 text-xs text-gray-500">
          {helperText}
        </p>
      )}
    </div>
  );
}

export default Input;
import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  helperText?: string;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className, ...props }, ref) => {
    return (
      <div>
        <label className="block text-sm font-medium mb-2">
          {label}
        </label>

        <input
          ref={ref}
          {...props}
          className={`
            w-full rounded-lg border px-4 py-3
            focus:outline-none focus:ring-2
            ${
              error
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }
            ${className}
          `}
        />

         {helperText && (
          <p className="mt-1 text-xs text-gray-500">
            {helperText}
          </p>
        )}

        {error && (
          <p className="mt-1 text-sm text-red-500">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
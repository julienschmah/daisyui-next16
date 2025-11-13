import React from 'react';

interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  selectSize?: 'sm' | 'md' | 'lg';
  options?: { value: string; label: string }[];
  children?: React.ReactNode;
}

export function Select({
  label,
  error,
  helperText,
  fullWidth = false,
  selectSize = 'md',
  options = [],
  children,
  className = '',
  disabled = false,
  ...props
}: SelectProps) {
  const sizeClasses = {
    sm: 'select-sm',
    md: '',
    lg: 'select-lg',
  };

  const baseClasses = 'select select-bordered transition-all duration-200';
  const widthClasses = fullWidth ? 'w-full' : '';
  const errorClasses = error ? 'select-error' : '';
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';

  const finalClassName = `
    ${baseClasses}
    ${sizeClasses[selectSize]}
    ${widthClasses}
    ${errorClasses}
    ${disabledClasses}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <div className="form-control w-full">
      {label && (
        <label className="label">
          <span className="label-text font-semibold text-base-content">{label}</span>
        </label>
      )}
      <select className={finalClassName} disabled={disabled} {...props}>
        {options.length > 0
          ? options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))
          : children}
      </select>
      {error && (
        <label className="label">
          <span className="label-text-alt text-error">{error}</span>
        </label>
      )}
      {helperText && !error && (
        <label className="label">
          <span className="label-text-alt text-base-content/70">{helperText}</span>
        </label>
      )}
    </div>
  );
}

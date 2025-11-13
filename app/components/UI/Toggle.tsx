import React from 'react';

interface ToggleProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  helperText?: string;
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
}

export function Toggle({
  label,
  helperText,
  size = 'md',
  color = 'primary',
  className = '',
  disabled = false,
  ...props
}: ToggleProps) {
  const sizeClasses = {
    sm: 'toggle-sm',
    md: '',
    lg: 'toggle-lg',
  };

  const colorClasses = {
    primary: 'toggle-primary',
    secondary: 'toggle-secondary',
    success: 'toggle-success',
    warning: 'toggle-warning',
    error: 'toggle-error',
    info: 'toggle-info',
  };

  const baseClasses = 'toggle transition-all duration-200';
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';

  const finalClassName = `
    ${baseClasses}
    ${sizeClasses[size]}
    ${colorClasses[color]}
    ${disabledClasses}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <div className="form-control">
      {label && (
        <label className="label cursor-pointer flex justify-start gap-3">
          <input
            type="checkbox"
            className={finalClassName}
            disabled={disabled}
            {...props}
          />
          <span className="label-text font-semibold text-base-content">{label}</span>
        </label>
      )}
      {!label && (
        <input
          type="checkbox"
          className={finalClassName}
          disabled={disabled}
          {...props}
        />
      )}
      {helperText && (
        <label className="label">
          <span className="label-text-alt text-base-content/70">{helperText}</span>
        </label>
      )}
    </div>
  );
}

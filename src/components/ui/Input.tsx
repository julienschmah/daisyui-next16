import React from 'react';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'ghost';
  inputSize?: 'sm' | 'md' | 'lg';
  label?: string | React.ReactNode;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  type?: string;
}

export function Input({
  variant = 'primary',
  inputSize = 'md',
  label,
  error,
  helperText,
  fullWidth = false,
  icon,
  iconPosition = 'right',
  className = '',
  disabled = false,
  type = 'text',
  ...props
}: InputProps) {

  const isSpecialType = ['radio', 'checkbox', 'range', 'file'].includes(type);

  if (isSpecialType) {
    return (
      <input
        type={type}
        {...props}
        disabled={disabled}
        className={className}
      />
    );
  }

  const variantClasses = {
    primary: 'input-primary',
    secondary: 'input-secondary',
    success: 'input-success',
    warning: 'input-warning',
    error: 'input-error',
    info: 'input-info',
    ghost: 'input-ghost',
  };

  const sizeClasses = {
    sm: 'input-sm',
    md: '',
    lg: 'input-lg',
  };

  const baseClasses = 'input input-bordered transition-all duration-200';
  const widthClasses = fullWidth ? 'w-full' : '';
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';
  const borderClasses = error ? 'border-error' : '';

  const finalClassName = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${sizeClasses[inputSize]}
    ${widthClasses}
    ${disabledClasses}
    ${borderClasses}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <div className="form-control w-full">
      {label && (
        <label className="label">
          {typeof label === 'string' ? (
            <span className="label-text font-semibold text-base-content">
              {label}
            </span>
          ) : (
            label
          )}
        </label>
      )}
      
      <div className="relative">
        {icon && iconPosition === 'left' && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/50 pointer-events-none">
            {icon}
          </div>
        )}
        
        <input
          type={type}
          {...props}
          disabled={disabled}
          className={`
            ${finalClassName}
            ${icon && iconPosition === 'left' ? 'pl-10' : ''}
            ${icon && iconPosition === 'right' ? 'pr-10' : ''}
          `}
        />
        
        {icon && iconPosition === 'right' && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-base-content/50 pointer-events-none">
            {icon}
          </div>
        )}
      </div>

      {error && (
        <label className="label">
          <span className="label-text-alt text-error font-semibold">
            {error}
          </span>
        </label>
      )}

      {helperText && !error && (
        <label className="label">
          <span className="label-text-alt text-base-content/70">
            {helperText}
          </span>
        </label>
      )}
    </div>
  );
}

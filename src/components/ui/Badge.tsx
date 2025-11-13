import React from 'react';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export function Badge({
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}: BadgeProps) {
  const variantClasses = {
    primary: 'badge-primary',
    secondary: 'badge-secondary',
    success: 'badge-success',
    warning: 'badge-warning',
    error: 'badge-error',
    info: 'badge-info',
    ghost: 'badge-ghost',
  };

  const sizeClasses = {
    sm: 'badge-sm',
    md: '',
    lg: 'badge-lg',
  };

  const classes = `badge ${variantClasses[variant]} ${sizeClasses[size]} ${className}`.trim();

  return (
    <span className={classes} {...props} />
  );
}

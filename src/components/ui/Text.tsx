import React from 'react';

interface TextProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'body' | 'label' | 'caption' | 'badge' | 'subtitle';
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl';
  weight?: 'light' | 'normal' | 'semibold' | 'bold';
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'base' | 'muted';
  children: React.ReactNode;
}

export function Text({
  variant = 'body',
  size = 'base',
  weight = 'normal',
  color = 'base',
  className = '',
  ...props
}: TextProps) {
  const variantClasses = {
    body: 'text-base-content',
    label: 'text-base-content font-semibold',
    caption: 'text-xs text-base-content/70',
    badge: 'text-xs font-bold',
    subtitle: 'text-sm text-base-content/70',
  };

  const sizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
  };

  const weightClasses = {
    light: 'font-light',
    normal: 'font-normal',
    semibold: 'font-semibold',
    bold: 'font-bold',
  };

  const colorClasses = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    success: 'text-success',
    warning: 'text-warning',
    error: 'text-error',
    info: 'text-info',
    base: 'text-base-content',
    muted: 'text-base-content/70',
  };

  const classes = `
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${weightClasses[weight]}
    ${colorClasses[color]}
    ${className}
  `.trim();

  return (
    <span className={classes} {...props} />
  );
}

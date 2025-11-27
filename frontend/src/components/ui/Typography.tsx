import React from 'react';

interface TypographyProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'body' | 'body2' | 'label' | 'caption' | 'badge' | 'subtitle' | 'h1' | 'h2' | 'h3' | 'h4';
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
  weight?: 'light' | 'normal' | 'semibold' | 'bold';
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'base' | 'muted';
  children: React.ReactNode;
  as?: React.ElementType;
}

export function Typography({
  variant = 'body',
  size = 'base',
  weight = 'normal',
  color = 'base',
  className = '',
  as,
  ...props
}: TypographyProps) {
  const variantClasses = {
    body: 'text-base-content',
    body2: 'text-sm text-base-content/80',
    label: 'text-base-content font-semibold',
    caption: 'text-xs text-base-content/70',
    badge: 'text-xs font-bold',
    subtitle: 'text-sm text-base-content/70',
    h1: 'text-3xl font-bold text-base-content',
    h2: 'text-2xl font-bold text-base-content',
    h3: 'text-xl font-bold text-base-content',
    h4: 'text-lg font-bold text-base-content',
  };

  const sizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
    '4xl': 'text-4xl',
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
    ${size && size !== 'base' ? sizeClasses[size] : ''}
    ${weight && weight !== 'normal' ? weightClasses[weight] : ''}
    ${color && color !== 'base' ? colorClasses[color] : ''}
    ${className}
  `.trim();

  const Component = as || (variant.startsWith('h') ? variant : 'span') as React.ElementType;

  return (
    <Component className={classes} {...props} />
  );
}

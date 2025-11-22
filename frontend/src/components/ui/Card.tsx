'use client';

import React from 'react';

interface CardProps {
  title?: string;
  subtitle?: string;
  icon?: string | React.ReactNode;
  children: React.ReactNode;
  className?: string;
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  bordered?: boolean;
}

export function Card({
  title,
  subtitle,
  icon,
  children,
  className = '',
  shadow = 'lg',
  bordered = false,
}: CardProps) {
  const shadowClasses = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
  };

  return (
    <div
      className={`card bg-base-200 ${shadowClasses[shadow]} ${bordered ? 'border border-base-300' : ''} ${className}`}
    >
      <div className="card-body">
        {(title || subtitle || icon) && (
          <div className="mb-4">
            <div className="flex items-center gap-3 mb-2">
              {icon && <span className="text-2xl">{icon}</span>}
              {title && <h3 className="card-title text-primary">{title}</h3>}
            </div>
            {subtitle && <p className="text-sm text-base-content/70">{subtitle}</p>}
          </div>
        )}
        {children}
      </div>
    </div>
  );
}

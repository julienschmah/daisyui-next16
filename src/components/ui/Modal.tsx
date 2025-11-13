'use client';

import React, { useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  icon?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  closeButton?: boolean;
  backdrop?: 'click' | 'none';
  className?: string;
}

export function Modal({
  isOpen,
  onClose,
  title,
  subtitle,
  icon,
  children,
  size = 'md',
  closeButton = true,
  backdrop = 'click',
  className = '',
}: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const sizeClasses = {
    sm: 'w-96',
    md: 'w-full max-w-md',
    lg: 'w-full max-w-lg',
    xl: 'w-full max-w-xl',
  };

  const handleBackdropClick = () => {
    if (backdrop === 'click') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={handleBackdropClick}
      ></div>

      <div
        className={`relative bg-base-100 rounded-lg shadow-2xl p-6 ${sizeClasses[size]} ${className}`}
      >
        {(title || closeButton) && (
          <div className="mb-4 flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                {icon && <span className="text-2xl">{icon}</span>}
                {title && <h3 className="text-xl font-bold text-primary">{title}</h3>}
              </div>
              {subtitle && <p className="text-sm text-base-content/70">{subtitle}</p>}
            </div>
            {closeButton && (
              <button
                onClick={onClose}
                className="btn btn-ghost btn-sm btn-circle ml-2 flex-shrink-0"
              >
                ✕
              </button>
            )}
          </div>
        )}

        {title && <div className="divider my-2"></div>}

        <div className="overflow-y-auto max-h-96">
          {children}
        </div>
      </div>
    </div>
  );
}

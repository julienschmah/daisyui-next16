'use client';

import React from 'react';

export interface ListItem {
  id: string | number;
  label: string;
  description?: string;
  icon?: string;
  badge?: string;
  badgeColor?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error' | 'info';
  action?: React.ReactNode;
  onClick?: () => void;
  selected?: boolean;
}

interface ListProps {
  items: ListItem[];
  variant?: 'default' | 'bordered' | 'compact';
  className?: string;
  emptyMessage?: string;
}

export function List({
  items,
  variant = 'default',
  className = '',
  emptyMessage = 'Nenhum item encontrado',
}: ListProps) {
  if (items.length === 0) {
    return (
      <div className="text-center py-8 text-base-content/50">
        <p>{emptyMessage}</p>
      </div>
    );
  }

  const variantClasses = {
    default: 'gap-4',
    bordered: 'gap-3 divide-y divide-base-300',
    compact: 'gap-2',
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {items.map((item) => (
        <div
          key={item.id}
          onClick={item.onClick}
          className={`flex items-center justify-between p-4 rounded-lg transition-all ${
            variant === 'bordered' ? 'bg-base-100 border border-base-300' : 'bg-base-100 hover:bg-base-200'
          } ${item.selected ? 'ring-2 ring-primary' : ''} ${item.onClick ? 'cursor-pointer' : ''}`}
        >
          <div className="flex items-center gap-3 flex-1">
            {item.icon && <span className="text-xl">{item.icon}</span>}
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-primary truncate">{item.label}</p>
              {item.description && (
                <p className="text-sm text-base-content/70 truncate">{item.description}</p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            {item.badge && (
              <span
                className={`badge badge-${item.badgeColor || 'primary'} text-xs`}
              >
                {item.badge}
              </span>
            )}
            {item.action && <div>{item.action}</div>}
          </div>
        </div>
      ))}
    </div>
  );
}

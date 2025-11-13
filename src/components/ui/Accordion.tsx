import React, { ReactNode } from 'react';
import { ChevronDown } from '@/components/ui';

export interface AccordionItemProps {
  id: string;
  title: ReactNode;
  subtitle?: ReactNode;
  icon?: ReactNode;
  badge?: ReactNode;
  children: ReactNode;
  isExpanded?: boolean;
  onToggle?: () => void;
}

interface AccordionProps {
  items: AccordionItemProps[];
  expandedIds?: string[];
  onToggle?: (id: string) => void;
  className?: string;
  allowMultiple?: boolean;
}

export function Accordion({ items, expandedIds = [], onToggle, className = '', allowMultiple = true }: AccordionProps) {
  const handleToggle = (id: string) => {
    if (onToggle) {
      onToggle(id);
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {items.map((item) => {
        const isExpanded = expandedIds.includes(item.id);

        return (
          <div
            key={item.id}
            className="bg-base-100 border border-base-300 rounded-lg overflow-hidden hover:shadow-sm transition-shadow"
          >
            <button
              onClick={() => handleToggle(item.id)}
              className="w-full flex items-center justify-between p-4 hover:bg-base-200/40 transition-colors text-left"
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                {item.icon && <span className="text-xl flex-shrink-0">{item.icon}</span>}
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-base-content">{item.title}</h3>
                  </div>
                  {item.subtitle && (
                    <p className="text-xs text-base-content/60 truncate">{item.subtitle}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 ml-4 flex-shrink-0">
                {item.badge}
                <ChevronDown
                  size={18}
                  className={`transition-transform text-base-content/50 ${
                    isExpanded ? 'rotate-180' : ''
                  }`}
                />
              </div>
            </button>

            {isExpanded && (
              <div className="bg-base-50 border-t border-base-300 p-4">
                {item.children}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

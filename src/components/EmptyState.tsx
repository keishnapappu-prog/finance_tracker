import React from 'react';
import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  iconColor?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  iconColor = 'text-gray-400',
}: EmptyStateProps) {
  return (
    <div className="text-center py-12">
      <div className={`flex justify-center mb-4 ${iconColor}`}>
        <Icon size={48} />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-6">{description}</p>
      {action && (
        <button
          onClick={action.onClick}
          className="px-6 py-2 bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-lg font-semibold hover:from-emerald-600 hover:to-blue-600 transition"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}

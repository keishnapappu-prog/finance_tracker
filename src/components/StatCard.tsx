import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  change?: {
    value: number;
    isPositive: boolean;
  };
  color?: 'blue' | 'emerald' | 'red' | 'amber';
  trend?: 'up' | 'down' | 'stable';
}

export function StatCard({
  icon: Icon,
  label,
  value,
  change,
  color = 'blue',
  trend,
}: StatCardProps) {
  const colorStyles = {
    blue: { bg: 'bg-blue-50', icon: 'text-blue-600', text: 'text-blue-600' },
    emerald: { bg: 'bg-emerald-50', icon: 'text-emerald-600', text: 'text-emerald-600' },
    red: { bg: 'bg-red-50', icon: 'text-red-600', text: 'text-red-600' },
    amber: { bg: 'bg-amber-50', icon: 'text-amber-600', text: 'text-amber-600' },
  };

  const style = colorStyles[color];

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition">
      <div className="flex items-center justify-between mb-3">
        <div className={`w-12 h-12 ${style.bg} rounded-lg flex items-center justify-center`}>
          <Icon className={style.icon} size={24} />
        </div>
        {trend && (
          <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700 font-medium">
            {trend === 'up' ? '↑ Up' : trend === 'down' ? '↓ Down' : '→ Stable'}
          </span>
        )}
      </div>
      <div className="text-sm text-gray-600 mb-1">{label}</div>
      <div className="text-2xl font-bold text-gray-900 mb-2">{value}</div>
      {change && (
        <div className={`text-xs font-medium ${change.isPositive ? 'text-emerald-600' : 'text-red-600'}`}>
          {change.isPositive ? '+' : '-'}{Math.abs(change.value).toFixed(1)}% from last month
        </div>
      )}
    </div>
  );
}

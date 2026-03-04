import React from 'react';
import { LucideIcon } from 'lucide-react';

interface PhaseHeaderProps {
  phase: string;
  title: string;
  icon?: LucideIcon;
  time?: string;
  isPresentation: boolean;
  color?: string;
}

const colorClasses: Record<string, string> = {
  cyan: 'text-cyan-400',
  amber: 'text-amber-400',
  orange: 'text-orange-400',
  emerald: 'text-emerald-400',
  purple: 'text-purple-400',
  rose: 'text-rose-400',
  blue: 'text-blue-400',
  red: 'text-red-400',
  yellow: 'text-yellow-400',
  teal: 'text-teal-400',
};

const PhaseHeader: React.FC<PhaseHeaderProps> = ({ 
  phase, 
  title, 
  icon: Icon, 
  time, 
  isPresentation,
  color = 'blue'
}) => {
  const iconColorClass = colorClasses[color] || 'text-blue-400';
  
  return (
    <div className={`w-full flex items-center gap-6 ${isPresentation ? 'mb-8' : 'mb-6'}`}>
      {Icon && (
        <div className={`${isPresentation ? 'p-5' : 'p-3'} bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl border border-gray-600 shadow-lg`}>
          <Icon size={isPresentation ? 48 : 32} className={iconColorClass} />
        </div>
      )}
      <div className="flex-1">
        <p className={`text-gray-400 font-semibold tracking-wide uppercase ${isPresentation ? 'text-lg mb-1' : 'text-xs mb-0.5'}`}>
          {phase}
        </p>
        <h2 className={`font-bold text-white ${isPresentation ? 'text-4xl' : 'text-2xl'}`}>
          {title}
        </h2>
      </div>
      {time && (
        <div className={`font-mono bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-gray-400 ${isPresentation ? 'text-xl' : 'text-sm'}`}>
          {time}
        </div>
      )}
    </div>
  );
};

export default PhaseHeader;

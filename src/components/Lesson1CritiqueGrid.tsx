import React from 'react';
import { lesson1Critique } from '../constants';

interface Lesson1CritiqueGridProps {
  isPresentation: boolean;
}

const Lesson1CritiqueGrid: React.FC<Lesson1CritiqueGridProps> = ({ isPresentation }) => {
  return (
    <div className={`grid grid-cols-3 h-full gap-6 ${isPresentation ? 'gap-8' : ''}`}>
      {/* Strengths */}
      <div className="bg-gray-800 border border-gray-700 border-l-4 border-l-green-500 rounded-xl p-5 overflow-y-auto custom-scrollbar shadow-lg">
        <h3 className={`font-bold mb-4 text-green-400 uppercase tracking-wide flex items-center gap-2 ${isPresentation ? 'text-2xl mb-5' : 'text-sm'}`}>
          <span className="text-green-500">✓</span> Strengths
        </h3>
        <ul className={`dense-text space-y-3 text-gray-300 ${isPresentation ? 'text-base space-y-4' : 'text-xs'}`}>
          {lesson1Critique.strengths.map((strength, idx) => (
            <li key={idx} className="bg-green-900/20 rounded-lg p-3 border border-green-800/50">
              {strength}
            </li>
          ))}
        </ul>
      </div>

      {/* Limitations */}
      <div className="bg-gray-800 border border-gray-700 border-l-4 border-l-red-500 rounded-xl p-5 overflow-y-auto custom-scrollbar shadow-lg">
        <h3 className={`font-bold mb-4 text-red-400 uppercase tracking-wide flex items-center gap-2 ${isPresentation ? 'text-2xl mb-5' : 'text-sm'}`}>
          <span className="text-red-500">✗</span> Limitations
        </h3>
        <ul className={`dense-text space-y-3 text-gray-300 ${isPresentation ? 'text-base space-y-4' : 'text-xs'}`}>
          {lesson1Critique.limitations.map((limitation, idx) => (
            <li key={idx} className="bg-red-900/20 rounded-lg p-3 border border-red-800/50">
              {limitation}
            </li>
          ))}
        </ul>
      </div>

      {/* Alternatives */}
      <div className="bg-gray-800 border border-gray-700 border-l-4 border-l-yellow-500 rounded-xl p-5 overflow-y-auto custom-scrollbar shadow-lg">
        <h3 className={`font-bold mb-4 text-yellow-400 uppercase tracking-wide flex items-center gap-2 ${isPresentation ? 'text-2xl mb-5' : 'text-sm'}`}>
          <span className="text-yellow-500">⟳</span> Alternatives
        </h3>
        <ul className={`dense-text space-y-3 text-gray-300 ${isPresentation ? 'text-base space-y-4' : 'text-xs'}`}>
          {lesson1Critique.alternatives.map((alternative, idx) => (
            <li key={idx} className="bg-yellow-900/20 rounded-lg p-3 border border-yellow-800/50">
              {alternative}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Lesson1CritiqueGrid;

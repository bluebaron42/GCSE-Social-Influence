import React from 'react';
import { lesson1Evidence } from '../constants';

interface Lesson1EvidenceGridProps {
  isPresentation: boolean;
}

const Lesson1EvidenceGrid: React.FC<Lesson1EvidenceGridProps> = ({ isPresentation }) => {
  return (
    <div className={`grid grid-cols-2 h-full gap-6 overflow-y-auto custom-scrollbar ${isPresentation ? 'gap-8 grid-cols-1 md:grid-cols-2' : ''}`}>
      {lesson1Evidence.map((study, idx) => (
        <div key={idx} className="bg-gray-800 rounded-xl border border-gray-700 border-l-4 border-l-cyan-500 p-6 shadow-lg hover:shadow-xl transition-shadow">
          <div className={`mb-3 ${isPresentation ? 'mb-4' : ''}`}>
            <p className={`font-bold text-cyan-400 ${isPresentation ? 'text-2xl' : 'text-lg'}`}>
              {study.author} ({study.year})
            </p>
            <p className={`text-white font-semibold ${isPresentation ? 'text-xl' : 'text-sm'}`}>
              {study.title}
            </p>
          </div>
          <p className={`dense-text text-gray-300 leading-relaxed ${isPresentation ? 'text-lg' : 'text-xs'}`}>
            {study.findings}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Lesson1EvidenceGrid;

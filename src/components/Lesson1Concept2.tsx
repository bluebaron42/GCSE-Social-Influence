import React from 'react';

interface Lesson1Concept2Props {
  isPresentation: boolean;
}

const Lesson1Concept2: React.FC<Lesson1Concept2Props> = ({ isPresentation }) => {
  return (
    <div className={`grid grid-cols-3 h-full gap-6 ${isPresentation ? 'gap-8' : ''}`}>
      {/* Group Size */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 p-5 overflow-y-auto custom-scrollbar shadow-lg">
        <h3 className={`font-bold mb-3 text-emerald-400 uppercase tracking-wide ${isPresentation ? 'text-2xl' : 'text-sm'}`}>
          Group Size
        </h3>
        <ul className={`dense-text space-y-3 text-gray-300 ${isPresentation ? 'text-base' : 'text-xs'}`}>
          <li className="bg-gray-900/50 rounded-lg p-3 border-l-4 border-emerald-500">
            <strong className="text-white">Asch's manipulation:</strong> Varied from 1 to 15 confederates
          </li>
          <li className="bg-gray-900/50 rounded-lg p-3 border-l-4 border-emerald-500">
            <strong className="text-white">Finding:</strong> Conformity increased up to 3 confederates (31%), then plateaued at 35% with larger groups
          </li>
          <li className="bg-gray-900/50 rounded-lg p-3 border-l-4 border-emerald-500">
            <strong className="text-white">Implication:</strong> "Majority size ≠ Pressure". Quality of support matters more than quantity
          </li>
          <li className="bg-gray-900/50 rounded-lg p-3 border-l-4 border-emerald-500">
            <strong className="text-white">Real-world:</strong> Large groups can actually reduce conformity (diffusion of responsibility)
          </li>
        </ul>
      </div>

      {/* Anonymity */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 p-5 overflow-y-auto custom-scrollbar shadow-lg">
        <h3 className={`font-bold mb-3 text-emerald-400 uppercase tracking-wide ${isPresentation ? 'text-2xl' : 'text-sm'}`}>
          Anonymity
        </h3>
        <ul className={`dense-text space-y-3 text-gray-300 ${isPresentation ? 'text-base' : 'text-xs'}`}>
          <li className="bg-gray-900/50 rounded-lg p-3 border-l-4 border-emerald-500">
            <strong className="text-white">Asch's variation:</strong> Participants wrote answers on paper (hidden) vs spoke aloud (visible)
          </li>
          <li className="bg-gray-900/50 rounded-lg p-3 border-l-4 border-emerald-500">
            <strong className="text-white">Finding:</strong> Written = 12.5% conformity. Spoken = 36.8% conformity
          </li>
          <li className="bg-gray-900/50 rounded-lg p-3 border-l-4 border-emerald-500">
            <strong className="text-white">Explanation:</strong> Anonymity reduces NSI pressure. Others cannot see/judge you directly
          </li>
          <li className="bg-gray-900/50 rounded-lg p-3 border-l-4 border-emerald-500">
            <strong className="text-white">Key insight:</strong> Conformity is largely about fear of social disapproval (NSI-driven)
          </li>
        </ul>
      </div>

      {/* Task Difficulty */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 p-5 overflow-y-auto custom-scrollbar shadow-lg">
        <h3 className={`font-bold mb-3 text-emerald-400 uppercase tracking-wide ${isPresentation ? 'text-2xl' : 'text-sm'}`}>
          Task Difficulty
        </h3>
        <ul className={`dense-text space-y-3 text-gray-300 ${isPresentation ? 'text-base' : 'text-xs'}`}>
          <li className="bg-gray-900/50 rounded-lg p-3 border-l-4 border-emerald-500">
            <strong className="text-white">Easy vs Hard:</strong> Asch used ambiguous (harder to judge) line comparisons
          </li>
          <li className="bg-gray-900/50 rounded-lg p-3 border-l-4 border-emerald-500">
            <strong className="text-white">Finding:</strong> Harder tasks = Higher conformity rates
          </li>
          <li className="bg-gray-900/50 rounded-lg p-3 border-l-4 border-emerald-500">
            <strong className="text-white">Explanation:</strong> Increases ISI (uncertainty). More reliance on group for information
          </li>
          <li className="bg-gray-900/50 rounded-lg p-3 border-l-4 border-emerald-500">
            <strong className="text-white">Implication:</strong> Conformity is context-dependent. Domain expertise affects susceptibility
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Lesson1Concept2;

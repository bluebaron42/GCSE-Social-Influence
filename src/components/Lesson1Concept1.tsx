import React from 'react';

interface Lesson1Concept1Props {
  isPresentation: boolean;
}

const Lesson1Concept1: React.FC<Lesson1Concept1Props> = ({ isPresentation }) => {
  return (
    <div className={`grid grid-cols-3 h-full gap-6 ${isPresentation ? 'gap-8' : ''}`}>
      {/* Column 1: Method */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 p-5 overflow-y-auto custom-scrollbar shadow-lg">
        <h3 className={`font-bold mb-3 text-cyan-400 uppercase tracking-wide ${isPresentation ? 'text-2xl' : 'text-sm'}`}>
          Method
        </h3>
        <ul className={`dense-text space-y-3 text-gray-300 ${isPresentation ? 'text-lg' : 'text-xs'}`}>
          <li className="flex gap-2">
            <span className="text-cyan-500">•</span>
            <span><strong className="text-white">Sample:</strong> 123 American male undergraduates</span>
          </li>
          <li className="flex gap-2">
            <span className="text-cyan-500">•</span>
            <span><strong className="text-white">Design:</strong> Lab experiment (controlled)</span>
          </li>
          <li className="flex gap-2">
            <span className="text-cyan-500">•</span>
            <span><strong className="text-white">Group size:</strong> 7-9 people (1 naïve participant + 6-8 confederates)</span>
          </li>
          <li className="flex gap-2">
            <span className="text-cyan-500">•</span>
            <span><strong className="text-white">Seating:</strong> Naïve P seated second to last</span>
          </li>
          <li className="flex gap-2">
            <span className="text-cyan-500">•</span>
            <span><strong className="text-white">Task:</strong> Match a "Standard Line" (X) to three comparison lines (A, B, C)</span>
          </li>
          <li className="flex gap-2">
            <span className="text-cyan-500">•</span>
            <span><strong className="text-white">Trials:</strong> 18 total (12 critical trials where confederates gave the wrong answer deliberately)</span>
          </li>
          <li className="flex gap-2">
            <span className="text-cyan-500">•</span>
            <span><strong className="text-white">Unambiguous:</strong> Correct answer was obvious (lines differed by 6-10 inches)</span>
          </li>
        </ul>
      </div>

      {/* Column 2: Findings */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 p-5 overflow-y-auto custom-scrollbar shadow-lg">
        <h3 className={`font-bold mb-3 text-cyan-400 uppercase tracking-wide ${isPresentation ? 'text-2xl' : 'text-sm'}`}>
          Findings
        </h3>
        <div className={`space-y-4 ${isPresentation ? 'space-y-6' : ''}`}>
          <div className="bg-gray-900/50 rounded-lg p-4 border-l-4 border-cyan-500">
            <div className={`font-mono font-bold text-cyan-400 ${isPresentation ? 'text-4xl' : 'text-2xl'}`}>
              36.8%
            </div>
            <p className={`dense-text text-gray-300 mt-1 ${isPresentation ? 'text-lg' : 'text-xs'}`}>
              Conformity rate on critical trials
            </p>
          </div>
          <div className="bg-gray-900/50 rounded-lg p-4 border-l-4 border-green-500">
            <div className={`font-mono font-bold text-green-400 ${isPresentation ? 'text-4xl' : 'text-2xl'}`}>
              75%
            </div>
            <p className={`dense-text text-gray-300 mt-1 ${isPresentation ? 'text-lg' : 'text-xs'}`}>
              Conformed at least once
            </p>
          </div>
          <div className="bg-gray-900/50 rounded-lg p-4 border-l-4 border-amber-500">
            <div className={`font-mono font-bold text-amber-400 ${isPresentation ? 'text-4xl' : 'text-2xl'}`}>
              25%
            </div>
            <p className={`dense-text text-gray-300 mt-1 ${isPresentation ? 'text-lg' : 'text-xs'}`}>
              Never conformed
            </p>
          </div>
          <div className={`text-gray-300 italic p-3 bg-cyan-900/20 rounded-lg border border-cyan-800/50 ${isPresentation ? 'text-base' : 'text-xs'}`}>
            "The Asch Effect": People conform even when the answer is unambiguous.
          </div>
        </div>
      </div>

      {/* Column 3: Why Conform? */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 p-5 overflow-y-auto custom-scrollbar shadow-lg">
        <h3 className={`font-bold mb-3 text-cyan-400 uppercase tracking-wide ${isPresentation ? 'text-2xl' : 'text-sm'}`}>
          Why Did They Conform?
        </h3>
        <div className={`space-y-4 ${isPresentation ? 'space-y-5' : ''}`}>
          <div className="bg-gray-900/50 rounded-lg p-4 border-l-4 border-purple-500">
            <h4 className={`font-bold text-purple-400 ${isPresentation ? 'text-lg' : 'text-sm'}`}>
              Normative Social Influence (NSI)
            </h4>
            <p className={`dense-text text-gray-300 mt-2 ${isPresentation ? 'text-base' : 'text-xs'}`}>
              Desire to be liked/accepted. Fear of rejection. Desire to fit in with the group.
            </p>
          </div>
          <div className="bg-gray-900/50 rounded-lg p-4 border-l-4 border-purple-500">
            <h4 className={`font-bold text-purple-400 ${isPresentation ? 'text-lg' : 'text-sm'}`}>
              Informational Social Influence (ISI)
            </h4>
            <p className={`dense-text text-gray-300 mt-2 ${isPresentation ? 'text-base' : 'text-xs'}`}>
              Desire to be correct. Assumption that others have more information. Uncertainty reduction.
            </p>
          </div>
          <div className={`text-gray-400 italic text-center p-4 bg-gray-900/50 rounded-lg border border-gray-700 ${isPresentation ? 'text-base' : 'text-xs'}`}>
            <span className="text-cyan-400 font-semibold">Conclusion:</span> NSI was the primary driver (avoidance of being "odd").
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lesson1Concept1;

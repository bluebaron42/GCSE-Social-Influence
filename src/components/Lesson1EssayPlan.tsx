import React, { useState } from 'react';
import { FileText, BookOpen, CheckCircle, AlertTriangle, Eye, EyeOff } from 'lucide-react';
import { lesson1EssayPlan } from '../constants';

interface Lesson1EssayPlanProps {
  isPresentation: boolean;
}

const Lesson1EssayPlan: React.FC<Lesson1EssayPlanProps> = ({ isPresentation }) => {
  const [revealedAO1, setRevealedAO1] = useState<Record<number, boolean>>({});
  const [revealedAO3, setRevealedAO3] = useState<Record<number, boolean>>({});
  const [showAll, setShowAll] = useState(false);

  const toggleAO1 = (idx: number) => setRevealedAO1(prev => ({ ...prev, [idx]: !prev[idx] }));
  const toggleAO3 = (idx: number) => setRevealedAO3(prev => ({ ...prev, [idx]: !prev[idx] }));

  const handleShowAll = () => {
    const newState = !showAll;
    setShowAll(newState);
    const ao1State: Record<number, boolean> = {};
    const ao3State: Record<number, boolean> = {};
    lesson1EssayPlan.ao1.forEach((_, idx) => { ao1State[idx] = newState; });
    lesson1EssayPlan.ao3.forEach((_, idx) => { ao3State[idx] = newState; });
    setRevealedAO1(ao1State);
    setRevealedAO3(ao3State);
  };

  const totalRevealed = Object.values(revealedAO1).filter(Boolean).length + Object.values(revealedAO3).filter(Boolean).length;
  const totalItems = lesson1EssayPlan.ao1.length + lesson1EssayPlan.ao3.length;

  return (
    <div className="flex flex-col h-full bg-gray-800 rounded-xl border border-gray-700 overflow-hidden shadow-lg">
      {/* Question Header */}
      <div className="bg-gradient-to-r from-cyan-900/50 to-blue-900/30 p-6 border-b border-gray-700">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <FileText className="text-cyan-400" size={isPresentation ? 28 : 20} />
            <span className={`text-cyan-400 font-bold uppercase tracking-widest ${isPresentation ? 'text-base' : 'text-xs'}`}>
              Extended Response
            </span>
          </div>
          <button
            onClick={handleShowAll}
            className={`flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-all ${isPresentation ? 'px-5 py-2 text-base' : 'px-3 py-1.5 text-xs'}`}
          >
            {showAll ? <EyeOff size={isPresentation ? 18 : 14} /> : <Eye size={isPresentation ? 18 : 14} />}
            {showAll ? 'Hide All' : `Reveal All (${totalRevealed}/${totalItems})`}
          </button>
        </div>
        <h3 className={`font-bold text-white ${isPresentation ? 'text-3xl' : 'text-lg'}`}>
          Describe and evaluate Asch's research into conformity. <span className="text-cyan-400">[8 marks]</span>
        </h3>
      </div>

      {/* Content Grid */}
      <div className={`flex-grow p-6 grid grid-cols-2 gap-6 overflow-y-auto custom-scrollbar ${isPresentation ? 'gap-10 p-10' : ''}`}>
        {/* AO1 Column */}
        <div className="bg-gray-900/50 rounded-xl p-5 border border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-cyan-900/30 border border-cyan-500/50 rounded-lg p-2">
              <BookOpen size={isPresentation ? 24 : 18} className="text-cyan-400" />
            </div>
            <div>
              <h4 className={`text-cyan-400 font-bold uppercase tracking-widest ${isPresentation ? 'text-lg' : 'text-sm'}`}>AO1: Description</h4>
              <span className={`text-gray-500 ${isPresentation ? 'text-base' : 'text-xs'}`}>4 marks</span>
            </div>
          </div>
          <div className={`space-y-3 ${isPresentation ? 'space-y-4' : ''}`}>
            {lesson1EssayPlan.ao1.map((point, idx) => (
              <div key={idx} onClick={() => toggleAO1(idx)} className={`cursor-pointer rounded-lg border-l-4 border-cyan-500/50 transition-all ${revealedAO1[idx] ? 'bg-cyan-900/20 border-cyan-500' : 'bg-gray-800/50 hover:bg-gray-800'} ${isPresentation ? 'p-4' : 'p-3'}`}>
                <div className="flex gap-3">
                  <span className={`text-cyan-500 font-bold ${isPresentation ? 'text-lg' : 'text-sm'}`}>{idx + 1}.</span>
                  {revealedAO1[idx] ? (
                    <p className={`text-gray-300 animate-fadeIn ${isPresentation ? 'text-lg' : 'text-xs'}`}>{point}</p>
                  ) : (
                    <p className={`text-gray-600 italic ${isPresentation ? 'text-lg' : 'text-xs'}`}>Click to reveal...</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AO3 Column */}
        <div className="bg-gray-900/50 rounded-xl p-5 border border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-amber-900/30 border border-amber-500/50 rounded-lg p-2">
              <AlertTriangle size={isPresentation ? 24 : 18} className="text-amber-400" />
            </div>
            <div>
              <h4 className={`text-amber-400 font-bold uppercase tracking-widest ${isPresentation ? 'text-lg' : 'text-sm'}`}>AO3: Evaluation</h4>
              <span className={`text-gray-500 ${isPresentation ? 'text-base' : 'text-xs'}`}>4 marks</span>
            </div>
          </div>
          <div className={`space-y-3 ${isPresentation ? 'space-y-4' : ''}`}>
            {lesson1EssayPlan.ao3.map((evaluation, idx) => (
              <div key={idx} onClick={() => toggleAO3(idx)} className={`cursor-pointer rounded-lg border-l-4 border-amber-500 transition-all ${revealedAO3[idx] ? 'bg-amber-900/20' : 'bg-gray-800/50 hover:bg-gray-800'} ${isPresentation ? 'p-5' : 'p-4'}`}>
                {revealedAO3[idx] ? (
                  <div className="animate-fadeIn">
                    <p className={`font-bold text-amber-300 ${isPresentation ? 'text-lg mb-2' : 'text-xs mb-1'}`}>{evaluation.label}</p>
                    <p className={`text-gray-400 ${isPresentation ? 'text-base' : 'text-xs'}`}>{evaluation.evidence}</p>
                  </div>
                ) : (
                  <p className={`text-gray-600 italic ${isPresentation ? 'text-lg' : 'text-xs'}`}>Click to reveal evaluation point {idx + 1}...</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Exam Tips Footer */}
      <div className={`bg-gray-900 border-t border-gray-700 p-4 ${isPresentation ? 'p-6' : ''}`}>
        <div className="flex items-center gap-2">
          <CheckCircle size={isPresentation ? 20 : 16} className="text-green-400" />
          <span className={`text-green-400 font-semibold ${isPresentation ? 'text-lg' : 'text-sm'}`}>Exam Tip:</span>
          <span className={`text-gray-400 ${isPresentation ? 'text-lg' : 'text-sm'}`}>For 8-mark questions, aim for 4 AO1 points and 4 AO3 points with named researchers and dates.</span>
        </div>
      </div>
    </div>
  );
};

export default Lesson1EssayPlan;

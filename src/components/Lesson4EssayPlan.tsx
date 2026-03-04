import React, { useState } from 'react';
import { FileText, BookOpen, AlertTriangle, CheckCircle, Eye, EyeOff } from 'lucide-react';

interface Lesson4EssayPlanProps {
  isPresentation: boolean;
}

const Lesson4EssayPlan: React.FC<Lesson4EssayPlanProps> = ({ isPresentation }) => {
  const [revealedAO1, setRevealedAO1] = useState<Record<number, boolean>>({});
  const [revealedAO3, setRevealedAO3] = useState<Record<number, boolean>>({});
  const [showAll, setShowAll] = useState(false);

  const ao1Points = [
    "Minority influence occurs when a small group changes the attitudes or behaviour of the majority. This involves conversion — a genuine, private change in opinion.",
    "Moscovici (1969): 6 women shown 36 blue slides. 2 confederates consistently said 'green'. In the consistent condition, 8.42% of trials showed minority influence. In the inconsistent condition, only 1.25%.",
    "Three factors make minority influence effective: consistency (same message over time), commitment (personal sacrifice shows genuine belief), and flexibility (being open to discussion, not rigid).",
    "Nemeth (1986) found that flexible minorities were more persuasive than rigid ones, as they appeared more reasonable and thoughtful to the majority."
  ];

  const ao3Points = [
    { label: "✓ Strong research support", evidence: "Moscovici's controlled experiment clearly demonstrated that consistency increases minority influence (8.42% vs 1.25%). 32% of participants said 'green' at least once, providing quantifiable evidence.", color: 'green' },
    { label: "✗ Artificial task lacks validity", evidence: "Identifying slide colours is trivial — participants may have complied because they didn't care about the answer. Real-world minority influence involves meaningful issues, so findings may not generalise.", color: 'red' },
    { label: "✓ Real-world application", evidence: "Suffragettes, civil rights movement, and environmental activism all demonstrate minority influence principles — consistent, committed minorities shifting majority opinion over time.", color: 'green' },
    { label: "✗ Sample bias", evidence: "Moscovici only tested women. Men may respond differently to group pressure. We cannot generalise to all populations, reducing external validity.", color: 'red' }
  ];

  const toggleAO1 = (idx: number) => setRevealedAO1(prev => ({ ...prev, [idx]: !prev[idx] }));
  const toggleAO3 = (idx: number) => setRevealedAO3(prev => ({ ...prev, [idx]: !prev[idx] }));

  const handleShowAll = () => {
    const newState = !showAll;
    setShowAll(newState);
    const ao1State: Record<number, boolean> = {};
    const ao3State: Record<number, boolean> = {};
    ao1Points.forEach((_, idx) => { ao1State[idx] = newState; });
    ao3Points.forEach((_, idx) => { ao3State[idx] = newState; });
    setRevealedAO1(ao1State);
    setRevealedAO3(ao3State);
  };

  const totalRevealed = Object.values(revealedAO1).filter(Boolean).length + Object.values(revealedAO3).filter(Boolean).length;
  const totalItems = ao1Points.length + ao3Points.length;

  return (
    <div className="flex flex-col h-full bg-gray-800 rounded-xl border border-gray-700 overflow-hidden shadow-lg">
      <div className="bg-gradient-to-r from-red-900/50 to-rose-900/30 p-6 border-b border-gray-700">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <FileText className="text-red-400" size={isPresentation ? 28 : 20} />
            <span className={`text-red-400 font-bold uppercase tracking-widest ${isPresentation ? 'text-base' : 'text-xs'}`}>Extended Response</span>
          </div>
          <button onClick={handleShowAll} className={`flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-all ${isPresentation ? 'px-5 py-2 text-base' : 'px-3 py-1.5 text-xs'}`}>
            {showAll ? <EyeOff size={isPresentation ? 18 : 14} /> : <Eye size={isPresentation ? 18 : 14} />}
            {showAll ? 'Hide All' : `Reveal All (${totalRevealed}/${totalItems})`}
          </button>
        </div>
        <h3 className={`font-bold text-white ${isPresentation ? 'text-3xl' : 'text-lg'}`}>
          Describe and evaluate research into minority influence. <span className="text-red-400">[8 marks]</span>
        </h3>
      </div>

      <div className={`flex-grow p-6 grid grid-cols-2 gap-6 overflow-y-auto custom-scrollbar ${isPresentation ? 'gap-10 p-10' : ''}`}>
        <div className="bg-gray-900/50 rounded-xl p-5 border border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-red-900/30 border border-red-500/50 rounded-lg p-2">
              <BookOpen size={isPresentation ? 24 : 18} className="text-red-400" />
            </div>
            <div>
              <h4 className={`text-red-400 font-bold uppercase tracking-widest ${isPresentation ? 'text-lg' : 'text-sm'}`}>AO1: Description</h4>
              <span className={`text-gray-500 ${isPresentation ? 'text-base' : 'text-xs'}`}>4 marks</span>
            </div>
          </div>
          <div className={`space-y-3 ${isPresentation ? 'space-y-4' : ''}`}>
            {ao1Points.map((point, idx) => (
              <div key={idx} onClick={() => toggleAO1(idx)} className={`cursor-pointer rounded-lg border-l-4 border-red-500/50 transition-all ${revealedAO1[idx] ? 'bg-red-900/20 border-red-500' : 'bg-gray-800/50 hover:bg-gray-800'} ${isPresentation ? 'p-4' : 'p-3'}`}>
                <div className="flex gap-3">
                  <span className={`text-red-500 font-bold ${isPresentation ? 'text-lg' : 'text-sm'}`}>{idx + 1}.</span>
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

        <div className="bg-gray-900/50 rounded-xl p-5 border border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-rose-900/30 border border-rose-500/50 rounded-lg p-2">
              <AlertTriangle size={isPresentation ? 24 : 18} className="text-rose-400" />
            </div>
            <div>
              <h4 className={`text-rose-400 font-bold uppercase tracking-widest ${isPresentation ? 'text-lg' : 'text-sm'}`}>AO3: Evaluation</h4>
              <span className={`text-gray-500 ${isPresentation ? 'text-base' : 'text-xs'}`}>4 marks</span>
            </div>
          </div>
          <div className={`space-y-3 ${isPresentation ? 'space-y-4' : ''}`}>
            {ao3Points.map((point, idx) => (
              <div key={idx} onClick={() => toggleAO3(idx)} className={`cursor-pointer rounded-lg border-l-4 transition-all ${point.color === 'green' ? 'border-green-500' : 'border-red-500'} ${revealedAO3[idx] ? (point.color === 'green' ? 'bg-green-900/20' : 'bg-red-900/20') : 'bg-gray-800/50 hover:bg-gray-800'} ${isPresentation ? 'p-5' : 'p-4'}`}>
                {revealedAO3[idx] ? (
                  <div className="animate-fadeIn">
                    <p className={`font-bold mb-2 ${point.color === 'green' ? 'text-green-400' : 'text-red-400'} ${isPresentation ? 'text-lg' : 'text-xs'}`}>{point.label}</p>
                    <p className={`text-gray-400 ${isPresentation ? 'text-base' : 'text-xs'}`}>{point.evidence}</p>
                  </div>
                ) : (
                  <p className={`text-gray-600 italic ${isPresentation ? 'text-lg' : 'text-xs'}`}>Click to reveal evaluation point {idx + 1}...</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={`bg-gray-900 border-t border-gray-700 p-4 ${isPresentation ? 'p-6' : ''}`}>
        <div className="flex items-center gap-2">
          <CheckCircle size={isPresentation ? 20 : 16} className="text-green-400" />
          <span className={`text-green-400 font-semibold ${isPresentation ? 'text-lg' : 'text-sm'}`}>Exam Tip:</span>
          <span className={`text-gray-400 ${isPresentation ? 'text-lg' : 'text-sm'}`}>Name Moscovici (1969) and include the exact percentages (8.42% vs 1.25%) for top marks.</span>
        </div>
      </div>
    </div>
  );
};

export default Lesson4EssayPlan;

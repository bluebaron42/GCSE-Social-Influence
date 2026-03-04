import React, { useState } from 'react';
import { FileText, BookOpen, AlertTriangle, CheckCircle, Eye, EyeOff } from 'lucide-react';

interface Lesson5EssayPlanProps {
  isPresentation: boolean;
}

const Lesson5EssayPlan: React.FC<Lesson5EssayPlanProps> = ({ isPresentation }) => {
  const [revealedAO1, setRevealedAO1] = useState<Record<number, boolean>>({});
  const [revealedAO3, setRevealedAO3] = useState<Record<number, boolean>>({});
  const [showAll, setShowAll] = useState(false);

  const ao1Points = [
    "Deindividuation is the loss of personal identity and responsibility in a crowd. Conditions: anonymity, large group size, high arousal, and reduced self-awareness.",
    "The process: a person loses their individual identity → stops monitoring their behaviour → feels less accountable → may act in antisocial ways they normally wouldn't.",
    "Zimbardo (1969): Participants in hoods shocked for twice as long as those wearing name tags. Anonymity directly increased aggression in a controlled experiment.",
    "Reicher (1984): Studied the St Pauls riot. Found crowd behaviour was selective and purposeful — only authority targets were attacked, local properties were left alone. This challenges the 'mindless crowd' view."
  ];

  const ao3Points = [
    { label: "✓ Experimental support (Zimbardo)", evidence: "Zimbardo's controlled study showed cause and effect between anonymity and aggression. Deindividuated group shocked for 2x as long — clear evidence that anonymity increases antisocial behaviour.", color: 'green' },
    { label: "✗ Crowds aren't always negative", evidence: "Gergen et al. (1973) found deindividuated people became MORE affectionate in the dark, not aggressive. Religious gatherings and concerts show crowds can be prosocial — deindividuation theory only explains aggression.", color: 'red' },
    { label: "✓ Real-world applications", evidence: "Police use crowd psychology (e.g. ESIM based on Reicher) to manage events. CCTV reduces anonymity; smaller sections reduce group size. This shows the theory has practical value.", color: 'green' },
    { label: "✗ Reicher challenges simplicity", evidence: "The St Pauls rioters were selective — not mindless. They acted according to shared social identity. This suggests Social Identity Theory better explains crowd behaviour than simple deindividuation.", color: 'red' }
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
      <div className="bg-gradient-to-r from-yellow-900/50 to-amber-900/30 p-6 border-b border-gray-700">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <FileText className="text-yellow-400" size={isPresentation ? 28 : 20} />
            <span className={`text-yellow-400 font-bold uppercase tracking-widest ${isPresentation ? 'text-base' : 'text-xs'}`}>Extended Response</span>
          </div>
          <button onClick={handleShowAll} className={`flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-all ${isPresentation ? 'px-5 py-2 text-base' : 'px-3 py-1.5 text-xs'}`}>
            {showAll ? <EyeOff size={isPresentation ? 18 : 14} /> : <Eye size={isPresentation ? 18 : 14} />}
            {showAll ? 'Hide All' : `Reveal All (${totalRevealed}/${totalItems})`}
          </button>
        </div>
        <h3 className={`font-bold text-white ${isPresentation ? 'text-3xl' : 'text-lg'}`}>
          Describe and evaluate explanations of crowd behaviour. <span className="text-yellow-400">[8 marks]</span>
        </h3>
      </div>

      <div className={`flex-grow p-6 grid grid-cols-2 gap-6 overflow-y-auto custom-scrollbar ${isPresentation ? 'gap-10 p-10' : ''}`}>
        <div className="bg-gray-900/50 rounded-xl p-5 border border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-yellow-900/30 border border-yellow-500/50 rounded-lg p-2">
              <BookOpen size={isPresentation ? 24 : 18} className="text-yellow-400" />
            </div>
            <div>
              <h4 className={`text-yellow-400 font-bold uppercase tracking-widest ${isPresentation ? 'text-lg' : 'text-sm'}`}>AO1: Description</h4>
              <span className={`text-gray-500 ${isPresentation ? 'text-base' : 'text-xs'}`}>4 marks</span>
            </div>
          </div>
          <div className={`space-y-3 ${isPresentation ? 'space-y-4' : ''}`}>
            {ao1Points.map((point, idx) => (
              <div key={idx} onClick={() => toggleAO1(idx)} className={`cursor-pointer rounded-lg border-l-4 border-yellow-500/50 transition-all ${revealedAO1[idx] ? 'bg-yellow-900/20 border-yellow-500' : 'bg-gray-800/50 hover:bg-gray-800'} ${isPresentation ? 'p-4' : 'p-3'}`}>
                <div className="flex gap-3">
                  <span className={`text-yellow-500 font-bold ${isPresentation ? 'text-lg' : 'text-sm'}`}>{idx + 1}.</span>
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
            <div className="bg-amber-900/30 border border-amber-500/50 rounded-lg p-2">
              <AlertTriangle size={isPresentation ? 24 : 18} className="text-amber-400" />
            </div>
            <div>
              <h4 className={`text-amber-400 font-bold uppercase tracking-widest ${isPresentation ? 'text-lg' : 'text-sm'}`}>AO3: Evaluation</h4>
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
          <span className={`text-gray-400 ${isPresentation ? 'text-lg' : 'text-sm'}`}>Compare Zimbardo's support WITH Reicher's challenge to show balanced evaluation (AO3).</span>
        </div>
      </div>
    </div>
  );
};

export default Lesson5EssayPlan;

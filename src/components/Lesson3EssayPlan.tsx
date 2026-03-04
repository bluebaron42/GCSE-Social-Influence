import React, { useState } from 'react';
import { FileText, BookOpen, AlertTriangle, CheckCircle, Eye, EyeOff } from 'lucide-react';

interface Lesson3EssayPlanProps {
  isPresentation: boolean;
}

const Lesson3EssayPlan: React.FC<Lesson3EssayPlanProps> = ({ isPresentation }) => {
  const [revealedAO1, setRevealedAO1] = useState<Record<number, boolean>>({});
  const [revealedAO3, setRevealedAO3] = useState<Record<number, boolean>>({});
  const [showAll, setShowAll] = useState(false);

  const ao1Points = [
    "Dispositional factors are personal characteristics that affect whether someone conforms or obeys. These include locus of control, expertise, and the authoritarian personality.",
    "Locus of control: People with an internal LOC believe they control their own outcomes and are less likely to conform. People with an external LOC believe outcomes depend on luck/outside forces and are more likely to conform.",
    "Expertise: Experts in a subject are less likely to conform because they don't need to look to others for information (reduces ISI).",
    "Authoritarian personality (Adorno et al. 1950): People with harsh upbringings develop extreme respect for authority, making them more likely to obey."
  ];

  const ao3Points = [
    { label: "✓ Research support for LOC", evidence: "Holland (1967) found that participants with an internal LOC were more likely to disobey in Milgram's study. This supports the link between personality and resistance to social influence.", color: 'green' },
    { label: "✗ LOC is not always predictive", evidence: "People with an internal LOC can still conform if NSI is strong (e.g. wanting to be liked). This means dispositional factors interact with situational factors — personality alone cannot explain behaviour.", color: 'red' },
    { label: "✓ Authoritarian personality supported", evidence: "Elms & Milgram (1966) found the most obedient participants scored highly on the F-scale. This directly links personality to obedience behaviour.", color: 'green' },
    { label: "✗ Limited explanation", evidence: "Cannot explain large-scale obedience (e.g. Nazi Germany). Millions couldn't all have the same personality and harsh upbringing. Situational factors may be more important.", color: 'red' }
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
      <div className="bg-gradient-to-r from-orange-900/50 to-red-900/30 p-6 border-b border-gray-700">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <FileText className="text-orange-400" size={isPresentation ? 28 : 20} />
            <span className={`text-orange-400 font-bold uppercase tracking-widest ${isPresentation ? 'text-base' : 'text-xs'}`}>Extended Response</span>
          </div>
          <button onClick={handleShowAll} className={`flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-all ${isPresentation ? 'px-5 py-2 text-base' : 'px-3 py-1.5 text-xs'}`}>
            {showAll ? <EyeOff size={isPresentation ? 18 : 14} /> : <Eye size={isPresentation ? 18 : 14} />}
            {showAll ? 'Hide All' : `Reveal All (${totalRevealed}/${totalItems})`}
          </button>
        </div>
        <h3 className={`font-bold text-white ${isPresentation ? 'text-3xl' : 'text-lg'}`}>
          Describe and evaluate dispositional factors that affect conformity and/or obedience. <span className="text-orange-400">[8 marks]</span>
        </h3>
      </div>

      <div className={`flex-grow p-6 grid grid-cols-2 gap-6 overflow-y-auto custom-scrollbar ${isPresentation ? 'gap-10 p-10' : ''}`}>
        <div className="bg-gray-900/50 rounded-xl p-5 border border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-orange-900/30 border border-orange-500/50 rounded-lg p-2">
              <BookOpen size={isPresentation ? 24 : 18} className="text-orange-400" />
            </div>
            <div>
              <h4 className={`text-orange-400 font-bold uppercase tracking-widest ${isPresentation ? 'text-lg' : 'text-sm'}`}>AO1: Description</h4>
              <span className={`text-gray-500 ${isPresentation ? 'text-base' : 'text-xs'}`}>4 marks</span>
            </div>
          </div>
          <div className={`space-y-3 ${isPresentation ? 'space-y-4' : ''}`}>
            {ao1Points.map((point, idx) => (
              <div key={idx} onClick={() => toggleAO1(idx)} className={`cursor-pointer rounded-lg border-l-4 border-orange-500/50 transition-all ${revealedAO1[idx] ? 'bg-orange-900/20 border-orange-500' : 'bg-gray-800/50 hover:bg-gray-800'} ${isPresentation ? 'p-4' : 'p-3'}`}>
                <div className="flex gap-3">
                  <span className={`text-orange-500 font-bold ${isPresentation ? 'text-lg' : 'text-sm'}`}>{idx + 1}.</span>
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
            <div className="bg-red-900/30 border border-red-500/50 rounded-lg p-2">
              <AlertTriangle size={isPresentation ? 24 : 18} className="text-red-400" />
            </div>
            <div>
              <h4 className={`text-red-400 font-bold uppercase tracking-widest ${isPresentation ? 'text-lg' : 'text-sm'}`}>AO3: Evaluation</h4>
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
          <span className={`text-gray-400 ${isPresentation ? 'text-lg' : 'text-sm'}`}>Name specific researchers (Adorno, Holland, Elms & Milgram) and include dates to access the top mark band.</span>
        </div>
      </div>
    </div>
  );
};

export default Lesson3EssayPlan;

import React, { useState } from 'react';
import { Search, Shield, User, Frown, CheckCircle } from 'lucide-react';

interface Lesson2EvaluationProps {
  isPresentation: boolean;
}

const Lesson2Evaluation: React.FC<Lesson2EvaluationProps> = ({ isPresentation }) => {
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});

  const evaluationPoints = [
    {
      id: 'realism',
      type: 'limitation',
      title: 'Lack of Realism',
      icon: Frown,
      color: 'red',
      point: 'Participants may not have believed the shocks were real.',
      evidence: 'Orne & Holland (1968) suggested participants were just "playing along" with the study because they knew no real harm was being done.',
      counterpoint: 'However, participants showed genuine signs of stress (sweating, trembling) suggesting they did believe it was real.'
    },
    {
      id: 'ethics',
      type: 'limitation',
      title: 'Ethical Issues',
      icon: Shield,
      color: 'red',
      point: 'The study caused significant psychological harm to participants.',
      evidence: 'Participants were deceived, not protected from harm, and many experienced lasting distress. Baumrind (1964) criticized Milgram for lack of care.',
      counterpoint: 'Milgram defended the study: 84% said they were glad to have participated, and only 1.3% regretted it.'
    },
    {
      id: 'support',
      type: 'strength',
      title: 'Real-World Support',
      icon: CheckCircle,
      color: 'green',
      point: 'Findings have been replicated in real-world settings.',
      evidence: 'Hofling et al. (1966): 21 out of 22 nurses obeyed an order from an unknown doctor to give a patient a dangerous overdose.',
      counterpoint: 'This shows Milgram\'s findings apply beyond the laboratory to real-life professional situations.'
    },
    {
      id: 'gender',
      type: 'limitation',
      title: 'Sample Bias',
      icon: User,
      color: 'amber',
      point: 'Only American men were tested - can we generalize?',
      evidence: 'The study used 40 male volunteers from New Haven, USA. We can\'t assume women or other cultures would behave the same.',
      counterpoint: 'However, later replications with women (e.g., Sheridan & King 1972) found similar or higher obedience rates.'
    }
  ];

  const toggleReveal = (id: string) => {
    setRevealed(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const revealAll = () => {
    const allRevealed: Record<string, boolean> = {};
    evaluationPoints.forEach(point => {
      allRevealed[point.id] = true;
    });
    setRevealed(allRevealed);
  };

  const revealedCount = Object.values(revealed).filter(Boolean).length;

  const getColorClasses = (color: string) => {
    const colorMap: Record<string, { bg: string; border: string; text: string }> = {
      red: { bg: 'bg-red-900/20', border: 'border-red-500', text: 'text-red-400' },
      green: { bg: 'bg-green-900/20', border: 'border-green-500', text: 'text-green-400' },
      amber: { bg: 'bg-amber-900/20', border: 'border-amber-500', text: 'text-amber-400' },
    };
    return colorMap[color] || colorMap.amber;
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className={`flex items-center justify-between mb-6 ${isPresentation ? 'mb-8' : ''}`}>
        <div className="flex items-center gap-2">
          <span className={`text-gray-400 font-mono ${isPresentation ? 'text-lg' : 'text-sm'}`}>
            {revealedCount} / {evaluationPoints.length} revealed
          </span>
        </div>
        <button
          onClick={revealAll}
          className={`bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-all ${
            isPresentation ? 'px-6 py-3 text-lg' : 'px-4 py-2 text-sm'
          }`}
        >
          Reveal All
        </button>
      </div>

      {/* Evaluation Grid */}
      <div className={`grid grid-cols-2 gap-4 flex-1 ${isPresentation ? 'gap-6' : ''}`}>
        {evaluationPoints.map((point) => {
          const colors = getColorClasses(point.color);
          const Icon = point.icon;
          const isRevealed = revealed[point.id];

          return (
            <div
              key={point.id}
              onClick={() => toggleReveal(point.id)}
              className={`cursor-pointer border-2 rounded-xl transition-all duration-300 overflow-hidden ${
                isRevealed
                  ? `${colors.border} ${colors.bg}`
                  : 'border-gray-700 bg-gray-900/50 hover:border-gray-600'
              } ${isPresentation ? 'p-6' : 'p-4'}`}
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-3">
                <div className={`p-2 rounded-lg ${colors.bg} border ${colors.border}`}>
                  <Icon size={isPresentation ? 24 : 18} className={colors.text} />
                </div>
                <div>
                  <span className={`font-mono uppercase tracking-widest ${colors.text} ${isPresentation ? 'text-xs' : 'text-[10px]'}`}>
                    {point.type === 'strength' ? '✓ Strength' : '✗ Limitation'}
                  </span>
                  <h4 className={`font-bold text-white ${isPresentation ? 'text-xl' : 'text-base'}`}>
                    {point.title}
                  </h4>
                </div>
              </div>

              {isRevealed ? (
                <div className="animate-fadeIn space-y-3">
                  <p className={`text-white font-semibold ${isPresentation ? 'text-lg' : 'text-sm'}`}>
                    {point.point}
                  </p>
                  
                  <div className={`${colors.bg} border ${colors.border} rounded-lg p-3`}>
                    <span className={`font-bold ${colors.text} block mb-1 ${isPresentation ? 'text-sm' : 'text-xs'}`}>
                      Evidence:
                    </span>
                    <p className={`text-gray-300 ${isPresentation ? 'text-base' : 'text-xs'}`}>
                      {point.evidence}
                    </p>
                  </div>

                  <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3">
                    <span className={`font-bold text-gray-400 block mb-1 ${isPresentation ? 'text-sm' : 'text-xs'}`}>
                      However...
                    </span>
                    <p className={`text-gray-400 italic ${isPresentation ? 'text-base' : 'text-xs'}`}>
                      {point.counterpoint}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-32 gap-2 opacity-60">
                  <Search size={isPresentation ? 36 : 28} className={`${colors.text} opacity-50`} />
                  <span className={`font-mono ${colors.text} opacity-50 tracking-widest uppercase ${isPresentation ? 'text-sm' : 'text-xs'}`}>
                    Click to Reveal
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Lesson2Evaluation;

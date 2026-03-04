import React, { useState } from 'react';
import { Search, CheckCircle, AlertTriangle, Brain, Target } from 'lucide-react';

interface Lesson4EvaluationProps {
  isPresentation: boolean;
}

const Lesson4Evaluation: React.FC<Lesson4EvaluationProps> = ({ isPresentation }) => {
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});

  const evaluationPoints = [
    {
      id: 'research-support',
      type: 'strength',
      title: 'Research Support (Moscovici)',
      icon: CheckCircle,
      color: 'green',
      point: 'Moscovici\'s blue slide study provides clear research evidence that a consistent minority can influence the majority.',
      evidence: 'The consistent condition (8.42%) was significantly more influential than the inconsistent condition (1.25%). 32% of participants said "green" at least once. This directly supports the role of consistency.',
      counterpoint: 'This is a strength because it provides controlled, empirical evidence for how minority influence works, showing consistency is essential.'
    },
    {
      id: 'artificial-task',
      type: 'limitation',
      title: 'Artificial Task',
      icon: AlertTriangle,
      color: 'red',
      point: 'Moscovici\'s study used a trivial task (identifying slide colours) which lacks ecological validity.',
      evidence: 'Identifying the colour of slides is unimportant — participants may have gone along because they didn\'t care about the answer. Real-world minority influence involves meaningful issues (civil rights, environmental change).',
      counterpoint: 'This means the findings may not generalise to real-world situations where people are more invested in their opinions and more resistant to change.'
    },
    {
      id: 'real-world',
      type: 'strength',
      title: 'Real-World Applications',
      icon: Brain,
      color: 'green',
      point: 'Minority influence explains major social changes throughout history.',
      evidence: 'The suffragettes (women\'s right to vote), civil rights movement (racial equality), and environmental activism all began as consistent, committed minorities who eventually shifted majority opinion.',
      counterpoint: 'This supports the theory\'s validity because the principles of consistency, commitment, and flexibility can explain real social change — not just artificial lab results.'
    },
    {
      id: 'sample-bias',
      type: 'limitation',
      title: 'Sample Bias',
      icon: Target,
      color: 'amber',
      point: 'Moscovici only used female participants, limiting the generalisability of findings.',
      evidence: 'All participants were women. Research suggests men may respond differently to social influence — they may be less likely to conform publicly but equally influenced privately. Gender differences in group dynamics could affect minority influence.',
      counterpoint: 'This means we cannot be sure that minority influence works the same way for men, or in mixed-gender groups, reducing the external validity of the findings.'
    }
  ];

  const toggleReveal = (id: string) => {
    setRevealed(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const revealAll = () => {
    const allRevealed: Record<string, boolean> = {};
    evaluationPoints.forEach(p => { allRevealed[p.id] = true; });
    setRevealed(allRevealed);
  };

  const revealedCount = Object.values(revealed).filter(Boolean).length;

  const getColorClasses = (color: string) => {
    const colorMap: Record<string, { bg: string; border: string; text: string }> = {
      red: { bg: 'bg-red-900/20', border: 'border-red-500', text: 'text-red-400' },
      green: { bg: 'bg-green-900/20', border: 'border-green-500', text: 'text-green-400' },
      amber: { bg: 'bg-amber-900/20', border: 'border-amber-500', text: 'text-amber-400' },
    };
    return colorMap[color] || colorMap.red;
  };

  return (
    <div className="flex flex-col h-full">
      <div className={`flex items-center justify-between mb-6 ${isPresentation ? 'mb-8' : ''}`}>
        <span className={`text-gray-400 font-mono ${isPresentation ? 'text-lg' : 'text-sm'}`}>
          {revealedCount} / {evaluationPoints.length} revealed
        </span>
        <button onClick={revealAll} className={`bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-all ${isPresentation ? 'px-6 py-3 text-lg' : 'px-4 py-2 text-sm'}`}>
          Reveal All
        </button>
      </div>

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
                isRevealed ? `${colors.border} ${colors.bg}` : 'border-gray-700 bg-gray-900/50 hover:border-gray-600'
              } ${isPresentation ? 'p-6' : 'p-4'}`}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={`p-2 rounded-lg ${colors.bg} border ${colors.border}`}>
                  <Icon size={isPresentation ? 24 : 18} className={colors.text} />
                </div>
                <div>
                  <span className={`font-mono uppercase tracking-widest ${colors.text} ${isPresentation ? 'text-xs' : 'text-[10px]'}`}>
                    {point.type === 'strength' ? '✓ Strength' : '✗ Limitation'}
                  </span>
                  <h4 className={`font-bold text-white ${isPresentation ? 'text-xl' : 'text-base'}`}>{point.title}</h4>
                </div>
              </div>

              {isRevealed ? (
                <div className="animate-fadeIn space-y-3">
                  <p className={`text-white font-semibold ${isPresentation ? 'text-lg' : 'text-sm'}`}>{point.point}</p>
                  <div className={`${colors.bg} border ${colors.border} rounded-lg p-3`}>
                    <span className={`font-bold ${colors.text} block mb-1 ${isPresentation ? 'text-sm' : 'text-xs'}`}>Evidence:</span>
                    <p className={`text-gray-300 ${isPresentation ? 'text-base' : 'text-xs'}`}>{point.evidence}</p>
                  </div>
                  <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3">
                    <span className={`font-bold text-gray-400 block mb-1 ${isPresentation ? 'text-sm' : 'text-xs'}`}>Therefore...</span>
                    <p className={`text-gray-400 italic ${isPresentation ? 'text-base' : 'text-xs'}`}>{point.counterpoint}</p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-32 gap-2 opacity-60">
                  <Search size={isPresentation ? 36 : 28} className={`${colors.text} opacity-50`} />
                  <span className={`font-mono ${colors.text} opacity-50 tracking-widest uppercase ${isPresentation ? 'text-sm' : 'text-xs'}`}>Click to Reveal</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Lesson4Evaluation;

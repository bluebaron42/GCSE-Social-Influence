import React, { useState } from 'react';
import { Search, Shield, User, Brain, CheckCircle } from 'lucide-react';

interface Lesson3EvaluationProps {
  isPresentation: boolean;
}

const Lesson3Evaluation: React.FC<Lesson3EvaluationProps> = ({ isPresentation }) => {
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});

  const evaluationPoints = [
    {
      id: 'loc-support',
      type: 'strength',
      title: 'LOC: Research Support',
      icon: CheckCircle,
      color: 'green',
      point: 'There is research support linking internal LOC to resistance to conformity and obedience.',
      evidence: 'Holland (1967) found that participants with an internal LOC were more likely to be independent (disobey) in Milgram\'s study. They felt responsible for their own actions and resisted the experimenter\'s instructions.',
      counterpoint: 'This supports the idea that personality (specifically LOC) is a valid predictor of who resists social influence pressure.'
    },
    {
      id: 'loc-weakness',
      type: 'limitation',
      title: 'LOC: Not Always Predictive',
      icon: Brain,
      color: 'red',
      point: 'LOC doesn\'t always predict who will conform — other factors can override personality.',
      evidence: 'Even people with an internal LOC may still conform if they want to be liked by the group (NSI). In situations where group acceptance is highly valued (e.g. among friends), personality becomes less important.',
      counterpoint: 'This suggests that dispositional factors interact with situational factors — neither alone can fully explain conformity or resistance.'
    },
    {
      id: 'auth-support',
      type: 'strength',
      title: 'Authoritarian Personality: Evidence',
      icon: Shield,
      color: 'green',
      point: 'There is research linking authoritarian personality to higher obedience.',
      evidence: 'Elms & Milgram (1966) interviewed participants from the original study and found that the most obedient participants scored highly on the F-scale (measure of authoritarianism). Those who defied the experimenter scored lower.',
      counterpoint: 'This directly links personality characteristics to obedience behaviour, supporting Adorno\'s theory that some personalities are predisposed to obey authority.'
    },
    {
      id: 'auth-weakness',
      type: 'limitation',
      title: 'Authoritarian Personality: Scale Problem',
      icon: User,
      color: 'amber',
      point: 'The F-scale used to measure authoritarianism may not be valid.',
      evidence: 'The F-scale only has questions worded in one direction, so people who tend to agree with statements (acquiescence bias) will score highly regardless of their true personality. This means the measure may be unreliable.',
      counterpoint: 'Furthermore, the theory cannot explain obedience on a large scale — it\'s unlikely that millions of people in Nazi Germany all had the same authoritarian personality from harsh parenting.'
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
                      Therefore...
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

export default Lesson3Evaluation;

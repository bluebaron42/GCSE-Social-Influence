import React, { useState } from 'react';
import { Search, CheckCircle, AlertTriangle, Brain, Target } from 'lucide-react';

interface Lesson6EvaluationProps {
  isPresentation: boolean;
}

const Lesson6Evaluation: React.FC<Lesson6EvaluationProps> = ({ isPresentation }) => {
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});

  const evaluationPoints = [
    {
      id: 'loafing-support',
      type: 'strength',
      title: 'Social Loafing: Research Support',
      icon: CheckCircle,
      color: 'green',
      point: 'Ringelmann (1913) and Shaw (1932) provide strong evidence that effort decreases in groups.',
      evidence: 'Ringelmann found each person pulled less on a rope as group size increased. Shaw found groups solved problems better than individuals but each member contributed less. Both show diffusion of responsibility in groups.',
      counterpoint: 'Multiple studies across different tasks and time periods support social loafing, giving the concept high reliability and validity.'
    },
    {
      id: 'culture-limitation',
      type: 'limitation',
      title: 'Cultural Bias',
      icon: AlertTriangle,
      color: 'red',
      point: 'Most social loafing research was conducted in individualist Western cultures.',
      evidence: 'Earley (1989) found that social loafing was LESS common in collectivist cultures (e.g. China) where group effort is valued. In collectivist cultures, people may actually work HARDER in groups to benefit the collective.',
      counterpoint: 'This means findings about social loafing cannot be generalised to all cultures — it may be a product of individualist values rather than a universal phenomenon.'
    },
    {
      id: 'morality-strength',
      type: 'strength',
      title: 'Morality as a Protective Factor',
      icon: Brain,
      color: 'green',
      point: 'Moral reasoning provides a strong dispositional explanation for why some resist crowd influence.',
      evidence: 'During the London riots (2011), the vast majority of people in affected areas did NOT participate despite conditions favouring deindividuation. Research on moral identity shows that people whose self-concept centres on being "good" resist antisocial pressures.',
      counterpoint: 'This shows that dispositional factors (morality) can override powerful situational pressures, providing a balanced view of crowd behaviour that acknowledges individual differences.'
    },
    {
      id: 'personality-limitation',
      type: 'limitation',
      title: 'Personality: Hard to Measure',
      icon: Target,
      color: 'amber',
      point: 'It\'s difficult to isolate the effect of personality from situational factors.',
      evidence: 'A person with high self-esteem might still conform in a very strong social situation (e.g. workplace pressure). The interaction between personality and situation makes it hard to predict behaviour from personality alone.',
      counterpoint: 'This is a limitation because it reduces the predictive power of dispositional explanations — knowing someone\'s personality doesn\'t reliably predict how they\'ll behave in every crowd situation.'
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
    return colorMap[color] || colorMap.amber;
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

export default Lesson6Evaluation;

import React, { useState } from 'react';
import { Search, CheckCircle, AlertTriangle, Brain, Target } from 'lucide-react';

interface Lesson5EvaluationProps {
  isPresentation: boolean;
}

const Lesson5Evaluation: React.FC<Lesson5EvaluationProps> = ({ isPresentation }) => {
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});

  const evaluationPoints = [
    {
      id: 'zimbardo-support',
      type: 'strength',
      title: 'Supporting Evidence (Zimbardo)',
      icon: CheckCircle,
      color: 'green',
      point: 'Zimbardo (1969) provides experimental evidence that anonymity leads to more aggressive behaviour.',
      evidence: 'Participants in hoods (deindividuated) gave electric shocks for twice as long as those wearing name tags (individuated). This was a controlled experiment, so cause and effect can be established.',
      counterpoint: 'This supports deindividuation theory because it shows that anonymity directly increases anti-social behaviour in a controlled setting.'
    },
    {
      id: 'reicher-challenge',
      type: 'limitation',
      title: 'Challenge from Reicher (1984)',
      icon: AlertTriangle,
      color: 'red',
      point: 'Reicher\'s study of the St Pauls riot suggests deindividuation theory is too simplistic.',
      evidence: 'Rioters were selective — they only attacked symbols of authority (police, banks) whilst leaving local shops and homes. Violence stayed within geographic boundaries. This shows purposeful, identity-driven behaviour.',
      counterpoint: 'If crowds were truly "deindividuated" (mindless), we would expect random destruction. Reicher shows crowds act according to shared social identity, not a loss of identity.'
    },
    {
      id: 'prosocial-crowds',
      type: 'limitation',
      title: 'Crowds Can Be Prosocial',
      icon: Brain,
      color: 'amber',
      point: 'Deindividuation doesn\'t always lead to anti-social behaviour — crowds can also produce positive outcomes.',
      evidence: 'Religious gatherings, charity events, and music festivals involve deindividuation conditions (anonymity, large groups, arousal) yet produce joy, unity, and generosity. Gergen et al. (1973) found people in a dark room were MORE affectionate, not aggressive.',
      counterpoint: 'This means deindividuation theory is incomplete — it focuses only on negative behaviour and cannot explain why some crowds become prosocial whilst others become antisocial.'
    },
    {
      id: 'practical-apps',
      type: 'strength',
      title: 'Practical Applications',
      icon: Target,
      color: 'green',
      point: 'Understanding crowd behaviour has real-world applications in crowd management and policing.',
      evidence: 'Police now use crowd psychology research to manage events. CCTV cameras reduce anonymity; smaller crowd sections reduce group size. The "Elaborated Social Identity Model" (ESIM) based on Reicher\'s work is used by police forces across Europe.',
      counterpoint: 'This shows the research has practical value — it helps prevent crowd violence by understanding the psychological conditions that trigger it.'
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

export default Lesson5Evaluation;

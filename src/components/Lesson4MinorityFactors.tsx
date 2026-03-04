import React, { useState } from 'react';
import { RefreshCw, Target, Shuffle, ChevronDown, ChevronUp } from 'lucide-react';

interface Lesson4MinorityFactorsProps {
  isPresentation: boolean;
}

const Lesson4MinorityFactors: React.FC<Lesson4MinorityFactorsProps> = ({ isPresentation }) => {
  const [expandedFactor, setExpandedFactor] = useState<number | null>(null);
  const [currentStep, setCurrentStep] = useState(0);

  const factors = [
    {
      title: 'Consistency',
      icon: RefreshCw,
      color: 'red',
      tagline: 'Saying the same thing over time',
      description: 'The minority must be consistent in their viewpoint. If they keep changing their mind, the majority will ignore them.',
      types: [
        { name: 'Synchronic consistency', detail: 'All members of the minority agree with each other at the same time.' },
        { name: 'Diachronic consistency', detail: 'The minority maintains the same position over a long period of time.' }
      ],
      example: 'In Moscovici\'s study, the consistent condition (saying "green" on all 36 trials) was far more influential (8.42%) than the inconsistent condition (1.25%).',
      keyPoint: 'Consistency makes the majority think "maybe they have a point" — it draws attention and causes re-evaluation.'
    },
    {
      title: 'Commitment',
      icon: Target,
      color: 'amber',
      tagline: 'Showing dedication to the cause',
      description: 'The minority must show they are dedicated to their viewpoint, especially through personal sacrifice or risk.',
      types: [
        { name: 'The augmentation principle', detail: 'If the minority is willing to suffer for their beliefs, the majority takes them more seriously.' },
        { name: 'Personal cost', detail: 'When the minority faces ridicule, punishment, or hardship but still holds their view, it signals genuine conviction.' }
      ],
      example: 'Suffragettes went on hunger strikes and were imprisoned — their commitment showed the majority they truly believed in their cause.',
      keyPoint: 'Commitment signals that the minority genuinely believes what they say and isn\'t just being difficult.'
    },
    {
      title: 'Flexibility',
      icon: Shuffle,
      color: 'green',
      tagline: 'Being willing to adapt and negotiate',
      description: 'The minority must not appear rigid or dogmatic. They need to be open to discussion and willing to consider alternatives.',
      types: [
        { name: 'Negotiation style', detail: 'A flexible minority listens to counterarguments and adjusts their position slightly where appropriate.' },
        { name: 'Avoiding rigidity', detail: 'If the minority appears too extreme or refuses to discuss, the majority dismisses them as unreasonable.' }
      ],
      example: 'Nemeth (1986) found that flexible minorities who adapted their arguments were more persuasive than rigid minorities who just repeated the same point.',
      keyPoint: 'Flexibility shows the minority is reasonable — they\'re not just stubborn but genuinely thoughtful.'
    }
  ];

  const getColorClasses = (color: string) => {
    const map: Record<string, { bg: string; border: string; text: string; darkBg: string }> = {
      red: { bg: 'bg-red-900/30', border: 'border-red-500', text: 'text-red-400', darkBg: 'bg-red-900/20' },
      amber: { bg: 'bg-amber-900/30', border: 'border-amber-500', text: 'text-amber-400', darkBg: 'bg-amber-900/20' },
      green: { bg: 'bg-green-900/30', border: 'border-green-500', text: 'text-green-400', darkBg: 'bg-green-900/20' },
    };
    return map[color] || map.red;
  };

  return (
    <div className="flex flex-col h-full">
      {/* Step-by-step control */}
      <div className={`flex items-center justify-between mb-6 ${isPresentation ? 'mb-8' : ''}`}>
        <div className={`flex items-center gap-3`}>
          {factors.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentStep(idx)}
              className={`w-8 h-8 rounded-full font-bold transition-all ${
                idx <= currentStep
                  ? `bg-${factors[idx].color}-600 text-white`
                  : 'bg-gray-700 text-gray-500'
              } ${isPresentation ? 'w-12 h-12 text-xl' : 'text-sm'}`}
            >
              {idx + 1}
            </button>
          ))}
        </div>
        <button
          onClick={() => setCurrentStep(prev => Math.min(prev + 1, factors.length - 1))}
          disabled={currentStep >= factors.length - 1}
          className={`bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white font-bold rounded-lg transition-all ${
            isPresentation ? 'px-8 py-3 text-lg' : 'px-4 py-2 text-sm'
          }`}
        >
          Next Factor →
        </button>
      </div>

      {/* Factor Cards */}
      <div className={`grid grid-cols-3 gap-4 flex-1 ${isPresentation ? 'gap-6' : ''}`}>
        {factors.map((factor, idx) => {
          const colors = getColorClasses(factor.color);
          const Icon = factor.icon;
          const isActive = idx <= currentStep;
          const isExpanded = expandedFactor === idx;

          return (
            <div
              key={idx}
              onClick={() => isActive && setExpandedFactor(isExpanded ? null : idx)}
              className={`border-2 rounded-xl transition-all duration-300 ${
                isActive
                  ? `${colors.border} ${colors.bg} cursor-pointer`
                  : 'border-gray-700/50 bg-gray-900/30 opacity-40'
              } ${isPresentation ? 'p-6' : 'p-4'} overflow-y-auto`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 rounded-lg ${colors.darkBg} border ${colors.border}`}>
                  <Icon size={isPresentation ? 28 : 20} className={colors.text} />
                </div>
                <div className="flex-1">
                  <h3 className={`font-bold ${colors.text} ${isPresentation ? 'text-2xl' : 'text-lg'}`}>
                    {factor.title}
                  </h3>
                  <p className={`text-gray-500 ${isPresentation ? 'text-base' : 'text-xs'}`}>
                    {factor.tagline}
                  </p>
                </div>
                {isActive && (
                  isExpanded ? <ChevronUp className={colors.text} size={20} /> : <ChevronDown className={colors.text} size={20} />
                )}
              </div>

              {isActive && (
                <div className="animate-fadeIn">
                  <p className={`text-gray-300 mb-4 ${isPresentation ? 'text-lg' : 'text-sm'}`}>
                    {factor.description}
                  </p>

                  {isExpanded && (
                    <div className="animate-fadeIn space-y-3">
                      {/* Types */}
                      <div className="space-y-2">
                        {factor.types.map((type, tIdx) => (
                          <div key={tIdx} className={`${colors.darkBg} border ${colors.border} rounded-lg ${isPresentation ? 'p-4' : 'p-3'}`}>
                            <p className={`font-bold ${colors.text} ${isPresentation ? 'text-base' : 'text-xs'}`}>{type.name}</p>
                            <p className={`text-gray-400 ${isPresentation ? 'text-base' : 'text-xs'}`}>{type.detail}</p>
                          </div>
                        ))}
                      </div>

                      {/* Example */}
                      <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-3">
                        <span className={`font-bold text-gray-400 block mb-1 ${isPresentation ? 'text-sm' : 'text-xs'}`}>Example:</span>
                        <p className={`text-gray-300 italic ${isPresentation ? 'text-base' : 'text-xs'}`}>{factor.example}</p>
                      </div>

                      {/* Key Point */}
                      <div className={`border-l-4 ${colors.border} ${colors.darkBg} rounded-r-lg p-3`}>
                        <p className={`${colors.text} font-semibold ${isPresentation ? 'text-base' : 'text-xs'}`}>
                          💡 {factor.keyPoint}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Lesson4MinorityFactors;

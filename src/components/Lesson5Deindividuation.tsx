import React, { useState } from 'react';
import { EyeOff, Users, Zap, ArrowDown, ChevronDown, ChevronUp } from 'lucide-react';

interface Lesson5DeindividuationProps {
  isPresentation: boolean;
}

const Lesson5Deindividuation: React.FC<Lesson5DeindividuationProps> = ({ isPresentation }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [expandedSection, setExpandedSection] = useState<number | null>(null);

  const steps = [
    {
      title: 'What is Deindividuation?',
      icon: EyeOff,
      color: 'yellow',
      content: 'Deindividuation is the loss of personal identity and sense of responsibility that can occur when a person is part of a crowd or group.',
      detail: 'When people feel anonymous in a group, they lose their individual identity and become less aware of their own behaviour. This can lead to actions they would not normally do alone.',
      keyTerm: 'Deindividuation = losing your sense of individual identity in a crowd'
    },
    {
      title: 'How Does It Happen?',
      icon: Users,
      color: 'amber',
      content: 'Several conditions can trigger deindividuation:',
      points: [
        { name: 'Anonymity', detail: 'Being unrecognisable (e.g. wearing uniforms, face coverings, being in darkness) reduces accountability.' },
        { name: 'Large group size', detail: 'The larger the group, the more anonymous each individual feels — personal responsibility is diffused.' },
        { name: 'Arousal', detail: 'High emotional states (excitement, anger) reduce rational thinking and increase impulsive behaviour.' },
        { name: 'Reduced self-awareness', detail: 'People stop monitoring their own behaviour against personal moral standards.' }
      ]
    },
    {
      title: 'The Process',
      icon: ArrowDown,
      color: 'red',
      content: 'Deindividuation follows a psychological process:',
      process: [
        { stage: '1. Loss of identity', description: 'The person becomes part of the crowd rather than an individual.' },
        { stage: '2. Reduced self-awareness', description: 'They stop thinking about their personal values and morals.' },
        { stage: '3. Lowered inhibitions', description: 'Normal social rules seem less important — "everyone else is doing it".' },
        { stage: '4. Anti-social behaviour', description: 'The person may act in ways they normally wouldn\'t — aggression, vandalism, looting.' }
      ]
    },
    {
      title: 'Supporting Evidence',
      icon: Zap,
      color: 'green',
      content: 'Zimbardo (1969) tested deindividuation experimentally:',
      study: {
        method: 'Female participants gave electric shocks to a confederate. One group wore large coats and hoods (deindividuated). The other group wore name tags and normal clothes (individuated).',
        results: 'Deindividuated participants gave shocks for TWICE as long as the individuated group.',
        conclusion: 'Anonymity (via disguise) led to more aggressive behaviour, supporting the idea that deindividuation reduces personal responsibility.'
      }
    }
  ];

  const getColorClasses = (color: string) => {
    const map: Record<string, { bg: string; border: string; text: string; darkBg: string }> = {
      yellow: { bg: 'bg-yellow-900/30', border: 'border-yellow-500', text: 'text-yellow-400', darkBg: 'bg-yellow-900/20' },
      amber: { bg: 'bg-amber-900/30', border: 'border-amber-500', text: 'text-amber-400', darkBg: 'bg-amber-900/20' },
      red: { bg: 'bg-red-900/30', border: 'border-red-500', text: 'text-red-400', darkBg: 'bg-red-900/20' },
      green: { bg: 'bg-green-900/30', border: 'border-green-500', text: 'text-green-400', darkBg: 'bg-green-900/20' },
    };
    return map[color] || map.yellow;
  };

  return (
    <div className="flex flex-col h-full">
      {/* Step progress */}
      <div className={`flex items-center justify-between mb-6 ${isPresentation ? 'mb-8' : ''}`}>
        <div className="flex items-center gap-3">
          {steps.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentStep(idx)}
              className={`rounded-full font-bold transition-all ${
                idx <= currentStep ? 'bg-yellow-600 text-white' : 'bg-gray-700 text-gray-500'
              } ${isPresentation ? 'w-12 h-12 text-xl' : 'w-8 h-8 text-sm'}`}
            >
              {idx + 1}
            </button>
          ))}
        </div>
        <button
          onClick={() => setCurrentStep(prev => Math.min(prev + 1, steps.length - 1))}
          disabled={currentStep >= steps.length - 1}
          className={`bg-yellow-600 hover:bg-yellow-500 disabled:opacity-50 text-white font-bold rounded-lg transition-all ${
            isPresentation ? 'px-8 py-3 text-lg' : 'px-4 py-2 text-sm'
          }`}
        >
          Next Step →
        </button>
      </div>

      {/* Content Grid */}
      <div className={`grid grid-cols-2 gap-4 flex-1 ${isPresentation ? 'gap-6' : ''}`}>
        {steps.map((step, idx) => {
          const colors = getColorClasses(step.color);
          const Icon = step.icon;
          const isActive = idx <= currentStep;
          const isExpanded = expandedSection === idx;

          return (
            <div
              key={idx}
              onClick={() => isActive && setExpandedSection(isExpanded ? null : idx)}
              className={`border-2 rounded-xl transition-all duration-300 overflow-y-auto ${
                isActive ? `${colors.border} ${colors.bg} cursor-pointer` : 'border-gray-700/50 bg-gray-900/30 opacity-40'
              } ${isPresentation ? 'p-6' : 'p-4'}`}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={`p-2 rounded-lg ${colors.darkBg} border ${colors.border}`}>
                  <Icon size={isPresentation ? 24 : 18} className={colors.text} />
                </div>
                <h3 className={`font-bold flex-1 ${colors.text} ${isPresentation ? 'text-xl' : 'text-base'}`}>
                  {step.title}
                </h3>
                {isActive && (isExpanded ? <ChevronUp className={colors.text} size={18} /> : <ChevronDown className={colors.text} size={18} />)}
              </div>

              {isActive && (
                <div className="animate-fadeIn">
                  <p className={`text-gray-300 mb-3 ${isPresentation ? 'text-lg' : 'text-sm'}`}>{step.content}</p>

                  {step.keyTerm && (
                    <div className={`${colors.darkBg} border ${colors.border} rounded-lg p-3 mb-3`}>
                      <p className={`${colors.text} font-bold ${isPresentation ? 'text-base' : 'text-xs'}`}>📝 {step.keyTerm}</p>
                    </div>
                  )}

                  {isExpanded && step.detail && (
                    <p className={`text-gray-400 italic animate-fadeIn ${isPresentation ? 'text-base' : 'text-xs'}`}>{step.detail}</p>
                  )}

                  {isExpanded && step.points && (
                    <div className="space-y-2 animate-fadeIn">
                      {step.points.map((p, pIdx) => (
                        <div key={pIdx} className={`${colors.darkBg} border ${colors.border} rounded-lg ${isPresentation ? 'p-3' : 'p-2'}`}>
                          <p className={`font-bold ${colors.text} ${isPresentation ? 'text-base' : 'text-xs'}`}>{p.name}</p>
                          <p className={`text-gray-400 ${isPresentation ? 'text-sm' : 'text-xs'}`}>{p.detail}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {isExpanded && step.process && (
                    <div className="space-y-2 animate-fadeIn">
                      {step.process.map((p, pIdx) => (
                        <div key={pIdx} className={`flex items-start gap-3 ${colors.darkBg} border-l-4 ${colors.border} rounded-r-lg ${isPresentation ? 'p-3' : 'p-2'}`}>
                          <span className={`font-bold ${colors.text} shrink-0 ${isPresentation ? 'text-base' : 'text-xs'}`}>{p.stage}</span>
                          <p className={`text-gray-400 ${isPresentation ? 'text-sm' : 'text-xs'}`}>{p.description}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {isExpanded && step.study && (
                    <div className="space-y-2 animate-fadeIn">
                      <div className={`${colors.darkBg} border ${colors.border} rounded-lg ${isPresentation ? 'p-3' : 'p-2'}`}>
                        <span className={`font-bold ${colors.text} block mb-1 ${isPresentation ? 'text-sm' : 'text-xs'}`}>Method:</span>
                        <p className={`text-gray-300 ${isPresentation ? 'text-sm' : 'text-xs'}`}>{step.study.method}</p>
                      </div>
                      <div className={`${colors.darkBg} border ${colors.border} rounded-lg ${isPresentation ? 'p-3' : 'p-2'}`}>
                        <span className={`font-bold ${colors.text} block mb-1 ${isPresentation ? 'text-sm' : 'text-xs'}`}>Results:</span>
                        <p className={`text-gray-300 ${isPresentation ? 'text-sm' : 'text-xs'}`}>{step.study.results}</p>
                      </div>
                      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-2">
                        <span className={`font-bold text-gray-400 block mb-1 ${isPresentation ? 'text-sm' : 'text-xs'}`}>Conclusion:</span>
                        <p className={`text-gray-400 italic ${isPresentation ? 'text-sm' : 'text-xs'}`}>{step.study.conclusion}</p>
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

export default Lesson5Deindividuation;

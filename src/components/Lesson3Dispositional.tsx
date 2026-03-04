import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Lightbulb, Compass } from 'lucide-react';

interface Lesson3DispositionalProps {
  isPresentation: boolean;
}

const Lesson3Dispositional: React.FC<Lesson3DispositionalProps> = ({ isPresentation }) => {
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [expandedEval, setExpandedEval] = useState<string | null>(null);

  const steps = [
    {
      id: 1,
      title: 'Dispositional Factors',
      icon: '🧬',
      color: 'orange',
      content: 'Not everyone in Asch\'s study conformed. This suggests that personal characteristics — dispositional factors — play a role in whether someone conforms or resists.',
      example: '25% of Asch\'s participants never conformed at all, despite facing unanimous group pressure on every critical trial.'
    },
    {
      id: 2,
      title: 'Locus of Control',
      icon: '🎯',
      color: 'blue',
      content: 'Locus of control refers to how much control a person feels they have over their own life. People with an internal LOC believe they are responsible for what happens to them. People with an external LOC believe outcomes are due to luck or outside forces.',
      example: 'Internal LOC: "I did well because I studied hard." External LOC: "I did well because the test was easy."'
    },
    {
      id: 3,
      title: 'LOC & Conformity',
      icon: '🛡️',
      color: 'green',
      content: 'People with an internal locus of control are less likely to conform because they have more confidence in their own opinions and take personal responsibility for their decisions.',
      example: 'In Asch\'s study, the 25% who never conformed likely had a strong internal locus of control — they trusted their own judgement over the group.'
    },
    {
      id: 4,
      title: 'Expertise',
      icon: '🎓',
      color: 'purple',
      content: 'If you are an expert in something, you are less likely to look to others for the answer. Expertise reduces the power of Informational Social Influence (ISI) because you already have the knowledge.',
      example: 'A study on antique valuation found that antiques experts were far less likely to conform to others\' opinions about the value of items compared to non-experts.'
    }
  ];

  const evaluations = [
    {
      id: 'loc-weakness',
      type: 'limitation',
      title: 'LOC Doesn\'t Always Predict Conformity',
      content: 'People with an internal LOC can still conform in some situations. For example, if they want to be liked by the group (NSI), they might go along with the majority even if they think they are wrong. This suggests personality is only one factor.',
      color: 'red'
    },
    {
      id: 'expertise-weakness',
      type: 'limitation',
      title: 'Expertise Can Be Overridden',
      content: 'Even experts might still conform if they are in a group of people they greatly admire or respect. This means that expertise alone doesn\'t always prevent conformity — social context still matters.',
      color: 'red'
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap: Record<string, { bg: string; border: string; text: string }> = {
      orange: { bg: 'bg-orange-900/30', border: 'border-orange-500', text: 'text-orange-400' },
      blue: { bg: 'bg-blue-900/30', border: 'border-blue-500', text: 'text-blue-400' },
      green: { bg: 'bg-green-900/30', border: 'border-green-500', text: 'text-green-400' },
      purple: { bg: 'bg-purple-900/30', border: 'border-purple-500', text: 'text-purple-400' },
      red: { bg: 'bg-red-900/30', border: 'border-red-500', text: 'text-red-400' },
    };
    return colorMap[color] || colorMap.orange;
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className={`flex items-center justify-between mb-6 ${isPresentation ? 'mb-8' : ''}`}>
        <div className="flex items-center gap-3">
          <Compass size={isPresentation ? 32 : 24} className="text-orange-400" />
          <h3 className={`font-bold text-white ${isPresentation ? 'text-3xl' : 'text-xl'}`}>
            Dispositional Factors Affecting Conformity
          </h3>
        </div>
        <div className={`text-gray-400 font-mono ${isPresentation ? 'text-lg' : 'text-sm'}`}>
          {revealedSteps} / {steps.length} revealed
        </div>
      </div>

      {/* Step-by-Step Cards */}
      <div className={`grid grid-cols-2 gap-4 mb-6 ${isPresentation ? 'gap-6 mb-8' : ''}`}>
        {steps.map((step, idx) => {
          const colors = getColorClasses(step.color);
          const isRevealed = idx < revealedSteps;

          return (
            <div
              key={step.id}
              className={`relative rounded-xl border-2 transition-all duration-500 overflow-hidden ${
                isRevealed
                  ? `${colors.border} ${colors.bg} scale-100 opacity-100`
                  : 'border-gray-700 bg-gray-900/50 scale-95 opacity-60'
              } ${isPresentation ? 'p-6' : 'p-4'}`}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className={`${isPresentation ? 'text-3xl' : 'text-2xl'}`}>{step.icon}</span>
                <h4 className={`font-bold ${isRevealed ? colors.text : 'text-gray-500'} ${isPresentation ? 'text-xl' : 'text-base'}`}>
                  {step.title}
                </h4>
              </div>

              {isRevealed ? (
                <div className="animate-fadeIn space-y-3">
                  <p className={`text-gray-300 ${isPresentation ? 'text-lg' : 'text-sm'}`}>
                    {step.content}
                  </p>
                  <div className={`${colors.bg} border ${colors.border} rounded-lg p-3`}>
                    <p className={`text-gray-400 italic ${isPresentation ? 'text-base' : 'text-xs'}`}>
                      <span className={colors.text}>Example:</span> {step.example}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-20 text-gray-600">
                  <span className={`font-mono uppercase tracking-widest ${isPresentation ? 'text-base' : 'text-xs'}`}>
                    Click "Reveal Next" below
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Reveal Controls */}
      <div className={`flex gap-4 mb-6 ${isPresentation ? 'gap-6 mb-8' : ''}`}>
        <button
          onClick={() => setRevealedSteps(prev => Math.min(prev + 1, steps.length))}
          disabled={revealedSteps >= steps.length}
          className={`flex-1 bg-orange-600 hover:bg-orange-500 disabled:opacity-50 disabled:grayscale text-white font-bold rounded-xl transition-all ${
            isPresentation ? 'py-5 text-xl' : 'py-3 text-base'
          }`}
        >
          Reveal Next ({revealedSteps}/{steps.length})
        </button>
        <button
          onClick={() => setRevealedSteps(steps.length)}
          className={`bg-gray-700 hover:bg-gray-600 text-white font-bold rounded-xl transition-all ${
            isPresentation ? 'px-8 py-5 text-xl' : 'px-6 py-3 text-sm'
          }`}
        >
          Show All
        </button>
      </div>

      {/* Evaluation Accordions */}
      {revealedSteps >= steps.length && (
        <div className="animate-fadeIn space-y-3">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb size={isPresentation ? 20 : 16} className="text-orange-400" />
            <span className={`text-orange-400 font-bold uppercase tracking-widest ${isPresentation ? 'text-base' : 'text-xs'}`}>
              Evaluation
            </span>
          </div>
          
          {evaluations.map((evalItem) => {
            const colors = getColorClasses(evalItem.color);
            const isExpanded = expandedEval === evalItem.id;

            return (
              <div
                key={evalItem.id}
                className={`border-2 rounded-xl overflow-hidden transition-all ${
                  isExpanded ? `${colors.border} ${colors.bg}` : 'border-gray-700 bg-gray-900/50'
                }`}
              >
                <button
                  onClick={() => setExpandedEval(isExpanded ? null : evalItem.id)}
                  className={`w-full flex items-center justify-between ${isPresentation ? 'p-5' : 'p-4'}`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`font-bold uppercase tracking-widest ${colors.text} ${isPresentation ? 'text-sm' : 'text-xs'}`}>
                      {evalItem.type === 'strength' ? '✓ Strength' : '✗ Limitation'}
                    </span>
                    <span className={`font-semibold text-white ${isPresentation ? 'text-lg' : 'text-sm'}`}>
                      {evalItem.title}
                    </span>
                  </div>
                  {isExpanded ? (
                    <ChevronUp size={isPresentation ? 24 : 18} className="text-gray-400" />
                  ) : (
                    <ChevronDown size={isPresentation ? 24 : 18} className="text-gray-400" />
                  )}
                </button>

                {isExpanded && (
                  <div className={`animate-fadeIn border-t border-gray-700 ${isPresentation ? 'p-5' : 'p-4'}`}>
                    <p className={`text-gray-300 ${isPresentation ? 'text-lg' : 'text-sm'}`}>
                      {evalItem.content}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Lesson3Dispositional;

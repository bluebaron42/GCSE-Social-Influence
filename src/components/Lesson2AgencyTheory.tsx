import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Lightbulb, UserCog, AlertCircle } from 'lucide-react';

interface Lesson2AgencyTheoryProps {
  isPresentation: boolean;
}

const Lesson2AgencyTheory: React.FC<Lesson2AgencyTheoryProps> = ({ isPresentation }) => {
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [expandedEval, setExpandedEval] = useState<string | null>(null);

  const steps = [
    {
      id: 1,
      title: 'Autonomous State',
      icon: '🧠',
      color: 'blue',
      content: 'We feel responsible for our own actions. We choose how to behave and feel the consequences of those actions.',
      example: 'Walking down the street, you choose whether to help someone who has dropped their shopping.'
    },
    {
      id: 2,
      title: 'Agentic Shift',
      icon: '⚡',
      color: 'amber',
      content: 'The move from autonomous to agentic state. This happens when we are in the presence of an authority figure.',
      example: 'A teacher enters the room and tells you to stop talking. You shift from making your own choices to following orders.'
    },
    {
      id: 3,
      title: 'Agentic State',
      icon: '🤖',
      color: 'purple',
      content: 'We act as an "agent" for someone else. We don\'t feel responsible for our actions because we believe we are just following orders.',
      example: '"I was just following orders" - what many participants said in Milgram\'s study.'
    },
    {
      id: 4,
      title: 'Moral Strain',
      icon: '😰',
      color: 'red',
      content: 'Even in an agentic state, we might still feel what we\'re doing is wrong. This explains the distress shown by Milgram\'s participants.',
      example: 'Participants sweating, trembling, and showing signs of stress - they were following orders but knew it was wrong.'
    }
  ];

  const evaluations = [
    {
      id: 'strength',
      type: 'strength',
      title: 'Research Support',
      content: 'When Milgram interviewed participants after the study, they often said they only did it because they were told to. This suggests they were in an agentic state and didn\'t feel responsible for their actions.',
      color: 'green'
    },
    {
      id: 'weakness',
      type: 'limitation',
      title: 'Doesn\'t Explain All Obedience',
      content: '35% of participants refused to go to 450 volts. According to agency theory, all of them should have been in an agentic state and obeyed. This suggests other factors are involved, such as personality.',
      color: 'red'
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap: Record<string, { bg: string; border: string; text: string }> = {
      blue: { bg: 'bg-blue-900/30', border: 'border-blue-500', text: 'text-blue-400' },
      amber: { bg: 'bg-amber-900/30', border: 'border-amber-500', text: 'text-amber-400' },
      purple: { bg: 'bg-purple-900/30', border: 'border-purple-500', text: 'text-purple-400' },
      red: { bg: 'bg-red-900/30', border: 'border-red-500', text: 'text-red-400' },
      green: { bg: 'bg-green-900/30', border: 'border-green-500', text: 'text-green-400' },
    };
    return colorMap[color] || colorMap.blue;
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className={`flex items-center justify-between mb-6 ${isPresentation ? 'mb-8' : ''}`}>
        <div className="flex items-center gap-3">
          <UserCog size={isPresentation ? 32 : 24} className="text-amber-400" />
          <h3 className={`font-bold text-white ${isPresentation ? 'text-3xl' : 'text-xl'}`}>
            Milgram's Agency Theory
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
          className={`flex-1 bg-amber-600 hover:bg-amber-500 disabled:opacity-50 disabled:grayscale text-white font-bold rounded-xl transition-all ${
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

      {/* Evaluation Accordions (appear after all steps revealed) */}
      {revealedSteps >= steps.length && (
        <div className="animate-fadeIn space-y-3">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb size={isPresentation ? 20 : 16} className="text-amber-400" />
            <span className={`text-amber-400 font-bold uppercase tracking-widest ${isPresentation ? 'text-base' : 'text-xs'}`}>
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

export default Lesson2AgencyTheory;

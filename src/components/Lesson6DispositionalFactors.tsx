import React, { useState } from 'react';
import { User, Heart, ChevronDown, ChevronUp } from 'lucide-react';

interface Lesson6DispositionalFactorsProps {
  isPresentation: boolean;
}

const Lesson6DispositionalFactors: React.FC<Lesson6DispositionalFactorsProps> = ({ isPresentation }) => {
  const [expandedFactor, setExpandedFactor] = useState<number | null>(null);
  const [currentStep, setCurrentStep] = useState(0);

  const factors = [
    {
      title: 'Personality & Self-Esteem',
      icon: User,
      color: 'teal',
      tagline: 'Individual differences in crowd susceptibility',
      description: 'A person\'s personality traits and level of self-esteem affect how they behave in crowds.',
      keyPoints: [
        { name: 'Self-esteem', detail: 'People with low self-esteem are more likely to be influenced by crowds — they seek group approval and are more susceptible to NSI.' },
        { name: 'Sensation-seeking', detail: 'High sensation-seekers (Zuckerman) are drawn to the excitement of crowd events and more likely to engage in risky crowd behaviour.' },
        { name: 'Locus of control', detail: 'People with an external LOC are more likely to "go with the crowd" because they feel events are outside their control.' },
        { name: 'Suggestibility', detail: 'Some people are naturally more suggestible than others — they are more easily influenced by the emotional atmosphere of a crowd.' }
      ],
      example: 'In a crowd at a protest, a person with high self-esteem and internal LOC may critically evaluate the situation, whilst someone with low self-esteem may feel pressured to join in.',
      keyPoint: 'Personality acts as a filter — the same crowd situation can affect different people differently based on their dispositional traits.'
    },
    {
      title: 'Morality',
      icon: Heart,
      color: 'rose',
      tagline: 'Moral reasoning as a brake on crowd behaviour',
      description: 'A person\'s moral development and values affect whether they will go along with crowd behaviour, especially if it involves harm or rule-breaking.',
      keyPoints: [
        { name: 'Moral reasoning', detail: 'Kohlberg\'s stages of moral development suggest that people at higher levels of moral reasoning are better at resisting pressure to act immorally, even in crowds.' },
        { name: 'Moral identity', detail: 'People who strongly identify as "moral" or "good" are less likely to engage in antisocial crowd behaviour — their self-concept acts as a restraint.' },
        { name: 'Moral disengagement', detail: 'Bandura: People can "switch off" their moral standards in crowds through justification ("everyone else was doing it"), displacement of responsibility, or dehumanising victims.' },
        { name: 'Resistance through morality', detail: 'Some individuals refuse to participate in harmful crowd behaviour because their moral values override situational pressures — like whistleblowers or bystander interveners.' }
      ],
      example: 'During the London riots (2011), most people in the area did NOT join in. Their moral values acted as a dispositional brake against crowd pressure and deindividuation.',
      keyPoint: 'Morality is a dispositional factor that can override situational pressures — it explains why not everyone in a crowd behaves antisocially.'
    }
  ];

  const getColorClasses = (color: string) => {
    const map: Record<string, { bg: string; border: string; text: string; darkBg: string }> = {
      teal: { bg: 'bg-teal-900/30', border: 'border-teal-500', text: 'text-teal-400', darkBg: 'bg-teal-900/20' },
      rose: { bg: 'bg-rose-900/30', border: 'border-rose-500', text: 'text-rose-400', darkBg: 'bg-rose-900/20' },
    };
    return map[color] || map.teal;
  };

  return (
    <div className="flex flex-col h-full">
      <div className={`flex items-center justify-between mb-6 ${isPresentation ? 'mb-8' : ''}`}>
        <div className="flex items-center gap-3">
          {factors.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentStep(idx)}
              className={`rounded-full font-bold transition-all ${
                idx <= currentStep ? 'bg-teal-600 text-white' : 'bg-gray-700 text-gray-500'
              } ${isPresentation ? 'w-12 h-12 text-xl' : 'w-8 h-8 text-sm'}`}
            >
              {idx + 1}
            </button>
          ))}
        </div>
        <button
          onClick={() => setCurrentStep(prev => Math.min(prev + 1, factors.length - 1))}
          disabled={currentStep >= factors.length - 1}
          className={`bg-teal-600 hover:bg-teal-500 disabled:opacity-50 text-white font-bold rounded-lg transition-all ${
            isPresentation ? 'px-8 py-3 text-lg' : 'px-4 py-2 text-sm'
          }`}
        >
          Next Factor →
        </button>
      </div>

      <div className={`grid grid-cols-2 gap-4 flex-1 ${isPresentation ? 'gap-6' : ''}`}>
        {factors.map((factor, idx) => {
          const colors = getColorClasses(factor.color);
          const Icon = factor.icon;
          const isActive = idx <= currentStep;
          const isExpanded = expandedFactor === idx;

          return (
            <div
              key={idx}
              onClick={() => isActive && setExpandedFactor(isExpanded ? null : idx)}
              className={`border-2 rounded-xl transition-all duration-300 overflow-y-auto ${
                isActive ? `${colors.border} ${colors.bg} cursor-pointer` : 'border-gray-700/50 bg-gray-900/30 opacity-40'
              } ${isPresentation ? 'p-6' : 'p-4'}`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 rounded-lg ${colors.darkBg} border ${colors.border}`}>
                  <Icon size={isPresentation ? 28 : 20} className={colors.text} />
                </div>
                <div className="flex-1">
                  <h3 className={`font-bold ${colors.text} ${isPresentation ? 'text-2xl' : 'text-lg'}`}>{factor.title}</h3>
                  <p className={`text-gray-500 ${isPresentation ? 'text-base' : 'text-xs'}`}>{factor.tagline}</p>
                </div>
                {isActive && (isExpanded ? <ChevronUp className={colors.text} size={20} /> : <ChevronDown className={colors.text} size={20} />)}
              </div>

              {isActive && (
                <div className="animate-fadeIn">
                  <p className={`text-gray-300 mb-4 ${isPresentation ? 'text-lg' : 'text-sm'}`}>{factor.description}</p>

                  {isExpanded && (
                    <div className="animate-fadeIn space-y-3">
                      {factor.keyPoints.map((kp, kIdx) => (
                        <div key={kIdx} className={`${colors.darkBg} border ${colors.border} rounded-lg ${isPresentation ? 'p-4' : 'p-3'}`}>
                          <p className={`font-bold ${colors.text} ${isPresentation ? 'text-base' : 'text-xs'}`}>{kp.name}</p>
                          <p className={`text-gray-400 ${isPresentation ? 'text-base' : 'text-xs'}`}>{kp.detail}</p>
                        </div>
                      ))}

                      <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-3">
                        <span className={`font-bold text-gray-400 block mb-1 ${isPresentation ? 'text-sm' : 'text-xs'}`}>Example:</span>
                        <p className={`text-gray-300 italic ${isPresentation ? 'text-base' : 'text-xs'}`}>{factor.example}</p>
                      </div>

                      <div className={`border-l-4 ${colors.border} ${colors.darkBg} rounded-r-lg p-3`}>
                        <p className={`${colors.text} font-semibold ${isPresentation ? 'text-base' : 'text-xs'}`}>💡 {factor.keyPoint}</p>
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

export default Lesson6DispositionalFactors;

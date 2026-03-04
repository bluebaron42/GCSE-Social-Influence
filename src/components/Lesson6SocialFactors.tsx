import React, { useState } from 'react';
import { Users, Globe, ChevronDown, ChevronUp } from 'lucide-react';

interface Lesson6SocialFactorsProps {
  isPresentation: boolean;
}

const Lesson6SocialFactors: React.FC<Lesson6SocialFactorsProps> = ({ isPresentation }) => {
  const [expandedFactor, setExpandedFactor] = useState<number | null>(null);
  const [currentStep, setCurrentStep] = useState(0);

  const factors = [
    {
      title: 'Social Loafing',
      icon: Users,
      color: 'teal',
      tagline: 'Putting in less effort in a group',
      description: 'Social loafing is the tendency for individuals to put in less effort when working in a group compared to when working alone.',
      keyPoints: [
        { name: 'Definition', detail: 'People reduce their effort because individual contributions are harder to identify in a group — they "hide" behind others.' },
        { name: 'Ringelmann Effect', detail: 'Ringelmann (1913) found that when people pulled a rope together, each person exerted less force than when pulling alone. Effort decreased as group size increased.' },
        { name: 'Shaw (1932)', detail: 'Found that groups solved problems better than individuals BUT each member contributed less effort than they would have working alone.' },
        { name: 'Why it happens', detail: 'Diffusion of responsibility — when effort is pooled, individuals feel less personally accountable for the outcome.' }
      ],
      example: 'In group projects at school, some students do very little work because they know others will pick up the slack. The larger the group, the easier it is to "hide".',
      keyPoint: 'Social loafing in crowds means individuals may contribute less to collective behaviour — but can also mean less personal restraint.'
    },
    {
      title: 'Culture',
      icon: Globe,
      color: 'amber',
      tagline: 'How cultural values shape crowd behaviour',
      description: 'Culture influences how people behave in crowds. Individualist and collectivist cultures produce different patterns of crowd behaviour.',
      keyPoints: [
        { name: 'Individualist cultures', detail: 'Countries like the UK and USA emphasise personal identity and independence. People may be less susceptible to crowd influence because they value standing out.' },
        { name: 'Collectivist cultures', detail: 'Countries like Japan and China emphasise group harmony and belonging. People may be more likely to follow crowd norms because group identity is valued.' },
        { name: 'Research support', detail: 'Bond & Smith (1996) meta-analysis found higher conformity rates in collectivist cultures, suggesting culture affects susceptibility to social influence.' },
        { name: 'Crowd context', detail: 'In cultures that value group harmony, crowds may be more cohesive but also more easily led. In individualist cultures, crowds may be more fragmented.' }
      ],
      example: 'Football crowd behaviour in England (individualist) tends to be more fragmented with rival groups, whilst crowd behaviour at Japanese sporting events (collectivist) tends to be more unified and synchronised.',
      keyPoint: 'Culture determines the baseline for how easily individuals are influenced by crowd dynamics.'
    }
  ];

  const getColorClasses = (color: string) => {
    const map: Record<string, { bg: string; border: string; text: string; darkBg: string }> = {
      teal: { bg: 'bg-teal-900/30', border: 'border-teal-500', text: 'text-teal-400', darkBg: 'bg-teal-900/20' },
      amber: { bg: 'bg-amber-900/30', border: 'border-amber-500', text: 'text-amber-400', darkBg: 'bg-amber-900/20' },
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

export default Lesson6SocialFactors;

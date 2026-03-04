import React, { useState } from 'react';
import { Search, Crown, Baby, ArrowDownRight, ShieldAlert } from 'lucide-react';

interface Lesson3AuthoritarianPersonalityProps {
  isPresentation: boolean;
}

const Lesson3AuthoritarianPersonality: React.FC<Lesson3AuthoritarianPersonalityProps> = ({ isPresentation }) => {
  const [revealed, setRevealed] = useState<string | null>(null);

  const cards = [
    {
      id: 'theory',
      title: 'The Theory',
      icon: Crown,
      color: 'orange',
      content: {
        main: 'Adorno et al. (1950) suggested that some people have a personality type that makes them more likely to obey — the Authoritarian Personality.',
        points: [
          'Very respectful of authority',
          'Very submissive to those in power',
          'Very hostile to those seen as "inferior" or different',
          'Rigid and traditional ideas about right and wrong'
        ]
      }
    },
    {
      id: 'development',
      title: 'How It Develops',
      icon: Baby,
      color: 'blue',
      content: {
        main: 'Adorno suggested the authoritarian personality develops in childhood as a result of harsh parenting.',
        points: [
          'Parents are very strict and only show love when child is obedient',
          'Child grows up with strong respect for authority',
          'Child feels anger towards parents but cannot express it',
          'Anger is "displaced" onto weaker or different groups (e.g. minorities)'
        ]
      }
    },
    {
      id: 'link',
      title: 'Link to Obedience',
      icon: ArrowDownRight,
      color: 'green',
      content: {
        main: 'People with an authoritarian personality are more likely to obey authority figures because they have been conditioned to respect and submit to those in power.',
        stats: [
          { value: 'Elms & Milgram', label: '1966 study' },
          { value: 'High scorers', label: 'were most obedient' },
        ],
        detail: 'Elms & Milgram interviewed participants from the original study and found that those who were highly obedient also scored highly on a test of authoritarianism (the F-scale).'
      }
    },
    {
      id: 'limitations',
      title: 'Limitations',
      icon: ShieldAlert,
      color: 'red',
      content: {
        main: 'The authoritarian personality has several important limitations as an explanation for obedience.',
        implications: [
          'Cannot explain obedience on a large scale — millions obeyed in Nazi Germany, not all could have the same personality',
          'Social/situational factors may be more important than personality',
          'The F-scale questionnaire may be biased — people tend to agree with statements (acquiescence bias)',
          'Correlation, not causation — harsh parenting and authoritarianism may not be directly linked'
        ]
      }
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap: Record<string, { bg: string; border: string; text: string; accent: string }> = {
      orange: { bg: 'bg-orange-900/20', border: 'border-orange-500', text: 'text-orange-400', accent: 'text-orange-500' },
      blue: { bg: 'bg-blue-900/20', border: 'border-blue-500', text: 'text-blue-400', accent: 'text-blue-500' },
      green: { bg: 'bg-green-900/20', border: 'border-green-500', text: 'text-green-400', accent: 'text-green-500' },
      red: { bg: 'bg-red-900/20', border: 'border-red-500', text: 'text-red-400', accent: 'text-red-500' },
    };
    return colorMap[color] || colorMap.orange;
  };

  return (
    <div className="grid grid-cols-2 gap-6 h-full">
      {cards.map((card) => {
        const colors = getColorClasses(card.color);
        const Icon = card.icon;
        const isRevealed = revealed === card.id;

        return (
          <div
            key={card.id}
            onClick={() => setRevealed(isRevealed ? null : card.id)}
            className={`relative cursor-pointer group border-2 rounded-2xl transition-all duration-300 overflow-hidden ${
              isRevealed
                ? `${colors.border} ${colors.bg} scale-[1.02] shadow-lg`
                : 'border-gray-700 hover:border-gray-600 bg-gray-900/50'
            } ${revealed && !isRevealed ? 'opacity-40' : 'opacity-100'}`}
          >
            {/* Background Icon */}
            <div className={`absolute top-4 right-4 ${colors.text} opacity-20 group-hover:opacity-40 transition-opacity`}>
              <Icon size={isPresentation ? 80 : 64} />
            </div>

            <div className={`p-6 h-full flex flex-col relative z-10 ${isPresentation ? 'p-8' : ''}`}>
              <h3 className={`font-bold mb-4 ${isPresentation ? 'text-3xl' : 'text-xl'} ${
                isRevealed ? colors.text : 'text-gray-400 group-hover:text-gray-300'
              }`}>
                {card.title}
              </h3>

              {isRevealed ? (
                <div className="animate-fadeIn space-y-3 flex-grow overflow-y-auto custom-scrollbar">
                  {card.content.main && (
                    <p className={`${colors.text} font-semibold ${isPresentation ? 'text-xl' : 'text-sm'}`}>
                      {card.content.main}
                    </p>
                  )}

                  {card.content.points && (
                    <ul className={`space-y-2 ${isPresentation ? 'text-lg' : 'text-xs'}`}>
                      {card.content.points.map((point, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-gray-300">
                          <span className={colors.accent}>•</span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  )}

                  {card.content.stats && (
                    <div className="flex gap-4 mt-4">
                      {card.content.stats.map((stat, idx) => (
                        <div key={idx} className={`${colors.bg} border ${colors.border} rounded-xl p-4 text-center flex-1`}>
                          <div className={`font-black ${colors.text} ${isPresentation ? 'text-2xl' : 'text-lg'}`}>
                            {stat.value}
                          </div>
                          <div className={`text-gray-400 ${isPresentation ? 'text-base' : 'text-xs'}`}>
                            {stat.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {card.content.detail && (
                    <p className={`text-gray-400 italic mt-2 ${isPresentation ? 'text-base' : 'text-xs'}`}>
                      {card.content.detail}
                    </p>
                  )}

                  {card.content.implications && (
                    <div className={`mt-4 p-3 bg-gray-900/50 rounded-lg border-l-4 ${colors.border}`}>
                      <p className={`${colors.text} font-semibold mb-2 ${isPresentation ? 'text-lg' : 'text-xs'}`}>
                        Key Criticisms:
                      </p>
                      <ul className={`space-y-1 ${isPresentation ? 'text-base' : 'text-xs'}`}>
                        {card.content.implications.map((imp, idx) => (
                          <li key={idx} className="text-gray-300">→ {imp}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex-grow flex flex-col items-center justify-center text-center gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                  <Search size={isPresentation ? 48 : 40} className={`${colors.text} opacity-50`} />
                  <span className={`font-mono ${colors.text} opacity-50 tracking-widest uppercase ${isPresentation ? 'text-lg' : 'text-xs'}`}>
                    Click to Reveal
                  </span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Lesson3AuthoritarianPersonality;

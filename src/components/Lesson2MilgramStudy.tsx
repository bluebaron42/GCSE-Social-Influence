import React, { useState } from 'react';
import { Search, FlaskConical, Users, Zap, AlertTriangle } from 'lucide-react';

interface Lesson2MilgramStudyProps {
  isPresentation: boolean;
}

const Lesson2MilgramStudy: React.FC<Lesson2MilgramStudyProps> = ({ isPresentation }) => {
  const [revealed, setRevealed] = useState<string | null>(null);

  const cards = [
    {
      id: 'aims',
      title: 'Aims',
      icon: FlaskConical,
      color: 'amber',
      content: {
        main: 'To investigate how far people would go in obeying an order if it involved harming another person.',
        detail: 'Milgram wanted to understand why so many people in Nazi Germany had followed orders to kill millions. Could "ordinary" people commit terrible acts simply because they were told to?'
      }
    },
    {
      id: 'method',
      title: 'Method',
      icon: Users,
      color: 'blue',
      content: {
        main: '40 American men (aged 20-50) recruited via newspaper advert and paid $4.50.',
        points: [
          'Study at Yale University',
          'Participant always assigned as "Teacher" (rigged lottery)',
          'Confederate played the "Learner" (strapped to chair with electrodes)',
          '"Experimenter" wore grey lab coat',
          'Shock generator: 15V to 450V in 15V increments',
          'At 300V learner kicked wall then went silent',
          'Prods given if teacher hesitated: "Please continue", "The experiment requires you continue"'
        ]
      }
    },
    {
      id: 'results',
      title: 'Results',
      icon: Zap,
      color: 'green',
      content: {
        stats: [
          { value: '100%', label: 'went to 300V' },
          { value: '65%', label: 'went to 450V (maximum)' },
        ],
        detail: 'Many participants showed signs of extreme stress: sweating, trembling, stuttering, biting their lips, groaning, and digging fingernails into their flesh.'
      }
    },
    {
      id: 'conclusions',
      title: 'Conclusions',
      icon: AlertTriangle,
      color: 'purple',
      content: {
        main: 'Ordinary people will obey an authority figure even if it means harming an innocent person.',
        implications: [
          'Obedience to authority is deeply ingrained',
          'Situational factors can override personal morals',
          'The "Germans are different" hypothesis was wrong'
        ]
      }
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap: Record<string, { bg: string; border: string; text: string; accent: string }> = {
      amber: { bg: 'bg-amber-900/20', border: 'border-amber-500', text: 'text-amber-400', accent: 'text-amber-500' },
      blue: { bg: 'bg-blue-900/20', border: 'border-blue-500', text: 'text-blue-400', accent: 'text-blue-500' },
      green: { bg: 'bg-green-900/20', border: 'border-green-500', text: 'text-green-400', accent: 'text-green-500' },
      purple: { bg: 'bg-purple-900/20', border: 'border-purple-500', text: 'text-purple-400', accent: 'text-purple-500' },
    };
    return colorMap[color] || colorMap.amber;
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
                          <div className={`font-black ${colors.text} ${isPresentation ? 'text-4xl' : 'text-2xl'}`}>
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
                        Implications:
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

export default Lesson2MilgramStudy;

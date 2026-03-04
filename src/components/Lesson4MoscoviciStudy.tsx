import React, { useState } from 'react';
import { Search, FlaskConical, Users, BarChart3, Lightbulb } from 'lucide-react';

interface Lesson4MoscoviciStudyProps {
  isPresentation: boolean;
}

const Lesson4MoscoviciStudy: React.FC<Lesson4MoscoviciStudyProps> = ({ isPresentation }) => {
  const [revealed, setRevealed] = useState<string | null>(null);

  const cards = [
    {
      id: 'aims',
      title: 'Aims',
      icon: FlaskConical,
      color: 'red',
      content: {
        main: 'To investigate whether a consistent minority could influence the majority to change their judgement.',
        detail: 'Moscovici (1969) wanted to explore the opposite of conformity — can a small group of people actually change what the majority thinks? This is called minority influence.'
      }
    },
    {
      id: 'method',
      title: 'Method',
      icon: Users,
      color: 'blue',
      content: {
        main: 'Groups of 6 women were shown 36 blue-coloured slides (varying in brightness).',
        points: [
          '4 genuine participants + 2 confederates in each group',
          'All slides were clearly blue — no ambiguity',
          'Consistent condition: confederates said "green" on ALL 36 trials',
          'Inconsistent condition: confederates said "green" on only 24 out of 36 trials',
          'Control group: no confederates — participants identified colours alone'
        ]
      }
    },
    {
      id: 'results',
      title: 'Results',
      icon: BarChart3,
      color: 'green',
      content: {
        stats: [
          { value: '8.42%', label: 'agreed with minority (consistent)' },
          { value: '1.25%', label: 'agreed with minority (inconsistent)' },
        ],
        detail: '32% of participants in the consistent condition called the slides green at least once. The control group only said "green" on 0.25% of trials. This shows consistency is the key factor.'
      }
    },
    {
      id: 'conclusions',
      title: 'Conclusions',
      icon: Lightbulb,
      color: 'purple',
      content: {
        main: 'A consistent minority can influence the majority, even when the majority knows the minority is wrong.',
        implications: [
          'Consistency is the most important factor in minority influence',
          'Inconsistent minorities have much less influence',
          'Minorities cause the majority to re-examine their own views',
          'This process is called "conversion" — a genuine private change of opinion'
        ]
      }
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap: Record<string, { bg: string; border: string; text: string; accent: string }> = {
      red: { bg: 'bg-red-900/20', border: 'border-red-500', text: 'text-red-400', accent: 'text-red-500' },
      blue: { bg: 'bg-blue-900/20', border: 'border-blue-500', text: 'text-blue-400', accent: 'text-blue-500' },
      green: { bg: 'bg-green-900/20', border: 'border-green-500', text: 'text-green-400', accent: 'text-green-500' },
      purple: { bg: 'bg-purple-900/20', border: 'border-purple-500', text: 'text-purple-400', accent: 'text-purple-500' },
    };
    return colorMap[color] || colorMap.red;
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
                        Key Implications:
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

export default Lesson4MoscoviciStudy;

import React, { useState } from 'react';
import { Search, MapPin, Users, BarChart3, Lightbulb } from 'lucide-react';

interface Lesson5ReicherStudyProps {
  isPresentation: boolean;
}

const Lesson5ReicherStudy: React.FC<Lesson5ReicherStudyProps> = ({ isPresentation }) => {
  const [revealed, setRevealed] = useState<string | null>(null);

  const cards = [
    {
      id: 'context',
      title: 'Context',
      icon: MapPin,
      color: 'yellow',
      content: {
        main: 'The 1980 St Pauls Riot in Bristol — a violent clash between the local community and police.',
        detail: 'In April 1980, police raided the Black and White Café in St Pauls, Bristol, triggering hours of rioting. Reicher (1984) studied this event to challenge the traditional view that crowd behaviour is simply "mindless violence".'
      }
    },
    {
      id: 'method',
      title: 'Method',
      icon: Users,
      color: 'blue',
      content: {
        main: 'Reicher conducted interviews with participants and witnesses of the St Pauls riot.',
        points: [
          'Qualitative study using participant interviews',
          'Analysed what the crowd did and did NOT do',
          'Looked at geographic boundaries of the violence',
          'Examined which targets were attacked and which were left alone',
          'Compared behaviour with traditional deindividuation theory'
        ]
      }
    },
    {
      id: 'findings',
      title: 'Key Findings',
      icon: BarChart3,
      color: 'green',
      content: {
        main: 'The crowd\'s behaviour was NOT random or mindless:',
        points: [
          'Violence was limited to the St Pauls area — rioters did not spread to other neighbourhoods',
          'Only specific targets were attacked: police cars, banks, and the perceived symbols of authority',
          'Local shops and homes were deliberately LEFT ALONE',
          'The crowd acted according to a shared social identity — as a community resisting perceived injustice'
        ],
        detail: 'This was highly selective, purposeful behaviour — the opposite of what deindividuation theory would predict.'
      }
    },
    {
      id: 'conclusions',
      title: 'Conclusions',
      icon: Lightbulb,
      color: 'purple',
      content: {
        main: 'Crowd behaviour is not simply "mindless" — it follows social identity and shared group norms.',
        implications: [
          'Deindividuation theory is too simplistic — crowds are not just aggressive and irrational',
          'Social Identity Theory (SIT) better explains crowd behaviour',
          'People in crowds act according to group norms, not a loss of identity',
          'The crowd had a shared identity as a community under threat, guiding selective behaviour'
        ]
      }
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap: Record<string, { bg: string; border: string; text: string; accent: string }> = {
      yellow: { bg: 'bg-yellow-900/20', border: 'border-yellow-500', text: 'text-yellow-400', accent: 'text-yellow-500' },
      blue: { bg: 'bg-blue-900/20', border: 'border-blue-500', text: 'text-blue-400', accent: 'text-blue-500' },
      green: { bg: 'bg-green-900/20', border: 'border-green-500', text: 'text-green-400', accent: 'text-green-500' },
      purple: { bg: 'bg-purple-900/20', border: 'border-purple-500', text: 'text-purple-400', accent: 'text-purple-500' },
    };
    return colorMap[color] || colorMap.yellow;
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

export default Lesson5ReicherStudy;

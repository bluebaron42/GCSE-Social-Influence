import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Building2, Shirt, TrendingDown } from 'lucide-react';

interface Lesson2SituationalFactorsProps {
  isPresentation: boolean;
}

const Lesson2SituationalFactors: React.FC<Lesson2SituationalFactorsProps> = ({ isPresentation }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const factors = [
    {
      id: 'proximity',
      title: 'Proximity',
      icon: MapPin,
      color: 'red',
      definition: 'How close the teacher was to the learner and the experimenter.',
      variations: [
        { condition: 'Original (separate rooms)', obedience: 65, description: 'Teacher couldn\'t see learner' },
        { condition: 'Same room', obedience: 40, description: 'Teacher could see learner\'s distress' },
        { condition: 'Touch proximity', obedience: 30, description: 'Teacher had to force learner\'s hand onto shock plate' },
        { condition: 'Experimenter absent', obedience: 20.5, description: 'Orders given by telephone' },
      ],
      conclusion: 'The closer we are to the consequences of our actions, the less likely we are to obey an order that harms someone.'
    },
    {
      id: 'location',
      title: 'Location',
      icon: Building2,
      color: 'blue',
      definition: 'The prestige and authority associated with the setting.',
      variations: [
        { condition: 'Yale University', obedience: 65, description: 'Prestigious, respected institution' },
        { condition: 'Run-down office', obedience: 47.5, description: 'Moved to ordinary office building' },
      ],
      conclusion: 'The status of the location gives the experimenter more authority, making obedience more likely.'
    },
    {
      id: 'uniform',
      title: 'Uniform',
      icon: Shirt,
      color: 'purple',
      definition: 'The clothing worn by the authority figure.',
      variations: [
        { condition: 'Grey lab coat', obedience: 65, description: 'Experimenter wore scientific attire' },
        { condition: 'Ordinary clothes', obedience: 20, description: '"Member of public" took over in everyday clothes' },
      ],
      conclusion: 'Uniforms act as a strong visual symbol of authority and increase obedience.'
    }
  ];

  const currentFactor = factors[activeIndex];
  
  const getColorClasses = (color: string) => {
    const colorMap: Record<string, { bg: string; border: string; text: string; gradient: string }> = {
      red: { bg: 'bg-red-900/20', border: 'border-red-500', text: 'text-red-400', gradient: 'from-red-500' },
      blue: { bg: 'bg-blue-900/20', border: 'border-blue-500', text: 'text-blue-400', gradient: 'from-blue-500' },
      purple: { bg: 'bg-purple-900/20', border: 'border-purple-500', text: 'text-purple-400', gradient: 'from-purple-500' },
    };
    return colorMap[color] || colorMap.red;
  };

  const colors = getColorClasses(currentFactor.color);
  const Icon = currentFactor.icon;

  return (
    <div className="flex flex-col h-full">
      {/* Carousel Navigation */}
      <div className={`flex items-center justify-between mb-6 ${isPresentation ? 'mb-8' : ''}`}>
        <button
          onClick={() => setActiveIndex(prev => prev > 0 ? prev - 1 : factors.length - 1)}
          className={`p-3 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors ${isPresentation ? 'p-4' : ''}`}
        >
          <ChevronLeft size={isPresentation ? 32 : 24} className="text-gray-400" />
        </button>

        {/* Navigation Dots */}
        <div className="flex gap-3">
          {factors.map((factor, idx) => (
            <button
              key={factor.id}
              onClick={() => setActiveIndex(idx)}
              className={`transition-all rounded-full ${
                idx === activeIndex
                  ? `${colors.bg} ${colors.border} border-2 ${isPresentation ? 'w-16 h-4' : 'w-12 h-3'}`
                  : `bg-gray-700 hover:bg-gray-600 ${isPresentation ? 'w-4 h-4' : 'w-3 h-3'}`
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => setActiveIndex(prev => prev < factors.length - 1 ? prev + 1 : 0)}
          className={`p-3 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors ${isPresentation ? 'p-4' : ''}`}
        >
          <ChevronRight size={isPresentation ? 32 : 24} className="text-gray-400" />
        </button>
      </div>

      {/* Factor Card */}
      <div className={`flex-1 ${colors.bg} border-2 ${colors.border} rounded-2xl p-8 animate-fadeIn ${isPresentation ? 'p-12' : ''}`}>
        <div className="flex items-start gap-6 mb-6">
          <div className={`${colors.bg} border ${colors.border} rounded-xl p-4 ${isPresentation ? 'p-6' : ''}`}>
            <Icon size={isPresentation ? 48 : 32} className={colors.text} />
          </div>
          <div className="flex-1">
            <h3 className={`font-bold ${colors.text} ${isPresentation ? 'text-4xl mb-2' : 'text-2xl mb-1'}`}>
              {currentFactor.title}
            </h3>
            <p className={`text-gray-300 ${isPresentation ? 'text-xl' : 'text-sm'}`}>
              {currentFactor.definition}
            </p>
          </div>
          <div className={`text-gray-500 font-mono ${isPresentation ? 'text-xl' : 'text-sm'}`}>
            {activeIndex + 1} / {factors.length}
          </div>
        </div>

        {/* Variations Bar Chart */}
        <div className={`space-y-4 mb-6 ${isPresentation ? 'space-y-6 mb-8' : ''}`}>
          {currentFactor.variations.map((v, idx) => (
            <div key={idx} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className={`text-white font-semibold ${isPresentation ? 'text-lg' : 'text-sm'}`}>
                  {v.condition}
                </span>
                <span className={`font-mono font-bold ${colors.text} ${isPresentation ? 'text-2xl' : 'text-lg'}`}>
                  {v.obedience}%
                </span>
              </div>
              <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${colors.gradient} to-gray-600 rounded-full transition-all duration-1000`}
                  style={{ width: `${v.obedience}%` }}
                />
              </div>
              <p className={`text-gray-500 italic ${isPresentation ? 'text-base' : 'text-xs'}`}>
                {v.description}
              </p>
            </div>
          ))}
        </div>

        {/* Conclusion */}
        <div className={`bg-gray-900/50 border-l-4 ${colors.border} rounded-r-xl p-4 ${isPresentation ? 'p-6' : ''}`}>
          <div className="flex items-center gap-2 mb-2">
            <TrendingDown size={isPresentation ? 24 : 16} className={colors.text} />
            <span className={`font-bold ${colors.text} uppercase tracking-widest ${isPresentation ? 'text-base' : 'text-xs'}`}>
              Conclusion
            </span>
          </div>
          <p className={`text-gray-300 ${isPresentation ? 'text-xl' : 'text-sm'}`}>
            {currentFactor.conclusion}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Lesson2SituationalFactors;

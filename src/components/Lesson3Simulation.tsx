import React, { useState } from 'react';
import { Compass, ArrowRight, BarChart3 } from 'lucide-react';

interface Lesson3SimulationProps {
  isPresentation: boolean;
}

type Phase = 'intro' | 'quiz' | 'results';

interface Scenario {
  id: number;
  situation: string;
  optionA: string;
  optionB: string;
}

const scenarios: Scenario[] = [
  {
    id: 1,
    situation: "You get a bad mark on a test. You think...",
    optionA: "I didn't revise enough — I need to work harder next time.",
    optionB: "The test was unfair — the questions were too hard for anyone."
  },
  {
    id: 2,
    situation: "You win a prize in a competition. You think...",
    optionA: "I won because I put in a lot of effort and prepared well.",
    optionB: "I was just lucky — anyone could have won."
  },
  {
    id: 3,
    situation: "Your group of friends all want to watch a horror film but you hate horror films. You...",
    optionA: "Say you'd prefer something else — they can watch horror but you'll choose differently.",
    optionB: "Go along with it to fit in — there's no point arguing with everyone."
  },
  {
    id: 4,
    situation: "A teacher says something you know is factually incorrect in class. You...",
    optionA: "Politely raise your hand and point out the mistake.",
    optionB: "Stay quiet — the teacher is in charge and probably knows best."
  },
  {
    id: 5,
    situation: "You don't get picked for the school team. You think...",
    optionA: "I need to practise more and improve my skills for next time.",
    optionB: "The coach just doesn't like me — it's nothing I can change."
  },
  {
    id: 6,
    situation: "Everyone in your class says a new song is amazing but you think it's average. You...",
    optionA: "Share your honest opinion — you're comfortable disagreeing.",
    optionB: "Agree that it's great — you don't want to seem weird."
  },
  {
    id: 7,
    situation: "You are asked to do something by an older student that you think is unfair. You...",
    optionA: "Respectfully refuse — you don't have to do something just because they're older.",
    optionB: "Do it anyway — they're older and you should probably listen to them."
  },
  {
    id: 8,
    situation: "You succeed at something really difficult. You think...",
    optionA: "I succeeded because I worked hard and believed in myself.",
    optionB: "I succeeded because things just happened to go my way."
  }
];

const Lesson3Simulation: React.FC<Lesson3SimulationProps> = ({ isPresentation }) => {
  const [phase, setPhase] = useState<Phase>('intro');
  const [currentScenario, setCurrentScenario] = useState(0);
  const [internalCount, setInternalCount] = useState(0);

  const handleChoice = (choice: 'A' | 'B') => {
    if (choice === 'A') {
      setInternalCount(prev => prev + 1);
    }
    if (currentScenario < scenarios.length - 1) {
      setCurrentScenario(prev => prev + 1);
    } else {
      setPhase('results');
    }
  };

  const resetSimulation = () => {
    setPhase('intro');
    setCurrentScenario(0);
    setInternalCount(0);
  };

  const internalPercent = Math.round((internalCount / scenarios.length) * 100);

  const getResultCategory = () => {
    if (internalPercent >= 75) return {
      label: 'Strongly Internal LOC',
      color: 'green',
      description: 'You tend to believe you are in control of your own outcomes. According to research, you would be LESS likely to conform in Asch\'s study and LESS likely to obey in Milgram\'s study.',
      conformity: 'LOW',
      obedience: 'LOW'
    };
    if (internalPercent >= 50) return {
      label: 'Moderately Internal LOC',
      color: 'blue',
      description: 'You mostly believe in your own ability to influence outcomes, but sometimes rely on external factors. You would show moderate resistance to conformity and obedience pressures.',
      conformity: 'MODERATE',
      obedience: 'MODERATE'
    };
    if (internalPercent >= 25) return {
      label: 'Moderately External LOC',
      color: 'amber',
      description: 'You tend to attribute many outcomes to luck or external forces. Research suggests you would be more susceptible to both conformity pressure and obedience to authority.',
      conformity: 'MODERATE-HIGH',
      obedience: 'MODERATE-HIGH'
    };
    return {
      label: 'Strongly External LOC',
      color: 'red',
      description: 'You tend to believe that outcomes are largely determined by external forces. According to research, you would be MORE likely to conform in Asch\'s study and MORE likely to obey in Milgram\'s study.',
      conformity: 'HIGH',
      obedience: 'HIGH'
    };
  };

  const getColorClasses = (color: string) => {
    const colorMap: Record<string, { bg: string; border: string; text: string; gradient: string }> = {
      green: { bg: 'bg-green-900/30', border: 'border-green-500', text: 'text-green-400', gradient: 'from-green-500' },
      blue: { bg: 'bg-blue-900/30', border: 'border-blue-500', text: 'text-blue-400', gradient: 'from-blue-500' },
      amber: { bg: 'bg-amber-900/30', border: 'border-amber-500', text: 'text-amber-400', gradient: 'from-amber-500' },
      red: { bg: 'bg-red-900/30', border: 'border-red-500', text: 'text-red-400', gradient: 'from-red-500' },
      orange: { bg: 'bg-orange-900/30', border: 'border-orange-500', text: 'text-orange-400', gradient: 'from-orange-500' },
    };
    return colorMap[color] || colorMap.orange;
  };

  if (phase === 'intro') {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-8">
        <div className={`text-center max-w-3xl ${isPresentation ? 'max-w-5xl' : ''}`}>
          <div className="flex items-center justify-center gap-4 mb-6">
            <Compass className={`text-orange-400 ${isPresentation ? 'w-20 h-20' : 'w-12 h-12'}`} />
            <h2 className={`font-bold text-white ${isPresentation ? 'text-6xl' : 'text-3xl'}`}>
              Locus of Control
            </h2>
          </div>
          
          <p className={`text-gray-300 mb-8 leading-relaxed ${isPresentation ? 'text-2xl' : 'text-lg'}`}>
            Discover where you fall on the locus of control spectrum. Answer 8 everyday scenarios 
            to find out whether you have an internal or external locus of control.
          </p>

          <div className={`bg-orange-900/30 border border-orange-500/50 rounded-xl p-6 mb-8 ${isPresentation ? 'p-10' : ''}`}>
            <div className="flex items-center gap-2 mb-3">
              <BarChart3 className="text-orange-400" size={isPresentation ? 28 : 20} />
              <span className={`text-orange-400 font-bold ${isPresentation ? 'text-xl' : 'text-base'}`}>
                How It Works
              </span>
            </div>
            <p className={`text-gray-300 ${isPresentation ? 'text-xl' : 'text-sm'}`}>
              For each scenario, choose the response that best matches how you would think or behave. 
              There are no right or wrong answers — this is about understanding your own thinking style.
            </p>
          </div>

          <button
            onClick={() => setPhase('quiz')}
            className={`bg-orange-600 hover:bg-orange-500 text-white font-bold rounded-xl transition-all ${
              isPresentation ? 'px-16 py-6 text-3xl' : 'px-10 py-4 text-xl'
            }`}
          >
            Begin Assessment
          </button>
        </div>
      </div>
    );
  }

  if (phase === 'quiz') {
    const scenario = scenarios[currentScenario];
    const progress = ((currentScenario) / scenarios.length) * 100;

    return (
      <div className="flex flex-col h-full">
        {/* Progress Bar */}
        <div className={`mb-6 ${isPresentation ? 'mb-10' : ''}`}>
          <div className="flex items-center justify-between mb-2">
            <span className={`text-gray-400 font-mono ${isPresentation ? 'text-lg' : 'text-sm'}`}>
              Scenario {currentScenario + 1} / {scenarios.length}
            </span>
            <span className={`text-orange-400 font-mono ${isPresentation ? 'text-lg' : 'text-sm'}`}>
              {Math.round(progress)}%
            </span>
          </div>
          <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-orange-500 to-amber-500 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Scenario */}
        <div className={`bg-gray-800/50 border border-gray-700 rounded-xl mb-8 ${isPresentation ? 'p-10 mb-12' : 'p-6'}`}>
          <h3 className={`text-white font-bold leading-relaxed ${isPresentation ? 'text-4xl' : 'text-2xl'}`}>
            {scenario.situation}
          </h3>
        </div>

        {/* Choices */}
        <div className={`flex-1 grid grid-cols-1 gap-6 ${isPresentation ? 'gap-8' : ''}`}>
          <button
            onClick={() => handleChoice('A')}
            className={`w-full text-left rounded-2xl border-2 border-blue-700 bg-blue-900/20 hover:border-blue-500 hover:bg-blue-900/40 transition-all ${
              isPresentation ? 'p-8' : 'p-6'
            }`}
          >
            <div className="flex items-start gap-4">
              <div className={`bg-blue-900/50 border border-blue-500 rounded-lg flex items-center justify-center flex-shrink-0 ${
                isPresentation ? 'w-14 h-14 text-2xl' : 'w-10 h-10 text-lg'
              }`}>
                <span className="text-blue-400 font-bold">A</span>
              </div>
              <p className={`text-gray-200 font-semibold ${isPresentation ? 'text-2xl' : 'text-base'}`}>
                {scenario.optionA}
              </p>
            </div>
          </button>

          <button
            onClick={() => handleChoice('B')}
            className={`w-full text-left rounded-2xl border-2 border-purple-700 bg-purple-900/20 hover:border-purple-500 hover:bg-purple-900/40 transition-all ${
              isPresentation ? 'p-8' : 'p-6'
            }`}
          >
            <div className="flex items-start gap-4">
              <div className={`bg-purple-900/50 border border-purple-500 rounded-lg flex items-center justify-center flex-shrink-0 ${
                isPresentation ? 'w-14 h-14 text-2xl' : 'w-10 h-10 text-lg'
              }`}>
                <span className="text-purple-400 font-bold">B</span>
              </div>
              <p className={`text-gray-200 font-semibold ${isPresentation ? 'text-2xl' : 'text-base'}`}>
                {scenario.optionB}
              </p>
            </div>
          </button>
        </div>
      </div>
    );
  }

  // Results phase
  const result = getResultCategory();
  const resultColors = getColorClasses(result.color);

  return (
    <div className="flex flex-col items-center justify-center h-full gap-6">
      <div className={`text-center max-w-3xl ${isPresentation ? 'max-w-5xl' : ''}`}>
        <h2 className={`font-bold text-white mb-6 ${isPresentation ? 'text-5xl' : 'text-3xl'}`}>
          Your Locus of Control
        </h2>

        {/* Result Badge */}
        <div className={`${resultColors.bg} border-2 ${resultColors.border} rounded-2xl mb-8 ${isPresentation ? 'p-10' : 'p-6'}`}>
          <div className={`font-black ${resultColors.text} ${isPresentation ? 'text-5xl mb-4' : 'text-3xl mb-2'}`}>
            {result.label}
          </div>
          <p className={`text-gray-300 leading-relaxed ${isPresentation ? 'text-xl' : 'text-base'}`}>
            {result.description}
          </p>
        </div>

        {/* Score Breakdown */}
        <div className={`grid grid-cols-3 gap-4 mb-8 ${isPresentation ? 'gap-8' : ''}`}>
          <div className={`bg-gray-800 border border-gray-700 rounded-xl ${isPresentation ? 'p-6' : 'p-4'}`}>
            <div className={`font-black text-orange-400 ${isPresentation ? 'text-5xl' : 'text-3xl'}`}>
              {internalCount}/{scenarios.length}
            </div>
            <p className={`text-gray-400 mt-1 ${isPresentation ? 'text-lg' : 'text-sm'}`}>
              Internal responses
            </p>
          </div>
          <div className={`bg-gray-800 border border-gray-700 rounded-xl ${isPresentation ? 'p-6' : 'p-4'}`}>
            <div className={`font-black ${resultColors.text} ${isPresentation ? 'text-5xl' : 'text-3xl'}`}>
              {result.conformity}
            </div>
            <p className={`text-gray-400 mt-1 ${isPresentation ? 'text-lg' : 'text-sm'}`}>
              Predicted conformity
            </p>
          </div>
          <div className={`bg-gray-800 border border-gray-700 rounded-xl ${isPresentation ? 'p-6' : 'p-4'}`}>
            <div className={`font-black ${resultColors.text} ${isPresentation ? 'text-5xl' : 'text-3xl'}`}>
              {result.obedience}
            </div>
            <p className={`text-gray-400 mt-1 ${isPresentation ? 'text-lg' : 'text-sm'}`}>
              Predicted obedience
            </p>
          </div>
        </div>

        {/* LOC Spectrum Bar */}
        <div className={`bg-gray-800 rounded-xl mb-8 ${isPresentation ? 'p-6' : 'p-4'}`}>
          <div className="flex justify-between mb-2">
            <span className={`text-red-400 font-bold ${isPresentation ? 'text-lg' : 'text-sm'}`}>External LOC</span>
            <span className={`text-green-400 font-bold ${isPresentation ? 'text-lg' : 'text-sm'}`}>Internal LOC</span>
          </div>
          <div className="h-4 bg-gradient-to-r from-red-500 via-amber-500 to-green-500 rounded-full relative">
            <div 
              className="absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full border-4 border-gray-900 shadow-lg transition-all duration-1000"
              style={{ left: `calc(${internalPercent}% - 12px)` }}
            />
          </div>
          <div className="flex justify-between mt-1">
            <span className={`text-gray-500 ${isPresentation ? 'text-sm' : 'text-xs'}`}>0%</span>
            <span className={`text-gray-500 ${isPresentation ? 'text-sm' : 'text-xs'}`}>50%</span>
            <span className={`text-gray-500 ${isPresentation ? 'text-sm' : 'text-xs'}`}>100%</span>
          </div>
        </div>

        <button
          onClick={resetSimulation}
          className={`bg-gray-700 hover:bg-gray-600 text-white font-bold rounded-xl transition-all ${
            isPresentation ? 'px-12 py-5 text-xl' : 'px-8 py-4 text-base'
          }`}
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default Lesson3Simulation;

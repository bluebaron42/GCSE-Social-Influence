import React, { useState } from 'react';
import { Users, MessageCircle, RefreshCw, ThumbsUp, ThumbsDown, BarChart3 } from 'lucide-react';

interface Lesson4SimulationProps {
  isPresentation: boolean;
}

type Phase = 'intro' | 'trial' | 'results';

interface Trial {
  round: number;
  statement: string;
  minorityPosition: string;
  majorityDefault: string;
}

const trials: Trial[] = [
  {
    round: 1,
    statement: 'School should start at 10am instead of 9am.',
    minorityPosition: 'Agree — later starts improve focus and mental health.',
    majorityDefault: 'Disagree — 9am is fine, everyone is used to it.'
  },
  {
    round: 2,
    statement: 'Homework should be optional, not compulsory.',
    minorityPosition: 'Agree — students learn better through self-directed study.',
    majorityDefault: 'Disagree — homework reinforces learning.'
  },
  {
    round: 3,
    statement: 'All school meals should be vegetarian to help the environment.',
    minorityPosition: 'Agree — reducing meat consumption is essential for sustainability.',
    majorityDefault: 'Disagree — students should have freedom of choice.'
  },
  {
    round: 4,
    statement: 'Mobile phones should be allowed in class for learning.',
    minorityPosition: 'Agree — smartphones are powerful learning tools.',
    majorityDefault: 'Disagree — phones are too distracting.'
  },
  {
    round: 5,
    statement: 'Exams should be replaced with project-based assessment.',
    minorityPosition: 'Agree — projects test real understanding, not just memory.',
    majorityDefault: 'Disagree — exams are fair and standardised.'
  },
  {
    round: 6,
    statement: 'PE should be optional after Year 9.',
    minorityPosition: 'Agree — forced PE discourages exercise long-term.',
    majorityDefault: 'Disagree — PE is important for health.'
  }
];

const Lesson4Simulation: React.FC<Lesson4SimulationProps> = ({ isPresentation }) => {
  const [phase, setPhase] = useState<Phase>('intro');
  const [currentTrial, setCurrentTrial] = useState(0);
  const [responses, setResponses] = useState<('agree' | 'disagree')[]>([]);
  const [showMinorityArg, setShowMinorityArg] = useState(false);

  const handleResponse = (response: 'agree' | 'disagree') => {
    setResponses(prev => [...prev, response]);
    if (currentTrial < trials.length - 1) {
      setCurrentTrial(prev => prev + 1);
      setShowMinorityArg(false);
    } else {
      setPhase('results');
    }
  };

  const agreedCount = responses.filter(r => r === 'agree').length;
  const conversionRate = Math.round((agreedCount / trials.length) * 100);

  const resetSimulation = () => {
    setPhase('intro');
    setCurrentTrial(0);
    setResponses([]);
    setShowMinorityArg(false);
  };

  if (phase === 'intro') {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-8">
        <div className={`text-center max-w-3xl ${isPresentation ? 'max-w-5xl' : ''}`}>
          <div className="flex items-center justify-center gap-4 mb-6">
            <Users className={`text-red-400 ${isPresentation ? 'w-20 h-20' : 'w-12 h-12'}`} />
            <h2 className={`font-bold text-white ${isPresentation ? 'text-6xl' : 'text-3xl'}`}>
              Minority Influence Lab
            </h2>
          </div>
          
          <p className={`text-gray-300 mb-8 leading-relaxed ${isPresentation ? 'text-2xl' : 'text-lg'}`}>
            You represent the <span className="text-blue-400 font-bold">majority</span>. A small group of passionate students 
            (the <span className="text-red-400 font-bold">minority</span>) will consistently argue their position on school policy issues. 
            Will they change your mind?
          </p>

          <div className={`bg-red-900/30 border border-red-500/50 rounded-xl p-6 mb-8 ${isPresentation ? 'p-10 text-xl' : 'text-sm'}`}>
            <div className="flex items-center gap-2 mb-3">
              <MessageCircle className="text-red-400" size={isPresentation ? 28 : 20} />
              <span className="text-red-400 font-bold">How It Works</span>
            </div>
            <p className="text-gray-300">
              For each topic, you'll see the minority's consistent position. Decide whether their argument changes your mind — 
              be honest! At the end, we'll analyse whether minority influence worked on you.
            </p>
          </div>

          <button
            onClick={() => setPhase('trial')}
            className={`bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl transition-all ${
              isPresentation ? 'px-16 py-6 text-3xl' : 'px-10 py-4 text-xl'
            }`}
          >
            Start Experiment
          </button>
        </div>
      </div>
    );
  }

  if (phase === 'trial') {
    const trial = trials[currentTrial];
    return (
      <div className="flex flex-col h-full">
        {/* Progress */}
        <div className={`flex items-center gap-2 mb-6 ${isPresentation ? 'mb-8' : ''}`}>
          {trials.map((_, idx) => (
            <div key={idx} className={`h-2 flex-1 rounded-full transition-all ${idx < currentTrial ? 'bg-red-500' : idx === currentTrial ? 'bg-red-400 animate-pulse' : 'bg-gray-700'}`} />
          ))}
        </div>

        {/* Topic Card */}
        <div className={`bg-gray-800 border border-gray-700 rounded-xl mb-6 ${isPresentation ? 'p-8' : 'p-6'}`}>
          <span className={`text-red-400 font-mono uppercase tracking-widest ${isPresentation ? 'text-sm' : 'text-xs'}`}>
            Round {trial.round} of {trials.length}
          </span>
          <h3 className={`text-white font-bold mt-2 ${isPresentation ? 'text-3xl' : 'text-xl'}`}>
            "{trial.statement}"
          </h3>
        </div>

        {/* Majority Default Position */}
        <div className={`bg-blue-900/20 border border-blue-500/30 rounded-xl mb-4 ${isPresentation ? 'p-6' : 'p-4'}`}>
          <div className="flex items-center gap-2 mb-2">
            <Users size={isPresentation ? 22 : 16} className="text-blue-400" />
            <span className={`text-blue-400 font-bold ${isPresentation ? 'text-lg' : 'text-sm'}`}>Majority View</span>
          </div>
          <p className={`text-gray-300 ${isPresentation ? 'text-lg' : 'text-sm'}`}>{trial.majorityDefault}</p>
        </div>

        {/* Minority Argument - click to see */}
        <div
          onClick={() => setShowMinorityArg(true)}
          className={`border border-red-500/30 rounded-xl mb-6 transition-all cursor-pointer ${
            showMinorityArg ? 'bg-red-900/20 border-red-500' : 'bg-gray-900/50 hover:bg-gray-800'
          } ${isPresentation ? 'p-6' : 'p-4'}`}
        >
          <div className="flex items-center gap-2 mb-2">
            <RefreshCw size={isPresentation ? 22 : 16} className="text-red-400" />
            <span className={`text-red-400 font-bold ${isPresentation ? 'text-lg' : 'text-sm'}`}>Minority Argument (Consistent)</span>
          </div>
          {showMinorityArg ? (
            <p className={`text-gray-300 animate-fadeIn ${isPresentation ? 'text-lg' : 'text-sm'}`}>{trial.minorityPosition}</p>
          ) : (
            <p className={`text-gray-600 italic ${isPresentation ? 'text-lg' : 'text-sm'}`}>Click to hear the minority's argument...</p>
          )}
        </div>

        <div className="flex-1" />

        {/* Decision Buttons */}
        <div className={`grid grid-cols-2 gap-4 ${isPresentation ? 'gap-6' : ''}`}>
          <button
            onClick={() => handleResponse('agree')}
            className={`flex items-center justify-center gap-3 bg-green-900/30 hover:bg-green-900/50 border-2 border-green-500/50 hover:border-green-500 text-green-400 font-bold rounded-xl transition-all ${
              isPresentation ? 'py-6 text-2xl' : 'py-4 text-lg'
            }`}
          >
            <ThumbsUp size={isPresentation ? 28 : 20} />
            Minority Changed My Mind
          </button>
          <button
            onClick={() => handleResponse('disagree')}
            className={`flex items-center justify-center gap-3 bg-gray-800/50 hover:bg-gray-800 border-2 border-gray-600 hover:border-gray-500 text-gray-300 font-bold rounded-xl transition-all ${
              isPresentation ? 'py-6 text-2xl' : 'py-4 text-lg'
            }`}
          >
            <ThumbsDown size={isPresentation ? 28 : 20} />
            I Keep My Original View
          </button>
        </div>
      </div>
    );
  }

  // Results phase
  return (
    <div className="flex flex-col items-center justify-center h-full gap-6">
      <div className={`text-center max-w-3xl ${isPresentation ? 'max-w-5xl' : ''}`}>
        <div className="flex items-center justify-center gap-3 mb-6">
          <BarChart3 className={`text-red-400 ${isPresentation ? 'w-16 h-16' : 'w-10 h-10'}`} />
          <h2 className={`font-bold text-white ${isPresentation ? 'text-5xl' : 'text-3xl'}`}>Your Results</h2>
        </div>

        {/* Conversion meter */}
        <div className={`bg-gray-800 border border-gray-700 rounded-2xl mb-8 ${isPresentation ? 'p-10' : 'p-6'}`}>
          <div className={`font-black mb-2 ${conversionRate >= 50 ? 'text-red-400' : conversionRate > 0 ? 'text-amber-400' : 'text-gray-400'} ${isPresentation ? 'text-7xl' : 'text-5xl'}`}>
            {conversionRate}%
          </div>
          <p className={`text-gray-400 mb-4 ${isPresentation ? 'text-xl' : 'text-base'}`}>Conversion Rate</p>

          <div className="h-4 bg-gray-700 rounded-full overflow-hidden mb-6">
            <div className="h-full bg-gradient-to-r from-red-600 to-red-400 transition-all duration-1000 rounded-full" style={{ width: `${conversionRate}%` }} />
          </div>

          {/* Breakdown */}
          <div className={`grid grid-cols-${trials.length} gap-2`}>
            {responses.map((r, idx) => (
              <div key={idx} className={`rounded-lg p-2 text-center ${r === 'agree' ? 'bg-green-900/30 border border-green-500/50' : 'bg-gray-700/50 border border-gray-600'}`}>
                <span className={`block ${isPresentation ? 'text-lg' : 'text-xs'} ${r === 'agree' ? 'text-green-400' : 'text-gray-500'}`}>
                  R{idx + 1}
                </span>
                <span className={`${isPresentation ? 'text-sm' : 'text-[10px]'} ${r === 'agree' ? 'text-green-400' : 'text-gray-500'}`}>
                  {r === 'agree' ? '✓' : '✗'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Interpretation */}
        <div className={`bg-red-900/20 border border-red-500/30 rounded-xl mb-6 text-left ${isPresentation ? 'p-8' : 'p-6'}`}>
          <h3 className={`text-red-400 font-bold mb-3 ${isPresentation ? 'text-2xl' : 'text-lg'}`}>What Does This Mean?</h3>
          <div className={`text-gray-300 space-y-2 ${isPresentation ? 'text-lg' : 'text-sm'}`}>
            {conversionRate >= 50 ? (
              <>
                <p>You were significantly influenced by the minority — similar to the <strong className="text-red-400">32% of participants</strong> in Moscovici's consistent condition.</p>
                <p>The minority's <strong className="text-red-400">consistent, committed position</strong> caused you to re-evaluate your views through conversion.</p>
              </>
            ) : conversionRate > 0 ? (
              <>
                <p>You were partially influenced — you changed your mind on some issues. In Moscovici's study, <strong className="text-red-400">8.42%</strong> of trials showed minority influence.</p>
                <p>This shows that minority influence works through <strong className="text-red-400">genuine conversion</strong> — a slow, private process of re-thinking your position.</p>
              </>
            ) : (
              <>
                <p>You resisted the minority completely. In real life, some people never shift their views.</p>
                <p>However, Moscovici found that even the <strong className="text-red-400">consistent</strong> minority influenced 32% of participants — showing that minorities <em>can</em> create change.</p>
              </>
            )}
          </div>
        </div>

        <button
          onClick={resetSimulation}
          className={`bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl transition-all ${isPresentation ? 'px-10 py-4 text-xl' : 'px-8 py-3'}`}
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default Lesson4Simulation;

import React, { useState } from 'react';
import { Users, EyeOff, Eye, Shield, BarChart3, AlertTriangle } from 'lucide-react';

interface Lesson5SimulationProps {
  isPresentation: boolean;
}

type Phase = 'intro' | 'scenario' | 'results';

interface Scenario {
  id: number;
  situation: string;
  anonymous: boolean;
  groupSize: 'small' | 'large';
  arousal: 'low' | 'high';
  optionA: string;
  optionB: string;
  optionALabel: string;
  optionBLabel: string;
}

const scenarios: Scenario[] = [
  {
    id: 1,
    situation: 'You\'re at a large music festival at night. Everyone is wearing costumes and face paint. The crowd starts pushing towards the front, knocking people over.',
    anonymous: true,
    groupSize: 'large',
    arousal: 'high',
    optionA: 'Join the push — no one will know it was me',
    optionB: 'Step back and help someone who fell',
    optionALabel: 'Deindividuated',
    optionBLabel: 'Individuated'
  },
  {
    id: 2,
    situation: 'You\'re in a small study group of 4 friends. Someone suggests copying answers from the internet for homework.',
    anonymous: false,
    groupSize: 'small',
    arousal: 'low',
    optionA: 'Go along with cheating — the group expects it',
    optionB: 'Suggest doing it honestly instead',
    optionALabel: 'Conformity (NSI)',
    optionBLabel: 'Resistance'
  },
  {
    id: 3,
    situation: 'During an anonymous online gaming session, your team starts bullying a new player. Your username is random and untraceable.',
    anonymous: true,
    groupSize: 'large',
    arousal: 'high',
    optionA: 'Join in — it\'s just online, no one knows who I am',
    optionB: 'Defend the new player or stay silent',
    optionALabel: 'Deindividuated',
    optionBLabel: 'Individuated'
  },
  {
    id: 4,
    situation: 'At a peaceful protest, some people start throwing things at police. You\'re wearing a hoodie and mask.',
    anonymous: true,
    groupSize: 'large',
    arousal: 'high',
    optionA: 'Get caught up in the moment',
    optionB: 'Move away from the violence',
    optionALabel: 'Deindividuated',
    optionBLabel: 'Self-aware'
  },
  {
    id: 5,
    situation: 'In a classroom with your teacher watching, someone dares you to throw a paper ball at another student.',
    anonymous: false,
    groupSize: 'small',
    arousal: 'low',
    optionA: 'Do it — it\'s just a laugh',
    optionB: 'Refuse — the teacher is watching',
    optionALabel: 'Risk-taking',
    optionBLabel: 'Self-monitoring'
  },
  {
    id: 6,
    situation: 'You\'re part of a huge crowd celebrating New Year\'s Eve. Someone hands you a spray can to tag a wall with "Happy New Year".',
    anonymous: true,
    groupSize: 'large',
    arousal: 'high',
    optionA: 'Spray it — everyone else is celebrating wildly too',
    optionB: 'Decline — vandalism is wrong regardless',
    optionALabel: 'Deindividuated',
    optionBLabel: 'Moral reasoning'
  }
];

const Lesson5Simulation: React.FC<Lesson5SimulationProps> = ({ isPresentation }) => {
  const [phase, setPhase] = useState<Phase>('intro');
  const [currentScenario, setCurrentScenario] = useState(0);
  const [choices, setChoices] = useState<('a' | 'b')[]>([]);

  const handleChoice = (choice: 'a' | 'b') => {
    setChoices(prev => [...prev, choice]);
    if (currentScenario < scenarios.length - 1) {
      setCurrentScenario(prev => prev + 1);
    } else {
      setPhase('results');
    }
  };

  const deindividuatedCount = choices.filter(c => c === 'a').length;
  const individuatedCount = choices.filter(c => c === 'b').length;
  const deindividuationScore = Math.round((deindividuatedCount / scenarios.length) * 100);

  const resetSimulation = () => {
    setPhase('intro');
    setCurrentScenario(0);
    setChoices([]);
  };

  if (phase === 'intro') {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-8">
        <div className={`text-center max-w-3xl ${isPresentation ? 'max-w-5xl' : ''}`}>
          <div className="flex items-center justify-center gap-4 mb-6">
            <EyeOff className={`text-yellow-400 ${isPresentation ? 'w-20 h-20' : 'w-12 h-12'}`} />
            <h2 className={`font-bold text-white ${isPresentation ? 'text-6xl' : 'text-3xl'}`}>
              Deindividuation Lab
            </h2>
          </div>
          
          <p className={`text-gray-300 mb-8 leading-relaxed ${isPresentation ? 'text-2xl' : 'text-lg'}`}>
            You'll face 6 real-world scenarios. Some involve high anonymity and large crowds (conditions for deindividuation), 
            while others involve low anonymity. How will <em>you</em> respond?
          </p>

          <div className={`bg-yellow-900/30 border border-yellow-500/50 rounded-xl p-6 mb-8 ${isPresentation ? 'p-10 text-xl' : 'text-sm'}`}>
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="text-yellow-400" size={isPresentation ? 28 : 20} />
              <span className="text-yellow-400 font-bold">How to Use This</span>
            </div>
            <p className="text-gray-300">
              Be honest — there are no right or wrong answers! This is about understanding how situational factors 
              (anonymity, group size, arousal) affect decision-making.
            </p>
          </div>

          <button
            onClick={() => setPhase('scenario')}
            className={`bg-yellow-600 hover:bg-yellow-500 text-white font-bold rounded-xl transition-all ${
              isPresentation ? 'px-16 py-6 text-3xl' : 'px-10 py-4 text-xl'
            }`}
          >
            Begin Scenarios
          </button>
        </div>
      </div>
    );
  }

  if (phase === 'scenario') {
    const s = scenarios[currentScenario];
    return (
      <div className="flex flex-col h-full">
        {/* Progress */}
        <div className={`flex items-center gap-2 mb-6 ${isPresentation ? 'mb-8' : ''}`}>
          {scenarios.map((_, idx) => (
            <div key={idx} className={`h-2 flex-1 rounded-full transition-all ${idx < currentScenario ? 'bg-yellow-500' : idx === currentScenario ? 'bg-yellow-400 animate-pulse' : 'bg-gray-700'}`} />
          ))}
        </div>

        {/* Scenario Info Tags */}
        <div className={`flex gap-3 mb-4 ${isPresentation ? 'gap-4' : ''}`}>
          <span className={`flex items-center gap-1 rounded-full border px-3 py-1 ${s.anonymous ? 'bg-red-900/30 border-red-500/50 text-red-400' : 'bg-green-900/30 border-green-500/50 text-green-400'} ${isPresentation ? 'text-base' : 'text-xs'}`}>
            {s.anonymous ? <EyeOff size={14} /> : <Eye size={14} />}
            {s.anonymous ? 'Anonymous' : 'Identifiable'}
          </span>
          <span className={`flex items-center gap-1 rounded-full border px-3 py-1 ${s.groupSize === 'large' ? 'bg-amber-900/30 border-amber-500/50 text-amber-400' : 'bg-blue-900/30 border-blue-500/50 text-blue-400'} ${isPresentation ? 'text-base' : 'text-xs'}`}>
            <Users size={14} />
            {s.groupSize === 'large' ? 'Large Group' : 'Small Group'}
          </span>
          <span className={`flex items-center gap-1 rounded-full border px-3 py-1 ${s.arousal === 'high' ? 'bg-red-900/30 border-red-500/50 text-red-400' : 'bg-green-900/30 border-green-500/50 text-green-400'} ${isPresentation ? 'text-base' : 'text-xs'}`}>
            {s.arousal === 'high' ? '⚡' : '😌'}
            {s.arousal === 'high' ? 'High Arousal' : 'Low Arousal'}
          </span>
        </div>

        {/* Scenario Card */}
        <div className={`bg-gray-800 border border-gray-700 rounded-xl mb-8 ${isPresentation ? 'p-8' : 'p-6'}`}>
          <span className={`text-yellow-400 font-mono uppercase tracking-widest ${isPresentation ? 'text-sm' : 'text-xs'}`}>
            Scenario {s.id} of {scenarios.length}
          </span>
          <p className={`text-white mt-3 leading-relaxed ${isPresentation ? 'text-2xl' : 'text-lg'}`}>
            {s.situation}
          </p>
        </div>

        <div className="flex-1" />

        {/* Choice Buttons */}
        <div className={`grid grid-cols-2 gap-4 ${isPresentation ? 'gap-6' : ''}`}>
          <button
            onClick={() => handleChoice('a')}
            className={`bg-red-900/20 hover:bg-red-900/40 border-2 border-red-500/50 hover:border-red-500 text-white rounded-xl transition-all text-left ${isPresentation ? 'p-6' : 'p-4'}`}
          >
            <span className={`block font-mono text-red-400 mb-2 ${isPresentation ? 'text-sm' : 'text-xs'}`}>{s.optionALabel}</span>
            <span className={`${isPresentation ? 'text-xl' : 'text-sm'}`}>{s.optionA}</span>
          </button>
          <button
            onClick={() => handleChoice('b')}
            className={`bg-green-900/20 hover:bg-green-900/40 border-2 border-green-500/50 hover:border-green-500 text-white rounded-xl transition-all text-left ${isPresentation ? 'p-6' : 'p-4'}`}
          >
            <span className={`block font-mono text-green-400 mb-2 ${isPresentation ? 'text-sm' : 'text-xs'}`}>{s.optionBLabel}</span>
            <span className={`${isPresentation ? 'text-xl' : 'text-sm'}`}>{s.optionB}</span>
          </button>
        </div>
      </div>
    );
  }

  // Results
  return (
    <div className="flex flex-col items-center justify-center h-full gap-6">
      <div className={`text-center max-w-3xl ${isPresentation ? 'max-w-5xl' : ''}`}>
        <div className="flex items-center justify-center gap-3 mb-6">
          <BarChart3 className={`text-yellow-400 ${isPresentation ? 'w-16 h-16' : 'w-10 h-10'}`} />
          <h2 className={`font-bold text-white ${isPresentation ? 'text-5xl' : 'text-3xl'}`}>Your Profile</h2>
        </div>

        <div className={`bg-gray-800 border border-gray-700 rounded-2xl mb-8 ${isPresentation ? 'p-10' : 'p-6'}`}>
          {/* Spectrum */}
          <div className="flex justify-between mb-2">
            <span className={`text-green-400 font-bold ${isPresentation ? 'text-lg' : 'text-sm'}`}>Individuated</span>
            <span className={`text-red-400 font-bold ${isPresentation ? 'text-lg' : 'text-sm'}`}>Deindividuated</span>
          </div>
          <div className="h-6 bg-gradient-to-r from-green-900 via-gray-700 to-red-900 rounded-full relative mb-6">
            <div
              className="absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full border-2 border-yellow-400 shadow-lg transition-all duration-1000"
              style={{ left: `calc(${deindividuationScore}% - 12px)` }}
            />
          </div>

          <div className={`grid grid-cols-2 gap-4 mb-6`}>
            <div className="bg-green-900/20 border border-green-500/30 rounded-xl p-4 text-center">
              <div className={`font-black text-green-400 ${isPresentation ? 'text-4xl' : 'text-2xl'}`}>{individuatedCount}</div>
              <p className={`text-gray-400 ${isPresentation ? 'text-base' : 'text-xs'}`}>Self-aware choices</p>
            </div>
            <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-4 text-center">
              <div className={`font-black text-red-400 ${isPresentation ? 'text-4xl' : 'text-2xl'}`}>{deindividuatedCount}</div>
              <p className={`text-gray-400 ${isPresentation ? 'text-base' : 'text-xs'}`}>Deindividuated choices</p>
            </div>
          </div>

          {/* Breakdown */}
          <div className={`grid grid-cols-6 gap-2`}>
            {scenarios.map((s, idx) => (
              <div key={idx} className={`rounded-lg p-2 text-center border ${choices[idx] === 'a' ? 'bg-red-900/30 border-red-500/50' : 'bg-green-900/30 border-green-500/50'}`}>
                <span className={`block font-mono ${isPresentation ? 'text-base' : 'text-xs'} ${choices[idx] === 'a' ? 'text-red-400' : 'text-green-400'}`}>
                  S{idx + 1}
                </span>
                <span className={`${isPresentation ? 'text-sm' : 'text-[10px]'} text-gray-500`}>
                  {s.anonymous ? '🕶️' : '👤'} {s.groupSize === 'large' ? '👥' : '👤'}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className={`bg-yellow-900/20 border border-yellow-500/30 rounded-xl text-left mb-6 ${isPresentation ? 'p-8' : 'p-6'}`}>
          <h3 className={`text-yellow-400 font-bold mb-3 ${isPresentation ? 'text-2xl' : 'text-lg'}`}>
            <Shield className="inline mr-2" size={20} />
            Psychology Insight
          </h3>
          <div className={`text-gray-300 space-y-2 ${isPresentation ? 'text-lg' : 'text-sm'}`}>
            <p>Notice how <strong className="text-yellow-400">anonymity + large groups + high arousal</strong> = conditions for deindividuation.</p>
            <p>Zimbardo (1969) found deindividuated participants shocked for <strong className="text-yellow-400">twice as long</strong>. But Reicher (1984) showed crowds aren't always mindless — they can be selective and purposeful.</p>
          </div>
        </div>

        <button onClick={resetSimulation} className={`bg-yellow-600 hover:bg-yellow-500 text-white font-bold rounded-xl transition-all ${isPresentation ? 'px-10 py-4 text-xl' : 'px-8 py-3'}`}>
          Try Again
        </button>
      </div>
    </div>
  );
};

export default Lesson5Simulation;

import React, { useState } from 'react';
import { Users, Zap, BarChart3, AlertTriangle, Settings } from 'lucide-react';

interface Lesson6SimulationProps {
  isPresentation: boolean;
}

type Phase = 'intro' | 'config' | 'trial' | 'results';

interface TrialResult {
  round: number;
  groupSize: number;
  anonymous: boolean;
  yourEffort: number;
  groupAvgEffort: number;
}

const Lesson6Simulation: React.FC<Lesson6SimulationProps> = ({ isPresentation }) => {
  const [phase, setPhase] = useState<Phase>('intro');
  const [currentRound, setCurrentRound] = useState(0);
  const [results, setResults] = useState<TrialResult[]>([]);
  const [effortLevel, setEffortLevel] = useState(50);

  const rounds = [
    { groupSize: 2, anonymous: false, scenario: 'You and 1 partner are solving puzzles together. Your partner can see exactly how much effort you put in.', label: 'Pair Work (Identifiable)' },
    { groupSize: 5, anonymous: false, scenario: 'You\'re in a group of 5 working on a project. Your teacher monitors individual contributions.', label: 'Small Group (Monitored)' },
    { groupSize: 5, anonymous: true, scenario: 'You\'re in a group of 5 working on a project. Contributions are pooled anonymously — no one knows who did what.', label: 'Small Group (Anonymous)' },
    { groupSize: 15, anonymous: true, scenario: 'You\'re part of a team of 15 preparing a class display. Contributions are anonymous and pooled together.', label: 'Large Group (Anonymous)' },
    { groupSize: 30, anonymous: true, scenario: 'Your entire class of 30 is working on a charity project. Individual effort is impossible to track.', label: 'Whole Class (Anonymous)' },
  ];

  const handleSubmitEffort = () => {
    const round = rounds[currentRound];
    // Simulate group average — decreases with group size and anonymity
    const baseEffort = round.anonymous ? 55 : 72;
    const sizeReduction = Math.min(round.groupSize * 1.5, 25);
    const groupAvg = Math.max(baseEffort - sizeReduction + Math.random() * 10, 20);

    setResults(prev => [...prev, {
      round: currentRound + 1,
      groupSize: round.groupSize,
      anonymous: round.anonymous,
      yourEffort: effortLevel,
      groupAvgEffort: Math.round(groupAvg)
    }]);

    if (currentRound < rounds.length - 1) {
      setCurrentRound(prev => prev + 1);
      setEffortLevel(50);
    } else {
      setPhase('results');
    }
  };

  const resetSimulation = () => {
    setPhase('intro');
    setCurrentRound(0);
    setResults([]);
    setEffortLevel(50);
  };

  if (phase === 'intro') {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-8">
        <div className={`text-center max-w-3xl ${isPresentation ? 'max-w-5xl' : ''}`}>
          <div className="flex items-center justify-center gap-4 mb-6">
            <Users className={`text-teal-400 ${isPresentation ? 'w-20 h-20' : 'w-12 h-12'}`} />
            <h2 className={`font-bold text-white ${isPresentation ? 'text-6xl' : 'text-3xl'}`}>
              Social Loafing Lab
            </h2>
          </div>
          
          <p className={`text-gray-300 mb-8 leading-relaxed ${isPresentation ? 'text-2xl' : 'text-lg'}`}>
            How much effort would you really put in across different group situations? 
            Be honest — this explores how <span className="text-teal-400 font-bold">group size</span> and 
            <span className="text-teal-400 font-bold"> anonymity</span> affect individual effort.
          </p>

          <div className={`bg-teal-900/30 border border-teal-500/50 rounded-xl p-6 mb-8 ${isPresentation ? 'p-10 text-xl' : 'text-sm'}`}>
            <div className="flex items-center gap-2 mb-3">
              <Settings className="text-teal-400" size={isPresentation ? 28 : 20} />
              <span className="text-teal-400 font-bold">How It Works</span>
            </div>
            <p className="text-gray-300">
              In each round, you'll see a group scenario. Use the slider to honestly rate how much effort (0-100%) 
              you'd put in. We'll compare your effort across different conditions to test whether social loafing occurs.
            </p>
          </div>

          <button
            onClick={() => setPhase('trial')}
            className={`bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-xl transition-all ${
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
    const round = rounds[currentRound];
    return (
      <div className="flex flex-col h-full">
        {/* Progress */}
        <div className={`flex items-center gap-2 mb-6 ${isPresentation ? 'mb-8' : ''}`}>
          {rounds.map((_, idx) => (
            <div key={idx} className={`h-2 flex-1 rounded-full transition-all ${idx < currentRound ? 'bg-teal-500' : idx === currentRound ? 'bg-teal-400 animate-pulse' : 'bg-gray-700'}`} />
          ))}
        </div>

        {/* Round Info */}
        <div className={`flex gap-3 mb-4`}>
          <span className={`flex items-center gap-1 rounded-full border px-3 py-1 bg-teal-900/30 border-teal-500/50 text-teal-400 ${isPresentation ? 'text-base' : 'text-xs'}`}>
            <Users size={14} />
            Group of {round.groupSize}
          </span>
          <span className={`flex items-center gap-1 rounded-full border px-3 py-1 ${round.anonymous ? 'bg-red-900/30 border-red-500/50 text-red-400' : 'bg-green-900/30 border-green-500/50 text-green-400'} ${isPresentation ? 'text-base' : 'text-xs'}`}>
            {round.anonymous ? '🕶️ Anonymous' : '👤 Identifiable'}
          </span>
        </div>

        {/* Scenario Card */}
        <div className={`bg-gray-800 border border-gray-700 rounded-xl mb-6 ${isPresentation ? 'p-8' : 'p-6'}`}>
          <span className={`text-teal-400 font-mono uppercase tracking-widest ${isPresentation ? 'text-sm' : 'text-xs'}`}>
            {round.label} — Round {currentRound + 1} of {rounds.length}
          </span>
          <p className={`text-white mt-3 leading-relaxed ${isPresentation ? 'text-2xl' : 'text-lg'}`}>
            {round.scenario}
          </p>
        </div>

        {/* Effort Slider */}
        <div className={`bg-gray-800/50 border border-gray-700 rounded-xl mb-6 ${isPresentation ? 'p-8' : 'p-6'}`}>
          <h3 className={`text-white font-bold mb-4 ${isPresentation ? 'text-2xl' : 'text-lg'}`}>
            How much effort would you put in?
          </h3>
          <div className="flex items-center gap-4">
            <span className={`text-gray-500 font-mono ${isPresentation ? 'text-lg' : 'text-sm'}`}>0%</span>
            <input
              type="range"
              min="0"
              max="100"
              value={effortLevel}
              onChange={(e) => setEffortLevel(Number(e.target.value))}
              className="flex-1 h-3 bg-gray-700 rounded-full appearance-none cursor-pointer accent-teal-500"
            />
            <span className={`text-gray-500 font-mono ${isPresentation ? 'text-lg' : 'text-sm'}`}>100%</span>
          </div>
          <div className="text-center mt-4">
            <span className={`font-black ${effortLevel >= 70 ? 'text-green-400' : effortLevel >= 40 ? 'text-amber-400' : 'text-red-400'} ${isPresentation ? 'text-6xl' : 'text-4xl'}`}>
              {effortLevel}%
            </span>
          </div>
        </div>

        <div className="flex-1" />

        <button
          onClick={handleSubmitEffort}
          className={`w-full bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-xl transition-all ${
            isPresentation ? 'py-6 text-2xl' : 'py-4 text-lg'
          }`}
        >
          Submit & Continue
        </button>
      </div>
    );
  }

  // Results
  const avgEffort = Math.round(results.reduce((sum, r) => sum + r.yourEffort, 0) / results.length);
  const effortDeclined = results[results.length - 1].yourEffort < results[0].yourEffort;

  return (
    <div className="flex flex-col items-center justify-center h-full gap-6">
      <div className={`text-center max-w-4xl w-full ${isPresentation ? 'max-w-5xl' : ''}`}>
        <div className="flex items-center justify-center gap-3 mb-6">
          <BarChart3 className={`text-teal-400 ${isPresentation ? 'w-16 h-16' : 'w-10 h-10'}`} />
          <h2 className={`font-bold text-white ${isPresentation ? 'text-5xl' : 'text-3xl'}`}>Your Social Loafing Profile</h2>
        </div>

        {/* Results Chart */}
        <div className={`bg-gray-800 border border-gray-700 rounded-2xl mb-6 ${isPresentation ? 'p-8' : 'p-6'}`}>
          <div className={`grid grid-cols-5 gap-3 mb-6`}>
            {results.map((r, idx) => (
              <div key={idx} className="text-center">
                <div className="bg-gray-700 rounded-lg overflow-hidden h-32 relative mb-2">
                  <div
                    className="absolute bottom-0 w-full bg-gradient-to-t from-teal-600 to-teal-400 transition-all duration-1000 rounded-t"
                    style={{ height: `${r.yourEffort}%` }}
                  />
                  <span className={`absolute top-2 left-1/2 -translate-x-1/2 font-bold text-white ${isPresentation ? 'text-lg' : 'text-xs'}`}>
                    {r.yourEffort}%
                  </span>
                </div>
                <span className={`text-gray-500 block ${isPresentation ? 'text-sm' : 'text-[10px]'}`}>
                  {r.anonymous ? '🕶️' : '👤'} Size: {r.groupSize}
                </span>
              </div>
            ))}
          </div>

          <div className={`grid grid-cols-2 gap-4`}>
            <div className="bg-teal-900/20 border border-teal-500/30 rounded-xl p-4 text-center">
              <div className={`font-black text-teal-400 ${isPresentation ? 'text-4xl' : 'text-2xl'}`}>{avgEffort}%</div>
              <p className={`text-gray-400 ${isPresentation ? 'text-base' : 'text-xs'}`}>Your average effort</p>
            </div>
            <div className={`border rounded-xl p-4 text-center ${effortDeclined ? 'bg-red-900/20 border-red-500/30' : 'bg-green-900/20 border-green-500/30'}`}>
              <div className={`font-black ${effortDeclined ? 'text-red-400' : 'text-green-400'} ${isPresentation ? 'text-4xl' : 'text-2xl'}`}>
                {effortDeclined ? '↓' : '→'} {effortDeclined ? 'Declined' : 'Stable'}
              </div>
              <p className={`text-gray-400 ${isPresentation ? 'text-base' : 'text-xs'}`}>Effort trend as groups grew</p>
            </div>
          </div>
        </div>

        {/* Interpretation */}
        <div className={`bg-teal-900/20 border border-teal-500/30 rounded-xl text-left mb-6 ${isPresentation ? 'p-8' : 'p-6'}`}>
          <h3 className={`text-teal-400 font-bold mb-3 ${isPresentation ? 'text-2xl' : 'text-lg'}`}>
            <Zap className="inline mr-2" size={20} />
            What Does This Mean?
          </h3>
          <div className={`text-gray-300 space-y-2 ${isPresentation ? 'text-lg' : 'text-sm'}`}>
            {effortDeclined ? (
              <>
                <p>Your effort <strong className="text-red-400">decreased</strong> as group size increased — classic social loafing!</p>
                <p>Ringelmann (1913) found the same: individual effort drops as group size grows. <strong className="text-teal-400">Diffusion of responsibility</strong> means you feel less accountable in bigger, more anonymous groups.</p>
              </>
            ) : (
              <>
                <p>Your effort stayed <strong className="text-green-400">relatively stable</strong> — you resisted social loafing.</p>
                <p>This suggests you have strong <strong className="text-teal-400">moral identity</strong> or <strong className="text-teal-400">internal LOC</strong>, which helps resist the situational pressure to reduce effort in groups.</p>
              </>
            )}
          </div>
        </div>

        <button onClick={resetSimulation} className={`bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-xl transition-all ${isPresentation ? 'px-10 py-4 text-xl' : 'px-8 py-3'}`}>
          Try Again
        </button>
      </div>
    </div>
  );
};

export default Lesson6Simulation;

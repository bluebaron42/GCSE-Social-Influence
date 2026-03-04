import React, { useState, useEffect } from 'react';
import { Zap, Users, AlertTriangle, Volume2, VolumeX } from 'lucide-react';

interface Lesson2SimulationProps {
  isPresentation: boolean;
}

type Phase = 'intro' | 'instructions' | 'trial' | 'debrief' | 'results';

const Lesson2Simulation: React.FC<Lesson2SimulationProps> = ({ isPresentation }) => {
  const [phase, setPhase] = useState<Phase>('intro');
  const [currentVoltage, setCurrentVoltage] = useState(15);
  const [responses, setResponses] = useState<{ voltage: number; action: 'shock' | 'refuse' }[]>([]);
  const [prodIndex, setProdIndex] = useState(0);
  const [showLearnerReaction, setShowLearnerReaction] = useState(false);

  const prods = [
    "Please continue.",
    "The experiment requires that you continue.",
    "It is absolutely essential that you continue.",
    "You have no other choice, you must go on."
  ];

  const getLearnerReaction = (voltage: number): string => {
    if (voltage < 75) return "No reaction";
    if (voltage < 150) return "💭 'Ouch!'";
    if (voltage < 225) return "😣 'Please stop! This is painful!'";
    if (voltage < 300) return "😱 'I can't stand it! Let me out!'";
    if (voltage < 330) return "😵 *Screaming and pounding on wall*";
    return "🔇 *Complete silence - no response*";
  };

  const getVoltageLabel = (voltage: number): string => {
    if (voltage <= 15) return "Slight Shock";
    if (voltage <= 60) return "Moderate Shock";
    if (voltage <= 120) return "Strong Shock";
    if (voltage <= 180) return "Very Strong Shock";
    if (voltage <= 240) return "Intense Shock";
    if (voltage <= 300) return "Extreme Intensity";
    if (voltage <= 360) return "Danger: Severe";
    return "XXX";
  };

  const handleShock = () => {
    setResponses(prev => [...prev, { voltage: currentVoltage, action: 'shock' }]);
    setShowLearnerReaction(true);
    setProdIndex(0);
    
    setTimeout(() => {
      setShowLearnerReaction(false);
      if (currentVoltage < 450) {
        setCurrentVoltage(prev => prev + 15);
      } else {
        setPhase('debrief');
      }
    }, 2000);
  };

  const handleHesitate = () => {
    if (prodIndex < prods.length - 1) {
      setProdIndex(prev => prev + 1);
    } else {
      // After all prods, they refuse
      handleRefuse();
    }
  };

  const handleRefuse = () => {
    setResponses(prev => [...prev, { voltage: currentVoltage, action: 'refuse' }]);
    setPhase('debrief');
  };

  const resetSimulation = () => {
    setPhase('intro');
    setCurrentVoltage(15);
    setResponses([]);
    setProdIndex(0);
    setShowLearnerReaction(false);
  };

  const maxVoltageReached = responses.length > 0 
    ? Math.max(...responses.filter(r => r.action === 'shock').map(r => r.voltage), 0)
    : 0;
  const refused = responses.some(r => r.action === 'refuse');
  const wentToMax = maxVoltageReached >= 450;

  if (phase === 'intro') {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-8">
        <div className={`text-center max-w-3xl ${isPresentation ? 'max-w-5xl' : ''}`}>
          <div className={`flex items-center justify-center gap-4 mb-6`}>
            <Zap className={`text-amber-400 ${isPresentation ? 'w-20 h-20' : 'w-12 h-12'}`} />
            <h2 className={`font-bold text-white ${isPresentation ? 'text-6xl' : 'text-3xl'}`}>
              The Milgram Experience
            </h2>
          </div>
          
          <p className={`text-gray-300 mb-8 leading-relaxed ${isPresentation ? 'text-2xl' : 'text-lg'}`}>
            Step into the shoes of a participant in Milgram's famous obedience study. 
            Will you follow orders, or will you refuse?
          </p>

          <div className={`bg-amber-900/30 border border-amber-500/50 rounded-xl p-6 mb-8 ${isPresentation ? 'p-10' : ''}`}>
            <div className={`flex items-center gap-2 mb-3`}>
              <AlertTriangle className="text-amber-400" size={isPresentation ? 28 : 20} />
              <span className={`text-amber-400 font-bold ${isPresentation ? 'text-xl' : 'text-base'}`}>
                Note
              </span>
            </div>
            <p className={`text-gray-300 ${isPresentation ? 'text-xl' : 'text-sm'}`}>
              This is a simulation for educational purposes. No one is actually being shocked. 
              The "learner" responses are pre-recorded to match Milgram's original study.
            </p>
          </div>

          <button
            onClick={() => setPhase('instructions')}
            className={`bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl transition-all ${
              isPresentation ? 'px-16 py-6 text-3xl' : 'px-10 py-4 text-xl'
            }`}
          >
            Begin Experiment
          </button>
        </div>
      </div>
    );
  }

  if (phase === 'instructions') {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-6">
        <div className={`bg-gray-800 border border-gray-700 rounded-xl max-w-3xl ${isPresentation ? 'p-12' : 'p-8'}`}>
          <h3 className={`font-bold text-white mb-6 ${isPresentation ? 'text-4xl' : 'text-2xl'}`}>
            Your Instructions
          </h3>
          
          <div className={`space-y-4 text-gray-300 ${isPresentation ? 'text-xl space-y-6' : 'text-base'}`}>
            <p>You are the <span className="text-amber-400 font-semibold">"Teacher"</span> in this learning experiment.</p>
            <p>In the next room is a <span className="text-blue-400 font-semibold">"Learner"</span> (Mr. Wallace) strapped to a chair with electrodes.</p>
            <p>You will read word pairs. When the learner makes a mistake, you must administer an electric shock.</p>
            <p>Each shock increases by <span className="text-red-400 font-bold">15 volts</span>.</p>
            <p className="text-amber-400 font-semibold">The experiment requires that you continue.</p>
          </div>

          <button
            onClick={() => setPhase('trial')}
            className={`mt-8 w-full bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl transition-all ${
              isPresentation ? 'py-6 text-2xl' : 'py-4 text-lg'
            }`}
          >
            I Understand - Start Trial
          </button>
        </div>
      </div>
    );
  }

  if (phase === 'trial') {
    const voltagePercent = (currentVoltage / 450) * 100;
    const dangerLevel = currentVoltage >= 300 ? 'danger' : currentVoltage >= 180 ? 'warning' : 'normal';

    return (
      <div className="flex flex-col h-full">
        {/* Shock Generator Display */}
        <div className={`bg-gray-900 border-2 ${
          dangerLevel === 'danger' ? 'border-red-500' : dangerLevel === 'warning' ? 'border-amber-500' : 'border-gray-700'
        } rounded-xl mb-6 ${isPresentation ? 'p-8' : 'p-6'}`}>
          <div className="flex items-center justify-between mb-4">
            <span className={`font-mono uppercase tracking-widest ${
              dangerLevel === 'danger' ? 'text-red-400' : dangerLevel === 'warning' ? 'text-amber-400' : 'text-gray-400'
            } ${isPresentation ? 'text-lg' : 'text-xs'}`}>
              Shock Generator
            </span>
            <span className={`font-bold ${
              dangerLevel === 'danger' ? 'text-red-400' : dangerLevel === 'warning' ? 'text-amber-400' : 'text-gray-400'
            } ${isPresentation ? 'text-xl' : 'text-sm'}`}>
              {getVoltageLabel(currentVoltage)}
            </span>
          </div>

          {/* Voltage Display */}
          <div className={`text-center mb-4 font-mono font-black ${
            dangerLevel === 'danger' ? 'text-red-500' : dangerLevel === 'warning' ? 'text-amber-500' : 'text-white'
          } ${isPresentation ? 'text-8xl' : 'text-6xl'}`}>
            {currentVoltage}V
          </div>

          {/* Voltage Bar */}
          <div className="h-4 bg-gray-800 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${
                dangerLevel === 'danger' ? 'bg-gradient-to-r from-amber-500 to-red-500' : 
                dangerLevel === 'warning' ? 'bg-gradient-to-r from-green-500 to-amber-500' : 
                'bg-gradient-to-r from-green-500 to-green-400'
              }`}
              style={{ width: `${voltagePercent}%` }}
            />
          </div>
        </div>

        {/* Learner Reaction */}
        <div className={`bg-gray-800/50 border border-gray-700 rounded-xl mb-6 flex items-center gap-4 ${isPresentation ? 'p-6' : 'p-4'}`}>
          <Users size={isPresentation ? 32 : 24} className="text-blue-400" />
          <div className="flex-1">
            <span className={`text-gray-400 ${isPresentation ? 'text-lg' : 'text-sm'}`}>
              Learner's response:
            </span>
            <p className={`text-white font-semibold ${isPresentation ? 'text-2xl' : 'text-base'}`}>
              {showLearnerReaction ? getLearnerReaction(currentVoltage) : "Waiting..."}
            </p>
          </div>
          {showLearnerReaction && currentVoltage < 330 && (
            <Volume2 className="text-amber-400 animate-pulse" size={isPresentation ? 28 : 20} />
          )}
          {showLearnerReaction && currentVoltage >= 330 && (
            <VolumeX className="text-red-400" size={isPresentation ? 28 : 20} />
          )}
        </div>

        {/* Experimenter Prod */}
        {prodIndex > 0 && (
          <div className={`bg-purple-900/30 border border-purple-500 rounded-xl mb-6 animate-fadeIn ${isPresentation ? 'p-6' : 'p-4'}`}>
            <p className={`text-purple-300 italic ${isPresentation ? 'text-xl' : 'text-base'}`}>
              Experimenter: "{prods[prodIndex - 1]}"
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex-1" />
        
        {!showLearnerReaction && (
          <div className={`flex gap-4 ${isPresentation ? 'gap-6' : ''}`}>
            <button
              onClick={handleShock}
              className={`flex-1 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-3 ${
                isPresentation ? 'py-6 text-2xl' : 'py-4 text-lg'
              }`}
            >
              <Zap size={isPresentation ? 28 : 20} />
              Administer Shock
            </button>
            <button
              onClick={handleHesitate}
              className={`flex-1 bg-gray-700 hover:bg-gray-600 text-white font-bold rounded-xl transition-all ${
                isPresentation ? 'py-6 text-2xl' : 'py-4 text-lg'
              }`}
            >
              {prodIndex < prods.length - 1 ? "I don't want to continue..." : "I refuse to continue"}
            </button>
          </div>
        )}
      </div>
    );
  }

  if (phase === 'debrief' || phase === 'results') {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-6">
        <div className={`text-center max-w-3xl ${isPresentation ? 'max-w-5xl' : ''}`}>
          <h2 className={`font-bold text-white mb-6 ${isPresentation ? 'text-5xl' : 'text-3xl'}`}>
            Experiment Complete
          </h2>

          {/* Results */}
          <div className={`grid grid-cols-2 gap-6 mb-8 ${isPresentation ? 'gap-10' : ''}`}>
            <div className={`bg-gray-800 border border-gray-700 rounded-xl ${isPresentation ? 'p-8' : 'p-6'}`}>
              <div className={`font-black ${wentToMax ? 'text-red-400' : 'text-amber-400'} ${isPresentation ? 'text-6xl' : 'text-4xl'}`}>
                {maxVoltageReached}V
              </div>
              <p className={`text-gray-400 mt-2 ${isPresentation ? 'text-xl' : 'text-sm'}`}>
                Maximum voltage reached
              </p>
            </div>
            <div className={`bg-gray-800 border border-gray-700 rounded-xl ${isPresentation ? 'p-8' : 'p-6'}`}>
              <div className={`font-black ${refused ? 'text-green-400' : 'text-red-400'} ${isPresentation ? 'text-6xl' : 'text-4xl'}`}>
                {refused ? 'Yes' : 'No'}
              </div>
              <p className={`text-gray-400 mt-2 ${isPresentation ? 'text-xl' : 'text-sm'}`}>
                Refused to continue
              </p>
            </div>
          </div>

          {/* Comparison */}
          <div className={`bg-amber-900/30 border border-amber-500/50 rounded-xl ${isPresentation ? 'p-8' : 'p-6'}`}>
            <h3 className={`font-bold text-amber-400 mb-4 ${isPresentation ? 'text-2xl' : 'text-lg'}`}>
              How You Compare to Milgram's Participants
            </h3>
            <p className={`text-gray-300 ${isPresentation ? 'text-xl' : 'text-base'}`}>
              {wentToMax ? (
                <>You went all the way to 450V, just like <span className="text-red-400 font-bold">65%</span> of Milgram's participants.</>
              ) : refused ? (
                <>You refused at {maxVoltageReached}V. You're in the <span className="text-green-400 font-bold">35%</span> minority who stopped before 450V.</>
              ) : (
                <>Most participants continued despite the learner's protests.</>
              )}
            </p>
          </div>

          <button
            onClick={resetSimulation}
            className={`mt-8 bg-gray-700 hover:bg-gray-600 text-white font-bold rounded-xl transition-all ${
              isPresentation ? 'px-12 py-5 text-xl' : 'px-8 py-4 text-base'
            }`}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default Lesson2Simulation;

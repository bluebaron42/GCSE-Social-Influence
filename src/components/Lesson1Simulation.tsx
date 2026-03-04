import React, { useState, useEffect, useCallback } from 'react';
import { CheckCircle, XCircle, Eye, Users, AlertTriangle } from 'lucide-react';

interface Lesson1SimulationProps {
  isPresentation: boolean;
}

interface Trial {
  id: number;
  standardLine: number;
  comparisonLines: [number, number, number];
  correctAnswer: number; // index 0, 1, or 2
  confederateAnswer: number; // what the "group" says
  isCritical: boolean; // true = confederates give wrong answer
}

const trials: Trial[] = [
  { id: 1, standardLine: 100, comparisonLines: [100, 80, 120], correctAnswer: 0, confederateAnswer: 2, isCritical: true },
  { id: 2, standardLine: 80, comparisonLines: [60, 80, 100], correctAnswer: 1, confederateAnswer: 2, isCritical: true },
  { id: 3, standardLine: 120, comparisonLines: [100, 140, 120], correctAnswer: 2, confederateAnswer: 1, isCritical: true },
  { id: 4, standardLine: 90, comparisonLines: [90, 70, 110], correctAnswer: 0, confederateAnswer: 1, isCritical: true },
  { id: 5, standardLine: 110, comparisonLines: [130, 90, 110], correctAnswer: 2, confederateAnswer: 0, isCritical: true },
  { id: 6, standardLine: 70, comparisonLines: [70, 50, 90], correctAnswer: 0, confederateAnswer: 2, isCritical: true },
];

const confederateNames = ['Alex', 'Jordan', 'Sam', 'Taylor', 'Morgan', 'Casey'];

const Lesson1Simulation: React.FC<Lesson1SimulationProps> = ({ isPresentation }) => {
  const [phase, setPhase] = useState<'intro' | 'trial' | 'feedback' | 'results'>('intro');
  const [currentTrial, setCurrentTrial] = useState(0);
  const [showConfederateAnswers, setShowConfederateAnswers] = useState(false);
  const [confederateIndex, setConfederateIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<{ trial: number; userAnswer: number; correct: number; conformed: boolean }[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);

  const trial = trials[currentTrial];

  // Animate confederates answering one by one
  useEffect(() => {
    if (phase === 'trial' && showConfederateAnswers && confederateIndex < 6) {
      const timer = setTimeout(() => {
        setConfederateIndex(prev => prev + 1);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [phase, showConfederateAnswers, confederateIndex]);

  const startSimulation = () => {
    setPhase('trial');
    setCurrentTrial(0);
    setAnswers([]);
    setTimeout(() => setShowConfederateAnswers(true), 1000);
  };

  const handleAnswer = (answerIndex: number) => {
    if (userAnswer !== null) return;
    
    setUserAnswer(answerIndex);
    const isCorrect = answerIndex === trial.correctAnswer;
    const conformed = trial.isCritical && answerIndex === trial.confederateAnswer;
    
    setAnswers(prev => [...prev, {
      trial: currentTrial,
      userAnswer: answerIndex,
      correct: trial.correctAnswer,
      conformed
    }]);
    
    setShowFeedback(true);
  };

  const nextTrial = () => {
    if (currentTrial < trials.length - 1) {
      setCurrentTrial(prev => prev + 1);
      setUserAnswer(null);
      setShowFeedback(false);
      setShowConfederateAnswers(false);
      setConfederateIndex(0);
      setTimeout(() => setShowConfederateAnswers(true), 1000);
    } else {
      setPhase('results');
    }
  };

  const resetSimulation = () => {
    setPhase('intro');
    setCurrentTrial(0);
    setUserAnswer(null);
    setAnswers([]);
    setShowFeedback(false);
    setShowConfederateAnswers(false);
    setConfederateIndex(0);
  };

  const criticalTrials = answers.filter((_, i) => trials[i]?.isCritical);
  const conformedCount = criticalTrials.filter(a => a.conformed).length;
  const totalCritical = trials.filter(t => t.isCritical).length;

  if (phase === 'intro') {
    return (
      <div className={`flex flex-col items-center justify-center h-full gap-6 ${isPresentation ? 'gap-10' : ''}`}>
        <div className={`text-center max-w-2xl ${isPresentation ? 'max-w-4xl' : ''}`}>
          <div className={`flex items-center justify-center gap-3 mb-4`}>
            <Users className={`text-cyan-400 ${isPresentation ? 'w-16 h-16' : 'w-10 h-10'}`} />
            <h2 className={`font-bold text-white ${isPresentation ? 'text-5xl' : 'text-2xl'}`}>
              Experience Asch's Experiment
            </h2>
          </div>
          
          <p className={`text-gray-300 mb-6 leading-relaxed ${isPresentation ? 'text-2xl mb-10' : 'text-base'}`}>
            You are the <span className="text-cyan-400 font-semibold">naive participant</span>. 
            Six other "participants" (actually confederates) will answer before you.
            Your task: identify which comparison line matches the standard line.
          </p>

          <div className={`bg-gray-800 border border-gray-700 rounded-xl p-6 mb-6 shadow-lg ${isPresentation ? 'p-10 mb-10' : ''}`}>
            <div className={`flex items-center gap-2 text-amber-400 mb-3 ${isPresentation ? 'text-xl mb-4' : 'text-sm'}`}>
              <AlertTriangle className={isPresentation ? 'w-6 h-6' : 'w-4 h-4'} />
              <span className="font-bold">Important</span>
            </div>
            <p className={`text-gray-400 ${isPresentation ? 'text-xl' : 'text-sm'}`}>
              On <span className="text-red-400 font-semibold">every trial</span>, all confederates will deliberately give the <span className="text-red-400">same wrong answer</span>. 
              Will you trust your own eyes, or go along with the group?
            </p>
          </div>

          <button
            onClick={startSimulation}
            className={`bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-white font-bold rounded-xl transition-all shadow-lg ${
              isPresentation ? 'px-12 py-5 text-2xl' : 'px-8 py-3 text-lg'
            }`}
          >
            Start Experiment
          </button>
        </div>
      </div>
    );
  }

  if (phase === 'results') {
    const conformityRate = totalCritical > 0 ? Math.round((conformedCount / totalCritical) * 100) : 0;
    
    return (
      <div className={`flex flex-col items-center justify-center h-full gap-6 ${isPresentation ? 'gap-10' : ''}`}>
        <h2 className={`font-bold text-white ${isPresentation ? 'text-5xl' : 'text-2xl'}`}>
          Your Results
        </h2>

        <div className={`grid grid-cols-3 gap-6 ${isPresentation ? 'gap-10' : ''}`}>
          <div className={`bg-gray-800 border border-gray-700 rounded-xl p-6 text-center shadow-lg ${isPresentation ? 'p-10' : ''}`}>
            <div className={`text-cyan-400 font-bold ${isPresentation ? 'text-6xl' : 'text-4xl'}`}>
              {conformedCount}/{totalCritical}
            </div>
            <div className={`text-gray-400 mt-2 ${isPresentation ? 'text-xl' : 'text-sm'}`}>
              Critical trials conformed
            </div>
          </div>

          <div className={`bg-gray-800 border border-gray-700 rounded-xl p-6 text-center shadow-lg ${isPresentation ? 'p-10' : ''}`}>
            <div className={`text-amber-400 font-bold ${isPresentation ? 'text-6xl' : 'text-4xl'}`}>
              {conformityRate}%
            </div>
            <div className={`text-gray-400 mt-2 ${isPresentation ? 'text-xl' : 'text-sm'}`}>
              Your conformity rate
            </div>
          </div>

          <div className={`bg-gray-800 border border-gray-700 rounded-xl p-6 text-center shadow-lg ${isPresentation ? 'p-10' : ''}`}>
            <div className={`text-emerald-400 font-bold ${isPresentation ? 'text-6xl' : 'text-4xl'}`}>
              36.8%
            </div>
            <div className={`text-gray-400 mt-2 ${isPresentation ? 'text-xl' : 'text-sm'}`}>
              Asch's original finding
            </div>
          </div>
        </div>

        <div className={`bg-gray-800 border border-gray-700 rounded-xl p-6 max-w-2xl shadow-lg ${isPresentation ? 'p-10 max-w-4xl' : ''}`}>
          <h3 className={`font-bold text-white mb-3 ${isPresentation ? 'text-2xl mb-4' : 'text-lg'}`}>
            What does this mean?
          </h3>
          <p className={`text-gray-300 leading-relaxed ${isPresentation ? 'text-xl' : 'text-sm'}`}>
            {conformedCount === 0 ? (
              <>You showed strong <span className="text-emerald-400">independence</span>! Like the 25% in Asch's study who never conformed, you trusted your own perception despite group pressure.</>
            ) : conformedCount === totalCritical ? (
              <>You conformed on all critical trials. This demonstrates the powerful influence of <span className="text-cyan-400">Normative Social Influence (NSI)</span> – the desire to fit in with the group.</>
            ) : (
              <>You showed a mix of conformity and independence. This is typical – most participants in Asch's study conformed on <span className="text-cyan-400">some</span> trials but not all.</>
            )}
          </p>
        </div>

        <button
          onClick={resetSimulation}
          className={`bg-gray-700 hover:bg-gray-600 border border-gray-600 text-white font-bold rounded-xl transition-all ${
            isPresentation ? 'px-10 py-4 text-xl' : 'px-6 py-2 text-base'
          }`}
        >
          Try Again
        </button>
      </div>
    );
  }

  // Trial phase
  return (
    <div className={`flex flex-col h-full ${isPresentation ? 'p-4' : 'p-2'}`}>
      {/* Trial indicator */}
      <div className={`text-center mb-4 ${isPresentation ? 'mb-8' : ''}`}>
        <span className={`text-gray-400 ${isPresentation ? 'text-xl' : 'text-sm'}`}>
          Trial {currentTrial + 1} of {trials.length}
        </span>
      </div>

      {/* Line comparison task */}
      <div className={`flex-1 flex items-center justify-center gap-12 ${isPresentation ? 'gap-24' : ''}`}>
        {/* Standard line */}
        <div className="text-center">
          <div className={`text-gray-400 mb-4 ${isPresentation ? 'text-xl mb-6' : 'text-sm'}`}>Standard</div>
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 flex items-end justify-center shadow-lg" 
               style={{ width: isPresentation ? '120px' : '80px', height: isPresentation ? '250px' : '180px' }}>
            <div 
              className="bg-cyan-500 w-3 rounded-t"
              style={{ height: `${trial.standardLine}%` }}
            />
          </div>
        </div>

        {/* Comparison lines */}
        <div className="text-center">
          <div className={`text-gray-400 mb-4 ${isPresentation ? 'text-xl mb-6' : 'text-sm'}`}>Comparison Lines</div>
          <div className={`flex gap-4 ${isPresentation ? 'gap-8' : ''}`}>
            {trial.comparisonLines.map((height, idx) => {
              const isSelected = userAnswer === idx;
              const isCorrect = idx === trial.correctAnswer;
              const isConfederateChoice = idx === trial.confederateAnswer;
              
              return (
                <button
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  disabled={userAnswer !== null}
                  className={`relative bg-gray-800 border-2 rounded-xl p-6 flex flex-col items-center justify-end transition-all shadow-lg ${
                    isSelected 
                      ? (isCorrect ? 'border-emerald-500 bg-emerald-900/30' : 'border-red-500 bg-red-900/30')
                      : showFeedback && isCorrect
                        ? 'border-emerald-500/50'
                        : 'border-gray-700 hover:border-cyan-500 hover:bg-gray-700/50'
                  }`}
                  style={{ width: isPresentation ? '100px' : '70px', height: isPresentation ? '250px' : '180px' }}
                >
                  <div 
                    className={`w-3 rounded-t transition-all ${
                      isSelected ? (isCorrect ? 'bg-emerald-500' : 'bg-red-500') : 'bg-gray-400'
                    }`}
                    style={{ height: `${height}%` }}
                  />
                  <div className={`absolute -bottom-8 font-bold ${isPresentation ? 'text-xl' : 'text-sm'}`}>
                    {String.fromCharCode(65 + idx)}
                  </div>
                  
                  {/* Show confederate choice indicator */}
                  {showConfederateAnswers && confederateIndex >= 6 && isConfederateChoice && (
                    <div className={`absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-black px-2 py-0.5 rounded-lg text-xs font-bold shadow-md ${
                      isPresentation ? 'text-sm px-3 py-1' : ''
                    }`}>
                      Group chose
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Confederate answers panel */}
      <div className={`bg-gray-800 border border-gray-700 rounded-xl p-4 mt-4 shadow-lg ${isPresentation ? 'p-6 mt-8' : ''}`}>
        <div className={`text-gray-400 mb-3 ${isPresentation ? 'text-lg mb-4' : 'text-xs'}`}>
          Other participants' answers:
        </div>
        <div className={`flex gap-3 flex-wrap ${isPresentation ? 'gap-4' : ''}`}>
          {confederateNames.map((name, idx) => (
            <div 
              key={name}
              className={`flex items-center gap-2 bg-gray-900/50 border border-gray-700 rounded-lg px-3 py-2 transition-all ${
                idx < confederateIndex ? 'opacity-100' : 'opacity-30'
              } ${isPresentation ? 'px-4 py-3' : ''}`}
            >
              <div className={`w-2 h-2 rounded-full ${idx < confederateIndex ? 'bg-emerald-500' : 'bg-gray-500'}`} />
              <span className={`text-gray-300 ${isPresentation ? 'text-lg' : 'text-sm'}`}>{name}:</span>
              <span className={`font-bold ${isPresentation ? 'text-lg' : 'text-sm'} ${
                idx < confederateIndex ? 'text-white' : 'text-gray-500'
              }`}>
                {idx < confederateIndex ? String.fromCharCode(65 + trial.confederateAnswer) : '...'}
              </span>
            </div>
          ))}
        </div>
        
        {confederateIndex >= 6 && userAnswer === null && (
          <div className={`mt-4 text-center ${isPresentation ? 'mt-6' : ''}`}>
            <span className={`text-cyan-400 animate-pulse ${isPresentation ? 'text-xl' : 'text-sm'}`}>
              👆 Your turn! Click on the matching line (A, B, or C)
            </span>
          </div>
        )}
      </div>

      {/* Feedback and next button */}
      {showFeedback && (
        <div className={`mt-4 flex items-center justify-between ${isPresentation ? 'mt-8' : ''}`}>
          <div className={`flex items-center gap-3 ${isPresentation ? 'gap-4' : ''}`}>
            {userAnswer === trial.confederateAnswer ? (
              <>
                <XCircle className={`text-amber-500 ${isPresentation ? 'w-8 h-8' : 'w-5 h-5'}`} />
                <div>
                  <span className={`text-amber-400 font-bold ${isPresentation ? 'text-xl' : 'text-sm'}`}>
                    You CONFORMED to the group!
                  </span>
                  <span className={`text-gray-400 ml-2 ${isPresentation ? 'text-lg' : 'text-xs'}`}>
                    (Group was wrong, correct answer was {String.fromCharCode(65 + trial.correctAnswer)})
                  </span>
                </div>
              </>
            ) : userAnswer === trial.correctAnswer ? (
              <>
                <CheckCircle className={`text-emerald-500 ${isPresentation ? 'w-8 h-8' : 'w-5 h-5'}`} />
                <div>
                  <span className={`text-emerald-400 font-bold ${isPresentation ? 'text-xl' : 'text-sm'}`}>
                    You DID NOT conform!
                  </span>
                  <span className={`text-gray-400 ml-2 ${isPresentation ? 'text-lg' : 'text-xs'}`}>
                    (You chose correctly despite group pressure)
                  </span>
                </div>
              </>
            ) : (
              <>
                <XCircle className={`text-red-500 ${isPresentation ? 'w-8 h-8' : 'w-5 h-5'}`} />
                <div>
                  <span className={`text-red-400 font-bold ${isPresentation ? 'text-xl' : 'text-sm'}`}>
                    You DID NOT conform!
                  </span>
                  <span className={`text-gray-400 ml-2 ${isPresentation ? 'text-lg' : 'text-xs'}`}>
                    (But you got it wrong - correct was {String.fromCharCode(65 + trial.correctAnswer)})
                  </span>
                </div>
              </>
            )}
          </div>
          <button
            onClick={nextTrial}
            className={`bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-white font-bold rounded-xl transition-all shadow-lg ${
              isPresentation ? 'px-8 py-3 text-xl' : 'px-4 py-2 text-sm'
            }`}
          >
            {currentTrial < trials.length - 1 ? 'Next Trial' : 'See Results'}
          </button>
        </div>
      )}
    </div>
  );
};

export default Lesson1Simulation;

import React, { useState } from 'react';
import { CheckCircle, XCircle, HelpCircle } from 'lucide-react';

interface Lesson5KnowledgeCheckProps {
  isPresentation: boolean;
}

interface Question {
  scenario: string;
  question: string;
  options: string[];
  correct: number;
  feedback: string;
}

const questions: Question[] = [
  {
    scenario: 'At a football match, a group of fans begin chanting aggressively and throwing objects at opposing supporters. When interviewed afterwards, some fans say they "got swept up in the moment" and would never normally behave that way.',
    question: 'Which concept best explains this behaviour?',
    options: ['Minority influence', 'Deindividuation', 'The authoritarian personality', 'Agency theory'],
    correct: 1,
    feedback: 'Correct! The fans experienced deindividuation — they lost their sense of individual identity in the crowd, felt anonymous, and behaved in ways they normally wouldn\'t. The large group and high arousal reduced their self-awareness.'
  },
  {
    scenario: 'During a protest, demonstrators damage banks and government buildings but carefully avoid local shops and houses. The violence stays within a specific area of the city.',
    question: 'Whose research best explains this selective crowd behaviour?',
    options: ['Moscovici (1969)', 'Zimbardo (1969)', 'Reicher (1984)', 'Milgram (1963)'],
    correct: 2,
    feedback: 'Correct! Reicher\'s (1984) study of the St Pauls riot found the same pattern — crowds act selectively according to shared social identity, not mindlessly. Only "legitimate" targets (symbols of authority) were attacked whilst local properties were left alone.'
  },
  {
    scenario: 'A researcher has participants wear either name tags or identity-concealing hoods. The hooded group administers longer electric shocks to a confederate than the name-tag group.',
    question: 'What does this study demonstrate about crowd behaviour?',
    options: [
      'Crowds always become violent',
      'Anonymity increases aggressive behaviour through deindividuation',
      'People with external LOC are more aggressive',
      'Minority influence can make people aggressive'
    ],
    correct: 1,
    feedback: 'Correct! This describes Zimbardo\'s (1969) study. When participants were anonymous (hooded), they shocked for twice as long. This supports the idea that anonymity causes deindividuation, which reduces personal responsibility and increases anti-social behaviour.'
  }
];

const Lesson5KnowledgeCheck: React.FC<Lesson5KnowledgeCheckProps> = ({ isPresentation }) => {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const handleSelect = (idx: number) => {
    if (showFeedback) return;
    setSelected(idx);
    setShowFeedback(true);
    if (idx === questions[currentQ].correct) {
      setScore(prev => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(prev => prev + 1);
      setSelected(null);
      setShowFeedback(false);
    } else {
      setCompleted(true);
    }
  };

  if (completed) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-6">
        <div className={`text-center bg-gray-800 border border-gray-700 rounded-2xl shadow-lg ${isPresentation ? 'p-12' : 'p-8'}`}>
          <div className={`font-bold mb-4 ${isPresentation ? 'text-6xl' : 'text-4xl'} ${score === questions.length ? 'text-green-400' : score >= 2 ? 'text-amber-400' : 'text-red-400'}`}>
            {score} / {questions.length}
          </div>
          <p className={`text-gray-300 mb-6 ${isPresentation ? 'text-2xl' : 'text-lg'}`}>
            {score === questions.length ? '🎉 Excellent understanding of crowd behaviour!' : score >= 2 ? 'Good work — review the concept you missed.' : 'Review deindividuation and Reicher\'s study.'}
          </p>
          <button
            onClick={() => { setCurrentQ(0); setSelected(null); setShowFeedback(false); setScore(0); setCompleted(false); }}
            className={`bg-yellow-600 hover:bg-yellow-500 text-white font-bold rounded-xl transition-all ${isPresentation ? 'px-10 py-4 text-xl' : 'px-6 py-3'}`}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const q = questions[currentQ];

  return (
    <div className="flex flex-col h-full">
      <div className={`flex items-center gap-2 mb-6 ${isPresentation ? 'mb-8' : ''}`}>
        {questions.map((_, idx) => (
          <div key={idx} className={`h-2 flex-1 rounded-full transition-all ${idx < currentQ ? 'bg-yellow-500' : idx === currentQ ? 'bg-yellow-400 animate-pulse' : 'bg-gray-700'}`} />
        ))}
      </div>

      <div className={`bg-gradient-to-br from-yellow-900/30 to-amber-900/20 border border-yellow-500/30 rounded-xl mb-6 ${isPresentation ? 'p-8' : 'p-6'}`}>
        <div className="flex items-start gap-3">
          <HelpCircle className="text-yellow-400 shrink-0 mt-1" size={isPresentation ? 28 : 20} />
          <div>
            <span className={`text-yellow-400 font-mono uppercase tracking-widest ${isPresentation ? 'text-sm' : 'text-xs'}`}>Scenario {currentQ + 1}</span>
            <p className={`text-gray-200 mt-2 leading-relaxed ${isPresentation ? 'text-xl' : 'text-sm'}`}>{q.scenario}</p>
          </div>
        </div>
      </div>

      <h3 className={`text-white font-bold mb-4 ${isPresentation ? 'text-2xl' : 'text-lg'}`}>{q.question}</h3>

      <div className={`grid grid-cols-2 gap-3 mb-6 ${isPresentation ? 'gap-4' : ''}`}>
        {q.options.map((opt, idx) => {
          const isCorrect = idx === q.correct;
          const isSelected = idx === selected;
          let btnClass = 'bg-gray-800/80 border-gray-700 hover:border-gray-500 text-gray-300';
          if (showFeedback && isCorrect) btnClass = 'bg-green-900/40 border-green-500 text-green-300';
          if (showFeedback && isSelected && !isCorrect) btnClass = 'bg-red-900/40 border-red-500 text-red-300';

          return (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              className={`text-left border-2 rounded-xl transition-all flex items-center gap-3 ${btnClass} ${isPresentation ? 'p-5 text-lg' : 'p-3 text-sm'}`}
            >
              <span className={`font-mono font-bold opacity-50 ${isPresentation ? 'text-xl' : 'text-base'}`}>{String.fromCharCode(65 + idx)}</span>
              <span className="flex-1">{opt}</span>
              {showFeedback && isCorrect && <CheckCircle size={20} className="text-green-400" />}
              {showFeedback && isSelected && !isCorrect && <XCircle size={20} className="text-red-400" />}
            </button>
          );
        })}
      </div>

      {showFeedback && (
        <div className={`animate-fadeIn bg-gray-800 border border-gray-700 rounded-xl flex-1 flex flex-col justify-between ${isPresentation ? 'p-6' : 'p-4'}`}>
          <p className={`text-gray-300 ${isPresentation ? 'text-lg' : 'text-sm'}`}>{q.feedback}</p>
          <button
            onClick={nextQuestion}
            className={`self-end bg-yellow-600 hover:bg-yellow-500 text-white font-bold rounded-lg transition-all mt-4 ${isPresentation ? 'px-8 py-3 text-lg' : 'px-6 py-2'}`}
          >
            {currentQ < questions.length - 1 ? 'Next Question →' : 'See Results'}
          </button>
        </div>
      )}
    </div>
  );
};

export default Lesson5KnowledgeCheck;

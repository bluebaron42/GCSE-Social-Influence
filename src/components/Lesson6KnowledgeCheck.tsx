import React, { useState } from 'react';
import { CheckCircle, XCircle, HelpCircle } from 'lucide-react';

interface Lesson6KnowledgeCheckProps {
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
    scenario: 'In a group of 8 students working on a presentation, two students do most of the work while the others contribute very little. The lazy students say "it\'ll get done anyway" and spend time on their phones.',
    question: 'Which social factor affecting crowd behaviour is demonstrated here?',
    options: ['Deindividuation', 'Social loafing', 'Culture', 'Minority influence'],
    correct: 1,
    feedback: 'Correct! This is social loafing — individuals reduce their effort in a group because their contribution is harder to identify. The larger the group, the easier it is to "free-ride" on others\' efforts. This links to diffusion of responsibility.'
  },
  {
    scenario: 'After a major earthquake, people in a collectivist culture (e.g. Japan) quickly form organised groups to help with rescue efforts. In an individualist culture, the response tends to be more fragmented with individuals acting independently.',
    question: 'What does this illustrate about crowd factors?',
    options: [
      'Social loafing is worse in collectivist cultures',
      'Culture affects how people behave in crowd situations',
      'Collectivist cultures have lower morality',
      'Deindividuation only occurs in individualist cultures'
    ],
    correct: 1,
    feedback: 'Correct! Culture shapes crowd behaviour. In collectivist cultures, group harmony is prized, so crowds tend to be more coordinated and cohesive. Bond & Smith (1996) found higher conformity in collectivist cultures, supporting this cultural influence.'
  },
  {
    scenario: 'During a riot, most people in the neighbourhood stay inside and refuse to participate. A researcher interviews them and finds they describe strong personal moral values as their reason for not joining in.',
    question: 'Which dispositional factor best explains their resistance?',
    options: [
      'External locus of control',
      'Low self-esteem',
      'Moral reasoning and moral identity',
      'Sensation-seeking'
    ],
    correct: 2,
    feedback: 'Correct! Morality is a dispositional factor that can override situational pressures like crowd influence. People with strong moral identity resist antisocial crowd behaviour — their personal values act as a "brake" even when deindividuation conditions are present.'
  }
];

const Lesson6KnowledgeCheck: React.FC<Lesson6KnowledgeCheckProps> = ({ isPresentation }) => {
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
            {score === questions.length ? '🎉 Perfect understanding of crowd factors!' : score >= 2 ? 'Good work — review the factor you missed.' : 'Review social loafing, culture, personality, and morality.'}
          </p>
          <button
            onClick={() => { setCurrentQ(0); setSelected(null); setShowFeedback(false); setScore(0); setCompleted(false); }}
            className={`bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-xl transition-all ${isPresentation ? 'px-10 py-4 text-xl' : 'px-6 py-3'}`}
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
          <div key={idx} className={`h-2 flex-1 rounded-full transition-all ${idx < currentQ ? 'bg-teal-500' : idx === currentQ ? 'bg-teal-400 animate-pulse' : 'bg-gray-700'}`} />
        ))}
      </div>

      <div className={`bg-gradient-to-br from-teal-900/30 to-cyan-900/20 border border-teal-500/30 rounded-xl mb-6 ${isPresentation ? 'p-8' : 'p-6'}`}>
        <div className="flex items-start gap-3">
          <HelpCircle className="text-teal-400 shrink-0 mt-1" size={isPresentation ? 28 : 20} />
          <div>
            <span className={`text-teal-400 font-mono uppercase tracking-widest ${isPresentation ? 'text-sm' : 'text-xs'}`}>Scenario {currentQ + 1}</span>
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
            className={`self-end bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-lg transition-all mt-4 ${isPresentation ? 'px-8 py-3 text-lg' : 'px-6 py-2'}`}
          >
            {currentQ < questions.length - 1 ? 'Next Question →' : 'See Results'}
          </button>
        </div>
      )}
    </div>
  );
};

export default Lesson6KnowledgeCheck;

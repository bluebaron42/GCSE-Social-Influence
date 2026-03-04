import React, { useState } from 'react';
import { CheckCircle, XCircle, HelpCircle } from 'lucide-react';

interface Lesson4KnowledgeCheckProps {
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
    scenario: 'A group of 4 environmental activists consistently campaign for a local park to be saved. They hold weekly protests, write to newspapers, and attend every council meeting with the same message. Over 6 months, local opinion shifts in their favour.',
    question: 'Which factor of minority influence is most demonstrated here?',
    options: ['Consistency', 'Commitment', 'Flexibility', 'Normative Social Influence'],
    correct: 0,
    feedback: 'Correct! The minority maintained the same message over time (diachronic consistency) and all members agreed (synchronic consistency). This drew attention and caused the majority to re-evaluate.'
  },
  {
    scenario: 'A student argues in a class debate that school uniforms should be abolished. When challenged, they acknowledge some benefits of uniforms (e.g. reducing bullying about clothes) but maintain their overall position while adapting their arguments.',
    question: 'Which factor of minority influence is best demonstrated?',
    options: ['Consistency', 'Commitment', 'Flexibility', 'Informational Social Influence'],
    correct: 2,
    feedback: 'Correct! The student shows flexibility — they listen to counterarguments and adapt slightly, appearing reasonable rather than rigid. Nemeth (1986) found flexible minorities were more persuasive.'
  },
  {
    scenario: 'In Moscovici\'s blue slide experiment, the confederates said "green" on only 24 out of 36 trials. The influence rate was much lower (1.25%) compared to the consistent group (8.42%).',
    question: 'What does this finding tell us about minority influence?',
    options: [
      'The majority will always resist minority influence',
      'Inconsistency weakens minority influence significantly',
      'Only large minorities can influence the majority',
      'Minority influence only works with ambiguous stimuli'
    ],
    correct: 1,
    feedback: 'Correct! Inconsistency dramatically reduced the minority\'s influence (from 8.42% down to 1.25%). This shows that consistency is essential — without it, the majority can easily dismiss the minority.'
  }
];

const Lesson4KnowledgeCheck: React.FC<Lesson4KnowledgeCheckProps> = ({ isPresentation }) => {
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
            {score === questions.length ? '🎉 Perfect understanding of minority influence!' : score >= 2 ? 'Good grasp — review the factor you missed.' : 'Review consistency, commitment, and flexibility.'}
          </p>
          <button
            onClick={() => { setCurrentQ(0); setSelected(null); setShowFeedback(false); setScore(0); setCompleted(false); }}
            className={`bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl transition-all ${isPresentation ? 'px-10 py-4 text-xl' : 'px-6 py-3'}`}
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
      {/* Progress */}
      <div className={`flex items-center gap-2 mb-6 ${isPresentation ? 'mb-8' : ''}`}>
        {questions.map((_, idx) => (
          <div key={idx} className={`h-2 flex-1 rounded-full transition-all ${idx < currentQ ? 'bg-red-500' : idx === currentQ ? 'bg-red-400 animate-pulse' : 'bg-gray-700'}`} />
        ))}
      </div>

      {/* Scenario Card */}
      <div className={`bg-gradient-to-br from-red-900/30 to-rose-900/20 border border-red-500/30 rounded-xl mb-6 ${isPresentation ? 'p-8' : 'p-6'}`}>
        <div className="flex items-start gap-3">
          <HelpCircle className="text-red-400 shrink-0 mt-1" size={isPresentation ? 28 : 20} />
          <div>
            <span className={`text-red-400 font-mono uppercase tracking-widest ${isPresentation ? 'text-sm' : 'text-xs'}`}>Scenario {currentQ + 1}</span>
            <p className={`text-gray-200 mt-2 leading-relaxed ${isPresentation ? 'text-xl' : 'text-sm'}`}>{q.scenario}</p>
          </div>
        </div>
      </div>

      {/* Question */}
      <h3 className={`text-white font-bold mb-4 ${isPresentation ? 'text-2xl' : 'text-lg'}`}>{q.question}</h3>

      {/* Options */}
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

      {/* Feedback */}
      {showFeedback && (
        <div className={`animate-fadeIn bg-gray-800 border border-gray-700 rounded-xl flex-1 flex flex-col justify-between ${isPresentation ? 'p-6' : 'p-4'}`}>
          <p className={`text-gray-300 ${isPresentation ? 'text-lg' : 'text-sm'}`}>{q.feedback}</p>
          <button
            onClick={nextQuestion}
            className={`self-end bg-red-600 hover:bg-red-500 text-white font-bold rounded-lg transition-all mt-4 ${isPresentation ? 'px-8 py-3 text-lg' : 'px-6 py-2'}`}
          >
            {currentQ < questions.length - 1 ? 'Next Question →' : 'See Results'}
          </button>
        </div>
      )}
    </div>
  );
};

export default Lesson4KnowledgeCheck;

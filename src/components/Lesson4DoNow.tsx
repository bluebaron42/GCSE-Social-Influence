import React, { useState } from 'react';
import { CheckCircle, Clock, Brain } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
}

const questions: Question[] = [
  {
    id: 1,
    question: "What type of locus of control is linked to greater resistance to conformity?",
    options: ["External LOC", "Internal LOC", "Neutral LOC", "Situational LOC"],
    correct: 1
  },
  {
    id: 2,
    question: "What did Adorno et al. (1950) propose caused the authoritarian personality?",
    options: [
      "Watching too much TV",
      "Harsh, strict parenting with conditional love",
      "Being part of a large social group",
      "High levels of education"
    ],
    correct: 1
  },
  {
    id: 3,
    question: "In Asch's study, what happened to conformity when task difficulty increased?",
    options: ["It decreased", "It increased", "It stayed the same", "It disappeared completely"],
    correct: 1
  },
  {
    id: 4,
    question: "Which Milgram variation tested the effect of the experimenter's clothing?",
    options: [
      "Proximity variation",
      "Location variation",
      "Uniform variation",
      "Telephone variation"
    ],
    correct: 2
  },
  {
    id: 5,
    question: "Why are experts less likely to conform?",
    options: [
      "They have higher self-esteem",
      "They don't need to look to others for information (reduces ISI)",
      "They are always in positions of authority",
      "They avoid group settings"
    ],
    correct: 1
  }
];

interface Lesson4DoNowProps {
  isPresentation: boolean;
}

const Lesson4DoNow: React.FC<Lesson4DoNowProps> = ({ isPresentation }) => {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);

  const handleSelect = (qId: number, optionIdx: number) => {
    if (showResults) return;
    setAnswers(prev => ({ ...prev, [qId]: optionIdx }));
  };

  const score = Object.keys(answers).reduce(
    (acc, qId) => acc + (answers[Number(qId)] === questions.find(q => q.id === Number(qId))?.correct ? 1 : 0),
    0
  );

  return (
    <div className={`grid grid-cols-1 lg:grid-cols-2 h-full content-start transition-all ${isPresentation ? 'gap-16' : 'gap-8'}`}>
      <div className="space-y-6">
        <div className="bg-gradient-to-br from-red-900/40 to-rose-900/20 rounded-2xl border border-red-500/20 p-8 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 blur-3xl rounded-full"></div>
          <h3 className={`font-bold text-white mb-4 relative z-10 ${isPresentation ? 'text-4xl' : 'text-xl'}`}>
            Task: Activation & Retrieval
          </h3>
          <div className={`space-y-3 text-gray-300 relative z-10 ${isPresentation ? 'text-2xl' : 'text-sm'}`}>
            <p className="flex items-center gap-2">
              <Clock size={isPresentation ? 24 : 16} className="text-red-400" />
              <span><strong className="text-red-400">Time:</strong> 3 minutes</span>
            </p>
            <p className="flex items-center gap-2">
              <Brain size={isPresentation ? 24 : 16} className="text-red-400" />
              <span><strong className="text-red-400">Goal:</strong> Retrieve key facts from Lessons 1–3</span>
            </p>
          </div>
          <div className={`mt-6 p-4 bg-gray-900/50 rounded-xl border border-gray-700/50 relative z-10 ${isPresentation ? 'text-xl' : 'text-sm'}`}>
            <p className="text-gray-400 italic">
              💡 Answer from memory first. This helps strengthen neural pathways for retrieval during exams!
            </p>
          </div>
        </div>

        <div className={`flex flex-col ${isPresentation ? 'gap-6' : 'gap-3'}`}>
          {!showResults ? (
            <>
              <button
                onClick={() => setShowResults(true)}
                disabled={Object.keys(answers).length < questions.length}
                className={`bg-red-600 hover:bg-red-500 disabled:opacity-50 disabled:grayscale text-white font-bold w-full transition-all shadow-lg rounded-xl ${isPresentation ? 'px-12 py-8 text-3xl' : 'px-8 py-4'}`}
              >
                Submit Answers
              </button>
              <button
                onClick={() => setShowResults(true)}
                className={`bg-transparent hover:bg-red-900/30 text-red-400 border border-red-500 font-bold w-full transition-all rounded-xl ${isPresentation ? 'px-12 py-6 text-2xl' : 'px-8 py-3 text-sm'}`}
              >
                Reveal Answers
              </button>
            </>
          ) : (
            <div className={`text-center bg-gray-800 border border-gray-700 rounded-xl shadow-lg ${isPresentation ? 'p-8' : 'p-6'}`}>
              <div className={`font-bold mb-2 ${isPresentation ? 'text-5xl' : 'text-3xl'} ${score >= 4 ? 'text-green-400' : score >= 2 ? 'text-amber-400' : 'text-red-400'}`}>
                {score} / {questions.length}
              </div>
              <p className={`text-gray-400 ${isPresentation ? 'text-xl' : 'text-sm'}`}>
                {score === 5 ? 'Perfect retrieval!' : score >= 3 ? 'Good recall — review gaps.' : 'Review Lessons 1–3 key concepts.'}
              </p>
            </div>
          )}
        </div>
      </div>

      <div className={`space-y-4 overflow-y-auto custom-scrollbar ${isPresentation ? 'space-y-6' : ''}`}>
        {questions.map((q) => (
          <div key={q.id} className={`bg-gray-800/80 border rounded-xl shadow-md transition-all ${showResults && answers[q.id] !== q.correct ? 'border-red-500/50' : showResults && answers[q.id] === q.correct ? 'border-green-500/50' : 'border-gray-700'} ${isPresentation ? 'p-6' : 'p-4'}`}>
            <p className={`font-semibold text-white mb-3 ${isPresentation ? 'text-xl' : 'text-sm'}`}>
              <span className="text-red-400 mr-2">Q{q.id}.</span>{q.question}
            </p>
            <div className={`grid grid-cols-1 gap-2 ${isPresentation ? 'gap-3' : ''}`}>
              {q.options.map((opt, idx) => {
                const isSelected = answers[q.id] === idx;
                const isCorrect = q.correct === idx;
                let btnClass = 'bg-gray-700/50 border-gray-600 text-gray-300 hover:bg-gray-700';
                if (isSelected && !showResults) btnClass = 'bg-red-900/40 border-red-500 text-red-300';
                if (showResults && isCorrect) btnClass = 'bg-green-900/40 border-green-500 text-green-300';
                if (showResults && isSelected && !isCorrect) btnClass = 'bg-red-900/40 border-red-500 text-red-300 line-through';

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelect(q.id, idx)}
                    className={`text-left border rounded-lg transition-all ${btnClass} ${isPresentation ? 'px-5 py-3 text-lg' : 'px-3 py-2 text-xs'}`}
                  >
                    <span className="font-mono mr-2 opacity-50">{String.fromCharCode(65 + idx)}.</span>
                    {opt}
                    {showResults && isCorrect && <CheckCircle size={isPresentation ? 18 : 14} className="inline ml-2 text-green-400" />}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Lesson4DoNow;

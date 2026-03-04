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
    question: "What is obedience?",
    options: [
      "Changing behaviour to fit in with a group",
      "Following a direct order from an authority figure",
      "Copying what others do",
      "Ignoring instructions from others"
    ],
    correct: 1
  },
  {
    id: 2,
    question: "Who conducted the famous 'shock' experiment on obedience?",
    options: ["Asch", "Zimbardo", "Milgram", "Bandura"],
    correct: 2
  },
  {
    id: 3,
    question: "What percentage of participants in Milgram's study gave the maximum 450V shock?",
    options: ["25%", "35%", "50%", "65%"],
    correct: 3
  },
  {
    id: 4,
    question: "What is an 'agentic state'?",
    options: [
      "Acting independently and taking responsibility",
      "Acting as an agent for someone else, not feeling responsible",
      "Being in a position of authority",
      "Refusing to follow orders"
    ],
    correct: 1
  },
  {
    id: 5,
    question: "Which factor did NOT increase obedience in Milgram's variations?",
    options: [
      "Prestigious location (Yale University)",
      "Experimenter wearing a lab coat",
      "Participant being closer to the learner",
      "Experimenter giving orders in person"
    ],
    correct: 2
  }
];

interface Lesson2DoNowProps {
  isPresentation: boolean;
}

const Lesson2DoNow: React.FC<Lesson2DoNowProps> = ({ isPresentation }) => {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);

  const handleSelect = (qId: number, optionIdx: number) => {
    if (showResults) return;
    setAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
  };

  const score = Object.keys(answers).reduce(
    (acc, qId) => acc + (answers[Number(qId)] === questions.find(q => q.id === Number(qId))?.correct ? 1 : 0),
    0
  );

  return (
    <div className={`grid grid-cols-1 lg:grid-cols-2 h-full content-start transition-all ${isPresentation ? 'gap-16' : 'gap-8'}`}>
      {/* Left Column - Task Info */}
      <div className="space-y-6">
        <div className={`bg-gradient-to-br from-amber-900/40 to-orange-900/20 rounded-2xl border border-amber-500/20 p-8 shadow-lg relative overflow-hidden`}>
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 blur-3xl rounded-full"></div>
          <h3 className={`font-bold text-white mb-4 relative z-10 ${isPresentation ? 'text-4xl' : 'text-xl'}`}>
            Task: Activation & Retrieval
          </h3>
          <div className={`space-y-3 text-gray-300 relative z-10 ${isPresentation ? 'text-2xl' : 'text-sm'}`}>
            <p className="flex items-center gap-2">
              <Clock size={isPresentation ? 24 : 16} className="text-amber-400" />
              <span><strong className="text-amber-400">Time:</strong> 3 minutes</span>
            </p>
            <p className="flex items-center gap-2">
              <Brain size={isPresentation ? 24 : 16} className="text-amber-400" />
              <span><strong className="text-amber-400">Goal:</strong> Activate prior knowledge about obedience</span>
            </p>
          </div>
          <div className={`mt-6 p-4 bg-gray-900/50 rounded-xl border border-gray-700/50 relative z-10 ${isPresentation ? 'text-xl' : 'text-sm'}`}>
            <p className="text-gray-400 italic">
              💡 Answer from memory first. This helps strengthen neural pathways for retrieval during exams!
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className={`flex flex-col ${isPresentation ? 'gap-6' : 'gap-3'}`}>
          {!showResults ? (
            <>
              <button
                onClick={() => setShowResults(true)}
                disabled={Object.keys(answers).length < questions.length}
                className={`bg-amber-600 hover:bg-amber-500 disabled:opacity-50 disabled:grayscale text-white font-bold w-full transition-all shadow-lg rounded-xl ${isPresentation ? 'px-12 py-8 text-3xl' : 'px-8 py-4'}`}
              >
                Submit Answers
              </button>
              <button
                onClick={() => setShowResults(true)}
                className={`bg-transparent hover:bg-amber-900/30 text-amber-400 border border-amber-500 font-bold w-full transition-all rounded-xl ${isPresentation ? 'px-12 py-6 text-2xl' : 'px-8 py-3 text-sm'}`}
              >
                Reveal Answers
              </button>
            </>
          ) : (
            <div className={`bg-green-900/30 border border-green-500 w-full text-center animate-fadeIn rounded-xl ${isPresentation ? 'p-10' : 'p-6'}`}>
              <span className={`font-black text-green-400 block mb-2 ${isPresentation ? 'text-6xl mb-6' : 'text-3xl'}`}>
                Score: {score} / 5
              </span>
              <span className={`text-green-200/70 font-mono uppercase tracking-widest ${isPresentation ? 'text-xl' : 'text-xs'}`}>
                Knowledge Retrieved
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Right Column - Questions */}
      <div className="space-y-3 overflow-y-auto pr-2 custom-scrollbar max-h-full">
        {questions.map((q) => (
          <div
            key={q.id}
            className={`bg-gray-900/50 rounded-xl border border-gray-800 hover:border-gray-700 transition-colors ${isPresentation ? 'p-6 mb-4' : 'p-4'}`}
          >
            <h4 className={`font-semibold text-gray-200 mb-3 ${isPresentation ? 'text-2xl' : 'text-sm'}`}>
              <span className="text-amber-500 mr-2">{q.id < 10 ? `0${q.id}` : q.id}.</span>
              {q.question}
            </h4>

            {isPresentation ? (
              <div className="min-h-[40px]">
                {showResults && (
                  <div className="text-green-400 font-bold text-3xl animate-fadeIn mt-2 flex items-center gap-3">
                    <CheckCircle size={32} className="text-green-500" /> {q.options[q.correct]}
                  </div>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-2">
                {q.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelect(q.id, idx)}
                    className={`rounded-lg text-left transition-all px-4 py-2 text-xs border ${
                      showResults
                        ? idx === q.correct
                          ? 'bg-green-900/30 border-green-500 text-green-300'
                          : answers[q.id] === idx
                            ? 'bg-red-900/30 border-red-500 text-red-300'
                            : 'bg-gray-900/50 border-transparent text-gray-600 opacity-50'
                        : answers[q.id] === idx
                          ? 'bg-amber-600 border-amber-500 text-white'
                          : 'bg-gray-800 border-transparent hover:bg-gray-750 text-gray-400 hover:text-white'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Lesson2DoNow;

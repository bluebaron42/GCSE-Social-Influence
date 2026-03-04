import React, { useState } from 'react';
import { CheckCircle, XCircle, HelpCircle, ArrowRight } from 'lucide-react';

interface Lesson2KnowledgeCheckProps {
  isPresentation: boolean;
}

interface Question {
  id: number;
  scenario: string;
  question: string;
  options: { text: string; correct: boolean; feedback: string }[];
}

const questions: Question[] = [
  {
    id: 1,
    scenario: "A nurse receives a phone call from a doctor she doesn't know, asking her to give a patient 20mg of a drug when the maximum safe dose is 10mg.",
    question: "Based on Milgram's findings about proximity, what would you predict?",
    options: [
      { text: "High obedience - doctors have legitimate authority", correct: false, feedback: "While doctors have authority, the phone call creates distance which typically reduces obedience." },
      { text: "Lower obedience - orders given remotely (phone) reduced obedience to 20.5%", correct: true, feedback: "Correct! In Milgram's telephone variation, obedience dropped to 20.5% when the experimenter was absent." },
      { text: "No obedience - nurses are trained professionals", correct: false, feedback: "Actually, Hofling et al. found 21 out of 22 nurses DID obey similar orders, showing even professionals can be obedient." }
    ]
  },
  {
    id: 2,
    scenario: "A security guard in a shopping center asks a customer to empty their bag for inspection.",
    question: "Which situational factor best explains why people often comply?",
    options: [
      { text: "Proximity - the guard is physically close", correct: false, feedback: "While proximity matters, it's not the main factor here." },
      { text: "Uniform - the security guard's outfit signals authority", correct: true, feedback: "Correct! Bickman (1974) found people were twice as likely to obey someone in a security guard uniform." },
      { text: "Location - shopping centers have high authority", correct: false, feedback: "Shopping centers don't have the same prestige as places like Yale University." }
    ]
  },
  {
    id: 3,
    scenario: "A participant in a study is told by a researcher in casual clothes to give increasingly loud blasts of noise to another participant.",
    question: "What would Milgram's research predict?",
    options: [
      { text: "High obedience - the person is still an authority figure", correct: false, feedback: "Without visual symbols of authority, obedience typically decreases." },
      { text: "Moderate obedience - some people always obey", correct: false, feedback: "The absence of a uniform significantly impacts obedience levels." },
      { text: "Low obedience (around 20%) - no uniform reduces perceived authority", correct: true, feedback: "Correct! When Milgram's experimenter was replaced by someone in ordinary clothes, obedience dropped to 20%." }
    ]
  }
];

const Lesson2KnowledgeCheck: React.FC<Lesson2KnowledgeCheckProps> = ({ isPresentation }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const q = questions[currentQuestion];

  const handleAnswer = (optionIdx: number) => {
    if (showFeedback) return;
    setSelectedAnswer(optionIdx);
    setShowFeedback(true);
    if (q.options[optionIdx].correct) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      setCompleted(true);
    }
  };

  if (completed) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-8">
        <div className={`text-center ${isPresentation ? 'space-y-6' : 'space-y-4'}`}>
          <div className={`font-black text-amber-400 ${isPresentation ? 'text-8xl' : 'text-6xl'}`}>
            {score} / {questions.length}
          </div>
          <p className={`text-gray-300 ${isPresentation ? 'text-2xl' : 'text-lg'}`}>
            {score === questions.length ? "Perfect! You've mastered situational factors!" :
             score >= 2 ? "Great work! You understand the key concepts." :
             "Review the situational factors and try again!"}
          </p>
        </div>
        <button
          onClick={() => {
            setCurrentQuestion(0);
            setSelectedAnswer(null);
            setShowFeedback(false);
            setScore(0);
            setCompleted(false);
          }}
          className={`bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl transition-all ${
            isPresentation ? 'px-12 py-6 text-2xl' : 'px-8 py-4 text-lg'
          }`}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Progress */}
      <div className={`flex items-center justify-between mb-6 ${isPresentation ? 'mb-8' : ''}`}>
        <div className={`text-gray-400 font-mono ${isPresentation ? 'text-xl' : 'text-sm'}`}>
          Question {currentQuestion + 1} / {questions.length}
        </div>
        <div className="flex gap-2">
          {questions.map((_, idx) => (
            <div
              key={idx}
              className={`rounded-full transition-all ${
                idx < currentQuestion ? 'bg-green-500' :
                idx === currentQuestion ? 'bg-amber-500' : 'bg-gray-700'
              } ${isPresentation ? 'w-4 h-4' : 'w-3 h-3'}`}
            />
          ))}
        </div>
      </div>

      {/* Scenario */}
      <div className={`bg-gray-800/50 border border-gray-700 rounded-xl mb-6 ${isPresentation ? 'p-8 mb-8' : 'p-6'}`}>
        <div className="flex items-center gap-2 mb-3">
          <HelpCircle size={isPresentation ? 24 : 18} className="text-amber-400" />
          <span className={`text-amber-400 font-bold uppercase tracking-widest ${isPresentation ? 'text-lg' : 'text-xs'}`}>
            Scenario
          </span>
        </div>
        <p className={`text-gray-200 leading-relaxed ${isPresentation ? 'text-2xl' : 'text-base'}`}>
          {q.scenario}
        </p>
      </div>

      {/* Question */}
      <h3 className={`text-white font-bold mb-6 ${isPresentation ? 'text-3xl mb-8' : 'text-xl'}`}>
        {q.question}
      </h3>

      {/* Options */}
      <div className={`space-y-4 flex-1 ${isPresentation ? 'space-y-6' : ''}`}>
        {q.options.map((option, idx) => {
          const isSelected = selectedAnswer === idx;
          const isCorrect = option.correct;

          return (
            <button
              key={idx}
              onClick={() => handleAnswer(idx)}
              disabled={showFeedback}
              className={`w-full text-left rounded-xl border-2 transition-all ${
                isPresentation ? 'p-6' : 'p-4'
              } ${
                showFeedback
                  ? isCorrect
                    ? 'border-green-500 bg-green-900/30'
                    : isSelected
                      ? 'border-red-500 bg-red-900/30'
                      : 'border-gray-700 bg-gray-900/30 opacity-50'
                  : isSelected
                    ? 'border-amber-500 bg-amber-900/20'
                    : 'border-gray-700 bg-gray-900/50 hover:border-gray-600 hover:bg-gray-800/50'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`flex-shrink-0 ${isPresentation ? 'mt-1' : ''}`}>
                  {showFeedback ? (
                    isCorrect ? (
                      <CheckCircle size={isPresentation ? 28 : 20} className="text-green-400" />
                    ) : isSelected ? (
                      <XCircle size={isPresentation ? 28 : 20} className="text-red-400" />
                    ) : (
                      <div className={`rounded-full border-2 border-gray-600 ${isPresentation ? 'w-7 h-7' : 'w-5 h-5'}`} />
                    )
                  ) : (
                    <div className={`rounded-full border-2 ${isSelected ? 'border-amber-500 bg-amber-500/20' : 'border-gray-600'} ${isPresentation ? 'w-7 h-7' : 'w-5 h-5'}`} />
                  )}
                </div>
                <div className="flex-1">
                  <p className={`font-semibold ${
                    showFeedback
                      ? isCorrect ? 'text-green-300' : isSelected ? 'text-red-300' : 'text-gray-500'
                      : 'text-gray-200'
                  } ${isPresentation ? 'text-xl' : 'text-sm'}`}>
                    {option.text}
                  </p>
                  {showFeedback && isSelected && (
                    <p className={`mt-2 text-gray-400 animate-fadeIn ${isPresentation ? 'text-lg' : 'text-xs'}`}>
                      {option.feedback}
                    </p>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Next Button */}
      {showFeedback && (
        <div className={`flex justify-end mt-6 ${isPresentation ? 'mt-8' : ''}`}>
          <button
            onClick={handleNext}
            className={`flex items-center gap-2 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl transition-all ${
              isPresentation ? 'px-8 py-4 text-xl' : 'px-6 py-3 text-base'
            }`}
          >
            {currentQuestion < questions.length - 1 ? 'Next Question' : 'See Results'}
            <ArrowRight size={isPresentation ? 24 : 18} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Lesson2KnowledgeCheck;

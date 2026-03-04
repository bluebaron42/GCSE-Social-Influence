import React, { useState } from 'react';
import { CheckCircle, XCircle, HelpCircle, ArrowRight } from 'lucide-react';

interface Lesson3KnowledgeCheckProps {
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
    scenario: "Jake is a confident student who always trusts his own judgement. When his friend group all say a particular film is terrible, Jake disagrees and says he enjoyed it.",
    question: "Which dispositional factor best explains Jake's behaviour?",
    options: [
      { text: "External locus of control — he is influenced by outside forces", correct: false, feedback: "An external LOC would make Jake more likely to agree with the group, not less." },
      { text: "Internal locus of control — he takes responsibility for his own opinions", correct: true, feedback: "Correct! Jake's confidence in his own judgement is typical of someone with an internal locus of control. He trusts his own experience over the group." },
      { text: "Authoritarian personality — he respects authority figures", correct: false, feedback: "The authoritarian personality relates to obedience to authority, not resisting peer conformity." }
    ]
  },
  {
    id: 2,
    scenario: "A soldier follows an order from a commanding officer to punish another soldier, even though he feels it is unfair. He later says 'I was just following orders.'",
    question: "How might the authoritarian personality explain this behaviour?",
    options: [
      { text: "The soldier has an internal LOC and made a free choice", correct: false, feedback: "An internal LOC would make him question the order, not blindly follow it." },
      { text: "The soldier likely has an authoritarian personality — he is deeply submissive to authority figures", correct: true, feedback: "Correct! The authoritarian personality involves extreme respect for authority and submissiveness. Elms & Milgram (1966) found that the most obedient participants scored highly on measures of authoritarianism." },
      { text: "The soldier is an expert in military operations", correct: false, feedback: "Expertise would typically reduce conformity/obedience, not increase it." }
    ]
  },
  {
    id: 3,
    scenario: "Dr. Chen is a leading expert on climate science. At a dinner party, several guests express scepticism about climate change. Dr. Chen politely but firmly presents the scientific evidence.",
    question: "Which dispositional factor explains why Dr. Chen resisted conformity?",
    options: [
      { text: "Authoritarian personality — she is rigid in her views", correct: false, feedback: "The authoritarian personality is about obedience to authority, not expertise. Dr. Chen is drawing on knowledge, not blindly following orders." },
      { text: "External locus of control — she feels the science is out of her control", correct: false, feedback: "An external LOC would make her less confident in challenging the group." },
      { text: "Expertise — she has deep knowledge that reduces ISI and gives confidence to resist", correct: true, feedback: "Correct! Dr. Chen's expertise means she doesn't need to look to the group for information (reduced ISI). Experts are less likely to conform in their area of expertise because they have high confidence in their own knowledge." }
    ]
  }
];

const Lesson3KnowledgeCheck: React.FC<Lesson3KnowledgeCheckProps> = ({ isPresentation }) => {
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
          <div className={`font-black text-orange-400 ${isPresentation ? 'text-8xl' : 'text-6xl'}`}>
            {score} / {questions.length}
          </div>
          <p className={`text-gray-300 ${isPresentation ? 'text-2xl' : 'text-lg'}`}>
            {score === questions.length ? "Perfect! You've mastered dispositional factors!" :
             score >= 2 ? "Great work! You understand the key concepts." :
             "Review dispositional factors and try again!"}
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
          className={`bg-orange-600 hover:bg-orange-500 text-white font-bold rounded-xl transition-all ${
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
                idx === currentQuestion ? 'bg-orange-500' : 'bg-gray-700'
              } ${isPresentation ? 'w-4 h-4' : 'w-3 h-3'}`}
            />
          ))}
        </div>
      </div>

      {/* Scenario */}
      <div className={`bg-gray-800/50 border border-gray-700 rounded-xl mb-6 ${isPresentation ? 'p-8 mb-8' : 'p-6'}`}>
        <div className="flex items-center gap-2 mb-3">
          <HelpCircle size={isPresentation ? 24 : 18} className="text-orange-400" />
          <span className={`text-orange-400 font-bold uppercase tracking-widest ${isPresentation ? 'text-lg' : 'text-xs'}`}>
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
                    ? 'border-orange-500 bg-orange-900/20'
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
                    <div className={`rounded-full border-2 ${isSelected ? 'border-orange-500 bg-orange-500/20' : 'border-gray-600'} ${isPresentation ? 'w-7 h-7' : 'w-5 h-5'}`} />
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
            className={`flex items-center gap-2 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded-xl transition-all ${
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

export default Lesson3KnowledgeCheck;

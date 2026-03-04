import React, { useState, useMemo } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

interface UnderstandingCheckQuestion {
  id: number;
  type: 'scenario' | 'matching';
  question: string;
  options?: { text: string; correct: boolean }[];
  items?: { label: string; options: string[]; correct: number }[];
  feedback: string;
}

interface UnderstandingCheckProps {
  questions: UnderstandingCheckQuestion[];
  themeColor: string;
  isPresentation: boolean;
}

const UnderstandingCheck: React.FC<UnderstandingCheckProps> = ({
  questions,
  themeColor,
  isPresentation,
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number | Record<number, number>>>({});
  const [showFeedback, setShowFeedback] = useState(false);

  const shuffleArray = (array: any[]) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Randomize answers on mount
  const randomizedQuestions = useMemo(() => {
    return questions.map((q) => {
      if (q.type === 'scenario' && q.options) {
        return {
          ...q,
          options: shuffleArray(q.options),
        };
      }
      return q;
    });
  }, []);

  const q = randomizedQuestions[currentQuestion];
  const answered = currentQuestion in answers;
  const isCorrect =
    q.type === 'scenario'
      ? q.options?.[answers[currentQuestion] as number]?.correct
      : Object.values(answers[currentQuestion] as Record<number, number>).every(
          (ans, idx) => ans === q.items?.[idx]?.correct
        );

  const handleSelect = (index: number) => {
    if (showFeedback) return;
    setAnswers((prev) => ({ ...prev, [currentQuestion]: index }));
    setShowFeedback(true);
  };

  const handleMatchingSelect = (itemIndex: number, optionIndex: number) => {
    if (showFeedback) return;
    const current = (answers[currentQuestion] as Record<number, number>) || {};
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion]: { ...current, [itemIndex]: optionIndex },
    }));
  };

  const handleNext = () => {
    if (currentQuestion < randomizedQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowFeedback(false);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setShowFeedback(false);
    }
  };

  const themeColorMap: Record<string, string> = {
    cyan: 'from-cyan-600 to-cyan-700',
    amber: 'from-amber-600 to-amber-700',
    orange: 'from-orange-600 to-orange-700',
    red: 'from-red-600 to-red-700',
    yellow: 'from-yellow-600 to-yellow-700',
    teal: 'from-teal-600 to-teal-700',
    purple: 'from-purple-600 to-purple-700',
    blue: 'from-blue-600 to-blue-700',
  };

  const bgGradient = themeColorMap[themeColor] || 'from-blue-600 to-blue-700';

  return (
    <div className={`flex-1 flex flex-col min-h-0 ${isPresentation ? 'p-4' : 'p-2'}`}>
      {/* Question Counter */}
      <div className={`flex-shrink-0 mb-4 flex items-center justify-between ${isPresentation ? 'mb-6' : ''}`}>
        <div className={`text-gray-400 font-mono ${isPresentation ? 'text-xl' : 'text-sm'}`}>
          Question {currentQuestion + 1} / {randomizedQuestions.length}
        </div>
        <div className="flex gap-1">
          {randomizedQuestions.map((_, i) => (
            <div
              key={i}
              className={`h-2 w-2 rounded-full transition-all ${
                i <= currentQuestion
                  ? `bg-gradient-to-r ${bgGradient} shadow-sm`
                  : 'bg-gray-700'
              }`}
            ></div>
          ))}
        </div>
      </div>

      {/* Question Content */}
      <div className={`flex-1 flex flex-col min-h-0 overflow-y-auto ${isPresentation ? 'mb-4' : 'mb-3'}`}>
        <h3
          className={`flex-shrink-0 font-bold text-white mb-4 ${
            isPresentation ? 'text-2xl leading-tight' : 'text-lg'
          }`}
        >
          {q.question}
        </h3>

        {/* Scenario Questions */}
        {q.type === 'scenario' && q.options && (
          <div
            className={`grid grid-cols-1 gap-4 flex-grow ${
              isPresentation ? 'gap-8 grid-cols-1 md:grid-cols-2' : ''
            }`}
          >
            {q.options.map((option, idx) => {
              const isSelected = answers[currentQuestion] === idx;
              const isCorrectOption = option.correct;

              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  disabled={showFeedback}
                  className={`p-6 rounded-xl border-2 transition-all text-left shadow-lg ${
                    isPresentation ? 'p-8' : ''
                  } ${
                    isSelected
                      ? isCorrectOption
                        ? `border-green-500 bg-green-900/30`
                        : `border-red-500 bg-red-900/30`
                      : `border-gray-700 bg-gray-800 hover:border-gray-500 hover:bg-gray-700/50`
                  } ${showFeedback ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <p className={`font-semibold text-white ${isPresentation ? 'text-2xl' : 'text-lg'}`}>
                    {option.text}
                  </p>
                  {showFeedback && isSelected && (
                    <div className={`mt-4 flex items-center gap-2 ${isPresentation ? 'mt-6' : ''}`}>
                      {isCorrectOption ? (
                        <>
                          <CheckCircle size={isPresentation ? 32 : 20} className="text-green-400" />
                          <span className={`text-green-400 font-bold ${isPresentation ? 'text-lg' : ''}`}>
                            Correct!
                          </span>
                        </>
                      ) : (
                        <>
                          <XCircle size={isPresentation ? 32 : 20} className="text-red-400" />
                          <span className={`text-red-400 font-bold ${isPresentation ? 'text-lg' : ''}`}>
                            Incorrect
                          </span>
                        </>
                      )}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* Matching Questions */}
        {q.type === 'matching' && q.items && (
          <div className={`space-y-6 ${isPresentation ? 'space-y-8' : ''}`}>
            {q.items.map((item, itemIdx) => (
              <div key={itemIdx} className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-lg">
                <p className={`font-semibold text-white mb-4 ${isPresentation ? 'text-2xl mb-6' : ''}`}>
                  {item.label}
                </p>
                <div className={`grid grid-cols-1 gap-2 md:grid-cols-3 ${isPresentation ? 'gap-4' : ''}`}>
                  {item.options.map((option, optIdx) => {
                    const isSelected = (answers[currentQuestion] as Record<number, number>)?.[itemIdx] === optIdx;
                    const isCorrectOption = optIdx === item.correct;

                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleMatchingSelect(itemIdx, optIdx)}
                        disabled={showFeedback}
                        className={`p-3 rounded-lg border-2 transition-all text-center ${
                          isPresentation ? 'p-4 text-lg' : 'text-sm'
                        } ${
                          isSelected
                            ? isCorrectOption
                              ? `border-green-500 bg-green-900/30 text-green-300`
                              : `border-red-500 bg-red-900/30 text-red-300`
                            : `border-gray-700 bg-gray-900/50 hover:border-gray-500 text-gray-300`
                        }`}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Feedback */}
      {showFeedback && (
        <div
          className={`bg-gray-800 border border-gray-700 border-l-4 border-l-cyan-500 rounded-xl p-6 mb-8 shadow-lg ${
            isPresentation ? 'p-8 mb-12' : ''
          }`}
        >
          <p className={`text-gray-300 leading-relaxed ${isPresentation ? 'text-xl' : 'text-sm'}`}>
            {q.feedback}
          </p>
        </div>
      )}

      {/* Navigation */}
      <div className={`flex-shrink-0 flex justify-between items-center pt-4 border-t border-gray-700 ${isPresentation ? 'pt-6' : ''}`}>
        <button
          onClick={handlePrev}
          disabled={currentQuestion === 0}
          className={`px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 hover:border-gray-600 transition-all ${
            isPresentation ? 'px-6 py-3 text-lg' : 'text-sm'
          }`}
        >
          ← Previous
        </button>

        {answered ? (
          <button
            onClick={handleNext}
            disabled={currentQuestion === randomizedQuestions.length - 1}
            className={`px-4 py-2 rounded-lg bg-gradient-to-r ${bgGradient} text-white font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all ${
              isPresentation ? 'px-6 py-3 text-lg' : 'text-sm'
            }`}
          >
            {currentQuestion === randomizedQuestions.length - 1 ? 'Complete' : 'Next →'}
          </button>
        ) : (
          <div className={`text-gray-500 font-mono ${isPresentation ? 'text-base' : 'text-xs'}`}>
            Answer to continue
          </div>
        )}
      </div>
    </div>
  );
};

export default UnderstandingCheck;

import React, { useState } from 'react';
import { CheckCircle, XCircle, Eye } from 'lucide-react';
import { Question } from '../types';

interface DoNowQuizProps {
  questions: Question[];
  isPresentation: boolean;
}

const DoNowQuiz: React.FC<DoNowQuizProps> = ({ questions, isPresentation }) => {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [showAnswers, setShowAnswers] = useState(false);

  const handleSelect = (qId: number, optIdx: number) => {
    if (showResults) return;
    setAnswers(prev => ({ ...prev, [qId]: optIdx }));
  };

  const score = Object.keys(answers).filter(id => answers[Number(id)] === questions.find(q => q.id === Number(id))?.correct).length;

  // PRESENTATION MODE: Questions only with reveal answers button
  if (isPresentation) {
    return (
      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
          <div className="space-y-4">
            {questions.map((q, idx) => (
              <div 
                key={q.id} 
                className="bg-gray-800 rounded-xl border border-gray-700 p-6 flex items-start gap-5 shadow-lg"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  {idx + 1}
                </div>
                <div className="flex-grow">
                  <h3 className="font-semibold text-white text-xl leading-relaxed">
                    {q.question}
                  </h3>
                  {showAnswers && (
                    <div className="mt-4 flex items-center gap-3 p-3 bg-green-900/30 border border-green-500/50 rounded-lg">
                      <CheckCircle className="text-green-400 w-6 h-6" />
                      <span className="text-green-300 text-lg font-semibold">
                        {q.options[q.correct]}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex-shrink-0 mt-6 pt-6 border-t border-gray-700 flex justify-center">
          <button
            onClick={() => setShowAnswers(!showAnswers)}
            className={`flex items-center gap-3 font-bold rounded-xl transition-all px-12 py-5 text-xl shadow-lg ${
              showAnswers 
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600 border border-gray-600' 
                : 'bg-gradient-to-r from-cyan-500 to-cyan-600 text-white hover:from-cyan-400 hover:to-cyan-500'
            }`}
          >
            <Eye className="w-7 h-7" />
            {showAnswers ? 'Hide Answers' : 'Reveal All Answers'}
          </button>
        </div>
      </div>
    );
  }

  // NORMAL MODE: Interactive quiz with multiple choice
  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
        <div className="space-y-3">
          {questions.map((q, idx) => (
            <div key={q.id} className="bg-gray-800 rounded-xl border border-gray-700 p-4 shadow-lg">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-semibold text-white text-sm">
                  {idx + 1}. {q.question}
                </h3>
                {showResults && (
                  answers[q.id] === q.correct 
                    ? <CheckCircle className="text-green-400 flex-shrink-0" size={20} />
                    : <XCircle className="text-red-400 flex-shrink-0" size={20} />
                )}
              </div>
              <div className="grid grid-cols-3 gap-2">
                {q.options.map((opt, oIdx) => (
                  <button
                    key={oIdx}
                    onClick={() => handleSelect(q.id, oIdx)}
                    disabled={showResults}
                    className={`text-left rounded-lg transition-all p-3 text-xs font-medium border-2 ${
                      answers[q.id] === oIdx 
                        ? 'bg-cyan-700 text-white border-cyan-600' 
                        : 'bg-gray-900/50 text-gray-300 hover:border-gray-500 border-gray-600'
                    } ${showResults && q.correct === oIdx ? 'border-green-500 bg-green-900/30 text-green-300' : ''}
                      ${showResults && answers[q.id] === oIdx && answers[q.id] !== q.correct ? 'border-red-500 bg-red-900/30 text-red-300' : ''}`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex-shrink-0 mt-4 border-t border-gray-700 pt-4 flex justify-between items-center">
        <div className="font-mono text-gray-400 text-xs">
          {Object.keys(answers).length} / {questions.length} Answered
        </div>
        <button
          onClick={() => setShowResults(true)}
          disabled={Object.keys(answers).length !== questions.length}
          className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-white font-bold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed px-6 py-2 text-sm"
        >
          {showResults ? `Score: ${score}/${questions.length}` : 'Submit Answers'}
        </button>
      </div>
    </div>
  );
};

export default DoNowQuiz;

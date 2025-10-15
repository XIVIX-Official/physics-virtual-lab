import React, { useState } from 'react';
import { getTutorResponse } from '../services/geminiService';
import AITutorIcon from './icons/AITutorIcon';

interface AITutorProps {
  simulationContext: string;
}

const LoadingSpinner: React.FC = () => (
  <div className="flex items-center justify-center space-x-2">
    <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce [animation-delay:-0.3s]"></div>
    <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce [animation-delay:-0.15s]"></div>
    <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce"></div>
  </div>
);

const AITutor: React.FC<AITutorProps> = ({ simulationContext }) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || isLoading) return;

    setIsLoading(true);
    setAnswer('');
    try {
      const response = await getTutorResponse(simulationContext, question);
      setAnswer(response);
    } catch (error) {
      setAnswer('Sorry, I encountered an error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center mb-4">
        <AITutorIcon className="w-8 h-8 text-cyan-400" />
        <h2 className="text-2xl font-bold ml-3 text-cyan-400">AI Physics Tutor</h2>
      </div>
      <p className="text-sm text-gray-400 mb-4">
        Ask a question about the current simulation or any related physics concept.
      </p>
      
      <div className="flex-grow bg-gray-900/50 rounded-lg p-4 border border-gray-700 min-h-[200px] overflow-y-auto">
        {isLoading && (
          <div className="flex items-center space-x-2 text-gray-400">
             <LoadingSpinner />
             <span>Thinking...</span>
          </div>
        )}
        {answer && !isLoading && (
          <div className="prose prose-invert prose-sm max-w-none text-gray-200">
             {answer.split('\n').map((paragraph, index) => (
                paragraph.trim() && <p key={index}>{paragraph}</p>
             ))}
          </div>
        )}
        {!answer && !isLoading && (
            <p className="text-gray-500 text-center mt-8">Ask me anything!</p>
        )}
      </div>

      <form onSubmit={handleSubmit} className="mt-4">
        <div className="flex items-center bg-gray-700 rounded-lg focus-within:ring-2 focus-within:ring-cyan-500">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="e.g., How does length affect the period?"
            disabled={isLoading}
            className="w-full bg-transparent p-3 focus:outline-none text-gray-200 placeholder-gray-500"
          />
          <button
            type="submit"
            disabled={isLoading || !question.trim()}
            className="p-3 text-cyan-400 hover:text-cyan-300 disabled:text-gray-500 disabled:cursor-not-allowed transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AITutor;

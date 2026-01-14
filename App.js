import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { GoogleGenerativeAI } from '@google/genai';

// 1. Define App States
const STATES = {
  FORM: 'FORM',
  INITIALIZING: 'INITIALIZING',
  RESPONSE: 'RESPONSE'
};

function App() {
  const [state, setState] = useState(STATES.FORM);
  const [direction, setDirection] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (formData) => {
    setState(STATES.INITIALIZING);
    setError(null);
    
    try {
      // 2. Initialize Gemini (Ensure VITE_GEMINI_API_KEY is in Vercel)
      const API_KEY = import.meta.env?.VITE_GEMINI_API_KEY || "";
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `Act as a Creative Director. Provide a creative vision for: ${JSON.stringify(formData)}`;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      
      setDirection(response.text());
      setState(STATES.RESPONSE);
    } catch (err) {
      console.error(err);
      setError("Failed to synthesize vision. Please check your API key.");
      setState(STATES.FORM);
    }
  };

  const handleReset = () => {
    setState(STATES.FORM);
    setDirection(null);
  };

  return (
    <div className="relative flex flex-col w-full max-w-md mx-auto min-h-screen bg-slate-900 shadow-2xl overflow-hidden font-sans text-white">
      
      {/* Loading Overlay */}
      {state === STATES.INITIALIZING && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
        </div>
      )}

      {/* Header Section */}
      <div className="relative w-full px-6 pt-12 pb-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/10 mb-6">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          <span className="text-[10px] font-bold tracking-widest uppercase">
            {state === STATES.RESPONSE ? 'Vision Synthesized' : 'Open for Collaboration'}
          </span>
        </div>

        <h1 className="text-4xl font-bold leading-tight mb-3">
          {state === STATES.RESPONSE ? 'Your New ' : "Let's Build "} <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            {state === STATES.RESPONSE ? 'Vision.' : 'The Future.'}
          </span>
        </h1>
      </div>

      <main className="relative z-20 px-6 pb-8 flex-1">
        {error && (
          <div className="bg-red-500/20 border border-red-500/50 text-red-200 text-xs p-3 rounded-lg mb-4 text-center">
            {error}
          </div>
        )}

        {state === STATES.FORM && (
          <div className="space-y-4">
            <p className="text-gray-400 text-sm">Describe your project brief below:</p>
            <textarea 
              id="brief"
              className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm focus:ring-2 focus:ring-blue-500 outline-none h-32"
              placeholder="Enter your project details..."
            ></textarea>
            <button 
              onClick={() => handleSubmit(document.getElementById('brief').value)}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl transition-all"
            >
              Synthesize Direction
            </button>
          </div>
        )}

        {state === STATES.RESPONSE && (
          <div className="space-y-4">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-sm leading-relaxed text-gray-300 whitespace-pre-wrap">
              {direction}
            </div>
            <button 
              onClick={handleReset}
              className="w-full bg-white/10 hover:bg-white/20 text-white font-bold py-3 rounded-xl transition-all"
            >
              Start New Brief
            </button>
          </div>
        )}
      </main>

      <footer className="mt-auto border-t border-white/5 p-6 opacity-50">
        <span className="text-[10px] uppercase tracking-widest">© 2024 AI Creative Director</span>
      </footer>
    </div>
  );
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);

import React from 'react';
import { createRoot } from 'react-dom/client';
import * as GoogleAI from '@google/genai';

// 1. Bulletproof API Key detection
// This checks both Vite-style and standard global-style definitions
const API_KEY = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_GEMINI_API_KEY) 
                 || window._env_?.VITE_GEMINI_API_KEY 
                 || ""; 

// 2. Initialize the AI
const genAI = new GoogleAI.GoogleGenerativeAI(API_KEY);

function App() {
  const [status, setStatus] = React.useState("System Ready");

  // Simple test to see if the API Key is actually working
  const testConnection = async () => {
    if (!API_KEY) {
      setStatus("Error: No API Key found in Vercel settings!");
      return;
    }
    
    try {
      setStatus("Connecting to Gemini...");
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent("Hello!");
      const response = await result.response;
      setStatus("Connection Successful: " + response.text().substring(0, 20) + "...");
    } catch (err) {
      setStatus("Connection Failed: " + err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white bg-black p-4 font-sans">
      <div className="w-full max-w-md p-8 border border-blue-500/30 rounded-2xl bg-slate-900/50 backdrop-blur-xl shadow-[0_0_30px_rgba(59,130,246,0.2)]">
        <h1 className="text-4xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-2">
          OMNI-X
        </h1>
        <div className="h-1 w-20 bg-blue-500 mb-6"></div>
        
        <p className="text-gray-400 text-sm mb-8 leading-relaxed">
          AI-driven creative direction initialized. The system is ready for vision synthesis.
        </p>

        <div className="space-y-4">
          <div className="p-4 bg-black/40 border border-white/5 rounded-lg">
            <p className="text-[10px] uppercase tracking-widest text-blue-400 mb-1">Status</p>
            <p className="text-sm font-mono">{status}</p>
          </div>

          <button 
            onClick={testConnection}
            className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-500 transition-colors rounded-xl font-bold text-sm shadow-lg shadow-blue-900/20"
          >
            Test AI Connection
          </button>
        </div>
      </div>
      
      <footer className="mt-8 opacity-30 text-[10px] uppercase tracking-[0.3em]">
        © 2026 OMNI-X TERMINAL
      </footer>
    </div>
  );
}

// 3. Render the App
const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<App />);
}

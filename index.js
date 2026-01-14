import React from 'react';
import { createRoot } from 'react-dom/client';
// 1. Use the Namespace Import to avoid "export not found" errors
import * as GoogleAI from '@google/genai';

// 2. Access the API key safely from Vercel/Vite environment
const API_KEY = import.meta.env?.VITE_GEMINI_API_KEY || ""; 

// 3. Initialize the AI using the Namespace reference
// This ensures that even if the library structure changes, your code finds the class
const genAI = new GoogleAI.GoogleGenerativeAI(API_KEY);

function App() {
  return (
    <div className="flex items-center justify-center min-h-screen text-white bg-black">
      <div className="p-8 border border-blue-500 rounded-lg shadow-[0_0_20px_rgba(59,130,246,0.3)]">
        <h1 className="text-3xl font-bold text-blue-400">Omni-X is Live</h1>
        <p className="mt-2 text-gray-400 font-mono">System Status: <span className="text-green-400">Ready</span></p>
        
        {!API_KEY && (
          <p className="mt-4 text-red-400 text-xs italic">
            Warning: API Key missing in Vercel settings.
          </p>
        )}
      </div>
    </div>
  );
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);

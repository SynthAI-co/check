 import React from 'react';
import { createRoot } from 'react-dom/client';
import { GoogleGenerativeAI } from '@google/genai'; // Correct class name

// Ensure your key is named VITE_GEMINI_API_KEY in Vercel settings
const API_KEY = import.meta.env?.VITE_GEMINI_API_KEY || ""; 
const genAI = new GoogleGenerativeAI(API_KEY);

function App() {
  return (
    <div className="flex items-center justify-center min-h-screen text-white bg-black">
      <div className="p-8 border border-blue-500 rounded-lg">
        <h1 className="text-3xl font-bold text-blue-400">Omni-X is Live</h1>
        <p className="mt-2 text-gray-400">System Ready.</p>
      </div>
    </div>
  );
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);

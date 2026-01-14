import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { GoogleGenerativeAI } from '@google/genai';

// Vercel will inject this value from your Project Settings
const API_KEY = import.meta.env?.VITE_GEMINI_API_KEY || ""; 
const genAI = new GoogleGenerativeAI(API_KEY);

function App() {
  const [status, setStatus] = useState("Initializing AI...");

  useEffect(() => {
    async function testAI() {
      if (!API_KEY) {
        setStatus("Error: API Key missing in Vercel settings.");
        return;
      }
      try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent("Hello! Confirming system start.");
        const response = await result.response;
        console.log("AI Response:", response.text());
        setStatus("AI Online: System Ready.");
      } catch (error) {
        console.error("AI Error:", error);
        setStatus("AI Initialization Failed. Check Console.");
      }
    }
    testAI();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen text-white">
      <div className="p-8 border border-blue-500 rounded-lg bg-gray-900 shadow-2xl">
        <h1 className="text-3xl font-extrabold text-blue-400 mb-4">Omni-X</h1>
        <p className="text-lg text-gray-400">Status: <span className="text-green-400">{status}</span></p>
      </div>
    </div>
  );
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);

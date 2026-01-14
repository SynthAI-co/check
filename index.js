import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { GoogleGenerativeAI } from '@google/genai';

// In Vercel, use import.meta.env for browser-side variables
const API_KEY = import.meta.env?.VITE_GEMINI_API_KEY || ""; 
const genAI = new GoogleGenerativeAI(API_KEY);

function App() {
  const [msg, setMsg] = useState("Checking AI...");

  useEffect(() => {
    async function init() {
      try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const res = await model.generateContent("Hello!");
        setMsg("AI Response: " + (await res.response).text());
      } catch (err) {
        setMsg("Error: " + err.message);
      }
    }
    if (API_KEY) init();
    else setMsg("API Key not found in Vercel settings.");
  }, []);

  return (
    <div className="p-10 bg-black min-h-screen text-blue-400">
      <h1 className="text-3xl font-bold">Omni-X</h1>
      <p className="mt-4">{msg}</p>
    </div>
  );
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);

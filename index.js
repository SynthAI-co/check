import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

// Use the key you set in Vercel
const API_KEY = import.meta.env?.VITE_GEMINI_API_KEY || "";

function App() {
  const [response, setResponse] = useState("System Standby");
  const [loading, setLoading] = useState(false);

  const runAI = async () => {
    if (!API_KEY) {
      setResponse("Error: No API Key found in Vercel settings.");
      return;
    }

    setLoading(true);
    setResponse("Synthesizing...");

    try {
      // Direct API URL for Gemini 1.5 Flash
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: "Give me a 5-word creative vision statement." }] }]
        })
      });

      const data = await res.json();
      
      if (data.error) {
        throw new Error(data.error.message);
      }

      const aiText = data.candidates[0].content.parts[0].text;
      setResponse(aiText);
    } catch (err) {
      setResponse("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-950">
      <div className="max-w-sm w-full p-8 border border-blue-500/30 rounded-3xl bg-black shadow-2xl">
        <h1 className="text-2xl font-black text-blue-400 tracking-tighter mb-4">OMNI-X</h1>
        
        <div className="bg-slate-900/50 p-6 rounded-xl mb-6 min-h-[100px] flex items-center justify-center border border-white/5">
          <p className="text-sm font-mono text-blue-100 italic leading-relaxed text-center">
            {response}
          </p>
        </div>

        <button 
          onClick={runAI}
          disabled={loading}
          className={`w-full py-4 rounded-2xl font-bold transition-all ${
            loading ? 'bg-blue-900 text-blue-300' : 'bg-blue-600 hover:bg-blue-500 text-white'
          }`}
        >
          {loading ? "PROCESSING..." : "GENERATE VISION"}
        </button>
      </div>
    </div>
  );
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);

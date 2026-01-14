import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

// 1. No @google/genai import here! 
// We use the built-in 'fetch' instead.

const API_KEY = import.meta.env?.VITE_GEMINI_API_KEY || "";

function App() {
  const [response, setResponse] = useState("System Ready");
  const [loading, setLoading] = useState(false);

  const runAI = async () => {
    if (!API_KEY) {
      setResponse("Error: API Key missing in Vercel settings.");
      return;
    }

    setLoading(true);
    setResponse("Connecting to Satellite...");

    try {
      // 2. Direct API call to Google's servers
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: "Write a 5-word futuristic vision statement for a tech company." }] }]
        })
      });

      const data = await res.json();
      
      if (data.error) throw new Error(data.error.message);

      const aiText = data.candidates[0].content.parts[0].text;
      setResponse(aiText);
    } catch (err) {
      setResponse("Connection Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <div className="w-full max-w-sm p-8 rounded-3xl border border-blue-500/20 bg-slate-900/50 backdrop-blur-md">
        <h1 className="text-3xl font-black text-blue-500 tracking-tighter mb-6">OMNI-X</h1>
        
        <div className="mb-6 p-4 bg-black/50 rounded-xl border border-white/5 min-h-[100px] flex items-center justify-center">
          <p className="text-sm text-blue-100 font-mono text-center leading-relaxed">
            {response}
          </p>
        </div>

        <button 
          onClick={runAI}
          disabled={loading}
          className={`w-full py-4 rounded-2xl font-bold transition-all ${
            loading ? 'bg-blue-900 text-blue-400 opacity-50' : 'bg-blue-600 hover:bg-blue-500 text-white active:scale-95'
          }`}
        >
          {loading ? "INITIALIZING..." : "GENERATE VISION"}
        </button>
      </div>
    </div>
  );
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);

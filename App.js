
import React, { useState } from 'react';
import { AppState, CollaborationRequest, CreativeDirection } from './types';
import { getCreativeDirection } from './services/geminiService';
import CollaborationForm from './components/CollaborationForm';
import ResponseView from './components/ResponseView';
import LoadingOverlay from './components/LoadingOverlay';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(AppState.FORM);
  const [formData, setFormData] = useState<CollaborationRequest | null>(null);
  const [direction, setDirection] = useState<CreativeDirection | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: CollaborationRequest) => {
    setFormData(data);
    setState(AppState.INITIALIZING);
    setError(null);
    
    try {
      const result = await getCreativeDirection(data);
      setDirection(result);
      setState(AppState.RESPONSE);
    } catch (err) {
      console.error(err);
      setError("Failed to synthesize vision. Please try again.");
      setState(AppState.FORM);
    }
  };

  const handleReset = () => {
    setState(AppState.FORM);
    setDirection(null);
  };

  return (
    <div className="relative flex flex-col w-full max-w-md mx-auto min-h-screen bg-background-light dark:bg-background-dark shadow-2xl overflow-hidden font-display">
      
      {state === AppState.INITIALIZING && <LoadingOverlay />}

      {/* Header Section (Always visible or slightly changed) */}
      <div className="relative w-full">
        <div className="absolute inset-0 h-72 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background-dark/80 to-background-dark z-10"></div>
          <div className="absolute inset-0 bg-primary/10 mix-blend-overlay z-10"></div>
          <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-60"></div>
        </div>

        <div className="relative z-20 px-6 pt-12 pb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/30 backdrop-blur-md border border-white/10 mb-6 shadow-[0_0_10px_rgba(255,215,0,0.1)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-[10px] font-bold text-white/90 tracking-widest uppercase font-display">
              {state === AppState.RESPONSE ? 'Vision Synthesized' : 'Open for Collaboration'}
            </span>
          </div>

          {state === AppState.RESPONSE ? (
            <h1 className="text-white text-4xl font-bold leading-[1.1] tracking-tight mb-3">
              Your New <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-300 drop-shadow-[0_0_10px_rgba(242,13,166,0.3)]">Vision.</span>
            </h1>
          ) : (
            <h1 className="text-white text-4xl font-bold leading-[1.1] tracking-tight mb-3">
              Let's Build <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-300 drop-shadow-[0_0_10px_rgba(242,13,166,0.3)]">The Future.</span>
            </h1>
          )}
          
          <p className="text-gray-400 text-sm font-normal leading-relaxed max-w-[90%]">
            {state === AppState.RESPONSE 
              ? "The AI Creative Director has analyzed your brief and synthesized a strategic direction."
              : "AI-driven creative direction for your next big project. Synthesize your vision into reality."}
          </p>
        </div>
      </div>

      <main className="relative z-20 px-4 pb-8 flex-1 flex flex-col">
        {error && (
          <div className="bg-red-500/20 border border-red-500/50 text-red-200 text-xs p-3 rounded-lg mb-4 text-center">
            {error}
          </div>
        )}

        {state === AppState.FORM && (
          <CollaborationForm onSubmit={handleSubmit} />
        )}

        {state === AppState.RESPONSE && direction && (
          <ResponseView direction={direction} onBack={handleReset} />
        )}
      </main>

      {/* Trust Badges - only on form screen for focus */}
      {state === AppState.FORM && (
        <div className="px-6 pb-8">
          <p className="text-center text-[10px] text-gray-500 uppercase tracking-[0.2em] mb-4">Trusted by innovative teams</p>
          <div className="flex justify-between items-center opacity-40 hover:opacity-100 transition-opacity duration-500 px-4">
            <span className="material-symbols-outlined text-3xl text-white">change_history</span>
            <span className="material-symbols-outlined text-3xl text-white">all_inclusive</span>
            <span className="material-symbols-outlined text-3xl text-white">diamond</span>
            <span className="material-symbols-outlined text-3xl text-white">join_right</span>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-auto border-t border-white/5 bg-background-dark/50 backdrop-blur-md">
        <div className="flex justify-between items-center px-6 py-4">
          <span className="text-[10px] text-gray-600 font-display">© 2024 AI Creative Director</span>
          <div className="flex gap-4">
            <button className="text-gray-500 hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-lg">public</span>
            </button>
            <button className="text-gray-500 hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-lg">share</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;

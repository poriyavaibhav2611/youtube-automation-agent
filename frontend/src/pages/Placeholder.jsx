import React from 'react';
import { useLocation } from 'react-router-dom';
import { Clock } from 'lucide-react';

const Placeholder = () => {
  const location = useLocation();
  const pathName = location.pathname.substring(1) || 'This module';

  return (
    <div className="p-8 bg-[#0a0a0a] min-h-screen text-white font-sans flex flex-col items-center justify-center">
      <div className="bg-[#141414] border border-[#262626] rounded-3xl p-10 max-w-lg w-full text-center shadow-2xl relative overflow-hidden">
        {/* Subtle glow */}
        <div className="absolute top-[-20%] left-[50%] translate-x-[-50%] w-[200px] h-[200px] rounded-full bg-purple-600/20 blur-[80px] pointer-events-none"></div>
        
        <div className="flex justify-center mb-6 relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
            <Clock size={32} className="text-purple-400" />
          </div>
        </div>
        
        <h2 className="text-3xl font-bold text-white mb-3 capitalize relative z-10 tracking-tight">
          {pathName.replace('/', ' ')}
        </h2>
        
        <p className="text-gray-400 font-medium mb-8 relative z-10 text-sm">
          This module is currently under development. Stay tuned for updates!
        </p>

        <button 
          onClick={() => window.history.back()}
          className="relative z-10 px-6 py-2.5 rounded-lg text-sm font-semibold text-white bg-white/10 hover:bg-white/20 transition-colors border border-white/5"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default Placeholder;

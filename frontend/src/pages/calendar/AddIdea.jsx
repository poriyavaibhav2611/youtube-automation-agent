import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronDown } from 'lucide-react';

const AddIdea = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full w-full font-sans bg-[#101010] text-white overflow-hidden">
      
      {/* Header */}
      <div className="shrink-0 z-10 bg-[#161616] border-b border-[#2e2e32] px-8 py-5 flex items-center gap-6">
        <button 
          onClick={() => navigate('/calendar')} 
          className="p-1.5 hover:bg-[#27272a] rounded-lg transition-colors group"
        >
          <ArrowLeft size={18} className="text-[#a1a1aa] group-hover:text-white transition-colors" />
        </button>
        <div>
          <h3 className="text-[11px] font-bold text-[#d4ff32] uppercase tracking-[0.15em] mb-1">
            BACKLOG
          </h3>
          <h1 className="text-[26px] font-semibold tracking-tight text-white">
            Add a content idea
          </h1>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-8 flex justify-center">
        
        <div className="w-full max-w-2xl bg-[#161616] border border-[#262626] rounded-xl p-8 shadow-sm h-fit">
          <div className="flex flex-col gap-6">
            
            {/* Topic */}
            <div>
              <label className="block text-[13px] font-semibold text-white mb-2">Topic</label>
              <input 
                type="text" 
                className="w-full bg-[#0a0a0a] border border-[#2e2e32] rounded-md px-3 py-2.5 text-[13px] text-white focus:border-[#a1a1aa] focus:ring-1 focus:ring-[#a1a1aa] outline-none transition-all shadow-sm" 
              />
            </div>
            
            {/* Angle */}
            <div>
              <label className="block text-[13px] font-semibold text-white mb-2">Angle</label>
              <textarea 
                rows="3" 
                placeholder="What makes this take distinctive?" 
                className="w-full bg-[#0a0a0a] border border-[#2e2e32] rounded-md px-3 py-2.5 text-[13px] text-white placeholder-[#52525b] focus:border-[#a1a1aa] focus:ring-1 focus:ring-[#a1a1aa] outline-none transition-all resize-none shadow-sm"
              ></textarea>
            </div>

            {/* Why it is worth making */}
            <div>
              <label className="block text-[13px] font-semibold text-white mb-2">Why it is worth making</label>
              <textarea 
                rows="3" 
                className="w-full bg-[#0a0a0a] border border-[#2e2e32] rounded-md px-3 py-2.5 text-[13px] text-white focus:border-[#a1a1aa] focus:ring-1 focus:ring-[#a1a1aa] outline-none transition-all resize-none shadow-sm"
              ></textarea>
            </div>

            {/* Format */}
            <div>
              <label className="block text-[13px] font-semibold text-white mb-2">Format</label>
              <div className="relative">
                <select className="w-full bg-[#0a0a0a] border border-[#2e2e32] rounded-md px-3 py-2.5 text-[13px] text-white focus:border-[#a1a1aa] focus:ring-1 focus:ring-[#a1a1aa] outline-none transition-all appearance-none shadow-sm cursor-pointer">
                  <option>Explainer</option>
                  <option>Tutorial</option>
                  <option>Review</option>
                  <option>Vlog</option>
                  <option>Documentary</option>
                </select>
                <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                  <ChevronDown size={14} className="text-[#a1a1aa]" />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4 mt-4 pt-2">
              <button 
                onClick={() => navigate('/calendar')}
                className="bg-[#d4ff32] hover:bg-[#bce628] text-black text-[13px] font-semibold px-4 py-2.5 rounded-xl transition-colors shadow-sm"
              >
                Add to backlog
              </button>
              <button 
                onClick={() => navigate('/calendar')}
                className="text-[#a1a1aa] hover:text-white text-[13px] font-medium px-4 py-2.5 rounded-xl hover:bg-[#1c1c1c] transition-colors"
              >
                Cancel
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default AddIdea;

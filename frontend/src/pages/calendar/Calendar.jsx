import React, { useState } from 'react';
import { Search, RefreshCw, Plus, Crosshair, X, ChevronDown } from 'lucide-react';
import Select from '../../components/ui/Select';
import ProfileMenu from '../../components/shared/ProfileMenu';
import Header from '../../components/shared/Header';

const Calendar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [format, setFormat] = useState('Explainer');

  return (
    <div className="flex flex-col h-full w-full font-sans bg-[#101010] text-white relative">
      
            <Header 
        subtitle="EDITORIAL PLANNING"
        title="Plan before you generate."
        refreshId="calendar-refresh-icon"
      />

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-8">
        
        {/* Page Title & Actions */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight mb-1">Calendar & idea backlog</h2>
            <p className="text-[13px] text-[#a1a1aa]">Shape the queue before generation starts.</p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-[#1c1c1c] hover:bg-[#27272a] border border-[#2e2e32] transition-colors px-3 py-2 rounded-md text-[13px] font-medium text-white shadow-sm"
          >
            <Plus size={14} className="text-[#a1a1aa]" /> Add idea
          </button>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Scheduled Column */}
          <div className="flex flex-col">
            <div className="mb-4">
              <h3 className="text-[10px] font-bold text-[#d4ff32] uppercase tracking-[0.1em] mb-1">
                SCHEDULED
              </h3>
              <h2 className="text-[16px] font-semibold text-white tracking-tight">Upcoming releases</h2>
            </div>
            
            <div className="bg-[#161616] border border-[#262626] rounded-xl p-8 flex-1 min-h-[300px] flex flex-col items-center justify-center text-center shadow-sm">
              <div className="w-10 h-10 rounded-full bg-[#1c1c1c] border border-[#2e2e32] flex items-center justify-center mb-4">
                <Crosshair size={14} className="text-[#71717a]" />
              </div>
              <p className="text-[13px] text-[#a1a1aa] font-medium">No approved videos are scheduled.</p>
            </div>
          </div>

          {/* Backlog Column */}
          <div className="flex flex-col">
            <div className="mb-4">
              <h3 className="text-[10px] font-bold text-[#d4ff32] uppercase tracking-[0.1em] mb-1">
                BACKLOG
              </h3>
              <h2 className="text-[16px] font-semibold text-white tracking-tight">Content ideas</h2>
            </div>
            
            <div className="bg-[#161616] border border-[#262626] rounded-xl p-8 flex-1 min-h-[300px] flex flex-col items-center justify-center text-center shadow-sm">
              <div className="w-10 h-10 rounded-full bg-[#1c1c1c] border border-[#2e2e32] flex items-center justify-center mb-4">
                <Crosshair size={14} className="text-[#71717a]" />
              </div>
              <p className="text-[13px] text-[#a1a1aa] font-medium">Add promising topics here before spending generation credits.</p>
            </div>
          </div>
          
        </div>
      </div>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg bg-[#161616] border border-[#262626] rounded-2xl shadow-2xl overflow-visible flex flex-col relative animate-in fade-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="px-8 pt-8 pb-4 relative">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 p-1.5 bg-[#1c1c1c] border border-[#2e2e32] text-[#a1a1aa] hover:text-white rounded-md transition-colors"
              >
                <X size={14} />
              </button>
              <h3 className="text-[10px] font-bold text-[#d4ff32] uppercase tracking-[0.15em] mb-1.5">
                BACKLOG
              </h3>
              <h2 className="text-[22px] font-semibold text-white tracking-tight">
                Add a content idea
              </h2>
            </div>

            {/* Modal Body */}
            <div className="px-8 pb-8 flex flex-col gap-5">
              {/* Topic */}
              <div>
                <label className="block text-[12px] font-semibold text-white mb-2">Topic</label>
                <input 
                  type="text" 
                  className="w-full bg-[#0a0a0a] border border-[#2e2e32] rounded-md px-3 py-2 text-[13px] text-white focus:border-[#a1a1aa] focus:ring-1 focus:ring-[#a1a1aa] outline-none transition-all shadow-sm" 
                />
              </div>
              
              {/* Angle */}
              <div>
                <label className="block text-[12px] font-semibold text-white mb-2">Angle</label>
                <textarea 
                  rows="3" 
                  placeholder="What makes this take distinctive?" 
                  className="w-full bg-[#0a0a0a] border border-[#2e2e32] rounded-md px-3 py-2 text-[13px] text-white placeholder-[#52525b] focus:border-[#a1a1aa] focus:ring-1 focus:ring-[#a1a1aa] outline-none transition-all resize-none shadow-sm"
                ></textarea>
              </div>

              {/* Why it is worth making */}
              <div>
                <label className="block text-[12px] font-semibold text-white mb-2">Why it is worth making</label>
                <textarea 
                  rows="3" 
                  className="w-full bg-[#0a0a0a] border border-[#2e2e32] rounded-md px-3 py-2 text-[13px] text-white focus:border-[#a1a1aa] focus:ring-1 focus:ring-[#a1a1aa] outline-none transition-all resize-none shadow-sm"
                ></textarea>
              </div>

              {/* Format */}
              <div>
                <label className="block text-[12px] font-semibold text-white mb-2">Format</label>
                <Select 
                  options={['Explainer', 'Tutorial', 'Review', 'Vlog', 'Documentary']} 
                  value={format}
                  onChange={setFormat}
                />
              </div>

              {/* Actions */}
              <div className="flex items-center gap-4 mt-2">
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="bg-[#d4ff32] hover:bg-[#bce628] text-black text-[13px] font-semibold px-4 py-2.5 rounded-xl transition-colors shadow-sm shadow-[#d4ff32]/10"
                >
                  Add to backlog
                </button>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="bg-[#1c1c1c] border border-[#2e2e32] text-[#a1a1aa] hover:text-white text-[13px] font-medium px-4 py-2.5 rounded-xl hover:bg-[#27272a] transition-colors shadow-sm"
                >
                  Cancel
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default Calendar;

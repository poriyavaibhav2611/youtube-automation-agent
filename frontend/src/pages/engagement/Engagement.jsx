import React, { useState } from 'react';
import { Search, RefreshCw, Crosshair } from 'lucide-react';
import Select from '../../components/ui/Select';

const Engagement = () => {
  const [syncedVariant, setSyncedVariant] = useState('No synced videos yet');

  return (
    <div className="flex flex-col h-full w-full font-sans bg-[#101010] text-white relative">
      
      {/* Static Header */}
      <div className="shrink-0 z-10 bg-[#161616] border-b border-[#2e2e32] px-8 py-5 flex justify-between items-center">
        <div>
          <h3 className="text-[11px] font-bold text-[#d4ff32] uppercase tracking-[0.15em] mb-1">
            AUDIENCE ENGAGEMENT
          </h3>
          <h1 className="text-[26px] font-semibold tracking-tight text-white">
            Talk with the people watching.
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center bg-[#1c1c1c] border border-[#2e2e32] rounded-md px-3 py-2 w-64 focus-within:border-[#a1a1aa] focus-within:ring-1 focus-within:ring-[#a1a1aa] transition-all shadow-sm">
            <Search size={14} className="text-[#71717a] mr-2" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="bg-transparent border-none outline-none text-[13px] text-white w-full placeholder-[#52525b]" 
            />
            <div className="flex items-center gap-1 text-[#71717a] ml-2">
              <span className="text-[10px] bg-[#27272a] rounded px-1.5 py-0.5 border border-[#3f3f46]">⌘</span>
              <span className="text-[10px] bg-[#27272a] rounded px-1.5 py-0.5 border border-[#3f3f46]">K</span>
            </div>
          </div>
          <button 
            onClick={() => {
              const btn = document.getElementById('engagement-refresh-icon');
              if(btn) btn.classList.add('animate-spin');
              setTimeout(() => {
                if(btn) btn.classList.remove('animate-spin');
              }, 1000);
            }}
            className="p-2 bg-[#1c1c1c] border border-[#2e2e32] rounded-md hover:bg-[#27272a] transition-colors shadow-sm"
          >
            <RefreshCw id="engagement-refresh-icon" size={14} className="text-[#a1a1aa]" />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-8 w-full">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          
          {/* Audience Voice */}
          <div className="flex flex-col">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="text-[10px] font-bold text-[#d4ff32] uppercase tracking-[0.1em] mb-1">AUDIENCE VOICE</h3>
                <h2 className="text-[20px] font-bold text-white tracking-tight">What commenters are saying</h2>
              </div>
              <span className="bg-[#1c1c1c] border border-[#2e2e32] text-[#d4ff32] text-[10px] font-bold uppercase px-2 py-1 rounded">POSTING LOCKED</span>
            </div>
            <p className="text-[13px] text-[#a1a1aa] mb-5 leading-relaxed pr-8">
              Comments are fetched read-only from YouTube. Replies post only after operator approval, and fallback analysis never proposes drafts or ideas.
            </p>
            
            <div className="bg-[#161616] border border-[#262626] rounded-xl overflow-visible shadow-sm flex-1 flex flex-col">
              <div className="p-6 pb-0 flex items-center gap-3">
                <div className="flex-1">
                  <Select options={['No synced videos yet']} value={syncedVariant} onChange={setSyncedVariant} />
                </div>
                <button className="bg-[#1c1c1c] border border-[#2e2e32] text-[#a1a1aa] hover:text-white px-4 py-[9px] rounded-md text-[13px] font-medium transition-colors">
                  Sync now
                </button>
              </div>
              <div className="flex-1 flex flex-col items-center justify-center p-8 mt-6 text-center bg-[#101010]/50 min-h-[160px] rounded-b-xl">
                <div className="w-8 h-8 rounded-full bg-[#1c1c1c] border border-[#2e2e32] flex items-center justify-center mb-3">
                  <Crosshair size={14} className="text-[#71717a]" />
                </div>
                <p className="text-[13px] text-[#a1a1aa] font-medium">Comments appear after a published video is synced.</p>
              </div>
            </div>
          </div>

          {/* Reply Queue */}
          <div className="flex flex-col">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-[10px] font-bold text-[#d4ff32] uppercase tracking-[0.1em] mb-1">REPLY QUEUE</h3>
                <h2 className="text-[20px] font-bold text-white tracking-tight">Approve before anything posts</h2>
              </div>
              <span className="bg-[#1c1c1c] border border-[#2e2e32] text-[#a1a1aa] text-[10px] font-bold uppercase px-2 py-1 rounded">0 DRAFTS</span>
            </div>
            
            <div className="bg-[#161616] border border-[#262626] rounded-xl overflow-hidden shadow-sm flex-1 flex flex-col">
              <div className="px-6 pt-5 border-b border-[#262626]">
                <div className="flex items-center gap-6">
                  <button className="text-white text-[13px] font-medium pb-4 border-b-2 border-white">Draft replies</button>
                </div>
              </div>
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-[#101010]/50 min-h-[160px]">
                <div className="w-8 h-8 rounded-full bg-[#1c1c1c] border border-[#2e2e32] flex items-center justify-center mb-3">
                  <Crosshair size={14} className="text-[#71717a]" />
                </div>
                <p className="text-[13px] text-[#a1a1aa] font-medium">Draft replies from a synced video to review them here.</p>
              </div>
            </div>
          </div>

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          
          {/* Needs Attention */}
          <div className="flex flex-col">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-[10px] font-bold text-[#d4ff32] uppercase tracking-[0.1em] mb-1">NEEDS ATTENTION</h3>
                <h2 className="text-[20px] font-bold text-white tracking-tight">Likely spam and scams</h2>
              </div>
              <span className="bg-[#1c1c1c] border border-[#2e2e32] text-amber-500 text-[10px] font-bold uppercase px-2 py-1 rounded">0 FLAGGED</span>
            </div>
            
            <div className="bg-[#161616] border border-[#262626] rounded-xl overflow-hidden shadow-sm flex-1 flex flex-col">
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-[#101010]/50 min-h-[160px]">
                <div className="w-8 h-8 rounded-full bg-[#1c1c1c] border border-[#2e2e32] flex items-center justify-center mb-3">
                  <Crosshair size={14} className="text-[#71717a]" />
                </div>
                <p className="text-[13px] text-[#a1a1aa] font-medium">Nothing flagged as spam, scam, or toxic.</p>
              </div>
            </div>
          </div>

          {/* Audience-Requested Ideas */}
          <div className="flex flex-col">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-[10px] font-bold text-[#d4ff32] uppercase tracking-[0.1em] mb-1">AUDIENCE-REQUESTED IDEAS</h3>
                <h2 className="text-[20px] font-bold text-white tracking-tight">Approve to feed the operator</h2>
              </div>
              <span className="bg-[#1c1c1c] border border-[#2e2e32] text-[#a1a1aa] text-[10px] font-bold uppercase px-2 py-1 rounded">0 PENDING</span>
            </div>
            
            <div className="bg-[#161616] border border-[#262626] rounded-xl overflow-hidden shadow-sm flex-1 flex flex-col">
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-[#101010]/50 min-h-[160px]">
                <div className="w-8 h-8 rounded-full bg-[#1c1c1c] border border-[#2e2e32] flex items-center justify-center mb-3">
                  <Crosshair size={14} className="text-[#71717a]" />
                </div>
                <p className="text-[13px] text-[#a1a1aa] font-medium">Mined audience requests appear here once comment analysis finds repeated asks.</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Engagement;

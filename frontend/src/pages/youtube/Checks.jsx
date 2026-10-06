import React, { useState } from 'react';
import { Search, RefreshCw, Crosshair } from 'lucide-react';
import ProfileMenu from '../../components/shared/ProfileMenu';
import Header from '../../components/shared/Header';

const Checks = () => {
  const [includeImageProbe, setIncludeImageProbe] = useState(false);
  const [includeVideoProbe, setIncludeVideoProbe] = useState(false);

  return (
    <div className="flex flex-col h-full w-full font-sans bg-[#101010] text-white relative">
      
            <Header 
        subtitle="PRODUCTION READINESS"
        title="Verify before autonomy runs."
        refreshId="checks-refresh-icon"
      />

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-8 w-full">
        
        {/* Title Section */}
        <div className="flex items-end justify-between mb-8 pb-4 border-b border-[#262626]">
          <div>
            <h2 className="text-[20px] font-bold text-white tracking-tight mb-2">Production readiness</h2>
            <p className="text-[13px] text-[#a1a1aa]">Verify the real path from providers to a publishable YouTube upload before autonomy spends time or credits.</p>
          </div>
          <div className="bg-[#1c1c1c] border border-[#2e2e32] px-2 py-1 rounded flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>
            <span className="text-amber-500 text-[10px] font-bold uppercase">UNVERIFIED</span>
          </div>
        </div>

        {/* Verified Dry Run Card */}
        <div className="bg-[#161616] border border-[#262626] rounded-xl overflow-hidden shadow-sm mb-6 flex flex-col md:flex-row">
          {/* Left Side */}
          <div className="p-8 flex-1">
            <h3 className="text-[10px] font-bold text-[#d4ff32] uppercase tracking-[0.1em] mb-4">VERIFIED DRY RUN</h3>
            <h2 className="text-[22px] font-bold text-white tracking-tight mb-4">Prove the pipeline, without uploading.</h2>
            <p className="text-[14px] text-[#a1a1aa] mb-6 leading-relaxed max-w-xl">
              The check makes small live text and narration requests, verifies channel access, builds a local audio/video MP4, and validates queued metadata. It never creates or uploads a YouTube video.
            </p>
            <p className="text-[13px] text-[#71717a]">
              No readiness run recorded.
            </p>
          </div>

          {/* Right Side (Actions) */}
          <div className="bg-[#101010]/50 p-8 md:w-[400px] border-t md:border-t-0 md:border-l border-[#262626] flex flex-col justify-center">
            
            {/* Toggles */}
            <div className="space-y-4 mb-6">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative">
                  <input type="checkbox" className="sr-only" checked={includeImageProbe} onChange={() => setIncludeImageProbe(!includeImageProbe)} />
                  <div className={`block w-11 h-6 rounded-full transition-colors ${includeImageProbe ? 'bg-[#d4ff32]' : 'bg-[#3f3f46]'}`}></div>
                  <div className={`dot absolute left-[2px] top-[2px] w-5 h-5 rounded-full transition-all ${includeImageProbe ? 'transform translate-x-5 bg-[#101010]' : 'bg-white shadow-sm'}`}></div>
                </div>
                <span className="text-[13px] font-medium text-[#a1a1aa] group-hover:text-white transition-colors">Include paid image probe</span>
              </label>
              
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative">
                  <input type="checkbox" className="sr-only" checked={includeVideoProbe} onChange={() => setIncludeVideoProbe(!includeVideoProbe)} />
                  <div className={`block w-11 h-6 rounded-full transition-colors ${includeVideoProbe ? 'bg-[#d4ff32]' : 'bg-[#3f3f46]'}`}></div>
                  <div className={`dot absolute left-[2px] top-[2px] w-5 h-5 rounded-full transition-all ${includeVideoProbe ? 'transform translate-x-5 bg-[#101010]' : 'bg-white shadow-sm'}`}></div>
                </div>
                <span className="text-[13px] font-medium text-[#a1a1aa] group-hover:text-white transition-colors">Include paid video probe</span>
              </label>
            </div>

            <button className="w-full bg-[#d4ff32] hover:bg-[#bce628] text-black transition-colors px-4 py-3 rounded-md text-[14px] font-bold shadow-sm mb-4">
              Run verified check
            </button>
            <p className="text-[11px] text-[#71717a] leading-tight">
              Live provider probes can consume a small amount of quota or credits.
            </p>
          </div>
        </div>

        {/* Bottom Status Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-6">
          <div className="bg-[#101010]/50 border border-[#262626] rounded-xl p-8 flex flex-col items-center justify-center text-center min-h-[160px]">
             <div className="w-8 h-8 rounded-full bg-[#1c1c1c] border border-[#2e2e32] flex items-center justify-center mb-4">
               <Crosshair size={14} className="text-[#71717a]" />
             </div>
             <p className="text-[13px] text-[#a1a1aa] font-medium">Run the verified check to inspect every production dependency.</p>
          </div>
        </div>
        
        {/* Footer Bar */}
        <div className="bg-[#1c1c1c]/80 border border-[#262626] rounded-md px-5 py-3">
          <p className="text-[12px] text-[#a1a1aa]">A recorded blocking failure stops autonomous generation and publishing until a later run passes. An unverified or stale result remains visible but does not interrupt manual work.</p>
        </div>

      </div>
    </div>
  );
};

export default Checks;

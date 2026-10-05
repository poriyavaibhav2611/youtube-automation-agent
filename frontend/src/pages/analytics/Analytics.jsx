import React, { useState } from 'react';
import { Search, RefreshCw, Plus, Crosshair } from 'lucide-react';
import Select from '../../components/ui/Select';

const Analytics = () => {
  const [publishedVariant, setPublishedVariant] = useState('No eligible published variants');
  const [experimentArm, setExperimentArm] = useState('48 hours');
  const [curveVariant, setCurveVariant] = useState('No measured curves yet');

  return (
    <div className="flex flex-col h-full w-full font-sans bg-[#101010] text-white relative">
      
      {/* Static Header */}
      <div className="shrink-0 z-10 bg-[#161616] border-b border-[#2e2e32] px-8 py-5 flex justify-between items-center">
        <div>
          <h3 className="text-[11px] font-bold text-[#d4ff32] uppercase tracking-[0.15em] mb-1">
            PERFORMANCE
          </h3>
          <h1 className="text-[26px] font-semibold tracking-tight text-white">
            Turn results into the next move.
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
              const btn = document.getElementById('analytics-refresh-icon');
              if(btn) btn.classList.add('animate-spin');
              setTimeout(() => {
                if(btn) btn.classList.remove('animate-spin');
              }, 1000);
            }}
            className="p-2 bg-[#1c1c1c] border border-[#2e2e32] rounded-md hover:bg-[#27272a] transition-colors shadow-sm"
          >
            <RefreshCw id="analytics-refresh-icon" size={14} className="text-[#a1a1aa]" />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-8 w-full">
          
          {/* Performance Signals */}
          <div className="mb-10">
            <h2 className="text-[20px] font-bold text-white tracking-tight mb-1">Performance signals</h2>
            <p className="text-[13px] text-[#a1a1aa] mb-5">Data translated into decisions, not vanity metrics.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-[#161616] border border-[#262626] rounded-xl p-5 flex flex-col justify-between shadow-sm">
                <h3 className="text-[10px] font-bold text-[#d4ff32] uppercase tracking-[0.1em] mb-4">ANALYZED VIDEOS</h3>
                <div className="text-3xl font-bold text-white mb-4">0</div>
                <div className="text-[12px] text-[#71717a]">last 30 days</div>
              </div>
              <div className="bg-[#161616] border border-[#262626] rounded-xl p-5 flex flex-col justify-between shadow-sm">
                <h3 className="text-[10px] font-bold text-[#71717a] uppercase tracking-[0.1em] mb-4">PERFORMANCE SCORE</h3>
                <div className="text-3xl font-bold text-white mb-4">—</div>
                <div className="text-[12px] text-[#71717a]">channel average</div>
              </div>
              <div className="bg-[#161616] border border-[#262626] rounded-xl p-5 flex flex-col justify-between shadow-sm">
                <h3 className="text-[10px] font-bold text-[#71717a] uppercase tracking-[0.1em] mb-4">RECOMMENDED ACTION</h3>
                <div className="text-[14px] font-medium text-white mb-2 leading-snug">Publish and analyze the first video to unlock performance recommendations.</div>
              </div>
            </div>
          </div>

          {/* Outcome & ROI Studio */}
          <div className="mb-10">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-[10px] font-bold text-[#d4ff32] uppercase tracking-[0.1em] mb-1">OUTCOME & ROI STUDIO</h3>
                <h2 className="text-[20px] font-bold text-white tracking-tight">Is the channel achieving its mandate?</h2>
              </div>
              <span className="bg-[#1c1c1c] border border-[#2e2e32] text-[#a1a1aa] text-[10px] font-bold uppercase px-2 py-1 rounded">NOT CONFIGURED</span>
            </div>
            
            <div className="bg-[#161616] border border-[#262626] rounded-xl overflow-hidden shadow-sm">
              <div className="h-40 flex flex-col items-center justify-center p-8 text-center bg-[#101010]/50">
                <div className="w-8 h-8 rounded-full bg-[#1c1c1c] border border-[#2e2e32] flex items-center justify-center mb-3">
                  <Crosshair size={14} className="text-[#71717a]" />
                </div>
                <p className="text-[13px] text-[#a1a1aa] font-medium">Choose a measurable primary outcome in the Autonomous Operator strategy.</p>
              </div>
              <div className="bg-[#1c1c1c]/80 border-t border-[#262626] px-5 py-3">
                <p className="text-[12px] text-[#a1a1aa]">Configure a primary outcome to activate goal-aligned learning.</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
            {/* Channel Baseline */}
            <div className="flex flex-col">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-[10px] font-bold text-[#d4ff32] uppercase tracking-[0.1em] mb-1">CHANNEL BASELINE</h3>
                  <h2 className="text-[20px] font-bold text-white tracking-tight">What real results say</h2>
                </div>
                <span className="bg-[#1c1c1c] border border-[#2e2e32] text-[#a1a1aa] text-[10px] font-bold uppercase px-2 py-1 rounded">0 SNAPSHOTS</span>
              </div>
              
              <div className="bg-[#161616] border border-[#262626] rounded-xl overflow-hidden shadow-sm flex-1 flex flex-col">
                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-[#101010]/50 min-h-[160px]">
                  <div className="w-8 h-8 rounded-full bg-[#1c1c1c] border border-[#2e2e32] flex items-center justify-center mb-3">
                    <Crosshair size={14} className="text-[#71717a]" />
                  </div>
                  <p className="text-[13px] text-[#a1a1aa] font-medium">Two real measurements unlock evidence-backed recommendations.</p>
                </div>
                <div className="bg-[#1c1c1c]/80 border-t border-[#262626] px-5 py-3">
                  <p className="text-[12px] text-[#a1a1aa]">Only real YouTube analytics enter this evidence layer. Simulated fallback data is excluded.</p>
                </div>
              </div>
            </div>

            {/* What the Agent Learned */}
            <div className="flex flex-col">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-[10px] font-bold text-[#d4ff32] uppercase tracking-[0.1em] mb-1">WHAT THE AGENT LEARNED</h3>
                  <h2 className="text-[20px] font-bold text-white tracking-tight">Review recommendations</h2>
                </div>
                <span className="bg-[#1c1c1c] border border-[#2e2e32] text-[#a1a1aa] text-[10px] font-bold uppercase px-2 py-1 rounded">0 APPROVED</span>
              </div>
              
              <div className="bg-[#161616] border border-[#262626] rounded-xl overflow-hidden shadow-sm flex-1 flex flex-col">
                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-[#101010]/50 min-h-[160px]">
                  <div className="w-8 h-8 rounded-full bg-[#1c1c1c] border border-[#2e2e32] flex items-center justify-center mb-3">
                    <Crosshair size={14} className="text-[#71717a]" />
                  </div>
                  <p className="text-[13px] text-[#a1a1aa] font-medium">No recommendation yet. Lumen needs at least two real, sufficiently exposed measurements.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Controlled Growth Experiments */}
          <div className="mb-10">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="text-[10px] font-bold text-[#d4ff32] uppercase tracking-[0.1em] mb-1">CONTROLLED GROWTH EXPERIMENTS</h3>
                <h2 className="text-[20px] font-bold text-white tracking-tight">Prove the next move</h2>
              </div>
              <span className="bg-[#1c1c1c] border border-[#2e2e32] text-[#a1a1aa] text-[10px] font-bold uppercase px-2 py-1 rounded">0 RUNNING &nbsp; 0 DECISIONS</span>
            </div>
            <p className="text-[13px] text-[#a1a1aa] mb-4">Run approved title and thumbnail arms against real YouTube evidence, then separately approve the winner.</p>
            
            <div className="bg-[#161616] border border-[#262626] rounded-xl overflow-visible shadow-sm">
              <div className="p-6">
                {/* Controls */}
                <div className="flex items-end gap-4 mb-8">
                  <div className="flex-1">
                    <label className="block text-[12px] font-semibold text-white mb-2">Published production</label>
                    <Select options={['No eligible published variants']} value={publishedVariant} onChange={setPublishedVariant} />
                  </div>
                  <div className="w-48">
                    <label className="block text-[12px] font-semibold text-white mb-2">Hours per arm</label>
                    <Select options={['24 hours', '48 hours', '72 hours']} value={experimentArm} onChange={setExperimentArm} />
                  </div>
                  <div className="w-48">
                    <label className="block text-[12px] font-semibold text-white mb-2">Minimum impressions</label>
                    <input type="text" value="1000" readOnly className="w-full bg-[#0a0a0a] border border-[#2e2e32] rounded-md px-3 py-[9px] text-[13px] text-white outline-none shadow-sm cursor-not-allowed text-[#a1a1aa]" />
                  </div>
                  <button className="bg-[#1c1c1c] border border-[#2e2e32] text-[#a1a1aa] hover:text-white px-4 py-[9px] rounded-md text-[13px] font-medium transition-colors">
                    Create test plan
                  </button>
                </div>
                
                {/* Empty State */}
                <div className="flex flex-col items-center justify-center p-8 text-center bg-[#101010]/50 rounded-lg border border-[#262626]">
                  <div className="w-8 h-8 rounded-full bg-[#1c1c1c] border border-[#2e2e32] flex items-center justify-center mb-3">
                    <Crosshair size={14} className="text-[#71717a]" />
                  </div>
                  <p className="text-[13px] text-[#a1a1aa] font-medium">Publish content with approved-learning title and thumbnail variants to create the first controlled test.</p>
                </div>
              </div>
              
              <div className="bg-[#1c1c1c]/80 border-t border-[#262626] px-5 py-3 rounded-b-xl">
                <p className="text-[12px] text-[#a1a1aa]">Finish setup to create a controlled growth experiment.</p>
              </div>
            </div>
          </div>

          {/* Scene Aware Retention */}
          <div className="mb-10">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-[10px] font-bold text-[#d4ff32] uppercase tracking-[0.1em] mb-1">SCENE-AWARE RETENTION</h3>
                <h2 className="text-[20px] font-bold text-white tracking-tight mb-1">Where viewers stay—and leave</h2>
                <p className="text-[13px] text-[#a1a1aa]">Real YouTube retention points mapped onto the exact production timeline.</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-64">
                  <Select options={['No measured curves yet']} value={curveVariant} onChange={setCurveVariant} />
                </div>
                <button className="bg-[#1c1c1c] border border-[#2e2e32] text-[#a1a1aa] hover:text-white px-3 py-[9px] rounded-md text-[13px] font-medium transition-colors whitespace-nowrap">
                  Refresh curve
                </button>
              </div>
            </div>
            
            <div className="bg-[#161616] border border-[#262626] rounded-xl overflow-hidden shadow-sm">
              <div className="h-48 flex flex-col items-center justify-center p-8 text-center bg-[#101010]/50">
                <div className="w-8 h-8 rounded-full bg-[#1c1c1c] border border-[#2e2e32] flex items-center justify-center mb-3">
                  <Crosshair size={14} className="text-[#71717a]" />
                </div>
                <p className="text-[13px] text-[#a1a1aa] font-medium">Retention curves appear after a published video reaches a real analytics measurement window.</p>
              </div>
              <div className="bg-[#1c1c1c]/80 border-t border-[#262626] px-5 py-3">
                <p className="text-[12px] text-[#a1a1aa]">Scene findings remain evidence only. They influence future scripts and pacing only after their recommendation is approved above; published videos are never edited automatically.</p>
              </div>
            </div>
          </div>

          {/* Top Performers */}
          <div className="mb-10">
            <div className="mb-4">
              <h3 className="text-[10px] font-bold text-[#d4ff32] uppercase tracking-[0.1em] mb-1">TOP PERFORMERS</h3>
              <h2 className="text-[20px] font-bold text-white tracking-tight">What is working</h2>
            </div>
            
            <div className="bg-[#161616] border border-[#262626] rounded-xl overflow-hidden shadow-sm">
              <div className="h-40 flex flex-col items-center justify-center p-8 text-center bg-[#101010]/50">
                <div className="w-8 h-8 rounded-full bg-[#1c1c1c] border border-[#2e2e32] flex items-center justify-center mb-3">
                  <Crosshair size={14} className="text-[#71717a]" />
                </div>
                <p className="text-[13px] text-[#a1a1aa] font-medium">No analyzed videos yet.</p>
              </div>
            </div>
          </div>

          {/* Local Activation */}
          <div className="mb-10">
            <div className="mb-4">
              <h3 className="text-[10px] font-bold text-[#d4ff32] uppercase tracking-[0.1em] mb-1">LOCAL ACTIVATION</h3>
              <h2 className="text-[20px] font-bold text-white tracking-tight">First-run journey</h2>
            </div>
            
            <div className="bg-[#161616] border border-[#262626] rounded-xl overflow-hidden shadow-sm p-6">
              <div className="bg-[#1c1c1c]/80 border border-[#262626] rounded-md px-5 py-3 mb-6">
                <p className="text-[12px] text-[#a1a1aa]">Calculated locally from your database and video files. Nothing is transmitted unless anonymous telemetry is explicitly enabled.</p>
              </div>

              <div className="flex flex-col gap-3">
                {['Setup ready', 'First real MP4', 'First approval', 'First YouTube publish', 'Second real MP4'].map((step, idx) => (
                  <div key={idx} className="flex items-center gap-4 bg-[#101010]/50 border border-[#262626] rounded-lg p-4">
                    <div className="w-3 h-3 rounded-full border-2 border-[#52525b] shrink-0 mt-1"></div>
                    <div>
                      <h4 className="text-[14px] font-semibold text-white mb-0.5">{step}</h4>
                      <p className="text-[12px] text-[#71717a]">Not reached yet</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
      </div>
    </div>
  );
};

export default Analytics;

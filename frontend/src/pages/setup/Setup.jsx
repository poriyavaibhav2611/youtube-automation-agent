import React, { useState } from 'react';
import { Search, RefreshCw } from 'lucide-react';
import ProfileMenu from '../../components/shared/ProfileMenu';
import Header from '../../components/shared/Header';
import Select from '../../components/ui/Select';

const Setup = () => {
  const [defaultFormat, setDefaultFormat] = useState('Explainer');
  const [videoProvider, setVideoProvider] = useState('Local slideshow - no provider cost');
  const [generationMode, setGenerationMode] = useState('Hybrid - generated clips + local assembly');
  
  const [requireApproval, setRequireApproval] = useState(true);
  const [saveNotifications, setSaveNotifications] = useState(true);

  return (
    <div className="flex flex-col h-full w-full font-sans bg-[#101010] text-white relative">
      
      <Header 
        subtitle="CHANNEL GUARDRAILS"
        title="Make every agent sound like you."
        refreshId="setup-refresh-icon"
      />

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-8 w-full">
        
        <div className="max-w-4xl">
          <div className="mb-6">
            <h2 className="text-[20px] font-bold text-white tracking-tight mb-1">Channel setup</h2>
            <p className="text-[13px] text-[#a1a1aa]">These guardrails guide every agent in the pipeline.</p>
          </div>

          <div className="bg-[#161616] border border-[#262626] rounded-xl p-8 shadow-sm">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-[12px] font-semibold text-white mb-2">Channel name</label>
                <input type="text" defaultValue="My YouTube Channel" className="w-full bg-[#0a0a0a] border border-[#2e2e32] rounded-md px-3 py-[9px] text-[13px] text-white outline-none focus:border-[#d4ff32] transition-colors shadow-sm" />
              </div>
              <div>
                <label className="block text-[12px] font-semibold text-white mb-2">Default format</label>
                <Select options={['Explainer', 'Tutorial', 'List', 'Review', 'Story']} value={defaultFormat} onChange={setDefaultFormat} />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-[12px] font-semibold text-white mb-2">Channel goal</label>
              <input type="text" defaultValue="Grow a trusted, useful YouTube channel" className="w-full bg-[#0a0a0a] border border-[#2e2e32] rounded-md px-3 py-[9px] text-[13px] text-white outline-none focus:border-[#d4ff32] transition-colors shadow-sm" />
            </div>

            <div className="mb-6">
              <label className="block text-[12px] font-semibold text-white mb-2">Target audience</label>
              <input type="text" defaultValue="General audience" className="w-full bg-[#0a0a0a] border border-[#2e2e32] rounded-md px-3 py-[9px] text-[13px] text-white outline-none focus:border-[#d4ff32] transition-colors shadow-sm" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-[12px] font-semibold text-white mb-2">Brand voice</label>
                <input type="text" defaultValue="Clear, credible, and engaging" className="w-full bg-[#0a0a0a] border border-[#2e2e32] rounded-md px-3 py-[9px] text-[13px] text-white outline-none focus:border-[#d4ff32] transition-colors shadow-sm" />
              </div>
              <div>
                <label className="block text-[12px] font-semibold text-white mb-2">Timezone</label>
                <input type="text" defaultValue="America/Chicago" className="w-full bg-[#0a0a0a] border border-[#2e2e32] rounded-md px-3 py-[9px] text-[13px] text-white outline-none focus:border-[#d4ff32] transition-colors shadow-sm" />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-[12px] font-semibold text-white mb-2">Default call to action</label>
              <input type="text" defaultValue="Subscribe for more useful videos." className="w-full bg-[#0a0a0a] border border-[#2e2e32] rounded-md px-3 py-[9px] text-[13px] text-white outline-none focus:border-[#d4ff32] transition-colors shadow-sm" />
            </div>

            <div className="mb-6">
              <label className="block text-[12px] font-semibold text-white mb-2">Visual direction</label>
              <input type="text" defaultValue="Clean, high-contrast, and readable" className="w-full bg-[#0a0a0a] border border-[#2e2e32] rounded-md px-3 py-[9px] text-[13px] text-white outline-none focus:border-[#d4ff32] transition-colors shadow-sm" />
            </div>

            <div className="mb-8">
              <label className="block text-[12px] font-semibold text-white mb-2">Blocked topics or terms</label>
              <input type="text" placeholder="term one, term two" className="w-full bg-[#0a0a0a] border border-[#2e2e32] rounded-md px-3 py-[9px] text-[13px] text-white outline-none focus:border-[#d4ff32] transition-colors shadow-sm mb-2" />
              <p className="text-[11px] text-[#71717a]">Quality review blocks content containing these terms.</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-8 mb-8">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative">
                  <input type="checkbox" className="sr-only" checked={requireApproval} onChange={() => setRequireApproval(!requireApproval)} />
                  <div className={`block w-11 h-6 rounded-full transition-colors ${requireApproval ? 'bg-[#d4ff32]' : 'bg-[#3f3f46]'}`}></div>
                  <div className={`dot absolute left-[2px] top-[2px] w-5 h-5 rounded-full transition-all ${requireApproval ? 'transform translate-x-5 bg-[#101010]' : 'bg-white shadow-sm'}`}></div>
                </div>
                <span className="text-[13px] font-medium text-[#a1a1aa] group-hover:text-white transition-colors">Require approval before scheduling</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative">
                  <input type="checkbox" className="sr-only" checked={saveNotifications} onChange={() => setSaveNotifications(!saveNotifications)} />
                  <div className={`block w-11 h-6 rounded-full transition-colors ${saveNotifications ? 'bg-[#d4ff32]' : 'bg-[#3f3f46]'}`}></div>
                  <div className={`dot absolute left-[2px] top-[2px] w-5 h-5 rounded-full transition-all ${saveNotifications ? 'transform translate-x-5 bg-[#101010]' : 'bg-white shadow-sm'}`}></div>
                </div>
                <span className="text-[13px] font-medium text-[#a1a1aa] group-hover:text-white transition-colors">Save operator notifications</span>
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-[12px] font-semibold text-white mb-2">Video provider</label>
                <div className="mb-2">
                  <Select 
                    options={[
                      'Local slideshow - no provider cost', 
                      'Automatic capability routing', 
                      'ByteDance Seedance 2.5', 
                      'MiniMax H3', 
                      'Google Gemini Omni Flash', 
                      'Kuaishou Kling 3.0 Omni', 
                      'Alibaba Wan 2.7'
                    ]} 
                    value={videoProvider} 
                    onChange={setVideoProvider} 
                  />
                </div>
                <p className="text-[11px] text-[#71717a]">Local FFmpeg slideshow is selected; no external video credentials are required.</p>
              </div>
              <div>
                <label className="block text-[12px] font-semibold text-white mb-2">Generation mode</label>
                <Select 
                  options={[
                    'Hybrid - generated clips + local assembly', 
                    'Local slideshow only'
                  ]} 
                  value={generationMode} 
                  onChange={setGenerationMode} 
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-[12px] font-semibold text-white mb-2">Clip duration</label>
                <input type="number" defaultValue="8" className="w-full bg-[#0a0a0a] border border-[#2e2e32] rounded-md px-3 py-[9px] text-[13px] text-white outline-none focus:border-[#d4ff32] transition-colors shadow-sm" />
              </div>
              <div>
                <label className="block text-[12px] font-semibold text-white mb-2">Paid seconds cap</label>
                <input type="number" defaultValue="60" className="w-full bg-[#0a0a0a] border border-[#2e2e32] rounded-md px-3 py-[9px] text-[13px] text-white outline-none focus:border-[#d4ff32] transition-colors shadow-sm mb-2" />
                <p className="text-[11px] text-[#71717a]">Maximum provider-generated seconds per production.</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="bg-[#d4ff32] hover:bg-[#bce628] text-black transition-colors px-5 py-[10px] rounded-md text-[13px] font-bold shadow-sm">
                Save channel setup
              </button>
              <button className="bg-[#1c1c1c] border border-[#2e2e32] text-[#a1a1aa] hover:text-white transition-colors px-5 py-[9px] rounded-md text-[13px] font-medium shadow-sm">
                Set dashboard API key
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Setup;

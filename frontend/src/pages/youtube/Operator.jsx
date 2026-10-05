import React, { useState } from 'react';
import { Search, RefreshCw, Plus, Crosshair } from 'lucide-react';
import Select from '../../components/ui/Select';

const EmptyState = ({ message }) => (
  <div className="w-full h-32 flex flex-col items-center justify-center text-center mt-4 bg-[repeating-linear-gradient(45deg,transparent,transparent_2px,rgba(255,255,255,0.02)_2px,rgba(255,255,255,0.02)_4px)] rounded-lg border border-dashed border-[#2e2e32]">
    <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center mb-3 bg-white/[0.02]">
      <Crosshair size={14} className="text-[#52525b]" />
    </div>
    <p className="text-[12px] text-[#71717a] font-medium max-w-[200px] leading-relaxed">{message}</p>
  </div>
);

const Label = ({ children }) => (
  <label className="block text-[13px] font-medium text-white mb-2">{children}</label>
);

const Input = ({ placeholder, defaultValue }) => (
  <input 
    type="text" 
    className="w-full bg-[#101010] border border-[#2e2e32] rounded-md px-3 py-2 text-[13px] text-white placeholder-[#52525b] outline-none focus:border-[#52525b] transition-colors"
    placeholder={placeholder}
    defaultValue={defaultValue}
  />
);

const Textarea = ({ placeholder, defaultValue, rows = 3 }) => (
  <textarea 
    className="w-full bg-[#101010] border border-[#2e2e32] rounded-md px-3 py-2 text-[13px] text-white placeholder-[#52525b] outline-none focus:border-[#52525b] transition-colors resize-none"
    placeholder={placeholder}
    defaultValue={defaultValue}
    rows={rows}
  />
);

const Operator = () => {
  const [format, setFormat] = useState('Explainer');
  const [length, setLength] = useState('Short - 2-4 min');
  const [outcome, setOutcome] = useState('Views');
  const [targetWindow, setTargetWindow] = useState('28 days');
  const [currency, setCurrency] = useState('USD');

  return (
    <div className="flex flex-col h-full w-full font-sans bg-[#161616] text-white">
      
      {/* Static Header */}
      <div className="shrink-0 z-10 bg-[#161616] border-b border-[#2e2e32] px-8 py-5 flex justify-between items-center">
        <div>
          <h3 className="text-[11px] font-bold text-[#d4ff32] uppercase tracking-[0.15em] mb-1">
            AUTONOMOUS OPERATOR
          </h3>
          <h1 className="text-[26px] font-semibold tracking-tight text-white">
            Give Lumen the strategy.
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center bg-[#1c1c1c] border border-[#2e2e32] rounded-md px-3 py-2 w-64 focus-within:border-[#52525b] transition-colors shadow-sm">
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
              const btn = document.getElementById('operator-refresh-icon');
              if(btn) btn.classList.add('animate-spin');
              setTimeout(() => {
                if(btn) btn.classList.remove('animate-spin');
              }, 1000);
            }}
            className="p-2 bg-[#1c1c1c] border border-[#2e2e32] rounded-md hover:bg-[#27272a] transition-colors shadow-sm"
          >
            <RefreshCw id="operator-refresh-icon" size={14} className="text-[#a1a1aa]" />
          </button>
        </div>
      </div>

      {/* Scrollable Body */}
      <div className="flex-1 overflow-y-auto p-8">
        <div className="flex flex-col xl:flex-row gap-6 max-w-[1600px] mx-auto w-full">
        
        {/* Left Column: Form */}
        <div className="flex-[2] min-w-0">
          <div className="bg-[#1c1c1c] border border-[#2e2e32] rounded-xl p-8 shadow-sm">
            <div className="mb-8">
              <h3 className="text-[10px] font-bold text-[#d4ff32] uppercase tracking-[0.1em] mb-2">CHANNEL MANDATE</h3>
              <h2 className="text-[20px] font-semibold text-white tracking-tight">What should this channel achieve?</h2>
            </div>

            <div className="space-y-6">
              
              {/* Objective */}
              <div>
                <Label>Objective</Label>
                <Textarea 
                  defaultValue="Become the most trusted practical channel for small businesses adopting AI." 
                  rows={2} 
                />
              </div>

              {/* Audience */}
              <div>
                <Label>Audience</Label>
                <Textarea 
                  defaultValue="Owners and operators at 5-50 person service businesses" 
                  rows={2} 
                />
              </div>

              {/* Value Proposition */}
              <div>
                <Label>Value proposition</Label>
                <Textarea 
                  defaultValue="Clear, tested advice viewers can apply this week" 
                  rows={2} 
                />
              </div>

              {/* Content Pillars */}
              <div>
                <Label>Content pillars</Label>
                <Input defaultValue="AI workflows, automation playbooks, tool reviews" />
                <p className="text-[11px] text-[#71717a] mt-2 font-medium">Separate 1-8 durable themes with commas.</p>
              </div>

              {/* Grid: Videos / length / outcome */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Label>Videos per week</Label>
                  <Input defaultValue="1" />
                </div>
                <div>
                  <Label>Videos per planning run</Label>
                  <Input defaultValue="1" />
                </div>
                
                <div>
                  <Label>Default format</Label>
                  <Select 
                    options={['Explainer', 'Tutorial', 'List', 'Review', 'Story']} 
                    value={format}
                    onChange={setFormat}
                  />
                </div>
                <div>
                  <Label>Default length</Label>
                  <Select 
                    options={['Short · 2-4 min', 'Medium · 8-12 min', 'Long · 15-20 min']} 
                    value={length}
                    onChange={setLength}
                  />
                </div>

                <div>
                  <Label>Primary outcome</Label>
                  <Select 
                    options={['Views', 'Watch hours', 'Net subscribers', 'Engagement rate', 'Estimated revenue']} 
                    value={outcome}
                    onChange={setOutcome}
                  />
                </div>
                <div>
                  <Label>Target value</Label>
                  <Input defaultValue="100" />
                </div>

                <div>
                  <Label>Target window</Label>
                  <Select 
                    options={['7 days', '28 days', '90 days', '365 days']} 
                    value={targetWindow}
                    onChange={setTargetWindow}
                  />
                </div>
                <div>
                  <Label>Monthly production budget</Label>
                  <div className="flex gap-2">
                    <div className="w-[80px]">
                      <Select 
                        options={['USD', 'CAD', 'EUR', 'GBP', 'AUD']} 
                        value={currency}
                        onChange={setCurrency}
                      />
                    </div>
                    <div className="flex-1">
                      <Input placeholder="Optional" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Outcome context */}
              <div>
                <Label>Outcome context</Label>
                <Input defaultValue="Grow qualified subscribers who return for practical automation tutorials" />
                <p className="text-[11px] text-[#71717a] mt-2 font-medium">Used by planning alongside the measurable primary outcome.</p>
              </div>

              {/* Boundaries and constraints */}
              <div>
                <Label>Boundaries and constraints</Label>
                <Textarea 
                  defaultValue="No hype, no unverified statistics, explain costs and tradeoffs." 
                  rows={3} 
                />
              </div>

              {/* Info Box */}
              <div className="bg-[#101010]/50 border border-[#2e2e32] border-l-[#d4ff32] border-l-2 rounded-r-md p-4 mt-4">
                <p className="text-[12px] text-[#a1a1aa] leading-relaxed font-medium">
                  The operator uses YouTube trend signals, configured competitors, and channel history. Publishing still obeys your quality, factual-review, rights, and approval gates.
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 pt-6 border-t border-[#2e2e32]">
                <button className="px-5 py-2.5 bg-transparent border border-[#2e2e32] hover:bg-[#27272a] rounded-md text-[13px] font-semibold text-white transition-colors">
                  Save strategy
                </button>
                <button className="px-5 py-2.5 bg-[#d4ff32] hover:bg-[#bce628] rounded-md text-[13px] font-semibold text-black transition-colors shadow-sm">
                  Activate & run now
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* Right Column: Status Cards */}
        <div className="flex-1 min-w-[300px] xl:max-w-[500px] space-y-4">
          
          {/* Current Run Card */}
          <div className="bg-[#1c1c1c] border border-[#2e2e32] rounded-xl p-6 shadow-sm">
            <h3 className="text-[10px] font-bold text-[#d4ff32] uppercase tracking-[0.1em] mb-1">CURRENT RUN</h3>
            <h2 className="text-[18px] font-semibold text-white tracking-tight mb-4">Waiting for a strategy</h2>
            
            <EmptyState message="Save a channel mandate, then activate it to research and produce the first plan." />
          </div>

          {/* Editorial Plan Card */}
          <div className="bg-[#1c1c1c] border border-[#2e2e32] rounded-xl p-6 shadow-sm">
            <h3 className="text-[10px] font-bold text-[#d4ff32] uppercase tracking-[0.1em] mb-1">EDITORIAL PLAN</h3>
            <h2 className="text-[18px] font-semibold text-white tracking-tight mb-4">What Lumen decided to make</h2>
            
            <EmptyState message="No editorial plan yet." />
          </div>

        </div>

      </div>
      </div>
    </div>
  );
};

export default Operator;

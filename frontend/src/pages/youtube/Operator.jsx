import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import ProfileMenu from '../../components/shared/ProfileMenu';
import Header from '../../components/shared/Header';
import { Search, RefreshCw, Plus, Crosshair } from 'lucide-react';
import Select from '../../components/ui/Select';
import { fetchStrategy, saveStrategyData, activateStrategyData } from '../../services/strategyService';
import { useHandleError } from '../../hooks/useHandleError';
import { MessageBox } from '../../components/ui/MessageBox';

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

const Input = ({ placeholder, value, onChange, type = "text" }) => (
  <input 
    type={type} 
    className="w-full bg-[#101010] border border-[#2e2e32] rounded-md px-3 py-2 text-[13px] text-white placeholder-[#52525b] outline-none focus:border-[#52525b] transition-colors"
    placeholder={placeholder}
    value={value}
    onChange={onChange}
  />
);

const Textarea = ({ placeholder, value, onChange, rows = 3 }) => (
  <textarea 
    className="w-full bg-[#101010] border border-[#2e2e32] rounded-md px-3 py-2 text-[13px] text-white placeholder-[#52525b] outline-none focus:border-[#52525b] transition-colors resize-none"
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    rows={rows}
  />
);

const Operator = () => {
  const queryClient = useQueryClient();
  const { handleError } = useHandleError();
  
  const [formData, setFormData] = useState({
    objective: '',
    audience: '',
    valueProposition: '',
    contentPillars: '',
    videosPerWeek: 1,
    videosPerPlanningRun: 1,
    defaultFormat: 'Explainer',
    defaultLength: 'Short - 2-4 min',
    primaryOutcome: 'Views',
    targetValue: 100,
    targetWindow: '28 days',
    budgetCurrency: 'USD',
    outcomeContext: '',
    boundaries: ''
  });

  const { data: strategy, isLoading: isFetching, refetch } = useQuery({
    queryKey: ['strategy'],
    queryFn: fetchStrategy,
  });

  useEffect(() => {
    if (strategy) {
      setFormData({
        objective: strategy.objective || '',
        audience: strategy.audience || '',
        valueProposition: strategy.valueProposition || '',
        contentPillars: strategy.contentPillars || '',
        videosPerWeek: strategy.videosPerWeek || 1,
        videosPerPlanningRun: strategy.videosPerPlanningRun || 1,
        defaultFormat: strategy.defaultFormat || 'Explainer',
        defaultLength: strategy.defaultLength || 'Short - 2-4 min',
        primaryOutcome: strategy.primaryOutcome || 'Views',
        targetValue: strategy.targetValue || 100,
        targetWindow: strategy.targetWindow || '28 days',
        budgetCurrency: strategy.budgetCurrency || 'USD',
        outcomeContext: strategy.outcomeContext || '',
        boundaries: strategy.boundaries || ''
      });
    }
  }, [strategy]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const saveMutation = useMutation({
    mutationFn: saveStrategyData,
    onSuccess: (data) => {
      queryClient.setQueryData(['strategy'], data);
      MessageBox('success', 'Strategy saved successfully!');
    },
    onError: handleError
  });

  const activateMutation = useMutation({
    mutationFn: activateStrategyData,
    onSuccess: (data) => {
      queryClient.setQueryData(['strategy'], data.strategy);
      MessageBox('success', data.message || 'Strategy activated!');
    },
    onError: handleError
  });

  const isPending = saveMutation.isPending || activateMutation.isPending;

  return (
    <div className="flex flex-col h-full w-full font-sans bg-[#161616] text-white">
      <Header 
        subtitle="AUTONOMOUS OPERATOR"
        title="Give Lumen the strategy."
        refreshId="operator-refresh-icon"
      />

      <div className="flex-1 overflow-y-auto p-8">
        <div className="flex flex-col xl:flex-row gap-6 max-w-[1600px] mx-auto w-full">
        
        <div className="flex-[2] min-w-0">
          <div className="bg-[#1c1c1c] border border-[#2e2e32] rounded-xl p-8 shadow-sm">
            <div className="mb-8">
              <h3 className="text-[10px] font-bold text-[#d4ff32] uppercase tracking-[0.1em] mb-2">CHANNEL MANDATE</h3>
              <h2 className="text-[20px] font-semibold text-white tracking-tight">What should this channel achieve?</h2>
            </div>

            {isFetching ? (
              <div className="text-[#a1a1aa] text-[13px]">Loading strategy...</div>
            ) : (
              <div className="space-y-6">
                
                <div>
                  <Label>Objective</Label>
                  <Textarea 
                    value={formData.objective} 
                    onChange={e => handleChange('objective', e.target.value)}
                    rows={2} 
                  />
                </div>

                <div>
                  <Label>Audience</Label>
                  <Textarea 
                    value={formData.audience} 
                    onChange={e => handleChange('audience', e.target.value)}
                    rows={2} 
                  />
                </div>

                <div>
                  <Label>Value proposition</Label>
                  <Textarea 
                    value={formData.valueProposition} 
                    onChange={e => handleChange('valueProposition', e.target.value)}
                    rows={2} 
                  />
                </div>

                <div>
                  <Label>Content pillars</Label>
                  <Input 
                    value={formData.contentPillars} 
                    onChange={e => handleChange('contentPillars', e.target.value)}
                  />
                  <p className="text-[11px] text-[#71717a] mt-2 font-medium">Separate 1-8 durable themes with commas.</p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <Label>Videos per week</Label>
                    <Input 
                      type="number"
                      value={formData.videosPerWeek} 
                      onChange={e => handleChange('videosPerWeek', Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label>Videos per planning run</Label>
                    <Input 
                      type="number"
                      value={formData.videosPerPlanningRun} 
                      onChange={e => handleChange('videosPerPlanningRun', Number(e.target.value))}
                    />
                  </div>
                  
                  <div>
                    <Label>Default format</Label>
                    <Select 
                      options={['Explainer', 'Tutorial', 'Listicle']} 
                      value={formData.defaultFormat}
                      onChange={val => handleChange('defaultFormat', val)}
                    />
                  </div>
                  <div>
                    <Label>Default length</Label>
                    <Select 
                      options={['Short - 2-4 min', 'Medium - 8-12 min', 'Long - 15-20 min']} 
                      value={formData.defaultLength}
                      onChange={val => handleChange('defaultLength', val)}
                    />
                  </div>

                  <div>
                    <Label>Primary outcome</Label>
                    <Select 
                      options={['Views', 'Subscribers', 'Engagement']} 
                      value={formData.primaryOutcome}
                      onChange={val => handleChange('primaryOutcome', val)}
                    />
                  </div>
                  <div>
                    <Label>Target value</Label>
                    <Input 
                      type="number"
                      value={formData.targetValue} 
                      onChange={e => handleChange('targetValue', Number(e.target.value))}
                    />
                  </div>

                  <div>
                    <Label>Target window</Label>
                    <Select 
                      options={['7 days', '28 days', '90 days', '365 days']} 
                      value={formData.targetWindow}
                      onChange={val => handleChange('targetWindow', val)}
                    />
                  </div>
                  <div>
                    <Label>Budget currency</Label>
                    <Select 
                      options={['USD', 'CAD', 'EUR', 'GBP', 'AUD']} 
                      value={formData.budgetCurrency}
                      onChange={val => handleChange('budgetCurrency', val)}
                    />
                  </div>
                </div>

                <div>
                  <Label>Outcome context</Label>
                  <Input 
                    value={formData.outcomeContext} 
                    onChange={e => handleChange('outcomeContext', e.target.value)}
                  />
                  <p className="text-[11px] text-[#71717a] mt-2 font-medium">Used by planning alongside the measurable primary outcome.</p>
                </div>

                <div>
                  <Label>Boundaries and constraints</Label>
                  <Textarea 
                    value={formData.boundaries} 
                    onChange={e => handleChange('boundaries', e.target.value)}
                    rows={3} 
                  />
                </div>

                <div className="bg-[#101010]/50 border border-[#2e2e32] border-l-[#d4ff32] border-l-2 rounded-r-md p-4 mt-4">
                  <p className="text-[12px] text-[#a1a1aa] leading-relaxed font-medium">
                    The operator uses YouTube trend signals, configured competitors, and channel history. Publishing still obeys your quality, factual-review, rights, and approval gates.
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-6 border-t border-[#2e2e32]">
                  <button 
                    onClick={() => saveMutation.mutate(formData)}
                    disabled={isPending}
                    className="px-5 py-2.5 bg-transparent border border-[#2e2e32] hover:bg-[#27272a] disabled:opacity-50 rounded-md text-[13px] font-semibold text-white transition-colors"
                  >
                    {saveMutation.isPending ? 'Saving...' : 'Save strategy'}
                  </button>
                  <button 
                    onClick={() => activateMutation.mutate(formData)}
                    disabled={isPending}
                    className="px-5 py-2.5 bg-[#d4ff32] hover:bg-[#bce628] disabled:opacity-50 rounded-md text-[13px] font-semibold text-black transition-colors shadow-sm"
                  >
                    {activateMutation.isPending ? 'Activating...' : (strategy?.isActive ? 'Update & run now' : 'Activate & run now')}
                  </button>
                </div>

              </div>
            )}
          </div>
        </div>

        <div className="flex-1 min-w-[300px] xl:max-w-[500px] space-y-4">
          
          <div className="bg-[#1c1c1c] border border-[#2e2e32] rounded-xl p-6 shadow-sm">
            <h3 className="text-[10px] font-bold text-[#d4ff32] uppercase tracking-[0.1em] mb-1">CURRENT RUN</h3>
            <h2 className="text-[18px] font-semibold text-white tracking-tight mb-4">{strategy?.isActive ? 'Active and monitoring' : 'Waiting for a strategy'}</h2>
            
            <EmptyState message={strategy?.isActive ? "Lumen is monitoring signals for the next planning run." : "Save a channel mandate, then activate it to research and produce the first plan."} />
          </div>

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

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getProductions } from '../../services/productionService';
import { QUERY_KEYS } from '../../lib/queryKeys';
import { Search, RefreshCw, Diamond } from 'lucide-react';
import VideoCard from '../../components/pipeline/VideoCard';
import Select from '../../components/ui/Select';

const Pipeline = () => {
  const [filter, setFilter] = useState('All content');

  const { data: productions, isLoading, refetch } = useQuery({
    queryKey: [QUERY_KEYS.PRODUCTIONS],
    queryFn: getProductions
  });

  const filters = ['All content', 'Needs review', 'Needs attention', 'Approved', 'Published'];

  const filteredProductions = productions?.filter(p => {
    if (filter === 'All content') return true;
    if (filter === 'Needs review') return p.status === 'NEEDS_REVIEW';
    if (filter === 'Needs attention') return p.status === 'NEEDS_ATTENTION' || p.status === 'ERROR';
    if (filter === 'Approved') return p.status === 'APPROVED';
    if (filter === 'Published') return p.status === 'PUBLISHED';
    return true;
  });

  return (
    <div className="flex flex-col h-full w-full font-sans bg-[#101010] text-white">
      
      {/* Static Header */}
      <div className="shrink-0 z-10 bg-[#161616] border-b border-[#2e2e32] px-8 py-5 flex justify-between items-center">
        <div>
          <h3 className="text-[11px] font-bold text-[#d4ff32] uppercase tracking-[0.15em] mb-1">
            CONTENT OPERATIONS
          </h3>
          <h1 className="text-[26px] font-semibold tracking-tight text-white">
            From idea to published.
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
              const btn = document.getElementById('pipeline-refresh-icon');
              if(btn) btn.classList.add('animate-spin');
              refetch().finally(() => {
                setTimeout(() => {
                  if(btn) btn.classList.remove('animate-spin');
                }, 500);
              });
            }}
            className="p-2 bg-[#1c1c1c] border border-[#2e2e32] rounded-md hover:bg-[#27272a] transition-colors shadow-sm"
          >
            <RefreshCw id="pipeline-refresh-icon" size={14} className="text-[#a1a1aa]" />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-8">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight mb-1">Content pipeline</h2>
            <p className="text-[13px] text-[#a1a1aa]">Every generated video, its real state, and the next available action.</p>
          </div>

          <div className="w-48">
            <Select 
              options={filters} 
              value={filter}
              onChange={setFilter}
            />
          </div>
        </div>

        {/* Empty State / Grid */}
        <div className={isLoading || !filteredProductions || filteredProductions.length === 0 ? "bg-[#161616] border border-[#262626] rounded-xl p-12 min-h-[300px] flex flex-col items-center justify-center" : "min-h-[300px]"}>
          {isLoading ? (
            <div className="flex flex-col items-center gap-4">
              <RefreshCw size={24} className="text-[#3f3f46] animate-spin" />
              <p className="text-[13px] text-[#71717a]">Loading pipeline...</p>
            </div>
          ) : (!filteredProductions || filteredProductions.length === 0) ? (
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#101010] border border-[#262626] flex items-center justify-center">
                <Diamond size={16} className="text-[#71717a]" />
              </div>
              <p className="text-[13px] text-[#71717a]">No content matches this view.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredProductions.map(prod => (
                <VideoCard key={prod._id} production={prod} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Pipeline;

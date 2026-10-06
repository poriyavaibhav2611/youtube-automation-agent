import React from 'react';
import { Search, RefreshCw, Plus } from 'lucide-react';
import ProfileMenu from './ProfileMenu';

const Header = ({ subtitle, title, onRefresh, refreshId }) => {
  return (
    <div className="shrink-0 z-10 bg-[#161616] border-b border-[#2e2e32] px-8 py-5 flex justify-between items-center h-[93px]">
      <div>
        <h3 className="text-[11px] font-bold text-[#d4ff32] uppercase tracking-[0.15em] mb-1">
          {subtitle}
        </h3>
        <h1 className="text-[26px] font-semibold tracking-tight text-white leading-tight">
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-3">
        {/* Search Bar */}
        <div className="flex items-center bg-[#1c1c1c] border border-[#2e2e32] rounded-md px-3 py-2 w-64 focus-within:border-[#a1a1aa] focus-within:ring-1 focus-within:ring-[#a1a1aa] transition-all shadow-sm">
          <Search size={14} className="text-[#71717a] mr-2 shrink-0" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="bg-transparent border-none outline-none text-[13px] text-white w-full placeholder-[#52525b]" 
          />
          <div className="flex items-center gap-1 text-[#71717a] ml-2 shrink-0">
            <span className="text-[10px] bg-[#27272a] rounded px-1.5 py-0.5 border border-[#3f3f46]">⌘</span>
            <span className="text-[10px] bg-[#27272a] rounded px-1.5 py-0.5 border border-[#3f3f46]">K</span>
          </div>
        </div>

        {/* Refresh Button */}
        <button 
          onClick={(e) => {
            const btn = document.getElementById(refreshId);
            if(btn) btn.classList.add('animate-spin');
            if(onRefresh) {
              const res = onRefresh(e);
              if (res && res.finally) {
                res.finally(() => {
                  setTimeout(() => {
                    if(btn) btn.classList.remove('animate-spin');
                  }, 500);
                });
                return;
              }
            }
            setTimeout(() => {
              if(btn) btn.classList.remove('animate-spin');
            }, 1000);
          }}
          className="p-2 bg-[#1c1c1c] border border-[#2e2e32] rounded-md hover:bg-[#27272a] transition-colors shadow-sm shrink-0"
        >
          <RefreshCw id={refreshId} size={14} className="text-[#a1a1aa]" />
        </button>

        {/* Create Video Button */}
        <button className="flex items-center justify-center bg-[#d4ff32] hover:bg-[#bce628] transition-all duration-300 rounded-md text-[13px] font-semibold text-black shadow-sm py-2 px-4 shrink-0">
          <Plus size={16} className="mr-1.5 shrink-0" /> 
          Create video
        </button>

        {/* Profile Menu */}
        <ProfileMenu />
      </div>
    </div>
  );
};

export default Header;

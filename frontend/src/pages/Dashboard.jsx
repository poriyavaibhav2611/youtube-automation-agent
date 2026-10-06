import React from 'react';
import { useQuery } from '@tanstack/react-query';
import apiService from '../services/apiService';
import { Search, Plus, ArrowUpRight, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProfileMenu from '../components/shared/ProfileMenu';
import Header from '../components/shared/Header';

const fetchDashboardStats = async () => {
  const data = await apiService.get('/production/stats');
  return data;
};

// Generic Empty State Component
const EmptyState = ({ message }) => (
  <div className="w-full flex-1 flex flex-col items-center justify-center text-center mt-4 bg-[repeating-linear-gradient(45deg,transparent,transparent_2px,rgba(255,255,255,0.02)_2px,rgba(255,255,255,0.02)_4px)] rounded-lg border border-dashed border-[#2e2e32] min-h-[120px]">
    <p className="text-[13px] text-[#71717a] font-medium px-4">{message}</p>
  </div>
);

const Dashboard = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['dashboardStats'],
    queryFn: fetchDashboardStats
  });

  if (isLoading) {
    return (
      <div className="p-8 bg-[#161616] min-h-screen flex items-center justify-center">
        <div className="animate-spin h-6 w-6 border-2 border-[#52525b] border-t-white rounded-full"></div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="p-8 bg-[#161616] min-h-screen flex items-center justify-center">
        <div className="bg-red-500/10 text-red-500 border border-red-500/20 px-4 py-3 rounded-md text-sm font-medium">
          Failed to load dashboard data.
        </div>
      </div>
    );
  }

  const { metrics, decisionQueue, activeWork, upNext, inbox } = data;

  return (
    <div className="p-8 h-full flex flex-col font-sans bg-[#161616] text-white overflow-y-auto">
      
      {/* Top Header Section */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h3 className="text-[11px] font-bold text-[#d4ff32] uppercase tracking-[0.15em] mb-1">
            OPERATOR OVERVIEW
          </h3>
          <h1 className="text-[26px] font-semibold tracking-tight text-white">
            Know what happens next.
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
              const btn = document.getElementById('dashboard-refresh-icon');
              if(btn) btn.classList.add('animate-spin');
              refetch().finally(() => {
                setTimeout(() => {
                  if(btn) btn.classList.remove('animate-spin');
                }, 500);
              });
            }}
            className="p-2 bg-[#1c1c1c] border border-[#2e2e32] rounded-md hover:bg-[#27272a] transition-colors shadow-sm"
          >
            <RefreshCw id="dashboard-refresh-icon" size={14} className="text-[#a1a1aa]" />
          </button>
          <ProfileMenu />
        </div>
      </div>

      {/* Setup Banner */}
      <div className="bg-[#1c1c1c] border border-[#2e2e32] rounded-xl p-4 mb-6 flex items-center justify-between shadow-sm border-l-4 border-l-yellow-500">
        <div>
          <h3 className="text-[14px] font-semibold text-white mb-0.5">Finish setup to activate your agents</h3>
          <p className="text-[12px] text-[#a1a1aa]">The operator console is ready, but generation and publishing stay disabled until credentials are configured.</p>
        </div>
        <div className="px-3 py-1.5 bg-[#101010] border border-[#2e2e32] rounded-md text-[12px] font-mono text-yellow-500">
          npm run walkthrough
        </div>
      </div>

      {/* 4 Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'NEEDS REVIEW', value: metrics.needsReview, subtitle: 'waiting for a decision' },
          { label: 'SCHEDULED', value: metrics.scheduled, subtitle: 'next 30 days' },
          { label: 'PUBLISHED', value: metrics.published, subtitle: 'all time' },
          { label: 'AVERAGE SCORE', value: '—', subtitle: 'recent content performance' }
        ].map((stat, i) => (
          <div key={i} className="bg-[#1c1c1c] border border-[#2e2e32] rounded-xl p-5 relative overflow-hidden flex flex-col justify-between hover:bg-white/[0.02] transition-colors group shadow-sm">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-[10px] font-bold text-[#a1a1aa] uppercase tracking-[0.1em] group-hover:text-[#d4ff32] transition-colors">
                {stat.label}
              </h3>
              <ArrowUpRight size={14} className="text-[#52525b] group-hover:text-white transition-colors" />
            </div>
            
            <div>
              <div className="text-[36px] font-semibold tracking-tight text-white mb-1 leading-none">{stat.value}</div>
              <div className="text-[12px] text-[#71717a] font-medium">{stat.subtitle}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        
        {/* Decision Queue */}
        <div className="bg-[#1c1c1c] border border-[#2e2e32] rounded-xl p-6 flex flex-col shadow-sm">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="text-[10px] font-bold text-[#d4ff32] uppercase tracking-[0.1em] mb-1">DECISION QUEUE</h3>
              <h2 className="text-[18px] font-semibold text-white tracking-tight">Ready for you</h2>
            </div>
            <Link to="/pipeline" className="text-[12px] text-[#a1a1aa] hover:text-white transition-colors flex items-center gap-1 font-medium">
              View pipeline &rarr;
            </Link>
          </div>
          
          <div className="flex-1 flex flex-col justify-end mt-4">
            {decisionQueue.length === 0 ? (
              <EmptyState message="Nothing is waiting. New content will appear here after quality review." />
            ) : (
              <div className="w-full h-32 mt-4">
                 {/* Chart Placeholder */}
              </div>
            )}
          </div>
        </div>

        {/* Active Work */}
        <div className="bg-[#1c1c1c] border border-[#2e2e32] rounded-xl p-6 flex flex-col shadow-sm">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="text-[10px] font-bold text-[#d4ff32] uppercase tracking-[0.1em] mb-1">ACTIVE WORK</h3>
              <h2 className="text-[18px] font-semibold text-white tracking-tight">Generation jobs</h2>
            </div>
          </div>
          
          <div className="flex-1 flex flex-col justify-end mt-4">
            {activeWork.length === 0 ? (
              <EmptyState message="No generation runs yet." />
            ) : (
              <div className="w-full h-32 mt-4">
                 {/* Chart Placeholder */}
              </div>
            )}
          </div>
        </div>

        {/* Up Next */}
        <div className="bg-[#1c1c1c] border border-[#2e2e32] rounded-xl p-6 flex flex-col shadow-sm">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="text-[10px] font-bold text-[#d4ff32] uppercase tracking-[0.1em] mb-1">UP NEXT</h3>
              <h2 className="text-[18px] font-semibold text-white tracking-tight">Publishing calendar</h2>
            </div>
            <Link to="/calendar" className="text-[12px] text-[#a1a1aa] hover:text-white transition-colors flex items-center gap-1 font-medium">
              Open calendar &rarr;
            </Link>
          </div>

          <div className="flex-1 flex flex-col justify-end mt-4">
            {upNext.length === 0 ? (
              <EmptyState message="No approved videos are scheduled." />
            ) : (
              <div className="text-sm">Content Here</div>
            )}
          </div>
        </div>

        {/* Inbox */}
        <div className="bg-[#1c1c1c] border border-[#2e2e32] rounded-xl p-6 flex flex-col shadow-sm">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="text-[10px] font-bold text-[#d4ff32] uppercase tracking-[0.1em] mb-1">INBOX</h3>
              <h2 className="text-[18px] font-semibold text-white tracking-tight">Recent activity</h2>
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-end mt-4">
            {inbox.length === 0 ? (
              <EmptyState message="No activity has been recorded yet." />
            ) : (
              <div className="text-sm">Content Here</div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;

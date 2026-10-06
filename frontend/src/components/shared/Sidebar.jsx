import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutGrid, 
  Settings, 
  Film, 
  Calendar, 
  BarChart2, 
  Users, 
  CheckSquare, 
  Sun,
  Plus,
  LogOut,
  PanelLeftClose,
  PanelRightClose
} from 'lucide-react';
import { removeCookie } from '../../utils/cookies';
import * as authService from '../../services/authService';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      if (authService.logout) {
        await authService.logout();
      }
    } catch (error) {
      console.error('Logout API error:', error);
    } finally {
      removeCookie('yt-token');
      navigate('/login');
    }
  };
  
  const navItems = [
    { name: 'Home', path: '/', icon: <LayoutGrid size={18} /> },
    { name: 'Operator', path: '/youtube/operator', icon: <Sun size={18} /> },
    { name: 'Pipeline', path: '/pipeline', icon: <Film size={18} /> },
    { name: 'Calendar', path: '/calendar', icon: <Calendar size={18} /> },
    { name: 'Stats', path: '/analytics', icon: <BarChart2 size={18} /> },
    { name: 'Engagement', path: '/engagement', icon: <Users size={18} /> },
    { name: 'Checks', path: '/youtube/checks', icon: <CheckSquare size={18} /> },
    { name: 'Setup', path: '/setup', icon: <Settings size={18} /> },
  ];

  return (
    <div className={`${isCollapsed ? 'w-[80px]' : 'w-64'} transition-all duration-300 ease-in-out shrink-0 bg-[#101010] text-white min-h-screen border-r border-[#262626] font-sans flex flex-col relative z-20`}>
      
      {/* Top Section matching Header Height (93px) */}
      <div className="h-[93px] border-b border-[#2e2e32] px-4 flex flex-col justify-center shrink-0">
        <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} h-8`}>
          <div className={`flex items-center gap-2 overflow-hidden transition-all duration-300 ${isCollapsed ? 'w-0 opacity-0' : 'w-[180px] opacity-100'}`}>
            <div className="w-6 h-6 bg-[#d4ff32] rounded flex items-center justify-center shrink-0">
               <svg className="w-[14px] h-[14px] text-black" viewBox="0 0 24 24" fill="currentColor">
                 <path d="M21.582,6.186c-0.23-0.86-0.908-1.538-1.768-1.768C18.252,4,12,4,12,4S5.748,4,4.186,4.418 c-0.86,0.23-1.538,0.908-1.768,1.768C2,7.748,2,12,2,12s0,4.252,0.418,5.814c0.23,0.86,0.908,1.538,1.768,1.768 C5.748,20,12,20,12,20s6.252,0,7.814-0.418c0.86-0.23,1.538-0.908,1.768-1.768C22,16.252,22,12,22,12S22,7.748,21.582,6.186z M10,15.464V8.536L16,12L10,15.464z" />
               </svg>
            </div>
            <h1 className="text-[17px] font-semibold text-white tracking-tight whitespace-nowrap">
              YT Automation
            </h1>
          </div>
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`text-[#71717a] hover:text-white transition-all flex items-center justify-center rounded-lg hover:bg-[#1c1c1c] ${isCollapsed ? 'w-10 h-10 mx-auto' : 'w-8 h-8 shrink-0'}`}
          >
            {isCollapsed ? <PanelRightClose size={18} /> : <PanelLeftClose size={18} />}
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-2 flex-1 overflow-y-auto px-4 pt-4">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || (item.name === 'Home' && location.pathname === '/');
          return (
            <NavLink
              key={item.name}
              to={item.path}
              title={isCollapsed ? item.name : ''}
              className={`flex items-center rounded-xl transition-all duration-300 text-[13px] font-medium ${isCollapsed ? 'w-10 h-10 mx-auto justify-center' : 'w-full justify-start px-3 py-2.5'} ${
                isActive
                  ? 'bg-[#262626] text-white'
                  : 'text-[#a1a1aa] hover:text-white hover:bg-[#1c1c1c]'
              }`}
            >
              <div className={`shrink-0 flex items-center justify-center transition-colors ${isActive ? 'text-white' : 'text-[#71717a]'}`}>
                 {item.icon}
              </div>
              <span className={`whitespace-nowrap overflow-hidden transition-all duration-300 ${isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100 ml-3'}`}>
                {item.name}
              </span>
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;

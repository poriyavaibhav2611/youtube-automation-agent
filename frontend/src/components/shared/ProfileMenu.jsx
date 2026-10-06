import React, { useState, useRef, useEffect, useContext } from 'react';
import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './../../context/UserContext';
import * as authService from './../../services/authService';
import { removeCookie } from './../../utils/cookies';

const ProfileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

  const username = user?.name || 'Admin';
  const firstLetter = username.charAt(0).toUpperCase();

  return (
    <div className="relative ml-2" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-[34px] h-[34px] rounded-md bg-[#1c1c1c] border border-[#2e2e32] hover:bg-[#27272a] transition-colors shadow-sm flex items-center justify-center font-semibold text-[#a1a1aa] text-[13px]"
      >
        {firstLetter}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-[#1c1c1c] border border-[#2e2e32] rounded-md shadow-lg py-1 z-50">
          <div className="px-3 py-2 border-b border-[#2e2e32] mb-1">
            <p className="text-[13px] font-semibold text-white">{username}</p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full text-left px-3 py-2 text-[13px] font-medium text-[#ef4444] hover:bg-[#27272a] flex items-center transition-colors group"
          >
            <LogOut size={15} className="mr-2 shrink-0 group-hover:text-[#ef4444] text-[#ef4444]" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;

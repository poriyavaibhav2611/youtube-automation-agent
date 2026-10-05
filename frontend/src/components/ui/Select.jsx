import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const Select = ({ options, value, onChange, placeholder = "Select..." }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full text-[13px]" ref={containerRef}>
      <div 
        className={`flex items-center justify-between w-full bg-[#101010] border ${isOpen ? 'border-[#52525b]' : 'border-[#2e2e32]'} rounded-md px-3 py-2 cursor-pointer hover:border-[#52525b] transition-colors`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={value ? "text-white" : "text-[#52525b]"}>{value || placeholder}</span>
        <ChevronDown size={14} className={`text-[#a1a1aa] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-[#1c1c1c] border border-[#2e2e32] rounded-md shadow-xl overflow-hidden py-1">
          {options.map((opt, i) => {
            const isSelected = value === opt;
            return (
              <div
                key={i}
                className={`px-3 py-2 cursor-pointer transition-colors text-[13px] ${
                  isSelected 
                    ? 'bg-[#d4ff32] text-black font-semibold' 
                    : 'text-[#a1a1aa] hover:text-white hover:bg-[#2e2e32]'
                }`}
                onClick={() => {
                  onChange(opt);
                  setIsOpen(false);
                }}
              >
                {opt}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Select;

import React, { useRef } from 'react';

const VerificationCodeInput = ({
  verificationCode,
  setVerificationCode,
  disabled,
  className = ''
}) => {
  const inputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  // Helper to split the string into array of length 6
  const getValues = () => {
    const vals = verificationCode.split('');
    const arr = [];
    for (let i = 0; i < 6; i++) {
      arr.push(vals[i] || '');
    }
    return arr;
  };

  const values = getValues();

  const focusInput = (index) => {
    if (index >= 0 && index < 6) {
      inputRefs[index].current?.focus();
    }
  };

  const handleChange = (e, index) => {
    const val = e.target.value;
    // Only accept numbers
    if (!/^[0-9]*$/.test(val)) return;

    const newValues = [...values];
    
    // If they typed a single character
    if (val.length <= 1) {
      newValues[index] = val;
      setVerificationCode(newValues.join(''));
      
      if (val !== '' && index < 5) {
        focusInput(index + 1);
      }
    } else {
      // It's a paste in a single input field
      handlePasteEvent(val, index);
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      if (values[index] === '' && index > 0) {
        // Move to previous and clear it
        const newValues = [...values];
        newValues[index - 1] = '';
        setVerificationCode(newValues.join(''));
        focusInput(index - 1);
      }
    } else if (e.key === 'ArrowLeft') {
      focusInput(index - 1);
    } else if (e.key === 'ArrowRight') {
      focusInput(index + 1);
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim();
    handlePasteEvent(pastedData, 0);
  };

  const handlePasteEvent = (pastedData, startIndex) => {
    if (!/^[0-9]+$/.test(pastedData)) return; // Only paste numbers

    const newValues = [...values];
    let currentIndex = startIndex;
    
    for (let i = 0; i < pastedData.length && currentIndex < 6; i++) {
      newValues[currentIndex] = pastedData[i];
      currentIndex++;
    }
    
    setVerificationCode(newValues.join(''));
    // Focus the next empty box or the last box
    focusInput(Math.min(currentIndex, 5));
  };

  return (
    <div className="flex justify-center gap-2 sm:gap-3 w-full" onPaste={handlePaste}>
      {values.map((v, index) => (
        <input
          key={index}
          ref={inputRefs[index]}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={v}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          disabled={disabled}
          className={`w-11 h-12 sm:w-12 sm:h-14 text-center text-xl sm:text-2xl font-bold rounded-lg bg-[#101010] border border-[#2e2e32] text-white shadow-sm focus:border-[#d4ff32] focus:bg-[#161616] focus:outline-none focus:ring-1 focus:ring-[#d4ff32] transition-colors ${className}`}
        />
      ))}
    </div>
  );
};

export default VerificationCodeInput;

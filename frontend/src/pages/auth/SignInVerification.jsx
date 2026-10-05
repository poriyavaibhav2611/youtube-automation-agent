import React, { useState, useContext } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { loginVerify } from '../../services/authService';
import { setCookie } from '../../utils/cookies';
import { UserContext } from '../../context/UserContext';
import { useHandleError } from '../../hooks/useHandleError';
import VerificationCodeInput from '../../components/VerificationCodeInput';
import { MessageBox } from '../../components/ui/MessageBox';

const SignInVerification = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const { handleError } = useHandleError();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      MessageBox('error', "Invalid verification link. Please log in again.");
      navigate('/login');
      return;
    }
    if (otp.length !== 6) {
      MessageBox('error', "Please enter all 6 digits.");
      return;
    }
    
    setLoading(true);
    try {
      const data = await loginVerify(otp, token);
      setCookie('token', data.token);
      setCookie('username', data.username || 'Admin');
      setUser({ username: data.username || 'Admin' });
      navigate('/');
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#101010] font-sans relative">
      
      {/* Absolute Top-Left Logo */}
      <div className="absolute top-8 left-8 flex items-center gap-2">
        <div className="w-6 h-6 bg-[#d4ff32] rounded flex items-center justify-center shrink-0">
           <svg className="w-[14px] h-[14px] text-black" viewBox="0 0 24 24" fill="currentColor">
             <path d="M21.582,6.186c-0.23-0.86-0.908-1.538-1.768-1.768C18.252,4,12,4,12,4S5.748,4,4.186,4.418 c-0.86,0.23-1.538,0.908-1.768,1.768C2,7.748,2,12,2,12s0,4.252,0.418,5.814c0.23,0.86,0.908,1.538,1.768,1.768 C5.748,20,12,20,12,20s6.252,0,7.814-0.418c0.86-0.23,1.538-0.908,1.768-1.768C22,16.252,22,12,22,12S22,7.748,21.582,6.186z M10,15.464V8.536L16,12L10,15.464z" />
           </svg>
        </div>
        <span className="text-white font-bold text-[17px] tracking-tight">YT Automation</span>
      </div>

      <div className="w-full max-w-md p-8 rounded-xl bg-[#1c1c1c] border border-[#2e2e32] shadow-xl">
        
        <div className="text-left mb-8">
          <h2 className="text-2xl font-semibold text-white tracking-tight mb-1">
            Verify Account
          </h2>
          <p className="text-[#a1a1aa] text-[13px]">Enter the 6-digit 2FA code</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="flex justify-center w-full">
            <VerificationCodeInput
              verificationCode={otp}
              setVerificationCode={setOtp}
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center items-center py-2.5 px-4 rounded-md text-[13px] font-semibold text-black bg-[#d4ff32] hover:bg-[#bce628] transition-colors shadow-sm"
          >
            <span className="flex items-center gap-2">
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Verifying...
                </>
              ) : (
                'Verify Code'
              )}
            </span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignInVerification;

import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/authService';
import { setCookie } from '../../utils/cookies';
import { UserContext } from '../../context/UserContext';
import { useHandleError } from '../../hooks/useHandleError';
import { Eye, EyeOff } from 'lucide-react';

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const { handleError } = useHandleError();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await login({ username, password });
      
      if (data.requires2FA) {
        navigate(`/verify-2fa?token=${data.token}`);
      } else {
        setCookie('token', data.token);
        setCookie('username', data.username);
        setUser({ username: data.username });
        navigate('/');
      }
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
            Sign In
          </h2>
          <p className="text-[#a1a1aa] text-[13px]">Enter your details to access your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-[13px] font-medium text-[#a1a1aa]">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="block w-full rounded-md bg-[#101010] border border-[#2e2e32] px-3 py-2.5 text-white text-[13px] placeholder-[#52525b] focus:border-[#d4ff32] focus:outline-none transition-colors"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-[13px] font-medium text-[#a1a1aa]">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="block w-full rounded-md bg-[#101010] border border-[#2e2e32] px-3 py-2.5 pr-10 text-white text-[13px] placeholder-[#52525b] focus:border-[#d4ff32] focus:outline-none transition-colors"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-[#71717a] hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center items-center py-2.5 px-4 rounded-md text-[13px] font-semibold text-black bg-[#d4ff32] hover:bg-[#bce628] transition-colors shadow-sm mt-2"
          >
            <span className="flex items-center gap-2">
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Authenticating...
                </>
              ) : (
                'Sign In'
              )}
            </span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;

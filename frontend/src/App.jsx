import React, { useRef, useEffect, useMemo } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createQueryClient } from './lib/queryClient';
import { UserProvider } from './context/UserContext';
import { useHandleError } from './hooks/useHandleError';
import ProtectedRoute from './components/shared/ProtectedRoute';
import Sidebar from './components/shared/Sidebar';
import SignIn from './pages/auth/SignIn';
import SignInVerification from './pages/auth/SignInVerification';
import Dashboard from './pages/Dashboard';
import Pipeline from './pages/pipeline/Pipeline';
import Analytics from './pages/analytics/Analytics';
import Engagement from './pages/engagement/Engagement';
import Operator from './pages/youtube/Operator';
import Checks from './pages/youtube/Checks';
import Calendar from './pages/calendar/Calendar';
import IdeaDetail from './pages/calendar/IdeaDetail';
import Setup from './pages/setup/Setup';
import Placeholder from './pages/Placeholder';

const Layout = ({ children }) => (
  <div className="flex bg-[#161616] h-screen font-sans overflow-hidden">
    <Sidebar />
    <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
      {children}
    </main>
  </div>
);

const GlobalProviders = ({ children }) => {
  const { handleError } = useHandleError();
  const handleErrorRef = useRef(handleError);
  
  useEffect(() => {
    handleErrorRef.current = handleError;
  }, [handleError]);

  const queryClient = useMemo(() => createQueryClient(handleErrorRef), []);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

function App() {
  return (
    <BrowserRouter>
      <GlobalProviders>
        <ToastContainer 
          hideProgressBar={true} 
          theme="dark" 
          position="bottom-right"
          toastStyle={{ 
            backgroundColor: '#1c1c1c', 
            border: '1px solid #2e2e32', 
            color: '#fff', 
            fontSize: '14px',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)'
          }}
        />
        <UserProvider>
          <Routes>
            <Route path="/login" element={<SignIn />} />
            <Route path="/verify-2fa" element={<SignInVerification />} />
            
            <Route path="/" element={
              <ProtectedRoute>
                <Layout><Dashboard /></Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/pipeline" element={
              <ProtectedRoute>
                <Layout><Pipeline /></Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/analytics" element={
              <ProtectedRoute>
                <Layout><Analytics /></Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/youtube/operator" element={
              <ProtectedRoute>
                <Layout><Operator /></Layout>
              </ProtectedRoute>
            } />

            <Route path="/youtube/checks" element={
              <ProtectedRoute>
                <Layout><Checks /></Layout>
              </ProtectedRoute>
            } />

            <Route path="/calendar" element={
              <ProtectedRoute>
                <Layout><Calendar /></Layout>
              </ProtectedRoute>
            } />

            <Route path="/calendar/ideas/:id" element={
              <ProtectedRoute>
                <Layout><IdeaDetail /></Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/engagement" element={
              <ProtectedRoute>
                <Layout><Engagement /></Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/setup" element={
              <ProtectedRoute>
                <Layout><Setup /></Layout>
              </ProtectedRoute>
            } />

            <Route path="*" element={
              <ProtectedRoute>
                <Layout><Placeholder /></Layout>
              </ProtectedRoute>
            } />
            
          </Routes>
        </UserProvider>
      </GlobalProviders>
    </BrowserRouter>
  );
}

export default App;

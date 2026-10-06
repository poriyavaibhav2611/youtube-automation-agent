import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ArrowLeft, Play, LayoutList, PenTool, CheckCircle, Video, FileText, Sparkles, Loader2 } from 'lucide-react';
import { toast } from 'react-toastify';
import Header from '../../components/shared/Header';
import { fetchIdeaById, generateScriptForIdea } from '../../services/ideaService';

const IdeaDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [angle, setAngle] = useState('');
  const [whyWorthMaking, setWhyWorthMaking] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const { data: idea, isLoading, isError } = useQuery({
    queryKey: ['idea', id],
    queryFn: () => fetchIdeaById(id),
  });

  useEffect(() => {
    if (idea) {
      setAngle(idea.angle || '');
      setWhyWorthMaking(idea.whyWorthMaking || '');
    }
  }, [idea]);

  const generateMutation = useMutation({
    mutationFn: () => generateScriptForIdea(id),
    onMutate: () => setIsGenerating(true),
    onSuccess: () => {
      setIsGenerating(false);
      toast.success('Script generated and moved to Pipeline!');
      queryClient.invalidateQueries(['idea', id]);
      navigate('/pipeline');
    },
    onError: (error) => {
      setIsGenerating(false);
      toast.error(error.message || 'Failed to generate script');
    }
  });

  const handleGenerateScript = () => {
    if (!isGenerating) {
      generateMutation.mutate();
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col h-full w-full font-sans bg-[#101010] text-white">
        <Header subtitle="EDITORIAL PLANNING" title="Idea Details" />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-[#a1a1aa] text-[13px] font-medium">Loading idea...</p>
        </div>
      </div>
    );
  }

  if (isError || !idea) {
    return (
      <div className="flex flex-col h-full w-full font-sans bg-[#101010] text-white">
        <Header subtitle="EDITORIAL PLANNING" title="Idea Details" />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-red-400 text-[13px] font-medium">Error loading idea details.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full w-full font-sans bg-[#101010] text-white overflow-y-auto">
      <Header 
        subtitle="IDEA BACKLOG"
        title="Content details"
      />

      <div className="p-8 max-w-4xl mx-auto w-full">
        <button 
          onClick={() => navigate('/calendar')}
          className="flex items-center gap-2 text-[13px] text-[#a1a1aa] hover:text-white transition-colors mb-6 font-medium"
        >
          <ArrowLeft size={14} />
          Back to Calendar
        </button>

        <div className="bg-[#161616] border border-[#262626] rounded-2xl p-8 shadow-sm">
          <div className="flex items-start justify-between mb-6">
            <h1 className="text-2xl font-bold text-white tracking-tight leading-tight max-w-[80%]">{idea.topic}</h1>
            <span className="shrink-0 bg-[#d4ff32] text-black text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">{idea.format}</span>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="flex items-center gap-2 text-[12px] font-bold text-[#d4ff32] uppercase tracking-[0.15em] mb-2">
                <PenTool size={14} /> The Angle
              </h3>
              <textarea 
                value={angle}
                onChange={(e) => setAngle(e.target.value)}
                rows={3}
                placeholder="No specific angle defined."
                className="w-full text-[14px] text-[#e4e4e7] leading-relaxed bg-[#1c1c1c] border border-[#2e2e32] hover:border-[#3f3f46] focus:border-[#d4ff32] focus:ring-1 focus:ring-[#d4ff32] transition-colors p-4 rounded-xl outline-none resize-none shadow-sm"
              />
            </div>

            <div>
              <h3 className="flex items-center gap-2 text-[12px] font-bold text-[#d4ff32] uppercase tracking-[0.15em] mb-2">
                <CheckCircle size={14} /> Why it's worth making
              </h3>
              <textarea 
                value={whyWorthMaking}
                onChange={(e) => setWhyWorthMaking(e.target.value)}
                rows={3}
                placeholder="No justification provided."
                className="w-full text-[14px] text-[#e4e4e7] leading-relaxed bg-[#1c1c1c] border border-[#2e2e32] hover:border-[#3f3f46] focus:border-[#d4ff32] focus:ring-1 focus:ring-[#d4ff32] transition-colors p-4 rounded-xl outline-none resize-none shadow-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-[#262626]">
              <div className="bg-[#1c1c1c] border border-[#2e2e32] p-4 rounded-xl flex flex-col gap-1">
                <span className="text-[11px] text-[#a1a1aa] font-medium uppercase tracking-wider">Status</span>
                <span className="text-[14px] text-white font-semibold capitalize flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                  {idea.status}
                </span>
              </div>
              <div className="bg-[#1c1c1c] border border-[#2e2e32] p-4 rounded-xl flex flex-col gap-1">
                <span className="text-[11px] text-[#a1a1aa] font-medium uppercase tracking-wider">Created</span>
                <span className="text-[14px] text-white font-semibold">
                  {new Date(idea.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                </span>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-[#262626] flex gap-4 items-start">
            <div className="flex-1 flex flex-col gap-2">
              <button 
                onClick={handleGenerateScript}
                disabled={isGenerating}
                className="w-full bg-[#d4ff32] hover:bg-[#bce628] disabled:bg-[#d4ff32]/70 disabled:cursor-not-allowed text-black text-[13px] font-bold py-3 rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                {isGenerating ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
                {isGenerating ? 'Generating Script...' : 'Generate Script'}
              </button>
              <p className="text-[11px] text-[#71717a] text-center font-medium">Powered by Gemini 3.5 Flash • Target length: 2-4 mins</p>
            </div>
            <button 
              disabled={idea.status === 'backlog'}
              className={`flex-1 text-[13px] font-bold py-3 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 ${
                idea.status === 'backlog'
                  ? 'bg-[#161616] border border-[#262626] text-[#52525b] cursor-not-allowed opacity-50'
                  : 'bg-[#1c1c1c] hover:bg-[#27272a] border border-[#2e2e32] text-white'
              }`}
            >
              <Video size={16} />
              Schedule Video
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdeaDetail;

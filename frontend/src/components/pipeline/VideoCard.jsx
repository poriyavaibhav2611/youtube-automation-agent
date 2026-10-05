import React from 'react';
import { Play, Clock, MoreVertical } from 'lucide-react';

const VideoCard = ({ production }) => {
  return (
    <div className="bg-[#161616] border border-[#262626] rounded-xl overflow-hidden hover:border-[#3f3f46] transition-all group">
      {/* Thumbnail Placeholder */}
      <div className="relative aspect-video bg-[#101010] border-b border-[#262626] flex items-center justify-center group-hover:bg-[#1a1a1a] transition-colors cursor-pointer">
        <Play size={32} className="text-[#3f3f46] group-hover:text-[#d4ff32] transition-colors" />
        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] font-mono px-1.5 py-0.5 rounded">
          10:24
        </div>
      </div>
      
      {/* Card Content */}
      <div className="p-4">
        <div className="flex justify-between items-start gap-3 mb-2">
          <h3 className="font-semibold text-white text-sm line-clamp-2 leading-tight">
            {production.title || "Untitled Video Generation"}
          </h3>
          <button className="text-[#71717a] hover:text-white transition-colors">
            <MoreVertical size={16} />
          </button>
        </div>
        
        <div className="flex justify-between items-end mt-4">
          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] text-[#71717a] font-mono flex items-center gap-1">
              <Clock size={10} /> {new Date().toLocaleDateString()}
            </span>
            <span className="text-[10px] text-[#71717a] font-mono">
              ID: {production._id?.substring(0, 8)}
            </span>
          </div>
          
          <div className="flex items-center gap-1.5 bg-[#1c1c1c] border border-[#262626] px-2 py-1 rounded-md">
            <span className={`w-1.5 h-1.5 rounded-full ${
              production.status === 'PUBLISHED' ? 'bg-[#d4ff32]' : 
              production.status === 'NEEDS_REVIEW' ? 'bg-[#f59e0b]' : 
              production.status === 'ERROR' ? 'bg-[#ef4444]' : 'bg-[#3b82f6]'
            }`}></span>
            <span className="text-[10px] text-[#a1a1aa] font-medium uppercase tracking-wider">
              {production.status?.replace(/_/g, ' ') || 'PROCESSING'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;

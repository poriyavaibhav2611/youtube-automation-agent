import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getProductions, approveProduction } from '../../services/productionService';
import { QUERY_KEYS } from '../../lib/queryKeys';
import { useHandleError } from '../../hooks/useHandleError';

const ReviewStudio = () => {
  const queryClient = useQueryClient();
  const { handleError } = useHandleError();

  const { data: productions, isLoading, error } = useQuery({
    queryKey: [QUERY_KEYS.PRODUCTIONS],
    queryFn: getProductions
  });

  const approveMutation = useMutation({
    mutationFn: approveProduction,
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEYS.PRODUCTIONS]);
    },
    onError: handleError
  });

  if (isLoading) return <div>Loading Productions...</div>;
  if (error) return <div>Error loading productions</div>;

  const needsReview = productions?.filter(p => p.status === 'NEEDS_REVIEW') || [];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Review Studio</h2>
      {needsReview.length === 0 ? (
        <p>No videos pending review.</p>
      ) : (
        <div className="space-y-4">
          {needsReview.map((prod) => (
            <div key={prod._id} className="border p-4 rounded flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-lg">{prod.title}</h3>
                <p className="text-sm text-gray-500">Status: {prod.status}</p>
                {prod.finalVideoUrl && (
                  <video src={prod.finalVideoUrl} controls className="mt-2 h-48 rounded" />
                )}
              </div>
              <div className="space-x-2">
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                  onClick={() => approveMutation.mutate(prod._id)}
                  disabled={approveMutation.isPending}
                >
                  {approveMutation.isPending ? 'Approving...' : 'Approve & Upload'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewStudio;

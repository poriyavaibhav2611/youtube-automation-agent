import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query'

export const createQueryClient = (handleErrorRef) =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: 0,
        refetchOnWindowFocus: false,
        refetchOnMount: true,
        refetchOnReconnect: true,
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
      },
    },
    queryCache: new QueryCache({
      onError: (error, query) => {
        if (handleErrorRef?.current) {
          handleErrorRef.current(
            error,
            true,
            Boolean(query?.meta?.skipGlobalErrorToast),
          )
        }
      },
    }),
    mutationCache: new MutationCache({
      onError: (error) => {
        if (handleErrorRef?.current) {
          handleErrorRef.current(error, true, true)
        }
      },
    }),
  })

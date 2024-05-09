import { QueryClient, QueryClientConfig } from '@tanstack/react-query';

export const queryClient = (queryClientConfig?: QueryClientConfig) => new QueryClient(queryClientConfig);
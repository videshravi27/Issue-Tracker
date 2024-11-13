'use client';

import { QueryClient, QueryClientProvider as ReactQueryCientProvider } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';

const queryClient = new QueryClient();

const QueryClientProvider = ({ children }: PropsWithChildren ) => {
  return (
    <ReactQueryCientProvider client={queryClient}>
        {children}
    </ReactQueryCientProvider>
  )
}

export default QueryClientProvider

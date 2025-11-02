import * as React from 'react';
import { Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Header from '@/components/Header';

const queryClient = new QueryClient();

export const Route = createRootRoute({
  component: RootComponent,
  errorComponent: ({ error }) => (
    <div>
      <Header />
      {error.message}
    </div>
  ),
  notFoundComponent: () => <div>Page not found</div>,
});

function RootComponent() {
  return (
    <QueryClientProvider client={queryClient}>
      <React.Fragment>
        <Header />
        <Outlet />
        <TanStackRouterDevtools />
      </React.Fragment>
    </QueryClientProvider>
  );
}

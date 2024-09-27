import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AppRouter } from './AppRouter.tsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FeedbackAppController } from '../features';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppRouter />
        <FeedbackAppController />
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
);

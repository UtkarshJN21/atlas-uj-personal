import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MainLayout } from '@/components/layout';
import { AwardAllocationPage } from '@/pages/awards/AwardAllocationPage';
import { AwardDetailsPage } from '@/pages/awards/AwardDetailsPage';
import { AwardReviewPage } from '@/pages/awards/AwardReviewPage';
import './index.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Navigate to="/awards/allocate" replace />} />
            <Route path="/awards/allocate" element={<AwardAllocationPage />} />
            <Route path="/awards/details" element={<AwardDetailsPage />} />
            <Route path="/awards/review" element={<AwardReviewPage />} />
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;

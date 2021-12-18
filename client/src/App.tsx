import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query'
import Layout from './components/Layout/Layout';
import Cats from './components/Cats/Cats';
import Breeds from './components/Breeds/Breeds';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    }
  }
});

const App : React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Navigate to="/breeds" />} />
            <Route path="/breeds" element={<Breeds />}/>
            <Route path="/cats" element={<Cats />}/>
          </Routes>
        </Layout>
      </Router>
    </QueryClientProvider>
  );
};

export default App;

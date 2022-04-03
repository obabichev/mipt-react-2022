import * as React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import ProductsListPage from './pages/ProductsListPage';
import ProductPage from './pages/ProductPage';

const queryClient = new QueryClient();

const App = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="product">
            <Route path="list" element={<ProductsListPage />} />
            <Route path=":id" element={<ProductPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/product/list" replace />} />
        </Routes>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;

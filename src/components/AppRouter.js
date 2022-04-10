import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ProductsPage } from './ProductsPage';
import { ProductPage } from './ProductPage';
import { Test } from './Test';
import { LocalStorageTest } from './LocalStorageTest';
import { UseIntervalTest } from './UseIntervalTest';
import { TestServerApi } from './TestServerApi';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

const queryClient = new QueryClient();

const AppRouter = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/product/:usin" element={<ProductPage />} />
          <Route path="/test" element={<Test />} />
          <Route path="/lst" element={<LocalStorageTest />} />
          <Route path="/uit" element={<UseIntervalTest />} />
          <Route path="/test-server-api" element={<TestServerApi />} />
        </Routes>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default AppRouter;

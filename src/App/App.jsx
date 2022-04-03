import { Layout } from 'antd';
import * as React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import Header from '../components/Header';

import ProductsListPage from './pages/ProductsListPage';
import ProductPage from './pages/ProductPage';

import './App.css';

const queryClient = new QueryClient();

const App = () => (
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <Layout className="root">
        <Header />
        <Routes>
          <Route path="product">
            <Route path="list" element={<ProductsListPage />} />
            <Route path=":usin" element={<ProductPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/product/list" replace />} />
        </Routes>
      </Layout>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </BrowserRouter>
);

export default App;

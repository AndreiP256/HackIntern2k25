import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PopupProvider } from './components/popup/PopupProvider'; // Adjusted path

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <PopupProvider>
        <App />
      </PopupProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

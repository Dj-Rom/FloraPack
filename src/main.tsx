import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import store from './redux/store.tsx';
import App from './App.tsx';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter
        future={{
          v7_relativeSplatPath: true, v7_startTransition: true,
        }}
      >
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);


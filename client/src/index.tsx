import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store/store';
import './i18n';

import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { Modal } from './components/Modal/Modal';
import '@fontsource/roboto/300.css';
import '@fontsource/neucha';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
        <Modal />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';

import { App } from '@/App';
import '@/index.css';
import '@/i18n';
import { store } from '@/store';
import { Notifications } from '@/common/notification';
import { Toaster } from '@/components/ui/sonner.tsx';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <HelmetProvider context={{}}>
      <BrowserRouter>
        <App />
        <Notifications />
        <Toaster position="top-right" />
      </BrowserRouter>
    </HelmetProvider>
  </Provider>,
);

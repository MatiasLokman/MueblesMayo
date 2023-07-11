import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';

import Loader from './components/Loaders/Loader';

const LoaderContent = lazy(() => import('./App'));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Suspense fallback={
      <Loader />}>
      <LoaderContent />
    </Suspense>
  </React.StrictMode>
);


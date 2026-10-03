import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { AppProviders } from '../providers/AppProviders.js';
import { router } from '../routes/appRouter.js';

export const App: React.FC = () => {
  return (
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>
  );
};

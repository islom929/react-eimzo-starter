import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { RouteGuard } from '@/hoc';

export const DefaultLayout: FC = () => {
  return (
    <RouteGuard>
      <div className="flex items-stretch min-h-screen w-full">
        <Helmet>
          <title>React Starter</title>
        </Helmet>

        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </RouteGuard>
  );
};

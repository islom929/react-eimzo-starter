import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export const AuthLayout: FC = () => {
  return (
    <div className="flex items-stretch h-screen w-full bg-white overflow-hidden">
      <Helmet>
        <title>React Starter</title>
      </Helmet>
      <Outlet />
    </div>
  );
};

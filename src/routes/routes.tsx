import { RouteObject } from 'react-router-dom';
import { ROUTE_HOME, ROUTE_LOGIN } from '@/common/constants';
import { DefaultLayout } from '@/layouts';
import { Auth } from '../features/auth/components/Auth.tsx';
import { HomePage } from '@/pages/home-page';
import { AuthLayout } from '@/layouts/AuthLayout.tsx';

export const routes = (): RouteObject[] => {
  return [
    {
      path: ROUTE_HOME,
      caseSensitive: true,
      element: <DefaultLayout />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
      ],
    },
    {
      path: ROUTE_LOGIN,
      caseSensitive: true,
      element: <AuthLayout />,
      children: [
        {
          index: true,
          element: <Auth />,
        },
      ],
    },
  ];
};

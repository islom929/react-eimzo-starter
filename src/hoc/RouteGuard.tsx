import { Fragment } from 'react';

export const RouteGuard = ({ children }: { children: React.ReactNode }) => {
  // if you need ---

  // if (!localStorage.getItem(BASE_AUTH_TOKEN)) {
  //   return <Navigate to={ROUTE_LOGIN} />;
  // }

  return <Fragment>{children}</Fragment>;
};

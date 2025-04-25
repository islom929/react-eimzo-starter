import { Provider } from 'react-redux';
import { store } from './store/store';
import { useLocation, useRoutes } from 'react-router-dom';
import { routes } from './routes';

export const App = () => {
  const { pathname } = useLocation();

  return (
    <Provider store={store}>
      {useRoutes([
        ...routes(),
        {
          path: '*',
          element: <div> 404 </div>,
        },
      ])}
    </Provider>
  );
};

import App from './app/App';
import Error404 from './app/error/404/Error404';
import home from './app/home/routes';

export default [
  {
    component: App,
    routes: [
      ...home,
      {
        path: '*',
        component: Error404,
      },
    ],
  },
];

import { App, Home } from '@Containers';

const routes = [{
  component: App,
  routes: [
    {
      path: '/',
      exact: true,
      component: Home,
    },
  ],
}];

export default routes;

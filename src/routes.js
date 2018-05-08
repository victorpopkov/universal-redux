import { App, Home } from '@Containers';

export default () => [{
  component: App,
  routes: [
    {
      path: '/',
      exact: true,
      component: Home,
    },
  ],
}];

import App from './app/App';
import home from './app/home/routes';

export default [{
  component: App,
  routes: [
    ...home,
  ],
}];

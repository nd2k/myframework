import './styles/styles.scss';
import './components/navbar/navbar';

import Router from './routes/router';

import homeView from './views/home';
import dashboardView from './views/dashboard';
import signInView from './views/signin';
import signUpView from './views/signup';
import errorView from './views/404';

const myRouter = new Router([
  {
    path: '/',
    name: 'Home',
    view: homeView,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    view: dashboardView,
  },
  {
    path: '/signin',
    name: 'Sign In',
    view: signInView,
  },
  {
    path: '/signup',
    name: 'Sign Up',
    view: signUpView,
  },
  {
    path: '/error',
    name: '404',
    view: errorView,
  },
]);

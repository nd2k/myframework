import './styles/styles.scss';
import './helpers/eventBus';
import './components/navbar/navbar';
import './components/drawer/drawer';
import './components/form/form-field/form-field';
import './components/form/form-textarea/form-textarea';
import './components/button/button';
import './components/form/form';
import './helpers/activelink';

import Router from './routes/router';

import homeView from './views/home/home';
import dashboardView from './views/dashboard/dashboard';
import signInView from './views/signin/signin';
import signUpView from './views/signup/signup';
import errorView from './views/404';
import projectView from './views/project/projectView';

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
    path: '/projects',
    name: 'Project',
    view: projectView,
  },
  {
    path: '/error',
    name: '404',
    view: errorView,
  },
]);

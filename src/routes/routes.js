import LayoutBasic from 'layouts/LayoutBasic';
import { Home, Error, User } from 'pages';

const routes = [
  {
    path: '/',
    layout: LayoutBasic,
    component: Home,
    exact: true,
  },
  {
    path: '/:username',
    layout: LayoutBasic,
    component: User,
    exact: true,
  },
  {
    layout: LayoutBasic,
    component: Error,
  },
];

export default routes;

/**
 * Asynchronously loads the component for HomePage
 */

import { lazyLoad } from 'utils/loadable';

export const TeamPage = lazyLoad(
  () => import('./index'),
  module => module.TeamPage,
);

import environment from './environment';
import { PLATFORM } from 'aurelia-pal';
import 'babel-polyfill';
import * as Bluebird from 'bluebird';

import state from './state';

import './styles/application.scss';

Bluebird.config({ warnings: { wForgottenReturn: false } });

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .feature(PLATFORM.moduleName('todo/index'));

  aurelia.use.plugin(PLATFORM.moduleName('aurelia-animator-css'));

  aurelia.use
    .plugin(PLATFORM.moduleName('@aurelia-ux/core'))
    .plugin(PLATFORM.moduleName('@aurelia-ux/components'));

  if (environment.debug) {
    aurelia.use.developmentLogging();
  }

  if (environment.testing) {
    aurelia.use.plugin(PLATFORM.moduleName('aurelia-testing'));
  }

  aurelia.use.plugin(PLATFORM.moduleName('aurelia-store'), { initialState: state });

  aurelia.start().then(() => aurelia.setRoot(PLATFORM.moduleName('app')));
}

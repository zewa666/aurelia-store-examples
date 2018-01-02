/// <reference types="aurelia-loader-webpack/src/webpack-hot-interface"/>
// we want font-awesome to load as soon as possible to show the fa-spinner
import { Aurelia } from 'aurelia-framework'
import { PLATFORM } from 'aurelia-pal';

import environment from './environment';
import { initialState } from './state';

export function configure(aurelia: Aurelia) {
  aurelia.use
    .standardConfiguration();

  if (environment.debug) {
    aurelia.use.developmentLogging();
  }

  if (environment.testing) {
    aurelia.use.plugin(PLATFORM.moduleName('aurelia-testing'));
  }

  aurelia.use.plugin(PLATFORM.moduleName('aurelia-store'), {
    initialState,
    history: { undoable: true }
  });

  aurelia.start().then(() => aurelia.setRoot(PLATFORM.moduleName('app')));
}

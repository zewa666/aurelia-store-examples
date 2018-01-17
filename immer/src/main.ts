import { Aurelia } from 'aurelia-framework'
import { Store } from 'aurelia-store';

import environment from './environment';
import { initialState } from './state';

export function configure(aurelia: Aurelia) {
  aurelia.use
    .standardConfiguration()
    .feature('resources');

  if (environment.debug) {
    aurelia.use.developmentLogging();
  }

  if (environment.testing) {
    aurelia.use.plugin('aurelia-testing');
  }


  aurelia.use.plugin('aurelia-store', { initialState });

  aurelia.start().then(() => aurelia.setRoot());
}

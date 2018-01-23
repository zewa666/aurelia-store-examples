import { Aurelia } from 'aurelia-framework'
import { Store } from 'aurelia-store';

import environment from './environment';
import { initialState } from './developer/data/developer-models';

export function configure(aurelia: Aurelia) {
  aurelia.use.plugin('aurelia-store', {
    initialState
  });

  /* 
   * register only higher order components (HOC) as global resource
   * child components are most of the time meant to be orchestrated by those
   * and shouldn't be rendered directly.
   * The reason is that childs should not directly request the state, but get it passed
   * by their HOC's
   */
  aurelia.use
    .standardConfiguration()
    .globalResources(["./developer/developer-overview"]);

  if (environment.debug) {
    aurelia.use.developmentLogging();
  }

  if (environment.testing) {
    aurelia.use.plugin('aurelia-testing');
  }

  aurelia.start().then(() => aurelia.setRoot());
}

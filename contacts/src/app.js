import { EventAggregator } from 'aurelia-event-aggregator';
import { Store } from 'aurelia-store';
import { WebAPI } from './web-api';
import { routerPerformedNavigation } from './actions/router';
import {
  loadContacts,
  loadContactDetails,
  saveContact,
  setSelectedId
} from './actions/contact';

export class App {
  static inject = [WebAPI, Store, EventAggregator];
  subscriptions = [];

  constructor(api, store, ea) {
    this.api = api;
    this.store = store;
    this.ea = ea;

    this.subscriptions.push(this.store.state.subscribe((state) => {
      this.state = state;
    }));
    this.bootstrapActions();
  }

  configureRouter(config, router) {
    config.title = 'Contacts';
    config.map([
      { route: '', moduleId: 'no-selection', title: 'Select' },
      { route: 'contacts/:id', moduleId: 'contact-detail', name: 'contacts' }
    ]);

    this.router = router;

    // TODO: need router support for this
    let isDevToolsNavigation = false;

    // setup listener for new routes
    this.subscriptions.push(this.ea.subscribe('router:navigation:complete', (event) => {
      if (!isDevToolsNavigation) {
        isDevToolsNavigation = false;
        this.store.dispatch(routerPerformedNavigation, event.instruction.fragment);
      }
    }));

    // setup listener for statechanges to jump to given state
    this.subscriptions.push(this.store.state.subscribe((state) => {
      if (!this.router.currentInstruction) {
        return;
      }

      const currentRoute = this.router.currentInstruction.fragment;
      if (currentRoute !== state.router.currentRoute) {
        isDevToolsNavigation = true;
        this.router.navigate(state.router.currentRoute);
      }
    }));
  }

  bootstrapActions() {
    this.store.registerAction(routerPerformedNavigation.name, routerPerformedNavigation);
    this.store.registerAction(loadContacts.name, loadContacts);
    this.store.registerAction(setSelectedId.name, setSelectedId);
    this.store.registerAction(loadContactDetails.name, loadContactDetails);
    this.store.registerAction(saveContact.name, saveContact);
  }

  detached() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}

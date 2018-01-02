import { Store } from 'aurelia-store';
import { WebAPI } from './web-api';
import { areEqual } from './utility';
import {
  loadContactDetails,
  saveContact
} from './actions/contact';

export class ContactDetail {

  static inject = [WebAPI, Store];
  constructor(api, store) {
    this.api = api;
    this.store = store;
    this.store.state.subscribe( state => this.state = state );
  }

  activate(params, routeConfig) {
    this.routeConfig = routeConfig;

    return this.store.dispatch(loadContactDetails, params.id, this.api.getContactDetails.bind(this.api), routeConfig);
  }

  get canSave() {
    return this.state.contact.firstName && this.state.contact.lastName && !this.api.isRequesting;
  }

  save() {
    this.store.dispatch(saveContact, this.state.contact, this.api.saveContact.bind(this.api), this.routeConfig);
  }

  canDeactivate() {
    if (!areEqual(this.state.originalContact, this.state.contact)) {
      const result = confirm('You have unsaved changes. Are you sure you wish to leave?');

      if (!result) {
        this.state.contact = Object.assign({}, this.state.originalContact);
      }

      return result;
    }

    return true;
  }
}

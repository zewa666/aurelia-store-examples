import { Store } from 'aurelia-store';
import { bindable } from 'aurelia-framework';
import { WebAPI } from './web-api';
import {
  loadContacts,
  setSelectedId
} from './actions/contact';

export class ContactList {
  static inject = [WebAPI, Store];

  @bindable() contacts = [];
  @bindable() selectedId;

  constructor(api, store) {
    this.api = api;
    this.store = store;
  }

  created() {
    this.store.dispatch(loadContacts, this.api.getContactList.bind(this.api));
  }

  select(contact) {
    this.store.dispatch(setSelectedId, contact.id);

    return true;
  }

  contactChanged(newContact) {
    this.select(newContact);
  }
}

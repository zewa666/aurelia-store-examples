import { Store } from 'aurelia-store';
import * as Actions from '../actions';

export class TodoActions {
  static inject = [Store];

  constructor(store) {
    this.store = store;
    this.actions = Actions;
  }
}

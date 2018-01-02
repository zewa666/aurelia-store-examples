import { autoinject, bindable } from 'aurelia-framework';
import { Store, jump, StateHistory } from 'aurelia-store';

import { State } from './state';
import { updateText } from './actions';

@autoinject()
export class Markdown {
  @bindable() public state: StateHistory<State>;

  constructor(private store: Store<StateHistory<State>>) { }

  keyupHandler(newValue) {
    this.store.dispatch(updateText, newValue);
  }

  undo() {
    this.store.dispatch(jump, -1);
  }

  redo() {
    this.store.dispatch(jump, 1);
  }
}

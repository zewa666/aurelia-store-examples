import { autoinject } from 'aurelia-framework';
import { Store, StateHistory } from 'aurelia-store';

import { State } from './state';
import { updateText } from './actions';

@autoinject()
export class App {
  public state: StateHistory<State>;

  constructor(private store: Store<StateHistory<State>>) {
    this.store.state.subscribe(state => this.state = state);
    this.store.registerAction("UpdateText", updateText);
  }
}

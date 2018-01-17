import { autoinject } from 'aurelia-framework';
import { Store } from 'aurelia-store';
import produce from 'immer';
import { setAutoFreeze } from 'immer';

import { State } from './state';

setAutoFreeze(false);

@autoinject()
export class App {
  public state: State;

  constructor(private store: Store<State>) {
    this.store.state.subscribe((state) => {
      this.state = state;
    });

    this.store.registerAction(increaseCounter.name, increaseCounter);
    this.store.registerAction(decreaseCounter.name, decreaseCounter);
  }

  public increase() {
    this.store.dispatch(increaseCounter);
  }

  public decrease() {
    this.store.dispatch(decreaseCounter);
  }
}

function increaseCounter(state: State) {
  return produce(state, (draftState: State) => {
    draftState.counter++;
  });
}

function decreaseCounter(state: State) {
  return produce(state, (draftState: State) => {
    draftState.counter--;
  });
}

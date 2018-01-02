import { State } from './state';
import * as marked from 'marked';
import { nextStateHistory, StateHistory } from 'aurelia-store';

export function updateText(state: StateHistory<State>, text: string) {
  return nextStateHistory(state, Object.assign({}, state, {
    raw: text,
    html: marked(text)
  }));
};

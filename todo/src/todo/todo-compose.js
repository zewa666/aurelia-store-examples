import { containerless } from 'aurelia-framework';
import * as Actions from '../actions';

@containerless()
export class TodoCompose {
  composedTodo = '';

  constructor() {
    this.actions = Actions;
  }

  addTodo() {
    this.actions.addTodo(this.composedTodo);
    this.composedTodo = '';
  }
}

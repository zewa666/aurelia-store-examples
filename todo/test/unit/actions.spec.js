import { Container } from 'aurelia-dependency-injection';
import { Store } from 'aurelia-store';

import { addTodo, completeTodo, editTodo, deleteTodo, activateTodoEditMode } from '../../src/actions';

describe('Test application actions', () => {
  let container;
  let store;

  beforeEach(() => {
    container = new Container().makeGlobal();
    store = container.get(Store);
  });

  it('addTodo function should dispatch with supplied text value', () => {
    spyOn(store, 'dispatch');

    const text = 'Pick up Rob Eisenberg from the airport';

    addTodo(text);

    expect(store.dispatch).toHaveBeenCalledWith(() => {}, text);
  });
});

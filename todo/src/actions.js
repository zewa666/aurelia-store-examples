import store from './store';

import * as Mutations from './mutations';

function addTodo(text = '') {
  store.dispatch(Mutations.addTodo, text);
}

function completeTodo(todo) {
  store.dispatch(Mutations.completeTodo, todo);
}

function editTodo(todo) {
  store.dispatch(Mutations.editTodo, todo);
}

function deleteTodo() {
  store.dispatch(Mutations.deleteTodo);
}

function activateTodoEditMode(todo) {
  store.dispatch(Mutations.activateTodoEditMode, todo);
}

export {
  addTodo,
  completeTodo,
  editTodo,
  deleteTodo,
  activateTodoEditMode
};

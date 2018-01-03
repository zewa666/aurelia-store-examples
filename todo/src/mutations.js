import { guid } from './helper';
import colours from './colours';

import store from './store';

/**
 * Mutations are merely dispatched actions, the logic that 
 * makes changes to your state management store is handled
 * from within here.
 * 
 */

function addTodo(state, text) {
  const newTodo = {
    id: guid(),
    background: colours[Math.floor(Math.random() * colours.length)],
    isEditing: false,
    isComplete: false,
    text
  };

  const newState = Object.assign({}, state, { todos: [...state.todos, newTodo] });

  return newState;
}

function editTodo(state, todo) {
  todo.isEditing = false;

  return updateTodoCollection(state, todo);
}

function completeTodo(state, todo) {
  todo.isComplete = !todo.isComplete;

  return updateTodoCollection(state, todo);
}

function deleteTodo(state) {
  // const newState = Object.assign({}, state);
  // const filtered = newState.todos.filter(todo => todo.text !== newState.activeTodo.text);

  // newState.todos = filtered;
  // newState.activeTodo = newState.todos[0];

  // return newState;
}

function activateTodoEditMode(state, todo) {
  todo.isEditing = true;

  return updateTodoCollection(state, todo);
}

function updateTodoCollection(state, todo) {
  const newState = Object.assign({}, state);
  const todoIdx = newState.todos.findIndex((t) => t.id === todo.id);

  newState.todos = [
    ...newState.todos.slice(0, todoIdx),
    todo,
    ...newState.todos.slice(todoIdx + 1)
  ];

  return newState;
}

store.registerAction('addTodo', addTodo);
store.registerAction('completeTodo', completeTodo);
store.registerAction('editTodo', editTodo);
store.registerAction('deleteTodo', deleteTodo);
store.registerAction('activateTodoEditMode', activateTodoEditMode);

export {
  addTodo,
  completeTodo,
  editTodo,
  deleteTodo,
  activateTodoEditMode
};

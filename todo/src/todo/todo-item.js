import { bindable, containerless } from 'aurelia-framework';

import { activateTodoEditMode, completeTodo, editTodo } from '../actions';

@containerless()
export class TodoItem {
  @bindable() data;

  selectItem() {
    if (!this.data.isEditing) {
      activateTodoEditMode(this.data);
    }
  }

  completeTodo() {
    if (!this.data.isEditing) {
      completeTodo(this.data);
    }
  }

  saveChanges() {
    editTodo(this.data);
  }
}

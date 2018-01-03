import {PLATFORM} from 'aurelia-pal';

export function configure(config) {
  config.globalResources([
    PLATFORM.moduleName('todo/todo-actions'),
    PLATFORM.moduleName('todo/todo-list'),
    PLATFORM.moduleName('todo/todo-item'),
    PLATFORM.moduleName('todo/todo-compose')
  ]);
}

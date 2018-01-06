import { Store } from 'aurelia-store';

const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

export class App {
  static inject = [Store]
  constructor(store) {
    this.store = store;
    this.store.state.subscribe(state => this.state = state);
    this.store.registerAction('Send notification', sendNotification);
    this.store.registerMiddleware(notifyElectronMiddleware, 'after');
  }

  createNotification(newTitle, newText) {
    this.store.dispatch(sendNotification, newTitle, newText);
  }
}

function sendNotification(state, title, text) {
  return Object.assign({}, state, {
    message: { title, text }
  });
}

function notifyElectronMiddleware(state) {
  ipcRenderer.send('state-change', state);
}

import { Store } from 'aurelia-store';
import { StyleEngine } from '@aurelia-ux/core';
import { UxInputTheme } from '@aurelia-ux/input';

export class App {
  static inject = [Store, StyleEngine];

  constructor(store, styleEngine) {
    this.store = store;

    const theme = new UxInputTheme();

    theme.foreground = '#fff';

    styleEngine.ensureDefaultTheme(theme);
  }

  attached() {
    this.store.state.subscribe((state) => {
      this.state = state;
    });
  }
}

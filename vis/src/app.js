import { Store } from 'aurelia-store';
import { HttpClient } from 'aurelia-fetch-client';

export class App {
  static inject = [Store, HttpClient];

  constructor(store, http) {
    this.http = http;
    this.http.configure(config => {
      config
        .useStandardConfiguration()
        .withBaseUrl('https://api.github.com/');
    });

    this.searchedUser = '';

    this.addUserAction = wrapWithHttp(this.http);
    this.store = store;
    this.store.registerAction('Add Github User', this.addUserAction);
    this.subscription = this.store.state.subscribe(state => this.state = state);
  }

  async addUser(userName) {
    await this.store.dispatch(this.addUserAction, userName);

    this.searchedUser = '';
  }

  detached() {
    this.subscription.unsubscribe();
  }
}

function wrapWithHttp(http) {
  return function addUser(currentState, userName) {
    if (!userName) {
      return Object.assign({}, currentState, { error: 'No username provided' });
    }

    if (currentState.githubUsers.some(user => user.login.toLowerCase() === userName.toLowerCase())) {
      return Object.assign({}, currentState, { error: 'User already requested' });
    }

    return http.fetch(`users/${userName}`)
      .then(response => response.json())
      .then(user => {
        if (user) {
          return Object.assign(
            {},
            currentState,
            {
              githubUsers: [...currentState.githubUsers, user],
              error: ''
            }
          );
        }

        return currentState;
      })
      .catch((e) => {
        if (e.status === 403) {
          return Object.assign(
            {},
            currentState,
            { error: 'Rate limit exceeded, try again later.' }
          );
        }

        return currentState;
      });
  };
}


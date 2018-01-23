import { autoinject } from 'aurelia-framework';
import { dispatchify, Store } from 'aurelia-store';

import { DeveloperState } from './data/developer-models';
import {
  addDeveloper,
  loadAllDevs,
  loadJuniorDevs,
  loadProDevs
} from './data/developer-actions';

@autoinject()
export class DeveloperOverview {
  // reference to the single state
  // this will be shared with all subcomponents
  public state: DeveloperState;

  public loadAllDevs = dispatchify(loadAllDevs);
  public loadJuniorDevs = dispatchify(loadJuniorDevs);
  public loadProDevs = dispatchify(loadProDevs);

  // inject the store, alternatively you can still inject the service and do it the old-school way
  constructor(private store: Store<DeveloperState>) {
    // register the actions
    this.store.registerAction(addDeveloper.name, addDeveloper);
    this.store.registerAction(loadAllDevs.name, loadAllDevs);
    this.store.registerAction(loadJuniorDevs.name, loadJuniorDevs);
    this.store.registerAction(loadProDevs.name, loadProDevs);
  }

  attached() {
    // this is the single point of data subscription, the state inside the component will be automatically updated
    // no need to take care of manually handling that. This will also update all subcomponents
    this.store.state.subscribe(
      state => this.state = state
    );

    this.store.dispatch(loadAllDevs);
  }
}

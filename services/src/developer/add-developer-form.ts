import { autoinject, bindable } from 'aurelia-framework';
import { Store } from 'aurelia-store';

import {
  DeveloperState,
  DeveloperCategory
} from './data/developer-models';

import { addDeveloper } from './data/developer-actions';


@autoinject()
export class AddDeveloperForm {
  // the store gets passed in via element attributes
  // we do not need to take care about updating it since this will happen from the higher level component
  @bindable() public state: DeveloperState;

  // this does not belong into the state as its solely related to this component
  // and represents its internal UI logic
  public newDevCategory: DeveloperCategory = "junior";
  public newDevName: string = "";
  public newDevSkills: string = "";

  // another ui logic handler to show disable the add button while inserting a new developer
  public addingDeveloperInProgress: boolean = false;

  // inject the store, alternatively you can still inject the service and do it the old-school way
  constructor(private store: Store<DeveloperState>) { }

  async addDeveloper() {
    // set the indicator to active in order to disable the add button
    this.addingDeveloperInProgress = true;

    // data from the store should be updated only using store actions
    // once the add process is done, reactivate the add button
    await this.store.dispatch(addDeveloper,
      this.newDevCategory,
      this.newDevName,
      this.newDevSkills
        .split(',')
        .map((s) => s.trim())
    )

    this.addingDeveloperInProgress = false;
  }
}

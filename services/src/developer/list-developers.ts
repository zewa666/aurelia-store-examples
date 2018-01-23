import { 
  autoinject,
  bindable
} from 'aurelia-framework';

import { Developer } from './data/developer-models';


/*
 * a classic dumb component, all if its actions are passed in
 * and directly called from within the template
 */
@autoinject()
export class ListDevelopers {
  // the loaded developers are passed in as inputs
  @bindable() public developers: Developer[];

  // actions are passed in as inputs
  @bindable() public loadAllDevs: Function;
  @bindable() public loadProDevs: Function
  @bindable() public loadJuniorDevs: Function

  // no need for the store since this is a dumb component
  constructor() {}
}

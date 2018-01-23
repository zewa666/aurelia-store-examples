import {
  BehaviorSubject,
  Observable
} from 'rxjs';

import {
  autoinject,
  Container
} from 'aurelia-framework';

import {
  Developer,
  DeveloperCategory,
  DeveloperState
} from './developer-models';

import { DeveloperService } from './developer-service';


const developerService = Container.instance.get(DeveloperService) as DeveloperService;

export async function addDeveloper(state: DeveloperState, category: DeveloperCategory, name: string, skills: string[]) {
  if (!category || !name || !skills) {
    return state;
  }

  const newState = Object.assign({}, state);

  // we await the Promise returned by the service method
  const res = await developerService.addNewDeveloper(category, name, skills);


  // depending on whether the currently active category is all or the one matching the new dev we'll add the new dev as well
  if (newState.activeCategory === category || newState.activeCategory === "all") {
    newState.developers = [ ...state.developers, { ...res }];
  }

  return newState;
}

// These actions just act as a filter to determine which type of developers to display 
export function loadAllDevs(state: DeveloperState) {
  return updateDevState(state, "all", developerService.loadAllDevelopers);
}

export function loadProDevs(state: DeveloperState) {
  return updateDevState(state, "pro", developerService.loadProDevelopers);
}

export function loadJuniorDevs(state: DeveloperState) {
  return updateDevState(state, "junior", developerService.loadJuniorDevelopers);
}

async function updateDevState(state: DeveloperState, category: DeveloperCategory, serviceCallback: () => Promise<Developer[]>) {
  try {
    const result = await serviceCallback();
    const newState = Object.assign({}, state);

    newState.activeCategory = category;
    newState.developers = result.map((dev) => { return { ...dev }; });

    return newState;
  } catch {
    console.log(`Error loading ${category} developers`)
    return state;
  }
}

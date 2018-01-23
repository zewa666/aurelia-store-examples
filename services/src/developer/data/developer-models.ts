export interface Developer {
  name: string;
  skills: string[];
}

export type DeveloperCategory = "junior" | "pro" | "all";

// this is our overall state for the developer feature, everything that is necessary can be stored here
// keep UI relevant features inside the components though
export interface DeveloperState {
  developers: Developer[];
  activeCategory: DeveloperCategory
}

export const initialState: DeveloperState = {
  developers: [],
  activeCategory: null
}

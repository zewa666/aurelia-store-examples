import * as marked from 'marked';

export interface State {
  raw: string;
  html: string;
}

export const initialState: State = {
  raw: 'Hello World!',
  html: marked('Hello World!')
};

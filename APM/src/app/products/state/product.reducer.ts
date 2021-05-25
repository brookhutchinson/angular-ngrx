import { createAction } from '@ngrx/store';
import { createReducer } from '@ngrx/store';
import { on } from '@ngrx/store';

export const productReducer = createReducer(
  { showProductCode: true },
  on(createAction('[Product] Toggle Product Code'),
    state => {
      // write out existing state
      console.log('original state: ' + JSON.stringify(state));

      // return new state
      return {
        ...state,
        showProductCode: !state.showProductCode
      };
  })
);


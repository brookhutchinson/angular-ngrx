import { createAction } from '@ngrx/store';
import { createReducer } from '@ngrx/store';
import { on } from '@ngrx/store';

export const productReducer = createReducer(
  { showProductCode: true },
  on(createAction('[Product] Toggle Product Code'),
    state => {
      // return new state
      return {
        ...state,
        showProductCode: !state.showProductCode
      };
  })
);


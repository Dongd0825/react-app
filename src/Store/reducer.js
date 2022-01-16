import * as ActionTypes from './action-types';

export function reducer(state = {num:0}, action) {
  switch(action.type) {
    case ActionTypes.ADD: 
      return { num: state.num + 1}
    case ActionTypes.ASYNC_ADD: 
      return { num: state.num + 1}
    default:
      return state;
  }
}
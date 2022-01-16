import * as ActionTypes from '../../Store/action-types'
const  actions = {
  add() {
    return {
      type: ActionTypes.ASYNC_ADD,
    }
  }
}
export default actions;


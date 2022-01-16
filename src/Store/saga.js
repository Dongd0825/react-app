import * as ActionTypes from './action-types'
import  {take, put} from 'redux-saga/effects';

export function* rootsaga() {
  for(let i = 0; i < 3; i++) {
    console.log(`等待${ActionTypes.ASYNC_ADD}`);
    const action = yield take(ActionTypes.ASYNC_ADD);
    console.log(`等到${ActionTypes.ASYNC_ADD}`,action)
    yield put({type: ActionTypes.ASYNC_ADD})
    console.log('继续执行')
  }
  console.log('结束执行')
}
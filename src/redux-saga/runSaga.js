import { proc }from './proc'

export function runSaga({dispatch, getState, channel }, rootSaga) {
  const itenerator = rootSaga();// 迭代器
  proc({dispatch, getState, channel}, itenerator);
}
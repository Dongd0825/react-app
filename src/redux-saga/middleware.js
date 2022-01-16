import stdChannel from './channel';
import {runSaga} from './runSaga'
/**
 * 改造增加强dispatch
 * store.dispatch(action)
 */
function sagaMiddlewareFactory() {
  const channel = stdChannel();
  let boundRunSaga;
  function sagaMiddleware({dispatch, getState}) {
    boundRunSaga = runSaga.bind(null, { dispatch, getState, channel })
    return function(next) {// 调用下一个中间件 只有一个next = store.dispatch
      return function(action) { //下一个action // dispatch
        let result = next(action);
        channel.put(action);
        return result;
      }
    }
  }
  sagaMiddleware.run = function(rootSaga) {
    boundRunSaga(rootSaga);
  }
  return sagaMiddleware;
}

export default sagaMiddlewareFactory;
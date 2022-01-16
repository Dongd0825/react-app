import effectRunnerMap from './effectRunnerMap';

export function proc(env, iterator) {
  function next(...args){
    let result = iterator.next(args);
    if (!result.done) { // done:false, value: take(ActionTypes.ASYNC_ADD)=> {type:TAKE, payload:{pattern: asnc_add}}
      runEffect(result.value, next);

    }
    function runEffect(effect, next) {
      console.log({effect})
      if (effect) {
        const effectRunner = effectRunnerMap[effect.type];
        effectRunner(env, effect.payload, next)
      } else {
        next();
      }
    }
  };
  next();
}
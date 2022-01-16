import * as EffectTypes from './effect-types';

function runEffectTake(env, payload, next) {
  const matcher = (actions) => {
    return actions.type === payload.pattern;
  }
  env.channel.take(next, matcher);
}

function runEffectPut(env, payload, next) {
  env.dispatch(payload.action);
  next();
}

export const effectRunnerMap = {
  [EffectTypes.TAKE]: runEffectTake,
  [EffectTypes.PUT]: runEffectPut,
}

export default effectRunnerMap;


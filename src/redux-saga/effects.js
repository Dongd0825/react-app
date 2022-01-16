import * as EffectTypes from './effect-types';

function makeEffect(type, payload){
  return {type, payload};
}

export function take(pattern) {
  return makeEffect(EffectTypes.TAKE, {pattern}); // {type:take, payload:{pattern: asnc_add}}
}

export function put(action) {
  return makeEffect(EffectTypes.PUT, {action}); // {type:put, action:{type: asnc_add}}
}
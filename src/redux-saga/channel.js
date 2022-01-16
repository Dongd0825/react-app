export default function stdChannel() {
  let currentTask = [];
  /**
   * 
   * @param {*} cb  回调
   * @param {*} matcher 匹配器
   */
  function take(cb, matcher) {//subscribe {type: 'add'}
    cb['match'] = matcher;
    cb.cancel = function () {
      currentTask = currentTask.filter(_ => _!== cb)
    }
    currentTask.push(cb);
  }

  function put(input) {//dispatch action {type:'add'}
    for (let i= 0; i< currentTask.length;i++) {
      const taker = currentTask[i];
      const matcher = taker['match'];
      if(matcher(input)) {
        taker.cancel();
        taker(input);
      }
    }
  }
  return { take, put }
}

// let channel = stdChannel();
// function next() {
//   console.log('next')
// }
// function matcher(input) {
//   return input.type === 'ASYNC_ADD'
// }
// channel.take(next, matcher);
// channel.put({type: 'ASYNC_ADD'})
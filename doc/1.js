function * generator() {
  try {
    const a = yield 1;
    console.log('a', a)
    const b = yield 2;
    console.log('b',b)
    const c = yield 3;
    console.log('c',c)
  }catch(err) {
    console.log('err',err);
    
  }
  
}
let it = generator();
const r1 = it.next();
console.log('r1',r1)
// const r2 = it.next('value1');
// console.log('r2',r2)
// const r3 = it.next('value2');
// console.log('r3',r3)
// const r4 = it.next('value3');
// console.log('r4',r4)

// const r2 = it.throw('err');
// console.log('r2',r2)
 
const r3 = it.return();
console.log('r3',r3)
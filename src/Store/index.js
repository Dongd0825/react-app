import { createStore, applyMiddleware} from 'redux';
import { reducer } from './reducer';
import createSagaMiddleware from '../redux-saga';
import { rootsaga } from './saga'
let sagaMiddleware = createSagaMiddleware();

// const store = createStore(reducer)
let store = applyMiddleware(sagaMiddleware)(createStore)(reducer);
sagaMiddleware.run(rootsaga);
export default store;
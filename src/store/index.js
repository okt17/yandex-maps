import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from '../reducers';

const store = createStore(
  reducer,
  applyMiddleware(thunk),
);

// temporary
store.subscribe(() => console.log(store.getState()));
window.store = store;

export default store;

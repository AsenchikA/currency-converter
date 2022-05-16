import { composeWithDevTools } from '@redux-devtools/extension';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

function configureStore() {
  const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
  return store;
}

export const store = configureStore();

import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { takeLatest } from 'redux-saga/effects';
import petSearch, { Types as PetSearchTypes } from './petSearch';
import petFilters, { Types as PetFiltersTypes } from './petFilters';
import { petSearchSaga } from './sagas/petSearch';

// Reducers
const rootReducer = combineReducers({
  petSearch,
  petFilters,
});

// Sagas
const rootSaga = function* rootSaga() {
  yield [
    takeLatest(PetSearchTypes.SEARCH_REQUEST, petSearchSaga),
    takeLatest(PetFiltersTypes.SET_FILTERS, petSearchSaga),
  ];
};

// Allow debugging redux actions via the redux devtools
/* eslint-disable no-underscore-dangle */
const middlewareComposer = global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;
/* eslint-enable */

const sagaMiddleware = createSagaMiddleware();

// Initialize our store
const store = createStore(rootReducer, middlewareComposer(
  applyMiddleware(sagaMiddleware),
));

// Start our generator functions for async action flows
sagaMiddleware.run(rootSaga);

export default store;

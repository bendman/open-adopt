import Immutable from 'seamless-immutable';
import { createReducer, createActions } from 'reduxsauce';


// Action Types and Action Creators
const { Types, Creators } = createActions({
  setFilters: ['filters'],
});
export {
  Creators as Actions,
  Types,
};


// Reducers
const INITIAL_STATE = Immutable({
  // Each animal search type can have its own filters
  cat: {},
  dog: {},
});

const setFilters = (state, { filters }) =>
  state.merge({ [filters.species]: filters });


export default createReducer(INITIAL_STATE, {
  [Types.SET_FILTERS]: setFilters,
});

import Immutable from 'seamless-immutable';
import { createReducer, createActions } from 'reduxsauce';


// Action Types and Action Creators
const { Types, Creators } = createActions({
  searchRequest: ['filters'],
  searchSuccess: ['species', 'results'],
});
export {
  Creators as Actions,
  Types,
};


// Reducers
const INITIAL_STATE = Immutable({
  cat: { results: [], isLoading: false },
  dog: { results: [], isLoading: false },
});

const setResults = (state, { species, results }) =>
  state.merge({ [species]: { results, isLoading: false } });

const setLoading = (state, { filters: { species } }) =>
  state.merge({ [species]: { isLoading: true } });

export default createReducer(INITIAL_STATE, {
  [Types.SEARCH_REQUEST]: setLoading,
  [Types.SEARCH_SUCCESS]: setResults,
});

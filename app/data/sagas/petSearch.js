import { put } from 'redux-saga/effects';
import { searchPets } from '../../api/pets';
import { Actions as SearchActions } from '../petSearch';
import { Actions as FilterActions } from '../petFilters';
import { getLocation } from '../../utils/geolocation';

export function* petSearchSaga({ filters }) {
  // Ensure there is a location first
  if (!filters.location) {
    const location = yield getLocation();
    yield put(FilterActions.setFilters({ ...filters, location }));
    return;
  }

  const { data } = yield searchPets(filters);
  yield put(SearchActions.searchSuccess(filters.species, data));
}

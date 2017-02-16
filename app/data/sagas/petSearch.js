import { put } from 'redux-saga/effects';
import { searchPets } from '../../api/pets';
import { Actions } from '../petSearch';

export function* petSearchSaga({ filters }) {
  const { data } = yield searchPets(filters);
  yield put(Actions.searchSuccess(filters.species, data));
}

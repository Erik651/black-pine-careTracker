import { takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchAllStatuses() {
  try {
    const statuses = yield axios.get('/api/statuses');
    yield put({
      type: 'SET_STATUSES',
      payload: statuses.data,
    });
  } catch (error) {
    console.log('fetchAllStatuses error:', error);
  }
}

function* fetchAllStatusesSaga() {
  yield takeLatest('FETCH_ALL_STATUSES', fetchAllStatuses);
}

export default fetchAllStatusesSaga;
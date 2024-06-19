import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchTree_Activity(action) {
  try {
    const response = yield axios.get(`/api/tree_activity/${action.payload}`);
    console.log('response', response);
    yield put({
      type: 'SET_DATES',
      payload: response.data,
    });
  } catch (error) {
    console.log('fetchTree_Activity error', error);
  }
}

function* tree_ActivitySaga() {
  yield takeLatest('FETCH_TREE_ACTIVITY_DATES', fetchTree_Activity);
}

export default tree_ActivitySaga;

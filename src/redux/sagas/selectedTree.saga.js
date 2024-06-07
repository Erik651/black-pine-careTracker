import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* selectedTree(action) {
  try {
    const tree = yield axios.get(`/api/trees/${action.payload}`);

    yield put({
      type: 'SET_SELECTED_TREE',
      payload: tree.data,
    });
  } catch (error) {
    console.log('selectedTree error:', error);
  }
}

function* selectedTreeSaga() {
  yield takeLatest('FETCH_SELECTED_TREE', selectedTree);
}

export default selectedTreeSaga;

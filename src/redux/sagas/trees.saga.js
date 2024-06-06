import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';



function* fetchAllTrees() {
  try {
    const response = yield axios.get('/api/trees');
    console.log('response', response)
    yield put({
      type: 'SET_TREES',
      payload: response.data,
    });
  }catch (error) {
    console.log('fetchAllTrees error', error);
  }
}

function* treesSaga() {
  yield takeLatest('FETCH_TREES', fetchAllTrees);
}

export default treesSaga;
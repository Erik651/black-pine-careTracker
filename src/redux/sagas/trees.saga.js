import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';



function* fetchAllTrees() {
  try {
    const trees = yield axios.get('/api/trees');
    yield put({
      type: 'SET_TREES',
      payload: trees.data,
    });
  }catch (error) {
    console.log('fetchAllTrees error', error);
  }
}

function* treesSaga() {
  yield takeLatest('FETCH_TREES', fetchAllTrees);
}

export default treesSaga;
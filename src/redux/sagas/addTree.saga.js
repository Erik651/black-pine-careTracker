import axios from 'axios';
import { takeLatest } from 'redux-saga/effects';

function* addTree(action) {
  try {
    yield axios.post(`/api/trees`, action.payload);
    if (action.history) {
      action.history.push('/myTrees');
    }
  } catch (e) {
    console.log(e);
  }
}

//export default addTreeSaga;

function* addTreeSaga() {
  yield takeLatest('ADD_TREE', addTree);
}

export default addTreeSaga;

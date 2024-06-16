import axios from 'axios';
import { takeLatest } from 'redux-saga/effects';

function* addImages(action) {
  try {
    yield axios.post(`/api/upload/multiple`, action.payload);
    if (action.history) {
      action.history.push('/myTrees');
    }
  } catch (e) {
    console.log(e);
  }
}

//export default addTreeSaga;

function* addImagesSaga() {
  yield takeLatest('ADD_IMAGES', addImages);
}

export default addImagesSaga;
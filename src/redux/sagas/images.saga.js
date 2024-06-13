import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* fetchAllImages() {
  try {
    const response = yield axios.get('/api/upload');
    console.log('response', response)
    yield put({
      type: 'SET_IMAGES',
      payload: response.data,
    });
  }catch (error) {
    console.log('fetchAllImages', error);
  }
}

function* imagesSaga() {
  yield takeLatest('FETCH_IMAGES', fetchAllImages);
}

export default imagesSaga;
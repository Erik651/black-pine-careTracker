import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchAllImages(action) {
  try {
    const response = yield axios.get(`/api/upload/`);
    console.log(action.payload);
    console.log('fetchAllImagesById response', response.data);
    yield put({
      type: 'SET_IMAGES',
      payload: response.data,
    });
  } catch (error) {
    console.log('fetchAllImages', error);
  }
}

function* imagesSaga() {
  yield takeLatest('FETCH_IMAGES', fetchAllImages);
}

export default imagesSaga;
import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchAllImages(action) {
  try {
    const response = yield axios.get(`/api/upload/`);
    console.log(action.payload);
    console.log('fetchAllImagesById response', response.data);
    yield put({
      type: 'SET_ALL_IMAGES',
      payload: response.data,
    });
  } catch (error) {
    console.log('fetchAllImages', error);
  }
}

function* allImagesSaga() {
  yield takeLatest('FETCH_ALL_IMAGES', fetchAllImages);
}

export default allImagesSaga;
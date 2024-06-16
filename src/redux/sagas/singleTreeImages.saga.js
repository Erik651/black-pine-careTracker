import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchSingleImages(action) {
  try {
    const response = yield axios.get(`/api/upload/single`);
    console.log(action.payload);
    console.log('fetchSingleImages response', response.data);
    yield put({
      type: 'SET_SINGLE_IMAGES',
      payload: response.data,
    });
  } catch (error) {
    console.log('fetchSingleImages', error);
  }
}

function* singleImagesSaga() {
  yield takeLatest('FETCH_SINGLE_IMAGES', fetchSingleImages);
}

export default singleImagesSaga;
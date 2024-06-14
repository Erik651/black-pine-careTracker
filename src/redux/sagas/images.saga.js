// import axios from 'axios';
// import { put, takeLatest } from 'redux-saga/effects';

// function* fetchAllImages() {
//   try {
//     const response = yield axios.get(`/api/upload/${action.payload}`);
//     console.log(action.payload);
//     console.log('fetchAllImages response', response.data);
//     yield put({
//       type: 'SET_IMAGES',
//       payload: response.data,
//     });
//   } catch (error) {
//     console.log('fetchAllImages', error);
//   }
// }

// function* imagesSaga() {
//   yield takeLatest('FETCH_IMAGES', fetchAllImages);
// }

// export default imagesSaga;

import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchAllImages(action) {
  try {
    const response = yield axios.get(`/api/upload/${action.payload}`);
    console.log(action.payload);
    console.log('fetchAllImages response', response.data);
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

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

function* fetchAllImagesById(action) {
  try {
    const response = yield axios.get(`/api/upload/${action.payload}`);
    console.log(action.payload);
    console.log('fetchAllImagesById response', response.data);
    yield put({
      type: 'SET_IMAGES_BY_ID',
      payload: response.data,
    });
  } catch (error) {
    console.log('fetchAllImagesById', error);
  }
}

function* imagesByIdSaga() {
  yield takeLatest('FETCH_IMAGES_BY_ID', fetchAllImagesById);
}

export default imagesByIdSaga;

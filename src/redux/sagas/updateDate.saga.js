import { takeLatest } from 'redux-saga/effects';
import axios from 'axios';


function* updateDate(action) {
  try {
    yield axios.put(`/api/trees/${action.payload.id}`, action.payload);
    console.log(action.payload.date_text, "action.payload.date_text")
    if (action.history) {
      action.history.goBack();
    }
  } catch (error) {
    console.log('Error in updateDate PUT', error);
  }
}

function* updateDateSaga() {
  yield takeLatest('UPDATE_ACTIVITY_DATE', updateDate);
}

export default updateDateSaga;
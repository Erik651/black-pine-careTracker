import { takeLatest } from 'redux-saga/effects';
import axios from 'axios';


function* updateDate(action) {
  try {
    yield axios.put(`/api/tree_activity/${action.payload.id}`, action.payload);
    console.log(action.payload.date_text, "action.payload.date_text")
    window.location.reload()
    }
   catch (error) {
    console.log('Error in updateDate PUT', error);
  }
}

function* updateDateSaga() {
  yield takeLatest('UPDATE_ACTIVITY_DATE', updateDate);
}

export default updateDateSaga;
import { takeLatest } from 'redux-saga/effects';
import axios from 'axios';


function* editTree(action) {
  try {
    yield axios.put(`/api/trees/${action.payload.id}`, action.payload);
    if (action.history) {
      action.history.goBack();
    }
  } catch (error) {
    console.log('Error in editTree PUT', error);
  }
}

function* editTreesSaga() {
  yield takeLatest('EDIT_TREE', editTree);
}

export default editTreesSaga;
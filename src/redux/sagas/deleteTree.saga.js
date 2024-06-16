import { takeLatest, put, call } from 'redux-saga/effects';
import axios from 'axios';

function* deleteTree(action) {
  try {
    yield call(axios.delete, `/api/trees/${action.payload}`);
    yield put({ type: 'FETCH_TREES' }); // Refetch trees after deletion
    if (action.history) {
      action.history.push('/myTrees'); // Navigate to the trees list after deletion
    }
  } catch (error) {
    console.error('Error deleting tree:', error);
  }
}

function* deleteTreeSaga() {
  yield takeLatest('DELETE_TREE', deleteTree);
}

export default deleteTreeSaga;

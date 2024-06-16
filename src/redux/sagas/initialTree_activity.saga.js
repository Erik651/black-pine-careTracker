import axios from 'axios';
import { takeLatest } from 'redux-saga/effects';

function* addInitialTree_activity(action) {
  try {
    yield axios.post(`/api/tree_activity`, action.payload);
    if (action.history) {
      action.history.push('/myTrees');
    }
  } catch (e) {
    console.log(e);
  }
}

//export default addTreeSaga;

function* addInitialTree_activitySaga() {
  yield takeLatest('ADD_INITIAL_TREE_ACTIVITY', addInitialTree_activity);
}

export default addInitialTree_activitySaga;

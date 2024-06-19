import { takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';
// function* addInitialTree_activity(action) {
//   try {
//     const { treeId,   activity_id,  date_text,} = action.payload;
//     yield axios.post(`/api/tree_activity/:id`,${treeId});
//     if (action.history) {
//       action.history.push('/myTrees');
//     }
//   } catch (e) {
//     console.log(e);
//   }
// }

// //export default addTreeSaga;

// function* addInitialTree_activitySaga() {
//   yield takeLatest('ADD_INITIAL_TREE_ACTIVITY', addInitialTree_activity);
// }

// export default addInitialTree_activitySaga;

function* addInitialTree_activity(action) {
  try {
    const { treeId, date_text, activity_id } = action.payload;
    yield axios.post(`/api/tree_activity/${treeId}`, {
      activity_id: activity_id,
      date_text: date_text,
    });
    yield put({ type: 'FETCH_TREE_ACTIVITY_DATES', payload: treeId });
  } catch (error) {
    console.log('addInitialTree_activity saga', error);
  }
}

function* addInitialTree_activitySaga() {
  yield takeLatest('ADD_INITIAL_TREE_ACTIVITY', addInitialTree_activity);
}

export default addInitialTree_activitySaga;

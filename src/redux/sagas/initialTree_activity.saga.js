import axios from 'axios';
import { takeLatest } from 'redux-saga/effects';

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
    const { treeId, initialDates } = action.payload;
    for (let activity of initialDates) {
      yield axios.post(`/api/tree_activity/${treeId}`, {
        activity_id: activity.activity_id,
        date_text: activity.date_text,
      });
    }
    if (action.history) {
      action.history.push('/myTrees');
    }
  } catch (e) {
    console.log(e);
  }
}

function* addInitialTree_activitySaga() {
  yield takeLatest('ADD_INITIAL_TREE_ACTIVITY', addInitialTree_activity);
}

 export default addInitialTree_activitySaga;
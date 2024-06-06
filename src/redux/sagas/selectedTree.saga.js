import { takeLatest } from "redux-saga/effects";

function* selectedTree(action) {
  try {
    const tree = yield axios.get(`/api/trees/${action.payload}`);

    yield put({
      type: 'SET_SELECTED_TREE',
      payload: tree.data
    });
  } catch (error) {
    console.log('selectedTree error:', error);
  }
}


function* selectedTree() {
  yield takeLatest('FETCH_SELECTED_TREE', selectedTree);
}

export default selectedTree;
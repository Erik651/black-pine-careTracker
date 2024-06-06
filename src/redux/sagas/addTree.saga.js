import axios from 'axios';

function* addTree(action) {
  try {
    yield axios.post(`/api/trees`, action.payload);
    if (action.history) {

      action.history.push('/myTrees');
    }
  } catch (e) {
    console.log(e);
  }
}

//export default addTreeSaga;

function* treesSaga() {
  yield takeLatest('ADD_TREE', addTree);
}

export default treesSaga;
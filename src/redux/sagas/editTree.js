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

function* treesSaga() {
  yield takeLatest('EDIT_TREE', editTree);
}

export default treesSaga;
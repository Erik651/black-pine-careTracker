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
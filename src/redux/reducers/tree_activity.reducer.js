const tree_activity = (state = [], action) => {
  switch (action.type) {
    case 'SET_DATES':
      console.log('Erik', action.payload)
      return action.payload;
      default:
        return state;
  }
};

export default tree_activity;
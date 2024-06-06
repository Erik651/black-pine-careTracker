

const trees = (state = [], action) => {
  switch (action.type) {
    case 'SET_TREES':
      console.log('Erik', action.payload)
      return action.payload;
      default:
        return state;
  }
};

export default trees;


const trees = (state = [], action) => {
  switch (action.type) {
    case 'SET_TREES':
      return action.payload;
      default:
        return state;
  }
};

export default trees;
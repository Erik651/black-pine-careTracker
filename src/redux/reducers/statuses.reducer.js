const statuses = (state = [], action) => {
  switch (action.type) {
    case 'SET_STATUSES':
      console.log('Erik', action.payload)
      return action.payload;
      default:
        return state;
  }
};

export default statuses;

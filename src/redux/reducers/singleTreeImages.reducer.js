const singleTreeImages = (state = [], action) => {
  switch (action.type) {
    case 'SET_SINGLE_IMAGES':
      console.log('single images reducer:', action.payload)
      return action.payload;
      default:
        return state;
  }
}

export default singleTreeImages;
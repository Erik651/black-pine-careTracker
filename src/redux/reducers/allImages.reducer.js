const allImages = (state = [], action) => {
  switch (action.type) {
    case 'SET_ALL_IMAGES':
      console.log('images reducer:', action.payload)
      return action.payload;
      default:
        return state;
  }
}

export default allImages;
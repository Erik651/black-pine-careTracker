

const images = (state = [], action) => {
  switch (action.type) {
    case 'SET_IMAGES':
      console.log('images reducer:', action.payload)
      return action.payload;
      default:
        return state;
  }
}

export default images;
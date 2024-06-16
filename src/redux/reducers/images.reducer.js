

const images = (state = [], action) => {
  switch (action.type) {
    case 'SET_IMAGES_BY_ID':
      console.log('images reducer:', action.payload)
      return action.payload;
      default:
        return state;
  }
}

export default images;
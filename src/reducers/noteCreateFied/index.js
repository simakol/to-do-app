const initalState = {
  showField: false
};
function noteCreateFied(state = initalState, action) {
  switch (action.type) {
    case "OPEN_FIELD": {
      return { ...state, showField: true };
    }
    case "CLOSE_FIELD": {
      return { ...state, showField: false };
    }
    default: {
      return { ...state };
    }
  }
}

export default noteCreateFied;

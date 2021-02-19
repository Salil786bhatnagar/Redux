const initialState = {
  to_do: {},
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "TO_DO":
      state.to_do[action.payload[0]] = action.payload[1];
      console.log(state.to_do);
      return { to_do: state.to_do };

    case "Delete_item":
      delete state.to_do[action.payload[0]];
      return { to_do: state.to_do };
    default:
      return state;
  }
}

export default rootReducer;

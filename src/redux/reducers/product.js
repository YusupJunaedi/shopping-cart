import actionType from "../actions/actionType";

let initialState = {
  data: {}
};

const productReducer = (prevState = initialState, { type, payload }) => {
  switch (type) {
    case actionType.getAllProduct:
      return {
        ...prevState,
        data: payload,
      };
    default:
      return prevState;
  }
};

export default productReducer;

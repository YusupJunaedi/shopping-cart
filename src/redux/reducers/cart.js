import actionType from "../actions/actionType";

let initialState = {
  data: []
};

const cartReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionType.addToCart:
      return {
        data: [...state.data, payload]
      };
      case actionType.plusQty:
        let arrData = [...state.data];
        arrData[payload] = {
          ...arrData[payload],
          qty: state.data[payload].qty + 1,
        };
        return {
          ...state,
          data: arrData,
        };
      case actionType.minusQty:
        if (state.data[payload].qty > 1) {
          let arrData = [...state.data];
          arrData[payload] = {
            ...arrData[payload],
            qty: state.data[payload].qty - 1,
          };
          return {
            ...state,
            data: arrData,
          };
        } else {
          return {
            ...state,
          };
        }
        case actionType.deleteCart:
          let newData = state.data.filter((item) => {
            return item.id_product !== payload;
          });
          return {
            ...state,
            data: newData,
          };
    default:
      return state;
  }
};

export default cartReducer;

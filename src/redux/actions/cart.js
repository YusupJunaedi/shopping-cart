import actionType from "./actionType";
  
export const addToCartCreator = (data) => {
  return {
    type: actionType.addToCart,
    payload: data,
  };
};

export const addProductToCart = (data) => {
  return {
    type: actionType.addProductToCart,
    payload: data,
  };
};

export const plusQtyCreator = (index) => {
  return {
    type: actionType.plusQty,
    payload: index,
  };
};

export const minusQtyCreator = (index) => {
  return {
    type: actionType.minusQty,
    payload: index,
  };
};

export const deleteCartCreator = (data) => {
  console.log(data);
  return {
    type: actionType.deleteCart,
    payload: data,
  };
};


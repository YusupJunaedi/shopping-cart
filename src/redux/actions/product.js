  import actionType from "./actionType";
  
  export const getAllProductCreator = (data) => {
    return {
      type: actionType.getAllProduct,
      payload: data,
    };
  };
  
  
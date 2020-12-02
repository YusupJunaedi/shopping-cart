import { combineReducers } from "redux";
import productReducer from './product'
import cartReducer from './cart'

const indexReducer = combineReducers({
  product: productReducer,
  cart: cartReducer
});

export default indexReducer;

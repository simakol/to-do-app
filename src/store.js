import { createStore } from "redux";
import rootReducer from "./reducers/";

const store = createStore(
  rootReducer,
  window.__REDUX_DECTOOLS_EXTENSION__ && window.__REDUX_DECTOOLS_EXTENSION__()
);

export default store;

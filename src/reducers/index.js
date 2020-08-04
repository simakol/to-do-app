import { combineReducers } from "redux";
import notesReduser from "./notes";
import noteCreateFied from "./noteCreateFied";

const rootReducer = combineReducers({
  notesReduser,
  noteCreateFied
});

export default rootReducer;

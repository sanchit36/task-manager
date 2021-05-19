import { combineReducers } from "redux";
import tasksReducer from "./tasks/tasks.reducer";
import userReducer from "./user/user.reducer";

const rootReducer = combineReducers({
  user: userReducer,
  tasks: tasksReducer,
});

export default rootReducer;

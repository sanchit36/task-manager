import tasksTypes from "./tasks.types";

const INITIAL_STATE = {
  tasks: [],
};

const tasksReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case tasksTypes.GET_ALL_TASKS:
      return { ...state, tasks: payload };

    default:
      return state;
  }
};

export default tasksReducer;

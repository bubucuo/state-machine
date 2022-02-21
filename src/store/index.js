// import { createStore } from "redux";

import { createStore } from "./mini-redux";

// 状态修改规则，纯函数
function countReducer(state = 0, action) {
  switch (action.type) {
    case "ADD":
      return state + 1;
    case "MINUS":
      return state - 1;
    default:
      return state;
  }
}

const store = createStore(countReducer);

export default store;

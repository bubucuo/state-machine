export function createStore(reducer) {
  let currentState;
  const currentListeners = [];

  // get state
  function getState() {
    return currentState;
  }

  // set state
  function dispatch(action) {
    currentState = reducer(currentState, action);
    currentListeners.forEach((listener) => listener());
  }

  // 监听状态，订阅事件
  function subscribe(listener) {
    currentListeners.push(listener);

    return () => {
      const index = currentListeners.indexOf(listener);
      currentListeners.splice(index, 1);
    };
  }

  dispatch({ type: "REDUX/ASSSSSSSSSSSSS" });

  return {
    getState,
    dispatch,
    subscribe,
  };
}

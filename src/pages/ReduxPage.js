import { useEffect, useReducer } from "react";
import store from "../store";

export default function ReduxPage(props) {
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      forceUpdate();
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div>
      <h3>ReduxPage</h3>
      <button
        onClick={() => {
          store.dispatch({ type: "ADD" });
          //   forceUpdate();
        }}
      >
        {store.getState()}
      </button>
    </div>
  );
}

import { useEffect, useReducer, useRef } from "react";
import StateMachine from "javascript-state-machine";

const defaultState = {
  init: "liquid",
  transitions: [
    { name: "melt", from: "solid", to: "liquid" },
    { name: "freeze", from: "liquid", to: "solid" },
    { name: "vaporize", from: "liquid", to: "gas" },
    { name: "condense", from: "gas", to: "liquid" },
  ],
  methods: {
    onMelt: function () {
      console.log("I melted");
    },
    onFreeze: function () {
      console.log("I froze");
    },
    onVaporize: function () {
      console.log("I vaporized");
    },
    onCondense: function () {
      console.log("I condensed");
    },
  },
};

function useFsm() {
  const fsmRef = useRef(null);
  if (!fsmRef.current) {
    fsmRef.current = new StateMachine(defaultState);
  }

  return [fsmRef.current];
}

export default function FSMPage(props) {
  const [fsm] = useFsm();

  const [, forceUpdate] = useReducer((s) => s + 1, 0);

  console.log("fsm", fsm); //sy-log

  const changeState = () => {
    switch (fsm.state) {
      case "solid":
        fsm.melt();
        break;

      case "liquid":
        fsm.freeze();
        // fsm.vaporize();
        break;

      case "gas":
        fsm.condense();
        break;

      default:
        break;
    }
    forceUpdate();
  };

  return (
    <div>
      <h3>FSMPage</h3>
      <button onClick={changeState}>{fsm.state}</button>
    </div>
  );
}

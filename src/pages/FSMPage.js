import StateMachine from "javascript-state-machine";
import { useReducer, useRef } from "react";

const defaultState = {
  // 初始的状态
  init: "solid",
  // 状态转移函数，转移函数名称、转移前的状态、转移后的状态
  transitions: [
    { name: "melt", from: "solid", to: "liquid" },
    { name: "freeze", from: "liquid", to: "solid" },
    { name: "vaporize", from: "liquid", to: "gas" },
    { name: "condense", from: "gas", to: "liquid" },
  ],
  // observer 监听函数
  methods: {
    onMelt: function () {
      console.log("I melted我化了");
    },
    onFreeze: function () {
      console.log("I froze 我冻着了");
    },
    onVaporize: function () {
      console.log("I vaporized 我蒸发了");
    },
    onCondense: function () {
      console.log("I condensed 我冷凝了");
    },
  },
};

// const fsm = new StateMachine(defaultState);

function useFSM() {
  const fsmRef = useRef();

  if (!fsmRef.current) {
    fsmRef.current = new StateMachine(defaultState);
  }

  return [fsmRef.current];
}

// 闭包
// fiber
export default function FSMPage(props) {
  const [fsm] = useFSM();

  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  //   console.log("fsm", fsm, fsm.is("solid")); //sy-log

  const transitionState = () => {
    switch (fsm.state) {
      case "solid":
        fsm.melt();
        break;

      case "liquid":
        // fsm.freeze();
        fsm.vaporize();
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
      <button onClick={transitionState}>{fsm.state}</button>
    </div>
  );
}

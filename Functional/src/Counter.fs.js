import { Union, Record } from "./fable_modules/fable-library.4.0.1/Types.js";
import { union_type, record_type, int32_type } from "./fable_modules/fable-library.4.0.1/Reflection.js";
import { Cmd_none } from "./fable_modules/Fable.Elmish.4.0.0/cmd.fs.js";
import { createElement } from "react";
import { ofArray } from "./fable_modules/fable-library.4.0.1/List.js";
import { Interop_reactApi } from "./fable_modules/Feliz.2.6.0/./Interop.fs.js";

export class State extends Record {
    "constructor"(Count) {
        super();
        this.Count = (Count | 0);
    }
}

export function State$reflection() {
    return record_type("Counter.State", [], State, () => [["Count", int32_type]]);
}

export class Msg extends Union {
    "constructor"(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["Increment", "Decrement"];
    }
}

export function Msg$reflection() {
    return union_type("Counter.Msg", [], Msg, () => [[], []]);
}

export function init() {
    return [new State(0), Cmd_none()];
}

export function update(msg, state) {
    if (msg.tag === 1) {
        return [new State(state.Count - 1), Cmd_none()];
    }
    else {
        return [new State(state.Count + 1), Cmd_none()];
    }
}

export function render(state, dispatch) {
    const children = ofArray([createElement("button", {
        onClick: (_arg) => {
            dispatch(new Msg(0, []));
        },
        children: "Increment",
    }), createElement("button", {
        onClick: (_arg_1) => {
            dispatch(new Msg(1, []));
        },
        children: "Decrement",
    }), createElement("h1", {
        children: [state.Count],
    })]);
    return createElement("div", {
        children: Interop_reactApi.Children.toArray(Array.from(children)),
    });
}

//# sourceMappingURL=Counter.fs.js.map

import { Union, Record } from "./fable_modules/fable-library.4.0.1/Types.js";
import { union_type, option_type, list_type, record_type, float64_type } from "./fable_modules/fable-library.4.0.1/Reflection.js";
import { singleton, map, cons, ofArray } from "./fable_modules/fable-library.4.0.1/List.js";
import { Cmd_none } from "./fable_modules/Fable.Elmish.4.0.0/cmd.fs.js";
import { createElement } from "react";
import { createObj } from "./fable_modules/fable-library.4.0.1/Util.js";
import { Interop_reactApi } from "./fable_modules/Feliz.2.6.0/./Interop.fs.js";

export class Coord extends Record {
    "constructor"(x, y) {
        super();
        this.x = x;
        this.y = y;
    }
}

export function Coord$reflection() {
    return record_type("Canvas.Coord", [], Coord, () => [["x", float64_type], ["y", float64_type]]);
}

export class Circle extends Record {
    "constructor"(pos) {
        super();
        this.pos = pos;
    }
}

export function Circle$reflection() {
    return record_type("Canvas.Circle", [], Circle, () => [["pos", Coord$reflection()]]);
}

export class Model extends Record {
    "constructor"(circles, past) {
        super();
        this.circles = circles;
        this.past = past;
    }
}

export function Model$reflection() {
    return record_type("Canvas.Model", [], Model, () => [["circles", list_type(Circle$reflection())], ["past", option_type(Model$reflection())]]);
}

export class Msg extends Union {
    "constructor"(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["AddPoint", "Undo"];
    }
}

export function Msg$reflection() {
    return union_type("Canvas.Msg", [], Msg, () => [[["Item", Coord$reflection()]], []]);
}

export function init() {
    return [new Model(ofArray([new Circle(new Coord(50, 50)), new Circle(new Coord(150, 150)), new Circle(new Coord(100, 100))]), void 0), Cmd_none()];
}

export function update(msg, currentModel) {
    if (msg.tag === 1) {
        const matchValue = currentModel.past;
        if (matchValue != null) {
            const p_1 = matchValue;
            return [p_1, Cmd_none()];
        }
        else {
            return [currentModel, Cmd_none()];
        }
    }
    else {
        const p = msg.fields[0];
        return [new Model(cons(new Circle(p), currentModel.circles), currentModel), Cmd_none()];
    }
}

export function render(model, dispatch) {
    let elems_2;
    const points = map((point) => createElement("circle", {
        cx: point.pos.x,
        cy: point.pos.y,
        r: 3,
        fill: "#F0F8FF",
        stroke: "#808080",
        strokeWidth: 1,
    }), model.circles);
    const border = createElement("rect", {
        x1: 0,
        x2: 500,
        y1: 0,
        y2: 500,
        width: 500,
        height: 500,
        stroke: "black",
        strokeWidth: 2,
        fill: "none",
    });
    return createElement("div", createObj(singleton((elems_2 = [createElement("h1", {
        children: ["Simplest CANVAS..."],
    }), createElement("button", {
        style: {
            margin: 20,
        },
        onClick: (_arg) => {
            dispatch(new Msg(1, []));
        },
        children: Interop_reactApi.Children.toArray(["undo"]),
    }), createElement("br", {}), createElement("svg", {
        width: 500,
        height: 500,
        onClick: (mouseEvent) => {
            const pos = getSvgCoordinates(mouseEvent);
            dispatch(new Msg(0, [pos]));
        },
        children: Interop_reactApi.Children.toArray(Array.from(cons(border, points))),
    })], ["children", Interop_reactApi.Children.toArray(Array.from(elems_2))]))));
}

//# sourceMappingURL=Canvas.fs.js.map

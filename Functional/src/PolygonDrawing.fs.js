import { Union, Record } from "./fable_modules/fable-library.4.0.1/Types.js";
import { union_type, option_type, list_type, record_type, float64_type } from "./fable_modules/fable-library.4.0.1/Reflection.js";
import { ofArray, iterate, singleton, concat, cons, collect, pairwise, map, empty } from "./fable_modules/fable-library.4.0.1/List.js";
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
    return record_type("PolygonDrawing.Coord", [], Coord, () => [["x", float64_type], ["y", float64_type]]);
}

export class Model extends Record {
    "constructor"(finishedPolygons, currentPolygon, mousePos, past, future) {
        super();
        this.finishedPolygons = finishedPolygons;
        this.currentPolygon = currentPolygon;
        this.mousePos = mousePos;
        this.past = past;
        this.future = future;
    }
}

export function Model$reflection() {
    return record_type("PolygonDrawing.Model", [], Model, () => [["finishedPolygons", list_type(list_type(Coord$reflection()))], ["currentPolygon", option_type(list_type(Coord$reflection()))], ["mousePos", option_type(Coord$reflection())], ["past", option_type(Model$reflection())], ["future", option_type(Model$reflection())]]);
}

export class Msg extends Union {
    "constructor"(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["AddPoint", "SetCursorPos", "FinishPolygon", "Undo", "Redo"];
    }
}

export function Msg$reflection() {
    return union_type("PolygonDrawing.Msg", [], Msg, () => [[["Item", Coord$reflection()]], [["Item", option_type(Coord$reflection())]], [], [], []]);
}

export function init() {
    const m = new Model(empty(), void 0, void 0, void 0, void 0);
    return [m, Cmd_none()];
}

export function updateModel(msg, model) {
    return model;
}

export function addUndoRedo(updateFunction, msg, model) {
    switch (msg.tag) {
        case 1: {
            const p = msg.fields[0];
            return new Model(model.finishedPolygons, model.currentPolygon, p, model.past, model.future);
        }
        case 3: {
            return model;
        }
        case 4: {
            return model;
        }
        default: {
            const inputRecord = updateFunction(msg, model);
            return new Model(inputRecord.finishedPolygons, inputRecord.currentPolygon, inputRecord.mousePos, model, inputRecord.future);
        }
    }
}

export function update(msg, model) {
    const newModel = addUndoRedo(updateModel, msg, model);
    return [newModel, Cmd_none()];
}

export function viewPolygon(color, points) {
    return map((tupledArg) => {
        const c0 = tupledArg[0];
        const c1 = tupledArg[1];
        return createElement("line", {
            x1: c0.x,
            y1: c0.y,
            x2: c1.x,
            y2: c1.y,
            stroke: color,
            strokeWidth: 2,
            strokeLinejoin: "round",
        });
    }, pairwise(points));
}

export function render(model, dispatch) {
    let elems_3;
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
    const finisehdPolygons = collect((points) => viewPolygon("green", points), model.finishedPolygons);
    let currentPolygon;
    const matchValue = model.currentPolygon;
    if (matchValue != null) {
        const p = matchValue;
        const matchValue_1 = model.mousePos;
        if (matchValue_1 != null) {
            const preview = matchValue_1;
            currentPolygon = viewPolygon("red", cons(preview, p));
        }
        else {
            currentPolygon = viewPolygon("red", p);
        }
    }
    else {
        currentPolygon = empty();
    }
    const svgElements = concat([finisehdPolygons, currentPolygon]);
    return createElement("div", createObj(ofArray([["style", {
        userSelect: "none",
    }], (elems_3 = [createElement("h1", {
        children: ["Simplest drawing"],
    }), createElement("button", {
        style: {
            margin: 20,
        },
        onClick: (_arg) => {
            dispatch(new Msg(3, []));
        },
        children: Interop_reactApi.Children.toArray(["undo"]),
    }), createElement("button", {
        style: {
            margin: 20,
        },
        onClick: (_arg_1) => {
            dispatch(new Msg(4, []));
        },
        children: Interop_reactApi.Children.toArray(["redo"]),
    }), createElement("br", {}), createElement("svg", {
        width: 500,
        height: 500,
        onMouseMove: (mouseEvent) => {
            const pos = getSvgCoordinates(mouseEvent);
            dispatch(new Msg(1, [pos]));
        },
        onClick: (mouseEvent_1) => {
            let msgs;
            if (mouseEvent_1.detail === 1) {
                const pos_1 = getSvgCoordinates(mouseEvent_1);
                msgs = singleton(new Msg(0, [pos_1]));
            }
            else {
                msgs = ((mouseEvent_1.detail === 2) ? singleton(new Msg(2, [])) : empty());
            }
            iterate(dispatch, msgs);
        },
        children: Interop_reactApi.Children.toArray(Array.from(cons(border, svgElements))),
    })], ["children", Interop_reactApi.Children.toArray(Array.from(elems_3))])])));
}

//# sourceMappingURL=PolygonDrawing.fs.js.map

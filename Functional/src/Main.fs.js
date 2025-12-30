import { render as render_1, update as update_1, init as init_1 } from "./Canvas.fs.js";
import { Program_Internal_withReactSynchronousUsing } from "./fable_modules/Fable.Elmish.HMR.7.0.0/../Fable.Elmish.React.4.0.0/react.fs.js";
import { lazyView2With } from "./fable_modules/Fable.Elmish.HMR.7.0.0/./common.fs.js";
import { uncurry } from "./fable_modules/fable-library.4.0.1/Util.js";
import { ProgramModule_mkProgram } from "./fable_modules/Fable.Elmish.4.0.0/program.fs.js";
import { FSharpRef } from "./fable_modules/fable-library.4.0.1/Types.js";
import { defaultOf } from "./fable_modules/Fable.Elmish.HMR.7.0.0/../.././fable_modules/fable-library.4.0.1/Util.js";
import { current as current_2 } from "./fable_modules/Fable.Elmish.HMR.7.0.0/./Bundler.fs.js";
import { Internal_saveState, Internal_tryRestoreState } from "./fable_modules/Fable.Elmish.HMR.7.0.0/./hmr.fs.js";
import { Cmd_map, Cmd_none } from "./fable_modules/Fable.Elmish.HMR.7.0.0/../Fable.Elmish.4.0.0/cmd.fs.js";
import { Msg$1 } from "./fable_modules/Fable.Elmish.HMR.7.0.0/hmr.fs.js";
import { ofArray, singleton } from "./fable_modules/fable-library.4.0.1/List.js";
import { Sub_map, Sub_batch } from "./fable_modules/Fable.Elmish.HMR.7.0.0/../Fable.Elmish.4.0.0/sub.fs.js";
import { ProgramModule_map, ProgramModule_runWith } from "./fable_modules/Fable.Elmish.HMR.7.0.0/../Fable.Elmish.4.0.0/program.fs.js";

export function patternInput$00409() {
    return [init_1, (msg) => ((currentModel) => update_1(msg, currentModel)), (model) => ((dispatch) => render_1(model, dispatch))];
}

export function update() {
    return patternInput$00409()[1];
}

export const render = patternInput$00409()[2];

export function init() {
    return patternInput$00409()[0];
}

(function () {
    const program_2 = Program_Internal_withReactSynchronousUsing((equal, view, state, dispatch) => lazyView2With(uncurry(2, equal), uncurry(2, view), state, dispatch), "feliz-app", ProgramModule_mkProgram(init(), uncurry(2, update()), uncurry(2, render)));
    const hmrState = new FSharpRef(defaultOf());
    if (current_2 == null) {
    }
    else {
        const current = current_2;
        window.Elmish_HMR_Count = ((window.Elmish_HMR_Count == null) ? 0 : (window.Elmish_HMR_Count + 1));
        let hmrDataObject;
        switch (current.tag) {
            case 1: {
                ((import.meta.webpackHot /* If error see https://github.com/elmish/hmr/issues/35 */)).accept();
                hmrDataObject = ((import.meta.webpackHot /* If error see https://github.com/elmish/hmr/issues/35 */)).data;
                break;
            }
            case 2: {
                (module.hot).accept();
                hmrDataObject = (module.hot).data;
                break;
            }
            default: {
                import.meta.hot.accept();
                hmrDataObject = (import.meta.hot.data);
            }
        }
        Internal_tryRestoreState(hmrState, hmrDataObject);
    }
    const mapUpdate = (userUpdate, msg, model) => {
        let patternInput;
        if (msg.tag === 1) {
            patternInput = [model, Cmd_none()];
        }
        else {
            const userMsg = msg.fields[0];
            patternInput = userUpdate(userMsg)(model);
        }
        const newModel = patternInput[0];
        const cmd = patternInput[1];
        hmrState.contents = newModel;
        return [newModel, Cmd_map((arg_1) => (new Msg$1(0, [arg_1])), cmd)];
    };
    const createModel = (tupledArg) => {
        const model_1 = tupledArg[0];
        const cmd_1 = tupledArg[1];
        return [model_1, cmd_1];
    };
    const mapInit = (userInit, args) => {
        if (hmrState.contents == null) {
            const patternInput_1 = userInit(args);
            const userModel = patternInput_1[0];
            const userCmd = patternInput_1[1];
            return [userModel, Cmd_map((arg_2) => (new Msg$1(0, [arg_2])), userCmd)];
        }
        else {
            return [hmrState.contents, Cmd_none()];
        }
    };
    const mapSetState = (userSetState, userModel_1, dispatch_1) => userSetState(userModel_1)((arg_4) => dispatch_1(new Msg$1(0, [arg_4])));
    let hmrSubscription;
    const handler = (dispatch_1_1) => {
        if (current_2 == null) {
        }
        else {
            const current_1 = current_2;
            switch (current_1.tag) {
                case 1: {
                    ((import.meta.webpackHot /* If error see https://github.com/elmish/hmr/issues/35 */)).dispose((data_1) => {
                        Internal_saveState(data_1, hmrState.contents);
                        dispatch_1_1(new Msg$1(1, []));
                    });
                    break;
                }
                case 2: {
                    (module.hot).dispose((data_2) => {
                        Internal_saveState(data_2, hmrState.contents);
                        dispatch_1_1(new Msg$1(1, []));
                    });
                    break;
                }
                default: {
                    import.meta.hot.dispose((data) => {
                        Internal_saveState(data, hmrState.contents);
                        dispatch_1_1(new Msg$1(1, []));
                    });
                }
            }
        }
        return {
            Dispose() {
            },
        };
    };
    hmrSubscription = singleton([singleton("Hmr"), handler]);
    const mapSubscribe = (subscribe, model_2) => Sub_batch(ofArray([Sub_map("HmrUser", (arg_4_1) => (new Msg$1(0, [arg_4_1])), subscribe(model_2)), hmrSubscription]));
    const mapView = (userView, model_3, dispatch_2) => userView(model_3)((arg_6) => dispatch_2(new Msg$1(0, [arg_6])));
    const mapTermination = (tupledArg_1) => {
        const predicate = tupledArg_1[0];
        const terminate = tupledArg_1[1];
        const mapPredicate = (_arg) => {
            if (_arg.tag === 1) {
                return true;
            }
            else {
                const msg_1 = _arg.fields[0];
                return predicate(msg_1);
            }
        };
        return [mapPredicate, terminate];
    };
    ProgramModule_runWith(void 0, ProgramModule_map(mapInit, mapUpdate, mapView, mapSetState, mapSubscribe, mapTermination, program_2));
})();

//# sourceMappingURL=Main.fs.js.map

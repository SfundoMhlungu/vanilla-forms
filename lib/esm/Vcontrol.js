import PubSub from './pubSub';
const Bus = new PubSub();
export class vcontrol {
    constructor(defaultVal, element, opts = {}) {
        this.state = {
            valid: false,
            value: "",
            errors: new Map(),
            dirty: false
        };
        this.subcribers = [];
        this.element = document.querySelector(`[role=${element}]`);
        if (this.element === undefined || this.element === null) {
            throw new Error(`element with role ${element} does not exist in the dom`);
        }
        this.element.oninput = function (e) {
            setState(e, element);
        };
        if (defaultVal.length > 0 || typeof defaultVal === "number") {
            this.element.defaultValue = defaultVal;
            this.setState({ value: defaultVal });
        }
        this.opts = opts;
        if (this.opts.validators.length > 0) {
            this.isValid();
        }
        else {
            this.setState({ valid: true, errors: new Map() });
        }
        this.unsub = Bus.subcribe(element, (input) => {
            setTimeout(() => {
                if (this.opts.validators.length > 0) {
                    this.isValid();
                }
                else {
                    this.setState({ valid: true, errors: new Map() });
                }
                if (this.subcribers.length > 0) {
                    this.subcribers.forEach((sub) => {
                        sub(this.all);
                    });
                }
            }, 500);
            this.setState({ value: input });
        });
    }
    getState() {
        return {};
    }
    setState(value) {
        this.state = Object.assign({}, this.state, value);
    }
    get value() {
        return this.state.value;
    }
    get valid() {
        return this.state.valid;
    }
    get errors() {
        return this.state.errors;
    }
    get all() {
        let all = {
            value: this.value,
            valid: this.valid,
            errors: this.errors
        };
        return all;
    }
    isValid() {
        const validators = this.opts.validators;
        validators.forEach((fn) => {
            let result = fn(this.value);
            if (!result.valid) {
                this.setState({ valid: false });
                this.state.errors.set(result.reason, result.error);
                return;
            }
            else {
                this.setState({ valid: true, errors: new Map() });
            }
        });
        return this.valid;
    }
    subscribe(callback) {
        this.subcribers.push(callback);
        return () => {
            this.subcribers = this.subcribers.filter(l => l !== callback);
        };
    }
}
function setState(e, key) {
    var _a;
    // value does exist, typescript is crazy
    Bus.notify(key, (_a = e === null || e === void 0 ? void 0 : e.target) === null || _a === void 0 ? void 0 : _a.value);
}
//# sourceMappingURL=Vcontrol.js.map
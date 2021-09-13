import { vcontrol } from "./Vcontrol";
export class vgroup {
    constructor(Vcontrols) {
        this.state = {
            valid: false,
            value: {},
            errors: new Map(),
            dirty: false
        };
        this.group = {};
        this.subs = [];
        this.subcribers = [];
        this.hasValidators = false;
        for (const i in Vcontrols) {
            this.group[i] = new vcontrol(Vcontrols[i].defaultVal, Vcontrols[i].element, Vcontrols[i].opts);
            this.state.value[i] = "";
            if (Vcontrols[i].opts.validators.length > 0) {
                this.hasValidators = true;
            }
        }
        if (!this.hasValidators) {
            this.state.valid = true;
        }
    }
    setState(value) {
        this.state = Object.assign({}, this.state, value);
        //  console.log(this.getState())
    }
    isValid() {
        for (const [key, value] of Object.entries(this.group)) {
            // console.log(value.valid)
            if (!value.valid) {
                this.setState({ valid: false });
                this.state.errors.set(key, value.errors);
                return;
            }
            else {
                this.setState({ valid: true, errors: new Map() });
            }
        }
    }
    get value() {
        if (this.hasValidators) {
            this.isValid();
        }
        for (const [key, value] of Object.entries(this.group)) {
            // console.log("value.value",value.value)
            this.state.value[key] = value.value;
        }
        return this.state.value;
    }
    get errors() {
        for (const [key, value] of Object.entries(this.group)) {
            // console.log("value.value",value.value)
            this.state.errors.set(key, value.errors);
        }
        return this.state.errors;
    }
    get valid() {
        return this.state.valid;
    }
    subcribe2() {
        for (const [key, value] of Object.entries(this.group)) {
            this.subs.push(value.subscribe((val) => {
                this.subcribers.forEach((sub) => {
                    sub(this.value);
                });
            }));
        }
    }
    subscribe(callback) {
        if (this.subs.length === 0) {
            this.subcribe2();
        }
        this.subcribers.push(callback);
        return () => {
            this.subcribers = this.subcribers.filter((l) => l !== callback);
        };
    }
}
//# sourceMappingURL=Vgroup.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validators = void 0;
function required(value) {
    if (value.length > 0) {
        return { valid: true };
    }
    else {
        return { reason: "required", error: true };
    }
}
exports.validators = {
    required
};
//# sourceMappingURL=Validators.js.map
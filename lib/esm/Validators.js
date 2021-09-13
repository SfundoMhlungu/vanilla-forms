function required(value) {
    if (value.length > 0) {
        return { valid: true };
    }
    else {
        return { reason: "required", error: true };
    }
}
export const validators = {
    required
};
//# sourceMappingURL=Validators.js.map
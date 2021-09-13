declare function required(value: any): {
    valid: boolean;
    reason?: undefined;
    error?: undefined;
} | {
    reason: string;
    error: boolean;
    valid?: undefined;
};
export declare const validators: {
    required: typeof required;
};
export {};
//# sourceMappingURL=Validators.d.ts.map
interface control {
    defaultVal?: any;
    element: string;
    opts: Record<any, any>;
}
export declare class vgroup {
    private state;
    private group;
    private subs;
    private subcribers;
    private hasValidators;
    constructor(Vcontrols: Record<string, control>);
    private setState;
    private isValid;
    get value(): Record<any, any>;
    get errors(): any;
    get valid(): boolean;
    private subcribe2;
    subscribe(callback: Function): () => void;
}
export {};
//# sourceMappingURL=Vgroup.d.ts.map
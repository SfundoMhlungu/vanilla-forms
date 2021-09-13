export declare class vcontrol {
    private state;
    private element;
    private opts;
    private subcribers;
    private unsub;
    constructor(defaultVal: any, element: string, opts?: Record<any, any>);
    private getState;
    private setState;
    get value(): any;
    get valid(): boolean;
    get errors(): any;
    get all(): {
        value: any;
        valid: boolean;
        errors: any;
    };
    private isValid;
    subscribe(callback: Function): () => void;
}
//# sourceMappingURL=Vcontrol.d.ts.map
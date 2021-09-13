export default class PubSub {
    private subscribers;
    subcribe(channel: any, fn: Function): () => void;
    notify(channel: any, ...data: any): void;
}
//# sourceMappingURL=pubSub.d.ts.map
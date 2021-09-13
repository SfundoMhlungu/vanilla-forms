"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PubSub {
    constructor() {
        this.subscribers = {};
    }
    subcribe(channel, fn) {
        if (!this.subscribers[channel]) {
            this.subscribers[channel] = [];
        }
        this.subscribers[channel].push(fn);
        return () => {
            this.subscribers[channel] = this.subscribers[channel].filter(sfn => sfn != fn);
        };
    }
    notify(channel, ...data) {
        if (this.subscribers[channel]) {
            this.subscribers[channel].forEach(fn => {
                fn(...data);
            });
        }
    }
}
exports.default = PubSub;
//# sourceMappingURL=pubSub.js.map
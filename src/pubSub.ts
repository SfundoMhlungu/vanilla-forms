export default class PubSub{

    private subscribers:Record<any, Array<Function>>  = {}



    subcribe(channel:any,fn:Function){
        if(!this.subscribers[channel]) {
           this.subscribers[channel] = []
        }
        
        this.subscribers[channel].push(fn)


        return () => {
           this.subscribers[channel] = this.subscribers[channel].filter(sfn => sfn != fn)
        }


    }

    notify(channel:any, ...data:any){
        if(this.subscribers[channel]){
            this.subscribers[channel].forEach(fn => {
                fn(...data)
            })
        }
    }
}

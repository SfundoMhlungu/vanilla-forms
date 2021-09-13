import { vcontrol } from "./Vcontrol";

interface control {
    defaultVal?: any,
    element: string,
    opts: Record<any, any>

}


interface state {
    valid: boolean;
    value:Record<any, any>;
    errors: any;
    dirty: boolean;

}



export class vgroup{

   private state:state ={
        valid: false,
        value: {},
        errors: new Map(),
        dirty: false
    }
   private group: Record<string, vcontrol> = {}
   private subs: Array<Function> = []
   private subcribers: Array<Function> = [];
   private hasValidators:boolean = false;
    constructor(Vcontrols: Record<string, control>){
     
     for(const i in Vcontrols){
         this.group[i] = new vcontrol(Vcontrols[i].defaultVal, Vcontrols[i].element, Vcontrols[i].opts)
         this.state.value[i] = ""
         if(Vcontrols[i].opts.validators.length > 0){
             this.hasValidators = true
           
         }

     }

     if(!this.hasValidators){
       
        this.state.valid = true
     }
          
  

    }

    private setState(value:Record<any, any>){
        this.state = Object.assign({}, this.state, value)
       //  console.log(this.getState())
      }
 


    private isValid(){
        for(const [key, value] of Object.entries(this.group)){
            // console.log(value.valid)
            if(!value.valid){
                        
            this.setState({valid: false})
            this.state.errors.set(key, value.errors)
            return
                 
            }
            else{
                this.setState({valid: true, errors: new Map()})
            }
        }
    } 

    get value(){ 
        if(this.hasValidators){
            this.isValid()
        }
        
        for(const [key, value] of Object.entries(this.group)){
            // console.log("value.value",value.value)
            this.state.value[key] = value.value
        }

        return this.state.value
    }

    get errors(){
        
        for(const [key, value] of Object.entries(this.group)){
            // console.log("value.value",value.value)
            this.state.errors.set(key, value.errors)
        }

        return this.state.errors

    }

    get valid(){
        return this.state.valid
    }

   private subcribe2(){
        for(const [key, value] of Object.entries(this.group)){
            this.subs.push(value.subscribe((val:any)=> {
                 this.subcribers.forEach((sub)=>{
                     sub(this.value)
                 })
            }))   
            
        }
        
    }

    
    subscribe(callback:Function){

        if(this.subs.length === 0){
            this.subcribe2()
           
        }
        this.subcribers.push(callback)


       return ()=>{
      
          this.subcribers = this.subcribers.filter((l: Function) => l !== callback) 
       }

     }

}



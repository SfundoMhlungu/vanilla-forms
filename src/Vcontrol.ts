
import PubSub from './pubSub'



const Bus = new PubSub()




interface state {
    valid: boolean;
    value: any;
    errors: any;
    dirty: boolean;

}


export class vcontrol {
     private state: state = {
         valid: false,
         value: "",
         errors: new Map(),
         dirty: false
     } 

    private element: HTMLInputElement;
    private opts;
  
    private subcribers: Array<Function> = []
    private unsub:Function;

    constructor(defaultVal:any, element:string, opts:Record<any, any> = {}){
       
       this.element = <HTMLInputElement>document.querySelector(`[role=${element}]`)
       if(this.element === undefined || this.element === null){
         throw new Error(`element with role ${element} does not exist in the dom`)
       }
 

       this.element.oninput = function(this:any,e:any){
         setState(e, element)
       }
     
       if(defaultVal.length > 0 || typeof defaultVal === "number"){
      
        this.element.defaultValue = defaultVal;
        this.setState({value: defaultVal})
       }
   
     
      this.opts = opts
      if(this.opts.validators.length > 0){
          
        this.isValid()
      }else{
        this.setState({valid: true, errors: new Map()})
      }
 
    
     this.unsub = Bus.subcribe(element, (input:any)=> {
        setTimeout(()=> {
          if(this.opts.validators.length > 0){
          
            this.isValid()
          }else{
            this.setState({valid: true, errors: new Map()})
          }
         
          if(this.subcribers.length> 0){
            this.subcribers.forEach((sub)=>{
         

              sub(this.all)
             })
          }
         
        }, 500)
        this.setState({value: input})
      })
 
  
      
    }

    private getState(){

      
    
         return {
           
         }
     }

     private setState(value:Record<any, any>){
       this.state = Object.assign({}, this.state,value)
    
     }


     get value(){

      return this.state.value
     }

     get valid(){
       return this.state.valid
     }
     
     get errors(){
       return this.state.errors
     }

     get all(){
       let all = {
         value: this.value,
         valid: this.valid,
         errors: this.errors


       }

       return all
     }

     private isValid():boolean{
       const validators = this.opts.validators

       validators.forEach((fn:Function)=>{
         let result = fn(this.value)

         if(!result.valid){
           
          this.setState({valid: false})
          this.state.errors.set(result.reason, result.error)
          return
         }
         else{
          this.setState({valid: true, errors: new Map()})
         }
       
       
       })

      

       return this.valid

       
     }


     subscribe(callback:Function){


        this.subcribers.push(callback)

       return ()=>{
      
          this.subcribers = this.subcribers.filter(l => l !== callback) 
       }

     }

}




 function setState(e:Event, key:string){
   // value does exist, typescript is crazy
     Bus.notify(key, e?.target?.value)
  
 }


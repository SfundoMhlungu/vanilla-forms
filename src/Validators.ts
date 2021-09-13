




function required(value:any){
    if(value.length > 0 || typeof value === 'number'){
        return {valid: true}
    }
    else {
        return {reason: "required", error: true}
    }
}

















export const validators = {
    required

}




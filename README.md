# Vanilla-forms

a project by: Sfundo Mhlungu

  
## for developers:  getting started.

  

[dev.to getting started](https://dev.to/sfundomhlungu/handle-forms-like-a-boss-reactive-forms-in-vanilla-javascript-4930)

  

### License

 MIT

  
  

### Socials  or ask a question

 ![Twitter Follow](https://img.shields.io/twitter/follow/MhlunguSfundo?style=social)

  
  
## for recruiters/hiring managers etc

  

### Overview

  

Working with forms in vanilla JavaScript can be cumbersome and straight up tedious, having to query for an element, add a listener, pass a callback, implement custom validation and listen for changes, then bring that all together can be tiring especially with large forms.

Vanilla forms aim to solve exactly that, by handling everything automatically from adding listeners, validators, returning submitted data in a neatly ready to use object and errors too in a map if they exist.

Vanilla forms is inspired by Angular's ngForms and written entirely in typescript with no dependencies

### Brief
- JavaScript Module 
- 100% Typescript 
- no dependencies 
- Utilized the PubSub reactive pattern 
- Utilized classes for OOP

### Technologies Used

- Typescript 
- Github 
- Npm 

### Approach Taken

At the center of Vanilla forms(VF) is the need to get an element or elements, identify it's type and attach relevant events, so I decided to utilize the role attribute e.g `role="v-username"` to identify elements VF must work with, with the convention `v-`  denoting VF is handling the element..

After getting the element I utilized native DOM functionality to determine the type of the element, and what events it can trigger and attach them.

To handle events and triggers I utilized the PubSub pattern, to hijack all events and pipe them through this subscribe and notify model.

```js
signup.subscribe((val)=> {

    console.log(val, "SIGN UP FORM VALUES CHANGEG")


    if(signup.valid){

  

        console.log("signup form is valid")

    }

})
```


I utilized Typescript types and interfaces for robust, maintainable and lean code. Which worked perfectly as I built this tool late 2021 and it's still working as expected and I haven't had a need to update it.


### Wins and Blockers

#### wins
I got to use intermediate Typescript features furthering my learning of the language and overall the understanding of DOM, design patterns and Modular programming.

#### Blockers 

Some DOM input were way more weird  than others needing to be handled separately and furthering research of their behavior and events they expose. and because they are rarely used, I did not implement them as of yet.


## Featured Code

### Featured Code 1

```js

export default class PubSub{

  

    private subscribers:Record<any, Array<Function>>  = {}

  
  
  

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
```

the piece of code above creates the PubSub pattern, which is at the core of coordinating elements events and subscribers to those elements,

### Featured Code 2

```js

  private setState(value:Record<any, any>){

       this.state = Object.assign({}, this.state,value)

   }
```

this simple piece of code above is responsible for syncing and updating the state at every event for example when the input changes

```js
 this.state = Object.assign({}, this.state,value)

```
consolidates everything, the old and the new state, so we can have the entire state thru time.

### Featured Code 3

```js
  private isValid(){

        for(const [key, value] of Object.entries(this.group)){

           

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
```

This is piece of code is able to bulk test a group of elements and determine whether they have valid inputs or not based on the validators given, if one fails the entire group is invalid and the form must not be submitted, this makes possible the following piece of code to test validity of forms

```js
if(signup.valid){

    console.log("signup is valid")

}else{

    console.log("signup is not yet valid")

}
```

  

# Visuals

[vanillaforms.webm](https://user-images.githubusercontent.com/62028311/197367256-ee3df5f2-ca45-4023-a6ce-551f554a66ab.webm)

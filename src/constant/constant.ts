import { error } from 'util';


export const initStoreValue: object = {};

 if (process.env.NODE_ENV === `development`) {
     console.log(`env:${process.env.NODE_ENV}`)
   serverPath = "http://localhost:8080"
}else{
     console.log(`env:${process.env.NODE_ENV}`)
    serverPath = "http://v.learnjavaweb.com:8080/blog-0.0.1-SNAPSHOT"
 }
 export var serverPath

export const jsonContentType = {
    'Content-Type': 'application/json'
}

export const TryEpic = (f: Function) =>(action$:any)=>{
    try{
        f(action$
        )
    }
    catch(err)
    {console.error(err)}
}

export const pageUrlPrefix =(action:any)=> `?pageNum=${action.pageInfo.pageNum}&pageSize=${action.pageInfo.pageSize}`

export const isObject = (ele:any)=>{
     return typeof ele === "object";
}

export const deepCloneObject= (object:any)=>{
     let newObject={}
    if(isObject(object)){
        for(let  prop in object){
            if(isObject(object[prop])){
                debugger
                newObject[prop] = deepCloneObject(object[prop])
            }else{
                newObject[prop] = object[prop]
            }
        }
    }else {
        newObject = object
    }

    return newObject
}

export const shallowClone = (object:any)=>{
    let newObject={}
    for(let  prop in object){
      newObject[prop] = object[prop]

    }
    return newObject
}

export const cloneDiff = (fromObj:any,toObj:any)=> {
    if (isObject(fromObj) && isObject(toObj)) {
        for (let prop in fromObj) {
            if (fromObj.hasOwnProperty(prop)) {
                toObj[prop] = fromObj[prop]
            }
        }
    } else
        throw new Error("必须都是对象")
}
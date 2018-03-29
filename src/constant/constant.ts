

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
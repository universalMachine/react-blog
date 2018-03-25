

export const initStoreValue: object = {};

 if (process.env.NODE_ENV === `development`) {
   serverPath = "http://localhost:8080"
}else{
    serverPath = "http://localhost:8080/blog"
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
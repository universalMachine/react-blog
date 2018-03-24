

export const initStoreValue: object = {};
export const serverPath = "http://localhost:8080"

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
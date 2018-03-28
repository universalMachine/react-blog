export const deepEqual =  (x:any, y:any)=>{
    if (x === y) {
        return true;
    }
    else if ((typeof x == "object" && x != null) && (typeof y == "object" && y != null)) {
        if (Object.keys(x).length != Object.keys(y).length)
            return false;

        for (var prop in x) {
            if (y.hasOwnProperty(prop))
            {
                if(typeof x[prop] == 'function' && typeof y[prop] == 'function'){
                    console.log("function")
                   if(x[prop].toString() == y[prop].toString())
                    continue
                   else
                       return false
                }
                if (! deepEqual(x[prop], y[prop]))
                    return false;
            }
            else
                return false;
        }

        return true;
    }
    else
        return false;
}
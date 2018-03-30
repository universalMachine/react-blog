import { combineReducers, GenericStoreEnhancer, StoreCreator, StoreEnhancer } from 'redux';


const RESET_ACTION_TYPE='@@RESET'
const resetAction = (resetState)=>({
    type:RESET_ACTION_TYPE,
    resetState: resetState
})
const resetReducerCreator = (reducer,resetState)=>(state,action)=>{
    if(action.type == RESET_ACTION_TYPE){

        return resetState
    }else
        return reducer(state,action)

}


const ResetEnhancer = (createStore:StoreCreator)=>(reducer,preloadedState,enhancer)=>{
    const store = createStore(reducer,preloadedState,enhancer)

    const resetStore = (newReducers,newState)=>{

      // wrappedStore.currentReducers = {...wrappedStore.currentReducers,newReducer}
        const resetReducer = resetReducerCreator(combineReducers(newReducers),newState)
        store.replaceReducer(resetReducer)
        store.dispatch(resetAction(newState))
    }

    return{
        ...store,
        resetStore
    }
}

export default ResetEnhancer
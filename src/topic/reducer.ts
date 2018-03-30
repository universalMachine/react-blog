import { AnyAction } from 'redux';
import {
    TOPIC_ADD_FAIL, TOPIC_ADD_STATUS_RESET, TOPIC_ADD_SUCCESS, TOPIC_DELETE_SUCCESS, TOPIC_FETCH, TOPIC_FETCH_FAIL,
    TOPIC_FETCH_SUCCESS
} from './actionTypes';
import PageInfo from '../constant/PageInfo';

const complete = "complete"
const isSameBoard = (topics:any,boardId:number)=>{
    if(boardId)
        return topics.boardId == boardId
    else
        return false
}

const addTopic = (topics:any,newTopic:any)=>{

    if(isSameBoard(topics,newTopic.boardId)){
        console.dir(topics)
        console.dir(newTopic)
        return {...topics,topicList:[...topics.topicList,newTopic]}
        /*topics.topicList.push(newTopic)
        return {...topics}*/
    }else{
        return {boardId:newTopic.boardId,topicList:[newTopic]}
    }
}

const fetchTopic  = (topics:any,response:any)=>{
         const newTopics = response.data.content

        if(isSameBoard(topics,response.extra.boardId)){
            if(newTopics.length >0 )
                return {...topics,topicList:topics.topicList.concat(newTopics)}
            else
                return topics
        }else{
            return {boardId:response.extra.boardId,topicList:newTopics}
        }
}

export const initialState = {topics:{boardId:null,topicList:[]},boardId:0,addStatus:"default",addMessage:"",pageInfo:{pageSize:5,pageNum:0},fetchStatus : "none",fetchResult:{}}

export default (state:any=initialState, action:AnyAction)=>{
    switch (action.type){
        case TOPIC_ADD_SUCCESS:
            //console.dir(action.res.data)
            return {...state,topics: addTopic(state.topics,action.res.data),addStatus: TOPIC_ADD_SUCCESS,addMessage:action.res.message}
        case TOPIC_ADD_FAIL:
            return {...state,addStatus:TOPIC_ADD_FAIL,addMessage:action.res.message}
        case TOPIC_ADD_STATUS_RESET:
            return {...state,addStatus:"default"}
        case TOPIC_FETCH:
            return {...state,fetchStatus:"start"}
        case TOPIC_FETCH_SUCCESS:
            const fetchPage = action.res.data

            return{...state,topics:fetchTopic(state.topics,action.res),pageInfo: {pageNum:fetchPage.number+1, pageSize:fetchPage.size},fetchResult:fetchPage,fetchStatus:"complete"}
        case TOPIC_FETCH_FAIL:
            return {...state,fetchStatus:"complete"}

        case TOPIC_DELETE_SUCCESS:
            const deleteTopicId = action.res.data
            return {...state,topics: {...state.topics,topicList:state.topics.topicList.filter((topic:any)=>topic.topicId !== deleteTopicId)}}
        default:
            return state
    }
}
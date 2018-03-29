import {
    TOPIC_ADD, TOPIC_ADD_FAIL, TOPIC_ADD_SUCCESS, TOPIC_DELETE, TOPIC_DELETE_FAIL, TOPIC_DELETE_SUCCESS, TOPIC_FETCH,
    TOPIC_FETCH_FAIL,
    TOPIC_FETCH_SUCCESS
} from './actionTypes';
import PageInfo from '../constant/PageInfo';

export const fetchTopic = (pageInfo:PageInfo,boardId :number)=>({
    type: TOPIC_FETCH,
    pageInfo:pageInfo,
    boardId: boardId
})

export const fetchTopicSuccess = (res:any)=>({
    type: TOPIC_FETCH_SUCCESS,
    res: res
})


export const fetchTopicFAIL =(res:any)=>({
    type: TOPIC_FETCH_FAIL,
    res: res
})


export const addTopic =(topic:any)=>({
    type: TOPIC_ADD,
    topic: topic

})

export const addTopicSuccess=(res:any)=>({
    type: TOPIC_ADD_SUCCESS,
    res: res
})

export const addTopicFAIL=(res:any)=>({
    type: TOPIC_ADD_FAIL,
    res: res
})

export const deleteTopic = (topicId:number)=>({
    type: TOPIC_DELETE,
    topicId: topicId
})

export const deleteTopicSuccess = (res:any)=>({
    type: TOPIC_DELETE_SUCCESS,
    res:res
})

export const deleteTopicFail = (res:any)=>({
    type: TOPIC_DELETE_FAIL,
    res:res
})


import {
    MainPost_FETCH, MainPOST_FETCH_FAIL, MainPOST_FETCH_SUCCESS, POST_ADD, POST_ADD_FAIL,
    POST_ADD_SUCCESS, POST_DELETE, POST_DELETE_FAIL, POST_DELETE_SUCCESS, POST_FETCH, POST_FETCH_FAIL,
    POST_FETCH_SUCCESS, POST_RESET
} from './actionTypes';
import PageInfo from '../constant/PageInfo';
import { Post } from './Post';

export const addPost = (post:Post)=>({
    type: POST_ADD,
    post: post

})

export const addPostSuccess = (res:any)=>({
    type: POST_ADD_SUCCESS,
    res: res

})

export const addPostFail = (res:any)=>({
    type: POST_ADD_FAIL,
    res: res

})



export const fetchMainPost = (pageInfo:PageInfo,topicId:number )=>({
    type: MainPost_FETCH,
    pageInfo: pageInfo,
    topicId: topicId

})

export const fetchMainPostSuccess = (res:any)=>({
    type: MainPOST_FETCH_SUCCESS,
    res: res

})

export const fetchMainPostFail = (res:any)=>({
    type:MainPOST_FETCH_FAIL,
    res: res

})

export const fetchPost = (pageInfo:PageInfo,topicId:number )=>({
    type: POST_FETCH,
    pageInfo: pageInfo,
    topicId: topicId

})

export const fetchPostSuccess = (res:any)=>({
    type: POST_FETCH_SUCCESS,
    res: res

})

export const fetchPostFail = (res:any)=>({
    type:POST_FETCH_FAIL,
    res: res

})

export const resetPost = ()=>({
    type:POST_RESET
})


export const deletePost = (postId: number)=>({
    type: POST_DELETE,
    postId:postId
})

export const deletePostSuccess = (res:any)=>({
    type: POST_DELETE_SUCCESS,
    res: res

})

export const deletePostFail = (res:any)=>({
    type: POST_DELETE_FAIL,
    res: res

})

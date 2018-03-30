import { AnyAction } from 'redux';
import {
    MainPost_FETCH,
    MainPOST_FETCH_FAIL,
    MainPOST_FETCH_SUCCESS,
    POST_ADD_FAIL,
    POST_ADD_STATUS_RESET,
    POST_ADD_SUCCESS,
    POST_DELETE_SUCCESS,
    POST_FETCH,
    POST_FETCH_FAIL,
    POST_FETCH_SUCCESS,
    POST_INIT_PAGE_INFO,
    POST_RESET
} from './actionTypes';

const complete = "complete"
const isSameTopic = (posts: any, topicId: number) => {
    return posts.topicId == topicId

}
const isTopicEmpty = (topicId: any) => {
    return topicId == "empty"
}
const fetchReplyPosts = (originPosts: any, res: any) => {
    if (isSameTopic(originPosts, res.extra.topicId) || isTopicEmpty(originPosts.topicId)) {
        return {...originPosts, replyPosts: originPosts.replyPosts.concat(res.data.content)}
    } else {
        return originPosts
    }
}

const fetchMainPost = (originPosts: any, res: any) => {
    if (isSameTopic(originPosts, res.extra.topicId)) {
        return originPosts
    } else if (isTopicEmpty(originPosts.topicId)) {
        return {...originPosts, topicId: res.extra.topicId, mainPost: res.data.content}
    } else {
        return {topicId: res.extra.topicId, mainPost: res.data.content, replyPosts: []}
    }
}

const addPost = (originPosts: any, res: any) => {

    if (isSameTopic(originPosts, res.data.topicId)) {
        return {...originPosts, topicId: res.data.topicId, replyPosts: [res.data, ...originPosts.replyPosts]}
    } else if (isTopicEmpty(originPosts.topicId)) {
        return {...originPosts, topicId: res.data.topicId, replyPosts: [res.data, ...originPosts.replyPosts]}
    } else {
        return originPosts
    }
}

const deletePost = (originPosts: any, res: any) => {

    if (isSameTopic(originPosts, res.extra.topicId)) {
        return {
            ...originPosts, replyPosts: originPosts.replyPosts.filter((replyPost: any) => {
                return replyPost.postId != res.extra.postId
            })
        }
    } else {
        return originPosts
    }
}

export const initialState = {
    posts: {
        topicId: "empty", mainPost: [], replyPosts: []
    },
    addStatus: "default",
    addMessage: "",
    pageInfo: {pageSize: 1, pageNum: 1},
    fetchStatus: "none",
    mainFetchStatus: "none",
    fetchResult: {}
}
export default (state: any = initialState, action: AnyAction) => {
    switch (action.type) {
        case POST_ADD_SUCCESS:
            return {
                ...state,
                posts: addPost(state.posts, action.res),
                addStatus: POST_ADD_SUCCESS,
                addMessage: action.res.message
            }
        case POST_ADD_FAIL:
            return {...state, addStatus: POST_ADD_FAIL, addMessage: action.res.message}
        case POST_ADD_STATUS_RESET:
            return {...state, addStatus: "default"}
        case POST_FETCH:
            return {...state, fetchStatus: "start"}
        case POST_FETCH_SUCCESS:
            const data = action.res.data
            return {
                ...state,
                posts: fetchReplyPosts(state.posts, action.res),
                pageInfo: {pageNum: data.number + 1, pageSize: data.size},
                fetchResult: data,
                fetchStatus: "complete"
            }
        case POST_FETCH_FAIL:
            return {...state, fetchStatus: "complete"}
        case MainPost_FETCH:
            return {...state, mainFetchStatus: "start"}
        case MainPOST_FETCH_SUCCESS:
            return {...state, posts: fetchMainPost(state.posts, action.res), mainFetchStatus: "complete"}
        case MainPOST_FETCH_FAIL:
            return {...state, mainFetchStatus: "complete"}
        case POST_DELETE_SUCCESS:
            return {...state, posts: deletePost(state.posts, action.res)}
        case POST_INIT_PAGE_INFO:
            return {...state, pageInfo: action.pageInfo}
        case POST_RESET:
            return initialState
        default:
            return state
    }
}
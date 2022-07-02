import {ALL_COMMENTS, COMMENT_CLEAR, CURRENT_COMMENT} from '../reducers/actionTypes';

export const getComments = (obj) => (dispatch) => {
    try {
        dispatch({type: ALL_COMMENTS, payload: {comments: obj}});
    } catch (e) {
        dispatch({type: ALL_COMMENTS, payload: {comments: null}});
    }
}
export const getCurrentComment = (_id, text, img, post, createBy) => (dispatch) => {
    try {
        dispatch({type: CURRENT_COMMENT, payload: {_id, text, img, post, createBy}});
    } catch (e) {
        dispatch({type: CURRENT_COMMENT, payload: {_id: null, text: null, img: null, post: null, createBy: null}});
    }
}

export const clearComments = () => (dispatch) => {
    dispatch({type: COMMENT_CLEAR, payload: null})
}

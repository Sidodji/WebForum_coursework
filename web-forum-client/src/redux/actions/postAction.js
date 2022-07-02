import {ALL_POSTS, CURRENT_POST, POST_CLEAR} from "../reducers/actionTypes";


export const getPosts = (obj) => (dispatch) => {
    try {
        dispatch({type: ALL_POSTS, payload: {posts: obj}});
    } catch (e) {
        dispatch({type: ALL_POSTS, payload: {posts: null}});
    }
}

export const getCurrentPost = (_id, header, createBy, topic, description, createdAt, updatedAt) => (dispatch) => {
    try {
        dispatch({
            type: CURRENT_POST,
            payload: {
                _id: _id,
                header: header,
                createBy: createBy,
                topic: topic,
                description: description,
                createdAt: createdAt,
                updatedAt: updatedAt
            }
        });
    } catch (e) {
        dispatch({
            type: CURRENT_POST,
            payload: {
                _id: null,
                header: null,
                createBy: null,
                topic: null,
                description: null,
                createdAt: null,
                updatedAt: null
            }
        })
    }
}

export const clearPosts = () => (dispatch) => {
    dispatch({type: POST_CLEAR, payload: null})
}

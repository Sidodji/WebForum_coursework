import {AUTHORIZATION, ALL_USERS, USER_CLEAR, GET_USER_DATA, USER_POSTS} from "../reducers/actionTypes";

export const authUser = (id, username, role, img, token, success) => (dispatch) => {
    try {
        dispatch({type: AUTHORIZATION, payload: {id, username, role, img, token, success}});
    } catch (e) {
        dispatch({
            type: AUTHORIZATION, payload: {
                id: null,
                username: null,
                firstName: null,
                lastName: null,
                email: null,
                role: null,
                img: null,
                token: null,
                success: false,
                github: null,
                twitter: null,
                instagram: null,
                facebook: null,
                users: null
            }
        });
    }
}
export const getAllUsers = (obj) => (dispatch) => {
    try {
        dispatch({type: ALL_USERS, payload: {users: obj}});
    } catch (e) {
        dispatch({type: ALL_USERS, payload: null});
    }
}

export const getUserById = (firstName, lastName, email, github, twitter, instagram, facebook) => dispatch => {
    try {
        dispatch({type: GET_USER_DATA, payload: {firstName, lastName, email, github, twitter, instagram, facebook}})
    } catch (e) {
        dispatch({type: GET_USER_DATA,
            payload: {
                firstName: null,
                lastName: null,
                email: null,
                github: null,
                twitter: null,
                instagram: null,
                facebook: null
            }
        })
    }
}
export const getUserPosts = (obj) => (dispatch) => {
    try {
        dispatch({type: USER_POSTS, payload: {posts: obj}});
    } catch (e) {
        dispatch({type: USER_POSTS, payload: null});
    }
}

export const logoutUser = () => (dispatch) => {
    dispatch({type: USER_CLEAR, payload: null});
}

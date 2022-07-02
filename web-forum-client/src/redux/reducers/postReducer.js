import {ALL_POSTS, CURRENT_POST, POST_CLEAR} from "./actionTypes";

const initialState = {
    _id: '',
    header: '',
    createBy: {},
    topic: {},
    description: '',
    createdAt: '',
    updatedAt: '',
    posts: []
}
const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case ALL_POSTS: {
            return {...state, ...action.payload};
        }
        case CURRENT_POST: {
            return {...state, ...action.payload};
        }
        case POST_CLEAR: {
            return initialState;
        }
        default: {
            return state;
        }
    }
}

export default postReducer;

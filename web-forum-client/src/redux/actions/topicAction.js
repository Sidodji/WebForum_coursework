import {ALL_TOPICS, CURRENT_TOPIC, TOPIC_CLEAR} from "../reducers/actionTypes";

export const getTopics = (obj) => (dispatch) => {
    try {
        dispatch({type: ALL_TOPICS, payload: {topics: obj}});
    } catch (e) {
        dispatch({type: ALL_TOPICS, payload: null});
    }
}
export const clearTopics = () => (dispatch) => {
    dispatch({type: TOPIC_CLEAR, payload: null});
}
export const getCurrentTopic = (_id, name, createBy, createdAt, updatedAt) => (dispatch) => {
    try {
        dispatch({
            type: CURRENT_TOPIC,
            payload: {_id: _id, name: name, createBy: createBy, createdAt: createdAt, updatedAt: updatedAt}
        });
    } catch (e) {
        dispatch({
            type: CURRENT_TOPIC,
            payload: {_id: null, name: null, createBy: null, createdAt: null, updatedAt: null}
        })
    }
}


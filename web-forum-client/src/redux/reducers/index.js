import {combineReducers} from "redux";
import userReducer from "./userReducer";
import socketReducer from "./socketReducer";
import messageReducer from "./messageReducer";
import chatDataReducer from "./chatDataReducer";
import topicReducer from "./topicReducer";
import postReducer from "./postReducer";
import commentReducer from "./commentReducer";

const rootReducer = combineReducers({
    user: userReducer,
    socket: socketReducer,
    message: messageReducer,
    chatData: chatDataReducer,
    topic: topicReducer,
    post: postReducer,
    comment: commentReducer
})
export default rootReducer;

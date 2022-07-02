import React, {useEffect, useState} from "react";
import Sidebar from "./components/sidebar";
import Home from './components/home'
import './css/app.css'
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import useActions from "./helpers/hooks/useActions";
import Chat from "./components/chat";
import socket from "./components/socket"
import {useSelector} from "react-redux";
import Topic from "./components/topic";
import AdminPanel from "./components/admin/adminPanel";
import CurrentTopic from "./components/currentTopic";
import Profile from "./components/profile";
import LoginModal from "./modal/loginModal";
import CurrentPost from "./components/currentPost";
import Error from "./components/error";

function App() {
    //TODO: work with images
    //TODO: do home
    const {id, username} = useSelector(state => state.user);
    const redux = useActions();
    const setMessage = (obj) => redux.setMessage(obj);
    const setUsers = (users) => redux.setSocket(users);
    const [showLogInModal, toggleLogInModal] = useState(false);
    const preload = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            console.warn("Check token request")
            fetch('/init', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }).then(r => r.json())
                .then(user => {
                    redux.authUser(user.id, user.username, user.role, user.img, token, true);
                    socket.emit('JOIN', {username: user.username});
                })
                .catch((e) => {
                    localStorage.removeItem('token');
                    socket.disconnect();
                    alert('You session was ended, please log in again.');
                    toggleLogInModal(true);
                })
        } else console.warn("Check request is passed")
    }

    useEffect(() => {
        preload();
        socket.on("SET_USERS", setUsers);
        socket.on("NEW_MESSAGE", setMessage);
    }, [])


    const closeModal = () => {
        console.log('close')
        toggleLogInModal(false);
        console.log(showLogInModal);
    }

    return (
        <BrowserRouter>
            <div className="App">
                {showLogInModal ? (<LoginModal closeCallback={closeModal}/>) : null}
                <Sidebar/>
                <Switch>
                    <Route path="/" exact>
                        <Home/>
                    </Route>
                    <Route path="/admin" exact>
                        {id !== null ? <AdminPanel/> : <Error statusCode={'401'} statusMessage={'Unauthorized'} message={'To work with the profile page, you need to log in'}/>}
                    </Route>
                    <Route path="/profile/:id" exact>
                        {id !== null ? <Profile/> : <Error statusCode={'401'} statusMessage={'Unauthorized'} message={'To work with the profile page, you need to log in'}/>}
                    </Route>
                    <Route path="/topic" exact>
                        {!!username ? <Topic/> : <Error statusCode={'401'} statusMessage={'Unauthorized'} message={'To work with the profile page, you need to log in'}/>}
                    </Route>
                    <Route path="/chat" exact>
                        {!!username ? <Chat onSetMessage={setMessage}/> : <Error statusCode={'401'} statusMessage={'Unauthorized'} message={'To work with the profile page, you need to log in'}/>}
                    </Route>
                    <Route path='/topic/:topicName' exact>
                        {!!username ? <CurrentTopic/> : <Error statusCode={'401'} statusMessage={'Unauthorized'} message={'To work with the profile page, you need to log in'}/>}
                    </Route>
                    <Route path='/topic/:topicName/:postId' exact>
                        {!!username ? <CurrentPost/> : <Error statusCode={'401'} statusMessage={'Unauthorized'} message={'To work with the profile page, you need to log in'}/>}
                    </Route>
                    <Redirect to={'/topic'}/>
                </Switch>
            </div>
        </BrowserRouter>

    );
}


export default App;

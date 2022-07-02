import React, {useEffect, useState} from "react";
import '../../css/adminPanel.css'
import useActions from "../../helpers/hooks/useActions";
import {useSelector} from "react-redux";
import AddTopicModal from "../../modal/admin/addTopicModal";
import ShowUserModal from "../../modal/admin/showUserModal";
import EditUserModal from "../../modal/admin/editUserModal";
import DeleteUserModal from "../../modal/admin/deleteUserModal";
import EditTopicModal from "../../modal/admin/editTopicModal";
import DeleteTopicModal from "../../modal/admin/deleteTopicModal";

const AdminPanel = (props) => {
    const redux = useActions();
    const [showDeleteUserModal, toggleDeleteUserModal] = useState(false);
    const [showAddTopicModal, toggleAddTopicModal] = useState(false);
    const [showShowUserModal, toggleShowUserModal] = useState(false);
    const [showEditUserModal, toggleEditUserModal] = useState(false);
    const [showEditTopicModal, toggleEditTopicModal] = useState(false);
    const [showDeleteTopicModal, toggleDeleteTopicModal] = useState(false);
    const [currentUserIdValue, setCurrentUserIdValue] = useState('');
    const [currentTopicNameValue, setCurrentTopicNameValue] = useState('');
    useEffect(() => {
        (async () => {
            await fetch('/user', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then(data => data.json())
                .then(users => {
                    redux.getAllUsers(users);
                })
        })();
        (async () => {
            await fetch('/topic', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then(data => data.json())
                .then(topics => {
                    redux.getTopics(topics);
                })
                .catch(e => {
                    console.log(e.message)
                    alert('To work with the admin panel, you need to log in')
                })
        })();
    }, [])
    const {users} = useSelector(state => state.user);
    const {topics} = useSelector(state => state.topic);
    return (
        <>
            {showDeleteUserModal ? <DeleteUserModal closeCallback={() => toggleDeleteUserModal(false)}
                                                    showDeleteUserModal={showDeleteUserModal}
                                                    userId={currentUserIdValue}/> : null}
            {showShowUserModal ?
                <ShowUserModal closeCallback={() => toggleShowUserModal(false)} userId={currentUserIdValue}/> : null}
            {showEditUserModal ?
                <EditUserModal closeCallback={() => toggleEditUserModal(false)} userId={currentUserIdValue}/> : null}
            {showAddTopicModal ? <AddTopicModal closeCallback={() => toggleAddTopicModal(false)}
                                                showAddTopicModal={showAddTopicModal}/> : null}
            {showEditTopicModal ? <EditTopicModal closeCallback={() => toggleEditTopicModal(false)}
                                                  showEditTopicModal={showEditTopicModal}
                                                  topicName={currentTopicNameValue}/> : null}
            {showDeleteTopicModal ?
                <DeleteTopicModal closeCallback={() => toggleDeleteTopicModal(false)} topicName={currentTopicNameValue}
                                  showDeleteTopicModal={showDeleteTopicModal}/> : null}
            <div className="main_content">
                <div className="info">
                    <button type="button" className="btn btn-primary" onClick={() => toggleAddTopicModal(true)}>Add
                        Topic
                    </button>
                    <h2>Users</h2>
                    <ul className="list-group">
                        {users && users.map((user, index) => (
                            <li key={index} className="list-group-item">
                                <div id="list-span">
                                    <span id="span_username">{user.username}</span>
                                    <span id="span_email">{user.email}</span>
                                </div>
                                <div className="btn-group" role="group" aria-label="Basic outlined example">
                                    <button type="button" className="btn btn-outline-primary" onClick={() => {
                                        setCurrentUserIdValue(user._id);
                                        toggleShowUserModal(true);
                                    }}>Show
                                    </button>

                                </div>
                            </li>
                        ))}
                    </ul>
                    <h2>Topics</h2>
                    <ul className="list-group">
                        {topics && topics.map((topic, index) => (
                            <li key={index} className="list-group-item">
                                <div id="list-span">
                                    <span id="span_username">{topic.name}</span>
                                </div>
                                <div className="btn-group" role="group" aria-label="Basic outlined example">
                                    <button type="button" className="btn btn-outline-primary" onClick={() => {
                                        setCurrentTopicNameValue(topic.name);
                                        toggleEditTopicModal(true);
                                    }}>Edit
                                    </button>

                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
}
export default AdminPanel;

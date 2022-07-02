import React, {useEffect, useState} from "react";
import '../css/profile.css';
import {useHistory, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import useActions from "../helpers/hooks/useActions";
import EditUserModal from "../modal/editUserModal";

const Profile = () => {
    const [showEditUserModal, toggleEditUserModal] = useState(false);
    const redux = useActions();
    const {id} = useParams();
    const history = useHistory();
    const redirect = (path) => history.push(path);
    useEffect(() => {
        (async () => {
            await fetch(`/user/${id}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then(value => value.json())
                .then(({firstName, lastName, email, github, twitter, instagram, facebook}) => {
                    redux.getUserById(firstName, lastName, email, github, twitter, instagram, facebook);
                })
                .catch(e => {
                    alert(e.message);
                })
            await fetch(`/posts/${id}/user`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then(data => data.json())
                .then(posts => {
                    redux.getUserPosts(posts);
                })
                .catch()
        })()
    }, [])
    const {
        username,
        firstName,
        img,
        lastName,
        email,
        role,
        github,
        twitter,
        instagram,
        facebook,
        posts
    } = useSelector(state => state.user);
    return (
        <>
            {showEditUserModal ? (<EditUserModal closeCallback={() => toggleEditUserModal(false)}/>) : null}
            <div className="main_content">
                <div className="info">
                    <div className="container">
                        <div className="main-body">
                            <div className="row gutters-sm">
                                <div className="col-md-4 mb-3">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="d-flex flex-column align-items-center text-center">
                                                {!!img ? <img src={img} alt="Admin" className="rounded-circle"
                                                              width="150"/> :
                                                    <img src="https://www.bootdey.com/app/webroot/img/default-avatar.png"
                                                         alt="Admin"
                                                         className="rounded-circle" width="150"/>}

                                                <div className="mt-3">
                                                    <h4>{firstName} {lastName}</h4>
                                                    <p className="text-secondary mb-1">{role === 'user' ? 'Forum participant' : 'Admin'}</p>
                                                    <button className="btn btn-primary"
                                                            onClick={() => toggleEditUserModal(true)}>Edit
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {!!github || !!twitter || !!instagram || !!facebook ?
                                        <div className="card mt-3">
                                            <ul className="list-group list-group-flush">
                                                {!!github ?
                                                    <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                                        <h6 className="mb-0">
                                                            <i className="fab fa-github"/>
                                                            Github
                                                        </h6>
                                                        <span className="text-secondary">{github}</span>
                                                    </li> : null}
                                                {!!twitter ?
                                                    <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                                        <h6 className="mb-0">
                                                            <i className="fab fa-twitter"/>
                                                            Twitter
                                                        </h6>
                                                        <span className="text-secondary">@{twitter}</span>
                                                    </li> : null}
                                                {!!instagram ?
                                                    <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                                        <h6 className="mb-0">
                                                            <i className="fab fa-instagram"/>
                                                            Instagram
                                                        </h6>
                                                        <span className="text-secondary">{instagram}</span>
                                                    </li> : null}
                                                {!!facebook ?
                                                    <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                                        <h6 className="mb-0">
                                                            <i className="fab fa-facebook-square"/>
                                                            Facebook
                                                        </h6>
                                                        <span className="text-secondary">{facebook}</span>
                                                    </li> : null}
                                            </ul>
                                        </div> : null
                                    }
                                </div>
                                <div className="col-md-8">
                                    <div className="card mb-3">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-sm-3">
                                                    <h6 className="mb-0">User Name</h6>
                                                </div>
                                                <div className="col-sm-9 text-secondary">
                                                    {username}
                                                </div>
                                                <div className="col-sm-3">
                                                    <h6 className="mb-0">First Name</h6>
                                                </div>
                                                <div className="col-sm-9 text-secondary">
                                                    {firstName}
                                                </div>
                                                <div className="col-sm-3">
                                                    <h6 className="mb-0">Last Name</h6>
                                                </div>
                                                <div className="col-sm-9 text-secondary">
                                                    {lastName}
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-sm-3">
                                                    <h6 className="mb-0">Email</h6>
                                                </div>
                                                <div className="col-sm-9 text-secondary">
                                                    {email}
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="row gutters-sm">
                                        <div>
                                            <div className="card h-100">
                                                <div className="card-body">
                                                    <h6 className="d-flex align-items-center mb-3">
                                                        <i className="fas fa-bookmark"/>
                                                        My Posts
                                                    </h6>

                                                    <ul className="list-group">
                                                        {posts.length > 0 ? (posts.map(({
                                                                                            _id,
                                                                                            header,
                                                                                            topic,
                                                                                            createdAt
                                                                                        }) => (
                                                            <li className="list-group-item">
                                                                <div id="list-span">
                                                                    <small>{topic.name}</small>
                                                                    <span id="span_username">{header}</span>
                                                                    <small>Created
                                                                        at {new Date(createdAt).toLocaleDateString('en-US')}</small>
                                                                </div>
                                                                <div className="btn-group" role="group"
                                                                     aria-label="Basic outlined example">
                                                                    <button
                                                                        onClick={() => redirect(`/topic/${topic.name}/${_id}`)}
                                                                        className="btn btn-outline-primary">Show
                                                                    </button>
                                                                </div>
                                                            </li>
                                                        ))) : (
                                                            <li className="list-group-item">
                                                                <div id="list-span">
                                                                    <span id="span_username">No posts</span>
                                                                </div>
                                                            </li>
                                                        )}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Profile;

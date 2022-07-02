import {NavLink, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import useActions from "../helpers/hooks/useActions";
import {useSelector} from "react-redux";
import AddPostModal from "../modal/addPostModal";

const CurrentTopic = () => {
    const {topicName} = useParams();
    const redux = useActions();
    const [showAddPostModal, toggleAddPostModal] = useState(false);
    const {posts} = useSelector(state => state.post);
    useEffect(() => {
        (async () => {
                await fetch(`/topic/${topicName}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                })
                    .then(data => data.json())
                    .then(({_id, name, createBy, createdAt, updatedAt}) => {
                        redux.getCurrentTopic(_id, name, createBy, createdAt, updatedAt);
                        fetch(`/posts/${_id}`, {
                            method: 'GET',
                            headers: {
                                'Authorization': `Bearer ${localStorage.getItem('token')}`
                            }
                        }).then(data => data.json())
                            .then((posts) => {
                                redux.getPosts(posts);
                            })
                    })
            }
        )()
    }, [])
    return (
        <>
            {showAddPostModal ? <AddPostModal closeCallback={() => toggleAddPostModal(false)}/> : null}
            <div className="main_content">
                <div className="info">
                    <h4>Topic: {topicName}</h4>
                    <div style={{marginBottom: '10px'}}>
                        <button type="button" className="btn btn-primary" onClick={() => toggleAddPostModal(true)}>Add Post</button>
                    </div>
                    {!!posts ? (
                        <>
                            {posts.map(({_id, header, description, createBy, createdAt}, index) => (
                                <div className="card mb-3" key={index}>
                                    <div className="card-body">
                                        <h5 className="card-title">{header}</h5>
                                        <p className="card-text">{description}</p>
                                        <p className="card-text">Created by {createBy.username}</p>
                                        <p className="card-text"><small className="text-muted">Created
                                            At {new Date(createdAt).toLocaleDateString('en-US')}</small></p>
                                        <div className="btn-group" role="group" aria-label="Basic outlined example">
                                            <NavLink to={`${topicName}/${_id}`} exact
                                                     className="btn btn-outline-primary">Show</NavLink>
                                        </div>
                                    </div>
                                </div>
                            ))}

                        </>
                    ) : null}
                </div>
            </div>
        </>
    )
}
export default CurrentTopic;

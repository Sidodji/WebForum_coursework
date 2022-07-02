import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import useActions from "../helpers/hooks/useActions";
import {useSelector} from "react-redux";
import EditCommentModal from "../modal/editCommentModal";
import DeleteCommentModal from "../modal/deleteCommentModal";
import EditPostModal from "../modal/editPostModal";
import DeletePostModal from "../modal/deletePostModal";

const CurrentPost = () => {
    const redux = useActions();
    const [showEditCommentModal, toggleEditCommentModal] = useState(false);
    const [showEditPostModal, toggleEditPostModal] = useState(false);
    const [showDeletePostModal, toggleDeletePostModal] = useState(false);
    const {postId} = useParams();
    const {header, createBy, description, createdAt} = useSelector(state => state.post);
    const {id} = useSelector(state => state.user);
    const {comments} = useSelector(state => state.comment);
    const [commentValue, setCommentValue] = useState('');
    const [showDeleteCommentModal, toggleDeleteCommentModal] = useState(false);
    const [imgValue, setImgValue] = useState('');
    const [commentIdValue, setCommentIdValue] = useState('');
    const sendCommentSubmit = async (e) => {
        e.preventDefault();
        await fetch('/comment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                text: commentValue,
                img: imgValue,
                post: postId,
                createBy: id
            })
        })
        window.location.reload();
    }
    useEffect(() => {
        (async () => {
            await fetch(`/post/${postId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then(data => data.json())
                .then(({_id, header, createBy, topic, description, createdAt, updatedAt}) => {
                    redux.getCurrentPost(_id, header, createBy, topic, description, createdAt, updatedAt);
                    fetch(`/comments/${_id}`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
                    })
                        .then(data => data.json())
                        .then(comments => {
                            redux.getComments(comments);
                        })
                })
        })()
    }, [])

    const editCommentClick = (commendId) => {
        setCommentIdValue(commendId);
        toggleEditCommentModal(true);
    }
    const deleteCommentClick = (commendId) => {
        setCommentIdValue(commendId);
        toggleDeleteCommentModal(true);
    }
    return (
        <>
            {showEditPostModal ? (
                <EditPostModal closeCallback={() => toggleEditPostModal(false)} postId={postId}/>) : null}
            {showDeleteCommentModal ? (
                <DeleteCommentModal commentId={commentIdValue} showDeleteCommentModal={showDeleteCommentModal}
                                    closeCallback={() => toggleDeleteCommentModal(false)}/>) : null}
            {showEditCommentModal ?
                (<EditCommentModal closeCallback={() => toggleEditCommentModal(false)}
                                   commentId={commentIdValue}/>) : null}
            {showDeletePostModal ? (
                <DeletePostModal closeCallback={() => toggleDeletePostModal(false)} postId={postId}
                                 showDeletePostModal={showDeletePostModal}/>) : null}
            <div className="main_content">
                <DeleteCommentModal/>
                <div className="info">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">{header}</h5>
                            <h6 className="card-subtitle mb-2 text-muted">Create by <b>{createBy.username}</b></h6>
                            <h6 className="card-subtitle mb-2 text-muted">Create
                                at <b>{new Date(createdAt).toLocaleDateString('en-US')}</b></h6>
                            <p className="card-text">{description}</p>
                            {createBy._id === id ? (<>
                                <button type="button" className="btn btn-success" style={{marginRight: '5px'}}
                                        onClick={() => toggleEditPostModal(true)}>Edit
                                </button>
                                <button type="button" className="btn btn-danger"
                                        onClick={() => toggleDeletePostModal(true)}>Delete
                                </button>
                            </>) : null}
                        </div>
                    </div>
                    <h5>Comments</h5>
                    {!!comments ? (
                        <>{comments.map(({_id, text, createdAt, createBy, img}, index) => (
                            <div className="card mb-3" key={index}>
                                <div className="row g-0">
                                    <div className="col-md-2">
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            flexDirection: 'column',
                                            height: '185px',
                                            width: '80%'
                                        }}>
                                            {!!createBy.img ?
                                                <img src={createBy.img} alt="Admin" className="rounded-circle"
                                                     width="100"/> :
                                                <img src="https://bootdey.com/img/Content/avatar/avatar7.png"
                                                     alt="Admin"
                                                     className="rounded-circle" width="100"/>}
                                            <small>{createBy.username}</small>
                                            {createBy._id === id ? (
                                                <div className="btn-group btn-group-sm" role="group" aria-label="...">
                                                    <button type="button" className="btn btn-success"
                                                            onClick={() => editCommentClick(_id)}>Edit
                                                    </button>
                                                    <button type="button" className="btn btn-danger"
                                                            onClick={() => deleteCommentClick(_id)}>Delete
                                                    </button>
                                                </div>) : null}
                                        </div>
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body">
                                            <p className="card-text">{text}</p>
                                            {!!img ? (<a href={img} target='_blank'>Image</a>) : null}
                                            <p className="card-text"><small className="text-muted">Created
                                                at {new Date(createdAt).toLocaleDateString('en-US')}</small>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}</>
                    ) : null}
                    <form onSubmit={sendCommentSubmit}>
                        <div className="mb-3">
                            <label htmlFor="comment-textArea" className="form-label">Write a comment</label>
                            <textarea className="form-control" id="comment-textArea" rows="3" value={commentValue}
                                      onChange={e => setCommentValue(e.target.value)}/>
                            <div className="mb-3">
                                <label htmlFor="imgInput" className="form-label">Image</label>
                                <input type="text" className="form-control" id="imgInput"
                                       aria-describedby="imgHelp" value={imgValue}
                                       onChange={e => setImgValue(e.target.value)}/>
                                <div id="imgHelp" className="form-text">Enter the image URL.
                                </div>
                            </div>
                        </div>
                        <input type="submit" className='btn btn-primary' value="Send"/>
                    </form>
                </div>
            </div>
        </>
    );
}

export default CurrentPost;

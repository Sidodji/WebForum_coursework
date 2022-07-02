import Modal from "../elements/modal";
import ModalCloseButton from "../elements/modalCloseButton";
import React, {useEffect, useState} from "react";
import '../css/editPost.css';

const EditPostModal = ({closeCallback, postId}) => {
    const [headerValue, setHeaderValue] = useState('');
    const [descriptionValue, setDescriptionValue] = useState('');
    useEffect(() => {
        (async () => {
            await fetch(`/post/${postId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then(data => data.json())
                .then(({header, description}) => {
                    setHeaderValue(header);
                    setDescriptionValue(description);
                })
        })()
    }, [])
    const editPostSubmit = async (e) => {
        e.preventDefault();
        await fetch(`/post/${postId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                header: headerValue,
                description: descriptionValue
            })
        })
            .then(data => data.json())
            .then(({message}) => {
                alert(message);
                closeCallback();
                window.location.reload();
            })
    }
    return (
        <Modal>
            <ModalCloseButton closeCallback={closeCallback}/>
            <div className="edit-post-div">
                <div className="container">
                    <form onSubmit={editPostSubmit}>
                        <div className="row">
                            <div className="col">
                                <div className="mb-3">
                                    <label htmlFor="header-input-input" className="form-label">Header</label>
                                    <input type="text" className="form-control" id="header-input"
                                           value={headerValue} onChange={e => setHeaderValue(e.target.value)}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description-input" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="description-input"
                                           value={descriptionValue}
                                           onChange={e => setDescriptionValue(e.target.value)}/>
                                </div>
                            </div>
                        </div>
                        <input className="btn btn-success" type="submit" value="Edit"/>
                    </form>
                </div>
            </div>
        </Modal>
    )
}

export default EditPostModal;

import Modal from "../elements/modal";
import ModalCloseButton from "../elements/modalCloseButton";
import React, {useState} from "react";
import {useSelector} from "react-redux";
import '../css/addPost.css';

const AddPostModal = ({closeCallback}) => {
    const {id} = useSelector(state => state.user);
    const {_id} = useSelector(state => state.topic)
    const [headerValue, setHeaderValue] = useState('');
    const [descriptionValue, setDescriptionValue] = useState('');
    const addPostModal = async (e) => {
        e.preventDefault();
        await fetch('/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                header: headerValue,
                createBy: id,
                topic: _id,
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
            <div className="add-post-div">
                <div className="container">
                    <form onSubmit={addPostModal}>
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
                        <input className="btn btn-success" type="submit" value="Add Post"/>
                    </form>
                </div>
            </div>
        </Modal>
    )
}

export default AddPostModal;

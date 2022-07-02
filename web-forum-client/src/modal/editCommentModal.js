import React, {useEffect} from "react";
import ModalCloseButton from "../elements/modalCloseButton";
import Modal from "../elements/modal";
import useActions from "../helpers/hooks/useActions";
import '../css/editComment.css';

const {useState} = require("react");
const EditCommentModal = ({commentId, closeCallback}) => {

    const redux = useActions();
    const [textValue, setTextValue] = useState('');
    const [imgValue, setImgValue] = useState('');

    useEffect(() => {
        (async () => {
            await fetch(`/comment/${commentId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then(data => data.json())
                .then(({_id, text, img, post, createBy}) => {
                    redux.getCurrentComment(_id, text, img, post, createBy);
                    setTextValue(text);
                    setImgValue(img);
                })
        })();
    }, [])
    const editCommentSubmit = async (e) => {
        e.preventDefault();
        await fetch(`/comment/${commentId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                text: textValue,
                img: imgValue
            })
        })
            .then(() => {
                alert('Comment updated successfully!');
                closeCallback();
                window.location.reload();
            })
    }
    return (
        <Modal>
            <ModalCloseButton closeCallback={closeCallback}/>
            <div className="edit-comment-div">
                <div className="container">
                    <form onSubmit={editCommentSubmit}>
                        <div className="row">
                            <div className="col">
                                <div className="mb-3">
                                    <label htmlFor="text-input" className="form-label">Text</label>
                                    <input type="text" className="form-control" id="text-input"
                                           value={textValue} onChange={e => setTextValue(e.target.value)}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="img-input" className="form-label">Image URL</label>
                                    <input type="text" className="form-control" id="img-input"
                                           value={imgValue} onChange={e => setImgValue(e.target.value)}/>
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

export default EditCommentModal;

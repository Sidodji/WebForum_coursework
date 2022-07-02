import {Button, Modal} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";

const EditTopicModal = ({closeCallback, showEditTopicModal, topicName}) => {
    const [nameValue, setNameValue] = useState(topicName);
    const [idValue, setIdValue] = useState('');
    const {id} = useSelector(state => state.user);
    useEffect(() => {
        (async () => {
            await fetch(`/topic/${topicName}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then(data => data.json())
                .then(({_id}) => {
                    setIdValue(_id);
                })
        })()
    }, [])
    const editTopicSubmit = async (e) => {
        e.preventDefault();
        await fetch(`/topic/${idValue}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                name: nameValue,
                createBy: id
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
        <>
            <Modal
                show={showEditTopicModal}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header>
                    <Modal.Title>Edit Topic</Modal.Title>
                </Modal.Header>
                <form onSubmit={editTopicSubmit}>
                    <Modal.Body>
                        <label htmlFor="topic-input" className="form-label">Topic Name</label>
                        <input type="text" className="form-control" name="topic" id="topic-input"
                               placeholder="Name" value={nameValue}
                               onChange={(event) => setNameValue(event.target.value)}/>
                    </Modal.Body>
                    <Modal.Footer>
                        <input className="btn btn-success" type="submit" value="Edit Topic"/>
                        <Button variant="secondary" onClick={closeCallback}>
                            Close
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    )
}

export default EditTopicModal;

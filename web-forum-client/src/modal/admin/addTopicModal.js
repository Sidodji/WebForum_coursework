import React, {useState} from "react";
import {Button, Modal} from "react-bootstrap";
import {useSelector} from "react-redux";

const AddTopicModal = ({closeCallback, showAddTopicModal}) => {
    const {id} = useSelector(state => state.user);
    const [nameValue, setNameValue] = useState('');
    const addTopicSubmit = async (e) => {
        e.preventDefault();
        await fetch('/topic', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                name: nameValue,
                userId: id
            })
        })
            .then(data => data.json())
            .then(({message}) => {
                alert(message);
                closeCallback();
                window.location.reload();
            })
            .catch(e => {
                alert(e.message)
            })

    }
    return (
        <>
            <Modal
                show={showAddTopicModal}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header>
                    <Modal.Title>Add Topic</Modal.Title>
                </Modal.Header>
                <form onSubmit={addTopicSubmit}>
                    <Modal.Body>
                        <label htmlFor="topic-input" className="form-label">Topic Name</label>
                        <input type="text" className="form-control" name="topic" id="topic-input"
                               placeholder="Name" value={nameValue}
                               onChange={(event) => setNameValue(event.target.value)}/>
                    </Modal.Body>
                    <Modal.Footer>
                        <input className="btn btn-success" type="submit" value="Add Topic"/>
                        <Button variant="secondary" onClick={closeCallback}>
                            Close
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    )
}

export default AddTopicModal;

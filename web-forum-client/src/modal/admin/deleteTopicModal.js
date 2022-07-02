import {Button, Modal} from "react-bootstrap";

const DeleteTopicModal = ({closeCallback, topicName, showDeleteTopicModal}) => {
    const deleteTopicClick = async (topicName) => {
        await fetch(`/topic/${topicName}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(data => data.json())
            .then(({message}) => {
                alert(message);
                closeCallback();
                window.location.reload();
            })
            .catch(e => {
                alert(e.message);
            })
    }
    return(
        <>
            <Modal
                show={showDeleteTopicModal}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header>
                    <Modal.Title>Delete topic</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Do you really want to delete topic?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeCallback}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => deleteTopicClick(topicName)}>Yeap</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default DeleteTopicModal;

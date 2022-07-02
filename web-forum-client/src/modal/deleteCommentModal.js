import {Button, Modal} from "react-bootstrap";


const DeleteCommentModal = ({commentId ,showDeleteCommentModal, closeCallback}) => {
    const deleteCommentClick = async (commentId) => {
        await fetch(`/comment/${commentId}`, {
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
    }

    return (
        <>
            <Modal
                show={showDeleteCommentModal}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header>
                    <Modal.Title>Delete comment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Do you really want to delete your comment?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeCallback}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => deleteCommentClick(commentId)}>Yeap</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default DeleteCommentModal;

import {Button, Modal} from "react-bootstrap";
import {useHistory} from "react-router-dom";


const DeletePostModal = ({postId ,showDeletePostModal, closeCallback}) => {
    const history = useHistory();
    const redirect = (path) => history.push(path);
    const deletePostClick = async (postId) => {
        await fetch(`/post/${postId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(data => data.json())
            .then(({message}) => {
                alert(message);
                closeCallback();
                redirect('/topic');
            })
    }

    return (
        <>
            <Modal
                show={showDeletePostModal}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header>
                    <Modal.Title>Delete post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Do you really want to delete your post?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeCallback}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => deletePostClick(postId)}>Yeap</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default DeletePostModal;

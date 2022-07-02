import React, {useEffect, useState} from "react";
import Modal from "../../elements/modal";
import ModalCloseButton from "../../elements/modalCloseButton";

const EditUserModal = ({closeCallback, userId}) => {
    const [firstNameValue, setFirstNameValue] = useState('');
    const [lastNameValue, setLastNameValue] = useState('');
    const [imgValue, setImgValue] = useState('');
    const [emailValue, setEmailValue] = useState('');
    const [githubValue, setGithubValue] = useState('');
    const [twitterValue, setTwitterValue] = useState('');
    const [instagramValue, setInstagramValue] = useState('');
    const [facebookValue, setFacebookValue] = useState('');
    useEffect(() => {
        (async () => {
            await fetch(`/user/${userId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then(data => data.json())
                .then(({firstName, lastName, email, github, twitter, instagram, facebook}) => {
                    setFirstNameValue(firstName);
                    setLastNameValue(lastName);
                    setEmailValue(email);
                    setTwitterValue(twitter);
                    setFacebookValue(facebook);
                    setInstagramValue(instagram);
                    setGithubValue(github);
                })
        })()
    }, [])

    const editUserSubmit = async (event) => {
        event.preventDefault();
        await fetch(`/user/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                firstName: firstNameValue,
                lastName: lastNameValue,
                img: imgValue,
                email: emailValue,
                github: githubValue,
                twitter: twitterValue,
                instagram: instagramValue,
                facebook: facebookValue
            })
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

    return (
        <Modal>
            <ModalCloseButton closeCallback={closeCallback}/>
            <div className="edit-user-div">
                <div className="container">
                    <form onSubmit={editUserSubmit}>
                        {!!imgValue ? <img src={imgValue} alt="Admin" className="rounded-circle" width="150"/> :
                            <img src="https://www.bootdey.com/app/webroot/img/default-avatar.png" alt="Admin"
                                 className="rounded-circle" width="150"/>}
                        <div className="mb-3">
                            <label htmlFor="img-input" className="form-label">Image</label>
                            <input type="text" className="form-control" id="img-input"
                                   aria-describedby="imgHelp" value={imgValue}
                                   onChange={e => setImgValue(e.target.value)}/>
                            <div id="imgHelp" className="form-text">Enter the image URL.
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <div className="mb-3">
                                    <label htmlFor="first-name-input" className="form-label">First Name</label>
                                    <input type="text" className="form-control" id="first-name-input"
                                           value={firstNameValue} onChange={e => setFirstNameValue(e.target.value)}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="last-name-input" className="form-label">Last Name</label>
                                    <input type="text" className="form-control" id="last-name-input"
                                           value={lastNameValue} onChange={e => setLastNameValue(e.target.value)}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email-input" className="form-label">E-Mail</label>
                                    <input type="email" className="form-control" id="email-input"
                                           value={emailValue} onChange={e => setEmailValue(e.target.value)}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="github-input" className="form-label">Github</label>
                                    <input type="text" className="form-control" id="github-input"
                                           value={githubValue} onChange={e => setGithubValue(e.target.value)}/>
                                </div>
                            </div>
                            <div className="col order-1">
                                <div className="mb-3">
                                    <label htmlFor="twitter-input" className="form-label">Twitter</label>
                                    <input type="text" className="form-control" id="twitter-input"
                                           value={twitterValue} onChange={e => setTwitterValue(e.target.value)}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="instagram-input" className="form-label">Instagram</label>
                                    <input type="text" className="form-control" id="instagram-input"
                                           value={instagramValue} onChange={e => setInstagramValue(e.target.value)}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="facebook-input" className="form-label">Facebook</label>
                                    <input type="text" className="form-control" id="facebook-input"
                                           value={facebookValue} onChange={e => setFacebookValue(e.target.value)}/>
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

export default EditUserModal;

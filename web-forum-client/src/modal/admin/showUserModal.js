import Modal from "../../elements/modal";
import ModalCloseButton from "../../elements/modalCloseButton";
import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import '../../css/showUser.css'

const ShowUserModal = ({closeCallback, userId}) => {
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

    return (
        <Modal>
            <ModalCloseButton closeCallback={closeCallback}/>
            <div className="show-user-div">
                <div className="container">
                    {!!imgValue ? <img src={imgValue} alt="Admin" className="rounded-circle" width="150"/> :
                        <img src="https://www.bootdey.com/app/webroot/img/default-avatar.png" alt="Admin"
                             className="rounded-circle" width="150"/>}
                </div>
                <div className="row">
                    <div className="col">
                        <div className="mb-3">
                            <label htmlFor="first-name-input" className="form-label"><b>First Name</b></label>
                            <p id="first-name-input">{firstNameValue}</p>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="last-name-input" className="form-label"><b>Last Name</b></label>
                            <p id="last-name-input">{lastNameValue}</p>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email-input" className="form-label"><b>E-Mail</b></label>
                            <p id="email-input">{emailValue}</p>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="github-input" className="form-label"><b>Github</b></label>
                            {githubValue ? (<p id="github-input">{githubValue}</p>) : (
                                <p id="github-input">No value</p>)}
                        </div>
                    </div>
                    <div className="col order-1">
                        <div className="mb-3">
                            <label htmlFor="twitter-input" className="form-label"><b>Twitter</b></label>
                            {twitterValue ? (<p id="twitter-input">{twitterValue}</p>) : (
                                <p id="twitter-input">No value</p>)}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="instagram-input" className="form-label"><b>Instagram</b></label>
                            {instagramValue ? (<p id="instagram-input">{instagramValue}</p>) : (
                                <p id="instagram-input">No value</p>)}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="facebook-input" className="form-label"><b>Facebook</b></label>
                            {facebookValue ? (<p id="facebook-input">{facebookValue}</p>) : (
                                <p id="facebook-input">No value</p>)}
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}
export default ShowUserModal;

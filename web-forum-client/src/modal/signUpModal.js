import React, {useState} from "react";
import Modal from "../elements/modal";
import '../css/signUp.css'
import ModalCloseButton from "../elements/modalCloseButton";

const SignUpModal = ({closeCallback}) => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const checkFields = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert('Passwords are not equal');
            return;
        }
        if (password.length < 6) {
            alert('Password must be at least 6 characters');
            return;
        }
        await fetch('/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: login,
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password
            })
        });
    }
    return (
        <Modal>
            <ModalCloseButton closeCallback={closeCallback}/>
            <form onSubmit={checkFields}>
                <div className="signUp-div">
                    <p className="signUp-paragraph">Sign Up</p>
                    <div className="row">
                        <div className="col">
                            <div className="mb-3">
                                <label htmlFor="firstName-input" className="form-label">First Name</label>
                                <input type="text" className="form-control" id="firstName-input"
                                       value={firstName} onChange={e => setFirstName(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="lastName-input" className="form-label">Last Name</label>
                                <input type="text" className="form-control" id="lastName-input"
                                       value={lastName} onChange={e => setLastName(e.target.value)}
                                />
                                <div className="mb-3">
                                    <label htmlFor="email-input" className="form-label">Email address</label>
                                    <input type="email" className="form-control" id="email-input"
                                           aria-describedby="emailHelp"
                                           value={email} onChange={e => setEmail(e.target.value)}/>
                                    <div id="emailHelp" className="form-text">We'll never share your email with anyone
                                        else.
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="col order-1">
                            <div className="mb-3">
                                <label htmlFor="login-input" className="form-label">Login</label>
                                <input type="text" className="form-control" id="login-input"
                                       value={login} onChange={e => setLogin(e.target.value)}/>
                                <div className="mb-3">
                                    <label htmlFor="password-input" className="form-label">Password</label>
                                    <input type="password" className="form-control" id="password-input"
                                           value={password} onChange={e => setPassword(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="confirmPassword-input" className="form-label">Confirm
                                        Password</label>
                                    <input type="password" className="form-control" id="confirmPassword-input"
                                           value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <input className="btn btn-success" type="submit" value="Sign Up"/>
                </div>
            </form>
        </Modal>
    );
}

export default SignUpModal

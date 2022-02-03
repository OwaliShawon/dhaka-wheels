import firebase from "firebase/app";
import "firebase/auth";
import React, { useContext, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router';
import { LoggedInUserContext } from '../../App';
import firebaseConfig from './firebase.config';
import './Login.css';

const Login = () => {
    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
        name: '',
        email: '',
        isSignIn: false,
    });

    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }
    // else {
    //     firebase.app(); // if already initialized, use that one
    // }

    const [loggedInUser, setLoggedInUser] = useContext(LoggedInUserContext);
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    const handleGoogleSignIn = () => {
        // console.log('ehhhhhe');
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                const { displayName, email } = result.user;
                const signedInUser = {
                    name: displayName,
                    email: email,
                    isSignIn: true,
                };
                setLoggedInUser(signedInUser);
                history.replace(from);
            }).catch((error) => {
                console.log(error);
                console.log(error.message);
            });

    }


    const handleRandomSignIn = () => {
        firebase.auth().signInWithEmailAndPassword(loggedInUser.email, loggedInUser.password)
            .then((userCredential) => {
                // Signed in
                var user = userCredential.user;
                const { displayName, email } = userCredential.user;
                const signedInUser = {
                    name: displayName,
                    email: email,
                    isSignIn: true,

                };
                console.log(signedInUser);
                setLoggedInUser(signedInUser);

                // ...
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
            });
    }


    const handleSingOut = () => {
        firebase.auth()
            .signOut()
            .then((response) => {
                const signOutUser = {
                    isSignIn: false,
                    name: '',
                    email: '',

                }
                setLoggedInUser(signOutUser);

            })
            .catch((error) => {

            });

    }

    const handleChange = (event) => {
        // debugger;
        // console.log(event.target.name, event.target.value);
        let isFieldValid = true;
        if (event.target.name === 'email') {
            isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);
            // console.log(isEmailValid);
        }
        if (event.target.name === 'password') {
            const isPassValid = event.target.value > 6;
            const isPassHasNumber = /\d{1}/.test(event.target.value);
            isFieldValid = isPassValid && isPassHasNumber;
        }
        if (isFieldValid) {
            const newUserInfo = { ...user };
            newUserInfo[event.target.name] = event.target.value;
            setUser(newUserInfo);
        }
    }

    const handleSubmit = (event) => {
        // console.log(user.email, user.password);
        if (!newUser && user.email && user.password) {
            firebase.auth().createUserWithEmailAndPassword(loggedInUser.email, loggedInUser.password)
                .then((userCredential) => {
                    // Signed in 
                    var user = userCredential.user;
                    // setLoggedInUser(user);
                    // console.log(user);
                    // ...
                })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    console.log(errorMessage);
                    console.log(errorCode);
                    // ..
                });
            console.log('submitting');

        }
        if (!newUser && loggedInUser.email && loggedInUser.password) {
            handleRandomSignIn(event);
        }
        event.preventDefault();
    }

    // console.log(loggedInUser);

    return (
        <div>
            <div class="container">
                <div class="screen">
                    <div class="screen__content">
                        <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="" className="m-3"></input>
                        <label htmlFor="newUser" className="">New User Sing Up</label>
                        <form class="login" onSubmit={handleSubmit}>
                            {newUser && <input type="text" class="login__input" name="name" placeholder="Name" required onBlur={handleChange}></input>}
                            <div class="login__field">
                                {/* <i class="login__icon fas fa-user"></i> */}
                                <input type="text " class="login__input" name="email" placeholder="Enter Email Address" required onBlur={handleChange} />
                            </div>
                            <div class="login__field">
                                {/* <i class="login__icon fas fa-lock"></i> */}
                                <input type="password" class="login__input" name="password" placeholder="Enter Password" required onBlur={handleChange} />
                            </div>
                            <input type="submit" class="button__text" value="SUBMIT" />
                        </form>
                        <div class="social-login">
                            {
                                loggedInUser.isSignIn ? <Button onClick={handleSingOut}>Sing Out</Button> :
                                    <Button onClick={handleGoogleSignIn}>Google Sign in</Button>
                            }
                        </div>
                    </div>
                    <div class="screen__background">
                        <span class="screen__background__shape screen__background__shape4"></span>
                        <span class="screen__background__shape screen__background__shape3"></span>
                        <span class="screen__background__shape screen__background__shape2"></span>
                        <span class="screen__background__shape screen__background__shape1"></span>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Login;
import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { LoggedInUserContext } from '../../App';

const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(LoggedInUserContext);
    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }
    // else {
    //     firebase.app(); // if already initialized, use that one
    // }

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
                    isSignIn: true
                };
                setLoggedInUser(signedInUser);
            }).catch((error) => {
                console.log(error);
                console.log(error.message);
            });

    }

    const handleRandomSignIn = (event) => {
        firebase.auth().signInWithEmailAndPassword(loggedInUser.email, loggedInUser.password)
            .then((userCredential) => {
                // Signed in
                var user = userCredential.user;
                const { displayName, email } = userCredential.user;
                const signedInUser = {
                    name: displayName,
                    email: email,
                    isSignIn: true
                };
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
            const newUserInfo = { ...loggedInUser };
            newUserInfo[event.target.name] = event.target.value;
            setLoggedInUser(newUserInfo);
        }
    }

    const handleSubmit = (event) => {
        // console.log(user.email, user.password);
        if (loggedInUser.email && loggedInUser.password) {
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
        event.preventDefault();
    }

    // console.log(loggedInUser);

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Name" required onBlur={handleChange}></input>
                <br />
                <input type="text" name="email" placeholder="enter email" required onBlur={handleChange} />
                <br />
                <input type="password" name="password" placeholder="enter pass" required onBlur={handleChange} />
                <br /> <br />
                <input type="submit" value="SUBMIT" />
            </form>

            {
                loggedInUser.isSignIn ? <Button onClick={handleSingOut}>Sing Out</Button> :
                    <Button onClick={handleGoogleSignIn}>Google Sign in</Button>
            }
            {/* {
                loggedInUser.isSignIn && <div>
                    <p>Welcome! {loggedInUser.name}</p>
                    <p>Your Email: {loggedInUser.email}</p>
                    <img src={loggedInUser.photoURL} alt="" />
                </div>
            } */}


            {/* <Button onClick={handleGoogleSignIn}>Google Sign in</Button> */}
        </div>
    );
};

export default Login;
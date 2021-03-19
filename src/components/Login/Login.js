import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { LoggedInUserContext } from '../../App';

const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(LoggedInUserContext);

    const handleGoogleSignIn = () => {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        } else {
            firebase.app(); // if already initialized, use that one
        }

        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                /** @type {firebase.auth.OAuthCredential} */
                var credential = result.credential;
                var token = credential.accessToken;
                const { displayName, email } = result.user;
                const signedInUser = { name: displayName, email };
                console.log(signedInUser);
                setLoggedInUser(signedInUser);
                console(loggedInUser);

            }).catch((error) => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                // ...
            });
    }

    return (
        <div>
            <Button onClick={handleGoogleSignIn}>Google Sign in</Button>
        </div>
    );
};

export default Login;
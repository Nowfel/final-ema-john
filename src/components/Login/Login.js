import React from 'react';
import Auth from './Use-auth';

const Login = () => {
    const auth = Auth();
    const handleChange = () => {
        auth.signInWithGoogle()
            .then(res => {
                window.location.pathname = '/review';
            })
    }
    const handleSignOut = () => {
        auth.signOut()
            .then(res => {
                window.location.pathname = '/review';
            })
    }
    console.log(auth);

    return (
        <div>
            
            {
                auth.user ? <button onClick={handleSignOut}>sign out</button> :
                    <button onClick={handleChange}>sign in with google</button>

            }
        </div>
    );
};

export default Login;
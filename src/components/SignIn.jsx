import React from 'react'
import { auth, provider } from '../firebase'
import { signInWithPopup } from "firebase/auth";

export default function SignIn() {
    const signInWithGoogle = () => {
        signInWithPopup(auth, provider)
    }

    return (
        <div className='wrapperChat'>
            <header className='headerSignIn'>
                <h1>Global Chat 🌐</h1>
            </header>
            <div className='containerSignIn'>
                <button onClick={signInWithGoogle} className='button signIn'>Sign in with Google</button>
            </div>
        </div>
        )
}

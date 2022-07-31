import React from 'react'
import { auth } from '../firebase'

export default function ChatMessage(props) {
    const {text,uid, photoURL} = props.message

    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received'

  return (
    <div className={`messageContainer ${messageClass}`}>
        <img className='messageAvatar' src={photoURL}/>
        <p className='messageText'>{text}</p>
    </div>
  )
}

import React, { useEffect, useRef, useState } from 'react'
import { collection, query, orderBy, serverTimestamp, addDoc, limitToLast} from "firebase/firestore";
import { auth, db } from '../firebase';
import {useCollection} from 'react-firebase-hooks/firestore'
import ChatMessage from './ChatMessage';

function ChatRoom() {

    const [inputVal, setInputVal] = useState('')


    const bottomChat = useRef()
    const listRef = useRef();
    const scrollDown = useRef();
    
    
    const messagesRef = collection(db, 'messages')
    let q = query(messagesRef, orderBy('createdAt', 'asc'), limitToLast(35))
    
    const [messages] = useCollection(q)
    
    const sendMessage = async(e) => {
      e.preventDefault()
      
      const { uid, photoURL} = auth.currentUser
      
      await addDoc(messagesRef, {
        text: inputVal,
        createdAt: serverTimestamp(),
        uid,
        photoURL
      })
      
      setInputVal('')
      
      bottomChat.current.scrollIntoView({behavior:"smooth"})
    }
    
    const signOut = () => {
      auth.signOut()
    }

    const onScroll = () => {
      if (listRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = listRef.current;
        
        if (scrollTop + clientHeight >= scrollHeight-100 ) {
          scrollDown.current.style.opacity = 0.5;
        }
        else{
          scrollDown.current.style.opacity = 1
        }
      }
    }
    
    useEffect(() => bottomChat.current.scrollIntoView({behavior:"smooth"}), [])
    return (
      <>
    <div className="wrapperChat">
      <header>
          <button ref = {scrollDown} className='button scrollDown' onClick={()=>bottomChat.current.scrollIntoView({behavior: "smooth"})}>⏬</button>
          <button className="button signOut" onClick={signOut}>Sign Out</button>
      </header>
      <main ref={listRef} onScroll={onScroll}>
        {messages && messages.docs.map(msg => <ChatMessage key={msg.id} message={msg.data()}/>)}
        <div ref={bottomChat}></div>
      </main>
    

      <form onSubmit={sendMessage}>
        <input className='inputText' type="text" placeholder='Enter a message' value={inputVal} onChange={(e)=>setInputVal(e.target.value)}/>
        <button className='button input' type="submit" disabled={inputVal === ''}>Send</button>
      </form>
      </div>
    </>
  )
}

export default ChatRoom
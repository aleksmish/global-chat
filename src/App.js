import { auth } from "./firebase.js"
import { useAuthState } from 'react-firebase-hooks/auth';
import SignIn from './components/SignIn'
import Loading from './components/Loading'
import ChatRoom from "./components/ChatRoom.jsx";
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [user, loading] = useAuthState(auth)
  
  if(loading) return <Loading />

  return (
    <div className="App">
      {user ? <ChatRoom/> : <SignIn/>}
    </div>
  );
}

export default App;

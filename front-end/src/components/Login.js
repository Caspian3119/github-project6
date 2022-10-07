import React,{useState, useRef} from 'react'
import Pin from '@mui/icons-material/LocationOn'
import Close from '@mui/icons-material/Close';
import './login.css'
import axios from 'axios'

const Login = ({setShowLogin,localStorage, setCurrentUser}) => {
const [failed, setFailed] = useState(false)
const name = useRef()
const password = useRef()

const handleSubmit = async (e) =>{
    e.preventDefault();
    const User = {
        username: name.current.value,
        password: password.current.value
    }

    try{
        const res = await axios.post('http://localhost:3000/api/users/login', User)
        localStorage.setItem("user", res.data.username)
        setCurrentUser(res.data.username)
        setShowLogin(false)
        setFailed(false)
    }
    catch(err){
        setFailed(err)
    }
}
  return (
    <div className = "logContainer">
    <div className='logo'>
        <Pin/>
        Pin-N-Rate
    </div>
    <form onSubmit={handleSubmit}>
        <input type = "text" placeholder = "username" ref = {name}></input>
        <input type = "password" placeholder = "password" ref = {password}></input>
        <button className="logButton">Login</button>
        {failed && <span className="fail">Something went wrong</span>}   
    </form>
    <Close className = "close" onClick = {() => setShowLogin(false)}/>
</div>
  )
}

export default Login
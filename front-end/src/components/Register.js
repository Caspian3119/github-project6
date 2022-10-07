import React,{useState, useRef} from 'react'
import Pin from '@mui/icons-material/LocationOn'
import Close from '@mui/icons-material/Close';
import './register.css'
import axios from 'axios'

const Register = ({setShowRegister}) => {
const [success, setSuccess] = useState(false)
const [failed, setFailed] = useState(false)
const name = useRef()
const email = useRef()
const password = useRef()

const handleSubmit = async (e) =>{
    e.preventDefault();
    const newUser = {
        username: name.current.value,
        email: email.current.value,
        password: password.current.value
    }

    try{
        axios.post('http://localhost:3000/api/users/register', newUser)
        setSuccess(true)
        setFailed(false)
    }
    catch(err){
        setFailed(err)
    }
}
  return (
    <div className = "regContainer">
    <div className='logo'>
        <Pin/>
        Pin-N-Rate
    </div>
    <form onSubmit={handleSubmit}>
        <input type = "text" placeholder = "username" ref = {name}></input>
        <input type = "email" placeholder = "email" ref = {email}></input>
        <input type = "password" placeholder = "password" ref = {password}></input>
        <button className="regButton">Register</button>
        {success &&  <span className="success">Account Created</span>}
        {failed &&  <span className="fail">Something went wrong</span>}   
    </form>
    <Close className = "close" onClick = {() => setShowRegister(false)}/>
</div>
  )
}

export default Register
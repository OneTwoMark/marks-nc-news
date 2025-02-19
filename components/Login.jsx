import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import '../Styles/Login.css'
import { useContext, useState } from "react";


export const Login = () => {
    const {username, setUsername} = useContext(UserContext)
    const [tempUsername, setTempUsername] = useState("");
    const navigate = useNavigate()

    function handleOnClick(e) {
    e.preventDefault();
    setUsername(tempUsername)
    navigate("/")
    }

    return (
    <div id='login-page'>
        <div id="header-container"> </div>

        <form id='login-container'>
        <input onChange={(e) => {
          setTempUsername(e.target.value);
        }} 
        value={tempUsername}
        id='username-input' 
        type="text" 
        placeholder='Username'/> <br/>
        <button type='submit' onClick={handleOnClick}>Login</button>
        </form>
    </div>
    )
}
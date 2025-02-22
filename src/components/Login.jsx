import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import '../Styles/Login.css'
import { useContext, useEffect, useState } from "react";
import { getUsers } from '../api';


export const Login = () => {
    const {username, setUsername} = useContext(UserContext)
    const [tempUsername, setTempUsername] = useState("");
    const [existingUsers, setExistingUsers] = useState([])
    const navigate = useNavigate()
    
    function handleOnClick(e) {
    e.preventDefault();
    setUsername(tempUsername)
    navigate("/")
    }

    useEffect(() => {
            getUsers().then((users) => {
                setExistingUsers(users)
            })
        }, [])

    return (
    <div id='login-page'>
        <div id="header-container"> </div>

      <form id='dropdown-container'>
        <select onChange={(e) => {
          setTempUsername(e.target.value)
        }}
        value={tempUsername}
        id="login-dropdown">
          <option value="">Select a user</option>
          {existingUsers.map((user) => {
            return <option key={user.username} value={user.username}>{user.username}</option>
          })}
        </select>
        <button id='login-button' type='submit' onClick={handleOnClick}>Login</button>
      </form>
          
      {/* <form id='login-container'>
        <input onChange={(e) => {
          setTempUsername(e.target.value);
        }} 
        value={tempUsername}
        id='username-input' 
        type="text" 
        placeholder='Username'/> <br/>
        <button type='submit' onClick={handleOnClick}>Create User</button>
      </form> */}
    </div>
    )
}
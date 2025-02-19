import { useContext } from "react";
import { Link, Routes, Route } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";


export const Navbar = () => {
    const {username, setUsername} = useContext(UserContext)

    function signOut() {
        setUsername(null)
    }

    return (
    <nav id="Navbar">
    {!username ? (
        <>
        <Link id="home" className="link" to="/">Home</Link>
        {/* <Link className="link" to="/new-user">Register</Link> */}

        <Link id="login" className="link" to="/login">
        <span id="login-text">Login</span>
        </Link>
        </>
    ) : (
        <>
        <Link id="home" className="link" to="/">Home</Link>
        <button id="sign-out" onClick={signOut}>Sign out</button>
        <p id="username">{username}</p>
        </>
    )}
        
    </nav>
    )
}
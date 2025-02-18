import { Link, Routes, Route } from "react-router-dom";

export const Navbar = () => {
    return (
    <nav id="Navbar">
        <Link id="home" className="link" to="/">
                  Home
        </Link>
        <Link className="link" to="/new-user">
                  Register
        </Link>
        <Link id="login" className="link" to="/login">
                  <span id="login-text">Login</span>
        </Link>
    </nav>
    )
}
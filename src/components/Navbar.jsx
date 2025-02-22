import { useContext, useEffect, useState } from "react";
import { Link, Routes, Route } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { getArticleTopics } from "../api";


export const Navbar = () => {
    const {username, setUsername} = useContext(UserContext)
    const [topics, setTopics] = useState([])

    useEffect(() => {
        getArticleTopics().then((data) => {
            setTopics(data.topics)
            console.log(topics)
        })
}, [])

    function signOut() {
        setUsername(null)
    }

    return (
    <nav id="Navbar">
    {!username ? (
        <>
        <Link id="home" className="link" to="/">Home</Link>

        {topics.map((topic) => {
        return <Link key={topic.slug} to={`/articles/${topic.slug}`}>{topic.slug}</Link>
        })}

        <Link id="login" className="link" to="/login">
        <span id="login-text">Login</span>
        </Link>
        </>
    ) : (
        <>
        <Link id="home" className="link" to="/">Home</Link>

        {topics.map((topic) => {
        return <Link key={topic.slug} to={`/articles/${topic.slug}`}>{topic.slug}</Link>
        })}

        <button id="sign-out" onClick={signOut}>Sign out</button>
        <p id="username">{username}</p>
        </>
    )}
    </nav>
    )
}
import { useState } from 'react'
import '../Styles/App.css'
import { Homepage } from '../components/Homepage'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "../components/Header"
import { Article } from '../components/Article';
import { Login } from '../components/Login';
import { UserProvider } from '../contexts/UserContext';




function App() {

  return (
  <UserProvider>
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/article/:article_id" element={<Article />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
    </UserProvider>
  )
}

export default App

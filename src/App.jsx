import { useState } from 'react'
import './App.css'
import { getArticles } from '../api'
import { Homepage } from '../components/Homepage'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "../components/Header"
import { Article } from '../components/Article';
import { Login } from '../components/Login';




function App() {

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/article/:article_id" element={<Article />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/create-user" element={<CreateUser />} /> */}
      </Routes>
    </Router>
  )
}

export default App

import { useEffect, useState } from "react"
import { getArticles } from "../api"
import { Link, Routes, Route } from "react-router-dom";

export const Articles = () => {
    const [articles, setArticles] = useState([])
    useEffect(() => {
        getArticles().then((data) => {
            setArticles(data)
        })
    }, [])
    return (
    <div id="articles">
        {articles.map((article) => {
              return <li className="single_article" key={article.article_id}>
                <div id="list-img-container"><img id="list-img" src={article.article_img_url}/></div> <br/>
                <div id="list-title">{article.title} </div>
                <div id="list-link"> <Link to={`/article/${article.article_id}`}><span id="list-link-text">Read More</span></Link></div>
              </li>
           })
        }
    </div>
    )
}
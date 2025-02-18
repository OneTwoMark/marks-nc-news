import { useEffect, useState } from "react"
import { getArticles } from "../api"

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
                console.log(article, "article")
              return <li class="single_article" key={article.article_id}>
                Title: {article.title} <br/>
                Author: {article.author} <br/>
                <span id="list-img-container"><img id="list-img" src={article.article_img_url}/></span>
              </li>
           })
        }
    </div>
    )
}
import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { getArticles } from "../api"

export const Coding = () => {
const {topic} = useParams()
const [articles, setArticles] = useState([])
useEffect(() => {
    getArticles(topic).then((response)=>{
        console.log(topic, "topic in Coding component")
        console.log(response, "should be coding topic")
        setArticles(response)
    })
}, [topic])
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
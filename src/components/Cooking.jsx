import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { getArticles } from "../api"
import { FaRegComment, FaRegThumbsUp } from "react-icons/fa"

export const Cooking = () => {
const {topic} = useParams()
const [articles, setArticles] = useState([])
const [loading, setLoading] = useState(true)
const [sortBy, setSortBy] = useState("created_at");
const [order, setOrder] = useState("desc");  
useEffect(() => {
    setLoading(true) 
    getArticles({
        topic: topic,
        sort_by: sortBy,
        order: order 
    }).then((response)=>{
        setArticles(response)
        setLoading(false)
    })
}, [topic, sortBy, order])

const handleSortChange = (e) => {
    setSortBy(e.target.value);
};

const handleOrderChange = (e) => {
    setOrder(e.target.value);
};

    return (
    <div id="coding-page">
    <div id="filter-container">
                    <select id="sort-by" onChange={handleSortChange} value={sortBy}>
                        <option value="created_at">Sort by Date</option>
                        <option value="votes">Sort by Votes</option>
                        <option value="title">Sort by Title</option>
                    </select>

                    <select id="order" onChange={handleOrderChange} value={order}>
                        <option value="desc">Descending</option>
                        <option value="asc">Ascending</option>
                    </select>
                </div>
                <div id="articles">
        {loading ? (
            <img id="loading" src="src/assets/loading-7528_256.gif" alt="Loading..." />
        ) : (
        articles.map((article) => (
             <li className="single_article-topic" key={article.article_id}>
            <Link id="list-link" to={`/article/${article.article_id}`}>
                <img id="list-img" src={article.article_img_url}/>
                <div id="list-content">
                    <div id="list-title">{article.title} </div>
                    <div id="list-author">By {article.author}</div>
                    <div id="list-meta">
                        <div id="list-votes"><FaRegThumbsUp />  {article.votes}</div>
                        <div id="list-comments"><FaRegComment />  {article.comment_count} </div>
                    </div>
                </div>
                </Link>
              </li>
            ))
        )}
    </div>
    </div>
    )
}
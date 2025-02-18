import { useEffect, useState } from 'react';
import { getArticlesById } from '../api';
import '../src/Article.css' 
import { useParams } from 'react-router-dom';

export const Article = () => {
    const [article, setArticle] = useState(0)
    const {article_id} = useParams()
    useEffect(() => {
            getArticlesById(article_id).then((data) => {
                setArticle(data)
                console.log(article)
            })
        }, [])
    return (
    <div id="article-page">
    <div id="header-container"></div>
        
    <div id="article-container">
    <span id="list-img-container"><img id="article-img" src={article.article_img_url}/></span>
    <div id='article-title'>{article.title}</div>
    <div id="article-topic">{article.topic}</div>  
    <div id='article-author'>By: {article.author}</div>  
    <div id='article-created-at'>Created: {article.created_at}</div>  
    <div id='article-body'>{article.body}</div>      
    </div>   
    </div>
    )
}
import { useEffect, useState } from 'react';
import { getArticleComments, getArticlesById } from '../api';
import '../src/Article.css' 
import { useParams } from 'react-router-dom';

export const Article = () => {
    const [article, setArticle] = useState(0)
    const [comments, setComments] = useState([])
    const {article_id} = useParams()
    useEffect(() => {
            getArticlesById(article_id).then((data) => {
                setArticle(data)
            })
        }, [])
    useEffect(() => {
            getArticleComments(article_id).then((data) => {
                setComments(data)
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
    <div id='article-created-at'>Created: {Date(article.created_at)}</div>  
    <div id='article-body'>{article.body}</div>      
    </div>
    <div id='comments-container'>
        {comments.map((comment) => {
        return  <li className='single-comment'>
            <div id='comment-author'>{comment.author}</div>
            <hr></hr>
            <div id='comment-body'>{comment.body}</div>
            <span id='downvote'>↓</span>
            <span id='comment-votes'><span id='vote-count'>{comment.votes}</span></span>
            <span id='upvote'>↑</span>
            <div></div>
        </li>
        })}
    </div>
    </div>
    )
}
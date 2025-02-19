import { useContext, useEffect, useState } from 'react';
import { getArticleComments, getArticlesById, patchArticleDownvote, patchArticleUpvote } from '../api';
import '../Styles/Article.css' 
import { useParams } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import { handleError } from '../utils';

export const Article = () => {
    const {username} = useContext(UserContext)
    const [article, setArticle] = useState(0)
    const [votes, setVotes] = useState(0)
    const [comments, setComments] = useState([])
    const [amountVoted, setAmountVoted] = useState (0)
    const {article_id} = useParams()
    useEffect(() => {
            getArticlesById(article_id).then((data) => {
                setArticle(data)
                setVotes(data.votes)
            })
        }, [votes])
    useEffect(() => {
            getArticleComments(article_id).then((data) => {
                setComments(data)
            })
        }, [])

        const handleUpvote = () => {
            if(!username) {
                alert("Please sign in to vote")
             }
            else if (amountVoted > 0){
                alert("You have already voted")
            } else {
                setAmountVoted(amountVoted+1)
                patchArticleUpvote(article.article_id).then((updatedArticle) => {
                    setVotes(updatedArticle.votes); 
                }).catch((error) => {
                    handleError(error)
                });
            }
        };
    
        const handleDownvote = () => {
            if(!username) {
                alert("Please sign in to vote")
             }
             else if (amountVoted < 0){
                alert("You have already voted")
            } else {
                setAmountVoted(amountVoted -1)
                patchArticleDownvote(article.article_id).then((updatedArticle) => {
                    setVotes(updatedArticle.votes); 
                }).catch((error) => {
                    handleError(error)
                });
            }
        };

    return (
    <div id="article-page">
    <div id="header-container"></div>
        
    <div id="article-container">
    <span id="list-img-container"><img id="article-img" src={article.article_img_url}/></span>
    <div id='article-title'><h1>{article.title}</h1></div>
    <div id="article-topic">{article.topic}</div>  
    <div id='article-author'>By: {article.author}</div>  
    <div id='article-created-at'>Created: {Date(article.created_at)}</div>  
    <div id='article-body'>{article.body}</div>  
    <button id='article-upvote' onClick={handleUpvote}>↑</button>
    <span id='article-votes'>{votes}</span>
    <button id='article-downvote' onClick={handleDownvote}>↓</button>    
    </div>
    <div id='comments-container'>
        {comments.map((comment) => {
        return  <li className='single-comment' key={comment.comment_id}>
            <div id='comment-author'>{comment.author}</div>
            <hr></hr>
            <div id='comment-body'>{comment.body}</div>
            <span id='downvote'>↓</span>
            <span id='comment-votes'><span id='vote-count'>{comment.votes}</span></span>
            <span id='upvote'>↑</span>
        </li>
        })}
    </div>
    </div>
    )
}
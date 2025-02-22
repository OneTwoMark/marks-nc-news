import { useContext, useEffect, useState } from 'react';
import { deleteComment, getArticleComments, getArticlesById, patchArticleDownvote, patchArticleUpvote, postComment } from '../api';
import '../Styles/Article.css' 
import { useParams } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import { handleError } from '../../utils';

export const Article = () => {
    const {username} = useContext(UserContext)
    const [article, setArticle] = useState(0)
    const [votes, setVotes] = useState(0)
    const [comments, setComments] = useState([])
    const [amountVoted, setAmountVoted] = useState (0)
    const {article_id} = useParams()
    const [commentBody, setCommentBody] = useState("")
    const [commentPosted, setCommentPosted] = useState(false)

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
        }, [comments])

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

        const handlePostComment = (e) => {
            e.preventDefault()
            if (!username) {
                alert("Please sign in")
                return 
            }
            if (commentBody.trim() === "") {
                alert("Comment cannot be empty")
                return
            }

            postComment(article_id, username, commentBody).then(()=>{
                setCommentBody("")

            getArticleComments(article_id).then((data) => {
                    setComments(data);
                    setCommentPosted(true)
                    setTimeout(() => {
                        setCommentPosted(false)
                    }, 3000)
                });
            })
        }

        function handleDate(dateVar) {
            const formattedDate = new Date(dateVar).toLocaleString('en-US', {
                weekday: 'short', 
                year: 'numeric',  
                month: 'short',  
                day: 'numeric',   
                hour: '2-digit',  
                minute: '2-digit',
                hour12: true      
              });  
            return formattedDate
        }

        function handleDelete(comment_id) {
            deleteComment(comment_id)

            getArticleComments(article_id).then((data) => {
                setComments(data);
            });
        }

    return (
    <div id="article-page">
    {/* <div id="header-container"></div> */}
        
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
            <hr></hr>
            <div id='comment-author'>{comment.author}</div>
            <div id='comment-time'>{handleDate(comment.created_at)}</div>
            
            <div id='comment-body'>{comment.body}</div>
            <span id='downvote'>↓</span>
            <span id='comment-votes'><span id='vote-count'>{comment.votes}</span></span>
            <span id='upvote'>↑</span>
            {username === comment.author ? (<span id='delete-container'><button onClick={() => handleDelete(comment.comment_id)} 
            id='delete-button'>X</button></span>) : ('')}
        </li>
        })}
    </div>

    <form id='create-comment-container'>
    <input onChange={(e) => {
        setCommentBody(e.target.value)
    }}
    value={commentBody}
    id='create-comment' 
    type="text" 
    placeholder='leave a comment' />
    <button id='comment-submit' className={commentPosted ? 'yellow-button' : 'gray-button'}
    type='submit' 
    onClick={handlePostComment}>{commentPosted ? 'posted!' : 'post'}</button>
    </form>
    </div>
    )
}
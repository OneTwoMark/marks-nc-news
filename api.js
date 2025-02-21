import axios from "axios"
import { handleError } from "./utils";

const ncNewsData = axios.create({
    baseURL: "https://marks-be-nc-news.onrender.com/api/",
});

export const getArticles = (topic) => {
    return ncNewsData.get("/articles", { params: { 
        topic: topic
    } }).then((response) => {
        console.log(topic, "in api")
        return response.data.articles
    })
    .catch((error) => {
        handleError(error)
    })
}

export const getArticlesById = (query) => {
    return ncNewsData.get(`/articles/${query}`).then((response) => {
        return response.data.article[0]
    })
}

export const getArticleComments = (query) => {
    return ncNewsData.get(`/articles/${query}/comments`).then((response) => {
        return response.data.comments
    })
}

export const patchArticleUpvote = (query) => {
    return ncNewsData.patch(`/articles/${query}`, {inc_votes: 1})
        .then((response) => {
            return response.data
    })
    .catch((error) => {
        handleError(error)
    })
}

export const patchArticleDownvote = (query) => {
    return ncNewsData.patch(`/articles/${query}`, {inc_votes: -1})
        .then((response) => {
            return response.data
    })
    .catch((error) => {
        handleError(error)
    })
}

export const postComment = (query, username, comment) => {
    return ncNewsData.post(`/articles/${query}/comments`, {username: username, body: comment})
    .then((response) => {
        return response.data
    })
    .catch((error) => {
        handleError(error)
    })
}

export const getUsers = () => {
    return ncNewsData.get(`/users`).then((users)=> {
        return users.data
    })
}

export const deleteComment = (comment_id) => {
    return ncNewsData.delete(`comments/${comment_id}`).then((response)=>{
        response.data
    })
}

export const getArticleTopics = () =>{
    return ncNewsData.get(`topics`).then((topics) => {
        return topics.data
    })
}
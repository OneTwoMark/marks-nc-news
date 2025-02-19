import axios from "axios"
import { handleError } from "./utils";

const ncNewsData = axios.create({
    baseURL: "https://marks-be-nc-news.onrender.com/api/",
});

export const getArticles = () => {
    return ncNewsData.get("/articles").then((response) => {
        return response.data.articles
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

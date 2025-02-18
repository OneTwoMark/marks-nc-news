import axios from "axios"

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
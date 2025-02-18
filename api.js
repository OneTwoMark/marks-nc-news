import axios from "axios"

const ncNewsData = axios.create({
    baseURL: "https://marks-be-nc-news.onrender.com/api/",
});

export const getArticles = () => {
    return ncNewsData.get("/articles").then((response) => {
        // console.log("getArticles log", response.data.articles)
        return response.data.articles
    })
}
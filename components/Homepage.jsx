import { Articles } from "./Articles"
import { Header } from "./Header"


export const Homepage = () => {
return (
<div id="homepage">
    <div id="header-container">
        <Header />
    </div>
    <div id="article-container">
        <Articles />
    </div>
</div>
)
}
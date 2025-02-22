import { useParams } from "react-router-dom";
import { Coding } from "./Coding";
import { Football } from "./Football";
import { Cooking } from "./Cooking";

// import Cooking from "./Cooking";

export const Topic = () => {
    const { topic } = useParams(); 

    if (topic === "coding") {
        return <Coding 
        topic={topic}
        />;
    } else if (topic === "football") {
        return <Football 
        topic={topic}
        />;
    } else if (topic === "cooking") {
        return <Cooking 
        topic={topic}
        />;
    } 


    return <div>Topic not found</div>;
};
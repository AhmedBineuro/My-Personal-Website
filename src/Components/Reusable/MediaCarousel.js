import MediaContainer from "./MediaContainer"
import { Tag } from "./Tag"
import { useState } from "react";
export default function MediaCarousel({Projects,Tags}){
    const [index,setIndex] = useState((Projects.length()/2)-1);
    let start=((index-1)<0)?(0):(index-1);
    let end;
    if(index ===0)
        end=1;
    else
        end=index+1;
    const displayProjects=Projects.subarray(start,end);
    
    return (<>
    </>)
}
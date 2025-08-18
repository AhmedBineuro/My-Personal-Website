import MediaContainer from "./MediaContainer.js"
import './MediaCarousel.css'
import { Tag } from "./Tag"
import { useState } from "react";
export default function MediaCarousel({Projects,Tags}){
    // const [index,setIndex] = useState((Projects.length()/2)-1);
    // let start=((index-1)<0)?(0):(index-1);
    // let end;
    // if(index ===0)
    //     end=1;
    // else
    //     end=index+1;
    // const displayProjects=Projects.subarray(start,end);
    var projectList=[];
    if(Projects!==undefined)
                projectList=Projects.map((project,index)=><MediaContainer key={index} Tags={project.Tags.map(tag=>(Tags[tag]!==undefined)?Tags[tag].Name:[])} Name={project.Name} URL={project.URL} Thumbnail={project.Thumbnail} />);
    return (<>
    <div className="MediaCarousel">
    <button className="CarouselButton Left">{'<'}</button>
         {(projectList.length!==0)?projectList:<em className="Error">The relevant projects have not been added yet!</em>}
    <button className="CarouselButton Right">{'>'}</button>
    </div>
    </>)
}
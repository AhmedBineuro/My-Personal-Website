import MediaContainer from "./MediaContainer.js"
import './MediaCarousel.css'
import { useState} from "react";
export default function MediaCarousel({Projects,Tags,clickFunc,scrollFunc}){
    const [index,setIndex]=useState(0);
    const [ignore,setIgnore]=useState(false);
    var projectList=[];
    
    const updateIndex= ()=>{
        if(ignore) {
            setIgnore(false);
            return;
        };
        let projectDisplay=document.getElementById("ProjectDisplay");
        if(!projectDisplay)
            return; 
        let width=projectDisplay.scrollWidth;
        if(projectList.length===0)
            return;
        let increment=(width/projectList.length);
        let manualScrolled=parseInt((projectDisplay.scrollLeft));
        let newIndex=parseInt(manualScrolled/increment);
        let dist=increment*newIndex;
        setIndex(newIndex);
        setIgnore(true);
        projectDisplay.scrollTo({left:dist, behavior:"smooth"});
    }
    
    
    if(Projects!==undefined&&Tags!==undefined)
        {
            //Add the button onclick methods
            var projects=Projects.map((project)=>{
                return{
                    ...project,
                    clickFunc:(!clickFunc)?((event,index)=>{
                        console.log(project.Name);
                        return;
                    }):clickFunc 
                }
            });
            projectList=projects.map((project,index)=>(
            <MediaContainer
            key={index} 
            Tags={project.Tags.map(tag=>(Tags[tag]!==undefined)?Tags[tag].Name:[])} 
            Name={project.Name}
            clickFunc={(e)=>project.clickFunc(e,index)} 
            URL={project.URL} 
            Thumbnail={project.Thumbnail} />));
        }
        
        //direciton is a value either -1 for left or 1 for right which will set the increment
        // This function also has a case to recover from manual scrolling
        const scrollProject=(event)=>{
        let projectDisplay=document.getElementById("ProjectDisplay");
        let classList=event.target.classList;
        let direction=0;
        classList.forEach((className)=>{
            if(className==="Left")
                direction=-1;
            if(className==="Right")
                direction=1;
        })
        if(!projectDisplay)
            return;                
        let width=projectDisplay.scrollWidth;
        //If there is nothing to show return
        if(projectList.length===0)
            return;
        //Determine the stride/increment to scroll by to move to and back from each project 
        let increment=(width/projectList.length);
        let manualScrolled=parseInt((projectDisplay.scrollLeft));
        let compDist=parseInt(index*increment);
        // Check if the manual scrolling distance from the current index has changed drastically
        // then update the index accordingly before incrementing or decrementing
        let newIndex= (Math.abs(compDist-manualScrolled)>parseInt(increment))?parseInt(manualScrolled/increment)+direction:index+direction;
        if(newIndex>=projectList.length)
            newIndex=0;
        else if(newIndex<0)
            newIndex=projectList.length-1;
        setIndex(newIndex);
        let dist=increment*newIndex;
        setIgnore(true);
        projectDisplay.scrollTo({left:dist, behavior:"smooth"});
    };
    if(!scrollFunc)
        scrollFunc=(index)=>(console.log("scrolling ",index));
    const onscroll=()=>{
        updateIndex();
        scrollFunc(index);
    }
    return (<>
    <div className="MediaCarouselWrapper">
        <div className="MediaCarousel">
            <button className="CarouselButton Left" onClick={scrollProject}>{'<'}</button>
                <div id="ProjectDisplay" className="ProjectListWrapper" onTouchEnd={onscroll} onScrollEnd={onscroll}>
                    {(projectList.length!==0)?projectList:<em className="Error">The relevant projects have not been added yet!</em>}
                </div>
            <button className="CarouselButton Right" onClick={scrollProject}>{'>'}</button>
        </div>
    </div>
    </>)
}
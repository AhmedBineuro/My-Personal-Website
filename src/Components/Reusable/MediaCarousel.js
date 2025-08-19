import MediaContainer from "./MediaContainer.js"
import './MediaCarousel.css'
export default function MediaCarousel({Projects,Tags}){
    var index=0;
    var projectList=[];
    if(Projects!==undefined&&Tags!==undefined)
                projectList=Projects.map((project,index)=><MediaContainer key={index} Tags={project.Tags.map(tag=>(Tags[tag]!==undefined)?Tags[tag].Name:[])} Name={project.Name} URL={project.URL} Thumbnail={project.Thumbnail} />);
    
    //direciton is a value either -1 for left or 1 for right which will set the increment
    const scrollProject=(event)=>{
        let classList=event.target.classList;
        let direction=0
        classList.forEach((className)=>{
            if(className==="Left")
                direction=-1;
            if(className==="Right")
                direction=1;
        })
        let projectDisplay=document.getElementById("ProjectDisplay");
        if(!projectDisplay)
            return;                
        let width=projectDisplay.scrollWidth;
        if(projectList.length===0)
            return
        let increment=(width/projectList.length);
        let manualScrolled=parseInt((projectDisplay.scrollLeft));
        let compDist=parseInt(index*increment);
        let newIndex= (Math.abs(compDist-manualScrolled)>increment)?parseInt(manualScrolled/increment)+direction:index+direction;
        if(newIndex>=projectList.length)
            newIndex=0;
        else if(newIndex<0)
            newIndex=projectList.length-1;
        let dist=increment*newIndex;
        index=newIndex;
        
        projectDisplay.scrollLeft=dist;
    };
    return (<>
    <div className="MediaCarouselWrapper">
        <div className="MediaCarousel">
            <button className="CarouselButton Left" onClick={scrollProject}>{'<'}</button>
                <div id="ProjectDisplay" className="ProjectListWrapper">
                    {(projectList.length!==0)?projectList:<em className="Error">The relevant projects have not been added yet!</em>}
                </div>
            <button className="CarouselButton Right" onClick={scrollProject}>{'>'}</button>
        </div>
    </div>
    </>)
}
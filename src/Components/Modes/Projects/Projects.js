import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getFirestore,collection,query,getDocs,} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
import MediaContainer from "../../Reusable/MediaContainer.js";
import "./Projects.css"
import { useEffect, useState } from "react";
/**
 * Should have the following features
 *  - Should display a set of projects from a database
 *  - Should be able to both search and filter through them
 *  - Each project should show
 *      - Name
 *      - Image
 *      - Tags (An array of one word descriptors)
 */
// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
    apiKey: "AIzaSyAzSjCbYwpY-N55FzhEOF6qqw_CuEdiZl0",
    authDomain: "dynamicbineurowebsite.firebaseapp.com",
    databaseURL: "https://dynamicbineurowebsite-default-rtdb.firebaseio.com",
    projectId: "dynamicbineurowebsite",
    storageBucket: "dynamicbineurowebsite.firebasestorage.app",
    messagingSenderId: "788647486588",
    appId: "1:788647486588:web:af786d31486d70b5f095f9",
    measurementId: "G-QHYPD6QQGT"
  };
    
const app=initializeApp(firebaseConfig);
const db=getFirestore(app);
/**
 * //How to read a doc
        //Get a reference for the query
        const docRef=doc(db,"Projects","0");
        //Use the reference to request the data
        const docSnap= await getDoc(docRef);
        if(docSnap.exists()){
            console.log(docSnap.data());
        }
        else{
            console.log("Not successful");
        }
*/

//How to read a collection
var projects=[];
var tags={};
var fetching=false;
// return( 
// {
//     Projects:projects,
//     Tags:tags
// });
//Will find the substring in the fullstring with the least amount of characters (minimum length= substring.length)
export function matchScore(match, whole) {
    let words = match.toLowerCase().split(' ');
    let possibleSubstrings = [];
  for (let j = 0; j < words.length; j++) {
        let cumulativeSubstring = words[j];
        if (cumulativeSubstring !== "") {
            possibleSubstrings.push(cumulativeSubstring);
            for (let i = j+1; i < words.length; i++) {
                if(i===j || words[i]==="")continue;
                cumulativeSubstring += " " + words[i];
                possibleSubstrings.push(cumulativeSubstring);
            }
        }
    }
    possibleSubstrings.sort((a, b) => b.length-a.length);
    let score = 0;
    let smallCaseWhole=whole.toLowerCase();
    for(let i=0;i<possibleSubstrings.length;i++){
        if (smallCaseWhole.includes(possibleSubstrings[i])) {
            score += smallCaseWhole.length*(possibleSubstrings[i].length/smallCaseWhole.length);
        }
    }
    return score;
}

export function Projects(){
    const [p,setProjects]=useState((projects!==undefined)?projects:[]);
    const [t,setTags]=useState((tags!==undefined)?tags:{});

    const FilterProjects=()=>{
        let filtered=projects;
        if(document.getElementById("SearchBar")!==undefined&&document.getElementById("SearchBar")!==null){
                let searchText=document.getElementById("SearchBar").value;
                if(searchText.trim()!==""){
                    let projectScorePair=[];
                    filtered.forEach((project)=>{
                        let searchScore=matchScore(searchText.trim(),project.Name);
                        let tagScore=0;
                        for(let i=0;i<project.Tags.length;i++){
                            tagScore+=matchScore(searchText.trim(),tags[project.Tags[i]]);
                        }
                        projectScorePair.push({project:project,score:(tagScore+searchScore)});
                    });
                    projectScorePair.sort((a,b)=>(b.score-a.score));
                    projectScorePair=projectScorePair.filter(pair=>(pair.score>0));
                    filtered=[];
                    projectScorePair.forEach((pair)=>filtered.push(pair.project));
                    
                    //Rearrange later to prevent computing the score twice
            }
            setProjects(filtered);
            return true;
            };
        return false;
    };
    const FetchProjects= async ()=>{
        if(fetching) return {p,t};
        fetching=true;
        projects=[];
            tags={};
            const q=query(collection(db,"Tags"));
            const qSnapshot=await getDocs(q);
            qSnapshot.forEach((doc)=>{
                tags[doc.id]=doc.data().Name;
            });
            const q2=query(collection(db,"Projects"));
            const q2Snapshot=await getDocs(q2);
            q2Snapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                projects.push({
                    id: doc.id,
                    Name: doc.data().Name,
                    Tags:doc.data().Tags,
                    Thumbnail:doc.data().Thumbnail,
                    URL:doc.data().URL,
                    DURL:doc.data().DURL
                });
            });
            if(!FilterProjects())
                setProjects(projects);
            setTags(tags);
            return {p, tags };
            };
            useEffect(()=>{
                FetchProjects().then(()=>{
                    fetching=false;
                });
            },[]);
            
            
            const projectList=p.map((project,index)=><MediaContainer key={index} Tags={project.Tags.map(tag=>(t[tag]!==undefined)?t[tag]:[])} Name={project.Name} URL={project.URL} Thumbnail={project.Thumbnail} />);
            return (
                <>
        <div className="PageHeader">
            <h1 className="PageTitle">Projects</h1>
            <div className="ProjectFilter">
                <input id="SearchBar" placeholder="Search" onChange={FilterProjects} onKeyUp={(e)=>{if(e.key==="Enter")FilterProjects()}} className="SearchBar" type="text"></input>
                <button className="RefreshButton" onClick={FetchProjects}>Refresh</button>
            </div>
        </div>
        <div className="ProjectList">
            {(p.length!==0)?(projectList):<h2 className="TempHeader">Whoops nothing to see here!</h2>}
        </div>
        </>
    );
};
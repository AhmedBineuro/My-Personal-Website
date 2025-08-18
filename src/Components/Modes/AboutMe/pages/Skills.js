import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getFirestore,collection,query,where,getDocs,} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
import { useEffect, useState } from "react";
import {Tag} from "../../../Reusable/Tag.js"
import styles from '../../../Reusable/MediaContainer.js'
import  "./Skills.css"
import MediaCarousel from "../../../Reusable/MediaCarousel.js";

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
var skills = [];
var projects=[];
var tags={};
var fetching=false;

function interpolate(color1, color2, t){
    return[
        Math.round(color1[0]*(1-t)+color2[0]*t),
        Math.round(color1[1]*(1-t)+color2[1]*t),
        Math.round(color1[2]*(1-t)+color2[2]*t)
    ];
}

function getColors( startingColor,endingColor){
    //Fetch tag colors from CSS files and parse it
    let root=getComputedStyle(document.documentElement);
    let tagStart=root.getPropertyValue("--tagStart-color");
    let tagEnd=root.getPropertyValue("--tagEnd-color");
    const matchedStart=tagStart.match(/hsl\(\s*[0-9]{1,3}\s*,\s*[0-9]{1,3}\s*,\s*[0-9]{1,3}\s*\)/g);
    const matchedEnd=tagEnd.match(/hsl\(\s*[0-9]{1,3}\s*,\s*[0-9]{1,3}\s*,\s*[0-9]{1,3}\s*\)/g);
    const parsedStart=[];
    const parsedEnd=[];
    matchedStart.forEach((m)=>{parsedStart.push(m.match(/[0-9]{1,3}/g))});
    matchedEnd.forEach((m)=>{parsedEnd.push(m.match(/[0-9]{1,3}/g))});
    const isLightMode = window.matchMedia('(prefers-color-scheme: light)').matches;
    var start=[];
    var end=[];
    if(isLightMode)
    {
        parsedStart[0].forEach((p)=>{start.push(parseInt(p))});
        parsedEnd[0].forEach((p)=>{end.push(parseInt(p))});
    }
    else
    {
        parsedStart[1].forEach((p)=>{start.push(parseInt(p))});
        parsedEnd[1].forEach((p)=>{end.push(parseInt(p))});
    }
    return [start,end];
}


export default function Skills(){
    const [s,setSkills]=useState(((skills!==undefined)?skills:[]));
    const [p,setProjects]=useState(((projects!==undefined)?projects:[]));
    let startingColor=[];
    let endingColor=[];
    [startingColor,endingColor]=getColors();
    const FetchSkills= async ()=>{
            skills=[];
            const q=query(collection(db,"Tags"));
            const qSnapshot=await getDocs(q);
            qSnapshot.forEach((doc)=>{
                skills.push({
                    ID: doc.id,
                    Name: doc.data().Name,
                    IsSkill:doc.data().IsSkill
                });
                tags[doc.id]={
                    Name: doc.data().Name,
                    IsSkill:doc.data().IsSkill
                };
            });
            setSkills(skills);
            return skills;
    };
    const FetchProjects= async (id)=>{
            projects=[];
            var q;
        if(id===undefined)
            q=query(collection(db,"Projects"));
        else
            q=query(collection(db,"Projects"),where("Tags","array-contains",id));
            const qSnapshot=await getDocs(q);
            qSnapshot.forEach((doc) => {
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
            setProjects(projects);
            // console.log(projects);
            fetching=false;
            return projects;
    };
    useEffect(()=>{
            FetchSkills();
            FetchProjects();
        },[]);
        var ClickFunctions=[];
        skills.forEach((skill)=>{
            ClickFunctions.push(()=>{
                if(!fetching)
                {
                    fetching=true;
                    FetchProjects(skill.ID);
                }
            });
        });
        
        var colors=[];
        for(let i=0;i<=skills.length;i++){
            let t=i/skills.length;
            colors.push(interpolate(startingColor,endingColor,t));
        }
        
        var skillList=[];
            if(s!==undefined)
                skillList=s.map((skill,index)=>(
                ((colors.length>0)&&skill.IsSkill)?(<Tag Style={{backgroundColor:("hsl("+colors[index][0]+", "+colors[index][1]+"%, "+colors[index][2]+"%)")}} 
                key={index} 
                className={styles.Tag} 
                Text={skill.Name} 
                Clickable={true} 
                ClickFunction={ClickFunctions[index]}/>):<></>
            ));

        var projectList=[];
    return(
        <div className="SkillsPageWrapper">
        <em>Select a skill to see relevant projects</em>
        <div className="SkillFeed">
            <div className="SkillList">
                {
                    (skillList.length!==0)?skillList:<h2 className="TempHeader">Whoops nothing to see here!</h2>
                }
            </div>
            <div className="ProjectsList">
                <MediaCarousel Projects={p} Tags={s}/>
            </div>
        </div>
        </div>
    );
}
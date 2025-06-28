import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getFirestore,collection,query,getDocs,} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
import { useEffect, useState } from "react";
import {Tag} from "../../../Reusable/Tag.js"
import styles from '../../../Reusable/MediaContainer.js'
import  "./Skills.css"

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
function interpolate(color1, color2, t){
    return[
        Math.round(color1[0]*(1-t)+color2[0]*t),
        Math.round(color1[1]*(1-t)+color2[1]*t),
        Math.round(color1[2]*(1-t)+color2[2]*t)
    ];
}


export default function Skills(){
    const [s,setSkills]=useState(((skills!==undefined)?skills:[]));
        //Fetch tag colors
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
    let startingColor=[];
    let endingColor=[];
    if(isLightMode)
    {
        parsedStart[0].forEach((p)=>{startingColor.push(parseInt(p))});
        parsedEnd[0].forEach((p)=>{endingColor.push(parseInt(p))});
    }
    else
    {
        parsedStart[1].forEach((p)=>{startingColor.push(parseInt(p))});
        parsedEnd[1].forEach((p)=>{endingColor.push(parseInt(p))});
    }
    //End of tag color fetch
    const FetchSkills= async ()=>{
            skills=[];
            const q=query(collection(db,"Tags"));
            const qSnapshot=await getDocs(q);
            qSnapshot.forEach((doc)=>{
                if(doc.data().IsSkill)
                    skills.push(doc.data().Name);
            });
            setSkills(skills);
            console.log("Got skills");
            return skills;
    };
    useEffect(()=>{
            FetchSkills();
        },[]);
        let colors=[];
        for(let i=1;i<=skills.length;i++){
            let t=i/skills.length;
            colors.push(interpolate(startingColor,endingColor,t));
        }
        let skillList=[];
            if(s!==undefined)
                skillList=s.map((skill,index)=>(
                <Tag Style={{backgroundColor:("hsl("+colors[index][0]+", "+colors[index][1]+"%, "+colors[index][2]+"%)")}} key={index} className={styles.Tag} Text={skill}/>
            ));
    return(
        <>
        <div className="SkillList">
            {
                (skillList.length!==0)?skillList:<h2 className="TempHeader">Whoops nothing to see here!</h2>
            }
        </div>
        </>
    );
}
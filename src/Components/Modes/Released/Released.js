import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getFirestore,collection,query,getDocs} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

import  "./Released.css";
import MediaContainer from "../../Reusable/MediaContainer.js";
import { useEffect, useState } from "react";

/**
 * Should have the following features
 *  - Should display a set of released software from a database
 *  - Should be able to both search and filter through them
 *  - Each project should show
 *      - Name
 *      - Image
 *      - Tags (An array of one word descriptors)
 *      - download button (If web then play button if not then download button)
 */
//How to read a collection
var projects=[];
var tags={};
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

export function Released(){
    const [p,setProjects]=useState((projects===undefined)?projects:[]);
    const [t,setTags]=useState((projects===undefined)?projects:{});
    
    const getProjects= async ()=>{
        projects=[];
        tags={};
        const q=query(collection(db,"Projects"));
        const qSnapshot=await getDocs(q);
        qSnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            if(doc.data().DURL!=="DNA")
            {
                projects.push({
                id: doc.id,
                Name: doc.data().Name,
                Tags:doc.data().Tags,
                Thumbnail:doc.data().Thumbnail,
                URL:doc.data().URL,
                DURL: doc.data().DURL
                });
            }
        });
        const q2=query(collection(db,"Tags"));
        const q2Snapshot=await getDocs(q2);
        q2Snapshot.forEach((doc)=>{
            tags[doc.id]=doc.data().Name;
        });
        return { projects, tags };
    };
    useEffect(()=>{
        getProjects().then(({ projects, tags })=>{
            setProjects(projects);
            setTags(tags);
        });
    },[]);
    const projectList=p.map((project,index)=><MediaContainer key={index} Tags={project.Tags.map(tag=>(t[tag]!==undefined)?t[tag]:[])} Name={project.Name} URL={project.URL} DURL={(project.DURL==="DNA"?undefined:project.DURL)} Thumbnail={project.Thumbnail} />);
    return <><h1 className="PageTitle">Releases</h1>
        <div className="ReleasedList">
            {(projectList.length>0)?projectList:<h1 className="TempHeader">Releases coming soon!</h1>}
        </div>
    </>;
}
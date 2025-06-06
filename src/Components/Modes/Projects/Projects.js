import { RadioButtonList } from "../../Reusable/GlowingGUI.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getFirestore,collection,query,getDoc,getDocs, doc,DocumentReference ,where} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

import MiniNav from "../AboutMe/MiniNav.js";
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

async function getProjects() {
    //How to read a collection
    var projects=[];
    var tags={};
    const q=query(collection(db,"Projects"));
    const qSnapshot=await getDocs(q);
    qSnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        let Tags= [];
        doc.data().Tags.forEach((tag,key)=>{Tags.push(key)});
        projects.push({
            id: doc.id,
            Name: doc.data().Name,
            Tags:Tags
        });
    });
    const q2=query(collection(db,"Tags"));
    const q2Snapshot=await getDocs(q2);
    q2Snapshot.forEach((doc)=>{
        tags[doc.id]=doc.data().Name;
    });
    return( 
    {
        Projects:projects,
        Tags:tags
    });
}

export function Projects(){
    //Use useEffect to handle async operations
    return <><h1>Projects</h1></>;
}
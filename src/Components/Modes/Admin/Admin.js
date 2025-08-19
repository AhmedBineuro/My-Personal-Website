import { initializeApp} from "firebase/app";
import { getAuth } from "firebase/auth";
import { useState } from "react";
import LoginButton from "./LoginButton";
import './Admin.css';

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
const auth=getAuth(app);
var currentError=""
var showError=false,logged=false;
export default function Admin(){
    var [editor,setEditor]=useState(false);
    var [error,setError]=useState(showError);
    logged=(auth.currentUser!==null)
    var [success,setSucess]=useState(logged);
    const errorCallback=(error)=>{
        setSucess(false);
        showError=true;
        setError(showError);
        currentError=error.toString();
    }
    const successCallback=()=>{
        showError=false;
        setSucess(true);
        setError(showError);
        setEditor(true);
    }
    const signOutCallback=()=>{
        showError=false;
        currentError="";
        setError(showError);
        setSucess(false);
        setEditor(false);
    }
    return(
        <>
            <LoginButton successCallback={successCallback} SignOutCallback={signOutCallback} errorCallback={errorCallback}/>
            {
                (error)?(<h1 className="Error">
                    {currentError}
                </h1>):(<></>)
            }
            {
                (success)?(<div className="GreetingContainer">
                <h1 className="Greeting">Hello</h1>
                <h1 className="GreetingName"> {(auth.currentUser===null)?"None":auth.currentUser.displayName}</h1>
                </div>):(<></>)
            }
            {
                (editor)?(<></>):(<></>)
            }
        </>
    );
}
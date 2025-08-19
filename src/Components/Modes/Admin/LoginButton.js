import {signInWithPopup, deleteUser} from "firebase/auth";
import { getFirestore,collection,query,getDocs,} from "firebase/firestore";
import { initializeApp} from "firebase/app";
import { getAuth, GoogleAuthProvider} from "firebase/auth";
import { useState ,useEffect} from "react";
import './LoginButton.css';
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
const auth=getAuth(app);
const googleAuth=new GoogleAuthProvider();
export default function LoginButton({SignOutCallback,successCallback,errorCallback}){
    var whitelist=[];
    var showSignIn=(!auth.currentUser&&(whitelist.length>0)),
    showSignOut=(auth.currentUser!==null);
    var [signIn,setSignIn]=useState(showSignIn);
    var [signOut,setSignOut]=useState(showSignOut);
    const getWhiteList= async ()=>{
        const queryResult=query(collection(db,'Admins'));
        
        const querySnapshot=await getDocs(queryResult);
        querySnapshot.forEach((doc)=> {
            whitelist.push(doc.data().Email);
        });
    }
    //Get the whitelist
    useEffect(()=>{
     getWhiteList().then(()=>{
        // eslint-disable-next-line
        showSignIn=(!auth.currentUser);
        // eslint-disable-next-line
        showSignOut=(auth.currentUser!==null);
        setSignIn(showSignIn);
        setSignOut(showSignOut);
    });
    },[whitelist]);
    return(
                <>
            {
                (signIn)?(<button className="SignIn" onClick={()=>{
                signInWithPopup(auth,googleAuth)
                .then((result)=>{
                    const user=result.user;
                    const email=user.email;
                    if(whitelist.find((em)=>em===email))
                        {
                            showSignIn=false;
                            showSignOut=true;
                            setSignIn(showSignIn);
                            setSignOut(showSignOut);
                            if(successCallback)
                                successCallback();
                        }
                    else
                    {
                        console.log("Bad email:",email);
                        console.log(whitelist);
                        const badUser=auth.currentUser;
                        deleteUser(badUser).then(()=>{
                            errorCallback("Account and information deleted, you are not an admin");
                        }).catch((error)=>{
                            if(errorCallback)
                                errorCallback("Error deleting the user\n"+error.toString());
                        });
                    }
                })
                .catch((error)=>{
                        if(errorCallback)
                            errorCallback("Error Signing In\n"+error.toString());
                    });
                }}>
                    Sign In
                </button>):(<></>)
            }
            {
                (signOut)?(<button className="SignOut" onClick={()=>{
                    auth.signOut().then(()=>{
                        showSignOut=false;
                        showSignIn=true;
                        setSignIn(showSignIn);
                        setSignOut(showSignOut);
                        if(SignOutCallback)
                            SignOutCallback();
                    }).catch((error)=>{
                        if(errorCallback)
                            errorCallback("Error signing out\n"+error.toString());
                    })
                }}>
                    Log out
                </button>):(<></>)
            }
        </>
    )
}
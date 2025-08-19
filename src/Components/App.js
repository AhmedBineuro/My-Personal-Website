import './App.css';
import {LinkedRadioButtonList}  from './Reusable/GlowingGUI.js';
import {AboutMe} from './Modes/AboutMe/AboutMe.js';
import {Projects} from './Modes/Projects/Projects.js';
import {Released} from './Modes/Released/Released.js';
import Bio from "./Modes/AboutMe/pages/Bio.js"
import Skills from "./Modes/AboutMe/pages/Skills.js"
import ContactMe from "./Modes/AboutMe/pages/ContactMe.js"
import Admin from './Modes/Admin/Admin.js';
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import { useState,useEffect } from 'react';
function App() {
  const buttonList=[
    {
      text:"About me",
      initVal:"true",
      path:"/about-me",
      clickFunc:()=>{
      }
    },
    {
      text:"Projects",
      initVal:"false",
      path:"/projects",
      clickFunc:()=>{
      }
    },
    {
      text:"Releases",
      initVal:"false",
      path:"/releases",
      clickFunc:()=>{
      }
    }
  ];
    const [bl,setButtonList]=useState(buttonList);
    useEffect(()=>{
      setButtonList(bl.map((button)=>{
        return {...button,initVal:(window.location.pathname.includes(button.path))?true:"false"}
      }));
      // eslint-disable-next-line
        },[window.location.pathname]);
  return (
    <div  className="App">
      <BrowserRouter>
        <header className="AppHeader slideInUD">
          <h1 id="HeaderTitle"className="HeaderTitle">Dynamic Bineuro</h1>
          <LinkedRadioButtonList 
          buttonList={bl}
          />
        </header>
        <main className="FeedContainer">
          <Routes>
              <Route path='/' element={
                <Navigate replace to="/about-me/bio"/>
              }/>
              <Route path='/about-me'element={<Navigate to={"bio"}/>}/>
              <Route path='/about-me/bio' element={<><AboutMe/><Bio/></>}/>
              <Route path='/about-me/skills'element={<><AboutMe/><Skills/></>}/>
              <Route path='/about-me/contact-me'element={<><AboutMe/><ContactMe/></>}/>
              <Route path="/about-me/*" element={<><AboutMe/><h1 className='TempHeader'>404: Page not found</h1></>}/>
              <Route path="/projects" element={<Projects/>}/>
              <Route path="/releases" element={<Released/>}/>
              <Route path="/admin" element={<Admin/>}/>
              <Route path="*" element={<h1 className='TempHeader'>404: Page not found</h1>}/>
          </Routes>
        </main>
      </BrowserRouter>
      {/* <footer>
      </footer> */}
    </div>
  );
}

export default App;

import { useEffect, useState } from 'react';
import './App.css';
import {LinkedRadioButtonList}  from './Reusable/GlowingGUI.js';
import {AboutMe} from './Modes/AboutMe/AboutMe.js';
import {Projects} from './Modes/Projects/Projects.js';
import {Released} from './Modes/Released/Released.js';
import Bio from "./Modes/AboutMe/pages/Bio.js"
import Skills from "./Modes/AboutMe/pages/Skills.js"
import ContactMe from "./Modes/AboutMe/pages/ContactMe.js"
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
function App({initMode}) {
  const buttonList=[
    {
      text:"About me",
      initVal:"true",
      path:"/about-me/bio",
      clickFunc:()=>{
        console.log(window.location.href);
      }
    },
    {
      text:"Projects",
      initVal:"false",
      path:"/projects",
      clickFunc:()=>{
        console.log(window.location.href);
      }
    },
    {
      text:"Releases",
      initVal:"false",
      path:"/releases",
      clickFunc:()=>{
        console.log(window.location.href);
      }
    }
  ];
  return (
    <div  className="App">
      <BrowserRouter>
        <header className="AppHeader slideInUD">
          <h1 id="HeaderTitle"className="HeaderTitle">Dynamic Bineuro</h1>
          <LinkedRadioButtonList 
          buttonList={buttonList}
          />
        </header>
        <main className="FeedContainer">
          <Routes>
              <Route path='/' element={
                <Navigate replace to="/about-me/bio"/>
              }/>
              <Route path='/about-me'element={<AboutMe/>}>
                <Route index element={<Bio/>}/>
                <Route path='/about-me/bio' element={<Bio/>}/>
                <Route path='/about-me/skills'element={<Skills/>}/>
                <Route path='/about-me/contact-me'element={<ContactMe/>}/>
                <Route path="*" element={<h1 className='TempHeader'>404: Page not found</h1>}/>
              </Route>
              <Route path="/projects" element={<Projects/>}/>
              <Route path="/releases" element={<Released/>}/>
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

import { useState } from 'react';
import './App.css';
import {RadioButtonList}  from './Reusable/GlowingGUI.js';
import {AboutMe} from './Modes/AboutMe/AboutMe.js';
import {Projects} from './Modes/Projects/Projects.js';
import {Released} from './Modes/Released/Released.js';

function App({initMode}) {
  const [mode,setMode]=useState((initMode===undefined)?0:initMode);
  const buttonList=[
    {
      text:"About me",
      initVal:"true",
      clickFunc:(()=>{
        setMode(0);
        return;
      })
    },
    {
      text:"Projects",
      initVal:"false",
      clickFunc:(()=>{
        setMode(1);
        return;
      })
    },
    {
      text:"Releases",
      initVal:"false",
      clickFunc:(()=>{
        setMode(2);
        return;
      })
    }
  ];
  const renderMode=()=>{
    switch(mode){
      case 0:
        return <AboutMe/>
      case 1:
        return <Projects/>
      case 2:
        return <Released/>
      default:
        return <></>
    }
  };

  return (
    <div className="App">
      <header className="AppHeader slideInUD">
        <h1 id="HeaderTitle" className="HeaderTitle">Dynamic Bineuro</h1>
        <RadioButtonList 
        buttonList={buttonList}
        />
      </header>
      <main className="FeedContainer">
        {renderMode()}
      </main>
      <footer>
        This is the footer
      </footer>
    </div>
  );
}

export default App;

import { RadioButtonList } from "../../Reusable/GlowingGUI.js";
import { useState } from 'react';
import Bio from "./pages/Bio.js"
import Skills from "./pages/Skills.js"
import ContactMe from "./pages/ContactMe.js"
import MiniNav from "./MiniNav.js";
/**
 * Should internally have 3 mode: Bio, Skills, and Contact Me
 * - Bio will be a simple text with some images (static mostly)
 * - Skills will have the following features
 *  - Selecting a skill will show all the projects that correlate to that skill (from different database)
 *  - The projects will be seen inside a carousel
 *      - Each project should show the following:
 *          - Name
 *          - Image
 *          - Tags
 *          - My role (Star statements)
 *  - Should be resume details
 * - Contact Me should have the following features
 *  - Should have a forum to submit a normal communication
 *  - Should have my different socials (Github, LinkedIn, Youtube)
 */




export function AboutMe(){
    const [mode,setMode]=useState(0);
    const buttonList=[
        {
          text:"Bio",
          initVal:"true",
          clickFunc:(()=>{
            setMode(0);
            return;
          })
        },
        {
          text:"Skills",
          initVal:"false",
          clickFunc:(()=>{
            setMode(1);
            return;
          })
        },
        {
          text:"Contact me",
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
            return <Bio/>
          case 1:
            return <Skills/>
          case 2:
            return <ContactMe/>
          default:
            break;
        }
      };
    return <><MiniNav buttonList={buttonList}></MiniNav>{renderMode()}</>;
}
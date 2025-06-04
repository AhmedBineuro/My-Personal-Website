import { RadioButtonList } from "../../Reusable/GlowingGUI.js";
import { useState } from 'react';
import Bio from "./pages/Bio.js"
import Skills from "./pages/Skills.js"
import ContactMe from "./pages/ContactMe.js"
import MiniNav from "./MiniNav.js";
import "./AboutMe.css"

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




export function AboutMe({initFeed}){
    const [feed,setFeed]=useState((initFeed===undefined)?0:initFeed);
    const buttonList=[
        {
          text:"Bio",
          initVal:"true",
          clickFunc:(()=>{
            setFeed(0);
            return;
          })
        },
        {
          text:"Skills",
          initVal:"false",
          clickFunc:(()=>{
            setFeed(1);
            return;
          })
        },
        {
          text:"Contact me",
          initVal:"false",
          clickFunc:(()=>{
            setFeed(2);
            return;
          })
        }
      ];
      const renderFeed=()=>{
        console.log("Changing About me feed");
        switch(feed){
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
      const nameFeed=()=>{
        console.log("Changing About me feed");
        switch(feed){
          case 0:
            return "Bio";
          case 1:
            return "Skills";
          case 2:
            return "Contact Me";
          default:
            break;
        }
      };
    return (<>
    <div className="FeedHeader">
      <h1 className="FeedName">{nameFeed()}</h1>
      <MiniNav buttonList={buttonList} isDocked={"false"}/>
    </div>
    <div>{renderFeed()}</div>
    </>
  );
}
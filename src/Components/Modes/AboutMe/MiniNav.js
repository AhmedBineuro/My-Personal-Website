import { LinkedRadioButtonList, ToggleButton } from "../../Reusable/GlowingGUI"
import './MiniNav.css'
import {useState,useEffect} from 'react';
import {useLocation} from 'react-router-dom'

export default function MiniNav({buttonList,isDocked}){
    const [docked,setDocked]=useState(isDocked==="true"?true:false);
    const [bl,setButtonList]=useState(buttonList);
    const updateMode=()=>{
        setDocked(prev => !prev);
    };
    let className="MiniNavContainer";
    className+=docked?" Dock":"";
    let val=docked===true?"false":"true";
        const loc=useLocation();
        useEffect(()=>{
            setButtonList(bl.map((button)=>{
                return {...button,initVal:(loc.pathname.includes(button.path))?true:"false"}
            }));
            // eslint-disable-next-line
      },[loc]);
    return (
    <div className={className}>
        <ToggleButton
        onUpdate={updateMode} 
        text="About Me"
        initVal={val}
        />
        <LinkedRadioButtonList
        className="RadioButtonList"
        buttonList={bl}
        id="ABTME"
        />
    </div>
    )
}
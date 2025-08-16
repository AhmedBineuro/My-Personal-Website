import { LinkedRadioButtonList, ToggleButton } from "../../Reusable/GlowingGUI"
import './MiniNav.css'
import {useState } from 'react';
import {Link} from "react-router-dom"

export default function MiniNav({buttonList,isDocked}){
    const [docked,setDocked]=useState(isDocked==="true"?true:false);
    const updateMode=()=>{
        setDocked(prev => !prev);
    };
    let className="MiniNavContainer";
    className+=docked?" Dock":"";
    let val=docked===true?"false":"true";
    return (
    <div className={className}>
        <ToggleButton
        onUpdate={updateMode} 
        text="About Me"
        initVal={val}
        />
        <LinkedRadioButtonList
        className="RadioButtonList"
        buttonList={buttonList}
        id="ABTME"
        />
    </div>
    )
}
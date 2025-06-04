import { RadioButtonList, ToggleButton } from "../../Reusable/GlowingGUI"
import './MiniNav.css'
import { useEffect, useState } from 'react';

export default function MiniNav({buttonList,initVal}){
    const [docked,setDocked]=useState(initVal==="true"?true:false);
    const [active,setActive]=useState(initVal==="true"?"FadeIn":"FadeOut");
    const updateMode=()=>{
        if(active==="FadeOut")
        {
            let obj=document.getElementById("ABTME");
            obj.classList.remove("FadeIn");
            setActive("FadeOut");
        }
        else {
            let obj=document.getElementById("ABTME");
            obj.classList.remove("FadeOut");
            setActive("FadeIn");
        };
        setDocked(prev => !prev);
    };
    let className="MiniNavContainer";
    className+=docked?" Dock":"";
    return (
    <div className={className}>
        <ToggleButton
        onUpdate={updateMode} 
        text="About Me"
        initVal={initVal}
        />
        <RadioButtonList
        buttonList={buttonList}
        id="ABTME"
        style={'animate '+active+" 0.5s ease-in-out forwards"}
        />
    </div>
    )
}
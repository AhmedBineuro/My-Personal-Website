import styles from './GlowingGUI.module.css'
import { useEffect, useState } from 'react';
import {useLocation, Link} from "react-router-dom"

/**
 * 
 * @note A button will have these props (text,initVal [string true or false],onUpdate [ function used to update parent and has the index of the button and its state],index,clickFunc [function will be done once when button is toggled one and takes no parameters])
 * @returns A JSX toggle button 
 */
export function ToggleButton({initVal,text,clickFunc,id,onUpdate,index}){
    const [state,setStatus]=useState(initVal==="false"?false:true);
    
    const toggleState = ()=>{
        const newState = !state;
        if(newState && clickFunc!==undefined)
            clickFunc();
        if(onUpdate!==undefined)
            onUpdate(index,!state);
    };

    useEffect(()=>{
        setStatus(initVal==="false"?false:true);
    },[initVal]);

    var styl=state?styles.ToggleButtonOn:styles.ToggleButton;
    return(
        <button id={id} className={styl} onClick={toggleState}>
            {text}
        </button>
    );
}

export function RadioButtonList(props){
    const [buttonList,setButtonList] = useState(props.buttonList);

    const updateList=(index,newState)=>{
        const updatedList = buttonList.map((button, i) => {
            if (i === index) {
                return { ...button, initVal: newState }; // Set the clicked button as selected
            }

            return { ...button, initVal: "false" }; // Unselect all other buttons
        });
        setButtonList(updatedList);
    };
    // eslint-disabuttonListe-next-line
    useEffect(()=>{if(buttonList.length>=0)updateList(0,"true")},[buttonList.length]); 
    const buttons = buttonList.map((button, index) =><ToggleButton key={index} index={index} onUpdate={updateList} clickFunc={button.clickFunc} text={button.text} initVal={button.initVal}/>);
    
    return(
    <div id={props.id} className={styles.RadioButtonList}>
        {buttons}
    </div>);
}

export function LinkedRadioButtonList(props){
    const [buttonList,setButtonList] = useState(props.buttonList);
    const updateList=(index,newState)=>{
        const updatedList = buttonList.map((button, i) => {
            if (i === index) {
                return { ...button, initVal: newState }; // Set the clicked button as selected
            }

            return { ...button, initVal: "false" }; // Unselect all other buttons
        });
        setButtonList(updatedList);
    };
    const loc=useLocation();
  useEffect(()=>{
    setButtonList(buttonList.map((button)=>{
      return {...button,initVal:(loc.pathname.includes(button.path))?true:"false"}
    }));
      },[loc]);
    const simpleUpdateList=(newList)=>{
        setButtonList(newList);
    };
    useEffect(()=>{if(props.buttonList)simpleUpdateList(props.buttonList)},[props.buttonList]); 
    const buttons = buttonList.map((button, index) =><Link to={button.path}><ToggleButton key={index} index={index} onUpdate={updateList} clickFunc={button.clickFunc} text={button.text} initVal={button.initVal}/></Link>);
    
    return(
    <div id={props.id} className={styles.RadioButtonList}>
        {buttons}
    </div>);
}
import styles from './GlowingGUI.module.css'
import { useEffect, useState } from 'react';

/**
 * 
 * @note A button will have these props (text,initVal [string true or false],onUpdate [ function used to update parent and has the index of the button and its state],index,clickFunc [function will be done once when button is toggled one and takes no parameters])
 * @returns A JSX toggle button 
 */
export function ToggleButton(props){
    const [state,setState]=useState(props.initVal==="false"?false:true);
    
    const toggleState = ()=>{
        const newState = !state;
        if(newState && props.clickFunc!==undefined)
            props.clickFunc();
        if(props.onUpdate!==undefined)
            props.onUpdate(props.index,!state);
    };

    useEffect(()=>{
        setState(props.initVal==="false"?false:true);
    },[props.initVal]);

    var styl=state?styles.ToggleButtonOn:styles.ToggleButton;
    return(
        <button id={props.id} className={styl} onClick={toggleState}>
            {props.text}
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
    // eslint-disable-next-line
    useEffect(()=>{if(buttonList.length>=0)updateList(0,"true")},[buttonList.length]); 
    const buttons = buttonList.map((button, index) =><ToggleButton key={index} index={index} onUpdate={updateList} clickFunc={button.clickFunc} text={button.text} initVal={button.initVal}/>);
    
    return(
    <div id={props.id} className={styles.RadioButtonList}>
        {buttons}
    </div>);
}
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
        if(!state)
            props.clickFunc();
        props.onUpdate(props.index,!state);
    };

    useEffect(()=>{
        setState(props.initVal==="false"?false:true);
    },[props.initVal]);

    var styl=state?styles.ToggleButtonOn:styles.ToggleButton;
    return(
        <button className={styl} onClick={toggleState}>
            {props.text}
            <input type="checkbox"></input>
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
        console.log("What");
        setButtonList(updatedList);
    };
    useEffect(()=>{if(buttonList.length>=0)
        updateList(0,"true")},[buttonList.length]);
    const buttons = buttonList.map((button, index) =><ToggleButton key={index} index={index} onUpdate={updateList} clickFunc={button.clickFunc} text={button.text} initVal={button.initVal}/>);
    
    return(
    <div className={styles.RadioButtonList}>
        {buttons}
    </div>);
}
import styles from './MediaContainer.module.css'
export function Tag({Text,Style,Clickable,ClickFunction}){
    var isButton=true;
    if(Clickable===undefined)
        isButton=false;
return <>
    {(isButton)?(<button onClick={ClickFunction} style={Style} className={styles.Tag}>{Text}</button>):(<div style={Style} className={styles.Tag}>{Text}</div>)}
</>;
}
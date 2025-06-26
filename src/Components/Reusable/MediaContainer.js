import {Tag} from './Tag.js';
import styles from './MediaContainer.module.css';
import { useState,getState } from 'react';
import "./Card.css";
// const startingColor=[255,92,204];
// const endingColor=[81,40,137];
// const startingColor=[98, 49, 176];
// const endingColor=[176, 49, 125];
const startingColor=[174, 100, 26];
const endingColor=[302, 100, 26];
function interpolate(color1, color2, t){
    return[
        Math.round(color1[0]*(1-t)+color2[0]*t),
        Math.round(color1[1]*(1-t)+color2[1]*t),
        Math.round(color1[2]*(1-t)+color2[2]*t)
    ];
}
export default function MediaContainer({Name,Tags,Thumbnail,URL,DURL}){
    let colors=[];
    const  [t,setTransform]=useState({
        xAngle:0,
        yAngle:0,
        position:{x:0,y:0},
        bounds:undefined
    });
    for(let i=1;i<=Tags.length;i++){
        let t=i/Tags.length;
        colors.push(interpolate(startingColor,endingColor,t));
    }
    return(   
    <div className={styles.MediaContainerWrapper}>
        {(DURL!==undefined)?(
            <button className={styles.DownloadButton} onClick={((e)=>window.open(DURL,`_blank`))}>
            </button>
            ):<></>
        }
        <button className={styles.MediaContainer} onClick={((e)=>window.open(URL,`_blank`))}>
            <div className='ThumbnailTitlePair'>
                <h1 className={ styles.MediaName}>{Name}</h1>
                <img alt={Name+" thumbnail image"}className={ styles.MediaImage} src={(Thumbnail!==undefined)?Thumbnail:"https://firebasestorage.googleapis.com/v0/b/dynamicbineurowebsite.firebasestorage.app/o/testImg.png?alt=media&token=485a6dde-9ef3-4cf9-8504-f6e4fbeb7fca"}/>
            </div>
            <div className={ styles.TagList}>
            {
                Tags.map((tag,index)=>
                    <Tag key={index} Style={{backgroundColor:("hsl("+colors[index][0]+", "+colors[index][1]+"%, "+colors[index][2]+"%)")}} Text={tag}/>)
            }
            </div>
        </button>
    </div>    
    );
}
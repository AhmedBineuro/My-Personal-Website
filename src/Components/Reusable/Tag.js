import styles from './MediaContainer.module.css'
export function Tag({Text,Style}){
return (<div style={Style} className={styles.Tag}>{Text}</div>);
}
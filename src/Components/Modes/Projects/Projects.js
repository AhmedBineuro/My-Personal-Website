import { RadioButtonList } from "../../Reusable/GlowingGUI.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

import MiniNav from "../AboutMe/MiniNav.js";
/**
 * Should have the following features
 *  - Should display a set of projects from a database
 *  - Should be able to both search and filter through them
 *  - Each project should show
 *      - Name
 *      - Image
 *      - Tags (An array of one word descriptors)
 */
const app=initializeApp();
console.log(app);
export function Projects(){
    return <><h1>Projects</h1></>;
}
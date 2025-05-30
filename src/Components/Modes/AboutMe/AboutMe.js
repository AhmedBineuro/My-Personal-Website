import { RadioButtonList } from "../../Reusable/GlowingGUI.js";
/**
 * Should internally have 3 mode: Bio, Skills, and Contact Me
 * - Bio will be a simple text with some images (static mostly)
 * - Skills will have the following features
 *  - Selecting a skill will show all the projects that correlate to that skill (from different database)
 *  - The projects will be seen inside a carousel
 *      - Each project should show the following:
 *          - Name
 *          - Image
 *          - Tags
 *          - My role (Star statements)
 *  - Should be resume details
 * - Contact Me should have the following features
 *  - Should have a forum to submit a normal communication
 *  - Should have my different socials (Github, LinkedIn, Youtube)
 */


export function AboutMe(){
    return <><h1>About me</h1></>;
}
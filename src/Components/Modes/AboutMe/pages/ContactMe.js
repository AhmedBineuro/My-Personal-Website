import "./ContactMe.css"
import "./Bio.css"
export default function ContactMe(){
    return(
        <div className="FeedContent">
            <p>For business inqueries, you can always send an email to <a href="mailto:ahmed.eltaher.abdalla@gmail.com">this</a> email.
            Additionally if you want to contact me for non-business reasons shoot me an email to <a href="mailto:dynamic.bineuro@gmail.com">this</a> email address and I will make sure to reply to you as soon as I can!</p>
            <p>You can also find me on these following platforms</p>
            <div className="SocialsList">
                <button className="SocialsButton" onClick={((e)=>window.open("https://www.youtube.com/@dynamicbineuro6083",`_blank`))}>
                    <img alt="Youtube button" src={require("./icons/youtube.png")} className="SocialsButtonIcon"/>
                    <em>Youtube</em>
                </button>
                <button className="SocialsButton" onClick={((e)=>window.open("https://www.linkedin.com/in/ahmed-abdalla-b9644a248/",`_blank`))}>
                    <img alt="LinkedIn button" src={require("./icons/linkedin.png")} className="SocialsButtonIcon"/>
                    <em>LinkedIn</em>
                </button>
                <button className="SocialsButton" onClick={((e)=>window.open("https://github.com/AhmedBineuro",`_blank`))}>
                    <img alt="Github button" src={require("./icons/github.png")} className="SocialsButtonIcon"/>
                    <em>Github</em>
                </button>
                <button className="SocialsButton" onClick={((e)=>window.open("https://dynamicbineuro.itch.io/",`_blank`))}>
                    <img alt="Itch.io button" src={require("./icons/itchio.png")} className="SocialsButtonIcon"/>
                    <em>Itch.io</em>
                </button>
            </div>
        </div>
    );
}
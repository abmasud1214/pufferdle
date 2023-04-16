import React from "react"
import ReactDOM from "react-dom/client"

import './App.css';
import Pufferdle from "./Pufferdle";
import FishTank from "./Components/FishTank";

const pufferfish_src = require("./Art/pufferfish.png")
const mutant_src = require("./Art/mutant_carp.png")
const fishtank_src = require("./Art/fishtank.png")


function App() {

    const [inGame, setInGame] = React.useState(0);

    return (
        <div className="App">
            {inGame == 0 && <div className="menuButtons">
                <div className="menuButton"> 
                    <img src={pufferfish_src} alt=""/> 
                    <h1>Daily</h1>
                </div>
                <div className="menuButton" onClick={() => setInGame(2)}> 
                    <img src={mutant_src} alt=""/> 
                    <h1>Random</h1>
                </div>
                <div className="menuButton" onClick={() => setInGame(3)}> 
                    <img src={fishtank_src} alt=""/> 
                    <h1>Fish Tank</h1>
                </div>                
            </div>}
            {inGame == 1 && <Pufferdle daily={true}/>}
            {inGame == 2 && <Pufferdle daily={false}/>}
            {inGame == 3 && <FishTank />}
        </div>
    );
}

export default App;

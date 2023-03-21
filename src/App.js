import React from "react"
import ReactDOM from "react-dom/client"

import './App.css';
import FishingGame from './Components/FishingGame'

import fishdata from "./fishdata";

function App() {
  const fishArray = fishdata.fish;
  const whichFish = fishArray[Math.floor(Math.random() * fishArray.length)]

  return (
    <div className="App">
      <FishingGame whichFish={whichFish}/>
    </div>
  );
}

export default App;

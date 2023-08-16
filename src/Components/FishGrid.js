import React from 'react'

import './FishGrid.css'
import { PopupFishInfo } from './FishInfo';

const src_iridiumquality = require('../Art/iridium_quality.png')


function FishImg(props) {
    const { fish, selected, onClick, info, invertPopup, perfect } = props;

    const [hover, setHover] = React.useState(false);

    // console.log("fishsrc", fish.src);

    return (
        <div 
            onClick={onClick}  
            className={"fishContainer"}
        >
            <div className="shadow" style={{
                WebkitMaskImage: `url(${fish.src})`,
                maskImage: `url(${fish.src})`, 
                transform: `scale(${hover ? 1.2 : 1})`,
            }}></div>
            {selected && <div className="selected" style={{
                WebkitMaskImage: `url(${fish.src})`,
                maskImage: `url(${fish.src})`,
            }}></div>}
            <img 
                src={fish.src} 
                alt={fish.name} 
                className="fish_icon" 
                style={{transform: `scale(${hover ? 1.2 : 1})`}}
                onMouseEnter={()=>{setHover(true)}} 
                onMouseLeave={()=>{setHover(false)}}
                ></img>
            {info && hover && <PopupFishInfo fish={fish} inverted={invertPopup}/>}
            {perfect && <img className="quality" alt="" src={src_iridiumquality}/>}
        </div>
    )
}

export default function FishGrid({fishArray, onClick, selectedFish, info, perfect, perfectCatches}) {
    const [numRows, setNumRows] = React.useState(0);

    React.useEffect(() => {
        // Calculate the number of rows in the grid and update state
        const grid = document.querySelector('.fish_container');
        const numRows = grid
          ? parseInt(getComputedStyle(grid).gridTemplateRows.split(' ').length)
          : 0;
        setNumRows(numRows);
      }, []);

    return (
        <div className="fish_container">
            {fishArray.map((value, index) => {
                return <FishImg 
                key={value.name}
                fish={value}
                onClick = {() => {onClick(value)}}
                selected = {value.name === selectedFish.name}
                info = {info}
                invertPopup = {index >= fishArray.length - numRows}
                perfect = {perfect && perfectCatches.has(value.name)}
            />})
            }
        </div>
    )
}

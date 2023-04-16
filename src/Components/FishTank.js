import React from 'react'
import FishGrid from './FishGrid';
import fishdata from '../fishdata';

import './FishTank.css'

function FishingLevelUnit(props) {
    const {active, major, double, onClick} = props;

    return (
        <div className={`fishingLevelUnit ${active ? double ? "double" : "active" : ""} ${major ? "major" : ""}`} onClick={onClick}>
        </div>
    )
}

export default function FishTank() {

    const [fishArray, setFishArray] = React.useState(fishdata.fish.map((fish, index) => ({
        ...fish,
        src: `/fish_sprites/fish_sprite_${index+1}.png`
    })));

    const [selectedFish, setSelectedFish] = React.useState(fishArray[0]);
    const [fishingLevel, setFishingLevel] = React.useState(0);
    const [foodLevel, setFoodLevel] = React.useState(3);

    const onFishClick = (fish) => {
        setSelectedFish(fish);
    }

    const onFishLevelClick = (level) => {
        setFishingLevel(1 + level + foodLevel);
    }

    return (
        <div className="container">
            <FishGrid fishArray={fishArray} selectedFish={selectedFish} onClick={onFishClick} info={false}/>
            <div>
                <div className="fishLevelBar">
                    {Array.from(Array(10)).map((_, i) => (
                        <FishingLevelUnit 
                            active={i < fishingLevel}
                            double = {(i + foodLevel >= fishingLevel && i < fishingLevel) || ((i + 10) < fishingLevel)}
                            major = {i == 4 || i == 9}
                            onClick = {() => (onFishLevelClick(i))}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

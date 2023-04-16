import React from 'react'
import FishGrid from './FishGrid';
import fishdata from '../fishdata';

import './FishTank.css'
import FishingGame from './FishingGame';

const src_troutsoup = require("../Art/food/troutsoup.png")
const src_fishtaco = require("../Art/food/fishtaco.png")
const src_dishothesea = require("../Art/food/dishothesea.png")
const src_seafoampudding = require("../Art/food/seafoampudding.png")

const src_barbedhook = require("../Art/tackles/barbedhook.png")
const src_corkbobber = require("../Art/tackles/corkbobber.png")
const src_leadbobber = require("../Art/tackles/leadbobber.png")
const src_trapbobber = require("../Art/tackles/trapbobber.png")
const src_treasurebobber = require("../Art/tackles/treasurebobber.png")

const src_goldquality = require('../Art/gold_quality.png')

function FishingLevelUnit(props) {
    const {active, major, double, onClick} = props;

    return (
        <div className={`fishingLevelUnit ${active ? double ? "double" : "active" : ""} ${major ? "major" : ""}`} onClick={onClick}>
        </div>
    )
}

export default function FishTank() {

    const [inGame, setInGame] = React.useState(false);

    const [fishArray, setFishArray] = React.useState(fishdata.fish.map((fish, index) => ({
        ...fish,
        src: `/fish_sprites/fish_sprite_${index+1}.png`
    })));

    const [selectedFish, setSelectedFish] = React.useState(fishArray[0]);
    const [fishingLevel, setFishingLevel] = React.useState(0);
    const [fishBarLevel, setFishBarLevel] = React.useState(0);
    const [foodLevel, setFoodLevel] = React.useState(0);
    const [tackle, setTackle] = React.useState("");
    
    console.log(fishingLevel);

    const onFishClick = (fish) => {
        setSelectedFish(fish);
    }

    const onFishLevelClick = (level) => {
        setFishBarLevel((value) => (value === level ? -1 : level));
        setFishingLevel(foodLevel + (fishBarLevel === level ? -1 : level) + 1);
    }

    const onFoodClick = (level) => {
        setFoodLevel((value) => (value === level ? 0 : level));
        setFishingLevel(fishBarLevel + (level === foodLevel ? 0 : level) + 1);
    }

    const onTackleClick = (t) => {
        setTackle((value) => (value === t ? "" : t));
    }

    const endGame = (caught, treasure, perfect) => {
        setInGame(false);
    }

    const startFishingGame = () => {
        setInGame(true);
    }


    return !inGame ? (
        <div className="container">
            <FishGrid fishArray={fishArray} selectedFish={selectedFish} onClick={onFishClick} info={false}/>
            <div className="tankSettingsMenu">
                <div className="fishLevelBar">
                    {Array.from(Array(10)).map((_, i) => (
                        <FishingLevelUnit 
                            active={i < fishingLevel}
                            double = {(i + foodLevel >= fishingLevel && i < fishingLevel) || ((i + 10) < fishingLevel)}
                            major = {i === 4 || i === 9}
                            onClick = {() => (onFishLevelClick(i))}
                        />
                    ))}
                    <h1 className={foodLevel > 0 && "foodLevelText"}>{fishingLevel}</h1>
                </div>
                <div className="foodmenu">
                    <div>
                        <img className={foodLevel === 1 && "food_selected"} onClick={() => onFoodClick(1)} src={src_troutsoup} alt={"trout soup"}/>
                    </div>
                    <div>
                        <img className={foodLevel === 2 && "food_selected"} onClick={() => onFoodClick(2)} src={src_fishtaco} alt={"fish taco"}/>
                    </div>
                    <div>
                        <img className={foodLevel === 3 && "food_selected"} onClick={() => onFoodClick(3)} src={src_dishothesea} alt={"dishothesea"}/>
                    </div>
                    <div>
                        <img className={foodLevel === 4 && "food_selected"} onClick={() => onFoodClick(4)} src={src_seafoampudding} alt={"seafoam pudding"}/>
                    </div>
                    <div>
                        <img className={foodLevel === 5 && "food_selected"} onClick={() => onFoodClick(5)} src={src_seafoampudding} alt={"gold quality seafoam pudding"}/>
                        <img className="quality" alt="" src={src_goldquality}/>
                    </div>
                </div>
                <div className="tackleMenu">
                    <img className={tackle === "barbedHook" && "tackle_selected"} onClick={() => onTackleClick("barbedHook")} src={src_barbedhook} alt="Barbed Hook"/>
                    <img className={tackle === "leadBobber" && "tackle_selected"} onClick={() => onTackleClick("leadBobber")} src={src_leadbobber} alt="Lead Bobber"/>
                    <img className={tackle === "treasureHunter" && "tackle_selected"} onClick={() => onTackleClick("treasureHunter")} src={src_treasurebobber} alt="Treasure Hunter"/>
                    <img className={tackle === "trapBobber" && "tackle_selected"} onClick={() => onTackleClick("trapBobber")} src={src_trapbobber} alt="Trap Bobber"/>
                    <img className={tackle === "corkBobber" && "tackle_selected"} onClick={() => onTackleClick("corkBobber")} src={src_corkbobber} alt="Cork Bobber"/>

                </div>
                <button onClick={startFishingGame}>Fish!</button>
            </div>
        </div>
    ) : (
        <FishingGame whichFish={selectedFish} endGame={endGame} fishingLevel={fishingLevel} bobber={tackle}/>
    )
}

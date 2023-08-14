import React from 'react'

import './FishInfo.css'

const locationText = (value) => {
    switch (value) {
        case "Ginger Ocean":
            return "Ginger Island Oceans";
        case "Town":
            return "River (Town)";
        case "Forest":
            return "River (Forest)";
        case "Lake":
            return "Mountain Lake";
        case "Pond":
            return "Cindersap Forest Pond";
        case "Woods":
            return "Secret Woods Ponds";
        case "Sewers":
            return "The Sewers";
        case "Swamp":
            return "Witch's Swamp";
        case "Market":
            return "Night Market";
        case "Volcano":
            return "Volcano Caldera";
        case "Desert":
            return "The Desert";
        case "Ginger Pond":
            return "Ginger Island Pond";
        case "Ginger River":
            return "Ginger Island River";
        case "Bug":
            return "Mutant Bug Lair";
        case "Cove":
            return "Pirate Cove";
        default:
            return value;
    }
}

const timeText = (timeArr) => {
    const numToTimeStr = (num) => {
        if (num < 12) {
            return `${num} AM`;
        } else if (num < 24) {
            return `${num === 12 ? 12 : num % 12} PM`;
        } else {
            return `${num % 24} AM`;
        }
    }
    if (timeArr[0] === 6 && timeArr[1] === 26) {
        return ["Any"];
    } else {
        let pairArr = Array.from({ length: timeArr.length / 2 }, (_, i) => `${numToTimeStr(timeArr[i * 2])} - ${numToTimeStr(timeArr[i * 2 + 1])}`);
        return pairArr;
    }
}

export default function FishInfo({ fish }) {
    return (
        <div className="fishInfoContainer">
            <h1>{fish.name}</h1>
            <p style={{margin: "0px 20px 0px 20px"}}>{fish.description}</p>
            <div className="fishInfoColumns">
                <div>
                    <h2 className="infoHeader">Seasons</h2>
                    {fish.season.map(value => <p>{value}</p>)}
                </div>
                <div>
                    <h2 className="infoHeader">Weather</h2>
                    {fish.weather.map(value => <p>{value}</p>)}
                </div>
                <div>
                    <h2 className="infoHeader">Locations</h2>
                    {fish.location.map(value => <p>{locationText(value)}</p>)}
                </div>
                <div>
                    <h2 className="infoHeader">Time</h2>
                    {timeText(fish.time).map(value => <p>{value}</p>)}
                </div>
            </div>
        </div>
    )
}

export function PopupFishInfo({ fish, inverted }) {
    return (
        <div className={`popupFishInfoContainer ${inverted ? "inverted" : ""}`}>
            <h1>{fish.name}</h1>
            <div className="popupFishInfo">
                <div>
                    <h2 className="infoHeader">Seasons</h2>
                    {fish.season.map((value, i)=> <p key={i}>{value}</p>)}
                </div>
                <div>
                    <h2 className="infoHeader">Weather</h2>
                    {fish.weather.map((value, i)=> <p key={i}>{value}</p>)}
                </div>
                <div>
                    <h2 className="infoHeader">Locations</h2>
                    {fish.location.map((value, i)=> <p key={i}>{value}</p>)}
                </div>
                <div>
                    <h2 className="infoHeader">Time</h2>
                    {timeText(fish.time).map((value, i)=> <p key={i}>{value}</p>)}
                </div>
            </div>
        </div>
    )
}
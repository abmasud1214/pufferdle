import React from "react";

import fishdata from "../fishdata.js";
import "./FishMenu.css"
import FishGrid from "./FishGrid.js";
import useCheckMobileScreen from "../Utils/UseCheckMobileScreen.js";
import FishInfo from "./FishInfo.js";

const fish_sprites_src = fishdata.fish.map((_, index) => {
    return require(`./../Art/fish_sprites/fish_sprite_${index+1}.png`)
})

export default function FishMenu(props) {
    const { onGuess, hardMode } = props;

    let fishArray = fishdata.fish;
    
    fishArray = fishArray.map((fish, index) => ({
        ...fish,
        src: fish_sprites_src[index],
    }))

    const [fishChoice, setFishChoice] = React.useState(fishArray);
    const [selectedFish, setSelectedFish] = React.useState(fishChoice[0]);
    const [formData, setFormData] = React.useState("");
    
    const handleFishChange = (event) => {
        setFormData(event.target.value);
        const validFish = fishArray.filter((fish) => (fish.name.toLowerCase().includes(event.target.value.toLowerCase())))
        setFishChoice(_ => {
            return validFish;
        });
        setSelectedFish(validFish[0]);
    }
    
    const onFishClick = (fish) => {
        setFormData(fish.name);
        setSelectedFish(fish);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setFormData("");
        setFishChoice(fishArray);
        setSelectedFish(fishArray[0]);
        onGuess(selectedFish);
    }
    
    return (
        <div className="menu">
            {useCheckMobileScreen() && !hardMode && <FishInfo fish={selectedFish}/>}
            {useCheckMobileScreen() && <div style={{height: "50px"}}></div>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder={selectedFish ? selectedFish.name : "Enter Fish"}
                    onChange={handleFishChange}
                    name="fish"
                    value={formData}
                />
                <button>Submit</button>
            </form>
            <FishGrid fishArray={fishChoice} selectedFish={selectedFish} onClick={onFishClick} info={!useCheckMobileScreen() && !hardMode} perfectCatches={[]}/>
        </div>
    )
}
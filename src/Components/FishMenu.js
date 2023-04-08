import React from "react";

import fishdata from "../fishdata.js";
import "./FishMenu.css"

export default function FishMenu(props) {
    const { onGuess } = props;

    let fishArray = fishdata.fish;
    
    fishArray = fishArray.map((fish, index) => ({
        ...fish,
        src: `/fish_sprites/fish_sprite_${index+1}.png`
    }))

    const [fishChoice, setFishChoice] = React.useState(fishArray);
    const [selectedFish, setSelectedFish] = React.useState(fishChoice[0]);
    const [formData, setFormData] = React.useState("");

    const inputRef = React.useRef(null);
    
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
        inputRef.current.focus();
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
            <form onSubmit={handleSubmit}>
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="fish"
                    onChange={handleFishChange}
                    name="fish"
                    value={formData}
                />
                <button>Submit</button>
            </form>
            <div className="fish_container">
                {fishChoice.map(value => {return <img 
                    key={value.name} 
                    className="fish_icon" 
                    alt={value.name} 
                    src={value.src} 
                    onClick={() => {onFishClick(value)}}
                    style={value.name == selectedFish.name ? {filter: "drop-shadow(3px 3px 0px rgb(50, 200, 50)"}: {}}/>})}
            </div>
        </div>
    )
}
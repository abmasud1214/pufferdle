import React from 'react';
import "./SettingsModal.css";


export const ToggleButton = (props) => {
    const {onClick, toggle} = props;
    return (
        <div className="toggleButtonContainer" onClick={onClick}>
            {toggle && <div className="toggleButtonActive" style={{}}></div>}
        </div>
    )
}

export default function SettingsModal(props) {
    const {onClose} = props;

    const [settings, setSettings] = React.useState(JSON.parse(localStorage.getItem("settings")));

    const handleChange = (setting) => {
        settings[setting] = !settings[setting];
        setSettings((prevState) => ({
            ...prevState,
        }));
        localStorage.setItem("settings", JSON.stringify(settings));
        if (setting === "showPerfectCatches") {
            const event = new Event('perfectCatchUpdated');
            window.dispatchEvent(event);
        }
    }

    return (
        <div className='background' onClick={onClose}>
            <div className='settingsModal' onClick={e => e.stopPropagation()}>
                <h1>Settings</h1>
                <div className='setting'>
                    <ToggleButton onClick={() => handleChange("hardMode")} toggle={settings["hardMode"]} />
                    <div className='settingDesc'>
                        <h2>Pufferdle: Hard Mode</h2>
                        <h3>Hide details / traits of fish while guessing.</h3>
                    </div>
                </div>
                <div className='setting'>
                    <ToggleButton onClick={() => handleChange("skipFishingGame")} toggle={settings["skipFishingGame"]} />
                    <div className='settingDesc'>
                        <h2>Pufferdle: Skip Fishing Game</h2>
                        <h3>Go straight to the guesses without having to catch the fish.</h3>
                    </div>
                </div>
                <div className='setting'>
                    <ToggleButton onClick={() => handleChange("showPerfectCatches")} toggle={settings["showPerfectCatches"]} />
                    <div className='settingDesc'>
                        <h2>Fish Tank: Show Perfect Catches</h2>
                        <h3>Every fish that was perfectly caught in the fish tank will be iridium quality.</h3>
                    </div>
                </div>
                <div className='setting'>
                    <ToggleButton onClick={() => handleChange("instantRestart")} toggle={settings["instantRestart"]} />
                    <div className='settingDesc'>
                        <h2>Fish Tank: Instant Restart When Not Perfect</h2>
                        <h3>Restart the fishing minigame as soon as you fail perfect.</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}
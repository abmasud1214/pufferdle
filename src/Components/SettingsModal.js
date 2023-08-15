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
    }

    return (
        <div className='background' onClick={onClose}>
            <div className='settingsModal' onClick={e => e.stopPropagation()}>
                <h1>Settings</h1>
                <div className='setting'>
                    <ToggleButton onClick={() => handleChange("hardMode")} toggle={settings["hardMode"]} />
                    <h3>Hard Mode</h3>
                </div>
                <div className='setting'>
                    <ToggleButton onClick={() => handleChange("skipFishingGame")} toggle={settings["skipFishingGame"]} />
                    <h3>Skip the fishing minigame before Pufferdle</h3>
                </div>
                <div className='setting'>
                    <ToggleButton onClick={() => handleChange("instantRestart")} toggle={settings["instantRestart"]} />
                    <h3>Restart instantly if not perfect in fish tank.</h3>
                </div>
                <div className='setting'>
                    <ToggleButton onClick={() => handleChange("showPerfectCatches")} toggle={settings["showPerfectCatches"]} />
                    <h3>Show perfectly caught fish in the fish tank.</h3>
                </div>
            </div>
        </div>
    )
}
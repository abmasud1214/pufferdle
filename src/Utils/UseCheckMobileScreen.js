// from https://stackoverflow.com/questions/39435395/reactjs-how-to-determine-if-the-application-is-being-viewed-on-mobile-or-deskto

import React, {useEffect, useState} from "react";

const useCheckMobileScreen = () => {
    const [width, setWidth] = useState(window.innerWidth);
    const handleWindowSizeChange = () => {
            setWidth(window.innerWidth);
    }

    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);

    return (width <= 768);
}

export default useCheckMobileScreen
import React, { useEffect } from "react";

function Logo(props) {
    let someValue = "Special Value";

    useEffect(() => {
        console.log("log is loaded")
        if (props.onLoaded)
            props.onLoaded(someValue)
    }, [])

    return (
        <img src={props.logoSrc} />
    )
}

export default Logo
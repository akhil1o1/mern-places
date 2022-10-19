import React from "react";

import classes from "./Map.module.css";

function Map(props) {
    return <div className={`${classes.map} ${props.className}`} style={props.style}>

    </div>
}

export default Map;
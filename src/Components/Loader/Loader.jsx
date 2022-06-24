import React from "react";
import PropTypes from "prop-types";

import "./Loader.scss";

export default function Loader(props) {

    const { size = "medium" } = props;

    return (
        <div className="Loader">
            <div 
                className="Loader--spinner"
                style={{ 
                    width: size === "small" ? 30 : size === "large" ? 100 : 50,
                    height: size === "small" ? 30 : size === "large" ? 100 : 50 
                }} 
            />
        </div>
    );
}

Loader.propTypes = {
    size: PropTypes.oneOf(["small", "medium", "large"]),
}
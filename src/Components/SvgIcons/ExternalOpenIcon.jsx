import React from "react";
import PropTypes from "prop-types";

export default function ExternalOpenIcon(props) {

    const { size ="25px" } = props;

    return (
        <svg 
            stroke="#183052"  
            fill="none"
            strokeWidth="2" 
            viewBox="0 0 24 24" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            height={size} 
            width={size} 
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            <polyline points="15 3 21 3 21 9"></polyline>
            <line x1="10" y1="14" x2="21" y2="3"></line>
        </svg>
    );
}

ExternalOpenIcon.propTypes = {
    size: PropTypes.string
}
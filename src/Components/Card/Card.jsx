import React from "react";
import dayjs from "dayjs";
import PropTypes from "prop-types";

import "./Card.scss";
import ExternalOpenIcon from "Components/SvgIcons/ExternalOpenIcon";

export default function Card(props) {

    const {
        name, author, description, language,
        topContributorUsername, topContributorA, topContributorD,
        topContributorC, updatedAt, url
    } = props;

    return (
        <a
            className="Card"
            href={url}
            rel="noopener noreferrer"
            target="_blank"
        >
            <div className="Card--repositoryInfo">
                <h2 className="Card--repositoryInfo--name">{name}</h2>
                <p className="Card--repositoryInfo--author">{author}</p>
                <p className="Card--repositoryInfo--description">{description}</p>
                <p className="Card--repositoryInfo--language">{language}</p>
            </div>
            <div className="Card--contributorInfo">
                <p className="Card--contributorInfo--name">
                    Most Active Contributor: {" "}
                    <b style={{ color: "#183052" }}>{topContributorUsername}</b>
                </p>

                <div className="Card--contributorInfo--stats">
                    <p className="Card--contributorInfo--stats--stat">
                        <span className="Card--contributorInfo--stats--stat--value">
                            {topContributorA}
                        </span>
                        {" "} additions
                    </p>

                    <p className="Card--contributorInfo--stats--stat">
                        <span className="Card--contributorInfo--stats--stat--value">
                            {topContributorD}
                        </span>
                        {" "} deletions
                    </p>

                    <p className="Card--contributorInfo--stats--stat">
                        <span className="Card--contributorInfo--stats--stat--value">
                            {topContributorC}
                        </span>
                        {" "} commits
                    </p>
                </div>

                <div className="Card--extra">
                    <p className="Card--updatedAt">
                        Updated on {dayjs(updatedAt).format("MMM DD, YYYY")}
                    </p>

                    <ExternalOpenIcon />
                </div>
            </div>
        </a>
    );
}

Card.propTypes = {
    language: PropTypes.string,
    description: PropTypes.string,
    url: PropTypes.string.isRequired,
    topContributorA: PropTypes.number,
    topContributorD: PropTypes.number,
    topContributorC: PropTypes.number,
    name: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
    topContributorUsername: PropTypes.string
}
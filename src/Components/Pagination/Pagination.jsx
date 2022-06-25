import React from "react";

import { usePagination, DOTS } from "Utils/usePagination";

import "./Pagination.scss";

export default function Pagination(props) {

    const {
        onPageChange, totalCount, siblingCount = 1, activePage, maxLimit
    } = props;

    const paginationRange = usePagination({ activePage, totalCount, siblingCount, maxLimit });

    if (activePage === 0 || paginationRange.length < 2) {
        return null;
    }

    const onNext = () => {
        onPageChange(activePage + 1);
    };

    const onPrevious = () => {
        onPageChange(activePage - 1);
    };

    let lastPage = paginationRange[paginationRange.length - 1];

    return (
        <ul
            className="Pagination"
        >
            <li
                className={`Pagination--item${activePage === 1 ? " disabled" : ""}`}
                onClick={onPrevious}
            >
                <div className="arrow left" />
            </li>

            {
                paginationRange.map(pageNumber => {

                    if (pageNumber === DOTS) {
                        return <li key={pageNumber} className="Pagination--item dots">&#8230;</li>;
                    }

                    return (
                        <li
                            key={pageNumber}
                            className={`Pagination--item${pageNumber === activePage ? " active" : ""}`}
                            onClick={() => onPageChange(pageNumber)}
                        >
                            {pageNumber}
                        </li>
                    );
                })
            }

            <li
                className={`Pagination--item${activePage === lastPage ? " disabled" : ""}`}
                onClick={onNext}
            >
                <div className="arrow right" />
            </li>
        </ul>
    );
};
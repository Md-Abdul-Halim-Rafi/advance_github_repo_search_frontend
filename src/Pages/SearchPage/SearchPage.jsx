import React, { Fragment, useEffect, useState } from "react";
import qs from "query-string";
import { Formik, Form } from "formik";
import * as yup from "yup";

import Container from "Components/Container/Container";
import Loader from "Components/Loader/Loader";
import Card from "Components/Card/Card";
import Pagination from "Components/Pagination/Pagination";

import SearchIcon from "Components/SvgIcons/SearchIcon";
import CrossIcon from "Components/SvgIcons/CrossIcon";

import axios from "Utils/axiosInstace";
import { isArrayAndHasContent } from "Utils/utils";

import "./SearchPage.scss";

const schema = yup.object().shape({
    q: yup.string().nullable().required("Search Key is required"),
});

const MAX_LIMIT = 20;

export default function SearchPage() {

    const [loading, setLoading] = useState(false);
    const [repositories, setRepositories] = useState(null);
    const [count, setCount] = useState(null);
    const [activePage, setActivePage] = useState(1);

    const loadRepositories = async (q, page) => {

        setLoading(true);

        try {

            const { data } = await axios.get(
                `/special-search/repositories/?q=${q}&page=${page}`
            );

            setCount(data.count);
            setRepositories(data.repositories);

        } catch (err) {

            console.error(err.response);
        }

        setLoading(false);
    }

    useEffect(() => {

        const { q, page } = qs.parse(window.location.search);

        console.log("q, page");

        if (q) {
            setActivePage(page ? parseInt(page) : 1);
            loadRepositories(q, page ? parseInt(page) : 1);
        }

    }, []);

    const handleSubmit = (values) => {
        window.history.pushState(null, null, `?q=${values.q}&page=${activePage}`);
        loadRepositories(values.q, activePage);
    }

    const handleClear = (fr) => {
        fr.setFieldValue("q", "");
        setRepositories([]);
        setCount(null);
        window.history.pushState(null, null, "/");
    }

    const onPageChange = (page) => {

        const { q } = qs.parse(window.location.search);

        if (q) {
            setActivePage(page);
            window.history.pushState(null, null, `?q=${q}&page=${page}`);
            loadRepositories(q, page);
        }
    }

    return (
        <div className="SearchPage">
            <Container>
                <Formik
                    initialValues={{ q: qs.parse(window.location.search).q || "" }}
                    validationSchema={schema}
                    onSubmit={handleSubmit}
                >
                    {
                        fr => (
                            <Form
                                className="SearchPage--searchDiv"
                                style={{
                                    border: fr.errors.q ? "2px solid crimson" : "none",
                                }}
                            >
                                <input
                                    name="q"
                                    placeholder={
                                        fr.touched.q && fr.errors.q ?
                                            "Search key is required" :
                                            "Search for a repository..."
                                    }
                                    value={fr.values.q}
                                    onBlur={fr.handleBlur}
                                    onChange={fr.handleChange}
                                />

                                {
                                    isArrayAndHasContent(repositories) ?
                                        <button
                                            type="button"
                                            onClick={() => handleClear(fr)}
                                        >
                                            <CrossIcon />
                                        </button> :
                                        <button
                                            type="submit"
                                        >
                                            <SearchIcon />
                                        </button>
                                }
                            </Form>
                        )
                    }
                </Formik>

                <div className="SearchPage--repositories">
                    {
                        loading ?
                            <Loader /> :
                            isArrayAndHasContent(repositories) &&
                            <Fragment>
                                {
                                    repositories.map(repo => (
                                        <Card
                                            key={repo.id}
                                            name={repo.name}
                                            author={repo.author}
                                            description={repo.description}
                                            language={repo.language}
                                            topContributorUsername={repo.topContributorUsername}
                                            topContributorA={repo.topContributorAdditions}
                                            topContributorD={repo.topContributorDeletions}
                                            topContributorC={repo.topContributorCommits}
                                            updatedAt={repo.updatedAt}
                                            url={repo.url}
                                        />
                                    ))
                                }

                                <div className="SearchPage--repositories--pagenation">
                                    <Pagination
                                        totalCount={count}
                                        maxLimit={MAX_LIMIT}
                                        activePage={activePage}
                                        onPageChange={onPageChange}
                                    />
                                </div>

                            </Fragment>
                    }
                </div>
            </Container>
        </div>
    );
}
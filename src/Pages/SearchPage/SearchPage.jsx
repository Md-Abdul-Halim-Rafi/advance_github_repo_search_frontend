import React, { useEffect, useState } from "react";
import qs from "query-string";
import { Formik, Form } from "formik";
import * as yup from "yup";
import axios from "Utils/axiosInstace";

import Container from "Components/Container/Container";
import Card from "Components/Card/Card";

import SearchIcon from "Components/SvgIcons/SearchIcon";
// import CrossIcon from "Components/SvgIcons/CrossIcon";

import "./SearchPage.scss";
import Loader from "Components/Loader/Loader";

const schema = yup.object().shape({
    q: yup.string().required("Search Key is required"),
});

export default function SearchPage(props) {

    const [loading, setLoading] = useState(false);
    const [repositories, setRepositories] = useState([]);
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

        setActivePage(page);
        loadRepositories(q, page);

    }, []);

    const handleSubmit = async (values) => {
        window.history.pushState(null, null, `?q=${values.q}&page=${activePage}`);
        loadRepositories(values.q, activePage);
    }

    return (
        <div className="SearchPage">
            <Container>
                <Formik
                    initialValues={{ q: qs.parse(window.location.search).q }}
                    validationSchema={schema}
                    onSubmit={handleSubmit}
                >
                    {
                        fr => (
                            <Form
                                className="SearchPage--searchDiv"
                                style={{
                                    border: fr.touched.q && fr.errors.q ? "2px solid crimson" : "none",
                                }}
                            >
                                <input
                                    name="q"
                                    placeholder="Search for a repository..."
                                    value={fr.values.q}
                                    onBlur={fr.handleBlur}
                                    onChange={fr.handleChange}
                                />

                                <button>
                                    <SearchIcon />
                                    {/* <CrossIcon /> */}
                                </button>
                            </Form>
                        )
                    }
                </Formik>

                <div className="SearchPage--repositories">
                    {
                        loading ?
                            <Loader /> :
                            repositories.map(repo => (
                                <Card
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
                </div>
            </Container>
        </div>
    );
}
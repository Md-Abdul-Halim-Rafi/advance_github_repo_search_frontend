import React from "react";
import { Formik, Form } from "formik";
import * as yup from "yup";
import axios from "Utils/axiosInstace";

import Container from "Components/Container/Container";
import Card from "Components/Card/Card";

import SearchIcon from "Components/SvgIcons/SearchIcon";
import CrossIcon from "Components/SvgIcons/CrossIcon";

import "./SearchPage.scss";

const schema = yup.object().shape({
    q: yup.string().required("Search Key is required"),
});

export default function SearchPage(props) {

    const handleSubmit = async (values) => {

        try {

            const { data } = await axios.get(
                `/special-search/repositories/?q=${values.q}`
            );

            console.log(data);

        } catch (err) {

            console.error(err.response);
        }
    }

    return (
        <div className="SearchPage">
            <Container>
                <Formik
                    initialValues={{ q: "" }}
                    validationSchema={schema}
                    onSubmit={handleSubmit}
                >
                    {
                        fr => (
                            <Form>
                                <div className="SearchPage--searchDiv">
                                    <input
                                        placeholder="Search for a repository..."
                                        value={fr.values.q}
                                        onBlur={fr.handleBlur}
                                        onChange={fr.handleChange}
                                    />

                                    <button>
                                        <SearchIcon />
                                        {/* <CrossIcon /> */}
                                    </button>
                                </div>
                            </Form>
                        )
                    }
                </Formik>

                <div className="SearchPage--repositories">
                    <Card
                        name="Repository Name"
                        author="Repo Author"
                        description="Repo description"
                        language="Repo language"
                        topContributorUsername="Username"
                        topContributorA={0}
                        topContributorD={0}
                        topContributorC={0}
                        updatedAt="2020-01-01"
                    />
                </div>
            </Container>
        </div>
    );
}
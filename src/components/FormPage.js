import React from 'react';
import {ErrorMessage, Field, FieldArray, Form, Formik} from 'formik';
import {useNavigate} from "react-router-dom";
import {Button, PageHeader, Tabs} from "antd";

const initialValues = { title: '', description: '', attributes: {
        "isbn-10": '',
        "isbn-13": '',
        publisher: '',
        language: '',
        paperback: '',
        dimensions: '',
        author: ''
    }, images: [], tag: '',
    sellOptions: [
    {
        price: '',
        currency: '',
        type: ''
    }]}

export const FormPage = (props) => {
    const navigate = useNavigate()

    return (
    <div>
        <PageHeader
            className="site-page-header-responsive"
            onBack={() => navigate("/products")}
            title="Back to products">
        </PageHeader>
        <h1>Add a new product</h1>
        <Formik
            initialValues={initialValues}
            onSubmit={async (values) => {
                await new Promise((r) => setTimeout(r, 500));
                values.ratings = []
                //values.usin = Date.now().toString()
                values.sellOptions.forEach(option =>
                    option.price = Number.parseInt(option.price))
                await fetch('https://ultimate-ecommerce.v-query.com/api/service-boarding/boarding', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(values)
                }).then((response) => {
                    return response.json();
                })
                    .then((data) => {
                        values.usin = data.usin
                        props.addProduct(values)
                        navigate(`/product/${values.usin}`)
                    });
            }}
        >
            {({ values }) => (
                <Form>
                    <FieldArray name="sellOptions">
                        {({ insert, remove, push }) => (
                            <div>
                                {values.sellOptions.length > 0 &&
                                    values.sellOptions.map((option, index) => (
                                        <div className="row" key={index}>
                                            <div className="col">
                                                <label htmlFor={`sellOptions.${index}.price`}>Price</label>
                                                <Field
                                                    name={`sellOptions.${index}.price`}
                                                    placeholder="50"
                                                    type="text"
                                                />
                                            </div>
                                            <div className="col">
                                                <label htmlFor={`sellOptions.${index}.type`}>Type</label>
                                                <Field
                                                    name={`sellOptions.${index}.type`}
                                                    placeholder="EUR"
                                                    type="text"
                                                />
                                            </div>
                                            <div className="col">
                                                <label htmlFor={`sellOptions.${index}.currency`}>Currency</label>
                                                <Field
                                                    name={`sellOptions.${index}.currency`}
                                                    placeholder="Paperbook"
                                                    type="text"
                                                />
                                            </div>
                                            <div className="col">
                                                <button
                                                    type="button"
                                                    className="secondary"
                                                    onClick={() => remove(index)}
                                                >
                                                    X
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                <button
                                    type="button"
                                    className="secondary"
                                    onClick={() => push({
                                        price: '',
                                        currency: '',
                                        type: ''
                                    })}
                                >
                                    Add SellOption
                                </button>
                            </div>
                        )}
                    </FieldArray>
                    {Object.keys(initialValues).map(key => {
                        return !["sellOptions", "images", "attributes"].includes(key)&& <div
                            style={{padding: 20}}>
                            <div>{key}</div>
                            <Field name={key} />
                            <ErrorMessage name={key} component="div" />
                        </div>
                    })}
                    <div style={{padding: 20}}>
                        <div>images</div>
                        <Field name={`images[0]`} />
                        <ErrorMessage name={`images[0]`} component="div" />
                    </div>
                    {Object.keys(initialValues.attributes).map(key => {
                        return <div style={{padding: 20}}>
                            <div>{key}</div>
                            <Field name={`attributes.${key}`} />
                            <ErrorMessage name={`attributes.${key}`} component="div" />
                        </div>
                    })}
                    <button type="submit">Invite</button>
                </Form>
            )}
        </Formik>
    </div>
)};

export default FormPage;
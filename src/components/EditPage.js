import React from 'react';
import {ErrorMessage, Field, FieldArray, Form, Formik} from 'formik';
import {useNavigate} from "react-router-dom";
import {Button, PageHeader, Tabs} from "antd";
import tagSample from "../mock/tags-sample.json";

export const EditPage = (props) => {
    const navigate = useNavigate()
    const usin = window.location.pathname.slice(9, -5)
    console.log(usin)
    const product = props.state[0].find(p => p.usin === usin)
    console.log(product)

    return (
        <div>
            <PageHeader
                className="site-page-header-responsive"
                onBack={() => navigate("/product/" + usin)}
                title="Back to the product">
            </PageHeader>
            <h1>Edit the product</h1>
            <Formik
                initialValues={product}
                onSubmit={async (values) => {
                    await new Promise((r) => setTimeout(r, 500));
                    props.state[0][props.state[0].findIndex(p => p.usin === usin)] = values
                    localStorage.setItem(values.usin, JSON.stringify(values))
                    alert(JSON.stringify(values, null, 2));
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
                        {Object.keys(product).map(key => {
                            return !["sellOptions", "images", "attributes", "usin", "ratings"].includes(key)&& <div
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
                        {Object.keys(product.attributes).map(key => {
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

export default EditPage;
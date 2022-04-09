import React from 'react';
import {useCallback, useState} from "react";
import { Container } from 'react-bootstrap';
import {useParams, useNavigate} from "react-router-dom";

import { Formik, Form, Field, FieldArray } from 'formik';

import tags from "mock/tags-sample.json";
import {ProductList} from 'utils/product-list'
import {useLoading} from 'utils/loader'
import {getProduct} from 'utils/loader'


export const ProductEdit = () => {
    const params = useParams();
    const navigate = useNavigate();
    let productList = new ProductList();
    const getCurrentProduct = useCallback(
        () => getProduct(params.usin),
        [params])
    const product = useLoading(getCurrentProduct);
    let cardInit = params.usin === undefined ? {
        "data": {
            title: "",
            description: "",
            images: [], 
            tag: "books", 
            attributes:{
                "isbn-10": "",
                "author": "",
                "publisher": "",
                "paperback": "",
                "language": "",
                "isbn-13": "",
                "dimensions": ""
            }, 
            sellOptions: [], 
            ratings:[]
        }
    } : product;

    if (cardInit.error) {
        return <div>Error loading product data {cardInit.error.message}</div>
    }

    if (!cardInit.data || cardInit.loading) {
        return <div>Loading product data</div>
    }

    return <Container>
            <h2>Добавить продукт</h2>
            <Formik
            initialValues={
                cardInit.data
            }
            onSubmit={async (values) => {
                fetch('/api/service-boarding/boarding', 
                {
                    method: params.usin === undefined ? "POST" : "PUT", 
                    body: JSON.stringify(values),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => {
                    return response.json();
                })
                .then(response => {
                    const fwdUrl = '/product/' + response.usin;
                    navigate(fwdUrl);
                })
            }}
            render={({ values }) => (
            <Form>

                <div className="form-group row">
                    <label htmlFor="title" className="col-sm-2 col-form-label">Title</label>
                    <div className="col-sm-10">
                        <Field id="title" name="title" className="form-control"/>
                    </div>
                </div>

                <div className="form-group row">
                    <label htmlFor="description" className="col-sm-2 col-form-label">Description</label>
                    <div className="col-sm-10">
                        <Field id="decription" name="description" component="textarea" className="form-control">
                        </Field>
                    </div>
                </div>

                <div className="form-group row">
                    <label htmlFor="tag" className="col-sm-2 col-form-label">Tag</label>
                    <div className="col-sm-10">
                        <Field id="tag" name="tag" component="select" className="form-control">
                        {
                            tags.map(tag => 
                                <option value={tag.key}>{tag.title}</option>
                            )
                        }
                        </Field>
                    </div>
                </div>
                <div>
                {Object.entries(values.attributes).map((array) => 
                    <div className="form-group row">
                        <label htmlFor={`attributes.${array[0]}`} className="col-sm-2 col-form-label">{array[0]}</label>
                        <div className="col-sm-10">
                            <Field id={`attributes.${array[0]}`} name={`attributes.${array[0]}`} className="form-control"/>
                        </div>
                    </div>
                )}
                </div>
                <FieldArray
                    name="images"
                    render={arrayHelpers => (
                        <div>
                            {values.images.map((image, index) => (
                                <div key={index} className="form-group row row">
                                    <div className="col col-sm-2">
                                        <label htmlFor={`images.${index}`}>Image url</label>
                                    </div>
                                    <div className="col col-sm-8">
                                        <Field name={`images.${index}`} className="form-control"/>
                                    </div>
                                    <div className="col col-sm-2">
                                        <button
                                            type="button"
                                            onClick={() => arrayHelpers.remove(index)}
                                            className="form-control btn btn-danger"
                                        >
                                            -
                                        </button>
                                    </div>
                                </div>
                            ))}
                        <button
                            type="button"
                            onClick={() => arrayHelpers.push()}
                            className="form-control btn btn-success"
                        >
                            +
                        </button>
                        </div>
                    )}
                />
                <FieldArray
                    name="sellOptions"
                    render={arrayHelpers => (
                        <div className="row">
                            <div className="col col-sm-2">
                                <label>Selloptions</label>
                            </div>
                            <div className="col col sm-10">
                                {values.sellOptions.map((sellOption, index) => (
                                    <div key={index} className="row">
                                        <div className="col col-sm-3">
                                            <Field name={`sellOptions.${index}.price`} className="form-control"/>
                                        </div>
                                        <div className="col col-sm-3">
                                            <Field name={`sellOptions.${index}.currency`} component="select" className="form-control">
                                                <option value='EUR'>EUR</option>
                                                <option value='USD'>USD</option>
                                            </Field>
                                        </div>
                                        <div className="col col-sm-3">
                                            <Field name={`sellOptions.${index}.type`} component="select" className="form-control">
                                                <option type='Paperback'>Paperback</option>
                                                <option value='Audiobook'>Audiobook</option>
                                            </Field>
                                        </div>
                                        <div className="col col-sm-3">
                                            <button
                                                type="button"
                                                onClick={() => arrayHelpers.remove(index)}
                                                className="form-control btn btn-danger"
                                            >
                                                -
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button
                                type="button"
                                onClick={() => arrayHelpers.push({ price: '300', currency: 'EUR', type: 'Paperback'})}
                                className="form-control btn btn-success"
                            >
                                +
                            </button>
                        </div>
                    )}
                />
                <button type="submit" className="form-control btn btn-primary">Submit</button>
            </Form>
            )}
            />
        </Container>
}
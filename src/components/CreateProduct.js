import {React, useCallback} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import Button from 'react-bootstrap/Button'
import { Formik, Field, Form, FieldArray } from 'formik';
import "../css/CreateProduct.css"
import {useLoading, getProduct, updateProduct} from './server/request';
import tags from '../mock/tags-sample.json'

export const CreateProduct = () => {
  const params = useParams()
  const navigate = useNavigate()
  const getProductData = useLoading(useCallback(
    () => getProduct(params.usin),
    [params.usin]
))
  let initProduct
  if (params.usin === undefined) {
    initProduct = {
        usin: Date.now().toString(),
        title: "",
        description: "",
        images: [], 
        tag: "", 
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
        ratings:[]}
} else {
    const productResponse = getProductData;
    
    if (productResponse.error) {
        return <div>Error loading product data ({productResponse.error.message})</div>;
    }

    if (productResponse.loading) {
        return <div>Loading product data...</div>
    }

    if (!productResponse.data) {
        return <div>
            404 Product not found
        </div>
    }

    initProduct = productResponse.data
} 

  return <div className='main-form-container'>
    <h3>Create new product</h3>
    <Formik
      initialValues={initProduct}
      onSubmit={async (values) => {
        updateProduct(values, params.usin)
        .then(response => {
            navigate(`/product/${response.usin}`)
        })
      }}
    >
    {({ values }) => (
      <Form className='form-container'>
        <div className="form-field">
            <label htmlFor="title">Title</label>
            <Field id="title" name="title" placeholder="My cool book" />
        </div>

        <div className="form-field">
            <label htmlFor="description">Descriprion</label>
            <Field id="description" name="description" placeholder="My cool description" />
        </div>

        <div className="form-field">
            <label htmlFor="images">Images urls</label>
            <FieldArray name="images"
              render={arrayHelpers => (
                <div style={{width: "70%"}}>
                    {values.images.map((image, index) => (
                        <div className="horizontal-container" key={index} >
                        <div className='horisontal-padding'>
                            <label htmlFor={`images.${index}`} className='horizontal-margin'>Url</label>
                            <Field name={`images.${index}`} placeholder="My cool url" type="text" className='horizontal-margin'/>
                        </div>
                        <div className='horizontal-margin'>
                            <button type="button" onClick={() => arrayHelpers.remove(index)}>Remove url</button>
                        </div>
                        </div>
                    ))}
                    <button type="button" onClick={() => arrayHelpers.push()}>Add url</button>
                </div>
              )}  />
        </div>

        <div className="form-field">
            <label htmlFor="tag">Tag</label>
            <Field id="tag" name="tag" component="select">
                {
                    tags.map(tag => <option value={tag.key}>{tag.title}</option>)
                }
            </Field>
        </div>
        {
           Object.entries(values.attributes).map(array => 
            <div className="form-field">
                <label htmlFor={`attributes.${array[0]}`} style={{textTransform: 'capitalize'}}>{array[0]}</label>
                <Field id={`attributes.${array[0]}`} name={`attributes.${array[0]}`} placeholder={`My cool ${array[0]}`}/>
            </div>
            )
        }
        <div className="form-field">
            <label htmlFor="sellOptions">Sell options</label>
            <FieldArray name="sellOptions">
                {({ insert, remove, push }) => (
                <div style={{width: "70%"}}>
                    {values.sellOptions.length > 0 &&
                    values.sellOptions.map((option, index) => (
                        <div className="horizontal-container" key={index} >
                            <div className="form-field">
                                <label htmlFor={`sellOptions.${index}.price`} className='horizontal-margin'>Price</label>
                                <Field name={`sellOptions.${index}.price`} placeholder="My cool price" type="text" className='horizontal-margin'/>
                            </div>


                            <div className="form-field">
                                <label htmlFor={`sellOptions.${index}.currency`} className='horizontal-margin'>Currency</label>
                                <Field name={`sellOptions.${index}.currency`} placeholder="My cool currency" type="text" className='horizontal-margin'/>
                            </div>

                            <div className="form-field">
                                <label htmlFor={`sellOptions.${index}.type`} className='horizontal-margin'>Type</label>
                                <Field name={`sellOptions.${index}.type`} placeholder="Type" type="text" className='horizontal-margin'/>
                            </div>
                        <div className='horizontal-margin'>
                            <button type="button"onClick={() => remove(index)}>Remove option</button>
                        </div>
                        </div>
                    ))}
                    <button type="button" onClick={() => push({price: "", currency: "", type: ""})}>Add option</button>
                </div>
                )}
            </FieldArray>
        </div>

        <button type="submit">Submit</button>
      </Form>
    )}
    </Formik>
    <Button style={{width: "15%", marginTop: "0.5%"}}variant="outline-dark" size="med" onClick={() => navigate("/products")}>Back</Button>
  </div>
}
import {Modal, Form, Input, Button, Select, Divider, Typography, Space} from "antd";
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import {emptyProduct} from "../utils";
import {DataModel} from "./DataModel.tsx";

const { Option } = Select

export const ProductForm = (props) => {
    const [form] = Form.useForm();
    const productExists = props.product !== undefined
    let ratings = []
    if (productExists) {
        form.setFieldsValue(props.product);
        ratings = props.product.ratings
    } else {
        form.setFieldsValue(emptyProduct);
    }

    const saveProduct = (values) => {
        values.ratings = ratings;
        console.log(values)
        if (productExists) {
            DataModel.updateProduct(values)
                .then(response => {
                    window.location = '/product/'+response.usin;
                })
                .catch(err => console.error(err));
        } else {
            delete values['usin'];
            DataModel.createProduct(values)
                .then(response => {
                    window.location = '/product/'+response.usin;
                })
                .catch(err => console.error(err));
        }
        props.close_form()
    }

    return <Modal visible={props.formVisible} onOk={() => {saveProduct(form.getFieldsValue())}} onCancel={() => {props.close_form()}}
                  title={productExists ? "Edit product" : "Create new product"} okText={"Save"}
                  cancelText={"Cancel"}>
        <Form form={form}>
            <Form.Item hidden={true} label={"USIN (autogen)"} name={"usin"}><Input disabled/></Form.Item>
            <Form.Item label={"Product name"} name={"title"}><Input/></Form.Item>
            <Form.Item label={"Product description"} name={"description"}><Input.TextArea rows={5}/></Form.Item>
            <Divider><Typography.Title level={5} style={{ margin: 0 }}>
                Additional attributes
            </Typography.Title></Divider>
            <Form.Item label={"Author"} name={["attributes", "author"]}><Input/></Form.Item>
            <Form.Item label={"Paperback"} name={["attributes", "paperback"]}><Input/></Form.Item>
            <Form.Item label={"Dimensions"} name={["attributes", "dimensions"]}><Input/></Form.Item>
            <Form.Item label={"Language"} name={["attributes", "language"]}><Input/></Form.Item>
            <Form.Item label={"Publisher"} name={["attributes", "publisher"]}><Input/></Form.Item>
            <Form.Item label={"ISBN-13"} name={["attributes", "isbn-13"]}><Input/></Form.Item>
            <Form.Item label={"Tag"} name={"tag"}><Input/></Form.Item>
            <Divider><Typography.Title level={5} style={{ margin: 0 }}>
                Product Images
            </Typography.Title></Divider>
            <Form.List name={"images"}>
                {(fields, {add, remove}) => (<>
                    {fields.map((field) => (<Form.Item required={false} key={field.key}>
                        <Form.Item {...field} noStyle>
                            <Input placeholder="image url" style={{width: '90%'}}/>
                        </Form.Item>
                        <MinusCircleOutlined onClick={() => remove(field.name)}/>
                    </Form.Item>))}
                    <Form.Item>
                        <Button type="dashed" onClick={() => add()} icon={<PlusOutlined/>}>
                            Add an image
                        </Button>
                    </Form.Item>
                </>)}
            </Form.List>
            <Divider><Typography.Title level={5} style={{ margin: 0 }}>
                Sell Options
            </Typography.Title></Divider>
            <Form.List name="sellOptions">
                {(fields, { add, remove }) => (
                    <>
                        {fields.map(({ key, name, ...restField }) => (
                            <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                <Form.Item
                                    {...restField}
                                    name={[name, 'price']}
                                    rules={[{ required: true, message: 'Price is required' }]}
                                >
                                    <Input placeholder="Price of product" />
                                </Form.Item>
                                <Form.Item
                                    {...restField}
                                    name={[name, 'currency']}
                                    rules={[{ required: true, message: 'Currency is required' }]}
                                >
                                    <Select placeholder="Select currency">
                                        <Option value="EUR">Euro</Option>
                                        <Option value="USD">US Dollar</Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    {...restField}
                                    name={[name, 'type']}
                                    rules={[{ required: true, message: 'Type is required' }]}
                                >
                                    <Input placeholder="Type of sell option" />
                                </Form.Item>
                                <MinusCircleOutlined onClick={() => remove(name)} />
                            </Space>
                        ))}
                        <Form.Item>
                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                Add field
                            </Button>
                        </Form.Item>
                    </>
                )}
            </Form.List>
        </Form>
    </Modal>;

}
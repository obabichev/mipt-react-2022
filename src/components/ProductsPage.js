import React, {useState} from 'react';
import {Card, Col, Image, Row, Typography, Rate, Input, Button, Form, Modal} from 'antd';
import {MinusCircleOutlined, PlusOutlined} from '@ant-design/icons';
import {countProductMetrics, useLocalStorage} from "../utils";
import {v4 as uuidv4} from 'uuid';

const {Title, Link, Text, Paragraph} = Typography;

const ProductCard = (props) => {
    const product = props.prod;
    const [count, sum] = countProductMetrics(product);

    return <Card style={{width: 800, margin: 20}}>
        <>
            <Row>
                <Col span={6}>
                    <Image src={product.images && product.images[0] && product.images[0]}/>
                </Col>
                <Col span={17} offset={1}>
                    <Title level={4}>
                        <Link href={`/product/${product.usin}`}>{product.title}</Link>
                    </Title>
                    <Paragraph>
                        <Text>Автор: {product.attributes.author}</Text>
                    </Paragraph>
                    <Rate allowHalf disabled={true} value={count > 0 ? sum / count : 0}/>
                    <span className="ant-rate-text">{count}</span>
                    <Paragraph>
                        <Button onClick={props.onEditItemClick}>Изменить</Button>
                    </Paragraph>
                </Col>
            </Row>
        </>
    </Card>;
}

const ProductEditForm = (props) => {
    return <Modal visible={props.visible} onOk={props.onOk} onCancel={props.onCancel}
                  title={props.usin ? "Редактирование продукта" : "Создание продукта"} okText={"Сохранить"}
                  cancelText={"Отмена"}>
        <Form form={props.form}>
            <Form.Item hidden={true} name={"usin"}>
                <Input/>
            </Form.Item>

            <Form.Item label={"Название продукта"} name={"title"}>
                <Input/>
            </Form.Item>

            <Form.Item label={"Описание продукта"} name={"description"}>
                <Input.TextArea rows={4}/>
            </Form.Item>

            <Form.Item label={"Автор"} name={["attributes", "author"]}>
                <Input/>
            </Form.Item>

            <Form.Item label={"Число страниц"} name={["attributes", "paperback"]}>
                <Input/>
            </Form.Item>

            <Form.Item label={"Размеры"} name={["attributes", "dimensions"]}>
                <Input/>
            </Form.Item>

            <Form.Item label={"Язык"} name={["attributes", "language"]}>
                <Input/>
            </Form.Item>

            <Form.Item label={"Издатель"} name={["attributes", "publisher"]}>
                <Input/>
            </Form.Item>

            <Form.Item label={"ISBN-13"} name={["attributes", "isbn-13"]}>
                <Input/>
            </Form.Item>

            <Form.Item label={"Тег"} name={"tag"}>
                <Input/>
            </Form.Item>

            <Form.List name={"images"}>
                {(fields, {add, remove}) => (<>
                    {fields.map((field) => (<Form.Item required={false} key={field.key}>
                        <Form.Item {...field} noStyle>
                            <Input placeholder="URL картинки" style={{width: '90%'}}/>
                        </Form.Item>
                        <MinusCircleOutlined onClick={() => remove(field.name)}/>
                    </Form.Item>))}

                    <Form.Item>
                        <Button
                            type="dashed"
                            onClick={() => add()}
                            icon={<PlusOutlined/>}
                        >
                            Добавить картинку
                        </Button>
                    </Form.Item>
                </>)}
            </Form.List>
        </Form>
    </Modal>;
}

export const ProductsPage = () => {
    document.title = 'Продукты';

    const [products, setProducts] = useLocalStorage();

    const [searchText, setSearchText] = useState('');
    const onTextChange = (e) => {
        setSearchText(e.target.value.toLowerCase());
    };

    const [editFormVisible, setEditFormVisible] = useState(false);

    const onFormCancel = () => {
        setEditFormVisible(false);
    }

    const [form] = Form.useForm();

    const onNewItemClick = () => {
        form.resetFields();
        setEditFormVisible(true);
    };

    const onFormOk = () => {
        const values = form.getFieldsValue();

        if (values.usin) {
            setProducts(products.map((product) => product.usin === values.usin ? {...product, ...values} : product));
        } else {
            setProducts([...products, {...values, usin: uuidv4()}]);
        }

        setEditFormVisible(false);
    };

    const onEditItemClickForProduct = (product) => {
        return () => {
            form.resetFields();
            form.setFieldsValue(product);
            setEditFormVisible(true);
        };
    };

    return <>
        <ProductEditForm visible={editFormVisible} onOk={onFormOk} onCancel={onFormCancel} form={form}/>
        <Input placeholder="Введите часть названия или описания продукта" style={{width: 800, margin: 20}}
               onChange={onTextChange}/>
        <Button onClick={onNewItemClick}>Создать</Button>
        <div>
            {products.filter((product) => product.title.toLowerCase().includes(searchText) || product.description.toLowerCase().includes(searchText))
                .map((product) => <ProductCard prod={product} onEditItemClick={onEditItemClickForProduct(product)}/>)}
        </div>
    </>;
}
import React from 'react';
import { API_ROOT } from '../constants';
import { Form, Icon, Input, Button } from 'antd';

class NormalLoginForm extends React.Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                var body = JSON.stringify({
                    itemname: values.itemname,
                    imageUrl: values.image_url,
                    username: values.owner,
                    quantity: parseInt(values.quantity, 10),
                })
                console.log(body);
                fetch(`${API_ROOT}/AddNewItem`, {
                    method: 'POST',
                    body: JSON.stringify({
                        itemname: values.itemname,
                        imageUrl: values.image_url,
                        username: values.owner,
                        quantity: parseInt(values.quantity, 10),
                    })
                })
                    .then((response) => {
                        if (response.ok) {
                            console.log(response);
                            return response.text();
                        }
                        throw new Error(response.statusText);
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="add-item-form">
                <Form.Item>
                    {getFieldDecorator('itemname', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input
                            prefix={<Icon type="trophy" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Item Name"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('owner', {
                        rules: [{ required: true, message: 'Please input the owner!' }],
                    })(
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Owner"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('image_url', {
                        initialValue: "",
                        rules: [{ required: false }],
                    })(
                        <Input
                            prefix={<Icon type="link" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Image URL"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('quantity', {
                        rules: [{ required: true, message: 'Please input the quantity!' }],
                    })(
                        <Input
                            prefix={<Icon type="number" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Quantity"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="add-item-form-button">
                        Add Items
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

export const AddItemsWindow = Form.create({ name: 'AddItemsWindow' })(NormalLoginForm);
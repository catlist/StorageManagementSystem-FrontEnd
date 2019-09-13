import React from 'react';
import { API_ROOT } from '../constants';
import { Button, Table } from 'antd';

export class Search extends React.Component {
    state = {
        items: []
    };

    handleListAll = e => {
        e.preventDefault();
        fetch(`${API_ROOT}/Search`, {
            method: 'POST',
            body: JSON.stringify({
                searchBy: "all",
            })
        })
            .then((response) => {
                if (response.ok) {
                    console.log(response);
                    return response.text();
                }
                throw new Error(response.statusText);
            })
            .then((data) => {
                const body = JSON.parse(data);
                console.log(body);
                var items = []
                body.forEach((element, i) => {
                    console.log(element)
                    items.push({
                        key: i,
                        itemname: element["itemname"],
                        image_url: element["image_url"],
                        username: element["username"],
                        qty: element["quantity"],
                        address: element["address"]
                    })
                });
                console.log(items);
                this.setState({
                    items: items,
                })
            })
            .catch((err) => {
                console.log(err);
            })
    };

    render() {
        const columns = [
            {
                title: 'Item name',
                dataIndex: 'itemname',
                // specify the condition of filtering result
                // here is that finding the name started with `value`
                sorter: (a, b) => a.itemname.length - b.itemname.length,
                sortDirections: ['descend', 'ascend'],
            },
            {
                title: 'Item Image',
                dataIndex: 'image_url',
                sortDirections: ['descend', 'ascend'],
                sorter: (a, b) => a.image_url - b.image_url,
            },
            {
                title: 'Owner',
                dataIndex: 'username',
                sorter: (a, b) => a.username.length - b.username.length,
                sortDirections: ['descend', 'ascend'],
            },
            {
                title: 'Quantity',
                dataIndex: 'qty',
                sortDirections: ['descend', 'ascend'],
                sorter: (a, b) => a.qty - b.qty,
            },
            {
                title: 'Address',
                dataIndex: 'address',
                sorter: (a, b) => a.address.length - b.address.length,
                sortDirections: ['descend', 'ascend'],
            },
        ];

        function onChange(pagination, filters, sorter) {
            console.log('params', pagination, filters, sorter);
        }

        const { items } = this.state;

        return (
            <div className="search">
                <p>This is search!</p>
                <Button type="primary" onClick={this.handleListAll}>List 'em all!</Button>
                <Table columns={columns} dataSource={items} onChange={onChange} />
            </div>
        );
    }
}
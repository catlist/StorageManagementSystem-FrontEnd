import React from 'react';
import { Search } from './Search';
import { Tabs } from 'antd';
import { AddItemsWindow } from './AddItemForm';

const TabPane = Tabs.TabPane;

export class Main extends React.Component {
    render() {
        return (
            <div className="main">
                <p>This is main!</p>
                <Tabs className='main-tabs' defaultActiveKey="2" >
                    <TabPane tab="Search" key="1">
                        <div>
                            <p>Search Items</p>
                            <Search />
                        </div>
                    </TabPane>
                    <TabPane tab="Add" key="2">
                        <div>
                            <p>Add Items</p>
                            <AddItemsWindow />
                        </div>
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}
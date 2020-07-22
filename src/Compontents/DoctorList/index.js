import React, { Component } from 'react';
import './style.css';
import 'antd/dist/antd.css';
import {
    Input,
    Form,
    Select,
    Button,
    DatePicker,
    Table,
} from 'antd';
import { SearchOutlined, RedoOutlined } from '@ant-design/icons'
const { RangePicker } = DatePicker;
const rangeConfig = {
    rules: [
        {
            type: 'array',
            required: true,
            message: 'Please select time!',
        },
    ],
};
//HOSNAME: "倍康224测试医院", DoctorId: "7E52997018A9477BAF742226B3F5F73E", DOCTORCODE: "7888", DOCTORNAME: "邓旭", MOBILE: "15979102993",
const columns = [
    {
        title: '序列',
        dataIndex: 'no',
        key: 'no',
        render:(text,record,index)=>`${index+1}` //设置序列号
    },
    {
        title: '姓名',
        dataIndex: 'DOCTORNAME',
        key: 'DOCTORNAME',
        render: text => <a>{text}</a>
    },
    {
        title: '手机号',
        dataIndex: 'MOBILE',
        key: 'MOBILE',
    },
    {
        title: '归属实体医院',
        key: 'HOSNAME',
        dataIndex: 'HOSNAME',
    },
    {
        title: '归属互联网医院',
        key: 'NETHOSNAME',
        dataIndex: 'NETHOSNAME'
    },
    {
        title: '申请入驻时间',
        key: 'ApplicationTime',
        dataIndex: 'ApplicationTime'
    },
    {
        title: '入驻审核',
        key: 'HOSVERIFYRESULT',
        dataIndex: 'HOSVERIFYRESULT'
    },
    {
        title: '入驻审核时间',
        key: 'INVITEDATE',
        dataIndex: 'INVITEDATE'
    },
];

class index extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const data = this.props.data;
        
        return (
            <div className='content-ManageBox'>
                <div className='content-ManageBox-header'>
                    <div className='content-ManageBox-header-title'>
                        <span>医生管理</span>
                    </div>
                </div>
                <div className='content-ManageBox-body'>
                    <div className='content-ManageBox-body-card'>
                        <div className='card-body'>
                            <Form>
                                <div className='card-form-item'>

                                    <div>
                                        <Form.Item label="入驻审核状态：">
                                            <Select defaultValue="全部" style={{ width: 140 }} onChange={this.handleSelectChange}>
                                                <Select.Option value="全部" selected="">全部</Select.Option>
                                                <Select.Option value="待审核">待审核</Select.Option>
                                                <Select.Option value="审核中">审核中</Select.Option>
                                                <Select.Option value="审核通过">审核通过</Select.Option>
                                                <Select.Option value="审核不通过">审核不通过</Select.Option>
                                                <Select.Option value="未申请">未申请</Select.Option>
                                            </Select>
                                        </Form.Item>
                                    </div>
                                </div>
                                <div className='card-form-item'>
                                    <Form.Item label="互联网医院：">
                                        <Input style={{ width: 260 }} />
                                    </Form.Item>
                                </div>
                                <div className='card-form-item'>
                                    <Form.Item name="range-picker" label="申请入驻时间：" {...rangeConfig}>
                                        <RangePicker />
                                    </Form.Item>
                                </div>
                               
                                <div className='card-form-item'>
                                    <Input placeholder="请输入医生姓名/手机号" style={{ width: 200 }} />

                                </div>
                                <div className='card-form-item'>

                                    <Button type="primary" icon={<SearchOutlined />} >
                                        搜索
                                    </Button>

                                    <Button icon={<RedoOutlined />} >
                                        重置
                                    </Button>

                                </div>
                            </Form>
                        </div>
                    </div>
                    <div className='content-ManageBox-body-list'>
                    <Table columns={columns} dataSource={data} />
                    </div>
                </div>
            </div>
        );
    }

}

export default index;
import React, { Component } from 'react';
import TextArea from 'antd/lib/input/TextArea';
import 'antd/dist/antd.css';
import axios from 'axios';
import {
    Form,
    Select,
    Switch,
    message
} from 'antd';
const { Option } = Select;


class TransferHelpSetListInsert extends Component {
    constructor(props) {
        super(props);
        this.state = {
            HospitalName: "",
            userType: "",
            appId: "",
            stateCheck: Boolean,
            showHelp: "",
            ListData: []
        }
        this.handleHOSNAME = this.handleHOSNAME.bind(this);
        this.handleHosList = this.handleHosList.bind(this);
    }
    componentDidMount = () => {
        this.handleHosList();
    }
    render() {
        
        return (
            <Form>
                <Form.Item name='HospitalName' label="所属医院" rules={[{ required: true, message: "请输入项为必输项目" }]}>
                    <Select onChange={this.handleSelectChange}  placeholder="输入搜索或下拉选择">
                        {this.state.ListData.map(item => (<Option key={item.HOSPITALID} value={item.HOSPITALID}>{item.HOSNAME}</Option>))}
                    </Select>

                </Form.Item>
                <Form.Item name='userType' label="用户使用类型" rules={[{ required: true, message: "请输入项为必输项目"}]}>
                    <Select
                        placeholder="输入搜索或下拉选择"
                    >
                        <Option value="patient">病人端</Option>
                        <Option value="staff">医护端</Option>

                    </Select>
                </Form.Item>

                <Form.Item name='appId' label="应用编号" rules={[{ required: true, message: "请输入项为必输项目" }]}>
                    <Select placeholder="输入搜索或下拉选择">
                        <Option value="edition001">版本1</Option>
                        <Option value="edition002">版本2</Option>
                        <Option value="edition003">版本3</Option>
                        <Option value="edition004">版本4</Option>
                        <Option value="edition005">版本5</Option>
                    </Select>
                </Form.Item>
                <Form.Item label="开/关" name="stateCheck">
                    <Switch checkedChildren="开" unCheckedChildren="关" defaultChecked/>
                </Form.Item>
                <Form.Item name='showHelp' label="指引帮助" rules={[{ required: true, message: "请输入项为必输项目" }]}>
                    <TextArea />
                </Form.Item>
            </Form>
        );
    }
    handleHOSNAME = (e) => {
        this.setState({
            HospitalName: e.target.title
        })
    }
    //医院列表
    handleHosList = () => {
        axios.post('https://bitnet.519e.com.cn/OnlineConsultationManageTest/api/Hospital/GetHospitalSelList', {

        }, { headers: { "Tick": window.localStorage.Tick } })
            .then((res) => {
                this.setState({
                    ListData: res.data.Data
                })
                console.log(res)
            }).catch((err) => {
                console.log(err)
            })
    }
  
}

export default TransferHelpSetListInsert;
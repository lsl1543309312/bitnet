import React, { Component } from 'react';
import TextArea from 'antd/lib/input/TextArea';
import 'antd/dist/antd.css';
import axios from 'axios';
import {
    Form,
    Select,
    Switch,
} from 'antd';
const { Option } = Select;

class TransferHelpSetListInsert extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ListData: []
        }

        this.handleHosList = this.handleHosList.bind(this);
    }
    componentDidMount = () => {

    }
    render() {
        const record = this.props.record;
        console.log(record)
        return (
            <Form >
             
                <Form.Item name='HospitalName' label={"所属医院"} rules={[{ required: true }]} onChange={this.props.handleHOSNAME}>

                    <Select disabled="false" defaultValue={record.HOSPITALID} >
                        <Option key={record.HOSPITALID} value={record.HOSPITALID}>{record.hospitalName}</Option>
                    </Select>


                </Form.Item>
                <Form.Item name='userType' label="用户使用类型" rules={[{ required: true }]}  >
                    <Select defaultValue={record.TYPE} onChange={this.props.handleTYPE}>
                        <Option value="patient">病人端</Option>
                        <Option value="staff">医护端</Option>
                    </Select>
                </Form.Item>

                <Form.Item name='appId' label="应用编号" rules={[{ required: true }]}>
                    <Select  disabled="false" defaultValue={record.APPREGID}>
                        <Option value={record.APPREGID}>{record.APPREGID}</Option>
                    </Select>
                </Form.Item>
                <Form.Item label="开/关" name="stateCheck" >
                    <Switch defaultChecked={record.STATUS == 1 ? 'defaultValue' : ''} checkedChildren="开" unCheckedChildren="关"  onChange={this.props.handleSTATUS} />
                </Form.Item>
                <Form.Item name='showHelp'  label="指引帮助"    rules={[{required: true,message: '请输入项为必输项目'}]} onChange={this.props.handleHELP}>
                    <TextArea defaultValue={record.CONTENT}  />
                    {console.log(record.CONTENT)}

                </Form.Item>
            </Form>
        );
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
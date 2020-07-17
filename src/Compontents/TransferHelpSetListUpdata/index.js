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

        this.handleHosList = this.handleHosList.bind(this);
    }
    componentDidMount = () => {

    }
    render() {
        const record = this.props.record;
        return (
            <Form>
                {console.log(this.props.record)}
                <Form.Item name='HospitalName' label={"所属医院"} rules={[{ required: true }]}>

                    <Select disabled="false" defaultValue={record.HOSPITALID} >
                        <Option key={record.HOSPITALID} value={record.HOSPITALID}>{record.hospitalName}</Option>
                    </Select>


                </Form.Item>
                <Form.Item name='userType' label="用户使用类型" rules={[{ required: true }]} >
                    <Select defaultValue={record.TYPE}>
                        <Option value="patient">病人端</Option>
                        <Option value="staff">医护端</Option>
                    </Select>
                </Form.Item>

                <Form.Item name='appId' label="应用编号" rules={[{ required: true }]}>
                    <Select disabled="false" defaultValue={record.APPREGID}>
                        <Option value={record.APPREGID}>{record.APPREGID}</Option>
                    </Select>
                </Form.Item>
                <Form.Item label="开/关" name="stateCheck">
                    <Switch checkedChildren="开" unCheckedChildren="关" checked={record.STATUS == 1 ? true : false} />
                </Form.Item>
                <Form.Item name='showHelp' label="指引帮助" rules={[{ required: true, message: "该输入项为必输项目" }]}>
                    <TextArea defaultValue={record.CONTENT} />
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
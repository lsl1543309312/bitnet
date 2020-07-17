import React, { Component } from 'react';
import './style.css'
import 'antd/dist/antd.css';
import axios from 'axios';
import {
    PlusOutlined,
    SearchOutlined,
    QuestionCircleTwoTone
} from '@ant-design/icons'
import {
    Input,
    Form,
    Select,
    Button,
    DatePicker,
    Table,
    Tag,
    Space,
    Modal,
    Switch,

} from 'antd';
import TransferHelpSetListUpdate from '../TransferHelpSetListUpdata/index';
import TransferHelpSetListInsert from '../TransferHelpSetListInsert';
import FormItem from 'antd/lib/form/FormItem';
import index from '../DoctorList';
import { Link } from 'react-router-dom';
const { Option } = Select
const { confirm } = Modal
//修改的
function showEdit(record, i) {

    confirm({
        title: '修改转诊预约跳转地址信息',
        content: <TransferHelpSetListUpdate record={record} />,
        okText: "确定",
        cancelText: "取消",
        onOk() {
            axios.post('https://bitnet.519e.com.cn/OnlineConsultationManageTest/api/TransferHelpSet/Edit', {
                APPREGID: i.state.APPREGID,
                CONTENT: i.state.showHelp,
                HOSPITALID: i.state.hospitalid,
                STATUS: i.state.stateCheck,
                TYPE: i.state.userType,
            }, { headers: { "Tick": window.localStorage.Tick } }
            ).then((res) => {
                if (res.data.ResultCode === 0) {
                    i.setState({
                        data: res.data.Data
                    })
                    alert("操作成功")
                } else {
                    alert(res.data.ResultMsg)
                }
            }).catch((err) => {
                alert(err.data.msg)
            })
        }

    })
}
//删除
function ModalDel(record, i) {
    confirm({
        title: '修改转诊预约跳转地址信息',
        content: "物理删除数据",
        okText: "确定",
        cancelText: "取消",
        onOk() {
            i.setState({
                delVisible: false,
            })
            axios.post('https://bitnet.519e.com.cn/OnlineConsultationManageTest/api/TransferHelpSet/Delete', {
                APPREGID: record.APPREGID,
                HOSPITALID: record.HOSPITALID
            }, { headers: { "Tick": window.localStorage.Tick } }
            ).then((res) => {
                if (res.data.ResultCode == 0) {
                    i.setState({
                        data: res.data.Data
                    })
                    i.handleSelect();
                    alert("删除成功！")
                } else {
                    alert(res.data.ResultMsg)
                }
            })
        }
    })
}
class TransferHelpSetList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            insertVisible: false,//新增会话框
            updateVisible: false,//修改会话框
            delVisible: false,//删除会话框的可视状态
            HOSNAME: '',//医院名称
            userType: "",//用户类型
            showHelp: "",//指引帮助
            stateCheck: false,//状态switch
            ListData: [],//医院list数据
            hospitalid: '',//医院编号
            data: [],   //table数据
            APPREGID: ''//应用编号
        };
        this.handleHosList = this.handleHosList.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleDelBind = this.handleDelBind.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleDel = this.handleDel.bind(this);
        this.handleEditBind = this.handleEditBind.bind(this);
    }
    componentDidMount = () => {
        this.handleHosList();
        this.handleSelect();

    }

    render() {
        // const data = this.props.data;

        const columns = [
            {
                title: '序列',
                dataIndex: 'no',
                key: 'no',
                render: (text, record, index) => `${index + 1}` //设置序列号
            },
            {
                title: '医院',
                dataIndex: 'hospitalName',
                key: 'hospitalName',
            },
            {
                title: '用户使用类型',
                dataIndex: 'TYPE',
                key: 'TYPE',
            },
            {
                title: '应用编号',
                key: 'APPREGID',
                dataIndex: 'APPREGID',
            },
            {
                title: '状态',
                key: 'STATUS',
                dataIndex: 'STATUS'
            },
            {
                title: '新增时间',
                key: 'CREATEDT',
                dataIndex: 'CREATEDT'
            },
            {
                title: '操作',
                key: 'operation',
                dataIndex: 'operation',
                render: (test, record) => (
                    <Space size="middle">
                        <a onClick={() => showEdit(record, this)}>修改</a>
                        {/* 修改弹框,
                        这种写法会弹出4个弹框，不可，包括他的传值record，会将所有的数据传递过去 */}
                        {/* <Modal
                            okText="确认"
                            cancelText="取消"
                            title="修改转诊预约跳转地址信息"
                            okType="primary"
                            onOk={this.handleEdit}
                            onCancel={() => this.handleUpdateVisible(false)}
                            visible={this.state.updateVisible}
                        >
                            
                            <TransferHelpSetListUpdate record={record} />
                        </Modal> */}
                        <a onClick={() => { ModalDel(record, this) }}>删除</a>
                        {/* 删除弹框 */}
                        {/* <Modal
                            icon={<QuestionCircleTwoTone />}
                            okText="确认"
                            cancelText="取消"
                            title="确认删除？"
                            okType="primary"
                            onOk={this.handleDel}
                            onCancel={() => this.handleDelVisible(false)}
                            visible={this.state.delVisible}
                        >
                            物理删除数据
                        </Modal> */}

                    </Space>)
            }
        ];

        return (
            <div className='content-ManageBox'>
                <div className='content-ManageBox-header'>
                    <div className='content-ManageBox-header-title'>
                        <span>转诊预约跳转地址管理</span>
                    </div>
                </div>
                <div className='content-ManageBox-body'>
                    <Button type="primary" icon={<PlusOutlined />} style={{ marginBottom: 20 }} onClick={() => this.handleInsertVisible(true)}>添加</Button>
                    {/* 新增的弹框 */}
                    <Modal
                        title="新增转诊预约跳转地址信息"
                        okText="确认"
                        cancelText="取消"
                        okType="primary"
                        visible={this.state.insertVisible}
                        onOk={() => this.handleInsertVisible(false)}
                        onCancel={() => this.handleInsertVisible(false)}
                    >
                        {/* //添加form */}
                        <TransferHelpSetListInsert />
                    </Modal>
                    <div className='content-ManageBox-body-card'>
                        <div className='card-body'>
                            <Form>
                                <div className='card-form-item'>
                                    <div>
                                        <Form.Item label="医院：">
                                            <Select defaultValue="全部" style={{ width: 140 }} onChange={this.handleSelectChange} >
                                                <Option value="" key="" selected="">全部</Option>
                                                {this.state.ListData.map(item => (<Option key={item.HOSPITALID} value={item.HOSPITALID}>{item.HOSNAME}</Option>))}
                                            </Select>
                                        </Form.Item>
                                    </div>
                                </div>
                                <div className='card-form-item' >
                                    <Form.Item label="urlcode:">
                                        <Input />
                                    </Form.Item>
                                </div>
                                <div className='card-form-item'>
                                    <Button type="primary" icon={<SearchOutlined />} onClick={this.handleSelect} >
                                        查询
                                    </Button>
                                </div>
                            </Form>
                        </div>
                    </div>
                    <div className='content-ManageBox-body-list'>
                        <Table columns={columns} dataSource={this.state.data} />
                    </div>
                </div>
            </div>
        );
    }
    //新增的会话框
    handleInsertVisible(insertVisible) {
        this.setState({
            insertVisible: insertVisible
        })
    }
    //修改的会话框
    handleUpdateVisible(updateVisible) {
        this.setState({
            updateVisible: updateVisible
        })
    }
    //删除的会话框
    handleDelVisible(delVisible) {
        this.setState({
            delVisible: delVisible
        })
    }
    //绑定要删除的数据
    handleDelBind(record) {
        this.setState({
            APPREGID: record.APPREGID,
            hospitalid: record.HOSPITALID,
            delVisible: true
        })
        console.log(record);
    }
    //绑定搜索框选择的医院
    handleSelectChange = (val) => {
        this.setState({
            //获取医院的value值
            hospitalid: val
        })
    }
    //下拉框的绑定
    handleHosList = () => {
        axios.post('https://bitnet.519e.com.cn/OnlineConsultationManageTest/api/Hospital/GetHospitalSelList', {

        }, { headers: { "Tick": window.localStorage.Tick } })
            .then((res) => {
                if (res.data.ResultCode == 0) {
                    this.setState({
                        ListData: res.data.Data
                    })
                }

            }).catch((err) => {
                console.log(err)
            })
    }
    //根据医院查询数据
    handleSelect = () => {
        axios.post('https://bitnet.519e.com.cn/OnlineConsultationManageTest/api/TransferHelpSet/GetList', {
            Name: "",
            hospitalid: this.state.hospitalid,
            page: 0,
            rows: 10,
        }, {
            headers: { "Tick": window.localStorage.Tick }
        }).then((res) => {
            if (res.data.ResultCode == 0) {
                this.setState({
                    data: res.data.Data
                }
                )
            }

        }).catch((err) => {
            console.log(err)
        })
    }
    //删除医院数据
    handleDel = () => {
        this.setState({
            delVisible: false,
        })
        axios.post('https://bitnet.519e.com.cn/OnlineConsultationManageTest/api/TransferHelpSet/Delete', {
            APPREGID: this.state.APPREGID,
            HOSPITALID: this.state.hospitalid
        }, { headers: { "Tick": window.localStorage.Tick } }
        ).then((res) => {
            if (res.data.ResultCode == 0) {
                this.setState({
                    data: res.data.Data
                })
                this.handleSelect();
                alert("删除成功！")
            } else {
                alert(res.data.ResultMsg)
            }
        })
    }
    //修改操作
    handleEdit = () => {
        this.setState({
            updateVisible: false,
        })

        axios.post('https://bitnet.519e.com.cn/OnlineConsultationManageTest/api/TransferHelpSet/Edit', {
            APPREGID: this.state.APPREGID,
            CONTENT: this.state.showHelp,
            HOSPITALID: this.state.hospitalid,
            STATUS: this.state.stateCheck,
            TYPE: this.state.userType,
        }, { headers: { "Tick": window.localStorage.Tick } }
        ).then((res) => {
            if (res.data.ResultCode === 0) {
                this.setState({
                    data: res.data.Data
                })
                alert("操作成功")
            } else {
                alert(res.data.ResultMsg)
            }
        }).catch((err) => {
            alert(err.data.ResultMsg)
        })
    }
    //绑定修改的数据
    handleEditBind(record) {
        // console.log( record)
        this.setState({
            showHelp: record.CONTENT,
            stateCheck: record.STATUS,
            userType: record.TYPE,
            updateVisible: true,
        })
        console.log(record)

    }
}

export default TransferHelpSetList;
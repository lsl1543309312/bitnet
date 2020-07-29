import React, { Component } from 'react';
import './style.css'
import 'antd/dist/antd.css';
import axios from 'axios';
import {
    PlusOutlined,
    SearchOutlined,
} from '@ant-design/icons'
import {
    Input,
    Form,
    Select,
    Button,
    Table,
    Space,
    Modal,
    Spin
} from 'antd';

import FormModal from '../../Compontents/formModal'
const { confirm } = Modal
const { Option } = Select
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
                loading: true
            })
            axios.post('https://bitnet.519e.com.cn/OnlineConsultationManageTest/api/TransferHelpSet/Delete', {
                APPREGID: record.APPREGID,
                HOSPITALID: record.HOSPITALID
            }, { headers: { "Tick": window.localStorage.Tick } }
            ).then((res) => {
                if (res.data.ResultCode == 0) {
                    if ((i.state.total % i.state.page) === 1) {
                        console.log('abc')
                        i.setState({
                            page: i.state.page - 1
                        })
                    }
                    i.handleGetList();
                    alert("删除成功")
                } else {
                    alert(res.data.ResultMsg)
                }
            }).catch((err) => {
                alert(err);
            })
        }
    })
}

class formCRUD extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ListData: [],//医院下拉列表
            loading: true,//加载
            data: [],//tabel数据
            page: 1,//
            pageSize: 5,//每页显示的数据
            total: 0,//数据总数
            showHelp: '',
            title: '新增',
            hospitalid: '',
            record: {},//修改前的原始数据
            ModalThis: null,
            APPREGID: '',
            HOSNAME: '',
            stateCheck: Boolean,
            userType: '',
            ModalType: '',//判断是新增还是修改
            ModalData: [
                {
                    id: 'HOSNAME',
                    type: 'Select',
                    label: '所属医院',
                    value: '',
                    required: true,
                    onChange: this.handleOnChange,
                    disabled: true,
                    placeholder: "请输入搜索或下拉框",
                    data: [],
                    message:"请输入项为必输项目"
                },
                {
                    id: 'userType',
                    type: 'Select',
                    label: '用户使用类型',
                    value: '',
                    required: true,
                    message:"请输入项为必输项目",
                    onChange: this.handleOnChange,
                    disabled: false,
                    placeholder: "请输入搜索或下拉框",
                    data: [{
                        HOSPITALID: 'patient',
                        HOSNAME: '病人端'
                    },
                    {
                        HOSPITALID: 'staff',
                        HOSNAME: '医护端'
                    }
                    ]
                },
                {
                    id: 'APPREGID',
                    type: 'Select',
                    label: '应用编号',
                    value: '',
                    required: true,
                    message:"请输入项为必输项目",
                    onChange: this.handleOnChange,
                    disabled: true,
                    placeholder: "请输入搜索或下拉框",
                    data: [
                        {
                            HOSPITALID: 'edition001',
                            HOSNAME: '版本1'
                        },
                        {
                            HOSPITALID: 'edition002',
                            HOSNAME: '版本2'
                        },
                        {
                            HOSPITALID: 'edition003',
                            HOSNAME: '版本3'
                        },
                        {
                            HOSPITALID: 'edition004',
                            HOSNAME: '版本4'
                        }, {
                            HOSPITALID: 'edition005',
                            HOSNAME: '版本5'
                        }
                    ]
                },
                {
                    id: 'stateCheck',
                    type: 'Checked',
                    label: '开/关',
                    value: false,
                    onChange: this.handleOnChange,
                    disabled: false,
                    checked: '开',
                    unchecked:'关'
                },
                {
                    id: 'showHelp',
                    type: 'TextArea',
                    label: '指引帮助',
                    value: '',
                    required: true,
                    message:"请输入项为必输项目",
                    onChange: this.handleOnChange,
                    disabled: false,
                }]
        }
    }
    componentDidMount = () => {
        this.handleGetList()//table数据
        this.handleHosList()//医生list数据
    }

    render() {
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
                        <a onClick={() => this.handleEdit(record)}>修改</a>
                        <a onClick={() => { ModalDel(record, this) }}>删除</a>
                    </Space>)
            }
        ];
        return (
            <div className='content-ManageBox'>

                <Spin tip="loading" spinning={this.state.loading}>
                    <div className='content-ManageBox-header'>
                        <div className='content-ManageBox-header-title'>
                            <span>转诊预约跳转地址管理</span>
                        </div>
                    </div>
                    <div className='content-ManageBox-body' >

                        <Button type="primary" icon={<PlusOutlined />} style={{ marginBottom: 20 }} onClick={() => this.handleInsert()}>添加</Button>
                        <FormModal
                            type={this.state.ModalType}
                            title={this.state.title}
                            handleOk={this.handleSubmit}
                            data={this.state.ModalData}
                            record={this.state.record}
                            onRef={this.handleOnRef}
                            ListData={this.state.ListData}
                        ></FormModal>
                        <div className='content-ManageBox-body-card'>
                            <div className='card-body'>
                                <Form>
                                    <div className='card-form-item'>
                                        <div>
                                            <Form.Item name='HOS' label="医院：">
                                                <Select placeholder="全部" style={{ width: 140 }} onChange={this.handleSelectChange} >
                                                    <Option value="" key="" selected="">全部</Option>
                                                    {this.state.ListData.map(item => (<Option key={item.HOSPITALID} value={item.HOSPITALID}>{item.HOSNAME}</Option>))}
                                                </Select>
                                            </Form.Item>
                                        </div>
                                    </div>
                                    <div className='card-form-item' >
                                        <Form.Item name='urlcode' label="urlcode:">
                                            <Input />
                                        </Form.Item>
                                    </div>
                                    <div className='card-form-item'>
                                        <Button type="primary" icon={<SearchOutlined />} onClick={this.handleLook} >
                                            查询
                                </Button>
                                    </div>
                                </Form>
                            </div>
                        </div>
                        <div className='content-ManageBox-body-list'>
                            <Table columns={columns}
                                dataSource={this.state.data}
                                bordered
                                loading={this.state.loading}
                                pagination={{
                                    pageSize: this.state.pageSize,
                                    total: this.state.total,//数据总数
                                    // hideOnSinglePage: true,//只有一页不显示页面跳转
                                    showQuickJumper: false,//是否快速跳转页面
                                    defaultCurrent: 1,//默认当前页面
                                    current: this.state.page,//当前页面
                                    onChange: (current) => this.handleCurrentPage(current)
                                }}
                                tableLayout='auto'

                            />

                        </div>

                    </div></Spin>
            </div>
        )
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
                        ListData: res.data.Data,

                    })

                }

            }).catch((err) => {
                console.log(err)
            })
    }
    //table数据
    handleGetList = () => {
        axios.post('https://bitnet.519e.com.cn/OnlineConsultationManageTest/api/TransferHelpSet/GetList', {
            Name: "",
            hospitalid: this.state.hospitalid,
            page: this.state.page - 1,
            rows: this.state.pageSize,
        }, {
            headers: { "Tick": window.localStorage.Tick }
        }).then((res) => {
            //无论查询与否都要停止加载
            this.setState({
                loading: false,
            })
            if (res.data.ResultCode == 0) {
                if (res.data.Data != null) {
                    res.data.Data.forEach(e => {
                        e.key = e.HOSPITALID + e.APPREGID
                    });
                }
                this.setState({
                    data: res.data.Data,
                    total: res.data.Total,
                },

                )
            }

        }).catch((err) => {
            //错误也要停止加载
            this.setState({
                loading: false,
            })
            console.log(err)
        })

    }
    //翻页
    handleCurrentPage = (current) => {
        this.setState({
            page: current,
            loading: true
        },//注意异步事件
            () => { this.handleGetList() })

    }
    //查询后回到首页
    handleLook = () => {

        this.setState({ page: 1, loading: true }, () => { this.handleGetList() })
    }
    //绑定搜索框选择的医院
    handleSelectChange = (val) => {
        this.setState({
            //获取医院的value值
            hospitalid: val
        })
    }
    //新增
    handleInsert = () => {
        let { ModalData, ModalThis, ListData } = this.state
        this.setState({
            ModalType: "Add"
        })
        ModalData.forEach(item => {
            if (item.id == 'showHelp') {
                item.value = ''
                item.disabled = false
            }else if (item.id == 'APPREGID') {
                item.value = ''
                item.disabled = false
            } else if (item.id == 'HOSNAME') {
                item.value = ''
                item.data = ListData
                item.disabled = false
            } else if (item.id == 'stateCheck') {
                item.value = false
                item.disabled = false
            } else if (item.id == 'userType') {
                item.value = ''
                item.disabled = false
            }
        })
        this.setState({
            title: '新增',
            ModalData,
        }, () => {
            ModalThis.handleActionShow();
        })
    }
    handleEdit = (record) => {
        let { ModalData, ListData } = this.state
        this.setState({
            ModalType: "edit"
        })
        ModalData.map(item => {
            if (item.id == 'showHelp') {
                item.value = record.CONTENT
                item.disabled = false
            }
            else if (item.id === 'APPREGID') {
                item.value = record.APPREGID
                item.disabled = true
            } else if (item.id === 'HOSNAME') {
                item.value = record.HOSPITALID
                item.data = ListData
                item.disabled = true
            } else if (item.id === 'stateCheck') {
                item.value = record.STATUS === 1 ? true : false
                item.disabled = false
            } else if (item.id === 'userType') {
                item.value = record.TYPE
                item.disabled = false
            }
        })
        this.setState({
            record: record,
            title: '修改'

        }, () => {
            let { ModalThis } = this.state
            ModalThis.handleActionShow();
        })
    }
    //提交
    handleSubmit = (record) => {
        let { ModalThis, showHelp, stateCheck, userType } = this.state
        ModalThis.handleActionLoad(true)
        if (this.state.ModalType === 'edit') {
            axios.post('https://bitnet.519e.com.cn/OnlineConsultationManageTest/api/TransferHelpSet/Edit', {
                APPREGID: record.APPREGID,//不更改
                CONTENT: showHelp === '' ? record.CONTENT : showHelp,
                HOSPITALID: record.HOSPITALID,
                STATUS: stateCheck === true ? 1 : 0,
                TYPE: userType === '' ? record.TYPE : userType,
            }, { headers: { "Tick": window.localStorage.Tick } }
            ).then((res) => {
                ModalThis.handleActionLoad(false);
                if (res.data.ResultCode === 0) {
                    ModalThis.handleBtnCancel();//操作成功，通过cancel关闭Modal
                    alert("操作成功")
                    this.handleGetList()
                } else {
                    alert(res.data.ResultMsg)
                }
            }).catch((err) => {
                ModalThis.handleActionLoad(false);
                alert(err)
            })
        } else {
            axios.post('https://bitnet.519e.com.cn/OnlineConsultationManageTest/api/TransferHelpSet/Add', {
                APPREGID: this.state.APPREGID,
                CONTENT: this.state.showHelp,
                Hospitalid: this.state.HOSNAME,
                STATUS: this.state.stateCheck == true ? 1 : 0,
                TYPE: this.state.userType,
            }, {
                headers: { "Tick": window.localStorage.Tick }
            }).then((res) => {
                ModalThis.handleActionLoad(false);
                if (res.data.ResultCode == 0) {
                    ModalThis.handleBtnCancel();
                    this.handleCurrentPage(1);
                    alert("新增成功");
                } else {
                    alert(res.data.ResultMsg)
                }

            }).catch((err) => {
                ModalThis.handleActionLoad(false);
                alert(err);
            })
        }
    }
    //ref
    handleOnRef = (ModalThis) => {
        this.setState({
            ModalThis
        })
    }
    handleOnChange = (name, e) => {
        console.log(name, e)
    }
}
export default formCRUD
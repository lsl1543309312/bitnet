import React, { Component,useRef } from 'react';
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
    Switch,
    Pagination,
} from 'antd';
import TransferHelpSetListUpdate from '../TransferHelpSetListUpdata/index';
// import TransferHelpSetListInsert from '../TransferHelpSetListInsert';
const { Option } = Select
const { confirm } = Modal

//修改的
function showEdit(record, i) {
    confirm({
        title: '修改转诊预约跳转地址信息',
        content: <TransferHelpSetListUpdate record={record} handleHELP={i.handleHELP.bind(i)} handleSTATUS={i.handleSTATUS.bind(i)} handleTYPE={i.handleTYPE.bind(i)} />,
        okText: "确定",
        cancelText: "取消",
        onOk() {
            axios.post('https://bitnet.519e.com.cn/OnlineConsultationManageTest/api/TransferHelpSet/Edit', {
                APPREGID: record.APPREGID,
                CONTENT: i.state.showHelp,
                HOSPITALID: record.HOSPITALID,
                STATUS: i.state.stateCheck,
                TYPE: i.state.userType,
            }, { headers: { "Tick": window.localStorage.Tick } }
            ).then((res) => {
                if (res.data.ResultCode === 0) {
                    let maplist = i.state.data.map(x => {
                        if (x.APPREGID == record.APPREGID && x.HOSPITALID == record.HOSPITALID) {
                            return {
                                ...res.data.Data,
                                hospitalName: record.hospitalName,
                            }
                        }
                        return x
                    })

                    i.setState({
                        data: maplist
                    })
                    alert("操作成功")
                    i.handleSelect();

                } else {
                    alert(res.data.ResultMsg)
                }
            }).catch((err) => {
                alert(err)
            })
        }

    })
}
const { TextArea } = Input
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
                            NOWPAGE: i.state.NOWPAGE - 1
                        })
                    }
                    i.handleSelect();
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
            stateCheck: "",//状态switch
            ListData: [],//医院list数据
            hospitalid: '',//医院编号
            data: [],   //table数据
            APPREGID: "",//应用编号
            NOWPAGE: 1,//当前页数
            page: 4,//显示多少数据

            loading: false,//加载状态
        };
        this.handleHosList = this.handleHosList.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleInsert = this.handleInsert.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
    }
    componentDidMount = () => {
        this.handleHosList();
        this.handleSelect();
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
                        <a onClick={() => showEdit(record, this)}>修改</a>

                        <a onClick={() => { ModalDel(record, this) }}>删除</a>


                    </Space>)
            }
        ];
        const form =Form.useForm
        return (
            <div className='content-ManageBox'>
               
                <div className='content-ManageBox-header'>
                    <div className='content-ManageBox-header-title'>
                        <span>转诊预约跳转地址管理</span>
                    </div>
                </div>
                <div className='content-ManageBox-body'>

                    <Button type="primary" icon={<PlusOutlined />} style={{ marginBottom: 20 }} onClick={() => this.handleInsertVisible(true)}>添加</Button>

                    <Modal
                        title="新增转诊预约跳转地址信息"
                        okText="确认"
                        cancelText="取消"
                        okType="primary"
                        maskClosable={false}
                        visible={this.state.insertVisible}
                        onOk={this.handleInsert.bind(this)}
                        onCancel={() => this.handleInsertVisible(false)}
                    >
                        <Form

                        //  {...layout}
                        // onFinish={onFinish}
                        // onFinishFailed={onFinishFailed}
                        >
                            <Form.Item name='HospitalName' label="所属医院" rules={[{ required: true, message: "请输入项为必输项目" }]} initialValue='输入搜索或下拉选择'>
                                <Select onChange={this.handleHOSNAME} placeholder="输入搜索或下拉选择">
                                    {this.state.ListData.map(item => (<Option key={item.HOSPITALID} value={item.HOSPITALID}>{item.HOSNAME}</Option>))}
                                </Select>

                            </Form.Item>
                            <Form.Item name='userType' label="用户使用类型" rules={[{ required: true, message: "请输入项为必输项目" }]} initialValue='输入搜索或下拉选择'>
                                <Select
                                    placeholder="输入搜索或下拉选择" onChange={this.handleTYPE}
                                >
                                    <Option value="patient">病人端</Option>
                                    <Option value="staff">医护端</Option>

                                </Select>
                            </Form.Item>

                            <Form.Item name='appId' label="应用编号" rules={[{ required: true, message: "请输入项为必输项目" }]} initialValue='输入搜索或下拉选择'>
                                <Select placeholder="输入搜索或下拉选择" onChange={this.handleAPPID}>
                                    <Option value="edition001">版本1</Option>
                                    <Option value="edition002">版本2</Option>
                                    <Option value="edition003">版本3</Option>
                                    <Option value="edition004">版本4</Option>
                                    <Option value="edition005">版本5</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item label="开/关" name="stateCheck">
                                <Switch checkedChildren="开" unCheckedChildren="关" onChange={this.handleSTATUS} />
                            </Form.Item>
                            <Form.Item name='showHelp' label="指引帮助" rules={[{ required: true, message: "请输入项为必输项目" }]} onChange={this.handleHELP} initialValue={undefined}>
                                <TextArea />
                            </Form.Item>
                        </Form>
                    </Modal>

                    <div className='content-ManageBox-body-card'>
                        <div className='card-body'>
                            <Form>
                                <div className='card-form-item'>
                                    <div>
                                        <Form.Item name='HOS' label="医院：">
                                            <Select defaultValue="全部" style={{ width: 140 }} onChange={this.handleSelectChange} >
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
                        <Table columns={columns} dataSource={this.state.data}
                            loading={this.state.loading}
                            // pagination={paginationProps}
                            pagination={{
                                pageSize: this.state.page,
                                total: this.state.total,//数据总数
                                // hideOnSinglePage: true,//只有一页不显示页面跳转
                                showQuickJumper: false,//快速跳转页面
                                defaultCurrent: 1,//默认当前页面
                                current: this.state.NOWPAGE,//当前页面
                                onChange: (current) => this.handleCurrentPage(current)

                            }}
                            tableLayout='auto'

                        />

                    </div>
                </div>
            </div>
        );
    }
    handleHOSNAME = (value) => {
        this.setState({
            HOSNAME: value
        })
    }
    handleTYPE = (value) => {
        this.setState({
            userType: value
        })
    }
    handleSTATUS = (value) => {

        this.setState({
            stateCheck: value == false ? 0 : 1
        })
        console.log(value)
    }
    handleAPPID = (value) => {
        this.setState({
            APPREGID: value
        })
    }
    handleHELP = (event) => {
        this.setState({
            showHelp: event.target.value
        })

    }
    handleCurrentPage = (current) => {
     
        this.setState({
            NOWPAGE: current
        },
            () => {
                this.handleSelect();//因为这个是异步查询
            })


    }
    //新增
    handleInsert = (e) => {
        // this.props.form.resetFields();
        // e.preventDefault(); //取消事件的默认动作
        
        this.setState({
            insertVisible: false,
            loading: true
        })
        axios.post('https://bitnet.519e.com.cn/OnlineConsultationManageTest/api/TransferHelpSet/Add', {
            APPREGID: this.state.APPREGID,
            CONTENT: this.state.showHelp,
            Hospitalid: this.state.HOSNAME,
            STATUS: this.state.stateCheck,
            TYPE: this.state.userType,
        }, {
            headers: { "Tick": window.localStorage.Tick }
        }).then((res) => {
            if (res.data.ResultCode == 0) {
                this.state.data = res.data.Data;
                this.handleSelect();
                alert("新增成功");
                // this.props.form.resetFields()
            } else {
                alert(res.data.ResultMsg)
            }

        }).catch((err) => {
            alert(err);
        })

    }
    //新增的会话框
    handleInsertVisible(insertVisible) {
        
        // this.props.form.resetFields();
        this.setState({

            insertVisible: insertVisible,
            hospitalid: '',
            NOWPAGE: 1
        })
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
    //解决查询后页数没变
    handleLook = () => {
        this.setState({ NOWPAGE: 1 }, () => { this.handleSelect() })
    }
    //根据医院查询数据
    handleSelect = () => {

        axios.post('https://bitnet.519e.com.cn/OnlineConsultationManageTest/api/TransferHelpSet/GetList', {
            Name: "",
            hospitalid: this.state.hospitalid,
            page: this.state.NOWPAGE - 1,
            rows: this.state.page,
        }, {
            headers: { "Tick": window.localStorage.Tick }
        }).then((res) => {
            if (res.data.ResultCode == 0) {

                this.setState({
                    data: res.data.Data,
                    total: res.data.Total,
                    loading: false,
                }
                    //   判断是否是最后一条数据
                    //这个判断不可用，他会将满页的数据也带入
                    , () => {
                        // if ((this.state.total % this.state.page) === 0) {
                        //     console.log('abc')
                        //     this.setState({
                        //         NOWPAGE: this.state.NOWPAGE - 1
                        //     })
                        // }
                        // console.log(this.state.total % this.state.page,this.state.NOWPAGE)
                    }
                )
            }

        }).catch((err) => {
            console.log(err)
        })
    }

}

export default TransferHelpSetList;
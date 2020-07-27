import React, { Component } from 'react';

import {
    Button,
    Table,
    Space,
} from 'antd';
import axios from 'axios';

import ModeAdd from '../../Compontents/ModeAdd'

class tranfList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: [],
            loading: true,
            page: 1,
            pageSize: 10,
            total: 0,
            hospitalid: '',
            modethis: null,
            modetitle: '新增',
            showHelp: '',
            recode: {}, //修改原始数据
            modedata: [
                {
                    type: 'TextArea',
                    label: '指引帮助',
                    id: 'showHelp',
                    value: '',
                    required: true,
                    onchange: this.hanleinputchange
                },
                {
                    type: 'TextArea',
                    label: '2121',
                    id: 'helpstr',
                    value: '',
                    required: true,
                    onchange: this.hanleinputchange
                }
            ],
        }
        this.columns = [
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
                        <a onClick={() => this.showEdit(record, this)}>修改</a>

                        <a onClick={() => { this.ModalDel(record, this) }}>删除</a>


                    </Space>)
            }
        ];
    }
    componentDidMount = () => {
        this.getPageList()
    }
    render() {
        return (
            <div>
                <Button onClick={this.handlebtnaddclk}>新增</Button>
                <ModeAdd title={this.state.modetitle}
                    handleOK={this.handleModelSubmit}
                    onRef={this.handleonref}
                    data={this.state.modedata}
                    recode={this.state.recode}
                ></ModeAdd>

                <Table columns={this.columns} dataSource={this.state.data} bordered
                    loading={this.state.loading}
                    // pagination={paginationProps}
                    pagination={{
                        pageSize: this.state.pageSize,
                        total: this.state.total,//数据总数
                        // hideOnSinglePage: true,//只有一页不显示页面跳转
                        showQuickJumper: false,//快速跳转页面
                        defaultCurrent: 1,//默认当前页面
                        current: this.state.page,//当前页面
                        onChange: (current) => this.handleCurrentPage(current)

                    }}
                    tableLayout='auto'

                />
            </div>
        );
    }

    getPageList = () => {

        axios.post('https://bitnet.519e.com.cn/OnlineConsultationManageTest/api/TransferHelpSet/GetList', {
            Name: "",
            hospitalid: this.state.hospitalid,
            page: this.state.page - 1,
            rows: this.state.pageSize,
        }, {
            headers: { "Tick": window.localStorage.Tick }
        }).then((res) => {
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
                }
                )
            }

        }).catch((err) => {
            this.setState({
                loading: false,
            })
            console.log(err)
        })

    }

    //新增
    handlebtnaddclk = () => {
        let { modethis, modedata } = this.state
        modedata.map(item => {
            item.value = ''
            return item
        })
        this.setState({
            modedata,
            modetitle: '新增'
        }, () => {
            modethis.actionShow();
        })

    }

    handleonref = (modethis) => {
        this.setState({
            modethis
        })
    }

    //提交
    handleModelSubmit = (e, record) => {
        let { showHelp, modethis } = this.state
        console.log(record, showHelp)

        modethis.actionLoading(true);
        axios.post('https://bitnet.519e.com.cn/OnlineConsultationManageTest/api/TransferHelpSet/Edit', {
            APPREGID: record.APPREGID,
            CONTENT: showHelp,
            HOSPITALID: record.HOSPITALID,
            STATUS: record.STATUS,
            TYPE: record.TYPE,
        }, { headers: { "Tick": window.localStorage.Tick } }
        ).then((res) => {
            modethis.actionLoading(false);
            if (res.data.ResultCode === 0) {
                modethis.actionclose();

                alert("操作成功")
                this.handleCurrentPage(1)

            } else {
                alert(res.data.ResultMsg)
            }
        }).catch((err) => {
            modethis.actionLoading(false);
            alert(err)
        })

    }
    handleCurrentPage = (page) => {
        this.setState({
            page: page
        }, () => {
            this.getPageList()
        }
        )
    }
    //修改 弹窗
    showEdit = (record, t) => {
        let { modedata } = this.state
        // console.log(record)
        modedata.forEach(item => {
            if (item.id == 'showHelp') {
                item.value = record.CONTENT
            }
        })
        this.setState({
            modedata,
            recode: record,
            modetitle: '修改'
        }, () => {
            // console.log(record,this.state.modedata)
            let { modethis } = this.state
            modethis.actionShow();
        })

    }
    //删除
    ModalDel = (record, t) => {

    }

    hanleinputchange = (name, e) => {
        console.log(name, e.target.value)
        let { modedata } = this.state
        // console.log(record)
        modedata.forEach(item => {
            if (item.id == 'showHelp') {
                item.value = e.target.value
            }
        })
        this.setState({
            [name]: e.target.value,
            modedata
        })
    }
}

export default tranfList;
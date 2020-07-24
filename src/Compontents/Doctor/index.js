import React from 'react';
import Pharmacist from '../../Compontents/Pharmacist'
import 'antd/dist/antd.css';
import './style.css';
import { Menu, Button, Layout, Popconfirm, message, Modal, Switch } from 'antd';
import DoctorList from '../DoctorList';
import axios from 'axios'
import TransferHelpSetList from '../../Compontents/TransferHelpSetList'
import {
    FundProjectionScreenOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    CarryOutOutlined,
    ContainerOutlined,
    BarChartOutlined,
    UserOutlined,
    FileDoneOutlined,
    LockOutlined,
    PoweroffOutlined

} from '@ant-design/icons';
import { Route, Link } from 'react-router-dom';
import PersonInfo from './PersonInfo';
const { SubMenu } = Menu;
const text = "是否确认需要退出?";
function confirm() {

    window.localStorage.removeItem("Tick");
    window.localStorage.removeItem("RoleName");
    alert('账号已退出或超时');
    window.location.href = '/';

}
const RoleName = window.localStorage.RoleName;




class Doctor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
            data: [],//
            visible: false,
            personData:[],//个人信息
            Phone: '',
            userCode: '',
            userName: '',
            information:"",
            state: '',
            roleName: ''
        }
        this.toggleCollapsed = this.toggleCollapsed.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleTransfer = this.handleTransfer.bind(this);
        this.showModal = this.showModal.bind(this);

    }

    componentDidMount() {

        var date = new Date();
        window.sessionStorage.Time = date.getTime();
        var timerId = setTimeout(confirm, 7200000);

    }

    render() {

        return (
            <Layout style={{ minHeight: "100vg" }}>

                <div className='header-s'>
                    <span className='Menu-btn'>
                        <i onClick={this.toggleCollapsed} className="Menu-btn-icon">
                            {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
                        </i>
                    </span>
                    <span className='header-title'>
                        倍康224测试医院互联网医院监管平台
                    </span>
                    <div className='header-info'>
                        <span className='header-info-spMargin'>
                            <i><UserOutlined /></i>
                            <span className='header-info-span-span'>
                                欢迎 倍康224测试医院-
                                {RoleName}
                            </span>
                        </span>
                        <div >
                            <span className='header-info-spMargin' onClick={this.showModal}>
                                <i><FileDoneOutlined /></i>
                                <span className='header-info-span-span' >个人信息
                                </span>
                            </span>
                            {/* <PersonInfo visible={this.state.visible} title="个人信息" handleOk={this.handleOk.bind(this)} /> */}
                            <Modal
                                visible={this.state.visible}
                                onOk={this.handleOk.bind(this)}
                                onCancel={this.handleOk.bind(this)}
                                title="个人信息"
                                okText="确认"
                                cancelText="取消"
                               centered="true"
                               
                            >
                                <PersonInfo information={this.state.information} />
                            </Modal>
                        </div>
                        <div >
                            <span className='header-info-spMargin'>
                                <i><LockOutlined /></i>
                                <span className='header-info-span-span'>修改密码</span>
                            </span>
                        </div>
                        <div >
                            <span className='header-info-spMargin' onClick={this.handleOut}>
                                <i><PoweroffOutlined /></i>
                                <Popconfirm
                                    placement="bottomRight"
                                    title={text}
                                    onConfirm={confirm}
                                    okText="Yes"
                                    cancelText="No"
                                    className='header-info-span-span'
                                >
                                    退出
                                </Popconfirm>
                            </span>
                        </div>
                    </div>
                </div>
                <div className='content'>
                    <div style={
                        this.state.collapsed ? { width: 'auto' } : { width: 200 }}>
                        <Menu
                            mode="inline"
                            inlineCollapsed={this.state.collapsed}

                        >
                            <SubMenu key="sub1" icon={<CarryOutOutlined />} title="医联体" >
                                <Menu.Item key="1">协同问诊</Menu.Item>
                                <Menu.Item key="2">转诊</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub2" icon={<ContainerOutlined />} title="邀请入驻">
                                <Menu.Item key="3">医院入驻</Menu.Item>
                                <Menu.Item key="4">邀请医生</Menu.Item>
                                <Menu.Item key="5">邀请药师</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub3" icon={<CarryOutOutlined />} title="医院管理">
                                <Menu.Item key="6"
                                    onClick={this.handleClick}
                                ><Link to='/Doctor/DoctorList'>医生管理</Link></Menu.Item>
                                <Menu.Item key="7">
                                    <Link to='/Doctor/Pharmacist'>药师管理</Link></Menu.Item>
                                <Menu.Item key="21"
                                    onClick={this.handleTransfer}>
                                    <Link to='/Doctor/TransferHelpSetList'>渠道转诊指引</Link></Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub4" icon={<CarryOutOutlined />} title="流程审批">
                                <Menu.Item key="8">审批医生</Menu.Item>
                                <Menu.Item key="9">审批药师</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub5" icon={<FundProjectionScreenOutlined />} title="监控">
                                <Menu.Item key="10">检查检验监控</Menu.Item>
                                <Menu.Item key="11">问诊业务监控</Menu.Item>
                                <Menu.Item key="12">处方业务监控</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub6" icon={<BarChartOutlined />} title="报表">
                                <Menu.Item key="13">医院总览表</Menu.Item>
                                <Menu.Item key="14">科室总览表</Menu.Item>
                                <Menu.Item key="15">科室工作日报</Menu.Item>
                                <Menu.Item key="16">医生工作量总览表</Menu.Item>
                                <Menu.Item key="17">医院工作量日报</Menu.Item>
                                <Menu.Item key="18">未接诊医生名单</Menu.Item>
                                <Menu.Item key="19">未接诊医生日报</Menu.Item>
                                <Menu.Item key="20">未接诊情况详细表</Menu.Item>
                            </SubMenu>
                        </Menu>
                    </div>
                    <div className='content-box'>

                        
                        <Route exact path='/Doctor/DoctorList'>
                            <DoctorList data={this.state.data} />
                        </Route>
                        <Route path='/Doctor/Pharmacist'>
                            <Pharmacist />
                        </Route>
                        <Route path='/Doctor/TransferHelpSetList'>
                            <TransferHelpSetList />
                        </Route>
                    </div>
                </div>
            </Layout>
        );
    }
    toggleCollapsed = () => {
        this.setState({
            collapsed: !this.state.collapsed,

        });
    };

    //个人信息弹框
    showModal = () => {
        this.setState({
            visible: true,
        });
        axios.post('https://bitnet.519e.com.cn/OnlineConsultationManageTest/api/user/GetUserInfo', {
            rows:10
        }, { headers: {"Tick": window.localStorage.Tick} }
        ).then(
            (res) => {
                if (res.data.ResultCode === 0) {
                    this.setState({
                        information: res.data.Data
                    })
                    
                }
            }
        ).catch((err) =>{
            console.log(err)
        })
    };
    handleOk = () => {
        this.setState({
            visible: false
        })

    }

    handleClick() {
        axios.post('https://bitnet.519e.com.cn/OnlineConsultationManageTest/api/ApiDoctor/GetDoctorRegInfosList',
            {
                data: {
                    page: 1,
                    rows: 10,
                    SearchName: "",
                    hospitalId: "",
                    StartDate: "",
                    EndDate: "",
                    UpdateStartDate: "",
                    UpdateEndDate: "",
                    HosCheckStatusStr: "",
                    HosUpdateCheckStatusStr: "",
                    HosIsApply: "",
                    DeptIds: "0B696DB943854017A73B49640E42645F"
                }
            },//headers要放置在后面，不能与data数据放置相同
            {
                headers: { "Tick": window.localStorage.Tick }
            }).then((res) => {
                if (res.data.ResultCode == 0) //当resultcode为0的时候才是需要获取值
                {
                    this.setState({ data: res.data.Data })
                    console.log(res.data)
                }


            }).catch((err) => {
                console.log(err);

            })
    };
    handleTransfer = () => {
        axios.post('https://bitnet.519e.com.cn/OnlineConsultationManageTest/api/TransferHelpSet/GetList', {
            Name: "",
            hospitalid: "",
            page: 0,
            rows: 10,
        },
            { headers: { "Tick": window.localStorage.Tick } }
        ).then((res) => {
            if (res.data.ResultCode == 0) {
                this.setState({
                    data: res.data.Data
                })

            }
        }).catch((err) => {
            console.log(err)
        })
    };


}

export default Doctor;
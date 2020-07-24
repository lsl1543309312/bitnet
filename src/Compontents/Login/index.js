
import './style.css';
import Logo from '../../Image/download.jpg'
import '../../../node_modules/antd/dist/antd.css'
import React, { Component } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios';
import {Redirect, Router, Route, Link } from 'react-router-dom'
import Doctor from '../Doctor';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: '',
            pwd: '',
            RememberMe: 0,
            // redirectToReferrer: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUserChange = this.handleUserChange.bind(this);
        this.handlePwdChange = this.handlePwdChange.bind(this);
    }
    
    componentDidMount = () => {
        console.log(window.localStorage.Tick);
        this.InputText.focus();
        //tick存在，在有效期 自动登录 
        //没有， 过期，tick清空 
    }
  
    render() {
        // const { from } =  { from: { pathname: "/Doctor" } };
        // const { redirectToReferrer } = this.state.redirectToReferrer;
        // // 登录成功后，redirectToReferrer为true，使用Redirect组件重定向页面
        // if (redirectToReferrer) {
        //     return <Redirect to={from} />;
        // }
        return (

            <div className="box">

                <div className="card">
                    <div className="logo"><img src={Logo} /></div>

                    
                        <Form>
                            <Form.Item name="userName" rules={[{ required: true, message: '账号不能为空' }]}>
                            <Input onChange={this.handleUserChange} ref={(Input) => { this.InputText=Input}} value={this.state.user} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入用户名" />
                            </Form.Item>
                            <Form.Item name="passWord" rules={[{ required: true, message: '密码不能为空' }]}>
                                <Input type="password" onChange={this.handlePwdChange} value={this.state.pwd} prefix={<LockOutlined className="site-form-item-icon" />} placeholder="请输入密码" />
                            </Form.Item>
                            <Form.Item >
                                <Button type='primary' className="login-form-button" htmlType="submit" onClick={this.handleSubmit}>登录</Button>
                            </Form.Item>
                        </Form>

                 
                </div>

            </div>

        );
    }

    handleUserChange(e) {
        this.setState({
            user: e.target.value
        })
    }
    handlePwdChange(e) {
        this.setState({
            pwd: e.target.value
        })
    }
    handleSubmit(e) {
        //判断字符是否有错

        e.preventDefault();//取消默认事件
        //post  非表单传递。
        //登录post from表单
        // let fromData = new FormData()
        //   fromData.append('token', token)
        //   fromData.append('file', e.target.files[0])
        axios.post('https://bitnet.519e.com.cn/OnlineConsultationManageTest/Login/CheckUserLogin', {

            UserCode: this.state.user,
            PassWord: this.state.pwd,
            RememberMe: 1,
        }

        ).then((res) => {
            //json  api  res.recode  -100 没有tick tick错误
            //tick  0  localStorage
            console.log(res)
            window.localStorage.Tick = res.data.Tick;
            window.localStorage.RoleName = res.data.rolelist[0].text;
            if (res.data.success) {
                // this.state.redirectToReferrer=true;
                // console.log(res.data.success);
                
                window.location = "/Doctor" ;
            } else {
                alert(res.data.msg);

            }
        }).catch(err => {
            //  401 tick 
            console.log(err)
            
        })
    }
}

//     const LoginForm = Form.create({ name: 'horizontal_login' })(Login);

// export default LoginForm;
export default Login

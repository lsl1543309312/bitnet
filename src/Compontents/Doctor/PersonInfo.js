import React, { Component } from 'react';
import {
    Form,
    Input
}
    from 'antd'

class PersonInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            information:'',
        }
    }
    componentWillReceiveProps=(nextProps) =>{
        this.setState({
           information:nextProps.information
       })
       
    }
    render() {
       
        console.log(this.state.information)
        return (
           
            <Form layout="horizontal" labelCol={{ span: 5, }}//设置文本
                wrapperCol={{ span: 14, }}                  //设置控件
            >
                <Form.Item name="accord" label="登录账号" initialValue={this.state.information.UserCode}>
                    <Input disabled />
                </Form.Item>
                <Form.Item name="username" label="姓名" initialValue={this.state.information.UserName}>
                    <Input />
                </Form.Item>
                <Form.Item name="phone" label="手机号" initialValue={this.state.information.UserPhone} >
                    <Input />
                </Form.Item>
                <Form.Item name="userRole" label="当前登录角色" initialValue={this.state.information.UserCode}>
                    <Input disabled />
                </Form.Item>
                <Form.Item name="status" label="当前状态" initialValue={this.state.information.UserStatus==0?"在职":"离职"}>
                    <Input disabled />
                </Form.Item>
            </Form>
        );
    }
}

export default PersonInfo;